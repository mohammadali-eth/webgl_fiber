/**
 * ALIDEV Player Input Manager — Phase 03 Debugged & Fixed
 * Handles global keyboard listeners, Pointer Lock API integration,
 * and single-frame mouse delta consumption.
 */

export interface InputState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  sprint: boolean;
  jump: boolean;
  interact: boolean;
}

export class PlayerInput {
  public keys: InputState = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
    jump: false,
    interact: false,
  };

  private mouseDeltaX = 0;
  private mouseDeltaY = 0;
  public isPointerLocked = false;
  public isDebugActive = false;

  private onPointerLockChangeCallback?: (locked: boolean) => void;
  private onInteractCallback?: () => void;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('keyup', this.handleKeyUp);
      window.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('pointerlockchange', this.handlePointerLockChange);
    }
  }

  public setPointerLockCallback(cb: (locked: boolean) => void) {
    this.onPointerLockChangeCallback = cb;
  }

  public setInteractCallback(cb: () => void) {
    this.onInteractCallback = cb;
  }

  public requestPointerLock() {
    if (typeof document !== 'undefined' && !this.isPointerLocked) {
      // Request pointer lock directly on body / canvas
      document.body.requestPointerLock();
    }
  }

  public exitPointerLock() {
    if (typeof document !== 'undefined' && document.pointerLockElement) {
      document.exitPointerLock();
    }
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    // Ignore input if user is typing into an HTML input or textarea
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    ) {
      return;
    }

    // Prevent default browser page scrolling for game keys
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
      event.preventDefault();
    }

    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
        this.keys.forward = true;
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.keys.backward = true;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this.keys.left = true;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.keys.right = true;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.keys.sprint = true;
        break;
      case 'Space':
        this.keys.jump = true;
        break;
      case 'KeyE':
        this.keys.interact = true;
        if (this.onInteractCallback) this.onInteractCallback();
        break;
      case 'F3':
      case 'Backquote':
        event.preventDefault();
        this.isDebugActive = !this.isDebugActive;
        break;
    }
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
        this.keys.forward = false;
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.keys.backward = false;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this.keys.left = false;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.keys.right = false;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.keys.sprint = false;
        break;
      case 'Space':
        this.keys.jump = false;
        break;
      case 'KeyE':
        this.keys.interact = false;
        break;
    }
  };

  private handleMouseMove = (event: MouseEvent) => {
    if (this.isPointerLocked) {
      this.mouseDeltaX += event.movementX;
      this.mouseDeltaY += event.movementY;
    }
  };

  private handlePointerLockChange = () => {
    this.isPointerLocked = document.pointerLockElement !== null;

    if (this.isPointerLocked && typeof document !== 'undefined') {
      // Blur active HTML button element to prevent Space bar focus steal
      (document.activeElement as HTMLElement)?.blur();
    }

    if (this.onPointerLockChangeCallback) {
      this.onPointerLockChangeCallback(this.isPointerLocked);
    }
  };

  /**
   * Consumes and resets accumulated mouse delta. Must be called ONLY ONCE per frame!
   */
  public consumeMouseDelta(): { x: number; y: number } {
    const delta = { x: this.mouseDeltaX, y: this.mouseDeltaY };
    this.mouseDeltaX = 0;
    this.mouseDeltaY = 0;
    return delta;
  }

  public dispose() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('keyup', this.handleKeyUp);
      window.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('pointerlockchange', this.handlePointerLockChange);
    }
  }
}

export default PlayerInput;
