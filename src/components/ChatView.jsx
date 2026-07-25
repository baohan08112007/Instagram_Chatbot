import { useState, useRef, useEffect } from 'react'
import { askShopOwner, isReady } from '../lib/openrouter'
import { PRODUCT_IMAGE_MAP } from '../lib/config'

/**
 * Parse [hình:PRODUCT_ID] tags from text.
 * Returns { cleanText, images: [{id, name, image, price}] }
 */
function parseProductImages(text) {
  const imageRegex = /\[hình:(\w+)\]/g
  const images = []
  let match
  while ((match = imageRegex.exec(text)) !== null) {
    const product = PRODUCT_IMAGE_MAP[match[1]]
    if (product) images.push({ id: match[1], ...product })
  }
  const cleanText = text.replace(imageRegex, '').trim()
  return { cleanText, images }
}

/**
 * Parse [qr-payment] tag from text.
 * Returns { cleanText, hasQR }
 */
function parseQRPayment(text) {
  const hasQR = /\[qr-payment\]/i.test(text)
  const cleanText = text.replace(/\[qr-payment\]/gi, '').trim()
  return { cleanText, hasQR }
}

/**
 * Instagram DM Conversation View.
 * Header + message list + input bar — exact Instagram layout.
 * Persists messages to cookies via onMessagesChange callback.
 */
export default function ChatView({ conversation, onBack, onMessagesChange, showDataPanel, onToggleData }) {
  const [messages, setMessages] = useState(conversation?.messages || [])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const isFirstRender = useRef(true)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Persist messages to cookie whenever they change (skip initial mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (onMessagesChange && conversation?.id) {
      onMessagesChange(conversation.id, messages)
    }
  }, [messages, conversation?.id, onMessagesChange])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setMessages(conversation?.messages || [])
    isFirstRender.current = true // reset flag when switching conversations
  }, [conversation?.id])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = {
      id: Date.now().toString(),
      text,
      from: 'user',
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    const { ready } = isReady()
    if (ready) {
      // Pass full message history + conversation ID for context-aware replies
      const reply = await askShopOwner(text, messages, conversation?.id)
      const botMsg = {
        id: (Date.now() + 1).toString(),
        text: reply,
        from: 'shop',
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, botMsg])
    } else {
      // Offline fallback — shop auto-replies with demo data
      const fallback = getFallbackReply(text)
      const botMsg = {
        id: (Date.now() + 1).toString(),
        text: fallback,
        from: 'shop',
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, botMsg])
    }

    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const statusText = conversation?.active ? 'Active now' : conversation?.lastSeen || ''

  return (
    <div className="h-full flex flex-col bg-ig-canvas">
      {/* ── Header ── */}
      <div className="h-ig-nav shrink-0 flex items-center gap-3 px-4 border-b border-ig-border">
        {/* Back button */}
        <button
          onClick={onBack}
          className="shrink-0 w-8 h-8 flex items-center justify-center hover:bg-ig-canvas-soft rounded-ig-avatar transition-colors md:hidden"
          aria-label="Back to inbox"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-ig-ink">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Avatar */}
        <div className="shrink-0 w-8 h-8 rounded-ig-avatar bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px]">
          <div className="w-full h-full rounded-ig-avatar bg-ig-canvas flex items-center justify-center overflow-hidden">
            {conversation?.avatar ? (
              <img src={conversation.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-ig-ink text-[10px] font-semibold">
                {conversation?.name?.charAt(0)?.toUpperCase() || 'S'}
              </span>
            )}
          </div>
        </div>

        {/* Name + Status */}
        <div className="flex-1 min-w-0">
          <h2 className="text-fs-ig-username text-ig-ink truncate">{conversation?.name || 'Shop'}</h2>
          {statusText && (
            <p className="text-fs-ig-caption text-ig-body truncate">{statusText}</p>
          )}
        </div>

        {/* Action icons */}
        <button
          onClick={onToggleData}
          className={`shrink-0 w-8 h-8 flex items-center justify-center hover:bg-ig-canvas-soft rounded-ig-avatar transition-colors ${showDataPanel ? 'text-ig-primary' : 'text-ig-ink'}`}
          aria-label="Toggle shop data panel"
          title={showDataPanel ? 'Ẩn dữ liệu shop' : 'Xem dữ liệu shop'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={showDataPanel ? 'text-ig-primary' : 'text-ig-ink'}>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </button>
        <button
          className="shrink-0 w-8 h-8 flex items-center justify-center hover:bg-ig-canvas-soft rounded-ig-avatar transition-colors"
          aria-label="Voice call"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ig-ink">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </button>
        <button
          className="shrink-0 w-8 h-8 flex items-center justify-center hover:bg-ig-canvas-soft rounded-ig-avatar transition-colors"
          aria-label="Video call"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ig-ink">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        </button>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto scroll-thin px-4 py-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 rounded-ig-avatar bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px] mb-3">
              <div className="w-full h-full rounded-ig-avatar bg-ig-canvas flex items-center justify-center">
                <span className="text-2xl font-semibold text-ig-ink">
                  {conversation?.name?.charAt(0)?.toUpperCase() || 'S'}
                </span>
              </div>
            </div>
            <h3 className="text-fs-ig-username text-ig-ink">{conversation?.name || 'Shop'}</h3>
            <p className="text-fs-ig-body text-ig-body mt-1">
              Bắt đầu chat với shop. Hỏi mình bất cứ điều gì về sản phẩm nha! 🛍️
            </p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const isUser = msg.from === 'user'
            const showAvatar = !isUser && (i === 0 || messages[i - 1]?.from !== msg.from)

            return (
              <div
                key={msg.id}
                className={`flex gap-2 mb-1 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {/* Avatar for shop messages (first in group) */}
                {!isUser && (
                  <div className="shrink-0 w-6">
                    {showAvatar ? (
                      <div className="w-6 h-6 rounded-ig-avatar bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] p-[1.5px]">
                        <div className="w-full h-full rounded-ig-avatar bg-ig-canvas flex items-center justify-center overflow-hidden">
                          {conversation?.avatar ? (
                            <img src={conversation.avatar} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[8px] font-semibold text-ig-ink">
                              {conversation?.name?.charAt(0)?.toUpperCase() || 'S'}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="w-6" />
                    )}
                  </div>
                )}

                {/* Message content */}
                <div className={`max-w-[70%] ${isUser ? 'order-1' : ''}`}>
                  {(() => {
                    const { cleanText: textAfterQR, hasQR } = parseQRPayment(msg.text)
                    const { cleanText, images } = parseProductImages(textAfterQR)
                    return (
                      <>
                        <div
                          className={`px-3 py-2 text-fs-ig-body text-ig-body leading-[18px] whitespace-pre-wrap break-words ${
                            isUser
                              ? 'bg-[#efefef] text-ig-ink rounded-[18px] rounded-br-[4px]'
                              : 'bg-ig-canvas text-ig-ink rounded-[18px] rounded-bl-[4px] border border-ig-border'
                          }`}
                        >
                          {cleanText}
                        </div>
                        {/* Product images */}
                        {images.length > 0 && (
                          <div className={`flex gap-1.5 mt-1.5 flex-wrap ${isUser ? 'justify-end' : 'justify-start'}`}>
                            {images.map((img) => (
                              <div
                                key={img.id}
                                className="w-[120px] overflow-hidden rounded-ig-md border border-ig-border bg-ig-canvas-soft"
                              >
                                <img
                                  src={img.image}
                                  alt={img.name}
                                  className="w-full h-[120px] object-cover"
                                  loading="lazy"
                                />
                                <div className="px-2 py-1.5">
                                  <p className="text-fs-ig-caption text-ig-ink font-semibold leading-tight line-clamp-2">
                                    {img.name}
                                  </p>
                                  <p className="text-fs-ig-caption text-ig-primary font-semibold mt-0.5">
                                    {img.price}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {/* QR Payment Card */}
                        {hasQR && !isUser && (
                          <div className="mt-2 w-[200px] overflow-hidden rounded-[16px] border border-ig-border bg-white shadow-sm">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-3 py-2 flex items-center gap-2">
                              <span className="text-white text-[11px] font-bold tracking-wide">ACB</span>
                              <span className="text-blue-100 text-[10px]">Thanh toán QR</span>
                            </div>
                            <div className="px-3 pt-2 pb-1">
                              <p className="text-[10px] text-gray-500 font-medium">Chủ tài khoản</p>
                              <p className="text-[11px] text-gray-800 font-bold">LUU NGUYEN BAO HAN</p>
                              <p className="text-[10px] text-gray-500 mt-0.5">STK: 2071108</p>
                            </div>
                            <div className="px-3 pb-3">
                              <img
                                src="/images/qr_payment.jpg"
                                alt="QR thanh toán ACB"
                                className="w-full rounded-[8px] border border-gray-100"
                                loading="lazy"
                              />
                            </div>
                            <div className="bg-gray-50 px-3 py-1.5 flex items-center gap-1.5 border-t border-gray-100">
                              <span className="text-[9px] text-gray-400 font-medium">VIETQR</span>
                              <span className="text-gray-300 text-[9px]">•</span>
                              <span className="text-[9px] text-gray-400">napas 247</span>
                            </div>
                          </div>
                        )}
                      </>
                    )
                  })()}
                  {/* Time */}
                  <p className={`text-fs-ig-caption text-ig-body mt-0.5 ${isUser ? 'text-right mr-1' : 'ml-1'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            )
          })
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="flex gap-2 mb-1 justify-start">
            <div className="shrink-0 w-6">
              <div className="w-6 h-6 rounded-ig-avatar bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] p-[1.5px]">
                <div className="w-full h-full rounded-ig-avatar bg-ig-canvas flex items-center justify-center">
                  <span className="text-[8px] font-semibold text-ig-ink">S</span>
                </div>
              </div>
            </div>
            <div className="px-3 py-2 bg-ig-canvas border border-ig-border rounded-[18px] rounded-bl-[4px]">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-ig-body rounded-ig-avatar animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-ig-body rounded-ig-avatar animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-ig-body rounded-ig-avatar animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Bar ── */}
      <div className="shrink-0 border-t border-ig-border px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Camera / Attachment */}
          <button
            className="shrink-0 w-8 h-8 flex items-center justify-center hover:bg-ig-canvas-soft rounded-ig-avatar transition-colors"
            aria-label="Attach image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-ig-ink">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </button>

          {/* Text input */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message..."
              disabled={loading}
              className="w-full bg-ig-canvas text-ig-ink text-fs-ig-body py-2 px-0 border-none outline-none placeholder:text-ig-body"
            />
          </div>

          {/* Send / Like toggle */}
          {input.trim() ? (
            <button
              onClick={handleSend}
              disabled={loading}
              className="shrink-0 text-ig-primary text-fs-ig-button font-semibold hover:text-ig-primary-hover transition-colors disabled:opacity-30"
            >
              Send
            </button>
          ) : (
            <button
              className="shrink-0 w-8 h-8 flex items-center justify-center hover:bg-ig-canvas-soft rounded-ig-avatar transition-colors"
              aria-label="Like"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ig-ink">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Fallback replies when Gemini API is not configured.
 * Demo mode — simulates shop owner responses.
 */
function getFallbackReply(text) {
  const lower = text.toLowerCase()

  if (lower.includes('giá') || lower.includes('bao nhiêu')) {
    return 'Dạ bên mình có nhiều mức giá lắm, từ 200k đến 1tr2 tùy mẫu. Bạn muốn tham khảo dòng nào để mình báo giá cụ thể nha 🛍️\n[hình:AT001]\n[hình:AS001]'
  }
  if (lower.includes('size') || lower.includes('cỡ')) {
    return 'Bên mình có size S, M, L, XL nha. Bạn cao bao nhiêu, nặng bao nhiêu để mình tư vấn size chuẩn cho 😊'
  }
  if (lower.includes('màu') || lower.includes('color')) {
    return 'Mẫu này mình có 3 màu: đen, trắng, xanh rêu. Để mình gửi bạn xem hình từng màu nha 🎨\n[hình:AT002]'
  }
  if (lower.includes('hello') || lower.includes('chào') || lower.includes('hi') || lower.includes('alo')) {
    return 'Chào bạn! Shop có thể giúp gì cho bạn hôm nay ạ? 🛍️✨\n[hình:AT001]\n[hình:G001]\n[hình:PK001]'
  }
  if (lower.includes('ship') || lower.includes('giao hàng') || lower.includes('vận chuyển')) {
    return 'Shop giao hàng toàn quốc nha. Nội thành Sài Gòn 1-2 ngày, tỉnh 3-5 ngày. Freeship đơn từ 500k nè 🚚'
  }
  if (lower.includes('đặt hàng') || lower.includes('mua') || lower.includes('order')) {
    return 'Dạ bạn để lại tên, sđt và mẫu muốn order, mình chốt đơn cho bạn luôn nha 📝'
  }
  if (lower.includes('áo thun') || lower.includes('áo')) {
    return 'Dạ bên mình có áo thun basic 250k, oversize 290k và polo 320k. Bạn thích kiểu nào?\n[hình:AT001]\n[hình:AT002]\n[hình:AT003]'
  }
  if (lower.includes('jeans') || lower.includes('quần jeans') || lower.includes('quần dài')) {
    return 'Bên mình có quần jeans slim fit 550k và straight fit 590k. Bạn thích dáng ôm hay ống đứng?\n[hình:QJ001]\n[hình:QJ002]'
  }
  if (lower.includes('short') || lower.includes('quần short') || lower.includes('quần đùi')) {
    return 'Dạ có quần short kaki 290k và short thể thao nỉ 220k nha. Bạn cần kiểu lịch sự hay năng động?\n[hình:QS001]\n[hình:QS002]'
  }
  if (lower.includes('khoác') || lower.includes('áo khoác') || lower.includes('bomber') || lower.includes('hoodie')) {
    return 'Bên mình có áo bomber 650k và hoodie nỉ 450k. Bạn cần áo chống gió hay áo giữ ấm?\n[hình:AK001]\n[hình:AK002]'
  }
  if (lower.includes('giày') || lower.includes('sneaker')) {
    return 'Dạ có sneaker basic trắng 720k, da PU cao cấp, đế êm đi cả ngày. Còn size 38-43 nha 👟\n[hình:G001]'
  }
  if (lower.includes('túi') || lower.includes('tote') || lower.includes('phụ kiện')) {
    return 'Dạ bên mình có túi tote canvas 180k, mũ lưỡi trai 150k và tất bộ 3 đôi 90k nè 🎒\n[hình:PK001]\n[hình:PK002]'
  }
  if (lower.includes('đầm') || lower.includes('váy')) {
    return 'Dạ có đầm suông basic 350k, cotton lụa mềm mịn, form rộng nhẹ. Có 4 màu: đen, be, xanh pastel, hồng nhạt 👗\n[hình:DV001]'
  }

  return 'Dạ cảm ơn bạn đã quan tâm! Bạn cần mình tư vấn thêm gì không ạ? 💕'
}
