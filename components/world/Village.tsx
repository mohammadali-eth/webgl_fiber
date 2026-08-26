"use client";

import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function Village() {
  const { scene } = useGLTF("/models/village.glb");

  // Clone scene while preserving ALL original materials, textures, and colors untouched
  const preservedScene = useMemo(() => {
    const clone = scene.clone(true);
    
    // Freeze static world transform matrix updates for maximum performance
    clone.matrixAutoUpdate = false;
    clone.updateMatrix();

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        mesh.frustumCulled = true;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Preserve original GLB materials & ensure texture encoding is sRGB
        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((mat) => {
            const stdMat = mat as THREE.MeshStandardMaterial;
            if (stdMat.map) {
              stdMat.map.colorSpace = THREE.SRGBColorSpace;
              stdMat.map.needsUpdate = true;
            }
            // For foliage, leaves, flowers, and water, ensure proper alpha test/transparency
            const alphaMode = (mat as any).alphaMode;
            const matName = mat.name.toLowerCase();
            if (
              alphaMode === "MASK" ||
              alphaMode === "BLEND" ||
              matName.includes("leaf") ||
              matName.includes("leaves") ||
              matName.includes("grass") ||
              matName.includes("flower")
            ) {
              stdMat.alphaTest = 0.35;
              stdMat.transparent = true;
              stdMat.depthWrite = true;
            }
            mat.needsUpdate = true;
          });
        }
      }
    });

    return clone;
  }, [scene]);

  return (
    <group position={[0, 0, 0]} scale={[20, 20, 20]}>
      <primitive object={preservedScene} />
    </group>
  );
}

useGLTF.preload("/models/village.glb");
