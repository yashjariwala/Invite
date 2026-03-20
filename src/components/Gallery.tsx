"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const photos = [
  "/photo1.webp",
  "/photo2.webp",
  "/photo3.webp",
  "/photo4.webp",
  "/photo5.webp",
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 text-[#2D3A3A] overflow-hidden border-b border-[#e3dccf]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 px-4 flex flex-col items-center"
      >
        <span className="font-sans text-xs uppercase tracking-[0.4em] text-[#C5A46D] mb-6 block">Memories</span>
        <h2 className="font-script text-6xl md:text-[6rem] mb-8 text-[#2D3A3A] leading-none">Our Story</h2>

        <div className="flex items-center justify-center w-full my-6 opacity-75">
          <svg width="180" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 md:w-48">
            <path d="M0 12H65" stroke="#C5A46D" strokeWidth="0.75" />
            <path d="M115 12H180" stroke="#C5A46D" strokeWidth="0.75" />
            <path d="M75 12L90 4L105 12L90 20L75 12Z" stroke="#C5A46D" strokeWidth="1" />
            <path d="M82 12L90 7.5L98 12L90 16.5L82 12Z" fill="#C5A46D" />
            <circle cx="90" cy="12" r="1.5" fill="#FAF9F6" />
          </svg>
        </div>
      </motion.div>

      <div className="w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 pt-4 px-6 md:px-16 flex gap-4 md:gap-8" style={{ perspective: "1200px" }}>
        {photos.map((photo, idx) => (
          <PhotoCard key={idx} photo={photo} idx={idx} />
        ))}
        <div className="w-[4vw] flex-shrink-0" />
      </div>
    </section>
  );
}

function PhotoCard({ photo, idx }: { photo: string; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(x, { stiffness: 300, damping: 30 });
  const scale = useSpring(1, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    x.set((nx - 0.5) * 18);
    y.set(-(ny - 0.5) * 18);
    scale.set(1.03);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className="snap-center relative w-[75vw] sm:w-[45vw] md:w-[32vw] lg:w-[25vw] aspect-[3/4] flex-shrink-0 overflow-hidden shadow-xl shadow-black/20 cursor-pointer"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[12s] ease-linear hover:scale-110"
        style={{ backgroundImage: `url(${photo})` }}
      />
      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      {/* Hover shine */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
