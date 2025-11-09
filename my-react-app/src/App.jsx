import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "./assets/—Pngtree—beautiful illustration of movie film_6544981.png";
import AuthModal from "./features/components/AuthModal";
import GlobalBackground from "./features/particles/GlobalBackground"; // ✅ nền toàn site
import Footer from "./features/layout/Footer";

export default function App() {
  // ====== HEADER ======
  const headerStyle = {
    position: "sticky",
    top: 0,
    zIndex: 50,                       // ✅ nổi trên particles
    width: "100%",
    background: "#0b1220dd",          // hơi trong suốt 1 chút (đẹp), bạn có thể đổi lại "#0b1220"
    boxShadow: "0 8px 24px rgba(2,6,23,.35)",
    borderBottom: "1px solid rgba(148,163,184,.15)",
    backdropFilter: "saturate(140%) blur(6px)", // tùy thích
  };

  const innerStyle = {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "nowrap",
  };

  // ====== LOGO ======
  const logoBox = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 46,
    height: 46,
    borderRadius: 12,
    border: "1px solid rgba(148,163,184,.15)",
    background: "transparent",
    flex: "0 0 auto",
  };
  const logoActiveGlow = {
    boxShadow:
      "0 6px 18px rgba(167,139,250,.25), 0 3px 10px rgba(34,211,238,.22)",
    borderColor: "transparent",
  };
  const logoImg = {
    height: 38,
    width: "auto",
    display: "block",
    objectFit: "contain",
  };

  // ====== MENU NAV ======
  const menuGroup = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginLeft: 10,
    flex: 1,
    flexWrap: "nowrap",
    overflow: "hidden",
  };

  const navBtnBase = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 38,
    minWidth: 104,
    padding: "0 14px",
    borderRadius: 999,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: ".2px",
    border: "1px solid rgba(148,163,184,.18)",
    background: "rgba(148,163,184,.12)",
    color: "#e2e8f0",
    transition:
      "transform .15s, box-shadow .15s, background-color .15s, color .15s, border-color .15s",
    whiteSpace: "nowrap",
    flex: "0 0 auto",
  };
  const navBtnHover = {
    background: "rgba(148,163,184,.18)",
    borderColor: "rgba(148,163,184,.28)",
  };
  const navBtnActive = {
    color: "#fff",
    background: "linear-gradient(90deg,#22d3ee,#a78bfa)",
    borderColor: "transparent",
    boxShadow:
      "0 10px 24px rgba(167,139,250,.25), 0 6px 12px rgba(34,211,238,.22)",
  };

  // ====== SEARCH + LOGIN ======
  const authGroup = {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: 10,
    flex: "0 0 auto",
  };
  const inputStyle = {
    height: 38,
    padding: "0 12px",
    borderRadius: 999,
    border: "1px solid rgba(148,163,184,.25)",
    background: "rgba(148,163,184,.10)",
    color: "#e2e8f0",
    outline: "none",
    width: 240,
  };
  const btnStyle = {
    ...navBtnBase,
    height: 38,
    minWidth: 96,
  };

  const links = [
    ["buyticket", "Buy ticket"],
    ["movie", "Movie"],
    ["event", "Event"],
    ["product", "Product"],
    ["cinemacorner", "Cinema Corner"],
  ];

  const [openLogin, setOpenLogin] = useState(false);

  return (
    // ✅ isolate tạo stacking context, mọi z-index predictable
    <div className="relative min-h-screen isolate bg-black" >
      {/* NỀN TOÀN SITE */}
      <GlobalBackground />

      {/* HEADER */}
      <header style={headerStyle} className="relative z-20">
        <div style={innerStyle}>
          {/* LOGO */}
          <NavLink
            to="/"
            end
            title="Trang chủ"
            style={({ isActive }) => ({
              ...logoBox,
              ...(isActive ? logoActiveGlow : {}),
            })}
          >
            <img src={logo} alt="brand logo" style={logoImg} />
          </NavLink>

          {/* MENU */}
          <nav style={menuGroup}>
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={`/${to}`}
                style={({ isActive }) => ({
                  ...navBtnBase,
                  ...(isActive ? navBtnActive : {}),
                })}
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, navBtnHover)
                }
                onMouseLeave={(e) => {
                  const isActive =
                    e.currentTarget.getAttribute("aria-current") === "page";
                  Object.assign(
                    e.currentTarget.style,
                    isActive ? navBtnActive : navBtnBase
                  );
                }}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* SEARCH + LOGIN */}
          <div style={authGroup}>
            <input placeholder="Tìm kiếm ..." style={inputStyle} />
            <button
              style={btnStyle}
              onClick={() => setOpenLogin(true)}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, navBtnHover)
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, btnStyle)
              }
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* NỘI DUNG luôn nổi trên particles */}
      <main className="relative z-10">
        <Outlet />
      </main>

<Footer/>
      {/* MODAL */}
      {openLogin && <AuthModal onClose={() => setOpenLogin(false)} />}
    </div>
  );
}
