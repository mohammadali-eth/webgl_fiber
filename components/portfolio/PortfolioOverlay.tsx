'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolio/portfolioData';

interface PortfolioOverlayProps {
  activeIndex: number;
}

/**
 * Editorial Content Overlay driving HTML content sections over 3D camera waypoints.
 */
export function PortfolioOverlay({ activeIndex }: PortfolioOverlayProps) {
  return (
    <div className="relative z-10 text-white select-none pointer-events-none">
      {/* SECTION 0: INTRO HERO */}
      <section className="h-screen w-full flex flex-col justify-center items-start px-6 sm:px-16 lg:px-24">
        <div
          className={`max-w-2xl space-y-6 transition-all duration-700 transform ${
            activeIndex === 0
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <span>✦</span>
            <span>CREATIVE DEVELOPER & 3D ENGINEER</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-cyan-300">
            {PORTFOLIO_DATA.hero.name}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 font-light max-w-xl leading-relaxed">
            {PORTFOLIO_DATA.hero.subtitle}
          </p>

          <div className="pt-4 flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>SCROLL TO EXPLORE WORLD</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: ABOUT ME */}
      <section className="h-screen w-full flex flex-col justify-center items-end px-6 sm:px-16 lg:px-24">
        <div
          className={`max-w-xl space-y-6 transition-all duration-700 transform ${
            activeIndex === 1
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            01 / ABOUT
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            {PORTFOLIO_DATA.about.title}
          </h2>
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
            {PORTFOLIO_DATA.about.summary}
          </p>

          <div className="space-y-4 pt-2">
            {PORTFOLIO_DATA.about.focusAreas.map((area) => (
              <div
                key={area.title}
                className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-md"
              >
                <h3 className="text-sm font-bold text-cyan-300">{area.title}</h3>
                <p className="text-xs text-zinc-400 pt-1">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: SKILLS MATRIX */}
      <section className="h-screen w-full flex flex-col justify-center items-start px-6 sm:px-16 lg:px-24">
        <div
          className={`max-w-2xl space-y-6 transition-all duration-700 transform ${
            activeIndex === 2
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            02 / SKILLS
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Technical Capabilities
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {PORTFOLIO_DATA.skills.map((skill) => (
              <div
                key={skill.name}
                className="p-3.5 rounded-xl bg-zinc-950/85 border border-zinc-800 backdrop-blur-md hover:border-cyan-500/40 transition-colors"
              >
                <div className="h-1.5 w-6 rounded-full mb-2" style={{ backgroundColor: skill.color }} />
                <h3 className="text-xs font-bold text-white">{skill.name}</h3>
                <span className="text-[10px] font-mono text-zinc-400">{skill.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PROJECTS SHOWCASE */}
      <section className="h-screen w-full flex flex-col justify-center items-center px-6 sm:px-16">
        <div
          className={`w-full max-w-4xl space-y-6 text-center transition-all duration-700 transform ${
            activeIndex === 3
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            03 / FEATURED PROJECTS
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Selected Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
            {PORTFOLIO_DATA.projects.map((proj) => (
              <div
                key={proj.id}
                className="flex flex-col justify-between p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800 backdrop-blur-xl hover:border-cyan-400/50 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
                    <span className="text-cyan-400">{proj.category}</span>
                    <span>{proj.year}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">{proj.description}</p>
                </div>

                <div className="pt-4 space-y-3 border-t border-zinc-800/80 mt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map((tech) => (
                      <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs font-mono text-cyan-400 hover:underline"
                    >
                      <span>VIEW CODE REPO</span>
                      <span>→</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: EXPERIENCE TIMELINE */}
      <section className="h-screen w-full flex flex-col justify-center items-start px-6 sm:px-16 lg:px-24">
        <div
          className={`max-w-xl space-y-6 transition-all duration-700 transform ${
            activeIndex === 4
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            04 / EXPERIENCE
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Engineering Journey
          </h2>

          <div className="space-y-4 pt-2 border-l-2 border-cyan-500/40 pl-6">
            {PORTFOLIO_DATA.experience.map((item) => (
              <div key={item.year} className="relative space-y-1">
                <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-cyan-400 border-2 border-zinc-950" />
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-white">{item.role}</span>
                  <span className="text-cyan-400">{item.year}</span>
                </div>
                <div className="text-xs font-mono text-zinc-400">{item.organization}</div>
                <p className="text-xs text-zinc-300 pt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CREATIVE LAB */}
      <section className="h-screen w-full flex flex-col justify-center items-end px-6 sm:px-16 lg:px-24">
        <div
          className={`max-w-xl space-y-6 transition-all duration-700 transform ${
            activeIndex === 5
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            05 / CREATIVE LAB
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Experiments & Prototypes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {PORTFOLIO_DATA.creativeLab.map((exp) => (
              <div
                key={exp.id}
                className="p-4 rounded-xl bg-zinc-950/85 border border-zinc-800 backdrop-blur-md"
              >
                <span className="text-[10px] font-mono text-cyan-400 uppercase">{exp.category}</span>
                <h3 className="text-sm font-bold text-white pt-1">{exp.title}</h3>
                <p className="text-xs text-zinc-400 pt-1 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CONTACT */}
      <section className="h-screen w-full flex flex-col justify-center items-center px-6 sm:px-16 text-center">
        <div
          className={`max-w-2xl space-y-6 transition-all duration-700 transform ${
            activeIndex === 6
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            06 / CONTACT
          </span>
          <h2 className="text-5xl sm:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-cyan-300">
            {PORTFOLIO_DATA.contact.title}
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base max-w-lg mx-auto">
            {PORTFOLIO_DATA.contact.subtitle}
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${PORTFOLIO_DATA.contact.email}`}
              className="px-8 py-3.5 rounded-full bg-cyan-400 text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors shadow-[0_0_25px_rgba(56,189,248,0.4)]"
            >
              Get In Touch
            </a>
            <a
              href={PORTFOLIO_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-zinc-900 text-white font-bold text-xs uppercase tracking-wider border border-zinc-800 hover:border-zinc-600 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PortfolioOverlay;
