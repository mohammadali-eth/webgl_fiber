'use client';

import dynamic from 'next/dynamic';
import SceneLoader from './SceneLoader';

interface CanvasContainerProps {
  onPointerLockChange?: (locked: boolean) => void;
}

// Dynamically import 3D City Scene with SSR disabled for WebGL safety
const DynamicCityScene = dynamic(() => import('@/scenes/city/CityScene'), {
  ssr: false,
  loading: () => <SceneLoader />,
});

/**
 * Client Canvas Container ensuring safe Next.js client-side WebGL rendering.
 */
export function CanvasContainer({ onPointerLockChange }: CanvasContainerProps) {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <DynamicCityScene onPointerLockChange={onPointerLockChange} />
    </div>
  );
}

export default CanvasContainer;
