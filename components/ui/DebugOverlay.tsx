"use client";

import React, { useState, useEffect } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { VILLAGE_ROUTE } from "@/data/destinations";

// 3D Waypoint Spheres Visualizer (rendered inside Canvas)
export function WaypointsVisualizer() {
  const isDebug = usePortfolioStore((state) => state.isDebug);

  if (!isDebug) return null;

  const colors = ["#ef4444", "#3b82f6", "#10b981", "#eab308", "#a855f7", "#ec4899"];

  return (
    <group>
      {VILLAGE_ROUTE.map((wp, idx) => (
        <group key={wp.id} position={wp.position}>
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color={colors[idx % colors.length]} emissive={colors[idx % colors.length]} emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// 2D HTML HUD Overlay (rendered outside Canvas)
export function DebugHUD() {
  const {
    isDebug,
    toggleDebug,
    scrollProgress,
    characterPosition,
    characterRotation,
    isCharacterWalking,
    characterAnimation,
    currentWaypointIndex,
    activeDestination,
  } = usePortfolioStore();

  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };

    animId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Keyboard shortcut listener ('d' or 'D' key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "d" || e.key === "D") {
        toggleDebug();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleDebug]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleDebug}
        className="fixed top-4 right-4 z-50 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors shadow-lg"
      >
        {isDebug ? "🐞 Debug: ON [Press D]" : "🐞 Debug: OFF [Press D]"}
      </button>

      {/* Debug Panel */}
      {isDebug && (
        <div className="fixed top-14 right-4 z-50 p-4 w-72 bg-slate-950/90 border border-cyan-500/40 rounded-xl backdrop-blur-xl font-mono text-xs text-slate-200 shadow-2xl space-y-2">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-cyan-400 font-bold">
            <span>DEVELOPER DEBUG HUD</span>
            <span className={fps < 30 ? "text-red-400" : "text-emerald-400"}>{fps} FPS</span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Scroll Progress:</span>
              <span className="text-amber-300">{(scrollProgress * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Current Waypoint:</span>
              <span className="text-cyan-300">#{currentWaypointIndex} ({VILLAGE_ROUTE[currentWaypointIndex]?.title})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Active Section:</span>
              <span className="text-indigo-300">{activeDestination?.sectionId || "none"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">State:</span>
              <span className={isCharacterWalking ? "text-emerald-400" : "text-amber-400"}>
                {isCharacterWalking ? "WALKING 🏃" : "IDLE 🧍"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Animation:</span>
              <span className="text-pink-300">{characterAnimation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Char Pos:</span>
              <span className="text-slate-200 font-semibold">
                [{characterPosition[0].toFixed(1)}, {characterPosition[1].toFixed(1)}, {characterPosition[2].toFixed(1)}]
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Char Yaw:</span>
              <span className="text-slate-200">{(characterRotation * (180 / Math.PI)).toFixed(1)}°</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
