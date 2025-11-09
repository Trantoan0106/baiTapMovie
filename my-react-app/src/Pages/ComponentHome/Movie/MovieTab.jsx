// src/components/movies/MovieTabs.jsx
"use client";
import React from "react";
import { cn } from "@/lib/utils";
import MovieItem from "../../ComponentHome/Movie/Movie3D/MovieItem"; // chỉnh path nếu khác dự án bạn

const API = "/cyber/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01";

// helpers nhỏ cho "mới ra mắt"
const toDate = (s) => {
  const d = new Date(s);
  return isNaN(d) ? null : d;
};
const daysBetween = (a, b) => Math.floor((a - b) / (1000 * 60 * 60 * 24));

export default function MovieTabs() {
  const [movies, setMovies]   = React.useState([]);
  const [tab, setTab]         = React.useState("now"); // now | soon | hot | top | new
  const [loading, setLoading] = React.useState(true);
  const [err, setErr]         = React.useState("");




  // Fetch 1 lần
  React.useEffect(() => {
    setLoading(true);
    fetch(API)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        const list = Array.isArray(d?.content) ? d.content : [];
        const mapped = list.map((m) => ({
          id: m.maPhim,
          title: m.tenPhim,
          poster: String(m.hinhAnh || "").replace(
            "https://movienew.cybersoft.edu.vn",
            "/cyber"
          ),
          dangChieu: !!m.dangChieu,
          sapChieu: !!m.sapChieu,
          hot: !!m.hot,
          danhGia: Number(m.danhGia) || 0,
          ngayKhoiChieu: m.ngayKhoiChieu,
        }));
        setMovies(mapped);
        setErr("");
      })
      .catch((e) => setErr(e.message || "Fetch error"))
      .finally(() => setLoading(false));
  }, []);


  const now   = React.useMemo(() => movies.filter((m) => m.dangChieu), [movies]);
  const soon  = React.useMemo(() => movies.filter((m) => m.sapChieu), [movies]);
  const hot   = React.useMemo(() => movies.filter((m) => m.hot), [movies]);
  const top   = React.useMemo(
    () => movies.filter((m) => m.danhGia >= 8).sort((a, b) => b.danhGia - a.danhGia),
    [movies]
  );
  const newly = React.useMemo(() => {
    const today = new Date();
    return movies.filter((m) => {
      const d = toDate(m.ngayKhoiChieu);
      if (!d) return false;
      return d <= today && Math.abs(daysBetween(d, today)) <= 14;
    });
  }, [movies]);

  

  const labels = {
    now:  `Đang chiếu (${now.length})`,
    soon: `Sắp chiếu (${soon.length})`,
    hot:  `Hot (${hot.length})`,
    top:  `Top rated (${top.length})`,
    new:  `Mới ra mắt (${newly.length})`,
  };

  const data =
    tab === "now" ? now :
    tab === "soon" ? soon :
    tab === "hot" ? hot :
    tab === "top" ? top : newly;

  return (
    <section className="mx-auto w-full max-w-[1180px] px-4 py-8">
<div className="mx-auto max-w-[1180px] px-4">
  <div className="inline-flex items-center gap-1 rounded-2xl bg-white/70 p-1 backdrop-blur supports-[backdrop-filter]:bg-white/50 shadow-lg ring-1 ring-zinc-200">
    {(["now","soon","hot","top","new"]).map(k => {
      const active = tab === k;
      return (
        <button
          key={k}
          onClick={() => setTab(k)}
          className={cn(
            "relative rounded-xl px-4 py-2 text-sm font-semibold transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
            active ? "shadow-[0_6px_20px_-6px_rgba(99,102,241,0.6)]" : "hover:text-zinc-900"
          )}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {active && (
            <span className="absolute inset-0 z-0 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600" />
          )}

          {!active && (
            <span className="absolute inset-0 z-0 rounded-xl ring-1 ring-zinc-200" />
          )}

          <span className={cn("relative z-10", active ? "text-white" : "text-zinc-700")}>
            {labels[k]}
          </span>
        </button>
      );
    })}
  </div>
</div>


      {/* Thông báo lỗi */}
      {err && (
        <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 ring-1 ring-red-200">
          Lỗi: {err}
        </div>
      )}

      {/* Grid phim */}
      <div className="mt-10">
        {loading ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-[420px] w-full animate-pulse rounded-2xl bg-zinc-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {data.map((m) => (
              <MovieItem
                key={m.id}
                id={m.id}
                poster={m.poster}
                title={m.title}
                href={`/movie/${m.id}`}
                badge={m.hot ? "HOT" : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
