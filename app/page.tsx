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
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        camera={{ position: [0, 4.2, 22], fov: 42, near: 0.1, far: 150 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
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
