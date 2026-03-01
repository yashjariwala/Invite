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
          <InfoCard title="Travel">
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

          <InfoCard title="Accommodation">
            <p className="font-serif text-[#C5A46D] text-xl mb-4">{accommodation.hotel}</p>
            <div className="space-y-3 flex flex-col items-center">
              <p><span className="font-medium text-[#2D3A3A] block mb-1">Check-in:</span> {accommodation.checkIn}</p>
              <p><span className="font-medium text-[#2D3A3A] block mb-1">Check-out:</span> {accommodation.checkOut}</p>
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
      className="relative bg-white p-6 md:p-8 shadow-lg shadow-[#C5A46D]/5 flex flex-col items-center text-center overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 w-full h-full"
    >
      {/* Luxury stationery inner borders */}
      <div className="absolute inset-2 md:inset-3 border border-[#C5A46D]/20 pointer-events-none" />
      <div className="absolute inset-[12px] md:inset-[18px] border border-[#C5A46D]/10 pointer-events-none" />

      <h3 className="font-serif text-2xl md:text-3xl text-[#C5A46D] mb-3 mt-1 leading-tight">{title}</h3>
      {/* Elegant divider */}
      <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C5A46D]/60 to-transparent mb-6" />

      <div className="space-y-3 font-sans text-xs md:text-sm leading-relaxed text-[#5c5c5c] relative z-10 w-full">{children}</div>
    </motion.article>
  );
}
