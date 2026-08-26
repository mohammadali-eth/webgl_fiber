'use client';

/**
 * Modular Lighting component providing ambient and directional lights with shadow mapping.
 * Serves as the foundation for the future city environment lighting.
 */
export function Lighting() {
  return (
    <>
      {/* Soft fill light for ambient visibility */}
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Primary directional sun light with shadows */}
      <directionalLight
        position={[15, 20, 15]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0001}
      />

      {/* Secondary accent fill light */}
      <directionalLight
        position={[-10, 10, -10]}
        intensity={0.3}
        color="#60a5fa"
      />
    </>
  );
}

export default Lighting;
