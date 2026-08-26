'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

/**
 * Test Object component to verify render loop and 3D geometry pipeline.
 * Features a slowly rotating BoxGeometry positioned above the ground plane.
 */
export function TestObject() {
  const meshRef = useRef<Mesh>(null!);

  // Frame animation loop — slowly rotates the test object
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 1.5, 0]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#3b82f6"
        roughness={0.3}
        metalness={0.4}
      />
    </mesh>
  );
}

export default TestObject;
