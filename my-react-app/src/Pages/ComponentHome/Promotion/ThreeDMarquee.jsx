"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function ThreeDMarquee({ images = [], className = ""  }) {
  const chunkSize = Math.ceil((images.length || 0) / 4) || 1;
  const chunks = Array.from({ length: 4 }, (_, i) => {
    const start = i * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
   <section
     className={cn(
       // KHÓA CHIỀU CAO, cắt tràn
       "relative mx-auto overflow-hidden h-[520px] md:h-[800px] pt-8 md:pt-12",
       className
     )}
     style={{ perspective: "1000px" }}
   >
      {/* KHÔNG absolute – canh giữa bằng flex */}
      <div className="flex justify-center absolute inset-0 items-start" style={{top: 77}}>
        <div
          className="w-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100 mt-135"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="grid origin-top-left grid-cols-4 gap-8"
            // Áp dụng rotate TRƯỚC, rồi translateY SAU để đẩy toàn bộ mặt phẳng xuống
            style={{
              transform:
                "rotateX(55deg) rotateZ(-45deg) translateX(250px) ", // <= tăng/giảm 320px tùy mắt
              transformStyle: "preserve-3d",
            }}
          >
            {chunks.map((sub, col) => (
              <motion.div
                key={`col-${col}`}
                animate={{ y: col % 2 === 0 ? 100 : -100 }}
                transition={{ duration: col % 2 === 0 ? 10 : 15, repeat: Infinity, repeatType: "reverse" }}
                className="flex flex-col items-start gap-8"
              >
                {sub.map((src, idx) => (
                  <div className="relative" key={`img-${col}-${idx}`}>
                    <motion.img
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      src={src}
                      alt={`Image ${idx + 1}`}
                      className="aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl"
                      width={970}
                      height={700}
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
