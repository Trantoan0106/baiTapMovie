import * as React from "react";
import { Link } from "react-router-dom";
import { DraggableCardBody } from "./DraggableCard";

/** random ổn định theo seed + index */
const seeded = (seed, i) => {
  const x = Math.sin((i + 1) * 9999 + seed * 123.456) * 43758.5453;
  return x - Math.floor(x);
};

export default function ArticleGrid({ items = [] }) {
  const [view, setView] = React.useState(
    () => sessionStorage.getItem("cc:view") || "pile"
  );
  React.useEffect(() => {
    sessionStorage.setItem("cc:view", view);
  }, [view]);

  const [seed, setSeed] = React.useState(0);

  const [zTop, setZTop] = React.useState(1000);
  const zRef = React.useRef({});

  const bringToFront = (id) => {
    setZTop((t) => {
      const next = t + 1;
      zRef.current[id] = next;
      return next;
    });
  };

  const pileList = React.useMemo(() => {
    const take = items.slice(0, Math.min(items.length, 8));
    return take.map((a, i) => {
      const r1 = seeded(seed, i + 1);
      const r2 = seeded(seed, i + 2);
      const r3 = seeded(seed, i + 3);
      const angle = r1 * 32 - 16;
      const radius = 24 + r2 * 56;
      const dir = r3 * Math.PI * 2;
      const x = Math.cos(dir) * radius;
      const y = Math.sin(dir) * radius;
      return { id: a.id, x, y, angle, z: 10 + i, data: a };
    });
  }, [items, seed]);

  React.useEffect(() => {
    const onView = (e) => {
      const mode = e?.detail === "grid" ? "grid" : "pile";
      setView(mode);
    };
    const onShuffle = () => {
      setView((v) => {
        if (v === "grid") {
          zRef.current = {};
          setZTop(1000);
        }
        return "pile";
      });
      queueMicrotask(() => setSeed((s) => s + 1));
    };
    const onReset = () => {
      setView("pile");
      queueMicrotask(() => {
        setSeed(0);
        zRef.current = {};
        setZTop(1000);
      });
    };

    window.addEventListener("pile:view", onView);
    window.addEventListener("pile:shuffle", onShuffle);
    window.addEventListener("pile:reset", onReset);
    return () => {
      window.removeEventListener("pile:view", onView);
      window.removeEventListener("pile:shuffle", onShuffle);
      window.removeEventListener("pile:reset", onReset);
    };
  }, []);

  const offsetX = -80;
  return (
    <div className="relative">
      {/* PILE */}
      {view === "pile" && (
        <div className="relative mb-10 h-[100px]">
          {/* BỎ pointer-events-none ở đây */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {pileList.map((p) => {
              const a = p.data;
              return (
                <DraggableCardBody
                  key={a.id}
                  className="pointer-events-auto absolute w-[130px] md:w-[340px]"
                  style={{
                    x: p.x + offsetX,
                    y: p.y,
                    rotate: p.angle,
                    zIndex: zRef.current[a.id] ?? p.z,
                  }}
                  drag
                  dragElastic={0.12}
                  dragMomentum
                  onPointerDown={() => bringToFront(a.id)}
                >
                  <div className="select-none rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
                    <div className="h-[280px] overflow-hidden rounded-t-2xl">
                      <img
                        src={a.cover}
                        alt={a.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/800x1000?text=No+Image";
                        }}
                      />
                    </div>
                    <div className="px-4 py-3">
                      <p className="line-clamp-1 text-base font-semibold text-zinc-900">
                        {a.title}
                      </p>
                      {a.excerpt && (
                        <p className="mt-1 line-clamp-2 text-sm text-zinc-600">
                          {a.excerpt}
                        </p>
                      )}
                      <div className="mt-2">
                        <Link
                          to={`/cinemacorner/${a.slug}`}
                          className="inline-flex items-center rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                        >
                          Xem chi tiết →
                        </Link>
                      </div>
                    </div>
                  </div>
                </DraggableCardBody>
              );
            })}
          </div>
        </div>
      )}


      {/* GRID */}
      {view === "grid" && (
        <div className=" mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 text-[13px]">
          {items.map((a) => (
            <article
              key={a.id}
              className="group overflow-hidden rounded-2xl ring-1 ring-zinc-200 transition-shadow hover:shadow-md"
            >
              <Link to={`/cinemacorner/${a.slug}`} className="block">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={a.cover}
                    alt={a.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/800x500?text=No+Image";
                    }}
                  />
                </div>
              </Link>
              <div className="space-y-2 p-4">
                <h3 className="line-clamp-2 text-base font-semibold text-zinc-900">
                  {a.title}
                </h3>
                {a.excerpt && (
                  <p className="line-clamp-2 text-sm text-zinc-600">
                    {a.excerpt}
                  </p>
                )}
                <div>
                  <Link
                    to={`/cinemacorner/${a.slug}`}
                    className="inline-flex items-center rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                  >
                    Xem chi tiết →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
