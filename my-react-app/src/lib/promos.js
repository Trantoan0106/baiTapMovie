
// Nguồn dữ liệu cục bộ cho phần "Tin khuyến mãi".
// Dùng trực tiếp: import promos from "@/data/promos";
const BASE = import.meta.env.BASE_URL || "/";

const promos = [
  {
    id: "zalo-30",
    title: "ZaloPay giảm đến 30% khi mua vé",
    desc: "Nhập mã trên ZaloPay, giảm tối đa 30% (áp dụng điều kiện).",
        img: `${BASE}promotion/zalopay-2_1756131451068.jpg`,

    href: "/uu-dai/zalopay",
    provider: "ZaloPay",
    discountType: "percent",
    discountValue: 30,
    startAt: "2025-10-01",
    endAt: "2025-12-31",
    tags: ["thanh-toan", "vi-dien-tu"],
    priority: 12,
    isActive: true,
    createdAt: "2025-10-01"
  },
  {
    id: "liobank-60k",
    title: "Liobank giảm ngay 60K khi mua vé",
    desc: "Thanh toán bằng thẻ Liobank nhận ưu đãi 60.000đ.",
        img: `${BASE}promotion/lio-t9-galaxy-banner-app-1135x660_1758894341772.jpg`,

    href: "/uu-dai/liobank",
    provider: "Liobank",
    discountType: "amount",
    discountValue: 60000,
    startAt: "2025-09-15",
    endAt: "2025-11-30",
    tags: ["ngan-hang", "the"],
    priority: 11,
    isActive: true,
    createdAt: "2025-09-10"
  },
  {
    id: "clicktopay-50k",
    title: "Click to Pay ưu đãi 50K",
    desc: "Thanh toán qua Click to Pay giảm ngay 50.000đ cho đơn đủ điều kiện.",
        img: `${BASE}promotion/click-to-pay-visa-1_1756349730515.jpg`,

    href: "/uu-dai/click-to-pay",
    provider: "VISA / Click to Pay",
    discountType: "amount",
    discountValue: 50000,
    startAt: "2025-10-05",
    endAt: "2025-12-15",
    tags: ["thanh-toan", "visa"],
    priority: 10,
    isActive: true,
    createdAt: "2025-10-05"
  },
  {
    id: "shopeepay-50k",
    title: "ShopeePay giảm đến 50K dành cho Stars",
    desc: "Ưu đãi độc quyền cho Galaxy Stars khi thanh toán bằng ShopeePay.",
        img: `${BASE}promotion/1135-sym-tan-an_1758187407676.jpg`,

    href: "/uu-dai/shopeepay",
    provider: "ShopeePay",
    discountType: "amount",
    discountValue: 50000,
    startAt: "2025-10-10",
    endAt: "2025-12-20",
    tags: ["vi-dien-tu", "thanh-toan"],
    priority: 9,
    isActive: true,
    createdAt: "2025-10-10"
  },
  {
    id: "momo-20",
    title: "Momo Movie Day - Giảm 20%",
    desc: "Thứ 4 hàng tuần, thanh toán Momo giảm 20% tối đa 40.000đ.",
        img: `${BASE}promotion/momo-galaxy-2_1756958593143.jpg`,

    href: "/uu-dai/momo-movie-day",
    provider: "MoMo",
    discountType: "percent",
    discountValue: 20,
    startAt: "2025-08-01",
    endAt: "2026-01-31",
    tags: ["vi-dien-tu", "thu-4"],
    priority: 8,
    isActive: true,
    createdAt: "2025-08-01"
  },
  {
    id: "student-tuesday-40",
    title: "Student Tuesday - Giảm 40% vé 2D",
    desc: "Sinh viên học sinh giảm 40% vào thứ 3. Xuất trình thẻ để áp dụng.",
        img: `${BASE}promotion/imax-treasure-hunt-5_1758703687529.jpg`,

    href: "/uu-dai/student-tuesday",
    provider: "Galaxy Cinema",
    discountType: "percent",
    discountValue: 40,
    startAt: "2025-07-01",
    endAt: "2026-06-30",
    tags: ["sinh-vien", "thu-3", "offline"],
    priority: 7,
    isActive: true,
    createdAt: "2025-07-01"
  },

];

export default promos;

// Gợi ý sử dụng:
// import promosRaw from "@/data/promos";
// const now = new Date();
// const activePromos = promosRaw
//   .filter(p => (p.isActive !== false) && (!p.startAt || new Date(p.startAt) <= now) && (!p.endAt || now <= new Date(p.endAt)))
//   .sort((a,b) => (b.priority || 0) - (a.priority || 0));
