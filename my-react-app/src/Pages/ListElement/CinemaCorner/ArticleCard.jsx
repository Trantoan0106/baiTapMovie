import React from "react";
import { Link } from "react-router-dom";
import DraggableCard from "./DraggableCard";

const PLACEHOLDER = "https://placehold.co/800x500?text=No+Image";

export default function ArticleCard({ article }) {
  const { slug, title, excerpt, cover } = article;

  return (
    <DraggableCard className="h-[420px] w-full" title={title} excerpt={excerpt} cover={cover}>
      <Link
        to={`/cinemacorner/${slug}`}
        className="inline-block rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-white"
      >
        Xem chi tiết →
      </Link>
      {/* ảnh fallback nếu cần riêng */}
      {!cover && (
        <img
          src={PLACEHOLDER}
          alt={title}
          className="hidden"
        />
      )}
    </DraggableCard>
  );
}
