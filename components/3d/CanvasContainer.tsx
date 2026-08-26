'use client';

import dynamic from 'next/dynamic';
import SceneLoader from './SceneLoader';

// Dynamically import 3D Scene with SSR disabled to ensure browser WebGL safety
const DynamicScene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => <SceneLoader />,
});

/**
 * Client Canvas Container ensuring proper Next.js client-side WebGL rendering.
 */
export function CanvasContainer() {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <DynamicScene />
    </div>
  );
}

export default CanvasContainer;
