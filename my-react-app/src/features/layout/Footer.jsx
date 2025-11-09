import React from "react";

function Section({ title, links }) {
  return (
    <div>
      <h4 className="text-slate-200 font-semibold mb-3">{title}</h4>
      <ul className="space-y-2 text-[15px]">
        {links.map((t, i) => (
          <li key={i}>
            <a
              href="#"
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              {t}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const intro = ["Về Chúng Tôi", "Thoả Thuận Sử Dụng", "Quy Chế Hoạt Động", "Chính Sách Bảo Mật"];
  const cine  = ["Thể Loại Phim", "Bình Luận Phim", "Blog Điện Ảnh", "Phim Hay Tháng", "Phim IMAX"];
  const help  = ["Góp Ý", "Sale & Services", "Rạp / Giá Vé", "Tuyển Dụng", "FAQ"];

  return (
    <footer className="relative z-10 bg-[#0b1220] text-slate-300 mt-10 border-t border-slate-700/40">
      {/* vệt bóng mỏng giống ảnh */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-500/30 to-transparent" />

      <div className="max-w-[1180px] mx-auto px-4 py-10">
        {/* Hàng trên: 3 cột + social */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <Section title="GIỚI THIỆU" links={intro} />
          <Section title="GÓC ĐIỆN ẢNH" links={cine} />
          <Section title="HỖ TRỢ" links={help} />

          {/* Social + Badge */}
          <div className="flex flex-col items-start gap-4">
            {/* Logo Galaxy (placeholder text/ảnh) */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border border-slate-600/40 flex items-center justify-center">
                {/* bạn có thể thay bằng <img src={logoGalaxy} .../> */}
                <span className="text-xs text-slate-400">GALAXY</span>
              </div>
              <span className="text-slate-400">GALAXY CINEMA</span>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a aria-label="Facebook" href="#" className="p-2 rounded-lg border border-slate-600/40 hover:border-slate-400/50 transition">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-slate-300"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898v-2.89h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33V21.88C18.343 21.128 22 16.99 22 12z"/></svg>
              </a>
              {/* YouTube */}
              <a aria-label="YouTube" href="#" className="p-2 rounded-lg border border-slate-600/40 hover:border-slate-400/50 transition">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-slate-300"><path d="M23.498 6.186a3.002 3.002 0 0 0-2.116-2.129C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.382.557A3.002 3.002 0 0 0 .502 6.186 31.18 31.18 0 0 0 0 12a31.18 31.18 0 0 0 .502 5.814 3.002 3.002 0 0 0 2.116 2.129C4.4 20.5 12 20.5 12 20.5s7.6 0 9.382-.557a3.002 3.002 0 0 0 2.116-2.129A31.18 31.18 0 0 0 24 12a31.18 31.18 0 0 0-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z"/></svg>
              </a>
              {/* Instagram */}
              <a aria-label="Instagram" href="#" className="p-2 rounded-lg border border-slate-600/40 hover:border-slate-400/50 transition">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-slate-300"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.507 5.507 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zm5.25-2.75a.75.75 0 1 0 .75.75.75.75 0 0 0-.75-.75z"/></svg>
              </a>
            </div>

            {/* Huy hiệu "ĐÃ THÔNG BÁO" (placeholder) */}
            <div className="mt-1 flex items-center gap-3 rounded-xl border border-slate-600/40 px-3 py-2">
              <div className="w-9 h-9 rounded-full border border-teal-400/60 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-teal-300">
                  <path d="M9 12l2 2 4-4 1.5 1.5L11 17 7.5 13.5 9 12z"/>
                </svg>
              </div>
              <div className="leading-tight">
                <div className="text-slate-200 text-sm">ĐÃ THÔNG BÁO</div>
                <div className="text-sky-300 text-xs">BỘ CÔNG THƯƠNG</div>
              </div>
            </div>
          </div>
        </div>

        {/* đường kẻ */}
        <div className="my-8 border-t border-slate-700/40" />

        {/* Hàng dưới: logo + địa chỉ công ty */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/favicon.png"
              alt="Galaxy Cinema"
              className="w-12 h-12 rounded-xl border border-slate-600/40 object-contain"
            />
            <div className="text-sm text-slate-400">
              <div className="font-semibold text-slate-200">
                CÔNG TY CỔ PHẦN PHIM THIÊN NGÂN
              </div>
              <div>3/9 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh, Việt Nam</div>
              <div className="mt-1 text-xs">
                028.3933.3030 • 19002224 (9:00 - 22:00) • hotro@galaxystudio.vn
              </div>
            </div>
          </div>

          {/* icon thanh toán / app — tuỳ bạn thêm sau */}
          <div className="flex items-center gap-3 opacity-70">
            <div className="w-8 h-8 rounded-lg border border-slate-600/40" />
            <div className="w-8 h-8 rounded-lg border border-slate-600/40" />
            <div className="w-8 h-8 rounded-lg border border-slate-600/40" />
          </div>
        </div>
      </div>
    </footer>
  );
}
