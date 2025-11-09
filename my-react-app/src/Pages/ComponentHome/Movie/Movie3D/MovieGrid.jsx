import React from "react";
import MovieItem from "./MovieItem";

export default function MovieGrid({ movies }) {
  return (
    <div className="grid grid-cols-2 gap-20 sm:grid-cols-3 lg:grid-cols-4">
      {movies.map((m) => (
        <MovieItem
          key={m.id}
          id={m.id}
          poster={m.poster}
          title={m.title}
          href={`/movie/${m.id}`}
          badge={m.badge}
        />
      ))}
    </div>
  );
}
