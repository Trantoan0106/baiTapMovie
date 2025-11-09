import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState("login");

  // khóa scroll khi mở modal
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[999]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel trong suốt chỉ chứa 1 card (form) */}
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="bg-transparent p-0 m-0 border-0 shadow-none">
          {mode === "login" ? (
            <LoginForm
              onSuccess={onClose}
              onSwitchToRegister={() => setMode("register")}
              onClose={onClose}
            />
          ) : (
            <RegisterForm onSuccess={onClose} onClose={onClose} />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
