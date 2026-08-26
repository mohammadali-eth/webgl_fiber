import React from 'react';

/**
 * Initial Landing Page confirming project setup.
 * Simple, elegant placeholder before Phase 2 (3D City implementation).
 */
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          ALIDEV
        </h1>
        <p className="text-xl sm:text-2xl font-medium text-zinc-400">
          3D Portfolio
        </p>
        <span className="inline-block rounded-full bg-zinc-800 px-4 py-1.5 text-sm font-semibold text-zinc-300 border border-zinc-700">
          Coming Soon
        </span>
      </div>
    </main>
  );
}
