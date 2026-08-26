"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function CameraController() {
  const characterPosition = usePortfolioStore((state) => state.characterPosition);
  const characterRotation = usePortfolioStore((state) => state.characterRotation);
  const isCharacterWalking = usePortfolioStore((state) => state.isCharacterWalking);
  const activeDestination = usePortfolioStore((state) => state.activeDestination);

  const currentCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 6, 26));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.5, 12));

  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3());

  useFrame((state, delta) => {
    const charPosVec = new THREE.Vector3(...characterPosition);

    // If character is stopped near a destination with explicit camera framing:
    if (!isCharacterWalking && activeDestination && activeDestination.cameraPosition && activeDestination.cameraTarget) {
      targetCamPos.current.set(...activeDestination.cameraPosition);
      targetLookAt.current.set(...activeDestination.cameraTarget);
    } else {
      // Third-person cinematic follow mode during walking
      // Offset behind character relative to character yaw
      const distanceBehind = 7.5;
      const heightAbove = 4.2;

      const offsetX = Math.sin(characterRotation) * distanceBehind;
      const offsetZ = Math.cos(characterRotation) * distanceBehind;

      targetCamPos.current.set(
        charPosVec.x - offsetX,
        charPosVec.y + heightAbove,
        charPosVec.z - offsetZ
      );

      // Target lookAt point slightly in front of character along walking direction
      const lookAhead = 2.0;
      const lookX = Math.sin(characterRotation) * lookAhead;
      const lookZ = Math.cos(characterRotation) * lookAhead;

      targetLookAt.current.set(
        charPosVec.x + lookX,
        charPosVec.y + 1.6,
        charPosVec.z + lookZ
      );
    }

    // Smooth lerp camera position and lookAt vector
    const lerpSpeed = isCharacterWalking ? 4.5 : 3.0;
    currentCamPos.current.lerp(targetCamPos.current, Math.min(delta * lerpSpeed, 1));
    currentLookAt.current.lerp(targetLookAt.current, Math.min(delta * lerpSpeed, 1));

    state.camera.position.copy(currentCamPos.current);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}
