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
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);

  // Reusable vector refs for zero allocations in render loop
  const currentCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 24, 32));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 3, 0));

  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3());
  const charPosVec = useRef<THREE.Vector3>(new THREE.Vector3());

  useFrame((state, delta) => {
    charPosVec.current.set(...characterPosition);

    // Initial Establishing Overview Camera at Intro (progress < 0.05)
    if (scrollProgress < 0.05) {
      targetCamPos.current.set(0, 22, 30);
      targetLookAt.current.set(0, 4, 0);
    } 
    // Focused House View when stationary at a destination
    else if (!isCharacterWalking && activeDestination && activeDestination.cameraPosition && activeDestination.cameraTarget) {
      targetCamPos.current.set(...activeDestination.cameraPosition);
      targetLookAt.current.set(...activeDestination.cameraTarget);
    } 
    // Third-person cinematic follow mode during walking/traveling
    else {
      const distanceBehind = 5.2;
      const heightAbove = 2.6;

      const offsetX = Math.sin(characterRotation) * distanceBehind;
      const offsetZ = Math.cos(characterRotation) * distanceBehind;

      targetCamPos.current.set(
        charPosVec.current.x - offsetX,
        charPosVec.current.y + heightAbove,
        charPosVec.current.z - offsetZ
      );

      const lookAhead = 1.5;
      const lookX = Math.sin(characterRotation) * lookAhead;
      const lookZ = Math.cos(characterRotation) * lookAhead;

      targetLookAt.current.set(
        charPosVec.current.x + lookX,
        charPosVec.current.y + 1.4,
        charPosVec.current.z + lookZ
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
