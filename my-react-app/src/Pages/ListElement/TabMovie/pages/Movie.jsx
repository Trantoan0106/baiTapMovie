// src/Pages/ListElement/TabMovie/pages/Movie.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMoviesQuery } from "../hooks/useMoviesQuery";
import { MovieSelectionProvider } from "../store/selection";
import FilterBar from "../components/FilterBar";
import CircularHero from "../components/CircularHero";
import DomeShowcase from "../components/DomeShowcase";
import TrailerModal from "../components/TrailerModal";

export default function Movie() {
  const [params, setParams] = useState({ group: "GP01" });
  const { data, isLoading, error } = useMoviesQuery(params);
  const movies = Array.isArray(data?.results) ? data.results.filter(Boolean) : [];

  // state trailer modal
  const [openTrailer, setOpenTrailer] = useState(false);
  const [trailerMeta, setTrailerMeta] = useState({ title: '', trailer: '' });
  const nav = useNavigate();

  const handleOpenTrailer = (meta) => {
    setTrailerMeta({ title: meta.title || meta.alt, trailer: meta.trailer });
    setOpenTrailer(true);
  };
  const handleOpenDetail = (meta) => {
    if (meta?.id) nav(`/movie/${meta.id}`);
  };

  return (
    <MovieSelectionProvider>
      <div className="mx-auto max-w-7xl px-4 py-6 text-white">
{/* Title */}
<h1 className="text-4xl font-extrabold tracking-tight mb-2">
  <span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
    Movie
  </span>
</h1>

{/* Gạch nhấn dưới tiêu đề */}
<div className="h-1 w-28 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 mb-4"></div>

        <FilterBar onChange={(f) => setParams({ group: "GP01", ...f })} />

        {isLoading && <p className="text-white">Loading movies…</p>}
        {error && <p className="text-red-400">Error: {String(error?.message || error)}</p>}
        {!isLoading && !error && movies.length === 0 && (
          <p className="text-slate-300">No movies found (results = 0).</p>
        )}

        {movies.length > 0 && (
          <>
            <CircularHero  movies={movies} loading={isLoading} />
            <DomeShowcase
              movies={movies}
              onOpenTrailer={handleOpenTrailer}
              onOpenDetail={handleOpenDetail}
            />
          </>
        )}
      </div>

      {/* Trailer modal */}
      <TrailerModal
        open={openTrailer}
        onClose={() => setOpenTrailer(false)}
        title={trailerMeta.title}
        trailerUrl={trailerMeta.trailer}
      />
    </MovieSelectionProvider>
  );
}
