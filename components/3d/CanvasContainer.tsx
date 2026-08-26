'use client';

import React, { ReactNode } from 'react';

interface CanvasContainerProps {
  children?: ReactNode;
}

/**
 * Canvas Container component prepared for React Three Fiber canvas integration.
 * Structured with explicit client-side boundary to prevent Next.js SSR window/WebGL errors.
 */
export function CanvasContainer({ children }: CanvasContainerProps) {
  return (
    <div className="relative h-full w-full">
      {/* Three.js R3F Canvas and 3D environment will be mounted here in future implementation */}
      {children}
    </div>
  );
}

export default CanvasContainer;
