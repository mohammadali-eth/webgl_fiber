'use client';

import React from 'react';
import { SECTION_NAMES } from '@/scenes/cinematic/CameraPath';

interface ScrollProgressNavProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

/**
 * Editorial Top Header & Right Vertical Scroll Progress Navigation Bar.
 */
export function ScrollProgressNav({ activeIndex, onNavigate }: ScrollProgressNavProps) {
  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5 sm:px-12 backdrop-blur-md bg-zinc-950/40 border-b border-white/5 pointer-events-auto">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-black tracking-tighter text-white">ALIDEV</span>
          <span className="h-4 w-px bg-zinc-700" />
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            3D Portfolio
          </span>
        </div>

        {/* Section Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-wider">
          {SECTION_NAMES.map((name, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={name}
                type="button"
                onClick={() => onNavigate(idx)}
                className={`transition-colors duration-200 uppercase ${
                  isActive ? 'text-cyan-400 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {name}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Fixed Right-Hand Vertical Scroll Indicator */}
      <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center space-y-4 pointer-events-auto">
        {SECTION_NAMES.map((name, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={name}
              type="button"
              onClick={() => onNavigate(idx)}
              className="group relative flex items-center"
              aria-label={`Scroll to ${name}`}
            >
              {/* Tooltip Label on Hover */}
              <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-mono tracking-widest text-zinc-300 bg-zinc-900/90 px-2 py-1 rounded border border-zinc-800 whitespace-nowrap">
                {name}
              </span>

              {/* Dot Indicator */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'h-6 w-2 bg-cyan-400 shadow-[0_0_12px_#38bdf8]'
                    : 'h-2 w-2 bg-zinc-600 group-hover:bg-zinc-300'
                }`}
              />
            </button>
          );
        })}
      </aside>
    </>
  );
}

export default ScrollProgressNav;
