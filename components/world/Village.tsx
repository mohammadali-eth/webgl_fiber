"use client";

import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function Village() {
  const { scene } = useGLTF("/models/village.glb");

  // Clone scene so R3F handles instance cleanly without mutating GLTF cache
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Enhance materials for crisp anime vibrant tones
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              mat.needsUpdate = true;
            });
          } else {
            mesh.material.needsUpdate = true;
          }
        }
      }
    });
    return clone;
  }, [scene]);

  return (
    <group position={[0, 0, 0]} scale={[20, 20, 20]}>
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload("/models/village.glb");
