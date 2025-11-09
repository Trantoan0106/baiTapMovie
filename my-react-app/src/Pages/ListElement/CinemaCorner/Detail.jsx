import React from "react";
import { Link, useParams } from "react-router-dom";
import articles from "@/lib/cinemaCorner.data";

function formatDate(d) {
  const x = new Date(d);
  if (isNaN(x)) return "";
  return x.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function CinemaCornerDetail() {
  const { slug } = useParams();

  const article = React.useMemo(
    () => articles.find((a) => a.slug === slug),
    [slug]
  );

  if (!article) {
    return (
      <main className="mx-auto max-w-[980px] px-4 py-16">
        <h1 className="text-2xl font-bold">Không tìm thấy bài viết</h1>
        <p className="mt-2 text-zinc-600">Có thể bài đã bị xóa hoặc đường dẫn không đúng.</p>
        <Link to="/cinemacorner" className="mt-6 inline-block text-indigo-600 underline">
          ← Quay lại Góc điện ảnh
        </Link>
      </main>
    );
  }

  const { title, cover, date, tags = [], content, excerpt } = article;

  return (
    <main className="py-8">
      <section className="mx-auto w-full max-w-[980px] px-4">
        {/* breadcrumb */}
        <nav className="mb-4 text-sm">
          <Link to="/" className="text-zinc-500 hover:text-zinc-700">Trang chủ</Link>
          <span className="px-2 text-zinc-400">/</span>
          <Link to="/cinemacorner" className="text-zinc-500 hover:text-zinc-700">Góc điện ảnh</Link>
          <span className="px-2 text-zinc-400">/</span>
          <span className="text-zinc-700">Chi tiết</span>
        </nav>

        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">{title}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {tags.slice(0, 6).map((t) => (
            <span key={t} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200">
              {t}
            </span>
          ))}
          {date && (
            <time className="ml-auto text-sm text-zinc-500">{formatDate(date)}</time>
          )}
        </div>

        {cover && (
          <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-zinc-200">
            <img
              src={cover}
              alt={title}
              className="block h-[380px] w-full object-cover"
              loading="lazy"
              onError={(e) => (e.currentTarget.src = "https://placehold.co/800x500?text=No+Image")}
            />
          </div>
        )}

        {excerpt && (
          <p className="mt-4 rounded-xl bg-zinc-50 p-4 text-[15px] leading-relaxed text-zinc-700 ring-1 ring-zinc-200">
            {excerpt}
          </p>
        )}

        {/* Nội dung (HTML) */}
        <article
          className="prose prose-zinc mt-6 max-w-none"
          dangerouslySetInnerHTML={{ __html: content || "<p>Đang cập nhật nội dung…</p>" }}
        />

        <div className="mt-10">
          <Link
            to="/cinemacorner"
            className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            ← Quay lại Góc điện ảnh
          </Link>
        </div>
      </section>

      {/* Gợi ý bài khác */}
      <Related currentSlug={slug} />
    </main>
  );
}

function Related({ currentSlug }) {
  const related = React.useMemo(
    () =>
      [...articles]
        .filter((a) => a.slug !== currentSlug)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3),
    [currentSlug]
  );

  if (!related.length) return null;

  return (
    <section className="mx-auto mt-12 w-full max-w-[980px] px-4">
      <h2 className="text-xl font-semibold text-zinc-900">Bài viết liên quan</h2>
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {related.map((a) => (
          <Link
            key={a.id}
            to={`/cinemacorner/${a.slug}`}
            className="group overflow-hidden rounded-xl ring-1 ring-zinc-200 transition hover:shadow-lg"
          >
            <div className="aspect-[16/10] w-full">
              <img
                src={a.cover}
                alt={a.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                loading="lazy"
              />
            </div>
            <div className="p-3">
              <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900 group-hover:text-zinc-700">
                {a.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs text-zinc-600">{a.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
