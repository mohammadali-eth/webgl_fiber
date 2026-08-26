"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { PORTFOLIO_DATA } from "@/data/destinations";

export function AboutOverlay() {
  const activePanel = usePortfolioStore((state) => state.activePanel);
  const setActivePanel = usePortfolioStore((state) => state.setActivePanel);

  const isOpen = activePanel === "about";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-slate-900/90 border border-pink-500/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-pink-500/10 backdrop-blur-2xl text-slate-100 overflow-hidden"
        >
          {/* Subtle anime glowing background accent */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => setActivePanel(null)}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-16 rounded-2xl p-0.5 bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-500 shadow-lg">
              <img
                src={PORTFOLIO_DATA.developer.avatar}
                alt={PORTFOLIO_DATA.developer.name}
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-1">
                🏠 House 01 • Sakura Cottage
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {PORTFOLIO_DATA.developer.name}
              </h2>
              <p className="text-sm text-cyan-400 font-medium">{PORTFOLIO_DATA.developer.role}</p>
            </div>
          </div>

          {/* Bio Description */}
          <div className="space-y-4 text-sm md:text-base text-slate-300 leading-relaxed mb-6">
            <p>{PORTFOLIO_DATA.about.description}</p>
            <p className="text-pink-200/90 italic border-l-2 border-pink-500 pl-3">
              &quot;{PORTFOLIO_DATA.developer.tagline}&quot;
            </p>
          </div>

          {/* Core Strengths & Highlights */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Core Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {PORTFOLIO_DATA.about.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs text-slate-200"
                >
                  <span className="text-pink-400 font-bold">✦</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 p-3 rounded-2xl bg-slate-950/50 border border-slate-800">
            {PORTFOLIO_DATA.developer.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <a
                href={PORTFOLIO_DATA.about.socials.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-all hover:scale-105"
              >
                GitHub Profile
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-xs font-semibold text-white shadow-lg shadow-pink-500/25 transition-all hover:scale-105"
              >
                Contact Me
              </a>
            </div>
            <button
              onClick={() => setActivePanel(null)}
              className="text-xs text-slate-400 hover:text-cyan-300 font-medium underline underline-offset-4"
            >
              Continue Village Tour ↓
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
