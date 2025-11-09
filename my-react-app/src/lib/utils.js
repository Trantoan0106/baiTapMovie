import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  // nhớ spread ...inputs để clsx nhận đúng tham số
  return twMerge(clsx(...inputs));
}
