'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CAMERA_CONFIG } from './CameraConfig';

interface GameCameraProps {
  playerPosition: [number, number, number];
  mouseDelta: { x: number; y: number };
  isPointerLocked: boolean;
  onYawChange?: (yaw: number) => void;
}

/**
 * Third-Person Game Camera Component.
 * Smoothly follows player position, updates pitch/yaw from mouse movement,
 * and maintains look-at targeting without object allocations inside useFrame.
 */
export function GameCamera({
  playerPosition,
  mouseDelta,
  isPointerLocked,
  onYawChange,
}: GameCameraProps) {
  const { camera } = useThree();

  // Internal Angles State
  const yawRef = useRef<number>(0);
  const pitchRef = useRef<number>(Math.PI / 12); // Slightly looking down by default

  // Temporary Math Vectors to avoid per-frame allocation
  const targetCamPos = useRef(new THREE.Vector3());
  const currentCamPos = useRef(new THREE.Vector3());
  const lookTarget = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);

    // 1. Consume Mouse Input when Pointer Lock is Active
    if (isPointerLocked) {
      yawRef.current -= mouseDelta.x * CAMERA_CONFIG.MOUSE_SENSITIVITY_X;
      pitchRef.current += mouseDelta.y * CAMERA_CONFIG.MOUSE_SENSITIVITY_Y;

      // Clamp Pitch within Safe Limits
      pitchRef.current = Math.max(
        CAMERA_CONFIG.MIN_PITCH,
        Math.min(CAMERA_CONFIG.MAX_PITCH, pitchRef.current)
      );

      // Notify parent of updated yaw for movement calculation
      if (onYawChange) {
        onYawChange(yawRef.current);
      }
    }

    const yaw = yawRef.current;
    const pitch = pitchRef.current;
    const [px, py, pz] = playerPosition;

    // 2. Calculate Target Camera Orbit Position
    const cosPitch = Math.cos(pitch);
    const sinPitch = Math.sin(pitch);
    const sinYaw = Math.sin(yaw);
    const cosYaw = Math.cos(yaw);

    const dist = CAMERA_CONFIG.DISTANCE;
    const camHeight = CAMERA_CONFIG.HEIGHT;

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

    // 4. Calculate Smooth Look-At Target (Player Upper Torso / Head)
    lookTarget.current.set(px, py + CAMERA_CONFIG.LOOK_AT_OFFSET_Y, pz);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

export default GameCamera;
