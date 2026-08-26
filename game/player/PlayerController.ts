import { PLAYER_CONFIG } from './PlayerConfig';
import { CollisionSystem } from '../physics/CollisionSystem';
import { InputState } from './PlayerInput';

export class PlayerController {
  // World State Variables
  public position: [number, number, number] = [...PLAYER_CONFIG.SPAWN_POSITION];
  public velocity: [number, number, number] = [0, 0, 0];
  public rotationY: number = PLAYER_CONFIG.SPAWN_ROTATION_Y;
  public isGrounded = true;

  // Reusable Calculations
  private targetRotationY: number = PLAYER_CONFIG.SPAWN_ROTATION_Y;

  /**
   * Primary Player Physics & Movement Update Step.
   * Executed every frame inside useFrame.
   */
  public update(delta: number, input: InputState, cameraYaw: number) {
    const dt = Math.min(delta, 0.1); // Clamp delta to avoid spiral of death

    // 1. Calculate Input Direction Vectors Relative to Camera Yaw
    let inputX = 0;
    let inputZ = 0;

    if (input.forward) inputZ -= 1;
    if (input.backward) inputZ += 1;
    if (input.left) inputX -= 1;
    if (input.right) inputX += 1;

    // Normalize diagonal input
    const inputLength = Math.sqrt(inputX * inputX + inputZ * inputZ);
    const hasMovementInput = inputLength > 0.001;

    if (hasMovementInput) {
      inputX /= inputLength;
      inputZ /= inputLength;
    }

    // 2. Transform Local Direction to World Space based on Camera Yaw
    const sinYaw = Math.sin(cameraYaw);
    const cosYaw = Math.cos(cameraYaw);

    const worldDirX = inputX * cosYaw + inputZ * sinYaw;
    const worldDirZ = -inputX * sinYaw + inputZ * cosYaw;

    // 3. Determine Target Movement Speed (Walk vs Sprint)
    const targetSpeed = input.sprint
      ? PLAYER_CONFIG.SPRINT_SPEED
      : PLAYER_CONFIG.WALK_SPEED;

    const targetVelX = hasMovementInput ? worldDirX * targetSpeed : 0;
    const targetVelZ = hasMovementInput ? worldDirZ * targetSpeed : 0;

    // 4. Smooth Acceleration / Deceleration
    const lerpRate = hasMovementInput
      ? PLAYER_CONFIG.ACCELERATION
      : PLAYER_CONFIG.DECELERATION;

    this.velocity[0] += (targetVelX - this.velocity[0]) * Math.min(1, dt * lerpRate);
    this.velocity[2] += (targetVelZ - this.velocity[2]) * Math.min(1, dt * lerpRate);

    // 5. Jump Impulse & Gravity Calculation
    if (input.jump && this.isGrounded) {
      this.velocity[1] = PLAYER_CONFIG.JUMP_FORCE;
      this.isGrounded = false;
    }

    // Apply gravity when airborne
    if (!this.isGrounded) {
      this.velocity[1] += PLAYER_CONFIG.GRAVITY * dt;
    }

    // 6. Integrate Velocity to Position
    this.position[0] += this.velocity[0] * dt;
    this.position[1] += this.velocity[1] * dt;
    this.position[2] += this.velocity[2] * dt;

    // 7. Resolve Collisions against Building AABBs & Ground
    const collisionResult = CollisionSystem.resolveCollision(
      this.position,
      PLAYER_CONFIG.RADIUS
    );

    this.position = collisionResult.position;
    this.isGrounded = collisionResult.isGrounded;

    if (this.isGrounded && this.velocity[1] < 0) {
      this.velocity[1] = 0;
    }

    // 8. Smooth Character Facing Rotation
    if (hasMovementInput) {
      this.targetRotationY = Math.atan2(worldDirX, worldDirZ);

      // Shortest angle rotation interpolation
      let angleDiff = this.targetRotationY - this.rotationY;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

      this.rotationY += angleDiff * Math.min(1, dt * PLAYER_CONFIG.ROTATION_SPEED);
    }
  }
}

export default PlayerController;
