"use client";

import React, { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { VILLAGE_ROUTE } from "@/data/destinations";

export function Character() {
  const { scene } = useGLTF("/models/character.glb");
  const groupRef = useRef<THREE.Group>(null);
  const meshGroupRef = useRef<THREE.Group>(null);

  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const setCharacterState = usePortfolioStore((state) => state.setCharacterState);
  const setActiveDestination = usePortfolioStore((state) => state.setActiveDestination);
  const setCurrentWaypointIndex = usePortfolioStore((state) => state.setCurrentWaypointIndex);
  const setActivePanel = usePortfolioStore((state) => state.setActivePanel);

  // Clone character model cleanly
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  // Pre-calculate smooth Catmull-Rom route spline through village waypoints
  const routeCurve = useMemo(() => {
    const points = VILLAGE_ROUTE.map((wp) => new THREE.Vector3(...wp.position));
    return new THREE.CatmullRomCurve3(points, false, "centripetal", 0.5);
  }, []);

  // Persistent reusable vector objects for zero-allocation useFrame render loop
  const currentPos = useRef<THREE.Vector3>(new THREE.Vector3(...VILLAGE_ROUTE[0].position));
  const targetPos = useRef<THREE.Vector3>(new THREE.Vector3(...VILLAGE_ROUTE[0].position));
  const prevPos = useRef<THREE.Vector3>(new THREE.Vector3(...VILLAGE_ROUTE[0].position));
  const tangentVec = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, -1));
  const lookAtDir = useRef<THREE.Vector3>(new THREE.Vector3());

  const currentYaw = useRef<number>(0);
  const smoothProgress = useRef<number>(0);
  const lastActiveWpIndex = useRef<number>(-1);
  const lastIsWalking = useRef<boolean>(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smoothly interpolate progress along route
    smoothProgress.current = THREE.MathUtils.lerp(smoothProgress.current, scrollProgress, Math.min(delta * 6, 1));
    const t = Math.max(0, Math.min(1, smoothProgress.current));

    // Get point and tangent on route curve
    routeCurve.getPointAt(t, targetPos.current);
    routeCurve.getTangentAt(t, tangentVec.current);
    tangentVec.current.normalize();

    // Movement calculation
    prevPos.current.copy(currentPos.current);
    currentPos.current.lerp(targetPos.current, Math.min(delta * 8, 1));

    const distMoved = prevPos.current.distanceTo(currentPos.current);
    const speed = distMoved / Math.max(delta, 0.001);
    const isWalking = speed > 0.04;

    // Determine nearest waypoint
    let activeWpIndex = 0;
    let minWpDist = Infinity;
    for (let i = 0; i < VILLAGE_ROUTE.length; i++) {
      const wp = VILLAGE_ROUTE[i];
      const d = Math.hypot(
        currentPos.current.x - wp.position[0],
        currentPos.current.z - wp.position[2]
      );
      if (d < minWpDist) {
        minWpDist = d;
        activeWpIndex = i;
      }
    }

    const currentWp = VILLAGE_ROUTE[activeWpIndex];

    // Determine target yaw angle
    let targetYaw = Math.atan2(tangentVec.current.x, tangentVec.current.z);

    if (!isWalking && currentWp.lookAt && minWpDist < 2.5) {
      lookAtDir.current.set(
        currentWp.lookAt[0] - currentPos.current.x,
        0,
        currentWp.lookAt[2] - currentPos.current.z
      );
      targetYaw = Math.atan2(lookAtDir.current.x, lookAtDir.current.z);
    }

    // Smooth angle interpolation
    let angleDiff = targetYaw - currentYaw.current;
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    currentYaw.current += angleDiff * Math.min(delta * 7, 1);

    // Apply root position & orientation
    groupRef.current.position.copy(currentPos.current);
    groupRef.current.rotation.y = currentYaw.current;

    // Procedural walk & idle animation on sub-mesh
    const clockTime = state.clock.getElapsedTime();
    if (meshGroupRef.current) {
      if (isWalking) {
        const bounceY = Math.abs(Math.sin(clockTime * 14)) * 0.12;
        const rollZ = Math.sin(clockTime * 7) * 0.05;
        meshGroupRef.current.position.y = bounceY;
        meshGroupRef.current.rotation.z = rollZ;
        meshGroupRef.current.rotation.x = 0.04;
      } else {
        const breathY = Math.sin(clockTime * 2.5) * 0.03;
        meshGroupRef.current.position.y = breathY;
        meshGroupRef.current.rotation.z = THREE.MathUtils.lerp(meshGroupRef.current.rotation.z, 0, delta * 5);
        meshGroupRef.current.rotation.x = THREE.MathUtils.lerp(meshGroupRef.current.rotation.x, 0, delta * 5);
      }
    }

    // State Synchronization Throttled (ONLY update Zustand when waypoint or walk state changes)
    if (activeWpIndex !== lastActiveWpIndex.current || isWalking !== lastIsWalking.current) {
      lastActiveWpIndex.current = activeWpIndex;
      lastIsWalking.current = isWalking;

      setCurrentWaypointIndex(activeWpIndex);
      setActiveDestination(currentWp);
      setCharacterState(
        [currentPos.current.x, currentPos.current.y, currentPos.current.z],
        currentYaw.current,
        isWalking
      );

      // Trigger overlay modal when at House 1 ("about")
      if (currentWp.sectionId === "about" && minWpDist < 2.0 && !isWalking) {
        setActivePanel("about");
      } else if (isWalking && minWpDist > 3.0) {
        setActivePanel(null);
      }
    }
  });

  return (
    <group ref={groupRef} position={VILLAGE_ROUTE[0].position}>
      {/* Human scale calibration [0.055, 0.055, 0.055] */}
      <group ref={meshGroupRef} scale={[0.055, 0.055, 0.055]}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

useGLTF.preload("/models/character.glb");
