import React, { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform , useMotionTemplate } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * CinemaScrollTablet
 * - Tablet nằm -> đứng khi cuộn (rotateX, rotateZ, scale, y)
 * - Bên trong là board các card nhỏ trượt theo tiến độ cuộn
 *
 * props:
 *  - items: [{ id, slug, title, cover, excerpt, date }]
 *  - sectionHeight: tổng chiều cao section (vh) => mặc định 220
 *  - deviceVH: chiều cao tablet trong viewport (vh) => mặc định 64
 *  - cols: số cột board (desktop) => 2 hoặc 3
 */
export default function ContainerScrollStories({
  items = [],
  sectionHeight = 140,
  deviceVH = 30,
  cols = 2,
}) {
  const sectionRef = useRef(null);
  const screenRef = useRef(null);
  const contentRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Tính khoảng trượt tối đa bên trong màn hình
  const [maxScroll, setMaxScroll] = useState(0);
  useLayoutEffect(() => {
    const s = screenRef.current;
    const c = contentRef.current;
    if (!s || !c) return;
    const ro = new ResizeObserver(() => {
      setMaxScroll(Math.max(0, c.scrollHeight - s.clientHeight));
    });
    ro.observe(s);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  // --- Tablet transforms (tinh chỉnh để cảm giác "nằm -> đứng")
  // Bạn có thể tinh thêm các mốc cho hợp mắt
  const rotX = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [30, 14, 6, 0]);   // nghiêng -> thẳng
  const rotZ = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [-10, -5, -2, 0]); // xoay z
  const scale = useTransform(scrollYProgress, [0, 0.35, 1], [0.92, 0.97, 1]);      // phóng to nhẹ
  const y     = useTransform(scrollYProgress, [0, 1], [24, 0]);                    // nhấc lên

  // Bóng đổ "đứng dậy"
  const shadowScale   = useTransform(scrollYProgress, [0, 1], [0.85, 1.05]);
 const shadowBlur    = useTransform(scrollYProgress, [0, 1], [24, 60]);
 const shadowFilter  = useMotionTemplate`blur(${shadowBlur}px)`;
 const shadowOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 0.35]);

  // Nội dung trượt
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  
  const gridColsCls =
    cols >= 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2";

const topVH = 6;        // tablet nằm cách đỉnh 6vh (sát hơn)
const extraVH = 6;      // buffer nhỏ để tránh cắt bóng đổ
const totalVH = topVH + deviceVH + extraVH; // CHIỀU CAO SECTION CHUẨN
const stickyTop = { top: `${topVH}vh` };     // thay cho calc(...) cũ



  return (
    <section
    ref={sectionRef}
    className="relative w-full"
    style={{ height: `${totalVH}vh` }}   // mềm, không khóa cứng
  >
    {/* progress line */}
    <div className="sticky top-0 z-30 mx-auto w-full max-w-[1180px] px-4">
      <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-200/60">
        <motion.div
          style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          className="h-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600"
        />
      </div>
    </div>

    {/* spacer nhỏ để tách khỏi trên */}
    <div className="h-0" />

    {/* tablet sticky center */}
<div className="mx-auto w-full max-w-[1180px] px-4">
  {/* tạo khoảng cách an toàn giữa progress-line và tablet */}
  <div className="mt-6" />

  {/* chỉ phần này sticky */}
  <div className="sticky z-10" style={stickyTop}>
    <motion.div
      className="relative mx-auto w-[70%] max-w-[750px] origin-center rounded-[28px] border-[10px] border-zinc-900 bg-zinc-900/95 shadow-2xl"
      style={{ rotateX: rotX, rotateZ: rotZ, scale, y }}
    >
      {/* viền trong */}
      <div className="rounded-[18px] bg-zinc-800/60 p-1">
        {/* màn hình */}
        <div
          ref={screenRef}
          className="relative w-full overflow-hidden rounded-[14px] bg-white"
          style={{ height: `${deviceVH}vh` }}
        >
          {/* nội dung dài */}
          <motion.div
            ref={contentRef}
            style={{ y: contentY }}
            className={`grid h-max w-full gap-4 p-4 ${gridColsCls}`}
          >
            {items.map((it) => (
              <article
                key={it.id}
                className="group overflow-hidden rounded-xl ring-1 ring-zinc-200 transition-shadow hover:shadow-md"
              >
                <Link to={`/cinemacorner/${it.slug}`} className="block">
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={it.cover}
                      alt={it.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/800x500?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="space-y-2 p-3">
                    <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900">
                      {it.title}
                    </h3>
                    {it.excerpt && (
                      <p className="line-clamp-2 text-xs text-zinc-600">
                        {it.excerpt}
                      </p>
                    )}
                    <div className="pt-1">
                      <span className="inline-flex items-center rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white transition-opacity group-hover:opacity-90">
                        Xem chi tiết →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  </div>
</div>


    {/* spacer cuối để tách với section kế */}
    <div className="h-0" />
  </section>
  );
}
