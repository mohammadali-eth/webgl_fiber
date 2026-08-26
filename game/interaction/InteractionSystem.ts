/**
 * ALIDEV Interaction System Foundation
 * Detects player proximity to interactive world objects & buildings.
 */

export interface InteractiveTarget {
  id: string;
  name: string;
  type: 'building' | 'npc' | 'portal' | 'object';
  position: [number, number, number];
  radius: number;
  promptText: string;
  onInteract?: () => void;
}

export class InteractionSystem {
  private static targets: InteractiveTarget[] = [];
  public static currentNearest: InteractiveTarget | null = null;

  public static registerTarget(target: InteractiveTarget) {
    this.targets.push(target);
  }

  public static unregisterTarget(id: string) {
    this.targets = this.targets.filter((t) => t.id !== id);
  }

  /**
   * Evaluates player position against registered interactive targets.
   */
  public static update(playerPosition: [number, number, number]): InteractiveTarget | null {
    let nearest: InteractiveTarget | null = null;
    let minDistance = Infinity;

    const [px, py, pz] = playerPosition;

    for (const target of this.targets) {
      const [tx, ty, tz] = target.position;
      const dx = px - tx;
      const dy = py - ty;
      const dz = pz - tz;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist <= target.radius && dist < minDistance) {
        minDistance = dist;
        nearest = target;
      }
    }

    this.currentNearest = nearest;
    return nearest;
  }

  public static triggerInteraction() {
    if (this.currentNearest && this.currentNearest.onInteract) {
      this.currentNearest.onInteract();
    }
  }
}

export default InteractionSystem;
