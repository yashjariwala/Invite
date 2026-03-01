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
            <div className="mb-3">
              <span className="font-medium block mb-1 text-[#2D3A3A]">Nearest Airports:</span>
              <ul className="list-disc list-inside space-y-1 text-left inline-block">
                {travel.airports.map((airport) => (
                  <li key={airport.name}>
                    {airport.name} {airport.note && <span className="italic text-[#C5A46D]">({airport.note})</span>}
                  </li>
                ))}
              </ul>
            </div>
            <p><span className="font-medium text-[#2D3A3A]">Nearest Station:</span> {travel.nearestStation}</p>
          </InfoCard>

          <InfoCard title="Accommodation">
            <p className="font-serif text-[#C5A46D] text-xl mb-3">{accommodation.hotel}</p>
            <div className="space-y-2 text-left inline-block">
              <p><span className="font-medium text-[#2D3A3A]">Check-in:</span> {accommodation.checkIn}</p>
              <p><span className="font-medium text-[#2D3A3A]">Check-out:</span> {accommodation.checkOut}</p>
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="bg-[#FAF9F6] p-8 text-center flex flex-col items-center border border-[#e6dece] shadow-[0_20px_50px_-40px_rgba(0,0,0,0.45)]"
    >
      <h3 className="font-serif text-3xl italic text-[#C5A46D] mb-5">{title}</h3>
      <div className="space-y-3 font-sans text-sm leading-relaxed text-[#5c5c5c]">{children}</div>
    </motion.article>
  );
}
