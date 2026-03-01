"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { invitationData } from "@/lib/invitationData";

export default function EventDetails() {
  return (
    <section id="details" className="py-24 px-4 bg-[#f4ebd9] text-[#2D3A3A] border-b border-[#e3dccf] relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-[#C5A46D] mb-6 block">When &amp; Where</span>
          <h2 className="font-script text-6xl md:text-[6rem] mb-8 text-[#2D3A3A] leading-none">The Celebrations</h2>


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

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {invitationData.events.map((event, idx) => (
            <EventCard
              key={event.title}
              title={event.title}
              date={event.dateLabel}
              time={event.timeLabel}
              venue={event.venue}
              address={event.address}
              mapUrl={event.mapUrl}
              delay={0.2 + idx * 0.2}
            />
          ))}
        </div>

        {/* Embedded Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 w-full h-[300px] md:h-[450px] p-3 md:p-4 shadow-xl border-t-4 border-[#C5A46D]"
        >
          <iframe
            src="https://maps.google.com/maps?q=Marriott%20Hotel%20Navi%20Mumbai&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Event Location Map"
            className="w-full h-full grayscale-[25%] contrast-[1.1]"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}

function EventCard({
  title,
  date,
  time,
  venue,
  address,
  mapUrl,
  delay,
}: {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapUrl: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className="relative bg-white p-6 md:p-10 shadow-lg shadow-[#C5A46D]/5 flex flex-col items-center text-center overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 max-w-md mx-auto w-full"
    >
      {/* Luxury stationery inner borders */}
      <div className="absolute inset-2 md:inset-3 border border-[#C5A46D]/20 pointer-events-none" />
      <div className="absolute inset-[12px] md:inset-[18px] border border-[#C5A46D]/10 pointer-events-none" />

      <h3 className="font-serif text-2xl md:text-3xl text-[#C5A46D] mb-3 mt-1 leading-tight">
        {title}
      </h3>

      {/* Elegant divider */}
      <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C5A46D]/60 to-transparent mb-6" />

      <div className="space-y-5 md:space-y-6 w-full flex-grow flex flex-col items-center">
        <div className="flex flex-col items-center gap-1">
          <p className="font-sans tracking-[0.25em] text-[9px] md:text-[10px] uppercase text-[#C5A46D] font-medium mb-0.5">Date</p>
          <p className="font-serif text-base md:text-lg text-[#2D3A3A] italic">{date}</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="font-sans tracking-[0.25em] text-[9px] md:text-[10px] uppercase text-[#C5A46D] font-medium mb-0.5">Time</p>
          <p className="font-serif text-base md:text-lg text-[#2D3A3A] italic">{time}</p>
        </div>

        <div className="w-6 h-[1px] bg-[#C5A46D]/30 mt-2 mb-1" />

        <div className="flex flex-col items-center gap-1 pb-2 md:pb-4">
          <p className="font-sans tracking-[0.25em] text-[9px] md:text-[10px] uppercase text-[#C5A46D] font-medium mb-0.5">Venue</p>
          <p className="font-serif text-xl md:text-2xl text-[#2D3A3A]">{venue}</p>
          <p className="font-sans text-[9px] md:text-[10px] text-[#8a8a8a] mt-1 tracking-widest uppercase">{address}</p>
        </div>
      </div>
    </motion.div>
  );
}
