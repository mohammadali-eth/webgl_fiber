'use client';

import React, { useState, useRef } from 'react';
import CanvasContainer from '@/components/3d/CanvasContainer';
import MinimalOverlay from '@/components/layout/MinimalOverlay';

/**
 * Main Page integrating 3D Explorable City Viewport, Pointer Lock state handler,
 * and HUD overlay.
 */
export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPointerLocked, setIsPointerLocked] = useState(false);

  const handleRequestPointerLock = () => {
    if (containerRef.current) {
      containerRef.current.requestPointerLock();
    }
  };

  return (
    <main
      ref={containerRef}
      className="relative h-screen w-screen overflow-hidden bg-[#09090b]"
    >
      {/* 3D Scene Viewport */}
      <CanvasContainer
        onPointerLockChange={(locked) => setIsPointerLocked(locked)}
      />

      {/* Minimal HUD & Pointer Lock Overlay */}
      <MinimalOverlay
        isPointerLocked={isPointerLocked}
        onRequestPointerLock={handleRequestPointerLock}
      />
    </main>
  );
}
