/**
 * ALIDEV Phase 03 — Player Configuration Constants
 * Centralized movement, physics, and spawn settings.
 */

export const PLAYER_CONFIG = {
  // Movement Speeds
  WALK_SPEED: 8.0,
  SPRINT_SPEED: 14.0,
  ACCELERATION: 16.0,
  DECELERATION: 18.0,
  ROTATION_SPEED: 12.0,

  // Jump & Gravity Physics
  JUMP_FORCE: 11.5,
  GRAVITY: -28.0,
  GROUND_Y: 0.2, // Elevation of city sidewalks

  // Player Geometry & Collision Bounds
  RADIUS: 0.6,
  HEIGHT: 1.8,

  // Default City Spawn Point (South Plaza Avenue, clear of buildings)
  SPAWN_POSITION: [0, 0.2, 22] as [number, number, number],
  SPAWN_ROTATION_Y: Math.PI,
} as const;

export default PLAYER_CONFIG;
