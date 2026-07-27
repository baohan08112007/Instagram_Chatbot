/**
 * Hardcoded shop config — chỉnh sửa trực tiếp file này.
 * API key → .env (VITE_OPENROUTER_API_KEY)
 * Dataset → bên dưới (SHOP_DATASET)
 */

export const SHOP_DATASET = [
  // ── ÁO THUN ──
  {
    id: 'AT001',
    category: 'Áo thun',
    name: 'Áo thun basic cotton',
    price: '250,000đ',
    originalPrice: '350,000đ',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['đen', 'trắng', 'xám', 'xanh navy'],
    material: '100% cotton chải kỹ, định lượng 220gsm',
    description: 'Áo thun cotton dày dặn, form regular vừa vặn. Cổ tròn bo chắc, không giãn sau nhiều lần giặt. Phù hợp mặc hàng ngày, đi chơi, đi làm.',
    care: 'Giặt máy dưới 40°C, không tẩy, sấy nhiệt thấp',
    stock: 'Còn hàng — tất cả size và màu',
    bestSeller: true,
    tags: ['basic', 'cotton', 'hàng ngày', 'unisex'],
    image: '/images/ao_thun_basic.png',
  },
  {
    id: 'AT002',
    category: 'Áo thun',
    name: 'Áo thun oversize form rộng',
    price: '290,000đ',
    originalPrice: '390,000đ',
    sizes: ['S/M', 'L/XL', '2XL'],
    colors: ['đen', 'trắng kem', 'xám nhạt', 'xanh rêu'],
    material: 'Cotton compact 250gsm, xử lý hoàn thiện bề mặt mịn',
    description: 'Áo thun oversize dáng rộng, tay lỡ. Chất vải dày, đứng form, không bai. Phong cách streetwear, unisex. Phối layer hoặc mặc một mình đều đẹp.',
    care: 'Giặt tay hoặc giặt máy nhẹ, lộn trái khi giặt, không sấy',
    stock: 'Còn hàng — thiếu size 2XL màu xanh rêu',
    bestSeller: true,
    tags: ['oversize', 'streetwear', 'unisex', 'hot trend'],
    image: '/images/thun form rộng.png',
  },
  {
    id: 'AT003',
    category: 'Áo thun',
    name: 'Áo thun polo cổ bẻ',
    price: '320,000đ',
    originalPrice: '420,000đ',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['đen', 'trắng', 'xanh navy', 'đỏ đô'],
    material: 'Cotton pique 65%, polyester 35%, chống nhăn',
    description: 'Polo cổ bẻ lịch sự, chất pique thoáng mát, thấm hút mồ hôi tốt. Phù hợp đi làm văn phòng casual, đi chơi, golf.',
    care: 'Giặt máy dưới 30°C, ủi nhiệt thấp, không tẩy',
    stock: 'Còn hàng — đầy đủ',
    bestSeller: false,
    tags: ['polo', 'công sở', 'lịch sự', 'thoáng mát'],
    image: '/images/polo.png',
  },

  // ── ÁO SƠ MI ──
  {
    id: 'AS001',
    category: 'Áo sơ mi',
    name: 'Áo sơ mi trắng công sở',
    price: '380,000đ',
    originalPrice: '480,000đ',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['trắng', 'xanh nhạt', 'hồng nhạt', 'kem'],
    material: 'Cotton lụa 100%, chống nhăn nhẹ',
    description: 'Sơ mi cổ đức, tay dài, form slim fit tôn dáng. Vải cotton lụa mềm mịn, thoáng khí, không xù lông. Phù hợp đi làm, phỏng vấn, sự kiện.',
    care: 'Giặt tay hoặc giặt máy nhẹ, ủi hơi nước, treo móc bảo quản',
    stock: 'Còn hàng — thiếu size S màu hồng nhạt',
    bestSeller: true,
    tags: ['công sở', 'slim fit', 'lịch sự', 'sự kiện'],
    image: '/images/ao_so_mi_trang.png',
  },
  {
    id: 'AS002',
    category: 'Áo sơ mi',
    name: 'Áo sơ mi họa tiết Hawaii',
    price: '350,000đ',
    originalPrice: '450,000đ',
    sizes: ['M', 'L', 'XL'],
    colors: ['xanh dương (họa tiết hoa trắng)', 'đen (họa tiết lá)', 'đỏ (họa tiết nhiệt đới)'],
    material: 'Viscose 100%, in họa tiết chất lượng cao',
    description: 'Sơ mi họa tiết phong cách Hawaii, cổ camp, tay ngắn. Chất viscose mát lạnh, rũ đẹp, không nhăn. Cực hợp đi biển, du lịch, cafe cuối tuần.',
    care: 'Giặt tay dưới 30°C, không ngâm, phơi bóng râm',
    stock: 'Còn hàng — đủ màu, size',
    bestSeller: false,
    tags: ['hawaii', 'du lịch', 'biển', 'họa tiết', 'mùa hè'],
    image: '/images/Ao_so_mi_hawaii.png',
  },

  // ── QUẦN JEANS ──
  {
    id: 'QJ001',
    category: 'Quần jeans',
    name: 'Quần jeans slim fit',
    price: '550,000đ',
    originalPrice: '700,000đ',
    sizes: ['28', '29', '30', '31', '32', '33', '34'],
    colors: ['xanh đậm', 'xanh nhạt', 'đen', 'xám'],
    material: 'Denim cotton 98%, spandex 2%, co giãn nhẹ',
    description: 'Jeans slim fit ôm vừa phải, co giãn 2 chiều thoải mái vận động. Đường may chắc chắn, khóa YKK, da dê dán nhãn. Phù hợp mặc hàng ngày, đi chơi, đi làm casual.',
    care: 'Giặt mặt trái, nước lạnh, không tẩy, phơi bóng râm',
    stock: 'Còn hàng — thiếu size 33, 34 màu xám',
    bestSeller: true,
    tags: ['jeans', 'slim fit', 'co giãn', 'hàng ngày'],
    image: '/images/jean.png',
  },
  {
    id: 'QJ002',
    category: 'Quần jeans',
    name: 'Quần jeans straight fit ống đứng',
    price: '590,000đ',
    originalPrice: '750,000đ',
    sizes: ['28', '29', '30', '31', '32', '33'],
    colors: ['xanh đậm wash', 'xanh nhạt rách gối', 'đen tuyền'],
    material: 'Denim 100% cotton, định lượng 13.5oz',
    description: 'Jeans straight fit ống đứng cổ điển. Denim dày 13.5oz, chất cứng cáp, mặc càng lâu càng đẹp. Phong cách vintage, retro. Phối với sneaker hoặc boots đều chất.',
    care: 'Không giặt thường xuyên, giặt tay nước lạnh khi cần, phơi tự nhiên',
    stock: 'Còn hàng — đủ size, màu xanh nhạt rách chỉ còn size 29-31',
    bestSeller: false,
    tags: ['jeans', 'straight', 'vintage', 'retro', 'dày dặn'],
    image: '/images/jean ống rộng.png',
  },

  // ── QUẦN SHORT ──
  {
    id: 'QS001',
    category: 'Quần short',
    name: 'Quần short kaki basic',
    price: '290,000đ',
    originalPrice: '380,000đ',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['be', 'xanh rêu', 'đen', 'nâu'],
    material: 'Cotton twill 100%, định lượng 280gsm',
    description: 'Quần short kaki dáng regular, dài trên gối 2-3cm. Có 4 túi, khóa kéo + cúc chắc chắn. Thoáng mát, phù hợp mặc nhà, đi chơi, du lịch hè.',
    care: 'Giặt máy bình thường, không tẩy, sấy nhiệt thấp',
    stock: 'Còn hàng — đầy đủ',
    bestSeller: false,
    tags: ['short', 'kaki', 'mùa hè', 'thoáng mát'],
    image: '/images/đùi kaki.png',
  },
  {
    id: 'QS002',
    category: 'Quần short',
    name: 'Quần short thể thao nỉ',
    price: '220,000đ',
    originalPrice: '300,000đ',
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: ['đen', 'xám', 'xanh navy'],
    material: 'Nỉ cotton 80%, polyester 20%, lót lưới mesh',
    description: 'Short thể thao nỉ mềm, có lót lưới mesh thoáng khí. Cạp thun co giãn + dây rút. Phù hợp tập gym, chạy bộ, mặc nhà.',
    care: 'Giặt máy dưới 40°C, không ủi, không sấy',
    stock: 'Còn hàng — đầy đủ',
    bestSeller: false,
    tags: ['thể thao', 'gym', 'nỉ', 'mặc nhà'],
    image: '/images/đùi thể thao.png',
  },

  // ── ÁO KHOÁC ──
  {
    id: 'AK001',
    category: 'Áo khoác',
    name: 'Áo khoác bomber basic',
    price: '650,000đ',
    originalPrice: '850,000đ',
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: ['đen', 'xanh navy', 'rêu', 'đỏ rượu'],
    material: 'Vải dù polyester chống gió, lót lưới polyester',
    description: 'Bomber jacket kiểu dáng classic. Vải dù chống gió nhẹ, chống nước mưa phùn. Lót lưới thoáng, tay bo gân, 2 túi khóa. Phù hợp thu đông, layer với hoodie bên trong.',
    care: 'Giặt tay hoặc giặt máy nhẹ, không tẩy, phơi bóng râm',
    stock: 'Còn hàng — thiếu màu đỏ rượu size M',
    bestSeller: true,
    tags: ['bomber', 'áo khoác', 'thu đông', 'chống gió'],
    image: '/images/ao_khoac_bomber.png',
  },
  {
    id: 'AK002',
    category: 'Áo khoác',
    name: 'Áo hoodie nỉ không mũ',
    price: '450,000đ',
    originalPrice: '580,000đ',
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: ['đen', 'xám, trắng, kem'],
    material: 'Nỉ chân cua 100% cotton, lót bông mỏng',
    description: 'Hoodie không mũ, dáng oversize nhẹ. Nỉ chân cua dày, ấm, lót bông giữ nhiệt tốt. Túi kangaroo trước, bo tay bo gấu chắc chắn. Mặc mùa đông hoặc layer với áo khoác ngoài.',
    care: 'Giặt máy dưới 30°C, lộn mặt trái, không sấy, không ủi trực tiếp lên hình in',
    stock: 'Còn hàng — thiếu 2XL màu kem',
    bestSeller: false,
    tags: ['hoodie', 'nỉ', 'mùa đông', 'giữ ấm', 'oversize'],
    image: 'https://images.pexels.com/photos/19461583/pexels-photo-19461583.jpeg?auto=compress&cs=tinysrgb&h=350',
  },


  // ── ĐẦM/VÁY ──
  {
    id: 'DV001',
    category: 'Đầm/Váy',
    name: 'Đầm suông basic nữ',
    price: '350,000đ',
    originalPrice: '450,000đ',
    sizes: ['S', 'M', 'L'],
    colors: ['đen', 'be', 'xanh pastel', 'hồng nhạt'],
    material: 'Cotton lụa 100%, mềm mịn, thoáng khí',
    description: 'Đầm suông basic form rộng nhẹ, dài trên gối 5-7cm. Cổ tròn, tay lỡ. Phù hợp đi làm, đi chơi, cafe với bạn bè. Dễ phối với sneaker hoặc sandal.',
    care: 'Giặt tay hoặc giặt máy nhẹ, không tẩy, ủi nhiệt thấp',
    stock: 'Còn hàng — đầy đủ',
    bestSeller: false,
    tags: ['đầm', 'váy', 'nữ', 'basic', 'suông'],
    image: '/images/Screenshot 2026-07-12 at 16.10.06.png',
  },
]

/** Map product ID → { name, image, price } for quick lookup in chat rendering */
export const PRODUCT_IMAGE_MAP = Object.fromEntries(
  SHOP_DATASET.map((p) => [p.id, { name: p.name, image: p.image, price: p.price }])
)

export const SHOP_INFO = {
  name: 'Hubi Store',
  owner: 'Hân',
  slogan: 'Chất lượng — Giá tốt — Giao nhanh',
  location: '123 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh',
  phone: '0901234567',
  email: 'hubistore@gmail.com',
  socials: {
    instagram: 'hubistore',
    facebook: 'fb.com/hubistore',
    shopee: 'shopee.vn/hubistore',
  },
  shipping: {
    policy: 'Giao hàng toàn quốc. Nội thành HCM 1-2 ngày, tỉnh thành khác 3-5 ngày. Đóng gói kỹ, check hàng trước khi nhận.',
    freeShipMin: '500,000đ',
    carriers: ['Giao Hàng Nhanh', 'Giao Hàng Tiết Kiệm', 'Viettel Post'],
  },
  payment: [
    'COD (thanh toán khi nhận hàng)',
    'Chuyển khoản ngân hàng (Vietcombank, MB Bank, Techcombank)',
    'Ví Momo / ZaloPay',
  ],
  returnPolicy: 'Đổi trả miễn phí trong 7 ngày nếu sản phẩm lỗi từ shop. Đổi size trong 3 ngày (khách trả ship 2 chiều). Sản phẩm phải còn tag, chưa giặt, chưa qua sử dụng.',
  warranty: 'Bảo hành đường may 30 ngày. Bảo hành đế giày 90 ngày.',
  openHours: '8:00 - 22:00 hàng ngày (kể cả T7, CN)',
  promotions: [
    '🎉 Giảm 10% cho đơn hàng đầu tiên (nhập mã: 2NFIRST)',
    '🚚 Freeship đơn từ 500,000đ',
    '👯 Mua 2 tặng 1 tất (bộ 3 đôi) — áp dụng đến hết tháng',
    '💎 Tích điểm thành viên: 100,000đ = 1 điểm, 10 điểm = giảm 100,000đ',
  ],
}

/**
 * Convert to plain text for Gemini prompt.
 */
export function datasetToText() {
  let text = `🏪 ${SHOP_INFO.name} — ${SHOP_INFO.owner}\n`
  text += `📌 ${SHOP_INFO.slogan}\n`
  text += `📍 ${SHOP_INFO.location}\n`
  text += `📞 ${SHOP_INFO.phone} | ✉️ ${SHOP_INFO.email}\n`
  text += `📱 IG: ${SHOP_INFO.socials.instagram} | FB: ${SHOP_INFO.socials.facebook}\n`
  text += `🕐 Mở cửa: ${SHOP_INFO.openHours}\n\n`

  text += '🚚 VẬN CHUYỂN:\n'
  text += `${SHOP_INFO.shipping.policy}\n`
  text += `Đơn vị vận chuyển: ${SHOP_INFO.shipping.carriers.join(', ')}\n`
  text += `Freeship đơn từ ${SHOP_INFO.shipping.freeShipMin}\n\n`

  text += '💳 THANH TOÁN:\n'
  SHOP_INFO.payment.forEach((p) => { text += `  - ${p}\n` })
  text += '\n'

  text += `🔄 ĐỔI TRẢ: ${SHOP_INFO.returnPolicy}\n`
  text += `🛡️ BẢO HÀNH: ${SHOP_INFO.warranty}\n\n`

  text += '🎁 KHUYẾN MÃI HIỆN TẠI:\n'
  SHOP_INFO.promotions.forEach((p) => { text += `  ${p}\n` })
  text += '\n'

  text += '📦 DANH SÁCH SẢN PHẨM:\n\n'

  // Nhóm theo category
  const categories = {}
  SHOP_DATASET.forEach((item) => {
    if (!categories[item.category]) categories[item.category] = []
    categories[item.category].push(item)
  })

  Object.entries(categories).forEach(([cat, items]) => {
    text += `── ${cat.toUpperCase()} ──\n\n`
    items.forEach((item) => {
      const discount = item.originalPrice
        ? ` (giá gốc ${item.originalPrice}, tiết kiệm ${Math.round((1 - parseInt(item.price.replace(/\D/g, '')) / parseInt(item.originalPrice.replace(/\D/g, ''))) * 100)}%)`
        : ''
      text += `🔖 ${item.name} — ${item.price}${discount}\n`
      text += `   Mã SP: ${item.id} (dùng [hình:${item.id}] để hiển thị ảnh sản phẩm này)\n`
      text += `   Size: ${item.sizes.join(', ')}\n`
      text += `   Màu: ${item.colors.join(', ')}\n`
      text += `   Chất liệu: ${item.material}\n`
      text += `   Mô tả: ${item.description}\n`
      text += `   Bảo quản: ${item.care}\n`
      text += `   Kho: ${item.stock}\n`
      if (item.bestSeller) text += `   🏆 Best seller!\n`
      text += '\n'
    })
  })

  return text
}