import { useState, useCallback, useEffect } from "react";
import ChatList from "./components/ChatList";
import ChatView from "./components/ChatView";
import DataPanel from "./components/DataPanel";
import { loadDataset } from "./lib/openrouter";
import { datasetToText } from "./lib/config";
import {
  loadConversation,
  saveConversation,
  deleteConversation,
} from "./lib/storage";

// Load hardcoded dataset on startup
loadDataset(datasetToText());

/**
 * Avatar helper — uses picsum.photos (backed by Unsplash) with stable seed.
 * Each seed always returns the same image. 100x100, reliable CDN.
 */
function avatar(seed) {
  return `https://picsum.photos/seed/${seed}/100/100`;
}

/**
 * 10 Shop Conversations — each with 20+ messages.
 * Realistic Vietnamese shop-customer chat scenarios.
 * Shop #1 (2N Store) is the AI-connected shop.
 */

const DEMO_CONVERSATIONS = [
  // ═══════════════════════════════════════════════════════════
  // SHOP 1: 2N Store — Thời trang (AI-connected, active shop)
  // ═══════════════════════════════════════════════════════════
  {
    id: "shop",
    name: "2N Store",
    avatar: avatar("fashion-store"),
    lastSeen: "Active now",
    messages: [
      {
        id: "s01",
        text: "Chào bạn! Mình là 2N Store. Bạn cần tư vấn gì về thời trang cứ hỏi mình nha 🛍️✨",
        from: "shop",
        time: "09:00",
      },
      {
        id: "s02",
        text: "Chào shop, mình đang tìm áo thun basic mặc hàng ngày",
        from: "user",
        time: "09:01",
      },
      {
        id: "s03",
        text: "Dạ bên mình có áo thun basic cotton 250k và oversize 290k. Bạn thích form nào? Basic thì vừa vặn, oversize thì rộng rãi streetwear nha 😊",
        from: "shop",
        time: "09:02",
      },
      {
        id: "s04",
        text: "Mình thích oversize, màu xanh rêu có không shop?",
        from: "user",
        time: "09:03",
      },
      {
        id: "s05",
        text: "Dạ có nha bạn! Xanh rêu oversize còn size L/XL và 2XL. Bạn cao bao nhiêu để mình tư vấn size? 📏",
        from: "shop",
        time: "09:04",
      },
      { id: "s06", text: "Mình 1m72, 65kg", from: "user", time: "09:05" },
      {
        id: "s07",
        text: "Với chiều cao đó bạn lấy L/XL là vừa đẹp nha. Form oversize nên rộng thoải mái, không bị quá lùng bùng đâu 🙌",
        from: "shop",
        time: "09:05",
      },
      {
        id: "s08",
        text: "Ok để mình lấy 1 cái L/XL xanh rêu. Ship về Thủ Đức bao lâu shop?",
        from: "user",
        time: "09:06",
      },
      {
        id: "s09",
        text: "Dạ Thủ Đức nội thành nên 1-2 ngày là tới nha bạn. Đơn bạn 290k, thêm 60k nữa là được freeship đó, bạn muốn lấy thêm gì không? 🚚",
        from: "shop",
        time: "09:07",
      },
      {
        id: "s10",
        text: "Có quần short kaki nào phối với áo này đẹp không shop?",
        from: "user",
        time: "09:08",
      },
      {
        id: "s11",
        text: "Có nè! Quần short kaki be 290k phối với áo xanh rêu cực kỳ hợp luôn. Bạn lấy size gì? Short có S, M, L, XL nha 👖",
        from: "shop",
        time: "09:09",
      },
      {
        id: "s12",
        text: "Size L đi shop. Vậy là áo oversize + short kaki tổng 580k, được freeship luôn đúng không?",
        from: "user",
        time: "09:10",
      },
      {
        id: "s13",
        text: "Chuẩn luôn bạn ơi! 580k được freeship + giảm thêm 10% cho đơn đầu với mã 2NFIRST còn 522k thôi nè 🎉",
        from: "shop",
        time: "09:10",
      },
      {
        id: "s14",
        text: "Ngon quá! Cho mình đặt luôn. Mình tên Minh, 0909123456, 123 Lê Văn Việt, Thủ Đức",
        from: "user",
        time: "09:11",
      },
      {
        id: "s15",
        text: "Dạ shop ghi nhận đơn của bạn Minh nha: Áo oversize L/XL xanh rêu + Short kaki L be. Tổng 522k, COD. Chiều mai giao nha! 📝✅",
        from: "shop",
        time: "09:12",
      },
      {
        id: "s16",
        text: "Cảm ơn shop nhiều nha 💯",
        from: "user",
        time: "09:13",
      },
      {
        id: "s17",
        text: "Dạ cảm ơn bạn đã ủng hộ! Hàng về bạn check size, nếu không vừa mình đổi size miễn phí trong 3 ngày nha 🤗",
        from: "shop",
        time: "09:13",
      },
      {
        id: "s18",
        text: "À shop ơi, bạn mình cũng muốn mua áo polo cổ bẻ, có size XL không?",
        from: "user",
        time: "14:20",
      },
      {
        id: "s19",
        text: "Dạ polo có XL nha bạn, 320k. Màu đen, trắng, xanh navy, đỏ đô. Bạn mình thích màu gì? 👔",
        from: "shop",
        time: "14:21",
      },
      {
        id: "s20",
        text: "Màu đen đi shop. Cho mình đặt thêm 1 polo XL đen nữa nha",
        from: "user",
        time: "14:22",
      },
      {
        id: "s21",
        text: "Dạ oke bạn! Polo XL đen 320k. Mình gom chung đơn hôm qua chưa giao, giờ thêm polo luôn nha. Tổng mới 842k -10% còn 758k 🎉",
        from: "shop",
        time: "14:23",
      },
      {
        id: "s22",
        text: "Ok shop, cảm ơn nhiều! Mà polo có bảo hành gì không?",
        from: "user",
        time: "14:24",
      },
      {
        id: "s23",
        text: "Dạ bảo hành đường may 30 ngày bạn nha. Có gì bạn cứ nhắn mình, mình hỗ trợ liền 🤝",
        from: "shop",
        time: "14:24",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SHOP 2: Nhà Bè Shoes — Giày dép
  // ═══════════════════════════════════════════════════════════
  {
    id: "shop2",
    name: "Nhà Bè Shoes",
    avatar: avatar("shoe-store"),
    lastMessage: "Cảm ơn bạn đã ủng hộ, hẹn gặp lại nha! 👟",
    time: "2 giờ",
    unseen: true,
    messages: [
      {
        id: "n1",
        text: "Chào shop, mình cần tìm giày sneaker trắng basic",
        from: "user",
        time: "08:30",
      },
      {
        id: "n2",
        text: "Chào bạn! Bên mình có sneaker basic trắng 720k, da PU cao cấp, đế cao su non êm chân lắm nha 👟✨",
        from: "shop",
        time: "08:31",
      },
      {
        id: "n3",
        text: "Size 42 còn không shop?",
        from: "user",
        time: "08:32",
      },
      {
        id: "n4",
        text: "Dạ còn size 42 nha bạn. Mình còn 3 đôi trắng size 42. Bạn đi giày thường size bao nhiêu? Form này chuẩn, đi size bình thường là vừa.",
        from: "shop",
        time: "08:33",
      },
      {
        id: "n5",
        text: "Mình đi 42. Cho mình đặt 1 đôi. Có freeship không shop?",
        from: "user",
        time: "08:34",
      },
      {
        id: "n6",
        text: "Dạ đơn 720k trên 500k nên được freeship luôn nha. Bạn để lại tên, SĐT, địa chỉ mình chốt đơn 🚚",
        from: "shop",
        time: "08:35",
      },
      {
        id: "n7",
        text: "Tuấn - 0911222333 - 456 Nguyễn Huệ, Quận 1",
        from: "user",
        time: "08:36",
      },
      {
        id: "n8",
        text: "Dạ ghi nhận đơn: Sneaker trắng size 42, 720k, COD, giao trong 1-2 ngày. Cảm ơn bạn Tuấn! 📝",
        from: "shop",
        time: "08:37",
      },
      {
        id: "n9",
        text: "Shop ơi giày có bảo hành gì không?",
        from: "user",
        time: "08:38",
      },
      {
        id: "n10",
        text: "Dạ bảo hành đế 90 ngày, bong keo 30 ngày bạn nha. Có vấn đề gì cứ mang ra shop hoặc gửi về mình xử lý free 😊",
        from: "shop",
        time: "08:39",
      },
      {
        id: "n11",
        text: "Ok shop. À mình muốn hỏi thêm, có giày nào hợp đi tập gym không?",
        from: "user",
        time: "08:40",
      },
      {
        id: "n12",
        text: "Dạ có! Bên mình đang có sneaker đen đế boost, giá 850k, siêu nhẹ, đàn hồi tốt, chuyên cho gym và chạy bộ luôn 🏃‍♂️",
        from: "shop",
        time: "08:41",
      },
      {
        id: "n13",
        text: "Size 42 còn không? Cho mình xem hình với",
        from: "user",
        time: "08:42",
      },
      {
        id: "n14",
        text: "Dạ còn size 42 màu đen. Để mình gửi hình qua Zalo cho bạn nha. Bạn cho mình xin số Zalo 📸",
        from: "shop",
        time: "08:43",
      },
      {
        id: "n15",
        text: "0911222333 luôn đó shop",
        from: "user",
        time: "08:44",
      },
      {
        id: "n16",
        text: "Dạ mình gửi rồi nha. Đôi này đang có khuyến mãi giảm 15% còn 723k, rẻ hơn giá gốc 127k đó 🎉",
        from: "shop",
        time: "08:45",
      },
      {
        id: "n17",
        text: "Ngon! Cho mình đặt thêm đôi này luôn. Tổng 2 đôi bao nhiêu?",
        from: "user",
        time: "08:46",
      },
      {
        id: "n18",
        text: "Dạ sneaker trắng 720k + sneaker đen boost 723k = 1,443k. Được freeship + tặng kèm 3 đôi tất nha! 🧦🎁",
        from: "shop",
        time: "08:47",
      },
      {
        id: "n19",
        text: "Quá hời! Chốt luôn shop ơi",
        from: "user",
        time: "08:48",
      },
      {
        id: "n20",
        text: "Dạ chốt đơn: 2 đôi sneaker, tổng 1,443k, COD, giao 1-2 ngày. Cảm ơn bạn Tuấn đã ủng hộ! 👟🔥",
        from: "shop",
        time: "08:49",
      },
      {
        id: "n21",
        text: "Cảm ơn shop, nhớ gửi hàng sớm nha",
        from: "user",
        time: "08:50",
      },
      {
        id: "n22",
        text: "Dạ chiều nay mình gửi luôn, mai bạn nhận được nha! Cảm ơn bạn nhiều 🤗",
        from: "shop",
        time: "08:51",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SHOP 3: Mỹ Phẩm Hana — Mỹ phẩm Hàn Quốc
  // ═══════════════════════════════════════════════════════════
  {
    id: "shop3",
    name: "Mỹ Phẩm Hana",
    avatar: avatar("cosmetics-shop"),
    lastMessage: "Dạ em gửi chị bộ dưỡng da kèm quà tặng nha 💝",
    time: "30 phút",
    unseen: true,
    messages: [
      {
        id: "h1",
        text: "Chị ơi, shop bên em chuyên mỹ phẩm Hàn Quốc chính hãng nha. Chị cần tư vấn gì ạ? 💄🇰🇷",
        from: "shop",
        time: "10:00",
      },
      {
        id: "h2",
        text: "Chị đang tìm serum dưỡng ẩm, da chị hơi khô",
        from: "user",
        time: "10:01",
      },
      {
        id: "h3",
        text: "Dạ da khô thì em recommend serum HA (Hyaluronic Acid) của Klairs ạ. Dưỡng ẩm sâu, thẩm thấu nhanh, không bết dính. Giá 450k 🧴",
        from: "shop",
        time: "10:02",
      },
      {
        id: "h4",
        text: "Có sample không em? Chị muốn test trước khi mua full size",
        from: "user",
        time: "10:03",
      },
      {
        id: "h5",
        text: "Dạ có chị ơi! Mình có gói sample 5ml giá 50k để chị test thử trong 3-5 ngày. Hợp da thì chị quay lại lấy full size nha 💕",
        from: "shop",
        time: "10:04",
      },
      {
        id: "h6",
        text: "Ok em, cho chị lấy 1 sample serum + 1 kem dưỡng ẩm ban đêm luôn",
        from: "user",
        time: "10:05",
      },
      {
        id: "h7",
        text: "Dạ kem dưỡng đêm em có Laneige Water Sleeping Mask 350k hoặc Innisfree Green Tea 280k. Chị thích hãng nào ạ?",
        from: "shop",
        time: "10:06",
      },
      {
        id: "h8",
        text: "Laneige đi em, chị nghe nói hãng này nổi tiếng",
        from: "user",
        time: "10:07",
      },
      {
        id: "h9",
        text: "Dạ Laneige là best seller bên em luôn đó chị. Vậy sample serum Klairs 50k + Laneige mask 350k = 400k. Freeship cho chị luôn nha 🚚",
        from: "shop",
        time: "10:08",
      },
      {
        id: "h10",
        text: "Có giảm thêm gì không em?",
        from: "user",
        time: "10:09",
      },
      {
        id: "h11",
        text: "Dạ đơn đầu em tặng kèm mặt nạ giấy Mediheal 3 miếng + xịt khoáng mini nha. Trị giá quà tặng ~120k đó chị 🎁",
        from: "shop",
        time: "10:10",
      },
      {
        id: "h12",
        text: "Ok chốt đi em. Chị Hương, 0988777666, 78 Phan Đăng Lưu, Phú Nhuận",
        from: "user",
        time: "10:11",
      },
      {
        id: "h13",
        text: "Dạ em chốt đơn chị Hương: sample Klairs + Laneige mask = 400k, COD, tặng kèm quà. Chiều nay giao nha! 📝✨",
        from: "shop",
        time: "10:12",
      },
      {
        id: "h14",
        text: "Em ơi, chị dùng serum Klairs 3 ngày thấy da căng mịn quá! Cho chị đặt full size luôn",
        from: "user",
        time: "15:30",
      },
      {
        id: "h15",
        text: "Dạ em mừng quá! Serum Klairs full size 450k. Chị lấy thêm toner không ạ? Có bộ đôi serum + toner giá 800k tiết kiệm 100k so với mua lẻ 💰",
        from: "shop",
        time: "15:31",
      },
      {
        id: "h16",
        text: "Toner Klairs luôn hả em? Tốt không?",
        from: "user",
        time: "15:32",
      },
      {
        id: "h17",
        text: "Dạ toner Klairs chiết xuất từ tràm trà, se khít lỗ chân lông, cân bằng pH. Dùng chung với serum là combo hoàn hảo luôn chị 🍃",
        from: "shop",
        time: "15:33",
      },
      {
        id: "h18",
        text: "Ok em lấy luôn bộ đôi 800k đi. Mà lần trước em tặng mặt nạ, lần này có quà gì không?",
        from: "user",
        time: "15:34",
      },
      {
        id: "h19",
        text: "Dạ lần này em tặng chị kem chống nắng Klairs sample 10ml + dầu tẩy trang mini nha. Trị giá ~150k 🎁💝",
        from: "shop",
        time: "15:35",
      },
      {
        id: "h20",
        text: "Tuyệt vời! Chốt đơn giống địa chỉ cũ nha em",
        from: "user",
        time: "15:36",
      },
      {
        id: "h21",
        text: "Dạ em gửi đơn bộ đôi Klairs 800k, COD, tặng quà. Cảm ơn chị Hương đã tin tưởng ủng hộ em lần 2 ạ 🥰",
        from: "shop",
        time: "15:37",
      },
      {
        id: "h22",
        text: "Cảm ơn em, hàng về chị review cho",
        from: "user",
        time: "15:38",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SHOP 4: Tech House — Phụ kiện công nghệ
  // ═══════════════════════════════════════════════════════════
  {
    id: "shop4",
    name: "Tech House",
    avatar: avatar("tech-gadget"),
    lastMessage: "Mình để lại sđt 0909555111, có gì mình alo trực tiếp nha",
    time: "1 giờ",
    unseen: false,
    messages: [
      {
        id: "t1",
        text: "Chào anh! Bên em chuyên phụ kiện công nghệ: ốp lưng, sạc, tai nghe, loa bluetooth 📱🎧",
        from: "shop",
        time: "13:00",
      },
      {
        id: "t2",
        text: "Ốp lưng iPhone 16 Pro Max bên em có mẫu nào đẹp không?",
        from: "user",
        time: "13:01",
      },
      {
        id: "t3",
        text: "Dạ có anh ơi! Em mới về lô ốp lưng MagSafe trong suốt chống ố vàng, giá 350k. Với ốp da PU cao cấp 450k. Anh thích kiểu nào? 📱",
        from: "shop",
        time: "13:02",
      },
      {
        id: "t4",
        text: "Ốp da PU đi. Màu xanh navy có không?",
        from: "user",
        time: "13:03",
      },
      {
        id: "t5",
        text: "Dạ có xanh navy, với đen và nâu nữa. Ốp da PU có nam châm MagSafe, sạc không dây vẫn dùng bình thường. Sờ mềm, không bám mồ hôi 👍",
        from: "shop",
        time: "13:04",
      },
      {
        id: "t6",
        text: "Lấy xanh navy. Thêm cho mình cái sạc không dây MagSafe nữa",
        from: "user",
        time: "13:05",
      },
      {
        id: "t7",
        text: "Dạ sạc MagSafe chính hãng Apple 1,200k hoặc sạc Baseus 600k. Cả hai đều sạc 15W, Baseus rẻ hơn mà chất lượng tương đương. Anh lấy loại nào? 🔋",
        from: "shop",
        time: "13:06",
      },
      {
        id: "t8",
        text: "Baseus đi. Tổng thiệt hại bao nhiêu em?",
        from: "user",
        time: "13:07",
      },
      {
        id: "t9",
        text: "Dạ ốp da PU 450k + sạc Baseus 600k = 1,050k. Freeship + tặng kèm cường lực full màn nha anh 🎁",
        from: "shop",
        time: "13:08",
      },
      {
        id: "t10",
        text: "Cường lực dán sẵn hay tự dán?",
        from: "user",
        time: "13:09",
      },
      {
        id: "t11",
        text: "Dạ em dán sẵn cho anh luôn, miễn phí công dán. Có địa chỉ em ship qua hoặc anh qua shop em dán trực tiếp cũng được 😊",
        from: "shop",
        time: "13:10",
      },
      {
        id: "t12",
        text: "Ok để anh qua shop. Shop ở đâu?",
        from: "user",
        time: "13:11",
      },
      {
        id: "t13",
        text: "Dạ 42 Trần Quang Diệu, Quận 3. Mở cửa 9h-21h. Qua em dán cường lực + test sạc cho anh luôn 15 phút là xong ⚡",
        from: "shop",
        time: "13:12",
      },
      {
        id: "t14",
        text: "Ok chiều nay anh qua. À em có bán tai nghe AirPods không?",
        from: "user",
        time: "13:13",
      },
      {
        id: "t15",
        text: "Dạ có AirPods Pro 2 chính hãng 5,200k và AirPods 4 3,500k. Đều full box, bh 12 tháng. Anh cần loại nào? 🎧",
        from: "shop",
        time: "13:14",
      },
      {
        id: "t16",
        text: "AirPods Pro 2 còn hàng không? Cho anh test trước khi mua được không?",
        from: "user",
        time: "13:15",
      },
      {
        id: "t17",
        text: "Dạ còn hàng, mới seal nguyên hộp. Qua shop em mở cho anh test thoải mái, không vừa ý không lấy cũng được. Em tự tin sản phẩm chất lượng 💪",
        from: "shop",
        time: "13:16",
      },
      {
        id: "t18",
        text: "Ok vậy chiều anh qua xem AirPods luôn. Ưu tiên khách quen nhé",
        from: "user",
        time: "13:17",
      },
      {
        id: "t19",
        text: "Dạ vâng anh! Chiều anh qua em chuẩn bị sẵn ốp xanh navy + sạc Baseus + AirPods Pro 2 cho anh xem. Tầm 3h em rảnh nhất nha 🕒",
        from: "shop",
        time: "13:18",
      },
      {
        id: "t20",
        text: "Ok 3h chiều anh qua. Mình để lại sđt 0909555111, có gì mình alo trực tiếp nha",
        from: "user",
        time: "13:19",
      },
      {
        id: "t21",
        text: "Dạ em lưu số rồi. Hẹn gặp anh chiều nay 3h nha! Cảm ơn anh 🤗",
        from: "shop",
        time: "13:20",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SHOP 5: Gốm Sứ Việt — Đồ gốm sứ handmade
  // ═══════════════════════════════════════════════════════════
  {
    id: "shop5",
    name: "Gốm Sứ Việt",
    avatar: avatar("ceramic-pottery"),
    lastMessage: "Em check rồi, bộ trà Bát Tràng đợt này men đẹp lắm ạ 🍵",
    time: "3 giờ",
    unseen: false,
    messages: [
      {
        id: "g1",
        text: "Chào shop! Mình đang tìm bộ ấm trà làm quà tặng đối tác",
        from: "user",
        time: "14:00",
      },
      {
        id: "g2",
        text: "Dạ chào anh! Bên em chuyên gốm sứ Bát Tràng chính gốc, có nhiều bộ ấm trà phù hợp làm quà tặng cao cấp ạ 🍵🏺",
        from: "shop",
        time: "14:01",
      },
      {
        id: "g3",
        text: "Có bộ nào tầm 1-2 triệu, sang trọng, đựng hộp quà đẹp không?",
        from: "user",
        time: "14:02",
      },
      {
        id: "g4",
        text: "Dạ có bộ Long Phụng men lam 1,200k và bộ Hoa Sen men ngọc 1,500k. Đều có hộp gỗ lót nhung, khắc laser logo theo yêu cầu luôn ạ 🎁",
        from: "shop",
        time: "14:03",
      },
      {
        id: "g5",
        text: "Bộ Hoa Sen men ngọc cho mình xem hình thực tế được không?",
        from: "user",
        time: "14:04",
      },
      {
        id: "g6",
        text: "Dạ em gửi anh ảnh chụp thực tế từ xưởng luôn nha. Men ngọc xanh cốm, ánh lên dưới đèn đẹp lắm. Mỗi bộ là độc nhất vì làm thủ công hoàn toàn 📸",
        from: "shop",
        time: "14:05",
      },
      {
        id: "g7",
        text: "Đẹp quá! Có khắc logo công ty được không? Mình cần gấp, 2 ngày nữa là cần rồi",
        from: "user",
        time: "14:06",
      },
      {
        id: "g8",
        text: "Dạ được ạ! Khắc laser logo lên hộp gỗ miễn phí. Xưởng em làm trong ngày, hôm sau giao. Anh gửi file logo qua Zalo em nhé 🖨️",
        from: "shop",
        time: "14:07",
      },
      {
        id: "g9",
        text: "Ok gửi Zalo shop đi mình gửi logo",
        from: "user",
        time: "14:08",
      },
      {
        id: "g10",
        text: "Dạ Zalo: 0909123789. Anh gửi logo vector hoặc PNG nét cao giúp em nha",
        from: "shop",
        time: "14:09",
      },
      {
        id: "g11",
        text: "Đã gửi. À bộ này rửa máy rửa chén được không?",
        from: "user",
        time: "14:10",
      },
      {
        id: "g12",
        text: "Dạ men ngọc bền, rửa máy được anh nha. Nhưng em khuyên nên rửa tay nhẹ nhàng để giữ men đẹp lâu dài. Ấm trà men thủ công thì trân quý mà 😊",
        from: "shop",
        time: "14:11",
      },
      {
        id: "g13",
        text: "Ok mình lấy 2 bộ Hoa Sen men ngọc. Tổng bao nhiêu?",
        from: "user",
        time: "14:12",
      },
      {
        id: "g14",
        text: "Dạ 2 bộ x 1,500k = 3,000k. Freeship + tặng kèm 2 hộp trà Tân Cương Thái Nguyên (trị giá 200k/hộp) để anh tặng kèm đối tác luôn 🍃🎁",
        from: "shop",
        time: "14:13",
      },
      {
        id: "g15",
        text: "Tuyệt vời! Cho mình đặt. Nguyễn Hoàng Nam, 0908123456, 15 Lê Duẩn, Quận 1. Cần giao trước 5h chiều ngày kia",
        from: "user",
        time: "14:14",
      },
      {
        id: "g16",
        text: "Dạ em ghi nhận: 2 bộ Hoa Sen men ngọc, khắc logo, hộp gỗ + tặng trà. 3,000k, COD. Giao trước 5h ngày kia. Yên tâm nha anh! 📝✅",
        from: "shop",
        time: "14:15",
      },
      {
        id: "g17",
        text: "Cảm ơn em. Làm cẩn thận nhé, quà đối tác quan trọng",
        from: "user",
        time: "14:16",
      },
      {
        id: "g18",
        text: "Dạ anh yên tâm, em tự tay kiểm tra từng sản phẩm trước khi đóng gói. Men, họa tiết, hộp quà đều chuẩn chỉnh hết mới giao 💯",
        from: "shop",
        time: "14:17",
      },
      {
        id: "g19",
        text: "Mà sau này đặt thêm có giảm giá không? Công ty mình hay tặng quà đối tác lắm",
        from: "user",
        time: "14:18",
      },
      {
        id: "g20",
        text: "Dạ khách quen em giảm 10% từ đơn thứ 2. Với đơn số lượng nhiều em tặng thêm quà. Anh cứ nhắn em trước 2-3 ngày là có hàng đẹp nha 🤝",
        from: "shop",
        time: "14:19",
      },
      {
        id: "g21",
        text: "Ok em, có gì anh liên hệ sau. Làm xong nhắn anh biết",
        from: "user",
        time: "14:20",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SHOP 6: Sách Hay Bookstore — Sách & văn phòng phẩm
  // ═══════════════════════════════════════════════════════════
  {
    id: "shop6",
    name: "Sách Hay Bookstore",
    avatar: avatar("bookstore-shop"),
    lastMessage: "Để em kiểm tra kho rồi báo chị ngay nha 📚",
    time: "5 giờ",
    unseen: true,
    messages: [
      {
        id: "b1",
        text: 'Chào shop, mình tìm sách "Nhà Giả Kim" bản tiếng Anh',
        from: "user",
        time: "09:00",
      },
      {
        id: "b2",
        text: 'Chào bạn! "The Alchemist" bên mình có bản bìa mềm 250k và bìa cứng đặc biệt 450k. Bạn thích bản nào? 📖',
        from: "shop",
        time: "09:01",
      },
      {
        id: "b3",
        text: "Bìa cứng đi. Sách còn mới không shop? Mình mua làm quà",
        from: "user",
        time: "09:02",
      },
      {
        id: "b4",
        text: "Dạ sách mới 100%, còn seal nguyên. Bản đặc biệt có minh họa màu, bìa vải, kèm bookmark da. Làm quà thì quá đẹp luôn ạ 🎁",
        from: "shop",
        time: "09:03",
      },
      {
        id: "b5",
        text: "Ngon! Ngoài ra có sách nào về phát triển bản thân không?",
        from: "user",
        time: "09:04",
      },
      {
        id: "b6",
        text: 'Dạ có "Atomic Habits" 320k, "Dám Nghĩ Lớn" 180k, "Đắc Nhân Tâm" 200k. Đều bản dịch tiếng Việt chất lượng cao. Bạn quan tâm chủ đề gì?',
        from: "shop",
        time: "09:05",
      },
      {
        id: "b7",
        text: "Atomic Habits đi. Mình nghe nói cuốn này hay",
        from: "user",
        time: "09:06",
      },
      {
        id: "b8",
        text: "Dạ đây là cuốn best seller bên em luôn. Thói quen nhỏ thay đổi cuộc đời. Bản tiếng Việt in màu đẹp, có workbook kèm theo 📝",
        from: "shop",
        time: "09:07",
      },
      {
        id: "b9",
        text: "Ok lấy The Alchemist bìa cứng + Atomic Habits. Tổng bao nhiêu?",
        from: "user",
        time: "09:08",
      },
      {
        id: "b10",
        text: "Dạ 450k + 320k = 770k. Miễn ship + tặng kèm 1 bookmark da handmade + bọc sách miễn phí trước khi giao 📦",
        from: "shop",
        time: "09:09",
      },
      {
        id: "b11",
        text: "Có gói quà được không shop? Mình tặng sinh nhật bạn",
        from: "user",
        time: "09:10",
      },
      {
        id: "b12",
        text: "Dạ được ạ! Gói quà cao cấp 30k/cuốn (giấy kraft, ruy băng, thiệp viết tay). Thiệp bạn muốn ghi gì không? 🎀",
        from: "shop",
        time: "09:11",
      },
      {
        id: "b13",
        text: 'Gói cả 2 cuốn đi. Thiệp ghi "Chúc mừng sinh nhật Thảo. Mong cậu luôn vui vẻ và thành công. - Quỳnh"',
        from: "user",
        time: "09:12",
      },
      {
        id: "b14",
        text: "Dạ em ghi nhận. Tổng: 770k sách + 60k gói quà = 830k, freeship, COD. Chị Quỳnh cho em địa chỉ giao hàng nha 📍",
        from: "shop",
        time: "09:13",
      },
      {
        id: "b15",
        text: "Quỳnh - 0978123456 - 200 Nguyễn Thị Minh Khai, Quận 3",
        from: "user",
        time: "09:14",
      },
      {
        id: "b16",
        text: "Dạ em chốt đơn: Alchemist bìa cứng + Atomic Habits, gói quà 2 cuốn, thiệp viết tay. 830k, COD. Giao trong 1-2 ngày 📝",
        from: "shop",
        time: "09:15",
      },
      {
        id: "b17",
        text: "Cảm ơn shop. Mà shop có bán văn phòng phẩm không? Ví dụ sổ tay đẹp",
        from: "user",
        time: "09:16",
      },
      {
        id: "b18",
        text: "Dạ có ạ! Sổ tay da PU A5 180k, sổ bullet journal 220k, sổ lò xo vintage 150k. Nhiều mẫu mã đẹp, giấy dày chống lem mực 📓",
        from: "shop",
        time: "09:17",
      },
      {
        id: "b19",
        text: "Cho mình xem hình sổ bullet journal với",
        from: "user",
        time: "09:18",
      },
      {
        id: "b20",
        text: "Dạ em gửi chị qua Zalo nha. Zalo shop: 0909123456. Bên em còn có bút brush, washi tape, sticker cho mấy bạn thích bullet journal luôn 🖊️✨",
        from: "shop",
        time: "09:19",
      },
      {
        id: "b21",
        text: "Ok mình add Zalo shop. Cảm ơn nha!",
        from: "user",
        time: "09:20",
      },
      {
        id: "b22",
        text: "Dạ cảm ơn chị Quỳnh! Chị add Zalo em gửi ảnh sổ + cập nhật đơn hàng nha 🤗📚",
        from: "shop",
        time: "09:21",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SHOP 7: Thể Thao 360 — Đồ thể thao & dụng cụ tập
  // ═══════════════════════════════════════════════════════════
  {
    id: "shop7",
    name: "Thể Thao 360",
    avatar: avatar("sports-gear"),
    lastMessage: "Anh yên tâm, bộ tạ này xài 5 năm không hỏng 💪",
    time: "Hôm qua",
    unseen: false,
    messages: [
      {
        id: "sp1",
        text: "Anh ơi bên em có đồ tập gym không?",
        from: "user",
        time: "16:00",
      },
      {
        id: "sp2",
        text: "Dạ có anh! Đồ tập gym, yoga, chạy bộ đầy đủ. Anh cần gì ạ? 💪🏋️",
        from: "shop",
        time: "16:01",
      },
      {
        id: "sp3",
        text: "Mình cần bộ tạ tay điều chỉnh được, tập ở nhà",
        from: "user",
        time: "16:02",
      },
      {
        id: "sp4",
        text: "Dạ bộ tạ điều chỉnh 20kg (2 tạ x 10kg) giá 1,200k. Có lót cao su non, không trầy sàn. Điều chỉnh từ 2-10kg mỗi bên, xoay vặn nhanh 3 giây 🏋️",
        from: "shop",
        time: "16:03",
      },
      {
        id: "sp5",
        text: "Có bộ nào nặng hơn không? Mình tập lâu rồi, 10kg mỗi bên hơi nhẹ",
        from: "user",
        time: "16:04",
      },
      {
        id: "sp6",
        text: "Dạ có bộ 40kg (2 tạ x 20kg) giá 2,200k. Tạ gang bọc cao su, tay cầm chống trượt. Điều chỉnh 2.5-20kg mỗi bên. Anh tập lâu thì bộ này là chuẩn luôn 🔥",
        from: "shop",
        time: "16:05",
      },
      {
        id: "sp7",
        text: "2,200k hơi chát. Có giảm không em?",
        from: "user",
        time: "16:06",
      },
      {
        id: "sp8",
        text: "Dạ bộ 40kg giá tốt nhất rồi anh. Nhưng em tặng kèm găng tay tập gym (150k) + thảm tập yoga cao su (200k). Tổng quà ~350k. Anh thấy sao? 🎁",
        from: "shop",
        time: "16:07",
      },
      {
        id: "sp9",
        text: "Có bán thêm ghế tập tạ không?",
        from: "user",
        time: "16:08",
      },
      {
        id: "sp10",
        text: "Dạ có ghế tập đa năng gập được 1,800k. Ngả 7 cấp độ, chịu tải 300kg, gập gọn cất góc. Combo tạ 40kg + ghế = 4,000k, em tặng thêm dây kháng lực set 5 sợi (300k) 🏋️‍♂️",
        from: "shop",
        time: "16:09",
      },
      {
        id: "sp11",
        text: "Ghế có tập được bụng không?",
        from: "user",
        time: "16:10",
      },
      {
        id: "sp12",
        text: "Dạ được anh! Ghế có gác chân tập bụng, tập tay, tập ngực, tập vai — full body luôn. Kèm sách hướng dẫn tập 30 bài bằng tiếng Việt 📖",
        from: "shop",
        time: "16:11",
      },
      {
        id: "sp13",
        text: "Ok combo 4tr đi. Ship về Bình Thạnh bao lâu?",
        from: "user",
        time: "16:12",
      },
      {
        id: "sp14",
        text: "Dạ Bình Thạnh gần, mai giao. Mà đồ nặng 60kg nên em giao bằng xe tải nhỏ, anh có chỗ đậu xe không ạ? 🚛",
        from: "user",
        time: "16:13",
      },
      {
        id: "sp15",
        text: "Có hẻm rộng, xe tải nhỏ vào được. Anh tên Hải, 0903333444, 30 Nguyễn Văn Đậu, Bình Thạnh",
        from: "user",
        time: "16:14",
      },
      {
        id: "sp16",
        text: "Dạ em chốt: combo tạ 40kg + ghế đa năng = 4,000k, tặng găng tay + thảm yoga + dây kháng lực. COD, giao mai. Anh Hải kiểm tra hàng kỹ rồi thanh toán nha 📝",
        from: "shop",
        time: "16:15",
      },
      {
        id: "sp17",
        text: "Ok. Mà có bảo hành không?",
        from: "user",
        time: "16:16",
      },
      {
        id: "sp18",
        text: "Dạ bảo hành 12 tháng: tạ rỉ sét, ghế lỗi hàn, tay cầm bong cao su đều được đổi mới. Anh giữ bill điện tử em gửi qua Zalo là được 🛡️",
        from: "shop",
        time: "16:17",
      },
      {
        id: "sp19",
        text: "Anh yên tâm rồi. Cảm ơn em",
        from: "user",
        time: "16:18",
      },
      {
        id: "sp20",
        text: "Dạ cảm ơn anh Hải! Mai em giao trong buổi sáng nha. Có gì anh cứ nhắn em hỗ trợ thêm 💪🔥",
        from: "shop",
        time: "16:19",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SHOP 8: Nội Thất Gia An — Nội thất & trang trí
  // ═══════════════════════════════════════════════════════════
  {
    id: "shop8",
    name: "Nội Thất Gia An",
    avatar: avatar("furniture-home"),
    lastMessage:
      "Chị thích tone trầm hay tone sáng để em chọn màu cho phù hợp ạ 🛋️",
    time: "Hôm qua",
    unseen: true,
    messages: [
      {
        id: "f1",
        text: "Chào shop, mình muốn mua kệ sách treo tường cho phòng khách",
        from: "user",
        time: "10:00",
      },
      {
        id: "f2",
        text: "Dạ chào chị! Bên em có kệ gỗ óc chó 850k (60x20x60cm) và kệ MDF phủ melamine 450k (cùng kích thước). Chị thích loại nào? 🪵",
        from: "shop",
        time: "10:01",
      },
      {
        id: "f3",
        text: "Gỗ óc chó đi. Phòng mình tone nâu trầm",
        from: "user",
        time: "10:02",
      },
      {
        id: "f4",
        text: "Dạ gỗ óc chó thì đẹp miễn chê luôn chị! Vân gỗ tự nhiên, chống mối mọt, chịu nước tốt. Chị cần mấy tầng? Có loại 2 tầng và 3 tầng",
        from: "shop",
        time: "10:03",
      },
      {
        id: "f5",
        text: "3 tầng đi. Có kèm phụ kiện treo không?",
        from: "user",
        time: "10:04",
      },
      {
        id: "f6",
        text: "Dạ kèm đầy đủ: ke nở, vít, bản lề, thanh treo inox 304. Chị chỉ cần khoan và treo. Có video hướng dẫn gửi kèm 📹",
        from: "shop",
        time: "10:05",
      },
      {
        id: "f7",
        text: "Chưa có máy khoan, shop có dịch vụ lắp đặt không?",
        from: "user",
        time: "10:06",
      },
      {
        id: "f8",
        text: "Dạ có ạ! Lắp đặt nội thành 150k/kệ, thợ qua trong 1-2 ngày sau khi nhận hàng. Đầy đủ dụng cụ, lắp xong dọn sạch sẽ 🔧",
        from: "shop",
        time: "10:07",
      },
      {
        id: "f9",
        text: "Ok lấy kệ 3 tầng gỗ óc chó + dịch vụ lắp đặt. Tổng bao nhiêu?",
        from: "user",
        time: "10:08",
      },
      {
        id: "f10",
        text: "Dạ kệ 3 tầng gỗ óc chó 1,100k + lắp đặt 150k = 1,250k. Freeship + tặng kèm đèn LED cảm ứng gắn dưới kệ (200k) 🎁💡",
        from: "shop",
        time: "10:09",
      },
      {
        id: "f11",
        text: "Đèn LED cảm ứng là như thế nào?",
        from: "user",
        time: "10:10",
      },
      {
        id: "f12",
        text: "Dạ đèn LED thanh 30cm, gắn nam châm dưới kệ, cảm ứng chạm 3 mức sáng. Chiếu xuống sách và đồ trang trí cực đẹp, nhất là buổi tối ✨",
        from: "shop",
        time: "10:11",
      },
      {
        id: "f13",
        text: "Thích quá! Chốt luôn đi. Mình tên Linh, 0988555123, 88 Phan Xích Long, Phú Nhuận",
        from: "user",
        time: "10:12",
      },
      {
        id: "f14",
        text: "Dạ em chốt đơn chị Linh: kệ gỗ óc chó 3 tầng + lắp đặt + tặng đèn LED = 1,250k, COD. Giao hàng 2-3 ngày, lắp đặt sau giao 1 ngày 📝",
        from: "shop",
        time: "10:13",
      },
      {
        id: "f15",
        text: "À shop ơi, mình cũng muốn đổi bàn trà phòng khách. Có mẫu nào đẹp không?",
        from: "user",
        time: "10:14",
      },
      {
        id: "f16",
        text: "Dạ có bàn trà mặt kính cường lực chân gỗ 2,200k và bàn trà gỗ nguyên khối 3,500k. Mặt kính thì hiện đại, gỗ nguyên khối thì ấm cúng. Phòng chị rộng bao nhiêu?",
        from: "shop",
        time: "10:15",
      },
      {
        id: "f17",
        text: "Khoảng 25m². Mặt kính đi cho sáng",
        from: "user",
        time: "10:16",
      },
      {
        id: "f18",
        text: "Dạ 25m² thì bàn trà mặt kính 1m2 là vừa đẹp. Kính cường lực 12mm chịu lực 200kg, chân gỗ sồi Nga. Có ngăn kéo để remote, sách báo 📰",
        from: "shop",
        time: "10:17",
      },
      {
        id: "f19",
        text: "Giá 2,200k có giảm thêm không shop? Mình mua 2 món",
        from: "user",
        time: "10:18",
      },
      {
        id: "f20",
        text: "Dạ combo kệ + bàn trà em giảm còn 3,200k (giảm 250k). Tặng thêm đèn LED thứ 2 cho bàn trà + miễn phí lắp đặt cả 2 món. Chị đồng ý em chốt luôn 🎉",
        from: "shop",
        time: "10:19",
      },
      {
        id: "f21",
        text: "Quá hời! Chốt luôn nha. Vẫn địa chỉ cũ",
        from: "user",
        time: "10:20",
      },
      {
        id: "f22",
        text: "Dạ em chốt combo: kệ gỗ óc chó + bàn trà mặt kính + 2 đèn LED + lắp đặt = 3,200k, COD. Cảm ơn chị Linh nhiều ạ! 🛋️✨",
        from: "shop",
        time: "10:21",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SHOP 9: Phụ Kiện Xinh — Phụ kiện thời trang nữ
  // ═══════════════════════════════════════════════════════════
  {
    id: "shop9",
    name: "Phụ Kiện Xinh",
    avatar: avatar("accessories-bag"),
    lastMessage: "Túi này chị xách đi đám cưới là đẹp nhất luôn đó ạ 👜✨",
    time: "6 giờ",
    unseen: false,
    messages: [
      {
        id: "p1",
        text: "Chị ơi, bên em có túi xách nữ đi tiệc không?",
        from: "user",
        time: "11:00",
      },
      {
        id: "p2",
        text: "Dạ có chị! Em mới về mẫu clutch da bóng 550k và túi đeo chéo mini 650k. Chị đi đám cưới hay tiệc gì ạ? 💃",
        from: "shop",
        time: "11:01",
      },
      {
        id: "p3",
        text: "Đám cưới em ạ. Mặc đầm đỏ, nên cần túi tone trung tính",
        from: "user",
        time: "11:02",
      },
      {
        id: "p4",
        text: "Dạ đầm đỏ thì clutch da bóng màu kem hoặc đen là chuẩn luôn chị. Có dây đeo vai tháo rời, cầm tay cũng sang. Size vừa đựng iPhone + son + ví nhỏ 👛",
        from: "shop",
        time: "11:03",
      },
      {
        id: "p5",
        text: "Màu kem đi. Có hình thực tế không em?",
        from: "user",
        time: "11:04",
      },
      {
        id: "p6",
        text: "Dạ em gửi chị ảnh chụp thật, không qua chỉnh sửa. Da bóng mềm, đường may sắc nét, logo dập chìm tinh tế. Nhìn y như hình luôn ạ 📸",
        from: "shop",
        time: "11:05",
      },
      {
        id: "p7",
        text: "Đẹp! Có kèm túi đựng không em?",
        from: "user",
        time: "11:06",
      },
      {
        id: "p8",
        text: "Dạ có túi chống bụi + hộp quà + card bảo hành. Chị mua làm quà tặng cũng được, em gói quà miễn phí luôn 🎁",
        from: "shop",
        time: "11:07",
      },
      {
        id: "p9",
        text: "Ok lấy clutch kem. À em có bán vòng tay nữ không?",
        from: "user",
        time: "11:08",
      },
      {
        id: "p10",
        text: "Dạ có vòng tay charm bạc 925 giá 380k, vòng đá thạch anh 450k, lắc tay vàng 18k mạ 520k. Chị thích kiểu nào ạ? 💎",
        from: "shop",
        time: "11:09",
      },
      {
        id: "p11",
        text: "Vòng charm bạc đi. Có điều chỉnh size được không?",
        from: "user",
        time: "11:10",
      },
      {
        id: "p12",
        text: "Dạ chỉnh được chị, có dây móc 3 size. Bạc 925 Ý, không đen, không gây dị ứng. Tặng kèm hộp nhung đỏ đẹp mê ly 💍",
        from: "shop",
        time: "11:11",
      },
      {
        id: "p13",
        text: "Ok clutch 550k + vòng charm 380k = 930k. Có giảm không em?",
        from: "user",
        time: "11:12",
      },
      {
        id: "p14",
        text: "Dạ em giảm còn 850k + tặng kèm khăn lụa vuông 60cm (250k). Khăn lụa buộc quai túi hoặc buộc tóc đều đẹp. Freeship luôn nha chị 🧣🎀",
        from: "shop",
        time: "11:13",
      },
      {
        id: "p15",
        text: "Thích quá! Chốt đi em. Chị Mai, 0916789012, 25 Nguyễn Đình Chiểu, Quận 3",
        from: "user",
        time: "11:14",
      },
      {
        id: "p16",
        text: "Dạ em chốt: clutch kem + vòng bạc charm + tặng khăn lụa = 850k, COD, giao 1-2 ngày. Cảm ơn chị Mai! 📝💝",
        from: "shop",
        time: "11:15",
      },
      {
        id: "p17",
        text: "Em ơi, bạn chị cũng muốn mua túi đeo chéo mini. Có màu gì?",
        from: "user",
        time: "14:00",
      },
      {
        id: "p18",
        text: "Dạ túi đeo chéo mini có đen, đỏ rượu, xanh navy, be. Giá 650k. Da PU vân crocodile, dây xích vàng hồng, đựng vừa điện thoại + sổ tay nhỏ 👜",
        from: "shop",
        time: "14:01",
      },
      {
        id: "p19",
        text: "Chị lấy thêm 1 túi đen cho bạn. Tổng thêm 650k phải không?",
        from: "user",
        time: "14:02",
      },
      {
        id: "p20",
        text: "Dạ đúng rồi chị. 850k đơn trước + 650k túi đen = 1,500k. Em tặng thêm 1 khăn lụa thứ 2 cho bạn chị luôn nha 🎁",
        from: "shop",
        time: "14:03",
      },
      {
        id: "p21",
        text: "Ok chốt. Giao chung địa chỉ cũ nha",
        from: "user",
        time: "14:04",
      },
      {
        id: "p22",
        text: "Dạ em chốt tổng 2 đơn: 1,500k, COD. Chiều nay giao luôn cho kịp đám cưới cuối tuần. Cảm ơn chị Mai nhiều! 🥰✨",
        from: "shop",
        time: "14:05",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SHOP 10: Đồng Hồ Luxury — Đồng hồ nam nữ
  // ═══════════════════════════════════════════════════════════
  {
    id: "shop10",
    name: "Đồng Hồ Luxury",
    avatar: avatar("watch-luxury"),
    lastMessage: "Bảo hành máy 5 năm, pin 2 năm — yên tâm tuyệt đối nha anh ⌚",
    time: "1 ngày",
    unseen: false,
    messages: [
      {
        id: "w1",
        text: "Anh ơi, bên em có đồng hồ cơ automatic không? Tầm 5-10 triệu",
        from: "user",
        time: "15:00",
      },
      {
        id: "w2",
        text: "Chào anh! Dạ có bên em đang có Seiko 5 Sports 7,500k và Orient Bambino 6,200k. Cả hai đều máy cơ automatic Nhật, lên dây bằng cổ tay ⌚🇯🇵",
        from: "shop",
        time: "15:01",
      },
      {
        id: "w3",
        text: "Seiko 5 Sports màu xanh navy còn không?",
        from: "user",
        time: "15:02",
      },
      {
        id: "w4",
        text: "Dạ còn anh! Seiko 5 Sports SRPD51K1 xanh navy mặt xanh dương đậm, dây thép không gỉ. Chống nước 100m, lịch ngày-thứ. Best seller bên em 🔥",
        from: "shop",
        time: "15:03",
      },
      {
        id: "w5",
        text: "Có bảo hành chính hãng không?",
        from: "user",
        time: "15:04",
      },
      {
        id: "w6",
        text: "Dạ bảo hành chính hãng Seiko 1 năm toàn cầu + bảo hành shop 5 năm máy. Thẻ bảo hành, hộp, sách hướng dẫn đầy đủ. Hàng nhập khẩu chính ngạch 🛡️",
        from: "shop",
        time: "15:05",
      },
      {
        id: "w7",
        text: "Có bớt được không em? Mình thấy bên khác báo 7tr",
        from: "user",
        time: "15:06",
      },
      {
        id: "w8",
        text: "Dạ giá bên em đã bao gồm VAT + bảo hành 5 năm. Nhưng lần đầu anh mua em giảm còn 7,200k + tặng kèm hộp đựng đồng hồ da 3 slot (500k). Anh thấy hợp lý không? 🎁",
        from: "shop",
        time: "15:07",
      },
      {
        id: "w9",
        text: "Cũng được. Có đồng hồ nữ không? Mình muốn mua tặng vợ luôn",
        from: "user",
        time: "15:08",
      },
      {
        id: "w10",
        text: "Dạ có ạ! Đồng hồ nữ Citizen EM0800-81N mặt trắng dây da 4,500k. Mặt đá sapphire chống xước, máy Eco-Drive chạy bằng ánh sáng không cần thay pin, siêu bền ☀️",
        from: "shop",
        time: "15:09",
      },
      {
        id: "w11",
        text: "Eco-Drive là sao em? Không cần pin à?",
        from: "user",
        time: "15:10",
      },
      {
        id: "w12",
        text: "Dạ đúng rồi anh! Eco-Drive là công nghệ độc quyền của Citizen, hấp thụ ánh sáng (tự nhiên hoặc nhân tạo) chuyển thành năng lượng. Sạc đầy chạy 6 tháng trong bóng tối. Khỏi lo thay pin bao giờ ⚡",
        from: "shop",
        time: "15:11",
      },
      {
        id: "w13",
        text: "Hay quá! Vậy lấy Seiko 5 Sports + Citizen nữ. Tổng giảm thêm được không?",
        from: "user",
        time: "15:12",
      },
      {
        id: "w14",
        text: "Dạ combo cặp đôi: Seiko 7,200k + Citizen 4,500k = 11,700k. Em giảm còn 11,000k + tặng hộp đựng 3 slot + thêm máy vệ sinh đồng hồ siêu âm (600k). Quá hời luôn anh! 💎",
        from: "shop",
        time: "15:13",
      },
      {
        id: "w15",
        text: "Ok chốt 11tr. Anh tên Phong, 0905123456, 10 Tôn Đức Thắng, Quận 1",
        from: "user",
        time: "15:14",
      },
      {
        id: "w16",
        text: "Dạ em chốt đơn anh Phong: Seiko 5 Sports xanh + Citizen EM0800 + hộp 3 slot + máy vệ sinh = 11,000k. COD, giao 1-2 ngày 📝⌚",
        from: "shop",
        time: "15:15",
      },
      {
        id: "w17",
        text: "Cho anh hỏi thêm, đồng hồ cơ có cần bảo dưỡng định kỳ không?",
        from: "user",
        time: "15:16",
      },
      {
        id: "w18",
        text: "Dạ đồng hồ cơ nên bảo dưỡng 3-4 năm/lần: vệ sinh máy, tra dầu, kiểm tra chống nước. Bên em có dịch vụ bảo dưỡng 500k/lần, có thể gửi qua bưu điện nếu anh ở xa 🔧",
        from: "shop",
        time: "15:17",
      },
      {
        id: "w19",
        text: "Ok tốt. À còn đồng hồ Citizen vợ anh không thích thì đổi được không?",
        from: "user",
        time: "15:18",
      },
      {
        id: "w20",
        text: "Dạ đổi trong 7 ngày thoải mái anh ạ. Chưa cắt dây, chưa trầy xước là đổi được. Đổi mẫu hoặc trả hàng hoàn tiền đều được. Yên tâm nha! 🔄",
        from: "shop",
        time: "15:19",
      },
      {
        id: "w21",
        text: "Tuyệt! Cảm ơn em. Giao sớm nhé",
        from: "user",
        time: "15:20",
      },
      {
        id: "w22",
        text: "Dạ cảm ơn anh Phong! Chiều nay em gửi, mai anh nhận. Chúc anh chị hạnh phúc bên cặp đồng hồ mới! ⌚💑",
        from: "shop",
        time: "15:21",
      },
    ],
  },
];

/**
 * Hydrate conversation — use saved cookie data if available,
 * otherwise fall back to demo messages.
 */
function hydrateConversation(demo) {
  const saved = loadConversation(demo.id);
  const messages = saved && saved.length > 0 ? saved : demo.messages;

  const lastMsg = messages[messages.length - 1];
  const unseen = saved
    ? false
    : demo.unseen !== undefined
      ? demo.unseen
      : demo.id !== "shop";

  return {
    ...demo,
    messages,
    lastMessage: lastMsg?.text?.slice(0, 80) || demo.lastMessage || "",
    time: lastMsg?.time || demo.time || "",
    unseen,
    active: demo.id === "shop",
  };
}

export default function App() {
  const [conversations, setConversations] = useState(() =>
    DEMO_CONVERSATIONS.map(hydrateConversation),
  );
  const [activeChat, setActiveChat] = useState(null);
  const [showMobileList, setShowMobileList] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showDataPanel, setShowDataPanel] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Refresh conversations from cookies when switching chats
  useEffect(() => {
    if (activeChat) {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeChat) {
            const saved = loadConversation(c.id);
            if (saved && saved.length > 0) {
              const lastMsg = saved[saved.length - 1];
              return {
                ...c,
                messages: saved,
                lastMessage: lastMsg?.text?.slice(0, 80) || "",
                time: lastMsg?.time || "",
                unseen: false,
              };
            }
          }
          return c;
        }),
      );
    }
  }, [activeChat]);

  const activeConversation = conversations.find((c) => c.id === activeChat);

  const handleSelectChat = useCallback(
    (id) => {
      setActiveChat(id);
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, unseen: false } : c)),
      );
      if (isMobile) setShowMobileList(false);
    },
    [isMobile],
  );

  const handleBack = useCallback(() => {
    setShowMobileList(true);
  }, []);

  const handleMessagesChange = useCallback((convId, messages) => {
    if (!convId) return;
    saveConversation(convId, messages);

    const lastMsg = messages[messages.length - 1];
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId
          ? {
              ...c,
              messages,
              lastMessage: lastMsg?.text?.slice(0, 80) || "",
              time: lastMsg?.time || "",
              unseen: false,
            }
          : c,
      ),
    );
  }, []);

  const handleDeleteConversation = useCallback(
    (id) => {
      deleteConversation(id);
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeChat === id) setActiveChat(null);
    },
    [activeChat],
  );

  const showChatList = !isMobile || showMobileList;
  const showChatView = !isMobile || !showMobileList;

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-ig-canvas-soft">
      <div className="w-full h-full mx-10 md:h-[90vh] flex bg-ig-canvas md:border md:border-ig-border md:rounded-ig-lg overflow-hidden shadow-sm relative">
        {/* ── Column 2: Data Panel (collapsible, desktop only when chat active) ── */}
        {showDataPanel && activeConversation && (
          <div className="hidden md:flex w-[280px] lg:w-[300px] shrink-0 h-full border-l border-ig-border">
            <DataPanel />
          </div>
        )}

        {/* ── Column 1: Chat List ── */}
        <div
          className={`${showChatList ? "flex" : "hidden"} md:flex w-full md:w-[380px] lg:w-[320px] shrink-0 h-full flex-col`}
        >
          <ChatList
            conversations={conversations}
            activeId={activeChat}
            onSelect={handleSelectChat}
            onNewChat={() => {}}
          />
        </div>

        {/* ── Column 3: Chat View / Empty State ── */}
        <div
          className={`${showChatView ? "flex" : "hidden"} md:flex flex-1 h-full flex-col min-w-0`}
        >
          <ChatView
            conversation={activeConversation}
            onBack={handleBack}
            onMessagesChange={handleMessagesChange}
            showDataPanel={showDataPanel}
            onToggleData={() => setShowDataPanel((v) => !v)}
          />
        </div>
      </div>
    </div>
  );
}
