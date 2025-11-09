// src/features/auth/components/LoginModal.jsx
import React, { useState } from "react";
import { createPortal } from "react-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginModal({ open, onClose }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  if (!open) return null;

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[999] grid place-items-center bg-slate-950/60 backdrop-blur-sm"
    >
      {/* orbs trang trí */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl" />

      <div className="relative mx-4 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-cyan-400/10 via-fuchsia-500/10 to-transparent px-6 py-4">
          <h2 className="text-lg font-semibold tracking-tight text-white">
            {mode === "login" ? "Đăng nhập" : "Đăng ký"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white"
            aria-label="Đóng"
          >
            ✕
          </button>
        </div>

        {/* Body: chỉ render 1 trong 2 form */}
        <div className="px-6 py-6">
          {mode === "login" ? (
            <LoginForm
              onSuccess={onClose}
              onSwitchToRegister={() => setMode("register")}
            />
          ) : (
            <RegisterForm
              onSuccess={onClose}
              // Có thể thêm onSwitchToLogin nếu muốn nút "Đăng nhập"
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
