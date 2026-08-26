'use client';

import { CITY_CONFIG } from '@/lib/city/constants';
import Roads from './Roads';
import Sidewalks from './Sidewalks';
import Buildings from './Buildings';
import StreetLights from './StreetLights';
import Props from './Props';

/**
 * Master City Grid assembly component organizing Roads, Sidewalks, Buildings,
 * StreetLights, Props, and base ground plane into a single performant layout group.
 */
export function CityGrid() {
  const worldSize = CITY_CONFIG.WORLD_SIZE;

  return (
    <group name="city-grid">
      {/* Base Ground Foundation Plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[worldSize, worldSize]} />
        <meshStandardMaterial
          color={CITY_CONFIG.COLORS.GROUND}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Subsystem Layers */}
      <Roads />
      <Sidewalks />
      <Buildings />
      <StreetLights />
      <Props />
    </group>
  );
}

export default CityGrid;
