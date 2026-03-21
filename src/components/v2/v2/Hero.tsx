"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { invitationData } from "@/lib/invitationData";
import { FLOWER_PATHS } from "@/lib/FlowerShapes";

type Petal = {
  initialX: number;
  animateX: number;
  duration: number;
  delay: number;
  color: string;
  pathIndex: number;
};

export default function Hero() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Parallax scroll
  const { scrollY } = useScroll();
  const mandalaY = useTransform(scrollY, [0, 600], [0, 110]);
  const titleY = useTransform(scrollY, [0, 600], [0, -45]);

  // Mouse-driven 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-250, 250], [7, -7]), { stiffness: 400, damping: 40 });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-7, 7]), { stiffness: 400, damping: 40 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const petalCount = isMobile ? 15 : 25;
    const colors = ["text-[#B31B1B]", "text-[#FF8C00]", "text-[#FFD700]", "text-[#8B0000]"];

    setTimeout(() => {
      setPetals([...Array(petalCount)].map(() => ({
        initialX: Math.random() * window.innerWidth,
        animateX: Math.random() * window.innerWidth,
        duration: Math.random() * 8 + 9,
        delay: Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        pathIndex: Math.floor(Math.random() * FLOWER_PATHS.length),
      })));
    }, 0);
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
      className="relative h-[100svh] min-h-[650px] flex flex-col items-center justify-between overflow-hidden bg-[#fdf5ec] pt-20 md:pt-24"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 bg-[#f4ebd9]"
        style={{ y: shouldReduceMotion ? 0 : mandalaY }}
      >
        <Image src="/texture2.jpeg" alt="Silk Texture" fill className="object-cover opacity-35 mix-blend-overlay" priority />
        <Image src="/mandala_pattern.png" alt="Floral Frame" fill className="object-cover opacity-40 mix-blend-multiply" priority />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#f4ebd9]/40 via-transparent to-[#fdf5ec] z-0" />

      {/* Pulsing ambient glow */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

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
          className="font-serif text-[#D4AF37] text-lg sm:text-xl md:text-2xl mb-8 xl:mb-12 font-medium"
        >
          {invitationData.invocation}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9, y: shouldReduceMotion ? 0 : 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-script text-7xl md:text-[8rem] lg:text-[11rem] text-[#4C1215] mb-2 leading-[0.82]"
          style={{ textShadow: "2px 6px 24px rgba(76,18,21,0.18), 0 0 60px rgba(212,175,55,0.12)" }}
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
            className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#D4AF37] drop-shadow-md bg-white/40 px-3 py-1 rounded-full backdrop-blur-sm"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll
          </motion.span>
          <motion.div
            className="w-[1.5px] md:w-[2px] bg-gradient-to-b from-[#D4AF37] to-transparent"
            animate={{ height: [28, 44, 28] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Petals */}
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
              className={`absolute w-3 h-3 sm:w-4 sm:h-4 opacity-80 transform-gpu drop-shadow-sm ${p.color}`}
              style={{ willChange: "transform, opacity" }}
            >
              <path d={FLOWER_PATHS[p.pathIndex]} />
            </motion.svg>
          ))}
        </div>
      )}
    </section>
  );
}
