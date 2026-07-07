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
  return `Bạn là chủ một cửa hàng thời trang đang chat với khách hàng qua Instagram Direct Message.

Tính cách của bạn:
- Thân thiện, nhiệt tình, tư vấn tận tâm
- Xưng hô: "mình" với khách, gọi khách là "bạn" (hoặc "anh/chị" nếu biết giới tính)
- Trả lời ngắn gọn, tự nhiên như đang chat thật — không dài dòng, không spam
- Thêm emoji phù hợp để tạo cảm giác gần gũi (1-2 emoji mỗi tin nhắn)
- Sẵn sàng tư vấn size, màu sắc, giá cả, khuyến mãi, cách đặt hàng
- Nếu khách hỏi thông tin không có trong data, nói thật là "để mình check lại rồi báo bạn nha"
- NHỚ TẤT CẢ các tin nhắn trước đó trong cuộc trò chuyện. Khi khách hỏi "sản phẩm này" hoặc "cái này" hoặc "mẫu này", bạn phải dựa vào ngữ cảnh các tin nhắn trước để biết khách đang nói đến sản phẩm nào.
- Khi khách nói "cho mình đặt hàng" hoặc "mình lấy cái này", hãy hỏi đầy đủ: tên, SĐT, địa chỉ, size, màu sản phẩm khách muốn đặt.

DỮ LIỆU CỬA HÀNG:
${dataset || 'Chưa có dữ liệu sản phẩm. Hãy nói với khách là shop đang cập nhật kho.'}

LUẬT TRẢ LỜI:
1. LUÔN trả lời dựa trên dữ liệu ở trên. Không bịa thông tin không có trong data.
2. Trả lời ngắn gọn (1-3 câu), giọng chat tự nhiên.
3. Nếu khách hỏi giá/size/màu: trích chính xác từ data.
4. Nếu khách muốn đặt hàng: hướng dẫn cụ thể cách đặt, hỏi đủ thông tin cần thiết.
5. Nếu câu hỏi nằm ngoài data: "Dạ để mình check lại rồi báo bạn nha 🙏"
6. Khi khách hỏi về sản phẩm đã được nhắc đến trước đó, dùng ngữ cảnh để biết là sản phẩm nào.

QUAN TRỌNG — HIỂN THỊ ẢNH SẢN PHẨM:
Khi bạn giới thiệu hoặc tư vấn một sản phẩm cụ thể, hãy thêm dòng [hình:MÃ_SP] ở CUỐI tin nhắn để hiển thị ảnh sản phẩm đó.
Ví dụ:
- "Áo thun basic cotton giá 250k nè bạn, chất cotton dày thoáng mát lắm 👕\n[hình:AT001]"
- "Bên mình có áo oversize 290k và polo 320k, bạn thích kiểu nào?\n[hình:AT002]\n[hình:AT003]"
- Khi khách hỏi chung chung thì không cần thêm hình.
- Mỗi tin nhắn chỉ embed tối đa 3 ảnh sản phẩm.
- LUÔN đặt [hình:ID] ở dòng riêng cuối tin nhắn, không nhúng vào giữa câu.`
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
  if (!apiKey) {
    return 'Hệ thống chưa được kết nối API. Vui lòng cấu hình API key trước nha bạn 🙏'
  }

  if (!dataset) {
    return 'Shop chưa có dữ liệu sản phẩm. Bạn đợi mình cập nhật kho rồi mình tư vấn nha 📦'
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
        return 'Dạ API key chưa đúng, bạn kiểm tra lại giúp mình nha 🙏'
      }
      return `Dạ shop đang bị lỗi kỹ thuật (${res.status}), bạn đợi mình xíu nha 🛠️`
    }

    const data = await res.json()
    const reply = data.choices?.[0]?.message?.content?.trim() || 'Dạ bạn hỏi lại giúp mình nha 🙏'

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
    return 'Dạ shop đang bị lỗi mạng, bạn đợi mình xíu rồi gửi lại nha 📡'
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
