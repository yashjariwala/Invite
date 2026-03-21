"use client";

import dynamic from "next/dynamic";
import { invitationData } from "@/lib/invitationData";
import EventDetails from "@/components/v3/EventDetails";
import EventTimeline from "@/components/v3/EventTimeline";
import GuideSection from "@/components/v3/GuideSection";
import CountdownTimer from "@/components/v3/CountdownTimer";
import AudioPlayer from "@/components/AudioPlayer";
import QuickNav from "@/components/QuickNav";

const ImmersiveInvite = dynamic(
  () => import("@/components/v4/ImmersiveInvite"),
  { ssr: false }
);

export default function HomeV4() {
  return (
    <main className="min-h-screen bg-[#fffbf5] text-[#4C1215] font-sans selection:bg-[#D4AF37]/30 selection:text-[#4C1215] pb-0 [overflow-x:clip]">
      <AudioPlayer />
      <QuickNav />
      {/* 3D Immersive Scroll */}
      <ImmersiveInvite />

      {/* Wrapping the rest of the components in dark themes for consistency */}
      <div className="relative z-10 bg-[#fffbf5] pb-24 border-t border-[#D4AF37]/20 pt-10">
        <CountdownTimer />
        <EventDetails />
        <EventTimeline />
        <GuideSection />
      </div>

      <footer className="bg-[#2d0607] text-white py-16 text-center relative overflow-hidden mt-10">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12), transparent 60%)" }} />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
        <p className="font-script text-5xl sm:text-6xl mb-3 text-[#D4AF37] relative z-10">
          {invitationData.couple.bride}{" "}
          <span className="font-sans text-2xl font-light text-[#D4AF37]/60">&amp;</span>{" "}
          {invitationData.couple.groom}
        </p>
        <div className="flex items-center justify-center gap-3 mb-4 relative z-10">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
          <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/60" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
        </div>
        <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/30 relative z-10">
          Can&apos;t wait to celebrate with you
        </p>
      </footer>
    </main>
  );
}
