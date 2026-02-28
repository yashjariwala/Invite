"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const photos = [
  "https://images.unsplash.com/photo-1583939000340-6b07049f49ac?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621801306184-ce451df6abdb?q=80&w=900&auto=format&fit=crop",
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-[#FAF9F6] text-[#2D3A3A] overflow-hidden border-b border-[#e3dccf]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 px-4 flex flex-col items-center"
      >
        <span className="font-sans text-xs uppercase tracking-[0.4em] text-[#C5A46D] mb-6 block">Memories</span>
        <h2 className="font-script text-6xl md:text-[6rem] mb-8 text-[#2D3A3A] leading-none">Our Story</h2>
        <Image
          src="/gold_divider.png"
          alt="divider"
          width={192}
          height={18}
          className="w-32 md:w-48 opacity-80 mix-blend-multiply contrast-125 brightness-110"
        />
      </motion.div>

      <div className="w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 pt-4 px-8 md:px-16 flex gap-6 md:gap-10">
        {photos.map((photo, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
            className="snap-center relative w-[80vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw] aspect-[3/4] flex-shrink-0 rounded-sm overflow-hidden shadow-xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
              style={{ backgroundImage: `url(${photo})` }}
            />
          </motion.div>
        ))}

        <div className="w-[4vw] flex-shrink-0" />
      </div>
    </section>
  );
}
