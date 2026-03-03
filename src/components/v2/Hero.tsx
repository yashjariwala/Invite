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
  color: string;
};

export default function Hero() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const petalCount = isMobile ? 15 : 25; // Optimized count since SVGs have a bit more draw overhead

    const petalColors = ["text-[#B31B1B]", "text-[#FF8C00]", "text-[#FFD700]", "text-[#8B0000]"];

    setPetals([...Array(petalCount)].map(() => ({
      initialX: Math.random() * window.innerWidth,
      animateX: Math.random() * window.innerWidth,
      duration: Math.random() * 8 + 9,
      delay: Math.random() * 7,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    })));
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[650px] flex flex-col items-center justify-between overflow-hidden bg-[#fdf5ec] pt-20 md:pt-24">
      {/* Background Layer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 bg-[#f4ebd9]">
        <Image src="/texture2.jpeg" alt="Silk Texture" fill className="object-cover opacity-35 mix-blend-overlay" priority />
        <Image src="/mandala_pattern.png" alt="Floral Frame" fill className="object-cover opacity-40 mix-blend-multiply" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#f4ebd9]/40 via-transparent to-[#fdf5ec] z-0" />

      {/* Top Spacer to push center content perfectly to the middle mathematically */}
      <div className="w-full flex-1 pointer-events-none" />

      {/* Centered Text Block */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center max-w-3xl shrink-0 py-8 lg:py-12">
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-serif text-[#D4AF37] text-lg sm:text-xl md:text-2xl mb-8 xl:mb-12 font-medium"
        >
          {invitationData.invocation}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.45, delay: 1.12 }}
          className="font-script text-7xl md:text-[8rem] lg:text-[11rem] text-[#4C1215] drop-shadow-sm mb-2 leading-[0.82]"
        >
          {invitationData.couple.bride}
          <span className="block text-4xl md:text-5xl lg:text-6xl text-[#D4AF37] my-4 font-sans tracking-[0.2em] font-light">&amp;</span>
          {invitationData.couple.groom}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.74 }}
          className="font-serif text-xl md:text-2xl lg:text-3xl text-[#4C1215] mt-8 italic tracking-wide"
        >
          {invitationData.couple.date}
        </motion.p>

        <motion.p
          className="text-[10px] sm:text-xs md:text-sm font-sans tracking-[0.2em] sm:tracking-[0.25em] font-light text-[#8a8a8a] uppercase mt-6 mb-4 drop-shadow-sm px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.9 }}
        >
          {invitationData.heroSubtitle}
        </motion.p>



        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.02 }}
          className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#4C1215] mt-5"
        >
          {invitationData.cityLabel}
        </motion.p>
      </div>

      {/* Bottom Scroll Indicator Container */}
      <div className="w-full flex-1 flex flex-col justify-end items-center md:items-start md:absolute md:bottom-8 md:px-12 lg:px-20 pb-6 sm:pb-8 md:pb-0 z-30 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.55 }}
          className="animate-bounce flex flex-col items-center gap-2 cursor-pointer pointer-events-auto"
          onClick={() => {
            const el = document.getElementById('details');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#D4AF37] drop-shadow-md bg-white/40 px-3 py-1 rounded-full backdrop-blur-sm">Scroll</span>
          <div className="w-[1.5px] md:w-[2px] h-10 sm:h-12 md:h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </motion.div>
      </div>

      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden mix-blend-multiply">
          {petals.map((p, i) => (
            <motion.svg
              key={i}
              viewBox="0 0 24 24"
              fill="currentColor"
              initial={{ y: -50, x: p.initialX, opacity: 0 }}
              animate={{
                y: "110vh",
                x: p.animateX,
                opacity: [0, 0.8, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear",
              }}
              className={`absolute w-3 h-3 sm:w-4 sm:h-4 opacity-70 transform-gpu ${p.color}`}
              style={{ willChange: "transform, opacity" }}
            >
              <path d="M12,2 C10,2 8.5,3.5 8.5,5.5 C8.5,6.5 9,7.5 9.8,8.2 C8,8.5 6.5,10 6.5,12 C6.5,14 8,15.5 9.8,15.8 C9,16.5 8.5,17.5 8.5,18.5 C8.5,20.5 10,22 12,22 C14,22 15.5,20.5 15.5,18.5 C15.5,17.5 15,16.5 14.2,15.8 C16,15.5 17.5,14 17.5,12 C17.5,10 16,8.5 14.2,8.2 C15,7.5 15.5,6.5 15.5,5.5 C15.5,3.5 14,2 12,2 Z" />
            </motion.svg>
          ))}
        </div>
      )}
    </section>
  );
}
