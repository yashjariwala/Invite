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
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-[#C5A46D] mb-6 block">Our Journey</span>
          <h2 className="font-script text-6xl md:text-[6rem] mb-8 text-[#2D3A3A] leading-none">Love Story</h2>


          <div className="flex items-center justify-center w-full my-6 opacity-75">
            <svg width="180" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 md:w-48">
              <path d="M0 12H65" stroke="#C5A46D" strokeWidth="0.75" />
              <path d="M115 12H180" stroke="#C5A46D" strokeWidth="0.75" />
              <path d="M75 12L90 4L105 12L90 20L75 12Z" stroke="#C5A46D" strokeWidth="1" />
              <path d="M82 12L90 7.5L98 12L90 16.5L82 12Z" fill="#C5A46D" />
              <circle cx="90" cy="12" r="1.5" fill="#FAF9F6" />
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
              className="relative bg-[#f7f3eb] border border-[#e6dece] p-8 text-center shadow-[0_25px_60px_-40px_rgba(0,0,0,0.5)]"
            >
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#b79a67] mb-4">{moment.year}</p>
              <h3 className="font-serif text-3xl text-[#2D3A3A] mb-4 italic">{moment.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-[#6e6e6e]">{moment.text}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
