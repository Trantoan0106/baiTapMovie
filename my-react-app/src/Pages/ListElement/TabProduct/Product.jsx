
import { useMemo, useState } from "react";
import products from "./data/products";


const formatVND = (n) => new Intl.NumberFormat("vi-VN").format(n) + " ₫";

export default function Product() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    if (!kw) return products;
    return products.filter((p) =>
      (p.name + " " + p.desc + " " + (p.tags || []).join(" "))
        .toLowerCase()
        .includes(kw)
    );
  }, [q]);

  

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
      
      <div className="mb-5 flex items-end justify-between gap-3 flex-wrap">
        <div>
        
<h1 className="text-4xl font-extrabold tracking-tight mb-2">
  <span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
    Start Shop
  </span>
</h1>


<div className="h-1 w-28 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 mb-4"></div>

          <p className="text-white/60">Seasonal &amp; Movie Merchandise</p>
        </div>
        <div className="w-full md:w-[360px]">
          <Search value={q} onChange={setQ} />
        </div>
      </div>

      <ProductGrid items={filtered} />
    </div>
  );
}


function Search({ value, onChange }) {
  return (
    <div className="relative group">
      <div className="rounded-2xl p-[1.5px] bg-gradient-to-r from-indigo-500/60 via-fuchsia-500/60 to-cyan-400/60">
        <div className="rounded-2xl bg-[#0b1324]/80 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-2 px-4 py-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.25 5.25a7.5 7.5 0 0011.4 11.4z"
              />
            </svg>
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Tìm sản phẩm…"
              className="w-full bg-transparent outline-none text-white/90 placeholder-white/40"
            />
            {value && (
              <button
                onClick={() => onChange("")}
                className="text-white/60 hover:text-white/90"
                aria-label="Clear"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


function ProductGrid({ items }) {
  if (!items?.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/80">
        Không có sản phẩm phù hợp.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}

function ProductCard({ p }) {
  const isSale = p.priceOriginal && p.priceOriginal > p.price;

  const handleBuy = () => {
    console.log("MUA NGAY:", p.id);
  };
  const handleAdd = () => {
    console.log("THÊM VÀO GIỎ:", p.id);
  };

  return (
    <article
      className="group rounded-2xl overflow-hidden bg-[#0b1324]/80 border border-white/10
                 backdrop-blur-sm shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          className="w-full h-full object-cover transform transition duration-500 group-hover:scale-[1.05]"
        />
        {(p.badge || isSale) && (
          <div className="absolute left-3 top-3 flex items-center gap-2">
            {p.badge && (
              <span className="px-2 py-1 text-[11px] font-semibold rounded-full
                               bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white/95 shadow">
                {p.badge}
              </span>
            )}
            {isSale && (
              <span className="px-2 py-1 text-[11px] font-semibold rounded-full
                               bg-emerald-600/90 text-white shadow">
                -{Math.round(((p.priceOriginal - p.price) / p.priceOriginal) * 100)}%
              </span>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-white font-semibold text-[1.05rem] leading-snug line-clamp-2">
          {p.name}
        </h3>
        <p className="text-white/70 text-[0.9rem] mt-1 line-clamp-2 min-h-[2.6rem]">
          {p.desc}
        </p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-[1.05rem] font-bold text-white">
            {formatVND(p.price)}
          </span>
          {isSale && (
            <span className="text-white/50 line-through text-sm">
              {formatVND(p.priceOriginal)}
            </span>
          )}
        </div>

        <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
          <button
            onClick={handleBuy}
            className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl
                       text-[0.95rem] font-semibold
                       bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-indigo-500
                       hover:from-cyan-400 hover:to-indigo-400
                       text-white shadow hover:shadow-lg transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 13h4l-1 8 7-12h-4l1-8L7 13z" />
            </svg>
            Mua ngay
          </button>

          <button
            onClick={handleAdd}
            className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl
                       text-[0.95rem] font-semibold
                       bg-[#0f172a]/80 text-white border border-white/15
                       hover:bg-[#0f172a]/95 hover:text-white
                       shadow-sm transition"
            style={{ backgroundColor: "rgba(15, 23, 42, 0.80)" }} 
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14h9.69c.75 0 1.41-.41 1.75-1.03l3.58-6.49a1 1 0 00-.88-1.48H6.21L5.27 2H2v2h2l3.6 7.59-.95 1.72A2 2 0 008.4 16H20v-2H8.53l.63-1.15z" />
            </svg>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  );
}
