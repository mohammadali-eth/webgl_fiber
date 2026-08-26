'use client';

import dynamic from 'next/dynamic';
import SceneLoader from './SceneLoader';

// Dynamically import 3D Cinematic Experience with SSR disabled for WebGL safety
const DynamicCinematicExperience = dynamic(
  () => import('@/scenes/cinematic/CinematicExperience'),
  {
    ssr: false,
    loading: () => <SceneLoader />,
  }
);

/**
 * Client Canvas Container ensuring safe Next.js client-side WebGL rendering.
 */
export function CanvasContainer() {
  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden pointer-events-none">
      <DynamicCinematicExperience />
    </div>
  );
}

export default CanvasContainer;
