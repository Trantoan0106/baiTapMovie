// src/reactbits/ChromaGrid.jsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

export default function ChromaGrid({
  items,
  className = "",
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const navigate = useNavigate();

  // inject CSS clamp 1 lần (nếu chưa có plugin line-clamp)
  useEffect(() => {
    const id = "chroma-grid-clamp-style";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = `
        .clamp-2{
          display:-webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient:vertical;
          overflow:hidden;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const demo = [
    /* ... demo của bạn nếu cần */
  ];
  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, { opacity: 1, duration: fadeOut, overwrite: true });
  };

  const handleCardClick = (url) => {
    if (!url) return;
    if (url.startsWith("/")) navigate(url);
    else window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCardMove = (e) => {
    const c = e.currentTarget;
    const rect = c.getBoundingClientRect();
    c.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    c.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      // 👇 Grid có padding để không dính mép + gap đều nhau
      className={`relative w-full rounded-3xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-3 sm:p-4 ${className}`}
      style={{ "--r": `${radius}px`, "--x": "50%", "--y": "50%" }}
    >
      {data.map((c, i) => (
        <article
          key={c.id ?? i}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          // 👇 Card chiều cao cố định, mọi card bằng nhau
          className="group relative flex flex-col w-full h-[380px]
                     rounded-[20px] overflow-hidden border-2 border-transparent
                     transition-colors duration-300 cursor-pointer bg-black/20"
          style={{
            "--card-border": c.borderColor || "transparent",
            background: c.gradient,
            "--spotlight-color": "rgba(255,255,255,0.3)",
          }}
        >
          {/* vệt sáng bám chuột */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
            }}
          />

          {/* Ảnh 16:9 để mọi card đồng nhất phần media */}
          <div className="relative z-10 p-2 box-border">
            <div className="w-full aspect-[16/9] overflow-hidden rounded-[12px]">
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Nội dung chiếm phần còn lại; clamp để không đội chiều cao */}
          <footer className="relative z-10 px-3 pb-3 pt-1 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 flex-1">
            <h3 className="m-0 text-[1.05rem] font-semibold clamp-2">{c.title}</h3>
            {c.handle && (
              <span className="text-[0.95rem] opacity-80 text-right">{c.handle}</span>
            )}
            <p className="m-0 text-[0.85rem] opacity-85 clamp-2">{c.subtitle}</p>
            {c.location && (
              <span className="text-[0.85rem] opacity-85 text-right">{c.location}</span>
            )}
          </footer>
        </article>
      ))}

      {/* spotlight mask */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: "grayscale(1) brightness(0.78)",
          WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
          background: "rgba(0,0,0,0.001)",
          maskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
        }}
      />
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
        style={{
          backdropFilter: "grayscale(1) brightness(0.78)",
          WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
          background: "rgba(0,0,0,0.001)",
          maskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
          opacity: 1,
        }}
      />
    </div>
  );
}
