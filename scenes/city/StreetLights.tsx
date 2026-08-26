'use client';

import { CITY_CONFIG } from '@/lib/city/constants';
import { STREET_LIGHTS_DATA, StreetLightData } from '@/lib/city/cityData';

interface SingleStreetLightProps {
  data: StreetLightData;
}

/**
 * Reusable StreetLight component featuring pole, curved arm,
 * emissive glowing lamp fixture, and subtle local point illumination.
 */
function StreetLight({ data }: SingleStreetLightProps) {
  const { position, rotationY } = data;
  const poleH = 5.5;

  return (
    <group
      position={[position[0], CITY_CONFIG.SIDEWALK_HEIGHT, position[2]]}
      rotation={[0, rotationY, 0]}
    >
      {/* 1. Main Pole */}
      <mesh castShadow position={[0, poleH / 2, 0]}>
        <cylinderGeometry args={[0.1, 0.16, poleH, 8]} />
        <meshStandardMaterial
          color={CITY_CONFIG.COLORS.STREET_LIGHT_POLE}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* 2. Top Curved Overhang Arm */}
      <mesh castShadow position={[0.6, poleH - 0.2, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[1.2, 0.1, 0.1]} />
        <meshStandardMaterial
          color={CITY_CONFIG.COLORS.STREET_LIGHT_POLE}
          metalness={0.8}
        />
      </mesh>

      {/* 3. Glowing Emissive Lamp Fixture */}
      <mesh position={[1.1, poleH - 0.5, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.25]} />
        <meshStandardMaterial
          color={CITY_CONFIG.COLORS.STREET_LIGHT_GLOW}
          emissive={CITY_CONFIG.COLORS.STREET_LIGHT_GLOW}
          emissiveIntensity={2.0}
        />
      </mesh>

      {/* 4. Local Ground Point Light */}
      <pointLight
        position={[1.1, poleH - 0.6, 0]}
        color={CITY_CONFIG.COLORS.STREET_LIGHT_GLOW}
        intensity={0.6}
        distance={12}
        decay={2}
      />
    </group>
  );
}

/**
 * StreetLights Collection Renderer
 */
export function StreetLights() {
  return (
    <group name="street-lights">
      {STREET_LIGHTS_DATA.map((lightData) => (
        <StreetLight key={lightData.id} data={lightData} />
      ))}
    </group>
  );
}

export default StreetLights;
