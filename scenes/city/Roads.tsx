'use client';

import { CITY_CONFIG } from '@/lib/city/constants';

/**
 * Modular Road Network component rendering primary horizontal and vertical
 * thoroughfares, intersections, and futuristic lane markings.
 */
export function Roads() {
  const roadW = CITY_CONFIG.ROAD_WIDTH;
  const worldS = CITY_CONFIG.WORLD_SIZE;

  return (
    <group name="roads">
      {/* 1. Main Horizontal Road (X-Axis) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 0]}
        receiveShadow
      >
        <planeGeometry args={[worldS, roadW]} />
        <meshStandardMaterial
          color={CITY_CONFIG.COLORS.ROAD}
          roughness={0.8}
          metalness={0.3}
        />
      </mesh>

      {/* 2. Main Vertical Road (Z-Axis) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 0]}
        receiveShadow
      >
        <planeGeometry args={[roadW, worldS]} />
        <meshStandardMaterial
          color={CITY_CONFIG.COLORS.ROAD}
          roughness={0.8}
          metalness={0.3}
        />
      </mesh>

      {/* 3. Secondary Parallel Grid Roads (X = ±48) */}
      {[-48, 48].map((xOffset) => (
        <mesh
          key={`road-v-${xOffset}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[xOffset, 0.02, 0]}
          receiveShadow
        >
          <planeGeometry args={[roadW * 0.8, worldS]} />
          <meshStandardMaterial
            color={CITY_CONFIG.COLORS.ROAD}
            roughness={0.8}
            metalness={0.3}
          />
        </mesh>
      ))}

      {/* 4. Secondary Parallel Grid Roads (Z = ±48) */}
      {[-48, 48].map((zOffset) => (
        <mesh
          key={`road-h-${zOffset}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.02, zOffset]}
          receiveShadow
        >
          <planeGeometry args={[worldS, roadW * 0.8]} />
          <meshStandardMaterial
            color={CITY_CONFIG.COLORS.ROAD}
            roughness={0.8}
            metalness={0.3}
          />
        </mesh>
      ))}

      {/* 5. Center Road Lane Stripes (Horizontal) */}
      {[-50, -30, 30, 50].map((x) => (
        <mesh
          key={`stripe-h-${x}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[x, 0.03, 0]}
        >
          <planeGeometry args={[8, 0.3]} />
          <meshStandardMaterial
            color={CITY_CONFIG.COLORS.ROAD_MARKING}
            emissive={CITY_CONFIG.COLORS.ROAD_MARKING}
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}

      {/* 6. Center Road Lane Stripes (Vertical) */}
      {[-50, -30, 30, 50].map((z) => (
        <mesh
          key={`stripe-v-${z}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.03, z]}
        >
          <planeGeometry args={[0.3, 8]} />
          <meshStandardMaterial
            color={CITY_CONFIG.COLORS.ROAD_MARKING}
            emissive={CITY_CONFIG.COLORS.ROAD_MARKING}
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}

      {/* 7. Central Intersection Crosswalk Markings */}
      {[-8, 8].map((offset) => (
        <group key={`crosswalk-${offset}`}>
          {/* Horizontal crosswalk lines */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[offset, 0.03, 0]}
          >
            <planeGeometry args={[0.4, roadW - 1]} />
            <meshStandardMaterial
              color={CITY_CONFIG.COLORS.ROAD_LINE}
              roughness={0.5}
            />
          </mesh>
          {/* Vertical crosswalk lines */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.03, offset]}
          >
            <planeGeometry args={[roadW - 1, 0.4]} />
            <meshStandardMaterial
              color={CITY_CONFIG.COLORS.ROAD_LINE}
              roughness={0.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default Roads;
