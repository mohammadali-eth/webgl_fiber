'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolio/portfolioData';

/**
 * Accessible HTML Fallback for users with prefers-reduced-motion: reduce.
 */
export function ReducedMotionFallback() {
  return (
    <div className="min-h-screen w-full bg-[#0e0d21] text-white p-6 sm:p-12 space-y-16 max-w-4xl mx-auto">
      {/* Header */}
      <header className="border-b border-zinc-800 pb-6 space-y-2">
        <h1 className="text-4xl font-black text-cyan-400">{PORTFOLIO_DATA.hero.name}</h1>
        <p className="text-xl text-zinc-300">{PORTFOLIO_DATA.hero.subtitle}</p>
        <p className="text-sm text-zinc-400">{PORTFOLIO_DATA.hero.bio}</p>
      </header>

      {/* About */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white border-b border-zinc-800 pb-2">About</h2>
        <p className="text-zinc-300">{PORTFOLIO_DATA.about.summary}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {PORTFOLIO_DATA.about.focusAreas.map((area) => (
            <div key={area.title} className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
              <h3 className="font-bold text-cyan-400 text-sm">{area.title}</h3>
              <p className="text-xs text-zinc-400 pt-1">{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white border-b border-zinc-800 pb-2">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PORTFOLIO_DATA.skills.map((s) => (
            <div key={s.name} className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="font-bold text-sm text-white">{s.name}</div>
              <div className="text-xs text-zinc-400">{s.category}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white border-b border-zinc-800 pb-2">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PORTFOLIO_DATA.projects.map((p) => (
            <div key={p.id} className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 space-y-2">
              <h3 className="font-bold text-white">{p.title}</h3>
              <p className="text-xs text-zinc-300">{p.description}</p>
              {p.githubUrl && (
                <a href={p.githubUrl} className="text-xs text-cyan-400 block pt-2">
                  GitHub Repo →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white border-b border-zinc-800 pb-2">Experience</h2>
        <div className="space-y-3">
          {PORTFOLIO_DATA.experience.map((e) => (
            <div key={e.year} className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="flex justify-between font-bold text-sm text-cyan-400">
                <span>{e.role}</span>
                <span>{e.year}</span>
              </div>
              <div className="text-xs text-zinc-400">{e.organization}</div>
              <p className="text-xs text-zinc-300 pt-1">{e.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="space-y-4 border-t border-zinc-800 pt-6">
        <h2 className="text-2xl font-bold text-white">{PORTFOLIO_DATA.contact.title}</h2>
        <div className="flex space-x-4">
          <a
            href={`mailto:${PORTFOLIO_DATA.contact.email}`}
            className="px-6 py-2 bg-cyan-400 text-zinc-950 font-bold rounded text-xs"
          >
            Email Me
          </a>
          <a
            href={PORTFOLIO_DATA.contact.github}
            className="px-6 py-2 bg-zinc-800 text-white font-bold rounded text-xs"
          >
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}

export default ReducedMotionFallback;
