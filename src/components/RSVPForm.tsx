"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import { invitationData } from "@/lib/invitationData";

type RSVPStatus = "idle" | "submitting" | "success";

type RSVPState = {
  name: string;
  attendance: "accept" | "decline";
  guests: string;
  dietary: string;
  message: string;
};

const initialForm: RSVPState = {
  name: "",
  attendance: "accept",
  guests: "1",
  dietary: "",
  message: "",
};

export default function RSVPForm() {
  const [status, setStatus] = useState<RSVPStatus>("idle");
  const [form, setForm] = useState<RSVPState>(initialForm);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    setTimeout(() => {
      const payload = {
        ...form,
        submittedAt: new Date().toISOString(),
      };

      try {
        const existing = JSON.parse(localStorage.getItem("invite-rsvp") || "[]") as RSVPState[];
        localStorage.setItem("invite-rsvp", JSON.stringify([...existing, payload]));
      } catch {
        // No-op fallback if storage is blocked.
      }

      setStatus("success");
    }, 1200);
  };

  return (
    <section className="py-24 px-4 bg-[#f4ebd9] text-[#2D3A3A] relative overflow-hidden" id="rsvp">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-[#C5A46D] mb-6 block">Be our guest</span>
          <h2 className="font-script text-6xl md:text-[6rem] mb-8 text-[#2D3A3A] leading-none">RSVP</h2>
          <Image
            src="/gold_divider.png"
            alt="divider"
            width={192}
            height={18}
            className="w-32 md:w-48 opacity-80 mix-blend-multiply contrast-125 brightness-110 mb-6"
          />
          <p className="font-serif text-lg italic text-[#2D3A3A]/80">Please respond by {invitationData.rsvpDeadlineLabel}</p>
        </motion.div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#FAF9F6] p-12 text-center rounded-sm shadow-xl border-t-4 border-[#C5A46D]"
          >
            <h3 className="font-script text-5xl text-[#C5A46D] mb-4">Thank You!</h3>
            <p className="font-sans text-[#2D3A3A] tracking-wider uppercase text-sm">Your response has been recorded.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-[#FAF9F6] p-8 md:p-12 shadow-xl flex flex-col gap-8 rounded-sm"
          >
            <div className="flex flex-col">
              <label htmlFor="name" className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a] mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full bg-transparent border-b border-[#e3dccf] py-2 font-serif text-xl focus:outline-none focus:border-[#C5A46D] transition-colors rounded-none"
                placeholder="Mr. & Mrs. Smith"
              />
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a]">Attendance</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="attendance"
                      value="accept"
                      checked={form.attendance === "accept"}
                      onChange={() => setForm((prev) => ({ ...prev, attendance: "accept" }))}
                      required
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 rounded-full border border-[#C5A46D] peer-checked:bg-[#C5A46D] transition-colors" />
                    <div className="absolute w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100" />
                  </div>
                  <span className="font-serif text-lg group-hover:text-[#C5A46D] transition-colors">Joyfully Accept</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="attendance"
                      value="decline"
                      checked={form.attendance === "decline"}
                      onChange={() => setForm((prev) => ({ ...prev, attendance: "decline" }))}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 rounded-full border border-[#C5A46D] peer-checked:bg-[#C5A46D] transition-colors" />
                    <div className="absolute w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100" />
                  </div>
                  <span className="font-serif text-lg group-hover:text-[#C5A46D] transition-colors">Regretfully Decline</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col flex-1">
                <label htmlFor="guests" className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a] mb-2">
                  No. of Guests
                </label>
                <select
                  id="guests"
                  value={form.guests}
                  onChange={(e) => setForm((prev) => ({ ...prev, guests: e.target.value }))}
                  className="w-full bg-transparent border-b border-[#e3dccf] py-2 font-serif text-xl focus:outline-none focus:border-[#C5A46D] transition-colors rounded-none appearance-none cursor-pointer"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>

              <div className="flex flex-col flex-1">
                <label htmlFor="dietary" className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a] mb-2">
                  Dietary Requirements
                </label>
                <input
                  type="text"
                  id="dietary"
                  value={form.dietary}
                  onChange={(e) => setForm((prev) => ({ ...prev, dietary: e.target.value }))}
                  className="w-full bg-transparent border-b border-[#e3dccf] py-2 font-serif text-xl focus:outline-none focus:border-[#C5A46D] transition-colors rounded-none"
                  placeholder="e.g. Vegetarian, None"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a] mb-2">
                Leave a Message
              </label>
              <textarea
                id="message"
                rows={3}
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                className="w-full bg-transparent border-b border-[#e3dccf] py-2 font-serif text-xl focus:outline-none focus:border-[#C5A46D] transition-colors rounded-none resize-none"
                placeholder="We can't wait!"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-6 bg-[#2D3A3A] text-white py-4 px-8 uppercase tracking-[0.2em] text-xs font-sans hover:bg-[#1a2222] transition-colors flex justify-center items-center disabled:opacity-70"
            >
              {status === "submitting" ? "Sending..." : "Send RSVP"}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
