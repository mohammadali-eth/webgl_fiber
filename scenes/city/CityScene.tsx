'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Camera from '@/components/3d/Camera';
import CityEnvironment from './CityEnvironment';
import CityGrid from './CityGrid';

interface CitySceneProps {
  showControls?: boolean;
}

/**
 * Main City Scene Canvas viewport for Phase 02: City World Foundation.
 * Integrates futuristic city blockout, environment, lighting, and development inspection camera.
 */
export function CityScene({ showControls = true }: CitySceneProps) {
  return (
    <div className="relative h-full w-full bg-[#09090b]">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#09090b');
        }}
      >
        {/* Development Inspection Camera */}
        <Camera position={[45, 35, 45]} fov={55} />

        {/* City Environment & Atmospheric Lighting */}
        <CityEnvironment />

        {/* Modular City Blockout Grid */}
        <CityGrid />

        {/* Orbit Controls for Development Inspection */}
        {showControls && (
          <OrbitControls
            makeDefault
            enableDamping
            dampingFactor={0.05}
            minDistance={8}
            maxDistance={140}
            maxPolarAngle={Math.PI / 2 - 0.01}
            target={[0, 10, 0]}
          />
        )}
      </Canvas>
    </div>
  );
}

export default CityScene;
