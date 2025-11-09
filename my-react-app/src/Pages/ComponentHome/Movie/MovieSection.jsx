import React from "react";
import MovieTab from "./MovieTab";


export default function MovieSection() {
  return (
    <section className="mx-auto px-4 py-0 max-w-[1180px]">
      <div className="mb-6">
        <h2 className="text-4xl md:text-[44px] font-extrabold tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            Phim
          </span>
        </h2>
        <div className="mt-2 h-[4px] w-28 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600" />
        <p className="mt-2 text-sm text-slate-300/80">
          Danh sách phim đang chiếu & sắp chiếu.
        </p>
      </div>

      <MovieTab />
    </section>
  );
}
