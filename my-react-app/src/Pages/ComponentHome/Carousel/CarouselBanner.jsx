// src/Pages/ComponentHome/Carousel/CarouselBanner.jsx
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const API = "/cyber/api/QuanLyPhim/LayDanhSachBanner";

export default function CarouselBanner() {
  const [slides, setSlides] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetch(API)
      .then((r) => {
        if (!r.ok) throw new Error("Fetch banner failed");
        return r.json();
      })
      .then((d) => {
        const mapped = (d?.content ?? []).map((b) => ({
          id: b.maBanner,
          title: `Movie #${b.maPhim}`,
          href: `/movie/${b.maPhim}`,
          image: b.hinhAnh.replace(
            "https://movienew.cybersoft.edu.vn",
            "/cyber"
          ),
        }));
        setSlides(mapped);
      })
      .catch((e) => setError(e.message || "Error"))
      .finally(() => setLoading(false));
  }, []);

  if (error) return <div className="text-red-500">Banner error: {error}</div>;

  return (
    // cách navbar một đoạn
    <section className="mt-12">
      {/* CHỈ NỘI DUNG CAROUSEL GIỚI HẠN 1180px VÀ CĂN GIỮA */}
      <div className="mx-auto w-full max-w-[1180px] px-4">
        <div className="relative h-[220px] md:h-[280px] lg:h-[340px] overflow-hidden rounded-2xl bg-black shadow-xl">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            slidesPerView={1}
            spaceBetween={0}
            className="!px-0"
            style={{ height: "100%", width: "100%" }}
          >
            {(loading ? Array.from({ length: 3 }) : slides).map((s, i) => (
              <SwiperSlide key={s?.id ?? i} className="!h-full">
                <a
                  href={s?.href ?? "#"}
                  aria-label={s?.title ?? ""}
                  className="block h-full w-full"
                >
                  <div className="h-full w-full bg-black">
                    {loading ? (
                      <div className="h-full w-full animate-pulse bg-zinc-200" />
                    ) : (
                      // object-contain để thấy toàn bộ ảnh (không bị crop)
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
