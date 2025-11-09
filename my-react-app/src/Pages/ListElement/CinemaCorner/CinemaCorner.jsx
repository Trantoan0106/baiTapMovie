import React from "react";
import ArticleGrid from "./ArticleGrid";
import ActionDock from "./ActionDock";
import articles from "@/lib/cinemaCorner.data";
import "./cinemaCorner.css";

export default function CinemaCorner() {
  const topStack = React.useMemo(() => {
    return [...articles]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 7);
  }, []);

  const xemTatCa = () =>
    window.dispatchEvent(new CustomEvent("pile:view", { detail: "grid" }));

  const shuffle = () => window.dispatchEvent(new CustomEvent("pile:shuffle"));
  const reset = () => window.dispatchEvent(new CustomEvent("pile:reset"));

  return (
    <main className="py-8">
      {/* Header */}
      <section className="mx-auto w-full max-w-[1180px] px-4">
        <h1 className="text-3xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            Góc điện ảnh
          </span>
        </h1>
        <div className="mt-2 h-1.5 w-28 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-500">
          Bình luận phim, cảm nhận nhanh và các góc nhìn thú vị về những tác
          phẩm hot.
        </p>
      </section>

      <section className="relative mx-auto mt-4 w-full max-w-[1180px] px-4">
        <div className="mb-4">
          <ActionDock
            onShuffle={shuffle}
            onReset={reset}
            allHref="/cinemacorner"
            onAll={xemTatCa}
          />
        </div>

        <div className="relative min-h-[560px] pb-20">
          <ArticleGrid items={topStack} />
        </div>
      </section>
    </main>
  );
}
