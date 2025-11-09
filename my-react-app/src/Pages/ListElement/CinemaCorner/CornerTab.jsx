"use client";
import React from "react";
import { cn } from "@/lib/utils";
import ArticleGrid from "./ArticleGrid";

export default function CornerTab({ className = "", articles = [] }) {

  const normalized = React.useMemo(
    () => (articles || []).map((a) => ({
      id: a.id, title: a.title, cover: a.cover, tags: a.tags || [],
      date: a.date, slug: a.slug, excerpt: a.excerpt,
    })),
    [articles]
  );

  const [tab, setTab] = React.useState("all");

  const labels = {
    all: `Tất cả (${normalized.length})`,
    upcoming: `Sắp chiếu (${normalized.filter(a => (a.tags||[]).includes("upcoming")).length})`,
    newest: "Mới nhất",
  };


  const data = React.useMemo(() => {
    if (tab === "upcoming") return normalized.filter(a => (a.tags||[]).includes("upcoming"));
    if (tab === "newest") return [...normalized].sort((a,b)=>new Date(b.date)-new Date(a.date));
    return normalized;
  }, [tab, normalized]);

  return (
    <section className={cn("mx-auto w-full max-w-[1180px] px-4", className)}>
      <div className="mb-6 mt-2">
        <div className="inline-flex items-center gap-1 rounded-2xl bg-white/70 p-1 shadow-lg ring-1 ring-zinc-200 backdrop-blur">
          {["all","upcoming","newest"].map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={cn(
                "relative rounded-xl px-4 py-2 text-sm font-semibold transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
                tab === k ? "text-white" : "text-zinc-700 hover:text-zinc-900"
              )}
            >
              {tab === k && <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600" />}
              {labels[k]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid có pile và kéo được */}
      <ArticleGrid items={data} />
    </section>
  );
}
