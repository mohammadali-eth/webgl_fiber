"use client";

import React, { useRef, useMemo, useEffect } from "react";
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

  // Clone character scene
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

  // Create smooth Catmull-Rom route spline through village waypoints
  const routeCurve = useMemo(() => {
    const points = VILLAGE_ROUTE.map((wp) => new THREE.Vector3(...wp.position));
    return new THREE.CatmullRomCurve3(points, false, "centripetal", 0.5);
  }, []);

  // Internal state tracking for physics & smooth rotation
  const currentPos = useRef<THREE.Vector3>(new THREE.Vector3(...VILLAGE_ROUTE[0].position));
  const targetPos = useRef<THREE.Vector3>(new THREE.Vector3(...VILLAGE_ROUTE[0].position));
  const currentYaw = useRef<number>(0);

  // Target scroll progress lerper for super smooth continuous movement
  const smoothProgress = useRef<number>(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smoothly interpolate progress
    smoothProgress.current = THREE.MathUtils.lerp(smoothProgress.current, scrollProgress, Math.min(delta * 6, 1));

    const t = Math.max(0, Math.min(1, smoothProgress.current));

    // Get point on route curve
    routeCurve.getPointAt(t, targetPos.current);

    // Calculate tangent direction for movement vector
    const tangent = routeCurve.getTangentAt(t).normalize();

    // Determine distance moved in this frame
    const prevPos = currentPos.current.clone();
    currentPos.current.lerp(targetPos.current, Math.min(delta * 8, 1));

    const speed = prevPos.distanceTo(currentPos.current) / Math.max(delta, 0.001);
    const isWalking = speed > 0.05;

    // Target yaw angle based on tangent vector (or target lookAt at waypoint stops)
    let targetYaw = Math.atan2(tangent.x, tangent.z);

    // Check closest waypoint destination
    let activeWpIndex = 0;
    let minWpDist = Infinity;
    VILLAGE_ROUTE.forEach((wp, idx) => {
      const wpPos = new THREE.Vector3(...wp.position);
      const d = currentPos.current.distanceTo(wpPos);
      if (d < minWpDist) {
        minWpDist = d;
        activeWpIndex = idx;
      }
    });

    const currentWp = VILLAGE_ROUTE[activeWpIndex];

    // If character is very close to a waypoint and stopped, orient toward waypoint lookAt
    if (!isWalking && currentWp.lookAt && minWpDist < 2.5) {
      const lookAtVec = new THREE.Vector3(...currentWp.lookAt);
      const dir = lookAtVec.sub(currentPos.current);
      targetYaw = Math.atan2(dir.x, dir.z);
    }

    // Smooth angle interpolation (handling -PI to +PI wrap)
    let angleDiff = targetYaw - currentYaw.current;
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

    currentYaw.current += angleDiff * Math.min(delta * 7, 1);

    // Apply root position & yaw rotation
    groupRef.current.position.copy(currentPos.current);
    groupRef.current.rotation.y = currentYaw.current;

    // Procedural walk & idle animation on sub-mesh group
    const clockTime = state.clock.getElapsedTime();
    if (meshGroupRef.current) {
      if (isWalking) {
        // Walk bounce (vertical oscillation)
        const bounceY = Math.abs(Math.sin(clockTime * 14)) * 0.12;
        // Roll sway
        const rollZ = Math.sin(clockTime * 7) * 0.05;
        // Forward tilt
        const pitchX = 0.04;

        meshGroupRef.current.position.y = bounceY;
        meshGroupRef.current.rotation.z = rollZ;
        meshGroupRef.current.rotation.x = pitchX;
      } else {
        // Idle breathing oscillation
        const breathY = Math.sin(clockTime * 2.5) * 0.03;
        meshGroupRef.current.position.y = breathY;
        meshGroupRef.current.rotation.z = THREE.MathUtils.lerp(meshGroupRef.current.rotation.z, 0, delta * 5);
        meshGroupRef.current.rotation.x = THREE.MathUtils.lerp(meshGroupRef.current.rotation.x, 0, delta * 5);
      }
    }

    // Update global store state
    setCharacterState(
      [currentPos.current.x, currentPos.current.y, currentPos.current.z],
      currentYaw.current,
      isWalking
    );

    setCurrentWaypointIndex(activeWpIndex);
    setActiveDestination(currentWp);

    // Trigger overlay panel when at House 1 ("about")
    if (currentWp.sectionId === "about" && minWpDist < 2.0 && !isWalking) {
      setActivePanel("about");
    } else if (isWalking && minWpDist > 3.0) {
      // Close panel when walking away
      setActivePanel(null);
    }
  });

  return (
    <group ref={groupRef} position={VILLAGE_ROUTE[0].position}>
      <group ref={meshGroupRef} scale={[0.045, 0.045, 0.045]}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

useGLTF.preload("/models/character.glb");
