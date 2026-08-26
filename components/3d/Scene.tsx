'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Camera from './Camera';
import Lighting from './Lighting';
import Environment from './Environment';
import TestObject from './TestObject';

interface SceneProps {
  showControls?: boolean;
}

/**
 * Main 3D Scene canvas component assembling Camera, Lighting, Environment,
 * and Test Object into a single React Three Fiber viewport.
 */
export function Scene({ showControls = true }: SceneProps) {
  return (
    <div className="relative h-full w-full bg-[#09090b]">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#09090b');
        }}
      >
        <Camera position={[0, 5, 10]} fov={60} />
        <Lighting />
        <Environment />
        <TestObject />

        {/* Development Inspection OrbitControls */}
        {showControls && (
          <OrbitControls
            makeDefault
            enableDamping
            dampingFactor={0.05}
            minDistance={2}
            maxDistance={40}
            maxPolarAngle={Math.PI / 2 - 0.01}
          />
        )}
      </Canvas>
    </div>
  );
}

export default Scene;
