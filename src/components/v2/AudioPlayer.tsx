"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        // Track user's intentional state versus automatic tab pause state
        let wasPlayingBeforeHidden = false;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                // User left the tab - save state and pause
                wasPlayingBeforeHidden = !audio.paused;
                if (wasPlayingBeforeHidden) {
                    audio.pause();
                }
            } else {
                // User returned to tab - resume if it was playing before
                if (wasPlayingBeforeHidden) {
                    audio.play().catch(console.error);
                }
            }
        };

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(console.error);
            }
        }
    };

    return (
        <>
            <audio ref={audioRef} id="bg-music" src="/music.mp3" loop preload="auto" />
            <button
                onClick={togglePlay}
                className="fixed bottom-6 right-6 z-50 p-4 bg-[#fdf5ec]/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full border border-[#e6dece] text-[#D4AF37] hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300"
                aria-label={isPlaying ? "Mute music" : "Play music"}
            >
                {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
        </>
    );
}
