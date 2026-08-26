"use client";

import React from "react";

export function Lighting() {
  return (
    <>
      {/* Soft anime atmospheric ambient light */}
      <ambientLight intensity={0.8} color="#e0f2fe" />

      {/* Main directional sun light */}
      <directionalLight
        position={[30, 45, 20]}
        intensity={1.8}
        color="#fffbeb"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={120}
        shadow-camera-left={-35}
        shadow-camera-right={35}
        shadow-camera-top={35}
        shadow-camera-bottom={-35}
        shadow-bias={-0.0005}
      />

      {/* Secondary fill light for soft shadows */}
      <directionalLight position={[-20, 25, -20]} intensity={0.5} color="#cbd5e1" />

      {/* Sky & Ground Hemisphere Light */}
      <hemisphereLight color="#bae6fd" groundColor="#334155" intensity={0.7} />

      {/* Subtle warm house entrance lights */}
      {/* House 1: About Cottage */}
      <pointLight position={[-11, 3, 2]} intensity={2.5} color="#fda4af" distance={12} decay={2} />
      {/* House 2: Skills Workshop */}
      <pointLight position={[10, 3, -2]} intensity={2.5} color="#38bdf8" distance={12} decay={2} />
      {/* House 3: Projects Atelier */}
      <pointLight position={[-8, 3, -11]} intensity={2.5} color="#a78bfa" distance={12} decay={2} />
    </>
  );
}
