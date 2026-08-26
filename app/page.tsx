'use client';

import React, { useState, useEffect } from 'react';
import CanvasContainer from '@/components/3d/CanvasContainer';
import MinimalOverlay from '@/components/layout/MinimalOverlay';

/**
 * Main Page Component — Phase 03 Debugged & Fixed.
 * Integrates 3D Explorable City Viewport, Pointer Lock state handler, and HUD overlay.
 */
export default function HomePage() {
  const [isPointerLocked, setIsPointerLocked] = useState(false);

  // Synchronize Pointer Lock state with document listener
  useEffect(() => {
    const handleLockChange = () => {
      setIsPointerLocked(document.pointerLockElement !== null);
    };

    document.addEventListener('pointerlockchange', handleLockChange);
    return () => {
      document.removeEventListener('pointerlockchange', handleLockChange);
    };
  }, []);

  const handleRequestPointerLock = () => {
    if (typeof document !== 'undefined' && !document.pointerLockElement) {
      document.body.requestPointerLock();
    }
  };

  return (
    <main
      onClick={() => {
        if (!isPointerLocked) {
          handleRequestPointerLock();
        }
      }}
      className="relative h-screen w-screen overflow-hidden bg-[#09090b] cursor-pointer"
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
