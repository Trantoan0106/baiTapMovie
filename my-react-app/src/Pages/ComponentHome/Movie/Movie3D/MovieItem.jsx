import React from "react";
import { Link } from "react-router-dom";
import MoviesCometCard from "./MoviesCometCard";

export default function MovieItem({ id, poster, title, href, badge }) {
  return (
    <MoviesCometCard className="w-full h-[420px]">
      
      <div className="group relative block h-full w-full overflow-hidden rounded-2xl">
        
        <img
          src={poster}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/600x900?text=No+Image";
          }}
        />

      
        <div className="absolute left-3 right-3 bottom-3">
          <div className="flex items-center justify-between">
            <span className="max-w-[75%] truncate rounded-md bg-black/70 px-2 py-1 text-xs text-white">
              {title}
            </span>
            {badge && (
              <span className="rounded-md bg-orange-500 px-2 py-1 text-xs text-white">
                {badge}
              </span>
            )}
          </div>
        </div>

        
        <div
          className="
            pointer-events-none absolute inset-0 flex items-center justify-center
            opacity-0 transition-opacity duration-200
            group-hover:opacity-100 group-focus-within:opacity-100
            bg-black/40 backdrop-blur-[2px]
          "
        >
          <div className="pointer-events-auto flex gap-3">
             <Link
    to={href}
    state={{ id, poster, title }}            
    className="
      rounded-xl px-4 py-2 text-sm font-semibold
      bg-sky-600 hover:bg-sky-500
      shadow-lg ring-1 ring-white/20
      focus:outline-none focus:ring-2 focus:ring-white
      !text-white
    "
  >
    <span className="!text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
      Xem chi tiết
    </span>
  </Link>
            
<Link
    to={`/buyticket?movie=${id}`}
    className="
      rounded-xl px-4 py-2 text-sm font-semibold
      bg-emerald-600 hover:bg-emerald-500
      shadow-lg ring-1 ring-white/20
      focus:outline-none focus:ring-2 focus:ring-white
      !text-white
    "
  >
    <span className="!text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
      Mua vé ngay
    </span>
  </Link>



          </div>
        </div>
      </div>
    </MoviesCometCard>
  );
}
