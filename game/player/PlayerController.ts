import { PLAYER_CONFIG } from './PlayerConfig';
import { CollisionSystem } from '../physics/CollisionSystem';
import { InputState } from './PlayerInput';

export class PlayerController {
  // World State Variables
  public position: [number, number, number] = [...PLAYER_CONFIG.SPAWN_POSITION];
  public velocity: [number, number, number] = [0, 0, 0];
  public rotationY: number = PLAYER_CONFIG.SPAWN_ROTATION_Y;
  public isGrounded = true;

  private targetRotationY: number = PLAYER_CONFIG.SPAWN_ROTATION_Y;

  /**
   * Primary Player Physics & Movement Update Step.
   * Executed inside useFrame.
   */
  public update(delta: number, input: InputState, cameraYaw: number) {
    const dt = Math.min(delta, 0.1);

    // 1. Calculate Local Input Direction (Forward/Backward, Left/Right)
    let fwd = 0; // +1 = forward (W), -1 = backward (S)
    let side = 0; // +1 = right (D), -1 = left (A)

    if (input.forward) fwd += 1;
    if (input.backward) fwd -= 1;
    if (input.right) side += 1;
    if (input.left) side -= 1;

    // Normalize diagonal input vector
    const length = Math.sqrt(fwd * fwd + side * side);
    const hasInput = length > 0.001;

    let moveX = 0;
    let moveZ = 0;

    if (hasInput) {
      const normFwd = fwd / length;
      const normSide = side / length;

      // Transform local input to world space using Camera Yaw orientation
      const sinYaw = Math.sin(cameraYaw);
      const cosYaw = Math.cos(cameraYaw);

      // Camera view direction: (sinYaw, cosYaw), Camera right direction: (cosYaw, -sinYaw)
      moveX = normFwd * sinYaw + normSide * cosYaw;
      moveZ = normFwd * cosYaw - normSide * sinYaw;
    }

    // 2. Target Speed (Sprint vs Walk)
    const currentSpeed = input.sprint
      ? PLAYER_CONFIG.SPRINT_SPEED
      : PLAYER_CONFIG.WALK_SPEED;

    const targetVelX = hasInput ? moveX * currentSpeed : 0;
    const targetVelZ = hasInput ? moveZ * currentSpeed : 0;

    // 3. Smooth Acceleration / Deceleration
    const lerpRate = hasInput
      ? PLAYER_CONFIG.ACCELERATION
      : PLAYER_CONFIG.DECELERATION;

    this.velocity[0] += (targetVelX - this.velocity[0]) * Math.min(1, dt * lerpRate);
    this.velocity[2] += (targetVelZ - this.velocity[2]) * Math.min(1, dt * lerpRate);

    // 4. Jump Impulse & Airborne Gravity
    if (input.jump && this.isGrounded) {
      this.velocity[1] = PLAYER_CONFIG.JUMP_FORCE;
      this.isGrounded = false;
    }

    if (!this.isGrounded) {
      this.velocity[1] += PLAYER_CONFIG.GRAVITY * dt;
    }

    // 5. Apply Velocity to Position
    this.position[0] += this.velocity[0] * dt;
    this.position[1] += this.velocity[1] * dt;
    this.position[2] += this.velocity[2] * dt;

    // 6. Resolve Building AABB Collision & World Bounds
    const collisionResult = CollisionSystem.resolveCollision(
      this.position,
      PLAYER_CONFIG.RADIUS
    );

    this.position = collisionResult.position;
    this.isGrounded = collisionResult.isGrounded;

    if (this.isGrounded && this.velocity[1] < 0) {
      this.velocity[1] = 0;
    }

    // 7. Smooth Character Facing Rotation
    if (hasInput) {
      this.targetRotationY = Math.atan2(moveX, moveZ);

      let angleDiff = this.targetRotationY - this.rotationY;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

      this.rotationY += angleDiff * Math.min(1, dt * PLAYER_CONFIG.ROTATION_SPEED);
    }
  }
}

export default PlayerController;
