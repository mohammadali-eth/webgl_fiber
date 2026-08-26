import { CITY_CONFIG } from './constants';

export type BuildingStyle =
  | 'tower'
  | 'stepped'
  | 'block'
  | 'small'
  | 'wide'
  | 'dual_spire'
  | 'landmark';

export interface BuildingData {
  id: string;
  position: [number, number, number];
  width: number;
  depth: number;
  height: number;
  style: BuildingStyle;
  color?: string;
  accentColor?: string;
  hasWindows?: boolean;
  hasRoofDetails?: boolean;
}

export interface StreetLightData {
  id: string;
  position: [number, number, number];
  rotationY: number;
}

export interface PropData {
  id: string;
  type: 'tree' | 'bench' | 'sign' | 'barrier';
  position: [number, number, number];
  rotationY?: number;
  scale?: [number, number, number];
}

export interface RoadSegment {
  id: string;
  position: [number, number, number];
  size: [number, number]; // [width, depth]
  isHorizontal: boolean;
}

// 1. Central Landmark Tower Configuration
export const CENTRAL_LANDMARK: BuildingData = {
  id: 'landmark-tower-01',
  position: [0, 0, 0],
  width: 14,
  depth: 14,
  height: 64,
  style: 'landmark',
  color: CITY_CONFIG.COLORS.LANDMARK_PRIMARY,
  accentColor: CITY_CONFIG.COLORS.LANDMARK_EMISSIVE,
  hasWindows: true,
  hasRoofDetails: true,
};

// 2. City Buildings Layout Data (Deterministic Blockout)
export const BUILDINGS_DATA: BuildingData[] = [
  // --- North Block (X: 0, Z: -48) ---
  {
    id: 'bld-n-1',
    position: [-10, 0, -48],
    width: 12,
    depth: 12,
    height: 38,
    style: 'tower',
    accentColor: '#38bdf8',
    hasWindows: true,
    hasRoofDetails: true,
  },
  {
    id: 'bld-n-2',
    position: [10, 0, -48],
    width: 10,
    depth: 12,
    height: 26,
    style: 'stepped',
    accentColor: '#fbbf24',
    hasWindows: true,
  },

  // --- South Block (X: 0, Z: 48) ---
  {
    id: 'bld-s-1',
    position: [-9, 0, 48],
    width: 14,
    depth: 10,
    height: 44,
    style: 'dual_spire',
    accentColor: '#818cf8',
    hasWindows: true,
    hasRoofDetails: true,
  },
  {
    id: 'bld-s-2',
    position: [9, 0, 48],
    width: 10,
    depth: 12,
    height: 20,
    style: 'block',
    hasWindows: true,
  },

  // --- East Block (X: 48, Z: 0) ---
  {
    id: 'bld-e-1',
    position: [48, 0, -10],
    width: 12,
    depth: 12,
    height: 48,
    style: 'tower',
    accentColor: '#38bdf8',
    hasWindows: true,
    hasRoofDetails: true,
  },
  {
    id: 'bld-e-2',
    position: [48, 0, 10],
    width: 12,
    depth: 10,
    height: 22,
    style: 'wide',
    accentColor: '#34d399',
    hasWindows: true,
  },

  // --- West Block (X: -48, Z: 0) ---
  {
    id: 'bld-w-1',
    position: [-48, 0, -9],
    width: 14,
    depth: 12,
    height: 32,
    style: 'stepped',
    accentColor: '#f43f5e',
    hasWindows: true,
  },
  {
    id: 'bld-w-2',
    position: [-48, 0, 10],
    width: 10,
    depth: 10,
    height: 18,
    style: 'small',
    hasWindows: true,
  },

  // --- North-East Block (X: 48, Z: -48) ---
  {
    id: 'bld-ne-1',
    position: [42, 0, -42],
    width: 12,
    depth: 12,
    height: 30,
    style: 'block',
    hasWindows: true,
  },
  {
    id: 'bld-ne-2',
    position: [54, 0, -54],
    width: 10,
    depth: 10,
    height: 40,
    style: 'tower',
    accentColor: '#a78bfa',
    hasWindows: true,
  },

  // --- North-West Block (X: -48, Z: -48) ---
  {
    id: 'bld-nw-1',
    position: [-42, 0, -42],
    width: 12,
    depth: 12,
    height: 34,
    style: 'dual_spire',
    accentColor: '#38bdf8',
    hasWindows: true,
  },
  {
    id: 'bld-nw-2',
    position: [-54, 0, -54],
    width: 10,
    depth: 10,
    height: 16,
    style: 'small',
    hasWindows: true,
  },

  // --- South-East Block (X: 48, Z: 48) ---
  {
    id: 'bld-se-1',
    position: [44, 0, 44],
    width: 14,
    depth: 14,
    height: 28,
    style: 'wide',
    accentColor: '#fbbf24',
    hasWindows: true,
  },

  // --- South-West Block (X: -48, Z: 48) ---
  {
    id: 'bld-sw-1',
    position: [-44, 0, 44],
    width: 12,
    depth: 12,
    height: 36,
    style: 'stepped',
    accentColor: '#f43f5e',
    hasWindows: true,
  },
];

// 3. Street Lights Placement along Road Edges
export const STREET_LIGHTS_DATA: StreetLightData[] = [
  // Central X-Axis Main Road (Z = -7 & Z = 7)
  { id: 'sl-x-1', position: [-60, 0, -7], rotationY: 0 },
  { id: 'sl-x-2', position: [-36, 0, -7], rotationY: 0 },
  { id: 'sl-x-3', position: [-18, 0, -7], rotationY: 0 },
  { id: 'sl-x-4', position: [18, 0, -7], rotationY: 0 },
  { id: 'sl-x-5', position: [36, 0, -7], rotationY: 0 },
  { id: 'sl-x-6', position: [60, 0, -7], rotationY: 0 },

  { id: 'sl-x-7', position: [-60, 0, 7], rotationY: Math.PI },
  { id: 'sl-x-8', position: [-36, 0, 7], rotationY: Math.PI },
  { id: 'sl-x-9', position: [-18, 0, 7], rotationY: Math.PI },
  { id: 'sl-x-10', position: [18, 0, 7], rotationY: Math.PI },
  { id: 'sl-x-11', position: [36, 0, 7], rotationY: Math.PI },
  { id: 'sl-x-12', position: [60, 0, 7], rotationY: Math.PI },

  // Central Z-Axis Main Road (X = -7 & X = 7)
  { id: 'sl-z-1', position: [-7, 0, -60], rotationY: Math.PI / 2 },
  { id: 'sl-z-2', position: [-7, 0, -36], rotationY: Math.PI / 2 },
  { id: 'sl-z-3', position: [-7, 0, -18], rotationY: Math.PI / 2 },
  { id: 'sl-z-4', position: [-7, 0, 18], rotationY: Math.PI / 2 },
  { id: 'sl-z-5', position: [-7, 0, 36], rotationY: Math.PI / 2 },
  { id: 'sl-z-6', position: [-7, 0, 60], rotationY: Math.PI / 2 },

  { id: 'sl-z-7', position: [7, 0, -60], rotationY: -Math.PI / 2 },
  { id: 'sl-z-8', position: [7, 0, -36], rotationY: -Math.PI / 2 },
  { id: 'sl-z-9', position: [7, 0, -18], rotationY: -Math.PI / 2 },
  { id: 'sl-z-10', position: [7, 0, 18], rotationY: -Math.PI / 2 },
  { id: 'sl-z-11', position: [7, 0, 36], rotationY: -Math.PI / 2 },
  { id: 'sl-z-12', position: [7, 0, 60], rotationY: -Math.PI / 2 },
];

// 4. Props Data (Trees, Benches, Signs, Barriers)
export const PROPS_DATA: PropData[] = [
  // Trees along sidewalks
  { id: 'tree-1', type: 'tree', position: [-22, 0, -9] },
  { id: 'tree-2', type: 'tree', position: [-28, 0, -9] },
  { id: 'tree-3', type: 'tree', position: [22, 0, -9] },
  { id: 'tree-4', type: 'tree', position: [28, 0, -9] },
  { id: 'tree-5', type: 'tree', position: [-22, 0, 9] },
  { id: 'tree-6', type: 'tree', position: [22, 0, 9] },
  { id: 'tree-7', type: 'tree', position: [-9, 0, -22] },
  { id: 'tree-8', type: 'tree', position: [9, 0, -22] },

  // Benches on plaza sidewalks
  { id: 'bench-1', type: 'bench', position: [-14, 0, -9], rotationY: 0 },
  { id: 'bench-2', type: 'bench', position: [14, 0, -9], rotationY: 0 },
  { id: 'bench-3', type: 'bench', position: [-14, 0, 9], rotationY: Math.PI },
  { id: 'bench-4', type: 'bench', position: [14, 0, 9], rotationY: Math.PI },

  // Digital Signs / Holo Pedestals
  {
    id: 'sign-1',
    type: 'sign',
    position: [-10, 0, -10],
    rotationY: Math.PI / 4,
  },
  {
    id: 'sign-2',
    type: 'sign',
    position: [10, 0, 10],
    rotationY: -Math.PI / 4,
  },

  // Road Barriers near intersections
  { id: 'barrier-1', type: 'barrier', position: [-8, 0, -28] },
  { id: 'barrier-2', type: 'barrier', position: [8, 0, -28] },
  { id: 'barrier-3', type: 'barrier', position: [-8, 0, 28] },
  { id: 'barrier-4', type: 'barrier', position: [8, 0, 28] },
];
