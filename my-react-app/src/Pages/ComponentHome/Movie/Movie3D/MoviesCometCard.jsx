// MoviesCometCard.jsx
"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MoviesCometCard({
  rotateDepth = 17.5,
  translateDepth = 20,
  className,
  children,
}) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const mx = useSpring(x), my = useSpring(y);

  const rotateX   = useTransform(my, [-0.5, 0.5], [`-${rotateDepth}deg`, `${rotateDepth}deg`]);
  const rotateY   = useTransform(mx, [-0.5, 0.5], [`${rotateDepth}deg`, `-${rotateDepth}deg`]);
  const translateX= useTransform(mx, [-0.5, 0.5], [`-${translateDepth}px`, `${translateDepth}px`]);
  const translateY= useTransform(my, [-0.5, 0.5], [`${translateDepth}px`, `-${translateDepth}px`]);

  const gx = useTransform(mx, [-0.5, 0.5], [0, 100]);
  const gy = useTransform(my, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,.9) 10%, rgba(255,255,255,.75) 20%, rgba(255,255,255,0) 80%)`;

  const onMove  = (e) => { if(!ref.current) return; const r = ref.current.getBoundingClientRect(); x.set((e.clientX-r.left)/r.width-0.5); y.set((e.clientY-r.top)/r.height-0.5); };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <div className={cn("perspective-distant transform-3d", className)}>
      {/* THÊM h-full w-full Ở ĐÂY */}
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, translateX, translateY }}
        initial={{ scale: 1, z: 0 }}
        whileHover={{ scale: 1.05, z: 50, transition: { duration: 0.2 } }}
        className="relative h-full w-full rounded-2xl"
      >
        {children}
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 rounded-[16px] mix-blend-overlay"
          style={{ background: glare, opacity: 0.6 }}
        />
      </motion.div>
    </div>
  );
}
