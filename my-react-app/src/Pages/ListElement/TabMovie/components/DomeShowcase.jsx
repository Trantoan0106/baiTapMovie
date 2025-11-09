// DomeShowcase.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DomeGallery from "../../../../reactbits/DomeGallery";
import TrailerModal from "../components/TrailerModal";

// Hàm lấy ra các trường cần thiết một cách đơn giản
function getId(m) {
  if (!m) return null;
  return m.maPhim || m.id || m.movieId || null;
}
function getTitle(m) {
  if (!m) return "";
  const t = m.tenPhim || m.title || m.name || "";
  return String(t).trim();
}
function getPoster(m) {
  if (!m) return "";
  const raw = m.hinhAnh || m.poster || m.posterUrl || m.image || m.thumbnail || "";
  return typeof raw === "string" ? raw.trim() : "";
}
function getTrailer(m) {
  if (!m) return "";
  const raw = m.trailer || m.trailerUrl || "";
  return String(raw).trim();
}

export default function DomeShowcase({ movies = [] }) {
  const navigate = useNavigate();

  // Chuẩn hóa danh sách items cho DomeGallery
  const items = movies
    .map((m) => {
      return {
        id: getId(m),
        src: getPoster(m),
        alt: getTitle(m),
        title: getTitle(m),
        trailer: getTrailer(m),
      };
    })
    .filter((x) => x.id && x.src); // chỉ giữ item có id và poster

  const [trailer, setTrailer] = useState({
    open: false,
    url: "",
    title: "",
  });

  // Mở trang chi tiết phim
  function handleOpenDetail(meta) {
    if (!meta || !meta.id) return;
    navigate(`/movie/${meta.id}`, {
      state: {
        title: meta.title || meta.alt || "",
        poster: meta.src || "",
        trailer: meta.trailer || "",
      },
    });
  }

  // Mở trailer
  function handleOpenTrailer(meta) {
    if (!meta || !meta.trailer) return;
    setTrailer({
      open: true,
      url: meta.trailer,
      title: meta.title || meta.alt || "",
    });
  }

  // Đóng trailer
  function handleCloseTrailer() {
    setTrailer({ open: false, url: "", title: "" });
  }

  return (
    <>
      <DomeGallery
        items={items}
        grayscale={false}
        onOpenDetail={handleOpenDetail}
        onOpenTrailer={handleOpenTrailer}
      />
      <TrailerModal
        open={trailer.open}
        trailer={trailer.url}
        title={trailer.title}
        onClose={handleCloseTrailer}
      />
    </>
  );
}
