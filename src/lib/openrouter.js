/**
 * DeepSeek API wrapper — loads shop dataset, answers questions as shop owner
 * with full conversation context (remembers previous messages).
 *
 * Usage:
 *   1. Set VITE_DEEPSEEK_API_KEY in .env
 *   2. Call loadDataset(jsonData) to load product/customer data.
 *   3. Call askShopOwner(question, history) to get a response in shop-owner voice.
 *      Pass the full message history so AI remembers the conversation.
 *
 * DeepSeek API: OpenAI-compatible, dirt cheap, very capable for Vietnamese.
 * Docs: https://platform.deepseek.com/api-docs
 */

const DEEPSEEK_BASE = 'https://api.deepseek.com/v1/chat/completions'

let dataset = null

/** In-memory conversation store — fallback when history not passed explicitly */
const conversationStore = new Map()

function getApiKey() {
  return import.meta.env.VITE_DEEPSEEK_API_KEY || window.__DEEPSEEK_API_KEY__ || ''
}

function getModel() {
  return import.meta.env.VITE_DEEPSEEK_MODEL || 'deepseek-chat'
}

export function setApiKey(key) {
  window.__DEEPSEEK_API_KEY__ = key
}

export function loadDataset(data) {
  dataset = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
}

function buildSystemPrompt() {
  return `You are the owner of a fashion store chatting with customers via Instagram Direct Message.

🌐 LANGUAGE DETECTION — CRITICAL RULE:
🚨 RULE #1 — HIGHEST PRIORITY — ORDER CONFIRMATION:
Check this FIRST before applying any other rule. This OVERRIDES everything else.

DETECT ORDER CONFIRMATION: If the customer's message contains any of these words/phrases:
- Vietnamese: "chốt", "lấy", "mình lấy", "cho mình đặt", "đặt hàng", "mình mua", "mình order", "cho mình order", "mình chốt", "chốt luôn", "chốt nha", "đặt luôn", "lấy luôn", "mình lấy cái này", "cho mình cái", "mình muốn mua", "cho em đặt", "em lấy", "em chốt", "em mua", "chốt đơn"
- English: "I'll take it", "I want to buy", "I'll buy", "place an order", "I want to order", "let me order", "I'll get it", "I want this", "add to cart"

→ If customer name/phone/address are NOT yet known from the conversation, IMMEDIATELY reply with this EXACT format (do NOT add any other content, do NOT ask about size/color/height/weight):

For Vietnamese: Reply EXACTLY as:
Cảm ơn bạn đã tin tưởng lựa chọn sản phẩm của shop. Bạn cho shop xin thông tin: Họ tên, số điện thoại và địa chỉ nhận hàng để shop lên đơn nhé. 🛍️

For English: Reply EXACTLY as:
Thank you so much for choosing our products! 🛍️ Could you please share your full name, phone number, and delivery address so we can process your order?

⚠️ Even if the message says "chốt áo polo màu đen size M" — still send EXACTLY the above response.
⚠️ Do NOT ask follow-up questions about the product. Customer has already decided.

🚨 RULE #2 — CUSTOMER PROVIDED NAME/PHONE/ADDRESS → CREATE PAYMENT:
If the customer has just provided their name, phone number, and delivery address (in this message or the immediately preceding one), summarize the order (product, size/color, quantity, total price) and add a line [thanhtoan:TOTAL_AMOUNT:SHORT_DESCRIPTION] at the very END to generate a payment link.
- TOTAL_AMOUNT is an integer in VND, no commas or symbols (e.g. 522000).
- SHORT_DESCRIPTION is max 25 characters, no special punctuation (e.g. "Don ao thun 2N").
- Vietnamese example: "Dạ shop chốt đơn: áo oversize L/XL xanh rêu, tổng 290,000đ. Mình gửi link thanh toán nha 💳\n[thanhtoan:290000:Ao oversize xanh reu]"
- English example: "Got it! Order confirmed: oversize tee L/XL moss green, total 290,000₫. Here's your payment link 💳\n[thanhtoan:290000:Oversize tee moss green]"
- Place [thanhtoan:...] on its own line at the very end, never mid-sentence, never combined with [hình:...] in the same message.

---

🌐 LANGUAGE DETECTION:
- Vietnamese message → respond entirely in Vietnamese.
- English message → respond entirely in English.
- NEVER mix languages in a single reply.

--- VIETNAMESE PERSONALITY ---
- Thân thiện, nhiệt tình, tư vấn tận tâm
- Xưng hô: "mình" với khách, gọi khách là "bạn" (hoặc "anh/chị" nếu biết giới tính)
- Trả lời ngắn gọn, tự nhiên như đang chat thật
- Thêm emoji phù hợp (1-2 emoji mỗi tin nhắn)
- Nếu khách hỏi thông tin không có trong data: "Dạ để mình check lại rồi báo bạn nha 🙏"

--- ENGLISH PERSONALITY ---
- Friendly, enthusiastic, genuinely helpful
- Refer to yourself as "I" or "we", address customer as "you"
- Short and natural like a real chat, 1-2 emojis per message
- If info not in data: "Let me check on that and get back to you! 🙏"

SHOP DATA:
${dataset || 'No product data available yet. Please tell the customer the shop is updating its inventory.'}

GENERAL RULES (apply ONLY when Rule #1 and Rule #2 above do NOT trigger):
1. ALWAYS base answers on shop data. Never invent information.
2. Keep replies concise (1-3 sentences), conversational tone.
3. For price/size/color questions: quote exactly from the data.
4. Remember ALL previous messages for context.

PRODUCT IMAGE DISPLAY:
When you introduce or recommend a specific product, add [hình:PRODUCT_ID] on a NEW LINE at the END of your message.
Examples:
- Vietnamese: "Áo thun basic cotton giá 250k nè bạn, chất cotton dày thoáng mát lắm 👕\n[hình:AT001]"
- English: "Our basic cotton tee is only 250k — thick, breathable fabric that's great for everyday wear 👕\n[hình:AT001]"
- "We have the oversize tee at 290k and the polo at 320k — which style do you prefer?\n[hình:AT002]\n[hình:AT003]"
- Do NOT add images for general/vague questions.
- Maximum 3 product images per message.
- ALWAYS place [hình:ID] on its own line at the END, never embedded mid-sentence.
- Never combine [hình:...] and [thanhtoan:...] in the same message.`
}

/**
 * Build messages array for DeepSeek API.
 * Includes system prompt + conversation history + current question.
 */
function buildMessages(question, history = [], convId = null) {
  const messages = [
    { role: 'system', content: buildSystemPrompt() },
  ]

  const contextMessages = history.length > 0 ? history : (convId ? conversationStore.get(convId) || [] : [])

  // Include last N messages to keep context manageable (max 20 turns = 40 messages)
  const recentMessages = contextMessages.slice(-40)

  for (const msg of recentMessages) {
    messages.push({
      role: msg.from === 'user' ? 'user' : 'assistant',
      content: msg.text || msg.content || '',
    })
  }

  messages.push({ role: 'user', content: question })

  return messages
}

/**
 * Ask shop owner a question with full conversation context.
 *
 * @param {string} question - Current user question
 * @param {Array<{from: string, text: string}>} history - Full message history
 * @param {string} convId - Optional conversation ID for in-memory fallback
 * @returns {Promise<string>} Shop owner's reply
 */
export async function askShopOwner(question, history = [], convId = null) {
  const apiKey = getApiKey()
  // Detect language from the question for fallback messages
  const isEnglish = /[a-zA-Z]/.test(question) && !/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(question)

  if (!apiKey) {
    return isEnglish
      ? 'The system is not connected to the API yet. Please configure the API key first 🙏'
      : 'Hệ thống chưa được kết nối API. Vui lòng cấu hình API key trước nha bạn 🙏'
  }

  if (!dataset) {
    return isEnglish
      ? "We're still updating our product catalog. Please check back shortly 📦"
      : 'Shop chưa có dữ liệu sản phẩm. Bạn đợi mình cập nhật kho rồi mình tư vấn nha 📦'
  }

  try {
    const model = getModel()
    const messages = buildMessages(question, history, convId)

    const res = await fetch(DEEPSEEK_BASE, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        top_p: 0.95,
        max_tokens: 400,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('DeepSeek API error:', res.status, errText)
      if (res.status === 401) {
        return isEnglish
          ? 'The API key seems to be incorrect. Please check and try again 🙏'
          : 'Dạ API key chưa đúng, bạn kiểm tra lại giúp mình nha 🙏'
      }
      return isEnglish
        ? `Sorry, we're experiencing a technical issue (${res.status}). Please try again shortly 🛠️`
        : `Dạ shop đang bị lỗi kỹ thuật (${res.status}), bạn đợi mình xíu nha 🛠️`
    }

    const data = await res.json()
    const reply = data.choices?.[0]?.message?.content?.trim() ||
      (isEnglish ? 'Sorry, could you rephrase that? 🙏' : 'Dạ bạn hỏi lại giúp mình nha 🙏')

    // Store in memory for fallback
    if (convId) {
      const stored = conversationStore.get(convId) || []
      stored.push({ role: 'user', content: question })
      stored.push({ role: 'assistant', content: reply })
      conversationStore.set(convId, stored)
    }

    return reply
  } catch (error) {
    console.error('DeepSeek fetch error:', error.message)
    return isEnglish
      ? "We're having a connection issue. Please try again in a moment 📡"
      : 'Dạ shop đang bị lỗi mạng, bạn đợi mình xíu rồi gửi lại nha 📡'
  }
}

/**
 * Clear conversation history for a specific conversation.
 */
export function clearHistory(convId) {
  if (convId) {
    conversationStore.delete(convId)
  }
}

export function isReady() {
  if (!getApiKey()) return { ready: false, reason: 'Chưa có API key' }
  if (!dataset) return { ready: false, reason: 'Chưa load dataset' }
  return { ready: true, reason: '' }
}

/**
 * Simple heuristic to detect if a string is primarily English.
 * Returns true if text has Latin characters and no Vietnamese diacritics.
 */
export function detectLanguage(text) {
  const hasVietnamese = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(text)
  if (hasVietnamese) return 'vi'
  const hasLatin = /[a-zA-Z]/.test(text)
  return hasLatin ? 'en' : 'vi'
}
