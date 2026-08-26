"use client";

import React, { useEffect, useRef } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { VILLAGE_ROUTE } from "@/data/destinations";

export function ScrollController() {
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const setScrollProgress = usePortfolioStore((state) => state.setScrollProgress);
  const activeDestination = usePortfolioStore((state) => state.activeDestination);
  const currentWaypointIndex = usePortfolioStore((state) => state.currentWaypointIndex);

  const targetProgress = useRef<number>(scrollProgress);
  const touchStartY = useRef<number>(0);

  // Wheel and keyboard scroll handler
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Sensitivity factor
      const delta = e.deltaY * 0.0006;
      targetProgress.current = Math.max(0, Math.min(1, targetProgress.current + delta));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        targetProgress.current = Math.min(1, targetProgress.current + 0.05);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        targetProgress.current = Math.max(0, targetProgress.current - 0.05);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const deltaY = touchStartY.current - e.touches[0].clientY;
        touchStartY.current = e.touches[0].clientY;
        targetProgress.current = Math.max(0, Math.min(1, targetProgress.current + deltaY * 0.002));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // RAF loop to smoothly update scrollProgress in Zustand
  useEffect(() => {
    let animId: number;
    let current = scrollProgress;

    const update = () => {
      current += (targetProgress.current - current) * 0.1;
      if (Math.abs(targetProgress.current - current) > 0.0001) {
        setScrollProgress(current);
      }
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [scrollProgress, setScrollProgress]);

  // Jump to specific waypoint on click
  const jumpToWaypoint = (progress: number) => {
    targetProgress.current = progress;
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl p-3 rounded-2xl shadow-2xl">
      {/* Waypoint nodes indicator */}
      <div className="flex justify-between items-center px-2 mb-2">
        {VILLAGE_ROUTE.map((wp, idx) => {
          const isActive = idx === currentWaypointIndex;
          const isPassed = scrollProgress >= wp.progress;

          return (
            <button
              key={wp.id}
              onClick={() => jumpToWaypoint(wp.progress)}
              className="group flex flex-col items-center focus:outline-none"
              title={wp.title}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-400 ring-4 ring-cyan-500/30 scale-125"
                    : isPassed
                    ? "bg-indigo-400"
                    : "bg-slate-700 hover:bg-slate-500"
                }`}
              />
              <span className={`text-[10px] mt-1 font-medium transition-colors ${isActive ? "text-cyan-300" : "text-slate-500 group-hover:text-slate-300"}`}>
                {wp.houseId ? wp.title.split(" ")[0] : idx === 0 ? "Start" : "End"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress track */}
      <div className="relative w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 transition-all duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Helper text */}
      <div className="flex justify-between items-center mt-2 px-1 text-[11px] text-slate-400">
        <span>📜 Scroll to travel</span>
        <span className="text-cyan-300 font-semibold">{activeDestination?.title || "Anime Village"}</span>
        <span>{(scrollProgress * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
}
