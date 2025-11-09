// src/pages/MovieDetail.jsx
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useShowtimes } from "../hooks/useShowtimes";
import TrailerModal from "../components/TrailerModal";

export default function MovieDetail() {
  const { id } = useParams(); // id = maPhim
  const nav = useNavigate();
  const { state } = useLocation();

  const { data, loading, error } = useShowtimes(id);

  const info = data?.thongTinPhim || {};
  const title = info.tenPhim || state?.title || `Movie #${id}`;
  const posterSrc = info.hinhAnh || state?.poster || "";
  const trailerUrl = info.trailer || state?.trailer || "";

  const hasShowtimes = (data?.heThongRapChieu?.length || 0) > 0;
  const [openTrailer, setOpenTrailer] = useState(false);

  const bg = posterSrc
    ? `url(${posterSrc})`
    : "linear-gradient(120deg, #111827, #0b0e16)";

  return (
    <div className="min-h-screen bg-[#0b0e16] text-white">
      {/* HERO */}
      <section
        className="relative w-full h-[60vh] overflow-hidden"
        style={{
          backgroundImage: bg,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#0b0e16]" />
        <div className="relative z-10 max-w-7xl mx-auto h-full px-4 flex items-end pb-10">
          <div className="flex gap-6 items-end">
            <img
              className="w-40 sm:w-44 md:w-48 h-60 sm:h-64 md:h-72 rounded-2xl shadow-2xl object-cover border border-white/10"
              src={posterSrc}
              alt={title}
            />
            <div>
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={() => nav(-1)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold
             !bg-black/40 hover:!bg-black/60
             !text-white border border-white/25 shadow-sm transition"
                >
                  ← Quay lại
                </button>

                {/* ĐÃ BỎ #id */}
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow">
                {title}
              </h1>

              {!!info.moTa && (
                <p className="mt-3 max-w-2xl text-white/80 line-clamp-3">
                  {info.moTa}
                </p>
              )}

              {/* ACTION BUTTONS — màu đậm, chữ rõ, disabled vẫn rõ */}
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => setOpenTrailer(true)}
                  disabled={!trailerUrl}
                  className="
                    inline-flex items-center gap-2 px-4 py-2 rounded-xl
                    !bg-sky-600 hover:!bg-sky-500
                    !text-white font-semibold text-base
                    border border-sky-300/30 shadow
                    disabled:!bg-zinc-700 disabled:!text-zinc-300
                    disabled:border-zinc-500/40 disabled:cursor-not-allowed
                    disabled:shadow-none
                    transition
                  "
                  title={trailerUrl ? "Xem trailer" : "Chưa có trailer"}
                >
                  ▶ Xem trailer
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("showtimes")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="
                    inline-flex items-center gap-2 px-4 py-2 rounded-xl
                    !bg-emerald-600 hover:!bg-emerald-500
                    !text-white font-semibold text-base
                    border border-emerald-300/30 shadow
                    transition
                  "
                >
                  🎟️ Mua vé
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWTIMES */}
      <section id="showtimes" className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-4">Lịch chiếu</h2>

        {loading && <p className="text-white/70">Đang tải lịch chiếu…</p>}
        {error && <p className="text-rose-400">Không tải được lịch chiếu.</p>}

        {!loading &&
          !error &&
          (hasShowtimes ? (
            <div className="space-y-6">
              {data.heThongRapChieu.map((sys) => (
                <div
                  key={sys.maHeThongRap}
                  className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
                >
                  <div className="flex items-center gap-3 px-5 py-4 bg-white/5">
                    {sys.logo ? (
                      <img
                        src={sys.logo}
                        className="w-10 h-10 rounded-md object-contain"
                        alt={sys.tenHeThongRap}
                      />
                    ) : null}
                    <h3 className="text-lg font-semibold">
                      {sys.tenHeThongRap}
                    </h3>
                  </div>

                  <div className="p-5 space-y-5">
                    {(sys.cumRapChieu || []).map((cluster) => (
                      <div
                        key={cluster.maCumRap}
                        className="rounded-xl border border-white/10 bg-black/20 p-4"
                      >
                        <p className="font-medium">{cluster.tenCumRap}</p>
                        <p className="text-white/60 text-sm">
                          {cluster.diaChi}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-3">
                          {(cluster.lichChieuPhim || []).map((slot) => {
                            const t = new Date(slot.ngayChieuGioChieu);
                            const hh = t.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            });
                            const dd = t.toLocaleDateString("vi-VN");
                            const price =
                              slot.giaVe != null
                                ? new Intl.NumberFormat("vi-VN").format(
                                    slot.giaVe
                                  )
                                : null;

                            return (
                              <button
                                key={slot.maLichChieu}
                                onClick={() =>
                                  nav(`/buyticket?show=${slot.maLichChieu}`)
                                }
                                className="rounded bg-white text-black px-3 py-2 text-sm font-semibold hover:scale-[1.02] active:scale-95 transition"
                                title={`${dd} ${hh}`}
                              >
                                {hh}
                                <span className="ml-2 text-black/70">
                                  • {dd}
                                </span>
                                {price ? (
                                  <span className="ml-2 text-emerald-600">
                                    {price}₫
                                  </span>
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-white/80">
                Chưa có lịch chiếu cho phim này. Bạn có thể quay lại sau hoặc
                vào mục{" "}
                <button
                  onClick={() => nav("/buyticket")}
                  className="underline text-sky-300 hover:text-sky-200"
                >
                  Mua vé
                </button>
                .
              </p>
            </div>
          ))}
      </section>

      {/* TRAILER MODAL */}
      <TrailerModal
        open={openTrailer}
        onClose={() => setOpenTrailer(false)}
        title={title}
        trailer={trailerUrl}
      />
    </div>
  );
}
