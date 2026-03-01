"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { invitationData } from "@/lib/invitationData";

export default function StoryTimeline() {
  return (
    <section id="story" className="py-24 px-4 border-b border-[#e9e0cf]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-6 block">Our Journey</span>
          <h2 className="font-script text-6xl md:text-[6rem] mb-8 text-[#4C1215] leading-none">Love Story</h2>


          <div className="flex items-center justify-center w-full my-6 opacity-75">
            <svg width="180" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 md:w-48">
              <path d="M0 12H65" stroke="#D4AF37" strokeWidth="0.75" />
              <path d="M115 12H180" stroke="#D4AF37" strokeWidth="0.75" />
              <path d="M75 12L90 4L105 12L90 20L75 12Z" stroke="#D4AF37" strokeWidth="1" />
              <path d="M82 12L90 7.5L98 12L90 16.5L82 12Z" fill="#D4AF37" />
              <circle cx="90" cy="12" r="1.5" fill="#fdf5ec" />
            </svg>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {invitationData.storyMoments.map((moment, idx) => (
            <motion.article
              key={moment.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="relative bg-white pt-14 pb-8 px-5 md:px-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 rounded-t-full rounded-b-xl border-b-[3px] border-[#D4AF37] overflow-hidden group"
            >
              {/* Arched inner borders */}
              <div className="absolute inset-1.5 md:inset-2 border-2 border-[#D4AF37]/30 rounded-t-full rounded-b-lg pointer-events-none group-hover:border-[#D4AF37]/50 transition-colors duration-500 z-0" />
              <div className="absolute inset-[10px] md:inset-[14px] border border-[#D4AF37]/20 rounded-t-full rounded-b-md pointer-events-none z-0" />

              {/* Top Decorative Motif */}
              <div className="absolute top-4 md:top-5 left-1/2 -translate-x-1/2 text-[#D4AF37] opacity-80 z-10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="group-hover:rotate-90 transition-transform duration-[2s]">
                  <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
                </svg>
              </div>

              <div className="relative z-10 w-full flex flex-col items-center">
                <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-bold mb-2 bg-[#fdf5ec] inline-block px-3 py-1 rounded-sm border border-[#D4AF37]/20">{moment.year}</p>

                <div className="flex justify-center mb-3 mt-1">
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]/80" />
                </div>

                <h3 className="font-serif text-2xl text-[#4C1215] mb-3 font-semibold">{moment.title}</h3>
                <p className="font-sans text-xs leading-relaxed text-[#6e6e6e]">{moment.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
