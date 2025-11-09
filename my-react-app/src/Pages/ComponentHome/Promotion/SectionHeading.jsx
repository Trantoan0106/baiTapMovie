// components/SectionHeading.jsx
import React from "react";

export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="px-5 md:px-8 mb-6 md:mb-8">
      <h2
        className="
          relative inline-block
          text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight
          text-transparent bg-clip-text
          bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500
        "
      >
        {title}
        {/* gạch chân gradient */}
        <span
          className="
            pointer-events-none
            absolute left-0 -bottom-2 h-2 w-44 sm:w-56
            rounded-full
            bg-gradient-to-r from-sky-400 via-indigo-500 to-fuchsia-500
          "
        />
      </h2>

      {subtitle && (
        <p className="mt-3 text-slate-500 max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
