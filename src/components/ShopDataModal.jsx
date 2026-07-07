import { SHOP_DATASET, SHOP_INFO } from '../lib/config'

/**
 * Full-screen modal showing shop dataset — all products + shop info.
 * Instagram-style UI, scrollable product grid.
 */
export default function ShopDataModal({ open, onClose }) {
  if (!open) return null

  // Group products by category
  const categories = {}
  SHOP_DATASET.forEach((item) => {
    if (!categories[item.category]) categories[item.category] = []
    categories[item.category].push(item)
  })

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Sheet / Modal */}
      <div className="relative w-full md:w-[600px] max-h-[90vh] md:max-h-[85vh] bg-ig-canvas md:rounded-ig-lg overflow-hidden flex flex-col shadow-xl animate-slide-up">
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-ig-border">
          <div>
            <h2 className="text-fs-ig-username text-ig-ink">{SHOP_INFO.name}</h2>
            <p className="text-fs-ig-caption text-ig-body">📦 {SHOP_DATASET.length} sản phẩm · 7 danh mục</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center hover:bg-ig-canvas-soft rounded-ig-avatar transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-ig-ink">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Shop info summary */}
        <div className="shrink-0 px-4 py-3 border-b border-ig-border bg-ig-canvas-soft">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-fs-ig-caption text-ig-body">
            <span>📍 {SHOP_INFO.location}</span>
            <span>📞 {SHOP_INFO.phone}</span>
            <span>🕐 {SHOP_INFO.openHours}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-fs-ig-caption text-ig-body">
            <span>🚚 Freeship đơn từ {SHOP_INFO.shipping.freeShipMin}</span>
            <span>🔄 Đổi trả 7 ngày</span>
            <span>💳 COD / CK / Momo</span>
          </div>
          {/* Promotions */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SHOP_INFO.promotions.map((p, i) => (
              <span key={i} className="inline-block px-2 py-0.5 rounded-ig-md text-fs-ig-caption bg-ig-primary/10 text-ig-primary">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Product list */}
        <div className="flex-1 overflow-y-auto scroll-thin px-4 py-3">
          {Object.entries(categories).map(([cat, items]) => (
            <div key={cat} className="mb-5">
              <h3 className="text-fs-ig-username text-ig-ink mb-3 flex items-center gap-2">
                <span className="w-1 h-5 rounded-ig-sm bg-gradient-to-b from-[#f09433] via-[#dc2743] to-[#bc1888]" />
                {cat}
                <span className="text-fs-ig-caption text-ig-body font-normal">({items.length} SP)</span>
              </h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-2 rounded-ig-md border border-ig-border bg-ig-canvas hover:bg-ig-canvas-soft transition-colors"
                  >
                    {/* Product image */}
                    <div className="shrink-0 w-[80px] h-[80px] rounded-ig-md overflow-hidden bg-ig-canvas-soft">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-fs-ig-caption text-ig-body">
                          No img
                        </div>
                      )}
                    </div>
                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-fs-ig-body text-ig-ink font-semibold truncate">
                          {item.name}
                          {item.bestSeller && <span className="ml-1.5 text-[10px] text-[#dc2743] font-semibold">BEST</span>}
                        </h4>
                        <span className="shrink-0 text-fs-ig-caption text-ig-body">{item.id}</span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-fs-ig-body text-ig-ink font-semibold">{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-fs-ig-caption text-ig-body line-through">{item.originalPrice}</span>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {item.colors.slice(0, 3).map((c, i) => (
                          <span key={i} className="text-fs-ig-caption px-1.5 py-0.5 rounded-ig-sm bg-ig-canvas-soft text-ig-body">
                            {c}
                          </span>
                        ))}
                        <span className="text-fs-ig-caption px-1.5 py-0.5 rounded-ig-sm bg-ig-canvas-soft text-ig-body">
                          Size: {item.sizes.join(', ')}
                        </span>
                      </div>
                      <p className="mt-1 text-fs-ig-caption text-ig-body line-clamp-2 leading-snug">
                        {item.material}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-4 py-2 border-t border-ig-border text-center text-fs-ig-caption text-ig-body">
          💡 Khi chat với shop, AI sẽ dùng dữ liệu này để tư vấn sản phẩm. Gõ tên sản phẩm hoặc danh mục để hỏi.
        </div>
      </div>
    </div>
  )
}
