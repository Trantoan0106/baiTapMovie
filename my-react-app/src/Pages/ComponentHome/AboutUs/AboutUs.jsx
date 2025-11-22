// src/Pages/ComponentHome/AboutUs/AboutUs.jsx
import React from "react";
import ProfileCard from "./ProfileCard"; // nếu có index.js
import "./index.css";

export default function AboutUs() {
  const BASE = import.meta.env.BASE_URL || "/";
  return (
    <section className="relative z-10 my-24 md:my-1 min-h-[40vh] bg-[#0b0e16] text-white">
      <div className="mx-auto max-w-7xl px-6 pt-6 pb-12 grid gap-10 lg:grid-cols-2 items-center">
        {/* LEFT: giới thiệu hệ thống rạp */}
        <div>
          <span className="text-xs tracking-widest text-white/60">
            ABOUT US
          </span>
          <h1 className="mt-2 text-3xl md:text-5xl font-bold">
            Hệ thống rạp chiếu phim <span className="text-sky-400">Aurora</span>
          </h1>

          <p className="mt-4 text-white/80 leading-relaxed">
            Aurora là cụm rạp thế hệ mới hướng đến trải nghiệm “đã mắt – đã tai
            – đã lòng”. Chúng tôi trang bị màn hình Laser 4K, âm thanh Dolby
            Atmos, ghế đôi &amp; ghế VIP da thật, cùng hệ thống đặt vé nhanh
            trong 10 giây.
          </p>
          <ul className="mt-6 space-y-3 text-white/85">
            <li>• 08 phòng chiếu tiêu chuẩn quốc tế, hơn 1.200 chỗ ngồi.</li>
            <li>• Lịch chiếu dày, nhiều suất đêm cho fan phim.</li>
            <li>
              • Combo bắp – nước phong phú, khu chờ chill &amp; photobooth.
            </li>
            <li>• Hỗ trợ thanh toán đa kênh, tích điểm Aurora Club.</li>
          </ul>

          <div className="mt-6 flex gap-3">
            <a
              href="/movie"
              className="btn-fix relative isolate inline-flex items-center justify-center px-6 py-3 rounded-2xl font-semibold
               text-white mix-blend-normal border border-white/10 transition active:translate-y-px overflow-hidden"
            >
              <span className="relative z-10">Xem phim đang chiếu</span>
              <span
                aria-hidden
                className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500
                 shadow-lg shadow-sky-500/25"
              />
            </a>

            {/* Ghost */}
            <a
              href="/buyticket"
              className="btn-fix relative isolate inline-flex items-center justify-center px-6 py-3 rounded-2xl font-semibold
               text-white border border-white/15 transition active:translate-y-px overflow-hidden"
            >
              <span className="relative z-10">Đặt vé ngay</span>
              <span
                aria-hidden
                className="absolute inset-0 z-0 rounded-2xl bg-white/10 backdrop-blur-md hover:bg-white/14"
              />
            </a>
          </div>
        </div>

        {/* RIGHT: ProfileCard với ảnh rạp */}
        <div className="flex justify-center">
          <ProfileCard
            name="Galaxy Cinema – Flagship"
            title="Trải nghiệm chuẩn quốc tế"
            handle="aurora.cinema"
            status="Mở cửa • 9:00–23:30"
            contactText="Liên hệ"
            avatarUrl={`${BASE}images/80801-BODY_ (15).jpg`}
            miniAvatarUrl={`${BASE}images/cinema.jpg`}
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => window.open("tel:19001234")}
          />
        </div>
      </div>
    </section>
  );
}
