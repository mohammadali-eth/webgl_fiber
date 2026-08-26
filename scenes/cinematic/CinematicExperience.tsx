'use client';

import { Canvas } from '@react-three/fiber';
import AnimeEnvironment from '../city/AnimeEnvironment';
import CityGrid from '../city/CityGrid';
import WorldElements from './WorldElements';
import CinematicCamera from './CinematicCamera';

/**
 * Main Cinematic Experience R3F Viewport.
 * Renders anime environment lighting, modular city blockout, section 3D landmarks,
 * and the scroll-driven spline camera.
 */
export function CinematicExperience() {
  return (
    <div className="fixed inset-0 h-screen w-screen bg-[#0e0d21]">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0e0d21');
        }}
      >
        {/* Anime Atmospheric Lighting & Weather */}
        <AnimeEnvironment />

        {/* Modular City Blockout Foundation */}
        <CityGrid />

        {/* 3D Section Objects & Holograms */}
        <WorldElements />

        {/* Scroll-Driven Spline Flight Camera */}
        <CinematicCamera />
      </Canvas>
    </div>
  );
}

export default CinematicExperience;
