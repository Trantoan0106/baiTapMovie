import React from "react";
import SectionHeading from "./SectionHeading";
import ThreeDMarquee from "./ThreeDMarquee";
import promos from "@/lib/promos";

export default function Promotion({ className = "" }) {
  const images = promos.map(p => p.img);

  return (
    <section className={`relative z-10 container mx-auto mt-24 md:mt-32 mb-1 ${className}`}>
      <SectionHeading
        title="Tin khuyến mãi"
        subtitle="Ưu đãi hot, voucher và khuyến mãi thanh toán dành riêng cho bạn."
      />
      {/* Đệm bằng padding/margin, TUYỆT ĐỐI không translateY ở lưới */}
      <div className="mt-10">
        <ThreeDMarquee images={images} />
      </div>
    </section>
  );
}
