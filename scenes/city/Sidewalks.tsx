'use client';

import { CITY_CONFIG } from '@/lib/city/constants';

/**
 * Modular Sidewalk System component rendering elevated pedestrian walkways
 * around city blocks with clean edge curb details.
 */
export function Sidewalks() {
  const blockSize = CITY_CONFIG.BLOCK_SIZE;
  const swWidth = CITY_CONFIG.SIDEWALK_WIDTH;
  const swHeight = CITY_CONFIG.SIDEWALK_HEIGHT;

  // Sidewalk block centers corresponding to city blocks
  const blockPositions: [number, number][] = [
    [0, 0], // Center plaza block
    [0, -48], // North
    [0, 48], // South
    [48, 0], // East
    [-48, 0], // West
    [48, -48], // NE
    [-48, -48], // NW
    [48, 48], // SE
    [-48, 48], // SW
  ];

  return (
    <group name="sidewalks">
      {blockPositions.map(([bx, bz], index) => (
        <group key={`sidewalk-block-${index}`} position={[bx, swHeight / 2, bz]}>
          {/* Main Block Sidewalk Platform */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[blockSize, swHeight, blockSize]} />
            <meshStandardMaterial
              color={CITY_CONFIG.COLORS.SIDEWALK}
              roughness={0.7}
              metalness={0.2}
            />
          </mesh>

          {/* Elevated Curb Border */}
          <mesh position={[0, swHeight / 4, 0]}>
            <boxGeometry
              args={[
                blockSize + swWidth * 0.2,
                swHeight * 0.5,
                blockSize + swWidth * 0.2,
              ]}
            />
            <meshStandardMaterial
              color={CITY_CONFIG.COLORS.SIDEWALK_CURB}
              roughness={0.9}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default Sidewalks;
