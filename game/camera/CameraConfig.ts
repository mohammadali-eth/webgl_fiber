/**
 * ALIDEV Phase 03 — Third-Person Camera Configuration
 * Centralized settings for camera follow, pitch limits, and mouse sensitivity.
 */

export const CAMERA_CONFIG = {
  // Follow Offset Geometry
  DISTANCE: 7.5,
  HEIGHT: 2.8,
  LOOK_AT_OFFSET_Y: 1.4,

  // Mouse Control Sensitivity
  MOUSE_SENSITIVITY_X: 0.0022,
  MOUSE_SENSITIVITY_Y: 0.0018,

  // Pitch Angles (Pitch Min/Max Limits in Radians)
  MIN_PITCH: -Math.PI / 6, // -30 degrees (looking up)
  MAX_PITCH: Math.PI / 3, // 60 degrees (looking down from above)

  // Camera Interpolation & Smoothing
  POSITION_SMOOTHING: 14.0, // Higher value = tighter follow
  ROTATION_SMOOTHING: 16.0,
} as const;

export default CAMERA_CONFIG;
