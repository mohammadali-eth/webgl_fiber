'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { PlayerInput } from './PlayerInput';
import { PlayerController } from './PlayerController';
import GameCamera from '../camera/GameCamera';
import { InteractionSystem } from '../interaction/InteractionSystem';
import { PlayerState } from './PlayerState';
import { PLAYER_CONFIG } from './PlayerConfig';

interface PlayerProps {
  onPointerLockChange?: (locked: boolean) => void;
}

/**
 * Main Player Component integrating character placeholder rendering,
 * input processing, physics movement, camera follow, and interaction.
 */
export function Player({ onPointerLockChange }: PlayerProps) {
  const groupRef = useRef<Group>(null!);

  // Persistent Input & Controller Instances
  const [input] = useState(() => new PlayerInput());
  const [controller] = useState(() => new PlayerController());

  // Camera Yaw state for movement calculation
  const cameraYawRef = useRef<number>(PLAYER_CONFIG.SPAWN_ROTATION_Y);

  // Bind Pointer Lock & Interaction Callbacks
  useEffect(() => {
    input.setPointerLockCallback((locked) => {
      PlayerState.setStatus(locked ? 'PLAYING' : 'PAUSED');
      if (onPointerLockChange) onPointerLockChange(locked);
    });

    input.setInteractCallback(() => {
      InteractionSystem.triggerInteraction();
    });

    return () => {
      input.dispose();
    };
  }, [input, onPointerLockChange]);

  // Main Frame Loop Update
  useFrame((_, delta) => {
    // 1. Consume Mouse Delta
    const mouseDelta = input.consumeMouseDelta();

    // 2. Update Controller Physics & Position
    controller.update(delta, input.keys, cameraYawRef.current);

    // 3. Update Player Mesh Transform
    if (groupRef.current) {
      const [px, py, pz] = controller.position;
      groupRef.current.position.set(px, py, pz);
      groupRef.current.rotation.y = controller.rotationY;
    }

    // 4. Update Interaction Proximity Check
    InteractionSystem.update(controller.position);

    // 5. Update Telemetry for Debug Mode
    PlayerState.telemetry.position = [...controller.position];
    PlayerState.telemetry.velocity = [...controller.velocity];
    PlayerState.telemetry.speed = Math.sqrt(
      controller.velocity[0] ** 2 + controller.velocity[2] ** 2
    );
    PlayerState.telemetry.isGrounded = controller.isGrounded;
    PlayerState.telemetry.isSprinting = input.keys.sprint;
    PlayerState.isDebugEnabled = input.isDebugActive;
  });

  return (
    <>
      {/* Third-Person Game Camera */}
      <GameCamera
        playerPosition={controller.position}
        mouseDelta={input.consumeMouseDelta()}
        isPointerLocked={input.isPointerLocked}
        onYawChange={(yaw) => {
          cameraYawRef.current = yaw;
        }}
      />

      {/* Development Player Mesh Representation (Capsule + Visor) */}
      <group ref={groupRef} position={PLAYER_CONFIG.SPAWN_POSITION}>
        {/* Capsule Torso */}
        <mesh castShadow receiveShadow position={[0, 0.9, 0]}>
          <capsuleGeometry args={[0.4, 0.9, 8, 16]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Futuristic Emissive Visor Accent */}
        <mesh position={[0, 1.4, 0.35]}>
          <boxGeometry args={[0.5, 0.12, 0.15]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.8}
          />
        </mesh>

        {/* Base Shadow Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[0.2, 0.5, 16]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.4} />
        </mesh>
      </group>
    </>
  );
}

export default Player;
