import React from 'react';

/**
 * Minimal UI Overlay displaying branding and project status over the 3D canvas viewport.
 */
export function MinimalOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10 select-none z-10">
      {/* Top Header Badge */}
      <div className="flex items-center justify-between">
        <div className="pointer-events-auto flex items-center space-x-3 rounded-full bg-zinc-950/80 px-4 py-2 backdrop-blur-md border border-zinc-800">
          <div className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-300">
            3D Engine Foundation
          </span>
        </div>
        <div className="pointer-events-auto rounded-full bg-zinc-950/80 px-3 py-1 text-xs font-mono text-zinc-400 border border-zinc-800">
          Phase 01
        </div>
      </div>

      {/* Bottom Branding Title */}
      <div className="pointer-events-auto max-w-md space-y-1">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
          ALIDEV
        </h1>
        <p className="text-sm sm:text-base font-semibold uppercase tracking-wider text-zinc-400">
          3D Portfolio Prototype
        </p>
        <p className="text-xs text-zinc-500 pt-2 font-mono">
          [ Drag to rotate • Scroll to zoom ]
        </p>
      </div>
    </div>
  );
}

export default MinimalOverlay;
