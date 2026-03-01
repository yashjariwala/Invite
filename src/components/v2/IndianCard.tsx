"use client";

// Single-line path data is critical — multiline strings in JSX cause server/client
// whitespace differences which trigger React hydration mismatches.
const MUGHAL_PATH = "M 0,0.08 C 0.1,0.08 0.18,0.05 0.25,0.05 C 0.35,0.05 0.42,0.02 0.5,0.0 C 0.58,0.02 0.65,0.05 0.75,0.05 C 0.82,0.05 0.9,0.08 1,0.08 L 1,0.92 C 0.9,0.92 0.82,0.95 0.75,0.95 C 0.65,0.95 0.58,0.98 0.5,1.0 C 0.42,0.98 0.35,0.95 0.25,0.95 C 0.18,0.95 0.1,0.92 0,0.92 Z";

export default function IndianCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <>
            <svg width="0" height="0" className="absolute" aria-hidden="true">
                <defs>
                    <clipPath id="mughal-arch" clipPathUnits="objectBoundingBox">
                        <path d={MUGHAL_PATH} />
                    </clipPath>
                </defs>
            </svg>

            <div className={`relative max-w-md mx-auto w-full group drop-shadow-xl hover:drop-shadow-2xl hover:-translate-y-2 transition-all duration-500 ${className}`}>
                {/* Outer thick gold background */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] via-[#f3df91] to-[#b79124]"
                    style={{ clipPath: "url(#mughal-arch)" }}
                />

                {/* Inner white card layer */}
                <div
                    className="absolute top-[3px] left-[3px] right-[3px] bottom-[3px] bg-white"
                    style={{ clipPath: "url(#mughal-arch)" }}
                />

                {/* Inner thin gold trim */}
                <div
                    className="absolute top-[10px] left-[10px] right-[10px] bottom-[10px] bg-[#D4AF37] opacity-40"
                    style={{ clipPath: "url(#mughal-arch)" }}
                />

                {/* Core content backing */}
                <div
                    className="absolute top-[11px] left-[11px] right-[11px] bottom-[11px] bg-white"
                    style={{ clipPath: "url(#mughal-arch)" }}
                />

                <div className="relative z-20 px-6 py-16 md:px-10 h-full w-full flex flex-col justify-center">
                    {children}
                </div>
            </div>
        </>
    );
}
