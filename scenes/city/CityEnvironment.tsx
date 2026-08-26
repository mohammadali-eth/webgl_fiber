'use client';

import CITY_CONFIG from '@/lib/city/constants';

/**
 * City Environment component providing fog, background clear color,
 * and cinematic multi-light setup tailored for the futuristic city layout.
 */
export function CityEnvironment() {
  return (
    <>
      {/* Background Color & Fog */}
      <color attach="background" args={['#09090b']} />
      <fogExp2 attach="fog" args={['#09090b', 0.008]} />

      {/* Soft Ambient Environment Fill */}
      <ambientLight intensity={0.4} color="#e2e8f0" />

      {/* Primary Directional Light (Sun/Moon Shadow Caster) */}
      <directionalLight
        position={[40, 50, 30]}
        intensity={1.4}
        color="#f8fafc"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={180}
        shadow-camera-left={-70}
        shadow-camera-right={70}
        shadow-camera-top={70}
        shadow-camera-bottom={-70}
        shadow-bias={-0.0001}
      />

      {/* Cyan Rim Accent Light */}
      <directionalLight
        position={[-30, 20, -30]}
        intensity={0.5}
        color={CITY_CONFIG.COLORS.LANDMARK_EMISSIVE}
      />

      {/* Violet City Fill Light */}
      <directionalLight
        position={[20, 15, -40]}
        intensity={0.3}
        color="#818cf8"
      />
    </>
  );
}

export default CityEnvironment;
