"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { invitationData } from "@/lib/invitationData";

export default function GuideSection() {
  const { travel, accommodation, gifts } = invitationData;

  return (
    <section id="guide" className="py-24 px-4 bg-[#f4ebd9] border-b border-[#e3dccf]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 flex flex-col items-center"
        >
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-[#C5A46D] mb-6 block">Details</span>
          <h2 className="font-script text-6xl md:text-[6rem] mb-8 text-[#2D3A3A] leading-none">Guest Guide</h2>

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

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <InfoCard title="Travel" delay={0}>
            <div className="mb-3 flex flex-col items-center">
              <span className="font-medium block mb-2 text-[#2D3A3A]">Nearest Airports:</span>
              <ul className="space-y-1 text-center flex flex-col items-center">
                {travel.airports.map((airport) => (
                  <li key={airport.name} className="flex justify-center w-full">
                    <span>{airport.name} {airport.note && <span className="italic text-[#C5A46D]">({airport.note})</span>}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4"><span className="font-medium text-[#2D3A3A] block mb-1">Nearest Station:</span> {travel.nearestStation}</p>
          </InfoCard>

          <InfoCard title="Accommodation" delay={0.1}>
            <p className="font-serif text-[#C5A46D] text-xl mb-4">{accommodation.hotel}</p>
            <div className="space-y-3 flex flex-col items-center">
              <p><span className="font-medium text-[#2D3A3A] block mb-1">Check-in:</span> {accommodation.checkIn}</p>
              <p><span className="font-medium text-[#2D3A3A] block mb-1">Check-out:</span> {accommodation.checkOut}</p>
            </div>
          </InfoCard>

          <InfoCard title="Gifts" delay={0.2}>
            <p>{gifts}</p>
          </InfoCard>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ title, children, delay }: { title: string; children: ReactNode; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const rotateX = useSpring(y, { stiffness: 350, damping: 35 });
  const rotateY = useSpring(x, { stiffness: 350, damping: 35 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    x.set((nx - 0.5) * 12);
    y.set(-(ny - 0.5) * 12);
    glowX.set(nx * 100);
    glowY.set(ny * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.97, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative bg-white p-6 md:p-8 shadow-lg shadow-[#C5A46D]/5 flex flex-col items-center text-center overflow-hidden w-full h-full"
      >
        {/* Cursor glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(197,164,109,0.14), transparent 55%)` }}
        />
        {/* Luxury inner borders */}
        <div className="absolute inset-2 md:inset-3 border border-[#C5A46D]/20 pointer-events-none" />
        <div className="absolute inset-[12px] md:inset-[18px] border border-[#C5A46D]/10 pointer-events-none" />

        <div style={{ transform: "translateZ(14px)" }} className="flex flex-col items-center w-full">
          <h3 className="font-serif text-2xl md:text-3xl text-[#C5A46D] mb-3 mt-1 leading-tight">{title}</h3>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C5A46D]/60 to-transparent mb-6" />
          <div className="space-y-3 font-sans text-xs md:text-sm leading-relaxed text-[#5c5c5c] relative z-10 w-full">{children}</div>
        </div>
      </motion.div>
    </div>
  );
}
