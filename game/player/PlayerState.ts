/**
 * ALIDEV Game State Manager
 * Tracks execution states (MENU, PLAYING, PAUSED) and debug UI visibility.
 */

export type GameStatus = 'MENU' | 'PLAYING' | 'PAUSED';

export interface PlayerTelemetry {
  position: [number, number, number];
  velocity: [number, number, number];
  speed: number;
  isGrounded: boolean;
  isSprinting: boolean;
  cameraYaw: number;
  cameraPitch: number;
  fps: number;
}

export class PlayerState {
  public static status: GameStatus = 'MENU';
  public static isDebugEnabled = false;

  public static telemetry: PlayerTelemetry = {
    position: [0, 0.2, 22],
    velocity: [0, 0, 0],
    speed: 0,
    isGrounded: true,
    isSprinting: false,
    cameraYaw: 0,
    cameraPitch: 0,
    fps: 60,
  };

  public static setStatus(newStatus: GameStatus) {
    this.status = newStatus;
  }
}

export default PlayerState;
