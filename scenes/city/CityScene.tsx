'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CityEnvironment from './CityEnvironment';
import CityGrid from './CityGrid';
import Player from '@/game/player/Player';

interface CitySceneProps {
  useOrbitControls?: boolean;
  onPointerLockChange?: (locked: boolean) => void;
}

/**
 * Main City Scene Canvas viewport for Phase 03: Player Controller + Game Camera.
 * Renders third-person explorable player character, atmospheric city lighting, and grid blockout.
 */
export function CityScene({
  useOrbitControls = false,
  onPointerLockChange,
}: CitySceneProps) {
  return (
    <div className="relative h-full w-full bg-[#09090b]">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#09090b');
        }}
      >
        {/* City Environment & Lighting */}
        <CityEnvironment />

        {/* Modular City Blockout Grid */}
        <CityGrid />

        {/* Third-Person Player Controller & Game Camera */}
        {!useOrbitControls && (
          <Player onPointerLockChange={onPointerLockChange} />
        )}

        {/* Debug Orbit Controls (Optional Override) */}
        {useOrbitControls && (
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
