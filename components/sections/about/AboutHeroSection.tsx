'use client'

import { useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the Three.js scene — disables SSR to avoid WebGL errors
const AboutHeroScene = dynamic(() => import('./AboutHeroScene'), { ssr: false })

export default function AboutHeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // ── Mouse Reveal Light State ──────────────────────────────────────────────
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 })
  const [isMouseInside, setIsMouseInside] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handleMouseEnter = useCallback(() => setIsMouseInside(true), [])
  const handleMouseLeave = useCallback(() => {
    setIsMouseInside(false)
    setMousePos({ x: -9999, y: -9999 })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about-hero"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ cursor: 'none' }} // hidden because we render a custom cursor glow
    >
      {/* ── 1. Background Video Layer ───────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        >
          <source src="/videos/about-hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark vignette scrim so text and model stay readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(6,6,24,0.05) 0%, rgba(6,6,24,0.82) 100%)',
          }}
        />
        {/* Bottom fade into page content */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, #060618 0%, rgba(6,6,24,0.75) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* ── 2. Mouse Reveal Light (ProjectCard-style radial glow) ────────────── */}
      {/* Custom cursor dot */}
      <div
        className="absolute pointer-events-none z-50 transition-opacity duration-200"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          opacity: isMouseInside ? 1 : 0,
        }}
      >
        <div
          className="w-4 h-4 rounded-full border border-white/40"
          style={{
            background: 'rgba(94,23,235,0.6)',
            boxShadow: '0 0 12px 4px rgba(94,23,235,0.5)',
          }}
        />
      </div>

      {/* Radial reveal spotlight that follows the cursor */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          opacity: isMouseInside ? 1 : 0,
          background: `radial-gradient(circle 380px at ${mousePos.x}px ${mousePos.y}px,
            rgba(94, 23, 235, 0.13) 0%,
            rgba(174, 107, 246, 0.07) 40%,
            transparent 70%)`,
        }}
      />

      {/* ── 3. Three.js Character Model ──────────────────────────────────────── */}
      {/* z-20 — above bg video & reveal light, masked at the bottom so the cut is invisible */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 78%, transparent 96%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 78%, transparent 96%)',
        }}
      >
        <AboutHeroScene />
      </div>

      {/* ── 3b. Foreground bottom blend scrim (z-30, over model base) ───────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-30 select-none"
        style={{
          background:
            'linear-gradient(to top, #060618 0%, rgba(6,6,24,0.9) 35%, rgba(6,6,24,0.4) 70%, transparent 100%)',
        }}
      />

      {/* ── 4. Eyebrow label — top-center, above everything ─────────────────── */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none select-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm text-[10px] font-mono uppercase tracking-widest text-white/50">
          Portfolio · About
        </div>
      </div>

      {/* ── 5. Greetings headline — upper section, behind the model (z-10 < model z-20) ── */}
      <div className="absolute top-[8%] sm:top-[9%] md:top-[10%] left-0 right-0 flex justify-center items-center px-4 z-10 pointer-events-none select-none">
        <h1
          className="font-display font-black uppercase tracking-tight leading-none text-center w-full"
          style={{
            fontSize: 'clamp(2.4rem, 6.2vw, 6rem)',
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.04) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.12em',
          }}
        >
          {"HI I'M SNOWDEV"}
        </h1>
      </div>

      {/* ── 5. Static violet ambient glows ──────────────────────────────────── */}
      {/* Bottom-center upward glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-48 blur-3xl z-10 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 70% 100% at 50% 100%, #5e17eb 0%, #ae6bf6 40%, transparent 100%)',
        }}
      />
    </section>
  )
}
