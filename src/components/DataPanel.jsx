import { SHOP_DATASET, SHOP_INFO } from '../lib/config'

/**
 * Inline shop data panel — shows products + shop info.
 * Used as a split panel alongside ChatView.
 */
export default function DataPanel() {
  const categories = {}
  SHOP_DATASET.forEach((item) => {
    if (!categories[item.category]) categories[item.category] = []
    categories[item.category].push(item)
  })

  return (
    <div className="h-full flex flex-col bg-ig-canvas border-r border-ig-border">
      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b border-ig-border">
        <h2 className="text-fs-ig-username text-ig-ink">{SHOP_INFO.name}</h2>
        <div className="flex items-center gap-2 mt-0.5 text-fs-ig-caption text-ig-body">
          <span>📦 {SHOP_DATASET.length} SP</span>
          <span>·</span>
          <span>7 danh mục</span>
          <span>·</span>
          <span>🟢 AI sẵn sàng</span>
        </div>
      </div>

      {/* Shop info bar */}
      <div className="shrink-0 px-4 py-2 border-b border-ig-border bg-ig-canvas-soft space-y-1 text-fs-ig-caption text-ig-body">
        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
          <span>📍 {SHOP_INFO.location.split(',')[0]}</span>
          <span>📞 {SHOP_INFO.phone}</span>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
          <span>🚚 Freeship từ {SHOP_INFO.shipping.freeShipMin}</span>
          <span>🔄 Đổi trả 7 ngày</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {SHOP_INFO.promotions.slice(0, 2).map((p, i) => (
            <span key={i} className="inline-block px-1.5 py-0.5 rounded-ig-sm bg-ig-primary/10 text-ig-primary text-[10px] leading-tight">
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Product list */}
      <div className="flex-1 overflow-y-auto scroll-thin px-3 py-2">
        {Object.entries(categories).map(([cat, items]) => (
          <div key={cat} className="mb-4">
            <h3 className="text-fs-ig-caption text-ig-ink font-semibold mb-2 flex items-center gap-1.5 sticky top-0 bg-ig-canvas py-1">
              <span className="w-1 h-4 rounded-ig-sm bg-gradient-to-b from-[#f09433] via-[#dc2743] to-[#bc1888]" />
              {cat}
              <span className="text-ig-body font-normal">({items.length})</span>
            </h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-2 p-2 rounded-ig-md border border-ig-border hover:bg-ig-canvas-soft transition-colors cursor-default"
                >
                  {/* Thumbnail */}
                  <div className="shrink-0 w-[56px] h-[56px] rounded-ig-md overflow-hidden bg-ig-canvas-soft">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-fs-ig-caption text-ig-ink font-semibold truncate">{item.name}</span>
                      {item.bestSeller && (
                        <span className="shrink-0 text-[9px] text-[#dc2743] font-bold">BEST</span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-fs-ig-caption text-ig-ink font-semibold">{item.price}</span>
                      <span className="text-[10px] text-ig-body line-through">{item.originalPrice}</span>
                    </div>
                    <p className="text-[10px] text-ig-body mt-0.5 line-clamp-1 leading-tight">
                      {item.colors.slice(0, 2).join(', ')} · {item.sizes.slice(0, 3).join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <div className="shrink-0 px-3 py-2 border-t border-ig-border text-[10px] text-ig-body text-center bg-ig-canvas-soft">
        💡 Chat với <b>2N Store</b> để AI tư vấn dựa trên data này
      </div>
    </div>
  )
}
