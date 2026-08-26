"use client";

import React, { useState, useEffect } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { VILLAGE_ROUTE } from "@/data/destinations";

// 3D Waypoint Spheres Visualizer (rendered inside Canvas when isDebug is true)
export function WaypointsVisualizer() {
  const isDebug = usePortfolioStore((state) => state.isDebug);

  if (!isDebug) return null;

  const colors = ["#ef4444", "#3b82f6", "#10b981", "#eab308", "#a855f7", "#ec4899"];

  return (
    <group>
      {VILLAGE_ROUTE.map((wp, idx) => (
        <group key={wp.id} position={wp.position}>
          <mesh>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial
              color={colors[idx % colors.length]}
              emissive={colors[idx % colors.length]}
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Developer-only HUD & Model Inspector Overlay
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
    qualityLevel,
    setQualityLevel,
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

  // Keyboard shortcut listener ('d' or 'D' key) to toggle developer mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "d" || e.key === "D") {
        toggleDebug();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleDebug]);

  // If debug is OFF, render nothing (no intrusive UI elements in production)
  if (!isDebug) return null;

  return (
    <div className="fixed top-4 right-4 z-50 p-4 w-80 bg-slate-950/95 border border-cyan-500/50 rounded-2xl backdrop-blur-xl font-mono text-xs text-slate-200 shadow-2xl space-y-3">
      <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-cyan-400 font-bold">
        <span>VILLAGE MODEL INSPECTOR</span>
        <span className={fps < 30 ? "text-red-400" : "text-emerald-400"}>{fps} FPS</span>
      </div>

      <div className="space-y-1 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
        <div className="text-[11px] font-bold text-amber-400 mb-1 uppercase tracking-wider">📦 Model Metrics (village.glb)</div>
        <div className="flex justify-between text-slate-400"><span>Asset Size:</span><span className="text-white">73.30 MB</span></div>
        <div className="flex justify-between text-slate-400"><span>World Dimensions:</span><span className="text-white">61.9m × 19.8m × 61.0m</span></div>
        <div className="flex justify-between text-slate-400"><span>Meshes:</span><span className="text-white">99 meshes</span></div>
        <div className="flex justify-between text-slate-400"><span>Materials:</span><span className="text-white">79 materials (2 atlases)</span></div>
        <div className="flex justify-between text-slate-400"><span>Triangles:</span><span className="text-white">1,005,572 tris</span></div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-slate-400">Scroll Progress:</span>
          <span className="text-amber-300">{(scrollProgress * 100).toFixed(1)}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Waypoint:</span>
          <span className="text-cyan-300">#{currentWaypointIndex} ({VILLAGE_ROUTE[currentWaypointIndex]?.title})</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Section:</span>
          <span className="text-indigo-300">{activeDestination?.sectionId || "none"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">State:</span>
          <span className={isCharacterWalking ? "text-emerald-400" : "text-amber-400"}>
            {isCharacterWalking ? "WALKING 🏃" : "IDLE 🧍"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Quality:</span>
          <select
            value={qualityLevel}
            onChange={(e) => setQualityLevel(e.target.value as any)}
            className="bg-slate-900 border border-slate-700 text-cyan-300 px-1.5 py-0.5 rounded text-[10px]"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Char Pos:</span>
          <span className="text-slate-200">
            [{characterPosition[0].toFixed(1)}, {characterPosition[1].toFixed(1)}, {characterPosition[2].toFixed(1)}]
          </span>
        </div>
      </div>
    </div>
  );
}
