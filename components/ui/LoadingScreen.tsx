"use client";

import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function LoadingScreen() {
  const { progress, active } = useProgress();
  const setIsLoaded = usePortfolioStore((state) => state.setIsLoaded);
  const isLoaded = usePortfolioStore((state) => state.isLoaded);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (progress >= 100 && !active) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, active, setIsLoaded]);

  const handleEnter = () => {
    setStarted(true);
  };

  if (isLoaded && started) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-slate-100 p-6"
      >
        {/* Glowing background circles */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-md w-full">
          {/* Badge */}
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-semibold uppercase tracking-widest">
            ✨ Interactive 3D Portfolio
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 tracking-tight mb-2">
            Anime Village 3D
          </h1>
          <p className="text-sm text-slate-400 font-medium mb-8">
            Created by Mohammad Ali • 3D Web Experience
          </p>

          {/* Progress bar or Enter Button */}
          {!isLoaded ? (
            <div className="space-y-3">
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                <span>Loading 3D Assets & Village Model...</span>
                <span className="text-cyan-400 font-bold">{Math.round(progress)}%</span>
              </div>
            </div>
          ) : (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnter}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-pink-500/25 border border-pink-400/30 tracking-wide uppercase"
            >
              🌸 Enter Village World
            </motion.button>
          )}

          <div className="mt-12 text-[11px] text-slate-500">
            Tip: Scroll or use Up/Down arrow keys to travel through the village.
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
