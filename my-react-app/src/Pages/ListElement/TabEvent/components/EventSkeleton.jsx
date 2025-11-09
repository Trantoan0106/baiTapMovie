// src/pages/ListElement/Event/components/EventSkeleton.jsx
import { useEffect } from "react";

/**
 * EventSkeleton
 * - Hiển thị lưới skeleton với shimmer trong lúc loading.
 * - Tùy biến: count (số card), cols (cột responsive), imgHeight, rounded, gap.
 *
 * Ví dụ dùng:
 *   <EventSkeleton count={6} />
 *   <EventSkeleton count={9} cols={{ base: 1, sm: 2, lg: 3 }} imgHeight="h-44" />
 */
export default function EventSkeleton({
  count = 6,
  cols = { base: 1, sm: 2, lg: 3 },
  imgHeight = "h-44",
  rounded = "rounded-2xl",
  gap = "gap-6",
}) {
  // Inject CSS shimmer một lần
  useEffect(() => {
    const id = "event-skeleton-shimmer-style";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = `
        /* Base skeleton block */
        .skeleton {
          position: relative;
          overflow: hidden;
          background: rgba(148, 163, 184, 0.18); /* slate-400/20 */
        }
        .dark .skeleton {
          background: rgba(100, 116, 139, 0.22); /* slate-500/22 */
        }

        /* Shimmer overlay */
        .skeleton::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.12) 48%,
            rgba(255,255,255,0) 100%
          );
          animation: eventShimmer 1.6s infinite;
          will-change: transform;
        }
        @keyframes eventShimmer {
          100% { transform: translateX(100%); }
        }

        /* Subtle noise to đỡ “phẳng” quá */
        .skeleton-noise {
          background-image:
            radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px);
          background-position: 0 0, 8px 8px;
          background-size: 16px 16px;
        }

        /* Dim background card để giống theme tối */
        .skeleton-card-bg {
          background: #0b1324; /* khớp màu card thật của bạn */
        }

        /* Chip shape */
        .skeleton-chip {
          border-radius: 9999px;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const gridCols =
    `grid grid-cols-${cols.base || 1} ` +
    (cols.sm ? `sm:grid-cols-${cols.sm} ` : "") +
    (cols.lg ? `lg:grid-cols-${cols.lg} ` : "");

  return (
    <div className={`${gridCols} ${gap}`}>
      {Array.from({ length: count }).map((_, i) => (
        <article
          key={i}
          className={`${rounded} overflow-hidden shadow
                      skeleton-card-bg text-white border border-white/5
                      transition will-change-transform`}
          style={{ transform: "translateZ(0)" }}
        >
          {/* Ảnh */}
          <div className={`w-full ${imgHeight} skeleton skeleton-noise`} />

          {/* Nội dung */}
          <div className="p-4 space-y-3">
            {/* Badge/Chip */}
            <div className="skeleton skeleton-chip h-5 w-24 inline-block" />

            {/* Tiêu đề */}
            <div className="skeleton h-5 w-3/4 rounded-md" />

            {/* Dòng mô tả 1 */}
            <div className="skeleton h-4 w-full rounded-md" />
            {/* Dòng mô tả 2 (ngắn hơn chút) */}
            <div className="skeleton h-4 w-5/6 rounded-md" />
          </div>
        </article>
      ))}
    </div>
  );
}
