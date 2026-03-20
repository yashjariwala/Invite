"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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
  title, date, time, venue, address, delay,
}: {
  title: string; date: string; time: string; venue: string;
  address: string; mapUrl: string; delay: number;
}) {
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
    x.set((nx - 0.5) * 14);
    y.set(-(ny - 0.5) * 14);
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
    <div style={{ perspective: "1000px" }} className="max-w-md mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay }}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative bg-white p-6 md:p-10 shadow-xl shadow-[#C5A46D]/10 flex flex-col items-center text-center overflow-hidden"
      >
        {/* Cursor-following glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(197,164,109,0.18) 0%, transparent 55%)`,
          }}
        />

        {/* Luxury stationery inner borders */}
        <div className="absolute inset-2 md:inset-3 border border-[#C5A46D]/20 pointer-events-none" />
        <div className="absolute inset-[12px] md:inset-[18px] border border-[#C5A46D]/10 pointer-events-none" />

        {/* Content pops out in Z */}
        <div style={{ transform: "translateZ(18px)" }} className="flex flex-col items-center w-full">
          <h3 className="font-serif text-2xl md:text-3xl text-[#C5A46D] mb-3 mt-1 leading-tight">
            {title}
          </h3>
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
        </div>
      </motion.div>
    </div>
  );
}
