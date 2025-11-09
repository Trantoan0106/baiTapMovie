import { useState } from "react";

export default function FilterBar({ onChange }) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All"); // All, Now, Soon, Hot

  function emit(next) {
    onChange?.(next);
  }

  return (
    <div className="sticky top-16 z-10 mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3 backdrop-blur">
      <div className="flex gap-2">
        {["All", "Now", "Soon", "Hot"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              emit({
                query,
                nowShowing: t === "Now" ? true : undefined,
                comingSoon: t === "Soon" ? true : undefined,
                hot: t === "Hot" ? true : undefined,
              });
            }}
            className={
              "rounded-full px-3 py-1 text-xs font-medium " +
              (tab === t
                ? "bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-900"
                : "bg-slate-800/60 text-slate-200 hover:bg-slate-700/60")
            }
          >
            {t}
          </button>
        ))}
      </div>

      <input
        value={query}
        onChange={(e) => {
          const v = e.target.value;
          setQuery(v);
          emit({
            query: v,
            nowShowing: tab === "Now" ? true : undefined,
            comingSoon: tab === "Soon" ? true : undefined,
            hot: tab === "Hot" ? true : undefined,
          });
        }}
        placeholder="Tìm phim…"
        className="ms-auto w-56 rounded-full bg-slate-800/70 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
      />
    </div>
  );
}
