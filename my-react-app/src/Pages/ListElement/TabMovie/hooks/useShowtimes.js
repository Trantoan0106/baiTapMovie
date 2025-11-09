// src/hooks/useShowtimes.js
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://movienew.cybersoft.edu.vn/api";
const TOKEN = import.meta.env.VITE_CYBERSOFT_TOKEN;


async function fetchShowtimes(movieId) {
  if (!movieId) throw new Error("Thiếu movieId");

  const url = `${BASE_URL}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${encodeURIComponent(
    movieId
  )}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      TokenCybersoft: TOKEN, 
    },
  });

  if (!res.ok) {
    
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || "Bad Request"}`);
  }

  
  const json = await res.json().catch(() => ({}));
  return json?.content ;
}

export function useShowtimes(movieId) {
  return useQuery({
    queryKey: ["showtimes", String(movieId)],
    queryFn: () => fetchShowtimes(movieId),
    enabled: !!movieId,        // chỉ chạy khi có id
    staleTime: 60 * 1000,      // 1 phút (đồng bộ với cấu hình global của bạn)
    retry: 1,                  // thử lại 1 lần nếu lỗi mạng
    refetchOnWindowFocus: false,
  });
}
