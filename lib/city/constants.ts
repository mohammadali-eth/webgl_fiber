/**
 * ALIDEV City World Foundation — Grid & Architectural Constants
 * Centralized spatial parameters for the procedural 3D city layout.
 */

export const CITY_CONFIG = {
  // Grid layout geometry
  BLOCK_SIZE: 36, // Size of a single city block (width & depth)
  ROAD_WIDTH: 12, // Width of primary roads
  SIDEWALK_WIDTH: 3, // Width of sidewalks bordering roads
  SIDEWALK_HEIGHT: 0.2, // Elevation of sidewalks above ground level
  GRID_COUNT: 3, // 3x3 layout grid of city blocks

  // World Bounds
  WORLD_SIZE: 160, // Total ground plane dimension

  // Colors & Aesthetic Tokens
  COLORS: {
    GROUND: '#0d0d11',
    ROAD: '#141419',
    ROAD_MARKING: '#3b82f6',
    ROAD_LINE: '#52525b',
    SIDEWALK: '#1e1e24',
    SIDEWALK_CURB: '#27272a',
    BUILDING_PRIMARY: '#181820',
    BUILDING_SECONDARY: '#0f172a',
    BUILDING_ACCENT: '#1e293b',
    LANDMARK_PRIMARY: '#0f172a',
    LANDMARK_EMISSIVE: '#38bdf8',
    WINDOW_EMISSIVE_ON: '#38bdf8',
    WINDOW_EMISSIVE_AMBER: '#fbbf24',
    WINDOW_OFF: '#0f172a',
    STREET_LIGHT_POLE: '#3f3f46',
    STREET_LIGHT_GLOW: '#60a5fa',
    TREE_LEAF: '#10b981',
    TREE_TRUNK: '#374151',
    BENCH: '#475569',
    SIGN_EMISSIVE: '#818cf8',
  },
} as const;

export default CITY_CONFIG;
