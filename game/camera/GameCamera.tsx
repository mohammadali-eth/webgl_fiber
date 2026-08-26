'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CAMERA_CONFIG } from './CameraConfig';

interface GameCameraProps {
  playerPosition: [number, number, number];
  mouseDelta: { x: number; y: number };
  isPointerLocked: boolean;
  onCameraYawUpdate?: (yaw: number) => void;
}

/**
 * Third-Person Game Camera Component — Phase 03 Debugged & Fixed.
 * Consumes mouse deltas, clamps pitch angles between -30 deg and +60 deg,
 * smoothly follows player position, and maintains look-at targeting.
 */
export function GameCamera({
  playerPosition,
  mouseDelta,
  isPointerLocked,
  onCameraYawUpdate,
}: GameCameraProps) {
  const { camera } = useThree();

  // Internal Pitch / Yaw Angles State
  const yawRef = useRef<number>(Math.PI); // Facing North initially
  const pitchRef = useRef<number>(Math.PI / 14); // Slightly looking down from above

  // Math Vectors to avoid per-frame allocation
  const targetCamPos = useRef(new THREE.Vector3());
  const currentCamPos = useRef(new THREE.Vector3());
  const lookTarget = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);

    // 1. Update Camera Angles from Mouse Movement
    if (isPointerLocked) {
      yawRef.current -= mouseDelta.x * CAMERA_CONFIG.MOUSE_SENSITIVITY_X;
      pitchRef.current += mouseDelta.y * CAMERA_CONFIG.MOUSE_SENSITIVITY_Y;

      // Strict Pitch Clamping (-30 deg to +60 deg)
      pitchRef.current = Math.max(
        CAMERA_CONFIG.MIN_PITCH,
        Math.min(CAMERA_CONFIG.MAX_PITCH, pitchRef.current)
      );

      // Pass updated yaw to parent controller for WASD orientation
      if (onCameraYawUpdate) {
        onCameraYawUpdate(yawRef.current);
      }
    }

    const yaw = yawRef.current;
    const pitch = pitchRef.current;
    const [px, py, pz] = playerPosition;

    // 2. Calculate Orbit Target Camera Position
    const cosPitch = Math.cos(pitch);
    const sinPitch = Math.sin(pitch);
    const sinYaw = Math.sin(yaw);
    const cosYaw = Math.cos(yaw);

    const dist = CAMERA_CONFIG.DISTANCE;
    const camHeight = CAMERA_CONFIG.HEIGHT;

    // Orbit position relative to player
    const targetX = px - sinYaw * cosPitch * dist;
    const targetY = py + camHeight + sinPitch * dist;
    const targetZ = pz - cosYaw * cosPitch * dist;

    targetCamPos.current.set(targetX, targetY, targetZ);

    // 3. Smoothly Interpolate Camera Position
    currentCamPos.current.copy(camera.position);
    currentCamPos.current.lerp(
      targetCamPos.current,
      Math.min(1, dt * CAMERA_CONFIG.POSITION_SMOOTHING)
    );

    camera.position.copy(currentCamPos.current);

    // 4. Set Look-At Target (Player Upper Torso)
    lookTarget.current.set(px, py + CAMERA_CONFIG.LOOK_AT_OFFSET_Y, pz);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

export default GameCamera;
