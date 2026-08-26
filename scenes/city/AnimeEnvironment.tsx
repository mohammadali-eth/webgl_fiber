'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Anime Environment & Atmospheric Lighting System.
 * Renders anime twilight sky backdrop, multi-toned fog, soft warm sun,
 * glowing volumetric light cores, and floating anime dust particles.
 */
export function AnimeEnvironment() {
  const particlesRef = useRef<THREE.InstancedMesh>(null!);
  const count = 120;

  // Generate random positions & speeds for atmospheric floating particles
  const particleData = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 140,
        y: Math.random() * 50 + 2,
        z: (Math.random() - 0.5) * 140,
        speedY: Math.random() * 0.08 + 0.02,
        scale: Math.random() * 0.25 + 0.1,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Animate floating dust particles
    if (particlesRef.current) {
      particleData.forEach((p, i) => {
        p.y += p.speedY * delta * 12;
        if (p.y > 55) p.y = 2; // Reset when drifting above skyline

        dummy.position.set(
          p.x + Math.sin(time * 0.5 + i) * 0.8,
          p.y,
          p.z + Math.cos(time * 0.5 + i) * 0.8
        );
        dummy.scale.setScalar(p.scale);
        dummy.updateMatrix();

        particlesRef.current.setMatrixAt(i, dummy.matrix);
      });
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Multi-Toned Anime Twilight Atmospheric Fog */}
      <fogExp2 attach="fog" args={['#0e0d21', 0.012]} />

      {/* Ambient Lighting */}
      <ambientLight intensity={0.65} color="#818cf8" />

      {/* Main Warm Sunset Sun Light */}
      <directionalLight
        position={[45, 60, 40]}
        intensity={2.2}
        color="#fb923c"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={180}
        shadow-camera-left={-75}
        shadow-camera-right={75}
        shadow-camera-top={75}
        shadow-camera-bottom={-75}
        shadow-bias={-0.0001}
      />

      {/* Secondary Cyan Rim Light for Futuristic Accent Highlights */}
      <directionalLight
        position={[-50, 35, -45]}
        intensity={1.5}
        color="#38bdf8"
      />

      {/* Soft Purple Fill Light */}
      <directionalLight
        position={[0, 20, 50]}
        intensity={0.8}
        color="#c084fc"
      />

      {/* Floating Glowing Dust Particles */}
      <instancedMesh
        ref={particlesRef}
        args={[undefined, undefined, count]}
      >
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.7}
        />
      </instancedMesh>

      {/* Distant Sun Flare Glow Sphere */}
      <mesh position={[70, 80, -120]}>
        <sphereGeometry args={[16, 16, 16]} />
        <meshBasicMaterial color="#fdba74" transparent opacity={0.6} />
      </mesh>
    </>
  );
}

export default AnimeEnvironment;
