'use client';

import { Grid } from '@react-three/drei';

/**
 * Modular Environment component providing the initial ground plane
 * and spatial grid representation.
 */
export function Environment() {
  return (
    <group name="environment">
      {/* Primary Ground Plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#18181b"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Spatial Grid Marker for visual depth */}
      <Grid
        position={[0, 0.01, 0]}
        args={[60, 60]}
        cellSize={1}
        cellThickness={1}
        cellColor="#27272a"
        sectionSize={5}
        sectionThickness={1.5}
        sectionColor="#3f3f46"
        fadeDistance={40}
        fadeStrength={1}
      />
    </group>
  );
}

export default Environment;
