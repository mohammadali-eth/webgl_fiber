'use client';

import { PerspectiveCamera } from '@react-three/drei';

interface CameraProps {
  position?: [number, number, number];
  fov?: number;
}

/**
 * Modular Camera component configured with perspective projection suitable
 * for future third-person / first-person city exploration.
 */
export function Camera({ position = [0, 5, 10], fov = 60 }: CameraProps) {
  return (
    <PerspectiveCamera
      makeDefault
      position={position}
      fov={fov}
      near={0.1}
      far={1000}
    />
  );
}

export default Camera;
