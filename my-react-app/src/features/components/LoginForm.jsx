import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../mutations";

const loginSchema = z.object({
  taiKhoan: z.string().min(1, "Vui lòng nhập tài khoản"),
  matKhau: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

export default function LoginForm({ onSuccess, onSwitchToRegister, onClose }) {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { taiKhoan: "", matKhau: "" },
  });

  const { mutateAsync, isPending } = useLogin();

  const onSubmit = async (values) => {
    try {
      const data = await mutateAsync(values);
      onSuccess?.(data);
    } catch (err) {
      const msg = err?.payload?.content || err?.message || "Đăng nhập thất bại";
      form.setError("root", { message: msg });
    }
  };

  return (
    <div className="relative w-full max-w-[390px] rounded-[28px] overflow-hidden ring-1 ring-white/10 bg-slate-900/92 shadow-[0_16px_48px_rgba(0,0,0,0.45)] backdrop-blur">
      {/* Header */}
      <div className="relative px-4 py-4 bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600">
        <h2 className="text-xl font-extrabold text-white leading-tight">
          Chào mừng trở lại 👋
        </h2>
        <p className="mt-0.5 text-[12px] text-white/95">
          Đăng nhập để tiếp tục mua vé và quản lý tài khoản.
        </p>

        {/* Nút X — icon luôn giữa tâm */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 h-8 w-8 aspect-square rounded-full bg-white text-slate-700 shadow flex items-center justify-center hover:scale-[1.03]"
          aria-label="Đóng"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Tài khoản */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">Tài khoản</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4Z" />
                </svg>
              </span>
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-10 py-3 text-white outline-none focus:border-cyan-400/40 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/30"
                placeholder="Nhập tài khoản"
                {...form.register("taiKhoan")}
              />
            </div>
            <p className="text-sm text-rose-400">{form.formState.errors.taiKhoan?.message}</p>
          </div>

          {/* Mật khẩu */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-200">Mật khẩu</label>

              {/* Quên mật khẩu — pill gradient rõ màu */}
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-3 py-1.5 text-xs font-semibold text-white shadow hover:brightness-110"
                onClick={() => alert("Tính năng Quên mật khẩu sẽ cập nhật sau")}
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM9 14h2v2H9Zm0-10h2v8H9Z"/>
                </svg>
                Quên mật khẩu?
              </button>
            </div>

            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 8V7a5 5 0 0 0-10 0v1H5v12h14V8Zm-8-1a3 3 0 0 1 6 0v1H9Z" />
                </svg>
              </span>
              <input
                type="password"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-10 py-3 text-white outline-none focus:border-fuchsia-400/40 focus:bg-white/10 focus:ring-2 focus:ring-fuchsia-400/30"
                placeholder="••••••••"
                {...form.register("matKhau")}
              />
            </div>
            <p className="text-sm text-rose-400">{form.formState.errors.matKhau?.message}</p>
          </div>

          {/* lỗi tổng */}
          {form.formState.errors.root && (
            <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {form.formState.errors.root.message}
            </p>
          )}

          {/* Remember + terms */}
          <div className="flex items-center justify-between text-sm text-slate-300/90">
            <label className="inline-flex select-none items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-transparent text-cyan-400 focus:ring-cyan-400/40"/>
              Ghi nhớ tôi
            </label>
            <span>
              Bằng việc tiếp tục, bạn đồng ý{" "}
              <a href="#" className="text-cyan-300 hover:text-cyan-200">Điều khoản</a>
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit" disabled={isPending}
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-4 py-3 font-semibold text-slate-900 hover:brightness-105 disabled:opacity-70"
          >
            <span className="relative z-10">{isPending ? "Đang đăng nhập..." : "Đăng nhập"}</span>
            <span className="absolute inset-0 -translate-x-full bg-white/25 blur-sm transition group-hover:translate-x-0" />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-wider text-slate-400">hoặc</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Socials — gradient brand + svg inline */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google */}
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white shadow bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05] hover:brightness-110"
            >
              <span className="grid h-5 w-5 place-items-center rounded bg-white/15">
                <svg viewBox="0 0 24 24" className="h-4 w-4">
                  <path fill="#EA4335" d="M12 11h10a10 10 0 10-2.9 7.1l-3.2-2.6A6 6 0 1112 6v5z"/>
                  <path fill="#4285F4" d="M22 12h-10v-2h10z"/>
                </svg>
              </span>
              Google
            </button>

            {/* Facebook */}
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white shadow bg-gradient-to-r from-[#1877F2] to-[#4C8BF5] hover:brightness-110"
            >
              <span className="grid h-5 w-5 place-items-center rounded bg-white/15">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="white">
                  <path d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.3-1.5 1.7-1.5H17V5.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4v1.9H8v3h2.6v8h2.9z"/>
                </svg>
              </span>
              Facebook
            </button>
          </div>

          {/* footer — pill gradient */}
          <p className="text-center text-sm text-slate-400">
            Chưa có tài khoản?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="inline-flex items-center rounded-full bg-gradient-to-r from-fuchsia-400 to-pink-500 px-3 py-1 text-xs font-semibold text-white hover:brightness-110"
            >
              Đăng ký ngay
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
