/**
 * ALIDEV 3D Portfolio Type Definitions
 */

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface BuildingData {
  id: string;
  name: string;
  category: 'about' | 'projects' | 'skills' | 'experience' | 'contact';
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

export interface PlayerState {
  position: Vector3D;
  rotation: number;
  isMoving: boolean;
  activeBuildingId: string | null;
}

export interface SceneConfig {
  debug: boolean;
  shadows: boolean;
  postProcessing: boolean;
}
