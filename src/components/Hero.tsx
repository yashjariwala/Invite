"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { invitationData } from "@/lib/invitationData";

type Petal = {
  initialX: number;
  animateX: number;
  duration: number;
  delay: number;
};

export default function Hero() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const petalCount = isMobile ? 10 : 14;

    setPetals([...Array(petalCount)].map(() => ({
      initialX: Math.random() * window.innerWidth,
      animateX: Math.random() * window.innerWidth,
      duration: Math.random() * 8 + 9,
      delay: Math.random() * 7,
    })));
  }, []);

  return (
    <section className="relative h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#FAF9F6] pt-16">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <Image src="/mandala_pattern.png" alt="Floral Frame" fill className="object-cover opacity-40 mix-blend-multiply" priority />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-[#FAF9F6] z-0" />

      <div className="relative z-10 text-center px-4 flex flex-col items-center max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-serif text-[#2D3A3A] tracking-[0.2em] sm:tracking-[0.25em] text-xs sm:text-sm md:text-base uppercase mb-10 xl:mb-14 font-medium"
        >
          {invitationData.heroSubtitle}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.45, delay: 1.12 }}
          className="font-script text-7xl md:text-[8rem] lg:text-[11rem] text-[#2D3A3A] drop-shadow-sm mb-2 leading-[0.82]"
        >
          {invitationData.couple.bride}
          <span className="block text-4xl md:text-5xl lg:text-6xl text-[#C5A46D] my-4 font-sans tracking-[0.2em] font-light">&amp;</span>
          {invitationData.couple.groom}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.74 }}
          className="font-serif text-xl md:text-2xl lg:text-3xl text-[#2D3A3A] mt-8 italic tracking-wide"
        >
          {invitationData.weddingDateLabel}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.02 }}
          className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#2D3A3A] mt-5"
        >
          {invitationData.cityLabel}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.82, delay: 2.25 }}
          className="mt-10 flex flex-col sm:flex-row gap-3"
        >
          <a
            href="#details"
            className="border border-[#C5A46D] text-[#C5A46D] px-8 py-3 text-[10px] tracking-[0.24em] uppercase hover:bg-[#C5A46D] hover:text-white transition-colors"
          >
            View Events
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.55 }}
          className="absolute -bottom-20 sm:-bottom-24 animate-bounce flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#8a8a8a]">Scroll</span>
          <div className="w-[1px] h-12 sm:h-16 bg-gradient-to-b from-[#C5A46D] to-transparent" />
        </motion.div>
      </div>

      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden mix-blend-multiply">
          {petals.map((p, i) => (
            <motion.div
              key={i}
              initial={{ y: -50, x: p.initialX, opacity: 0 }}
              animate={{
                y: "110vh",
                x: p.animateX,
                opacity: [0, 0.52, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear",
              }}
              className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-[#e8d7d0]/60 rounded-full blur-[1px]"
              style={{ willChange: "transform, opacity" }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
