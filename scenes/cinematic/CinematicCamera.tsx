'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CameraPath } from './CameraPath';
import { TimelineController } from './TimelineController';

/**
 * Cinematic Camera Component.
 * Evaluates smooth spline path position and look-at target based on scroll timeline progress.
 */
export function CinematicCamera() {
  const { camera } = useThree();
  const cameraPath = useMemo(() => new CameraPath(), []);
  const timeline = useMemo(() => TimelineController.getInstance(), []);

  // Pre-allocated math vectors
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const currentLook = useRef(new THREE.Vector3(0, 14, 0));

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const smoothProgress = timeline.updateSmoothProgress(dt, 5.0);

    // 1. Sample spline curves for camera position and look-at target
    cameraPath.getPositionAt(smoothProgress, targetPos.current);
    cameraPath.getLookAtAt(smoothProgress, targetLook.current);

    // 2. Smoothly update camera position
    camera.position.copy(targetPos.current);

    // 3. Smoothly lerp look-at target to eliminate camera jitter
    currentLook.current.lerp(targetLook.current, Math.min(1, dt * 6.0));
    camera.lookAt(currentLook.current);
  });

  return null;
}

export default CinematicCamera;
