"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";
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
          <img src="https://yashjariwala.github.io/Invite/gold_divider.png"
            alt="divider"
            width={192}
            height={18}
            className="w-32 md:w-48 opacity-80 mix-blend-multiply contrast-125 brightness-110"
          />
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
          className="mt-16 w-full h-[300px] md:h-[450px] bg-[#FAF9F6] p-3 md:p-4 shadow-xl border-t-4 border-[#C5A46D]"
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className="bg-[#FAF9F6] p-8 md:p-12 shadow-md flex flex-col items-center text-center border-t-4 border-[#C5A46D]"
    >
      <h3 className="font-serif text-3xl md:text-4xl text-[#C5A46D] mb-10 italic">{title}</h3>

      <div className="space-y-6 w-full flex-grow">
        <div className="flex flex-col items-center gap-2">
          <Calendar className="w-5 h-5 text-[#C5A46D] mb-1" />
          <p className="font-sans tracking-widest text-xs uppercase text-[#2D3A3A] font-light">{date}</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Clock className="w-5 h-5 text-[#C5A46D] mb-1" />
          <p className="font-sans tracking-widest text-xs uppercase text-[#2D3A3A] font-light">{time}</p>
        </div>

        <div className="w-12 h-[1px] bg-[#e3dccf] mx-auto my-8" />

        <div className="flex flex-col items-center gap-2 pb-8">
          <MapPin className="w-5 h-5 text-[#C5A46D] mb-1" />
          <p className="font-serif text-2xl text-[#2D3A3A]">{venue}</p>
          <p className="font-sans text-xs text-[#8a8a8a] mt-2 tracking-wide uppercase">{address}</p>
        </div>
      </div>

      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-block border border-[#C5A46D] text-[#C5A46D] px-8 py-4 uppercase text-[10px] sm:text-xs tracking-[0.2em] hover:bg-[#C5A46D] hover:text-white transition-colors duration-500 w-full md:w-auto text-center"
      >
        View on Map
      </a>
    </motion.div>
  );
}
