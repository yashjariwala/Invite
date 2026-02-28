"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Image from "next/image";
import { invitationData } from "@/lib/invitationData";

export default function GuideSection() {
  const { travel, dressCode, gifts, faqs } = invitationData;

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
          <Image
            src="/gold_divider.png"
            alt="divider"
            width={192}
            height={18}
            className="w-32 md:w-48 opacity-80 mix-blend-multiply"
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <InfoCard title="Travel & Stay">
            <p><span className="font-medium">Nearest Airport:</span> {travel.nearestAirport}</p>
            <p><span className="font-medium">Nearest Station:</span> {travel.nearestStation}</p>
            <p><span className="font-medium">Suggested Stay:</span> {travel.suggestedStay}</p>
          </InfoCard>

          <InfoCard title="Dress Code">
            <p><span className="font-medium">Theme:</span> {dressCode.title}</p>
            <p>{dressCode.notes}</p>
          </InfoCard>

          <InfoCard title="Gifts">
            <p>{gifts}</p>
          </InfoCard>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {faqs.map((faq, idx) => (
            <motion.article
              key={faq.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="bg-[#faf9f6] p-6 border border-[#e6dece]"
            >
              <h3 className="font-serif text-2xl text-[#2D3A3A] mb-3">{faq.q}</h3>
              <p className="font-sans text-sm text-[#6e6e6e] leading-relaxed">{faq.a}</p>
            </motion.article>
          ))}
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
      className="bg-[#faf9f6] p-8 border border-[#e6dece] shadow-[0_20px_50px_-40px_rgba(0,0,0,0.45)]"
    >
      <h3 className="font-serif text-3xl italic text-[#C5A46D] mb-5">{title}</h3>
      <div className="space-y-3 font-sans text-sm leading-relaxed text-[#5c5c5c]">{children}</div>
    </motion.article>
  );
}
