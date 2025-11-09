// src/Pages/ListElement/TabMovie/components/CircularHero.jsx
import React, { useMemo } from "react";
import CircularGallery from "../../../../reactbits/CircularGallery";

export default function CircularHero({ movies = [], loading = false }) {
  const toCors = (url) =>
  url ? `https://images.weserv.nl/?url=${encodeURIComponent(url.replace(/^https?:\/\//, ''))}` : '';

const items = useMemo(
  () => movies.map(m => ({
    image: toCors(m.posterUrl),
    text: m.title,
  })).filter(x => !!x.image),
  [movies]
);



  return (
    <section className="relative mb-14">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-3 text-lg font-semibold text-white">Spotlight</h2>
        <div style={{ height: "600px", position: "relative" }}>
          <CircularGallery
            items={items}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>
      </div>
    </section>
  );
}
