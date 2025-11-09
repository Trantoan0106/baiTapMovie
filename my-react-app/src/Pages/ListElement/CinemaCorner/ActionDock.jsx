import React from "react";
import { Link } from "react-router-dom";

/** Thanh hành động glassy + gradient có animation */
export default function ActionDock({
  onShuffle,
  onReset,
  onAll,               // <— dùng callback để đổi view về grid/pile tuỳ ý
  allHref = "/cinemacorner",
}) {
  return (
    <div className="relative z-20 flex w-full justify-center">
      <div
        className={[
          "inline-flex items-center gap-2 rounded-full",
          "border border-zinc-200/80 bg-white/90 px-2 py-1.5",
          "shadow-md backdrop-blur-md",
        ].join(" ")}
        style={{ pointerEvents: "auto" }}
      >
        {/* Xáo bài */}
        <button
          onClick={onShuffle}
          className="group relative rounded-full px-4 py-1.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          <span className="cc-animated-gradient bg-clip-text text-transparent">
            Xáo bài
          </span>
        </button>

        {/* Reset */}
        <button
          onClick={onReset}
          className="group relative rounded-full px-4 py-1.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          <span className="cc-animated-gradient bg-clip-text text-transparent">
            Reset
          </span>
        </button>

        {/* CTA: Xem tất cả */}
        <Link
          to={allHref}
          onClick={(e) => { e.preventDefault(); onAll?.(); }}  // <— gọi onAll thay vì điều hướng
          className="relative rounded-full px-4 py-1.5 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          <span className="cc-animated-pill absolute inset-0 -z-10 rounded-full" />
          Xem tất cả →
        </Link>
      </div>
    </div>
  );
}
