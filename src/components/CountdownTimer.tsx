"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { invitationData } from "@/lib/invitationData";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsClient(true), 0);
    const targetDate = new Date(invitationData.weddingDateIso).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return <section className="py-24 px-4 h-[300px]" />;
  }

  return (
    <section className="py-24 px-4 text-center w-full border-y border-[#eee5d5] relative overflow-hidden">
      {/* Animated ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(197,164,109,0.07), transparent 65%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto flex flex-col items-center relative z-10"
      >
        <span className="font-sans text-xs uppercase tracking-[0.4em] text-[#C5A46D] mb-6 block">The Big Day</span>
        <h2 className="font-script text-6xl md:text-[6rem] text-[#2D3A3A] mb-8 leading-none">Countdown</h2>

        <div className="flex items-center justify-center w-full my-6 opacity-75">
          <svg width="180" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 md:w-48">
            <path d="M0 12H65" stroke="#C5A46D" strokeWidth="0.75" />
            <path d="M115 12H180" stroke="#C5A46D" strokeWidth="0.75" />
            <path d="M75 12L90 4L105 12L90 20L75 12Z" stroke="#C5A46D" strokeWidth="1" />
            <path d="M82 12L90 7.5L98 12L90 16.5L82 12Z" fill="#C5A46D" />
            <circle cx="90" cy="12" r="1.5" fill="#FAF9F6" />
          </svg>
        </div>

        <div className="flex justify-center gap-4 sm:gap-8 md:gap-14">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </motion.div>
    </section>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const display = value.toString().padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-3" style={{ perspective: "500px" }}>
      {/* Glassmorphism card */}
      <div
        className="relative bg-white/70 backdrop-blur-md border border-[#C5A46D]/25 shadow-lg shadow-[#C5A46D]/10 px-3 sm:px-5 py-3 sm:py-4 min-w-[3.2rem] sm:min-w-[4.8rem] flex justify-center overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Top shine */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A46D]/60 to-transparent" />
        {/* Inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A46D]/20 to-transparent" />

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl text-[#2D3A3A] font-light tabular-nums tracking-widest block"
            style={{ transformOrigin: "center", transformStyle: "preserve-3d" }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8a8a8a]">{label}</span>
    </div>
  );
}
