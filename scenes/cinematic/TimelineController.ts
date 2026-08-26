'use client';

import { SECTION_NAMES } from './CameraPath';

export interface TimelineState {
  rawProgress: number; // 0.0 to 1.0
  smoothProgress: number; // Lerped 0.0 to 1.0
  activeSectionIndex: number;
  activeSectionName: string;
  isReducedMotion: boolean;
}

export class TimelineController {
  private static instance: TimelineController;
  public state: TimelineState = {
    rawProgress: 0,
    smoothProgress: 0,
    activeSectionIndex: 0,
    activeSectionName: SECTION_NAMES[0],
    isReducedMotion: false,
  };

  private listeners: Set<(state: TimelineState) => void> = new Set();

  private constructor() {
    if (typeof window !== 'undefined') {
      // Check prefers-reduced-motion media query
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.state.isReducedMotion = motionQuery.matches;

      motionQuery.addEventListener('change', (e) => {
        this.state.isReducedMotion = e.matches;
        this.notify();
      });

      window.addEventListener('scroll', this.handleScroll, { passive: true });
      this.updateFromScroll();
    }
  }

  public static getInstance(): TimelineController {
    if (!TimelineController.instance) {
      TimelineController.instance = new TimelineController();
    }
    return TimelineController.instance;
  }

  public subscribe(cb: (state: TimelineState) => void): () => void {
    this.listeners.add(cb);
    cb(this.state);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private handleScroll = () => {
    this.updateFromScroll();
  };

  public updateFromScroll() {
    if (typeof window === 'undefined') return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollHeight > 0 ? Math.max(0, Math.min(1, scrollTop / scrollHeight)) : 0;
    this.state.rawProgress = progress;

    // Calculate active section index (0 to 6)
    const sectionStep = 1 / (SECTION_NAMES.length - 1);
    const index = Math.min(
      SECTION_NAMES.length - 1,
      Math.max(0, Math.round(progress / sectionStep))
    );

    this.state.activeSectionIndex = index;
    this.state.activeSectionName = SECTION_NAMES[index];

    this.notify();
  }

  public updateSmoothProgress(dt: number, lerpSpeed = 4.0) {
    if (this.state.isReducedMotion) {
      this.state.smoothProgress = this.state.rawProgress;
    } else {
      const diff = this.state.rawProgress - this.state.smoothProgress;
      this.state.smoothProgress += diff * Math.min(1, dt * lerpSpeed);
    }
    return this.state.smoothProgress;
  }

  public scrollToSection(index: number) {
    if (typeof window === 'undefined') return;
    const clampedIndex = Math.max(0, Math.min(SECTION_NAMES.length - 1, index));
    const targetRatio = clampedIndex / (SECTION_NAMES.length - 1);
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScrollY = targetRatio * scrollHeight;

    window.scrollTo({
      top: targetScrollY,
      behavior: this.state.isReducedMotion ? 'auto' : 'smooth',
    });
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.state));
  }
}

export default TimelineController;
