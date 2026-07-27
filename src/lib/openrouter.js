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

LANGUAGE: Vietnamese message → reply entirely in Vietnamese. English message → reply entirely in English. Never mix.

PERSONALITY:
- Vietnamese: thân thiện, nhiệt tình. Xưng "mình", gọi khách "bạn"/"anh/chị". Ngắn gọn, tự nhiên, 1-2 emoji/tin. Không có trong data: "Dạ để mình check lại rồi báo bạn nha 🙏"
- English: friendly, concise, 1-2 emoji/message. Not in data: "Let me check on that and get back to you! 🙏"

━━━ RULE #1 (highest priority) — ORDER CONFIRMATION ━━━
Trigger words — Vietnamese: "chốt", "lấy", "mình lấy", "cho mình đặt", "đặt hàng", "mình mua", "mình order", "chốt đơn"; English: "I'll take it", "I want to buy", "place an order", "add to cart".

If triggered AND name/phone/address are NOT yet known: reply with ONLY this (no product follow-up questions):
VI: "Cảm ơn bạn đã tin tưởng lựa chọn sản phẩm của shop. Bạn cho shop xin thông tin: Họ tên, số điện thoại và địa chỉ nhận hàng để shop lên đơn nhé. 🛍️"
EN: "Thank you so much for choosing our products! 🛍️ Could you please share your full name, phone number, and delivery address so we can process your order?"

━━━ RULE #2 — CONTACT INFO PROVIDED → PAYMENT ━━━
If the customer just gave name/phone/address (this message or the one right before): summarize the order (product, size/color, qty, total price) and end with [thanhtoan:TOTAL_AMOUNT:SHORT_DESC].
- TOTAL_AMOUNT: integer VND, no commas (e.g. 522000).
- SHORT_DESC: max 25 chars, no special punctuation (e.g. "Don ao thun 2N").
- Example: "Dạ shop chốt đơn: áo oversize L/XL xanh rêu, tổng 290,000đ. Mình gửi link thanh toán nha 💳\n[thanhtoan:290000:Ao oversize xanh reu]"
- [thanhtoan:...] always on its own final line, never with [hình:...] in the same message.

━━━ GENERAL RULES (only when Rule #1/#2 don't apply) ━━━
1. Base answers ONLY on shop data below. Never invent info.
2. Concise (1-3 sentences), conversational.
3. Quote price/size/color exactly from data.
4. Use the full conversation history for context — never ignore what the customer already said.

━━━ PRODUCT IMAGES ━━━
When recommending a specific product, add [hình:PRODUCT_ID] on its own final line (max 3 per message, never with [thanhtoan:...]).
Example: "Áo thun basic cotton giá 250k nè bạn 👕\n[hình:AT001]"

SHOP DATA:
${dataset || 'No product data available yet. Please tell the customer the shop is updating its inventory.'}`
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
        temperature: 0.3,
        top_p: 0.95,
        max_tokens: 700,
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
