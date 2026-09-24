'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { usePersona } from '@/hooks/usePersona'
import ArtifactCore3D from '@/components/3d/ArtifactCore3D'

export default function ProjectsHeroAeruk() {
  const { personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || '#ae6bf6'

  return (
    <section className="relative w-full min-h-screen -mt-28 flex flex-col items-center justify-center text-center px-6 z-[2] overflow-hidden">
      {/* ─── 3D Logomark Glass Videos — Exact Aeruk Positions & Sources from Home Hero ─── */}
      
      {/* Crystal 1 — Bottom-Left (Aeruk exact position & rotation) */}
      <div
        className="absolute -bottom-[35px] -left-[60px] sm:-bottom-[50px] sm:-left-[85px] md:-bottom-[80px] md:-left-[120px] w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[500px] md:h-[500px] lg:w-[580px] lg:h-[580px] pointer-events-none select-none z-[1]"
        style={{
          transform: 'scaleX(-1) rotate(30deg)',
          transformOrigin: 'center center',
        }}
      >
        <video autoPlay loop muted playsInline className="w-full h-full object-contain mix-blend-screen">
          <source src="/videos/crystal-transparent.webm" type="video/webm" />
          <source src="/videos/crystal-black-700.mp4" type="video/mp4" />
          <source src="/videos/crystal-loop.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Crystal 2 — Top-Right (Aeruk exact position & rotation) */}
      <div
        className="absolute -top-[35px] -right-[60px] sm:-top-[50px] sm:-right-[85px] md:-top-[80px] md:-right-[120px] w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[500px] md:h-[500px] lg:w-[580px] lg:h-[580px] pointer-events-none select-none z-[1]"
        style={{
          transform: 'scaleX(-1) rotate(210deg)',
          transformOrigin: 'center center',
        }}
      >
        <video autoPlay loop muted playsInline className="w-full h-full object-contain mix-blend-screen">
          <source src="/videos/crystal-transparent.webm" type="video/webm" />
          <source src="/videos/crystal-black-700.mp4" type="video/mp4" />
          <source src="/videos/crystal-loop.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ─── Hero Content Stack ─── */}
      <div className="relative z-10 container mx-auto max-w-[1200px] px-4 flex flex-col items-center text-center pt-10 sm:pt-14">
        {/* Breadcrumb: ACCUEIL > PROJETS */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/60 mb-3"
        >
          <span>HOME</span>
          <span className="text-white/30">&gt;</span>
          <span
            className="font-bold transition-colors duration-500"
            style={{ color: themeAccentLight }}
          >
            PROJECTS
          </span>
        </motion.div>

        {/* Proportional Display Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white mb-2 leading-[0.95]"
        >
          FEATURED{' '}
          <span
            className="transition-colors duration-700 bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, #ffffff 30%, ${themeAccentLight} 100%)`,
            }}
          >
            PROJECTS
          </span>
        </motion.h1>

        {/* Persona Role Manifesto / Lead line */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="text-text-secondary text-xs sm:text-sm md:text-base font-light font-sans max-w-xl text-center leading-relaxed opacity-80 mt-1"
        >
          High-performance architectures, full-stack systems, and AI workflows engineered for the{' '}
          <span className="text-white font-medium">{personaConfig.label}</span> persona.
        </motion.p>

        {/* ─── 3D Artifact Core (Tripo3D Model / Quantum Singularity) ─── */}
        <motion.div
          id="singularity-origin"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-2xl h-[320px] sm:h-[380px] md:h-[420px] -mt-2 sm:-mt-4 flex flex-col items-center justify-center overflow-visible"
        >
          <ArtifactCore3D
            className="w-full h-full"
            accentColor={themeAccent}
          />

          {/* Energy Horizon Emission Node Label */}
          <div className="absolute bottom-2 flex flex-col items-center gap-1.5 pointer-events-none z-20">
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/50">
              [ 3D Artifact Core — Scroll To Explore ]
            </span>
            <div
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: themeAccentLight }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
