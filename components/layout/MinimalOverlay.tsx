'use client';

import React, { useState, useEffect } from 'react';
import { PlayerState } from '@/game/player/PlayerState';

interface MinimalOverlayProps {
  isPointerLocked?: boolean;
  onRequestPointerLock?: () => void;
}

/**
 * Game HUD & Overlay Component — Phase 03 Debugged & Fixed.
 * Ensures non-blocking pointer events on decorative layers, reliable click-to-enter
 * action buttons, subtle crosshair, and developer telemetry overlay (F3).
 */
export function MinimalOverlay({
  isPointerLocked = false,
  onRequestPointerLock,
}: MinimalOverlayProps) {
  const [telemetry, setTelemetry] = useState({
    pos: [0, 0.2, 22] as [number, number, number],
    speed: 0,
    isGrounded: true,
    isSprinting: false,
    isDebug: false,
    status: PlayerState.status,
  });

  // Poll debug telemetry state every 100ms when debug mode is enabled
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry({
        pos: PlayerState.telemetry.position,
        speed: PlayerState.telemetry.speed,
        isGrounded: PlayerState.telemetry.isGrounded,
        isSprinting: PlayerState.telemetry.isSprinting,
        isDebug: PlayerState.isDebugEnabled,
        status: PlayerState.status,
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10 select-none z-20">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-3 rounded-full bg-zinc-950/80 px-4 py-2 backdrop-blur-md border border-zinc-800">
          <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-300">
            Player Controller & Camera
          </span>
        </div>
        <div className="rounded-full bg-zinc-950/80 px-3.5 py-1 text-xs font-mono text-cyan-400 border border-cyan-900/50">
          PHASE 03
        </div>
      </div>

      {/* Center Screen Overlay — Click-to-Enter / Resume or Subtle Crosshair */}
      <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
        {!isPointerLocked ? (
          <button
            type="button"
            onClick={onRequestPointerLock}
            className="pointer-events-auto group cursor-pointer flex flex-col items-center space-y-3 rounded-2xl bg-zinc-950/95 px-10 py-6 border border-cyan-500/40 shadow-[0_0_50px_rgba(56,189,248,0.15)] backdrop-blur-xl hover:border-cyan-400 hover:scale-105 transition-all duration-300"
          >
            <span className="text-lg font-extrabold tracking-widest uppercase text-white group-hover:text-cyan-300 transition-colors">
              {telemetry.status === 'PAUSED' ? 'Click to Resume' : 'Click to Enter City'}
            </span>
            <div className="flex items-center space-x-3 text-xs font-mono text-zinc-400 border-t border-zinc-800 pt-3">
              <span><strong className="text-cyan-400">WASD</strong> Move</span>
              <span>•</span>
              <span><strong className="text-cyan-400">Mouse</strong> Look</span>
              <span>•</span>
              <span><strong className="text-cyan-400">SHIFT</strong> Sprint</span>
              <span>•</span>
              <span><strong className="text-cyan-400">SPACE</strong> Jump</span>
            </div>
          </button>
        ) : (
          /* Subtle Crosshair in Center Screen */
          <div className="relative flex items-center justify-center opacity-70 pointer-events-none">
            <div className="h-2.5 w-0.5 bg-cyan-400" />
            <div className="absolute h-0.5 w-2.5 bg-cyan-400" />
          </div>
        )}
      </div>

      {/* Bottom Footer & Developer Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
            ALIDEV
          </h1>
          <div className="flex items-center space-x-4 text-xs font-mono text-zinc-400 pt-1">
            <span><strong className="text-zinc-200">WASD</strong> Move</span>
            <span><strong className="text-zinc-200">SHIFT</strong> Sprint</span>
            <span><strong className="text-zinc-200">SPACE</strong> Jump</span>
            <span><strong className="text-zinc-200">ESC</strong> Pause</span>
          </div>
        </div>

        {/* Developer Debug Telemetry Panel (F3 / ~ toggle) */}
        {telemetry.isDebug && (
          <div className="pointer-events-auto rounded-lg bg-zinc-950/95 p-3.5 text-xs font-mono text-cyan-300 border border-cyan-500/40 backdrop-blur-md space-y-1 min-w-[220px]">
            <div className="font-bold text-white border-b border-zinc-800 pb-1 flex justify-between">
              <span>[PLAYER DEBUG]</span>
              <span className="text-cyan-400">{telemetry.status}</span>
            </div>
            <div>
              POS: X={telemetry.pos[0].toFixed(1)}, Y={telemetry.pos[1].toFixed(1)}, Z={telemetry.pos[2].toFixed(1)}
            </div>
            <div>SPEED: {telemetry.speed.toFixed(1)} m/s</div>
            <div>GROUNDED: {telemetry.isGrounded ? 'YES' : 'NO'}</div>
            <div>SPRINT: {telemetry.isSprinting ? 'ACTIVE' : 'OFF'}</div>
            <div>POINTER LOCK: {isPointerLocked ? 'YES' : 'NO'}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MinimalOverlay;
