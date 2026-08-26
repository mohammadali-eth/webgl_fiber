'use client';

import React, { useMemo } from 'react';
import { CITY_CONFIG } from '@/lib/city/constants';
import {
  BUILDINGS_DATA,
  CENTRAL_LANDMARK,
  BuildingData,
} from '@/lib/city/cityData';

interface SingleBuildingProps {
  data: BuildingData;
}

/**
 * Procedural Single Building Renderer
 * Supports multiple archetypes (Tower, Stepped, Dual-Spire, Wide, Block, Small, Landmark)
 */
function Building({ data }: SingleBuildingProps) {
  const {
    position: [x, , z],
    width,
    depth,
    height,
    style,
    color = CITY_CONFIG.COLORS.BUILDING_PRIMARY,
    accentColor = CITY_CONFIG.COLORS.WINDOW_EMISSIVE_ON,
    hasWindows = true,
    hasRoofDetails = false,
  } = data;

  const posY = height / 2 + CITY_CONFIG.SIDEWALK_HEIGHT;

  // Compute instanced/procedural window matrix positions
  const windowRows = useMemo(() => Math.floor(height / 4), [height]);
  const windowCols = useMemo(() => Math.floor(width / 3), [width]);

  return (
    <group position={[x, 0, z]}>
      {/* --- ARCHETYPE 1: CENTRAL LANDMARK TOWER --- */}
      {style === 'landmark' && (
        <group position={[0, posY, 0]}>
          {/* Base Lower Tier */}
          <mesh castShadow receiveShadow position={[0, -height * 0.25, 0]}>
            <boxGeometry args={[width, height * 0.5, depth]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
          </mesh>

          {/* Middle Sleek Tier */}
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <boxGeometry args={[width * 0.8, height * 0.5, depth * 0.8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>

          {/* Upper Crown Tier */}
          <mesh castShadow receiveShadow position={[0, height * 0.35, 0]}>
            <boxGeometry args={[width * 0.6, height * 0.2, depth * 0.6]} />
            <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.9} />
          </mesh>

          {/* Vertical Glowing Emissive Core Ribs */}
          {[-1, 1].map((dirX) => (
            <mesh
              key={`landmark-rib-${dirX}`}
              position={[dirX * (width * 0.41), 0, 0]}
            >
              <boxGeometry args={[0.3, height * 0.9, depth * 0.82]} />
              <meshStandardMaterial
                color={accentColor}
                emissive={accentColor}
                emissiveIntensity={1.2}
              />
            </mesh>
          ))}

          {/* Central Top Spire */}
          <mesh position={[0, height * 0.6, 0]}>
            <cylinderGeometry args={[0.2, 1.2, 16, 8]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      )}

      {/* --- ARCHETYPE 2: DUAL-SPIRE CYBER BLOCK --- */}
      {style === 'dual_spire' && (
        <group position={[0, posY, 0]}>
          {/* Main Body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} />
          </mesh>

          {/* Dual Spires */}
          {[-width * 0.3, width * 0.3].map((spireX, idx) => (
            <group key={`spire-${idx}`} position={[spireX, height * 0.5 + 4, 0]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.3, 0.8, 8, 6]} />
                <meshStandardMaterial color="#3f3f46" roughness={0.3} metalness={0.8} />
              </mesh>
              <mesh position={[0, 4.5, 0]}>
                <sphereGeometry args={[0.4, 8, 8]} />
                <meshStandardMaterial
                  color={accentColor}
                  emissive={accentColor}
                  emissiveIntensity={1.5}
                />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* --- ARCHETYPE 3: STEPPED TOWER --- */}
      {style === 'stepped' && (
        <group position={[0, posY, 0]}>
          {/* Bottom Block */}
          <mesh castShadow receiveShadow position={[0, -height * 0.25, 0]}>
            <boxGeometry args={[width, height * 0.5, depth]} />
            <meshStandardMaterial color={color} roughness={0.5} metalness={0.4} />
          </mesh>
          {/* Middle Step */}
          <mesh castShadow receiveShadow position={[0, height * 0.15, 0]}>
            <boxGeometry args={[width * 0.8, height * 0.3, depth * 0.8]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.5} />
          </mesh>
          {/* Top Step */}
          <mesh castShadow receiveShadow position={[0, height * 0.4, 0]}>
            <boxGeometry args={[width * 0.5, height * 0.2, depth * 0.5]} />
            <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.6} />
          </mesh>
        </group>
      )}

      {/* --- ARCHETYPE 4: STANDARD TOWER / BLOCK / WIDE / SMALL --- */}
      {(style === 'tower' ||
        style === 'block' ||
        style === 'wide' ||
        style === 'small') && (
        <group position={[0, posY, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial color={color} roughness={0.4} metalness={0.5} />
          </mesh>

          {/* Emissive Corner Accents */}
          {accentColor && (
            <mesh position={[0, height * 0.48, depth / 2 + 0.05]}>
              <boxGeometry args={[width * 0.8, 0.4, 0.1]} />
              <meshStandardMaterial
                color={accentColor}
                emissive={accentColor}
                emissiveIntensity={0.8}
              />
            </mesh>
          )}
        </group>
      )}

      {/* --- PROCEDURAL WINDOW PANELS --- */}
      {hasWindows && windowRows > 1 && windowCols > 0 && (
        <group position={[0, posY, 0]}>
          {/* Front & Back Window Arrays */}
          {[-depth / 2 - 0.05, depth / 2 + 0.05].map((zOffset, zIdx) => (
            <group key={`win-fb-${zIdx}`} position={[0, 0, zOffset]}>
              {Array.from({ length: Math.min(windowRows, 8) }).map((_, rIdx) => {
                const winY = (rIdx / (Math.min(windowRows, 8) - 1 || 1) - 0.5) * (height * 0.7);
                const isLit = (rIdx + zIdx + Math.floor(width)) % 2 === 0;
                return (
                  <mesh key={`row-${rIdx}`} position={[0, winY, 0]}>
                    <planeGeometry args={[width * 0.7, 0.6]} />
                    <meshStandardMaterial
                      color={isLit ? accentColor : '#0f172a'}
                      emissive={isLit ? accentColor : '#000000'}
                      emissiveIntensity={isLit ? 0.9 : 0}
                    />
                  </mesh>
                );
              })}
            </group>
          ))}
        </group>
      )}

      {/* --- ROOFTOP DETAILS (HVAC / Helipad / Antennas) --- */}
      {hasRoofDetails && (
        <group position={[0, height + CITY_CONFIG.SIDEWALK_HEIGHT + 1, 0]}>
          {/* HVAC Unit */}
          <mesh castShadow position={[-width * 0.25, 0, 0]}>
            <boxGeometry args={[2, 1.5, 2]} />
            <meshStandardMaterial color="#475569" roughness={0.8} />
          </mesh>
          {/* Antenna */}
          <mesh castShadow position={[width * 0.25, 2, 0]}>
            <cylinderGeometry args={[0.08, 0.15, 4]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} />
          </mesh>
        </group>
      )}
    </group>
  );
}

/**
 * Master Buildings Collection Renderer
 */
export function Buildings() {
  return (
    <group name="buildings">
      {/* Central Landmark Tower */}
      <Building data={CENTRAL_LANDMARK} />

      {/* City Blockout Buildings */}
      {BUILDINGS_DATA.map((buildingData) => (
        <Building key={buildingData.id} data={buildingData} />
      ))}
    </group>
  );
}

export default Buildings;
