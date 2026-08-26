'use client';

import React, { useState, useEffect } from 'react';
import { PlayerState } from '@/game/player/PlayerState';

interface MinimalOverlayProps {
  isPointerLocked?: boolean;
  onRequestPointerLock?: () => void;
}

/**
 * Game HUD Overlay for Phase 03.
 * Renders Pointer Lock entry prompt, subtle crosshair, control legend,
 * phase status badge, and developer debug telemetry overlay.
 */
export function MinimalOverlay({
  isPointerLocked = false,
  onRequestPointerLock,
}: MinimalOverlayProps) {
  const [debugData, setDebugData] = useState<{
    pos: [number, number, number];
    speed: number;
    isGrounded: boolean;
    isSprinting: boolean;
    isDebug: boolean;
  }>({
    pos: [0, 0.2, 22],
    speed: 0,
    isGrounded: true,
    isSprinting: false,
    isDebug: false,
  });

  // Poll debug telemetry state every 100ms when debug is active
  useEffect(() => {
    const interval = setInterval(() => {
      setDebugData({
        pos: PlayerState.telemetry.position,
        speed: PlayerState.telemetry.speed,
        isGrounded: PlayerState.telemetry.isGrounded,
        isSprinting: PlayerState.telemetry.isSprinting,
        isDebug: PlayerState.isDebugEnabled,
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10 select-none z-10">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <div className="pointer-events-auto flex items-center space-x-3 rounded-full bg-zinc-950/80 px-4 py-2 backdrop-blur-md border border-zinc-800">
          <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-300">
            Player Controller & Camera
          </span>
        </div>
        <div className="pointer-events-auto rounded-full bg-zinc-950/80 px-3.5 py-1 text-xs font-mono text-cyan-400 border border-cyan-900/50">
          PHASE 03
        </div>
      </div>

      {/* Center Screen — Pointer Lock Click Prompt / Crosshair */}
      <div className="flex flex-col items-center justify-center space-y-4">
        {!isPointerLocked ? (
          <button
            onClick={onRequestPointerLock}
            className="pointer-events-auto group cursor-pointer flex flex-col items-center space-y-2 rounded-2xl bg-zinc-950/90 px-8 py-5 border border-zinc-800 shadow-2xl backdrop-blur-lg hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold tracking-widest uppercase text-white">
                Click to Enter City
              </span>
            </div>
            <span className="text-xs text-zinc-400 font-mono">
              [ Mouse to look • WASD to move ]
            </span>
          </button>
        ) : (
          /* Subtle Crosshair */
          <div className="relative flex items-center justify-center opacity-60">
            <div className="h-2 w-0.5 bg-cyan-400/80" />
            <div className="absolute h-0.5 w-2 bg-cyan-400/80" />
          </div>
        )}
      </div>

      {/* Bottom Row — Control Legend & Debug Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="pointer-events-auto space-y-1">
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

        {/* Developer Debug Overlay (F3 / ~ toggle) */}
        {debugData.isDebug && (
          <div className="pointer-events-auto rounded-lg bg-zinc-950/90 p-3 text-xs font-mono text-cyan-300 border border-cyan-900/50 backdrop-blur-md space-y-1 min-w-[200px]">
            <div className="font-bold text-white border-b border-zinc-800 pb-1">
              [DEBUG TELEMETRY]
            </div>
            <div>
              POS: X={debugData.pos[0].toFixed(1)}, Y={debugData.pos[1].toFixed(1)}, Z={debugData.pos[2].toFixed(1)}
            </div>
            <div>SPEED: {debugData.speed.toFixed(1)} m/s</div>
            <div>GROUNDED: {debugData.isGrounded ? 'YES' : 'NO'}</div>
            <div>SPRINT: {debugData.isSprinting ? 'ACTIVE' : 'OFF'}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MinimalOverlay;
