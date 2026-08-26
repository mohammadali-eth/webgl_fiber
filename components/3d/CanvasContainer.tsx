'use client';

import dynamic from 'next/dynamic';
import SceneLoader from './SceneLoader';

// Dynamically import 3D City Scene with SSR disabled for WebGL safety
const DynamicCityScene = dynamic(() => import('@/scenes/city/CityScene'), {
  ssr: false,
  loading: () => <SceneLoader />,
});

/**
 * Client Canvas Container ensuring safe Next.js client-side WebGL rendering.
 */
export function CanvasContainer() {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <DynamicCityScene />
    </div>
  );
}

export default CanvasContainer;
