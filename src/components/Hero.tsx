/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { invitationData } from "@/lib/invitationData";

type Petal = {
  initialX: number;
  animateX: number;
  duration: number;
  delay: number;
  size: number;
};

export default function Hero() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Parallax scroll — mandala drifts up as user scrolls
  const { scrollY } = useScroll();
  const mandalaY = useTransform(scrollY, [0, 600], [0, 110]);
  const titleY = useTransform(scrollY, [0, 600], [0, -45]);

  // Mouse-driven 3D tilt on the title block
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-250, 250], [7, -7]), { stiffness: 400, damping: 40 });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-7, 7]), { stiffness: 400, damping: 40 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const petalCount = isMobile ? 10 : 16;
    setPetals([...Array(petalCount)].map(() => ({
      initialX: Math.random() * window.innerWidth,
      animateX: Math.random() * window.innerWidth,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 8,
      size: Math.random() * 6 + 5,
    })));
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[100svh] min-h-[650px] flex flex-col items-center justify-between overflow-hidden bg-[#FAF9F6] pt-20 md:pt-24"
    >
      {/* Parallax mandala background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{ y: shouldReduceMotion ? 0 : mandalaY }}
      >
        <Image src="/mandala_pattern.png" alt="Floral Frame" fill className="object-cover opacity-40 mix-blend-multiply" priority />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-[#FAF9F6] z-0" />

      {/* Pulsing ambient glow */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(197,164,109,0.18) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Top Spacer */}
      <div className="w-full flex-1 pointer-events-none" />

      {/* 3D Tilt Title Block */}
      <motion.div
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          y: shouldReduceMotion ? 0 : titleY,
          transformStyle: "preserve-3d",
          perspective: 1200,
        }}
        className="relative z-10 text-center px-4 flex flex-col items-center max-w-3xl shrink-0 py-8 lg:py-12"
      >
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-serif text-[#C5A46D] text-lg sm:text-xl md:text-2xl mb-8 xl:mb-12 font-medium"
        >
          {invitationData.invocation}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9, y: shouldReduceMotion ? 0 : 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-script text-7xl md:text-[8rem] lg:text-[11rem] text-[#2D3A3A] mb-2 leading-[0.82]"
          style={{ textShadow: "2px 6px 24px rgba(197,164,109,0.22), 0 0 60px rgba(197,164,109,0.08)" }}
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
          className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#2D3A3A] mt-5"
        >
          {invitationData.cityLabel}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <div className="w-full flex-1 flex flex-col justify-end items-center md:items-start md:absolute md:bottom-8 md:px-12 lg:px-20 pb-6 sm:pb-8 md:pb-0 z-30 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.55 }}
          className="flex flex-col items-center gap-2 cursor-pointer pointer-events-auto"
          onClick={() => {
            const el = document.getElementById('details');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <motion.span
            className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#C5A46D] drop-shadow-md bg-white/40 px-3 py-1 rounded-full backdrop-blur-sm"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll
          </motion.span>
          <motion.div
            className="w-[1.5px] md:w-[2px] bg-gradient-to-b from-[#C5A46D] to-transparent"
            animate={{ height: [28, 44, 28] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Petals */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden mix-blend-multiply">
          {petals.map((p, i) => (
            <motion.div
              key={i}
              initial={{ y: -80, x: p.initialX, opacity: 0 }}
              animate={{
                y: "115vh",
                x: p.animateX,
                opacity: [0, 0.52, 0.52, 0],
                rotate: [0, 270, 540],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear",
              }}
              style={{ willChange: "transform, opacity", position: "absolute" }}
            >
              <svg width={p.size} height={p.size * 1.5} viewBox="0 0 10 15" fill="none">
                <ellipse cx="5" cy="7.5" rx="3.5" ry="6.5" fill="#e8c4b0" fillOpacity="0.55" />
                <ellipse cx="5" cy="7.5" rx="1.5" ry="4" fill="#d4a090" fillOpacity="0.3" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
