// src/Pages/ListElement/TabMovie/components/TrailerModal.jsx
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

function toYouTubeEmbed(urlOrId = "") {
  if (!urlOrId) return "";
  // nhận id dạng "abcd" hoặc url đầy đủ
  const idMatch =
    urlOrId.match(/[?&]v=([^&#]+)/) ||
    urlOrId.match(/youtu\.be\/([^?&#]+)/) ||
    urlOrId.match(/youtube\.com\/embed\/([^?&#]+)/);
  const id = idMatch ? idMatch[1] : urlOrId;
  return `https://www.youtube.com/embed/${id}?rel=0&autoplay=1`;
}

export default function TrailerModal({ open, onClose, trailer, title }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-[min(92vw,1000px)] aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        {trailer ? (
          <iframe
            className="w-full h-full"
            src={toYouTubeEmbed(trailer)}
            title={title || "Trailer"}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-white/80">
            No trailer
          </div>
        )}
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full px-4 py-2 bg-white/10 text-white hover:bg-white/20"
      >
        Close
      </button>
    </div>,
    document.body
  );
}
