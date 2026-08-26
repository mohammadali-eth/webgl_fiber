"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { Village } from "@/components/world/Village";
import { Lighting } from "@/components/world/Lighting";
import { Character } from "@/components/character/Character";
import { CameraController } from "@/components/camera/CameraController";
import { ScrollController } from "@/components/navigation/ScrollController";
import { AboutOverlay } from "@/components/portfolio/AboutOverlay";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { DebugHUD, WaypointsVisualizer } from "@/components/ui/DebugOverlay";
import { AudioControls } from "@/components/ui/AudioControls";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-950">
      {/* 3D Canvas Layer */}
      <Canvas
        shadows
        camera={{ position: [0, 6, 26], fov: 45, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <Lighting />
          <Village />
          <Character />
          <CameraController />
          <WaypointsVisualizer />
        </Suspense>
      </Canvas>

      {/* HTML Interface & Overlays */}
      <LoadingScreen />
      <ScrollController />
      <AboutOverlay />
      <DebugHUD />
      <AudioControls />
    </main>
  );
}
