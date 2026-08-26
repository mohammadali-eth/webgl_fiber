import React from 'react';
import CanvasContainer from '@/components/3d/CanvasContainer';
import MinimalOverlay from '@/components/layout/MinimalOverlay';

/**
 * Main Page integrating full-screen 3D Canvas rendering foundation
 * with minimal HUD layout overlay.
 */
export default function HomePage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#09090b]">
      {/* 3D Scene Viewport */}
      <CanvasContainer />

      {/* Minimal HUD Overlay */}
      <MinimalOverlay />
    </main>
  );
}
