'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { PORTFOLIO_DATA } from '@/lib/portfolio/portfolioData';

/**
 * 3D World Elements for Section Waypoints.
 * Renders glowing tech rings, project 3D cards, lab geometric shapes, and central landmark core.
 */
export function WorldElements() {
  const skillsGroupRef = useRef<Group>(null!);
  const labGroupRef = useRef<Group>(null!);
  const coreRef = useRef<Group>(null!);

  useFrame((_, delta) => {
    // Slow ambient rotation of world elements
    if (skillsGroupRef.current) {
      skillsGroupRef.current.rotation.y += delta * 0.25;
    }
    if (labGroupRef.current) {
      labGroupRef.current.rotation.y -= delta * 0.2;
      labGroupRef.current.rotation.x += delta * 0.1;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group>
      {/* Central Landmark Emissive Beam Core */}
      <group ref={coreRef} position={[0, 18, 0]}>
        <mesh>
          <cylinderGeometry args={[1.2, 1.2, 40, 16]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={2.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

      {/* 1. SKILLS SECTION — Orbital Holographic Rings */}
      <group ref={skillsGroupRef} position={[-20, 12, 0]}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[8, 0.12, 16, 64]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={2.0}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[11, 0.08, 16, 64]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={1.8}
          />
        </mesh>
      </group>

      {/* 2. PROJECTS SECTION — Floating 3D Showcase Frames */}
      <group position={[0, 12, -45]}>
        {PORTFOLIO_DATA.projects.map((proj, idx) => {
          const offsetX = (idx - 1) * 16;
          return (
            <group key={proj.id} position={[offsetX, 0, 0]}>
              {/* Outer Glowing Frame */}
              <mesh>
                <boxGeometry args={[12, 7, 0.4]} />
                <meshStandardMaterial
                  color="#0f172a"
                  roughness={0.2}
                  metalness={0.9}
                />
              </mesh>
              {/* Inner Emissive Hologram Display */}
              <mesh position={[0, 0, 0.22]}>
                <planeGeometry args={[11.2, 6.2]} />
                <meshStandardMaterial
                  color={proj.accentColor}
                  emissive={proj.accentColor}
                  emissiveIntensity={0.8}
                  roughness={0.4}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* 3. CREATIVE LAB SECTION — Floating Abstract Geometry */}
      <group ref={labGroupRef} position={[-20, 22, -25]}>
        <mesh position={[-6, 0, 0]}>
          <icosahedronGeometry args={[3, 0]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={1.5}
            wireframe
          />
        </mesh>
        <mesh position={[6, 3, -2]}>
          <octahedronGeometry args={[2.5, 0]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.5}
            wireframe
          />
        </mesh>
        <mesh position={[0, -4, 4]}>
          <torusKnotGeometry args={[2, 0.4, 64, 16]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={1.8}
          />
        </mesh>
      </group>
    </group>
  );
}

export default WorldElements;
