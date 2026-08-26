'use client';

import React, { useState, useEffect } from 'react';
import CanvasContainer from '@/components/3d/CanvasContainer';
import ScrollProgressNav from '@/components/portfolio/ScrollProgressNav';
import PortfolioOverlay from '@/components/portfolio/PortfolioOverlay';
import ReducedMotionFallback from '@/components/portfolio/ReducedMotionFallback';
import { TimelineController, TimelineState } from '@/scenes/cinematic/TimelineController';

/**
 * Main Page Component — ALIDEV Phase 03: Anime Cinematic Portfolio Experience.
 * Drives scroll timeline progress across 7 narrative 3D camera waypoints and editorial HTML sections.
 */
export default function HomePage() {
  const [timelineState, setTimelineState] = useState<TimelineState>({
    rawProgress: 0,
    smoothProgress: 0,
    activeSectionIndex: 0,
    activeSectionName: 'INTRO',
    isReducedMotion: false,
  });

  useEffect(() => {
    const controller = TimelineController.getInstance();
    const unsubscribe = controller.subscribe((state) => {
      setTimelineState({ ...state });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleNavigate = (index: number) => {
    TimelineController.getInstance().scrollToSection(index);
  };

  // Accessible Fallback for reduced motion
  if (timelineState.isReducedMotion) {
    return <ReducedMotionFallback />;
  }

  return (
    <main className="relative bg-[#0e0d21] min-h-screen w-screen overflow-x-hidden selection:bg-cyan-500 selection:text-zinc-950">
      {/* 1. 3D WebGL Cinematic Viewport (Fixed Background) */}
      <CanvasContainer />

      {/* 2. Top Header & Right Vertical Progress Indicator */}
      <ScrollProgressNav
        activeIndex={timelineState.activeSectionIndex}
        onNavigate={handleNavigate}
      />

      {/* 3. Editorial HTML Portfolio Content (Scroll-driven) */}
      <div className="relative z-10">
        <PortfolioOverlay activeIndex={timelineState.activeSectionIndex} />
      </div>

      {/* 4. Scroll Track Spacer (700vh for 7 narrative sections) */}
      <div className="h-[600vh] w-full pointer-events-none" />
    </main>
  );
}
