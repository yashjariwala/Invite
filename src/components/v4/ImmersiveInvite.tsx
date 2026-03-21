"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Scene, CameraRig } from "./WeddingScene";
import { invitationData } from "@/lib/invitationData";

export default function ImmersiveInvite() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || /iPhone|iPad|Android/i.test(navigator.userAgent));
  }, []);

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] });
  const smoothed = useSpring(scrollYProgress, { stiffness: 40, damping: 18 });
  useEffect(() => smoothed.on("change", (v) => { progressRef.current = v; }), [smoothed]);

  const hintOp = useTransform(scrollYProgress, [0, 0.02, 0.12], [1, 1, 0]);
  const barW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Overlay Text Transforms (Vast spacing for a majestic walk)
  const text1Op = useTransform(scrollYProgress, [0.15, 0.20, 0.30, 0.35], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0.15, 0.35], [50, -50]);

  const text2Op = useTransform(scrollYProgress, [0.40, 0.45, 0.55, 0.60], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.40, 0.60], [50, -50]);

  const text3Op = useTransform(scrollYProgress, [0.65, 0.70, 0.80, 0.85], [0, 1, 1, 0]);
  const text3Y = useTransform(scrollYProgress, [0.65, 0.85], [50, -50]);

  const text4Op = useTransform(scrollYProgress, [0.90, 0.94, 0.98, 1.00], [0, 1, 1, 0]);
  const text4Y = useTransform(scrollYProgress, [0.90, 1.00], [50, -50]);

  return (
    <div ref={wrapperRef} style={{ height: "1000vh" }} className="relative z-0">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">

        <Canvas
          camera={{ position: [0, 3.2, 10], fov: 65, near: 0.1, far: 250 }}
          shadows={false}                          /* shadows off on all devices */
          gl={{
            antialias: !isMobile,                  /* antialias off on mobile */
            powerPreference: "high-performance",
            toneMapping: 4,
            toneMappingExposure: isMobile ? 1.2 : 1.1,
          }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}       /* cap pixel ratio */
          performance={{ min: 0.5 }}               /* allow R3F to drop quality to hit 60fps */
          style={{ background: "#0d0420" }}
        >
          <Suspense fallback={null}>
            <CameraRig progress={progressRef} />
            <Scene mobile={isMobile} />
          </Suspense>
        </Canvas>

        {/* Dark edge vignette — deepens corners like a real photo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(13,4,32,0.55) 100%)" }}
        />

        {/* Scroll hint */}
        <motion.div style={{ opacity: hintOp }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <span className="font-sans text-[8px] uppercase tracking-[0.5em] text-[#D4AF37]/80">
            Scroll to walk in
          </span>
          <motion.div
            className="w-[1px] bg-gradient-to-b from-[#D4AF37]/70 to-transparent"
            animate={{ height: [14, 32, 14], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Floating Text Overlays — translucent dark glass panels */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-center px-6">
          <motion.div
            style={{ opacity: text1Op, y: text1Y, background: "rgba(13,4,32,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(212,175,55,0.35)" }}
            className="absolute flex flex-col items-center px-10 py-8">
            <h2 className="text-5xl md:text-7xl font-script text-[#fdf6e3] mb-4 leading-tight" style={{ textShadow: "0 0 40px rgba(212,175,55,0.5)" }}>{invitationData.invocation}</h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-4" />
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]/70">The Wedding Celebration</p>
          </motion.div>

          <motion.div
            style={{ opacity: text2Op, y: text2Y, background: "rgba(13,4,32,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(212,175,55,0.35)" }}
            className="absolute flex flex-col items-center px-10 py-8">
            <p className="font-sans text-[9px] uppercase tracking-[0.5em] text-[#D4AF37]/60 mb-3">Wedding Ceremony</p>
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-10 bg-[#D4AF37]/50" />
              <p className="text-3xl md:text-5xl text-[#D4AF37] font-script" style={{ textShadow: "0 0 30px rgba(212,175,55,0.6)" }}>{invitationData.events[0].dateLabel}</p>
              <div className="h-[1px] w-10 bg-[#D4AF37]/50" />
            </div>
            <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/40 mt-3">{invitationData.events[0].timeLabel}</p>
          </motion.div>

          <motion.div
            style={{ opacity: text3Op, y: text3Y, background: "rgba(13,4,32,0.5)", backdropFilter: "blur(12px)", border: "1px solid rgba(212,175,55,0.3)" }}
            className="absolute flex flex-col items-center px-8 py-8">
            <h2 className="font-script text-[#fdf6e3] leading-none mb-4" style={{ fontSize: "clamp(3rem, 14vw, 6rem)", textShadow: "0 0 60px rgba(212,175,55,0.4)" }}>
              {invitationData.couple.bride}
              <span className="font-sans font-light text-[#D4AF37] px-3" style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}>&amp;</span>
              {invitationData.couple.groom}
            </h2>
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-8 bg-[#D4AF37]/50" />
              <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#D4AF37]/80">{invitationData.couple.date}</p>
              <div className="h-[1px] w-8 bg-[#D4AF37]/50" />
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: text4Op, y: text4Y, background: "rgba(13,4,32,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(212,175,55,0.35)" }}
            className="absolute flex flex-col items-center px-10 py-8">
            <p className="font-sans text-[9px] uppercase tracking-[0.5em] text-[#D4AF37]/60 mb-3">Grand Reception</p>
            <div className="flex items-center gap-4 mb-3">
              <div className="h-[1px] w-10 bg-[#D4AF37]/50" />
              <p className="text-2xl md:text-4xl text-[#D4AF37] font-script" style={{ textShadow: "0 0 30px rgba(212,175,55,0.6)" }}>{invitationData.events[1].dateLabel}</p>
              <div className="h-[1px] w-10 bg-[#D4AF37]/50" />
            </div>
            <h2 className="font-serif text-2xl md:text-4xl text-[#fdf6e3] italic" style={{ textShadow: "0 0 30px rgba(212,175,55,0.3)" }}>{invitationData.events[1].venue}</h2>
            <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/40 mt-2">{invitationData.events[1].timeLabel}</p>
          </motion.div>
        </div>

        {/* Elegant White/Gold Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20">
          <motion.div className="h-full bg-gradient-to-r from-[#D4AF37]/40 via-[#D4AF37] to-[#D4AF37]/40"
            style={{ width: barW, boxShadow: "0 0 15px rgba(212,175,55,0.4)" }} />
        </div>
      </div>
    </div>
  );
}
