'use client';

import { CITY_CONFIG } from '@/lib/city/constants';
import { PROPS_DATA, PropData } from '@/lib/city/cityData';

interface PropItemProps {
  data: PropData;
}

function PropItem({ data }: PropItemProps) {
  const { type, position, rotationY = 0 } = data;
  const baseY = CITY_CONFIG.SIDEWALK_HEIGHT;

  return (
    <group position={[position[0], baseY, position[2]]} rotation={[0, rotationY, 0]}>
      {/* --- TREE PROP --- */}
      {type === 'tree' && (
        <group>
          {/* Trunk */}
          <mesh castShadow position={[0, 1, 0]}>
            <cylinderGeometry args={[0.15, 0.25, 2, 8]} />
            <meshStandardMaterial
              color={CITY_CONFIG.COLORS.TREE_TRUNK}
              roughness={0.9}
            />
          </mesh>
          {/* Stylized Foliage Cone */}
          <mesh castShadow position={[0, 2.8, 0]}>
            <coneGeometry args={[1.2, 2.5, 6]} />
            <meshStandardMaterial
              color={CITY_CONFIG.COLORS.TREE_LEAF}
              roughness={0.6}
            />
          </mesh>
        </group>
      )}

      {/* --- BENCH PROP --- */}
      {type === 'bench' && (
        <group position={[0, 0.3, 0]}>
          {/* Bench Seat */}
          <mesh castShadow position={[0, 0.2, 0]}>
            <boxGeometry args={[1.6, 0.1, 0.5]} />
            <meshStandardMaterial color={CITY_CONFIG.COLORS.BENCH} roughness={0.5} />
          </mesh>
          {/* Bench Legs */}
          {[-0.7, 0.7].map((legX, idx) => (
            <mesh key={`bench-leg-${idx}`} position={[legX, -0.05, 0]}>
              <boxGeometry args={[0.1, 0.4, 0.45]} />
              <meshStandardMaterial color="#1e293b" metalness={0.8} />
            </mesh>
          ))}
        </group>
      )}

      {/* --- DIGITAL SIGN / HOLO PEDESTAL --- */}
      {type === 'sign' && (
        <group position={[0, 0, 0]}>
          {/* Base Stand */}
          <mesh castShadow position={[0, 0.75, 0]}>
            <boxGeometry args={[0.4, 1.5, 0.4]} />
            <meshStandardMaterial color="#3f3f46" metalness={0.8} />
          </mesh>
          {/* Hologram Display Panel */}
          <mesh position={[0, 2, 0]}>
            <boxGeometry args={[1.4, 1.0, 0.08]} />
            <meshStandardMaterial
              color={CITY_CONFIG.COLORS.SIGN_EMISSIVE}
              emissive={CITY_CONFIG.COLORS.SIGN_EMISSIVE}
              emissiveIntensity={1.2}
              transparent
              opacity={0.85}
            />
          </mesh>
        </group>
      )}

      {/* --- ROAD BARRIER --- */}
      {type === 'barrier' && (
        <group position={[0, 0.3, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.8, 0.6, 0.3]} />
            <meshStandardMaterial color="#fbbf24" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.1, 0.16]}>
            <planeGeometry args={[1.6, 0.2]} />
            <meshStandardMaterial color="#18181b" />
          </mesh>
        </group>
      )}
    </group>
  );
}

/**
 * Environmental Props Collection Renderer
 */
export function Props() {
  return (
    <group name="props">
      {PROPS_DATA.map((propData) => (
        <PropItem key={propData.id} data={propData} />
      ))}
    </group>
  );
}

export default Props;
