// src/pages/ListElement/Event/index.jsx
import { useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce"; // npm i use-debounce
import promos from "./data/promos";
import ChromaGrid from "../../../reactbits/ChromaGrid";
import EventSkeleton from "./components/EventSkeleton";

/* ------------------------ Helpers (UI) ------------------------ */
function SearchInput({ value, onChange, placeholder = "Tìm theo tiêu đề, mô tả…" }) {
  return (
    <div className="relative group">
      {/* Gradient ring */}
      <div className="rounded-2xl p-[1.5px] bg-gradient-to-r from-indigo-500/60 via-fuchsia-500/60 to-cyan-400/60 transition-all duration-300 group-focus-within:from-indigo-400 group-focus-within:to-fuchsia-400">
        {/* Glass background */}
        <div className="rounded-2xl bg-[#0b1324]/80 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-2 px-4 py-2.5">
            {/* icon search */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white/60 group-focus-within:text-white/80 transition"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.25 5.25a7.5 7.5 0 0011.4 11.4z" />
            </svg>
            <input
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="w-full bg-transparent outline-none text-white/90 placeholder-white/40"
            />
            {/* clear */}
            {value && (
              <button
                type="button"
                onClick={() => onChange({ target: { value: "" } })}
                className="text-white/60 hover:text-white/90 transition"
                aria-label="Xóa tìm kiếm"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>
      {/* glow when focus */}
      <div className="absolute -inset-1 rounded-2xl pointer-events-none opacity-0 group-focus-within:opacity-100 blur-xl bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-cyan-400/20 transition" />
    </div>
  );
}

function FancySelect(props) {
  return (
    <div className="relative group">
      <div className="rounded-2xl p-[1.5px] bg-gradient-to-r from-indigo-500/50 via-fuchsia-500/50 to-cyan-400/50">
        <select
          {...props}
          className="w-full appearance-none rounded-2xl bg-[#0b1324]/80 backdrop-blur-sm
                     text-white/90 px-4 py-2.5 outline-none border border-white/10 focus:border-white/20"
        />
      </div>
      {/* caret */}
      <svg className="pointer-events-none w-4 h-4 text-white/70 absolute right-3 top-1/2 -translate-y-1/2"
        viewBox="0 0 20 20" fill="currentColor">
        <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
      </svg>
    </div>
  );
}

/* ------------------------ Utils (data) ------------------------ */
console.log("promosRaw length =", promos.length, promos.map((p) => p.id));

const isActivePromo = (p, now = new Date()) =>
  (p.isActive !== false) &&
  (!p.startAt || new Date(p.startAt) <= now) &&
  (!p.endAt || now <= new Date(p.endAt));

const daysLeft = (endAt) => {
  if (!endAt) return null;
  const d = Math.ceil((new Date(endAt).getTime() - Date.now()) / (1000 * 3600 * 24));
  return d;
};

const providerColor = (provider = "") => {
  const key = provider.toLowerCase();
  if (key.includes("momo")) return "#ec4899";
  if (key.includes("shopee")) return "#f97316";
  if (key.includes("zalo")) return "#3b82f6";
  if (key.includes("visa")) return "#0ea5e9";
  if (key.includes("lio")) return "#22c55e";
  return "#8B5CF6";
};

const gradientFor = (provider = "") => {
  const base = providerColor(provider);
  return `linear-gradient(180deg, ${base}22, #0b1324 70%)`;
};

const toChromaItem = (p) => {
  const left = daysLeft(p.endAt);
  const subtitle = left != null && left >= 0 ? `${p.desc} · Còn ${left} ngày` : p.desc;

  return {
    id: p.id,
    image: p.img,            // /promotion/xxx.jpg
    title: p.title,
    subtitle,
    handle: p.provider,
    url: p.href,
    borderColor: providerColor(p.provider),
    gradient: gradientFor(p.provider),
  };
};

/* ------------------------ Component ------------------------ */
export default function Event() {
  // UI state
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("all");
  const [sortKey, setSortKey] = useState("priority"); // priority | endAt | title
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const [loading, setLoading] = useState(true);

  // fake first load
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  // reload (debounced) when filters change
  const triggerReload = useDebouncedCallback(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 320);
    return () => clearTimeout(t);
  }, 120);

  useEffect(() => {
    setPage(1);
    triggerReload();
  }, [q, tag, sortKey]);

  // base data (active only)
  const now = useMemo(() => new Date(), []);
  const base = useMemo(
    () => promos.filter((p) => isActivePromo(p, now)).slice(),
    [now]
  );

  // options
  const allTags = useMemo(() => {
    const s = new Set();
    promos.forEach((p) => (p.tags || []).forEach((t) => s.add(t)));
    return ["all", ...Array.from(s)];
  }, []);

  // filtering + sorting
  const filtered = useMemo(() => {
    let out = base;
    if (q.trim()) {
      const kw = q.trim().toLowerCase();
      out = out.filter(
        (p) =>
          p.title.toLowerCase().includes(kw) ||
          p.desc.toLowerCase().includes(kw) ||
          (p.provider || "").toLowerCase().includes(kw)
      );
    }
    if (tag !== "all") {
      out = out.filter((p) => (p.tags || []).includes(tag));
    }
    out.sort((a, b) => {
      if (sortKey === "priority") {
        const pri = (b.priority || 0) - (a.priority || 0);
        if (pri !== 0) return pri;
        const ea =
          new Date(a.endAt || "9999-12-31") -
          new Date(b.endAt || "9999-12-31");
        if (ea !== 0) return ea;
        return a.title.localeCompare(b.title, "vi");
      }
      if (sortKey === "endAt") {
        const ea =
          new Date(a.endAt || "9999-12-31") -
          new Date(b.endAt || "9999-12-31");
        if (ea !== 0) return ea;
        return (b.priority || 0) - (a.priority || 0);
      }
      return a.title.localeCompare(b.title, "vi");
    });
    return out;
  }, [base, q, tag, sortKey]);

  // pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const paged = useMemo(
    () => filtered.slice((pageSafe - 1) * pageSize, pageSafe * pageSize),
    [filtered, pageSafe]
  );

  // items for ChromaGrid
  const items = useMemo(() => paged.map(toChromaItem), [paged]);

  // handlers
  const changePage = (dir) => {
    setPage((p) => Math.min(totalPages, Math.max(1, p + dir)));
    triggerReload();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 min-h-[60vh]">
      {/* Header */}
      <div className="mb-4">
       {/* Title */}
<h1 className="text-4xl font-extrabold tracking-tight mb-2">
  <span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
    Tin khuyến mãi
  </span>
</h1>

{/* Gạch nhấn dưới tiêu đề */}
<div className="h-1 w-28 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 mb-4"></div>

        <p className="text-white/60">
          {loading ? "Đang tải dữ liệu…" : `Có ${total} ưu đãi đang diễn ra`}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <SearchInput value={q} onChange={(e) => setQ(e.target.value)} />
        <FancySelect
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          title="Lọc theo tag"
        >
          {allTags.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "Tất cả tag" : `#${t}`}
            </option>
          ))}
        </FancySelect>
        <FancySelect
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          title="Sắp xếp"
        >
          <option value="priority">Ưu tiên cao trước</option>
          <option value="endAt">Sắp hết hạn</option>
          <option value="title">Theo tên (A→Z)</option>
        </FancySelect>
      </div>

      {/* Content */}
      {loading ? (
        <EventSkeleton count={pageSize} cols={{ base: 1, sm: 2, lg: 3 }} />
      ) : total === 0 ? (
        <EmptyState
          onReset={() => {
            setQ("");
            setTag("all");
          }}
        />
      ) : (
        <>
          <ChromaGrid items={items} className="gap-8" />
          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between text-white/80">
            <button
              onClick={() => changePage(-1)}
              disabled={pageSafe <= 1}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 disabled:opacity-40 hover:bg-white/10 transition"
            >
              ← Trang trước
            </button>
            <div>
              Trang <span className="font-semibold">{pageSafe}</span> / {totalPages}
            </div>
            <button
              onClick={() => changePage(1)}
              disabled={pageSafe >= totalPages}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 disabled:opacity-40 hover:bg-white/10 transition"
            >
              Trang sau →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------ Empty State ------------------------ */
function EmptyState({ onReset }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/80">
      <div className="text-3xl mb-2">¯\_(ツ)_/¯</div>
      <div className="text-lg font-semibold mb-1">
        Không tìm thấy ưu đãi phù hợp
      </div>
      <p className="mb-4">Thử bỏ bớt bộ lọc hoặc xóa từ khóa tìm kiếm nhé.</p>
      <button
        onClick={onReset}
        className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition"
      >
        Xóa bộ lọc
      </button>
    </div>
  );
}
