import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../mutations";

const registerSchema = z
  .object({
    taiKhoan: z.string().min(1, "Vui lòng nhập tài khoản"),
    hoTen: z.string().min(1, "Vui lòng nhập họ và tên"),
    email: z.string().email("Email không hợp lệ"),
    soDt: z
      .string()
      .min(9, "Số điện thoại không hợp lệ")
      .max(20, "Số điện thoại không hợp lệ"),
    matKhau: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu"),
    maNhom: z.string().min(1, "Vui lòng chọn mã nhóm"),
  })
  .refine((v) => v.matKhau === v.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"],
  });

export default function RegisterForm({ onSuccess, onClose }) {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      taiKhoan: "",
      hoTen: "",
      email: "",
      soDt: "",
      matKhau: "",
      confirmPassword: "",
      maNhom: "GP01",
    },
  });

  const { register, handleSubmit, formState, setError } = form;
  const { errors } = formState;
  const { mutateAsync, isPending } = useRegister();

  const onSubmit = async (values) => {
    const { confirmPassword, ...payload } = values;
    try {
      const data = await mutateAsync(payload);
      onSuccess?.(data);
    } catch (err) {
      const msg = err?.payload?.content || err?.message || "Đăng ký thất bại";
      setError("root", { message: msg });
    }
  };

  const groups = [
    "GP01",
    "GP02",
    "GP03",
    "GP04",
    "GP05",
    "GP06",
    "GP07",
    "GP08",
    "GP09",
    "GP10",
  ];
  const labelCls =
    "flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-200";
  const inputCls =
    "mt-1 h-9 w-full rounded-xl border border-white/10 bg-slate-800/80 px-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-fuchsia-400/50 focus:ring-2 focus:ring-fuchsia-400/30";

  return (
    <div className="relative w-full max-w-[390px] rounded-[28px] overflow-hidden ring-1 ring-white/10 bg-slate-900/92 shadow-[0_16px_48px_rgba(0,0,0,0.45)] backdrop-blur">
      {/* Header */}
      <div className="relative px-4 py-4 bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600">
        <h2 className="text-xl font-extrabold text-white leading-tight">
          Tạo tài khoản
        </h2>
        <p className="mt-0.5 text-[12px] text-white/95">
          Đăng ký để đặt vé, nhận ưu đãi và quản lý tài khoản của bạn.
        </p>

        {/* Nút X — icon ở giữa tâm */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 h-8 w-8 aspect-square rounded-full bg-white text-slate-700 shadow flex items-center justify-center hover:scale-[1.03]"
          aria-label="Đóng"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
          {/* Tài khoản */}
          <div>
            <label className={labelCls}>
              Tài khoản
              <span className="h-1 w-7 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
            </label>
            <input
              className={inputCls}
              placeholder="vd: nguyenvana"
              {...register("taiKhoan")}
            />
            {errors.taiKhoan && (
              <p className="mt-1 text-[11px] text-rose-400">
                {errors.taiKhoan.message}
              </p>
            )}
          </div>

          {/* Họ và tên */}
          <div>
            <label className={labelCls}>
              Họ và tên
              <span className="h-1 w-7 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
            </label>
            <input
              className={inputCls}
              placeholder="vd: Nguyễn Văn A"
              {...register("hoTen")}
            />
            {errors.hoTen && (
              <p className="mt-1 text-[11px] text-rose-400">
                {errors.hoTen.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className={labelCls}>
              Email
              <span className="h-1 w-7 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
            </label>
            <input
              type="email"
              className={inputCls}
              placeholder="vd: email@domain.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-[11px] text-rose-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Số điện thoại */}
          <div>
            <label className={labelCls}>
              Số điện thoại
              <span className="h-1 w-7 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
            </label>
            <input
              className={inputCls}
              placeholder="vd: 0901234567"
              {...register("soDt")}
            />
            {errors.soDt && (
              <p className="mt-1 text-[11px] text-rose-400">
                {errors.soDt.message}
              </p>
            )}
          </div>

          {/* Mật khẩu */}
          <div>
            <label className={labelCls}>
              Mật khẩu
              <span className="h-1 w-7 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
            </label>
            <div className="mt-1 relative">
              <input
                type={showPwd ? "text" : "password"}
                className={`${inputCls} pr-20`}
                placeholder="Tối thiểu 6 ký tự"
                {...register("matKhau")}
              />
              {/* Nút Hiện/Ẩn — nhỏ, căn giữa */}
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 min-w-[46px] px-2 rounded-md border border-white/15 bg-white text-slate-800 text-xs font-semibold flex items-center justify-center leading-none hover:brightness-105"
              >
                {showPwd ? "Ẩn" : "Hiện"}
              </button>
            </div>
            {errors.matKhau && (
              <p className="mt-1 text-[11px] text-rose-400">
                {errors.matKhau.message}
              </p>
            )}
          </div>

          {/* Nhập lại mật khẩu */}
          <div>
            <label className={labelCls}>
              Nhập lại mật khẩu
              <span className="h-1 w-7 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
            </label>
            <div className="mt-1 relative">
              <input
                type={showPwd2 ? "text" : "password"}
                className={`${inputCls} pr-20`}
                placeholder="Nhập lại mật khẩu"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowPwd2((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 min-w-[46px] px-2 rounded-md border border-white/15 bg-white text-slate-800 text-xs font-semibold flex items-center justify-center leading-none hover:brightness-105"
              >
                {showPwd2 ? "Ẩn" : "Hiện"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-[11px] text-rose-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Mã nhóm */}
          <div>
            <label className={labelCls}>
              Mã nhóm
              <span className="h-1 w-7 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
            </label>
            <select className={inputCls} {...register("maNhom")}>
              {groups.map((g) => (
                <option key={g} value={g} className="bg-slate-800">
                  {g}
                </option>
              ))}
            </select>
            {errors.maNhom && (
              <p className="mt-1 text-[11px] text-rose-400">
                {errors.maNhom.message}
              </p>
            )}
          </div>

          {/* lỗi tổng */}
          {errors.root && (
            <p className="rounded-md border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-300">
              {errors.root.message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="mt-1.5 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-fuchsia-500/30 hover:brightness-110 active:scale-[.99] disabled:opacity-70"
          >
            {isPending ? "Đang đăng ký..." : "Đăng ký"}
          </button>

          <p className="text-center text-[11px] text-slate-400">
            Đã có tài khoản?{" "}
            <span className="text-indigo-300 cursor-pointer hover:underline">
              Đăng nhập
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
