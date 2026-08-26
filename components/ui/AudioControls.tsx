"use client";

import React, { useEffect, useRef } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function AudioControls() {
  const isAudioEnabled = usePortfolioStore((state) => state.isAudioEnabled);
  const toggleAudio = usePortfolioStore((state) => state.toggleAudio);
  const audioVolume = usePortfolioStore((state) => state.audioVolume);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Standard subtle ambient synth sound loop
    const audio = new Audio("https://assets.mixkit.co/music/preview/mixkit-game-level-music-689.mp3");
    audio.loop = true;
    audio.volume = audioVolume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [audioVolume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isAudioEnabled) {
      audioRef.current.play().catch(() => {
        // Browser autoplay restriction
      });
    } else {
      audioRef.current.pause();
    }
  }, [isAudioEnabled]);

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
      <button
        onClick={toggleAudio}
        className={`px-3 py-1.5 rounded-full border backdrop-blur-md text-xs font-mono transition-all flex items-center gap-1.5 shadow-lg ${
          isAudioEnabled
            ? "bg-pink-500/20 border-pink-500/50 text-pink-300 shadow-pink-500/10"
            : "bg-slate-900/80 border-slate-700/80 text-slate-400 hover:text-slate-200"
        }`}
        title="Toggle Village Ambience Music"
      >
        <span>{isAudioEnabled ? "🎵 MUSIC: ON" : "🔇 MUSIC: OFF"}</span>
      </button>
    </div>
  );
}
