import * as THREE from 'three';

export interface CameraWaypoint {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  sectionIndex: number;
  name: string;
}

export const SECTION_NAMES = [
  'INTRO',
  'ABOUT',
  'SKILLS',
  'PROJECTS',
  'EXPERIENCE',
  'LAB',
  'CONTACT',
] as const;

/**
 * 7 Cinematic Waypoints defining the camera flight path across the anime city.
 */
export const CAMERA_WAYPOINTS: CameraWaypoint[] = [
  {
    // 0: INTRO — Overhead vista of city skyline
    position: new THREE.Vector3(0, 48, 72),
    lookAt: new THREE.Vector3(0, 14, 0),
    sectionIndex: 0,
    name: 'INTRO',
  },
  {
    // 1: ABOUT — Descending glide into central plaza avenue
    position: new THREE.Vector3(26, 22, 38),
    lookAt: new THREE.Vector3(0, 8, 12),
    sectionIndex: 1,
    name: 'ABOUT',
  },
  {
    // 2: SKILLS — Orbit around west holographic technology cluster
    position: new THREE.Vector3(-34, 18, 15),
    lookAt: new THREE.Vector3(-12, 10, 0),
    sectionIndex: 2,
    name: 'SKILLS',
  },
  {
    // 3: PROJECTS — Low street-level glide past north project gallery
    position: new THREE.Vector3(0, 14, -28),
    lookAt: new THREE.Vector3(0, 12, -54),
    sectionIndex: 3,
    name: 'PROJECTS',
  },
  {
    // 4: EXPERIENCE — Flight past east tower complex timeline
    position: new THREE.Vector3(38, 26, -18),
    lookAt: new THREE.Vector3(18, 14, 0),
    sectionIndex: 4,
    name: 'EXPERIENCE',
  },
  {
    // 5: LAB — Elevated view over northwest experimental zone
    position: new THREE.Vector3(-28, 34, -35),
    lookAt: new THREE.Vector3(-10, 16, -10),
    sectionIndex: 5,
    name: 'LAB',
  },
  {
    // 6: CONTACT — Cinematic reveal looking toward glowing anime sunset horizon
    position: new THREE.Vector3(0, 22, 68),
    lookAt: new THREE.Vector3(0, 40, -110),
    sectionIndex: 6,
    name: 'CONTACT',
  },
];

/**
 * 3D Spline Curves for smooth continuous camera position and target interpolation.
 */
export class CameraPath {
  private positionCurve: THREE.CatmullRomCurve3;
  private lookAtCurve: THREE.CatmullRomCurve3;

  constructor() {
    const posPoints = CAMERA_WAYPOINTS.map((w) => w.position);
    const lookPoints = CAMERA_WAYPOINTS.map((w) => w.lookAt);

    this.positionCurve = new THREE.CatmullRomCurve3(posPoints, false, 'catmullrom', 0.5);
    this.lookAtCurve = new THREE.CatmullRomCurve3(lookPoints, false, 'catmullrom', 0.5);
  }

  /**
   * Samples smooth camera position at normalized progress t (0.0 to 1.0)
   */
  public getPositionAt(t: number, targetVector: THREE.Vector3): THREE.Vector3 {
    const clampedT = Math.max(0, Math.min(1, t));
    return this.positionCurve.getPoint(clampedT, targetVector);
  }

  /**
   * Samples smooth camera look-at target at normalized progress t (0.0 to 1.0)
   */
  public getLookAtAt(t: number, targetVector: THREE.Vector3): THREE.Vector3 {
    const clampedT = Math.max(0, Math.min(1, t));
    return this.lookAtCurve.getPoint(clampedT, targetVector);
  }
}

export default CameraPath;
