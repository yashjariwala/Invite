"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Image from "next/image";
import { invitationData } from "@/lib/invitationData";

export default function GuideSection() {
  const { travel, accommodation, gifts, faqs } = invitationData;

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
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-6 block">Details</span>
          <h2 className="font-script text-6xl md:text-[6rem] mb-8 text-[#4C1215] leading-none">Guest Guide</h2>


          <div className="flex items-center justify-center w-full my-6 opacity-75">
            <svg width="180" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 md:w-48">
              <path d="M0 12H65" stroke="#D4AF37" strokeWidth="0.75" />
              <path d="M115 12H180" stroke="#D4AF37" strokeWidth="0.75" />
              <path d="M75 12L90 4L105 12L90 20L75 12Z" stroke="#D4AF37" strokeWidth="1" />
              <path d="M82 12L90 7.5L98 12L90 16.5L82 12Z" fill="#D4AF37" />
              <circle cx="90" cy="12" r="1.5" fill="#fdf5ec" />
            </svg>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <InfoCard title="Travel">
            <div className="mb-3 flex flex-col items-center">
              <span className="font-medium block mb-2 text-[#4C1215]">Nearest Airports:</span>
              <ul className="space-y-1 text-center flex flex-col items-center">
                {travel.airports.map((airport) => (
                  <li key={airport.name} className="flex justify-center w-full">
                    <span>{airport.name} {airport.note && <span className="italic text-[#D4AF37]">({airport.note})</span>}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4"><span className="font-medium text-[#4C1215] block mb-1">Nearest Station:</span> {travel.nearestStation}</p>
          </InfoCard>

          <InfoCard title="Accommodation">
            <p className="font-serif text-[#D4AF37] text-xl mb-4 italic">{accommodation.hotel}</p>
            <div className="space-y-3 flex flex-col items-center">
              <p><span className="font-medium text-[#4C1215] block mb-1">Check-in:</span> {accommodation.checkIn}</p>
              <p><span className="font-medium text-[#4C1215] block mb-1">Check-out:</span> {accommodation.checkOut}</p>
            </div>
          </InfoCard>

          <InfoCard title="Gifts">
            <p>{gifts}</p>
          </InfoCard>
        </div>

      </div>
    </section>
  );
}

function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.98, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="relative bg-white pt-14 pb-8 px-6 md:pt-16 md:pb-10 md:px-8 shadow-lg shadow-[#4C1215]/5 flex flex-col items-center text-center overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 w-full h-full rounded-t-full rounded-b-xl border-b-4 border-[#D4AF37]"
    >
      {/* Arched inner borders */}
      <div className="absolute inset-2 md:inset-3 border-2 border-[#D4AF37]/30 rounded-t-full rounded-b-lg pointer-events-none z-0" />
      <div className="absolute inset-[14px] md:inset-[20px] border border-[#D4AF37]/20 rounded-t-full rounded-b-md pointer-events-none z-0" />

      {/* Top Decorative Motif */}
      <div className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 text-[#D4AF37] opacity-80 z-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
        </svg>
      </div>

      <h3 className="font-serif text-2xl md:text-3xl text-[#D4AF37] mb-3 mt-4 leading-tight font-semibold relative z-10">{title}</h3>

      {/* Ornate Indian Divider */}
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <div className="w-8 md:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
        <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
        <div className="w-8 md:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
      </div>

      <div className="flex-grow flex flex-col items-center space-y-3 font-sans text-xs md:text-sm leading-relaxed text-[#5c5c5c] relative z-10 w-full">{children}</div>
    </motion.article>
  );
}
