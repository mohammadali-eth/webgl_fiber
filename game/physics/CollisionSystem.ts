import { BUILDINGS_DATA, CENTRAL_LANDMARK, BuildingData } from '@/lib/city/cityData';
import { CITY_CONFIG } from '@/lib/city/constants';

export interface BoundingBox3D {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  minY: number;
  maxY: number;
}

/**
 * Deterministic AABB Collision System for ALIDEV City.
 * Pre-calculates building bounding boxes and resolves player collision & boundary sliding.
 */
export class CollisionSystem {
  private static boxes: BoundingBox3D[] = [];
  private static initialized = false;

  private static init() {
    if (this.initialized) return;

    const allBuildings: BuildingData[] = [CENTRAL_LANDMARK, ...BUILDINGS_DATA];

    this.boxes = allBuildings.map((bld) => {
      const [bx, , bz] = bld.position;
      const hw = bld.width / 2;
      const hd = bld.depth / 2;

      return {
        minX: bx - hw,
        maxX: bx + hw,
        minZ: bz - hd,
        maxZ: bz + hd,
        minY: CITY_CONFIG.SIDEWALK_HEIGHT,
        maxY: bld.height + CITY_CONFIG.SIDEWALK_HEIGHT,
      };
    });

    this.initialized = true;
  }

  /**
   * Resolves player position against building AABBs and city world bounds.
   * Modifies position array [x, y, z] in-place and returns grounded status.
   */
  public static resolveCollision(
    pos: [number, number, number],
    radius: number
  ): { position: [number, number, number]; isGrounded: boolean } {
    this.init();

    let [px, py, pz] = pos;

    // 1. World Boundary Clamping (-72 to 72 units)
    const maxBound = CITY_CONFIG.WORLD_SIZE / 2 - 8;
    px = Math.max(-maxBound, Math.min(maxBound, px));
    pz = Math.max(-maxBound, Math.min(maxBound, pz));

    // 2. Building AABB Collision Check & Wall Sliding Response
    for (const box of this.boxes) {
      // Check vertical overlap
      if (py + 1.8 >= box.minY && py <= box.maxY) {
        // Find closest point on AABB to player center
        const closestX = Math.max(box.minX, Math.min(box.maxX, px));
        const closestZ = Math.max(box.minZ, Math.min(box.maxZ, pz));

        const dirX = px - closestX;
        const dirZ = pz - closestZ;
        const distSq = dirX * dirX + dirZ * dirZ;

        if (distSq < radius * radius && distSq > 0.00001) {
          const dist = Math.sqrt(distSq);
          const overlap = radius - dist;
          const nx = dirX / dist;
          const nz = dirZ / dist;

          // Push player out along collision normal
          px += nx * overlap;
          pz += nz * overlap;
        }
      }
    }

    // 3. Grounded Check
    const minGroundY = CITY_CONFIG.SIDEWALK_HEIGHT;
    let isGrounded = false;
    if (py <= minGroundY) {
      py = minGroundY;
      isGrounded = true;
    }

    return {
      position: [px, py, pz],
      isGrounded,
    };
  }
}

export default CollisionSystem;
