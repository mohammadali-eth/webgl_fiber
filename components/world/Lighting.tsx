"use client";

import React from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function Lighting() {
  const qualityLevel = usePortfolioStore((state) => state.qualityLevel);
  const shadowMapSize = qualityLevel === "high" ? 2048 : 1024;

  return (
    <>
      {/* Bright Sky Background Light (Hemisphere: Sky / Ground) */}
      <hemisphereLight color="#e2f1ff" groundColor="#452a12" intensity={1.1} />

      {/* Main Warm Sunlight - Crisp & Vibrant */}
      <directionalLight
        position={[35, 50, 25]}
        intensity={2.2}
        color="#ffffff"
        castShadow={qualityLevel !== "low"}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-near={1.0}
        shadow-camera-far={120}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.0003}
      />

      {/* Soft secondary fill light for vibrant shadow detail */}
      <directionalLight position={[-25, 30, -25]} intensity={0.7} color="#fef08a" />

      {/* Subtle warm house entrance accent lights */}
      <pointLight position={[-11, 2.8, 2]} intensity={2.0} color="#fda4af" distance={12} decay={2} />
      <pointLight position={[10, 2.8, -2]} intensity={2.0} color="#38bdf8" distance={12} decay={2} />
    </>
  );
}
