import { create } from "zustand";

export interface Waypoint {
  id: string;
  position: [number, number, number];
  lookAt?: [number, number, number];
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
  houseId?: string;
  sectionId: string;
  title: string;
  subtitle?: string;
  progress: number; // 0 to 1 along timeline
}

export interface PortfolioStore {
  // Navigation & Scroll
  scrollProgress: number;
  targetScrollProgress: number;
  setScrollProgress: (progress: number) => void;
  setTargetScrollProgress: (progress: number) => void;
  
  // Waypoint & Section state
  currentWaypointIndex: number;
  activeDestination: Waypoint | null;
  setCurrentWaypointIndex: (index: number) => void;
  setActiveDestination: (dest: Waypoint | null) => void;

  // Character State
  characterPosition: [number, number, number];
  characterRotation: number; // Yaw in radians
  isCharacterWalking: boolean;
  characterAnimation: "idle" | "walk";
  setCharacterState: (pos: [number, number, number], rot: number, isWalking: boolean) => void;

  // App & Experience State
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
  isIntroComplete: boolean;
  setIsIntroComplete: (complete: boolean) => void;
  activePanel: string | null; // "about" | "skills" | "projects" | "contact" | null
  setActivePanel: (panel: string | null) => void;

  // System Controls
  isDebug: boolean;
  toggleDebug: () => void;
  isAudioEnabled: boolean;
  toggleAudio: () => void;
  audioVolume: number;
  setAudioVolume: (vol: number) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  scrollProgress: 0,
  targetScrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: Math.max(0, Math.min(1, progress)) }),
  setTargetScrollProgress: (progress) => set({ targetScrollProgress: Math.max(0, Math.min(1, progress)) }),

  currentWaypointIndex: 0,
  activeDestination: null,
  setCurrentWaypointIndex: (index) => set({ currentWaypointIndex: index }),
  setActiveDestination: (dest) => set({ activeDestination: dest }),

  characterPosition: [0, 0, 16],
  characterRotation: 0,
  isCharacterWalking: false,
  characterAnimation: "idle",
  setCharacterState: (pos, rot, isWalking) =>
    set({
      characterPosition: pos,
      characterRotation: rot,
      isCharacterWalking: isWalking,
      characterAnimation: isWalking ? "walk" : "idle",
    }),

  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  isIntroComplete: false,
  setIsIntroComplete: (complete) => set({ isIntroComplete: complete }),
  activePanel: null,
  setActivePanel: (panel) => set({ activePanel: panel }),

  isDebug: false,
  toggleDebug: () => set((state) => ({ isDebug: !state.isDebug })),
  isAudioEnabled: false,
  toggleAudio: () => set((state) => ({ isAudioEnabled: !state.isAudioEnabled })),
  audioVolume: 0.5,
  setAudioVolume: (vol) => set({ audioVolume: Math.max(0, Math.min(1, vol)) }),
}));
