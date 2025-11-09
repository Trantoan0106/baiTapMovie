import React from "react";
import { Link } from "react-router-dom";
import ContainerScrollStories from "./ContainerScrollStories";





export default function News({ items = [] }) {
  const stories = React.useMemo(() => {
    return [...items]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 12); // board đẹp khi có 8–12 card
  }, [items]);

  return (
    <section className="mx-auto mt-24 md:mt-32 mb-5 md:mb-5 w-full max-w-[1180px] px-4">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            Góc điện ảnh
          </span>
        </h2>
        <Link
          to="/cinemacorner"
          className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
        >
          Xem tất cả →
        </Link>
      </div>

      <div className="mt-12 md:mt-8">
        {/* sectionHeight: tổng đường cuộn; deviceVH: độ cao tablet trong viewport */}
        <ContainerScrollStories items={stories} sectionHeight={500} deviceVH={200} cols={2} />
      </div>
    </section>
  );
}
