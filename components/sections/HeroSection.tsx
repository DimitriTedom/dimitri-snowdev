'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePersona } from '@/hooks/usePersona'
import { PersonaId } from '@/types/persona'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const HERO_EYEBROWS: Record<PersonaId, { prefix: string; suffixes: string[] }> = {
  fullstack: {
    prefix: 'FULLSTACK',
    suffixes: ['& AI SYSTEMS', '& CLOUD ARCHITECTURE', '& DISTRIBUTED WEB']
  },
  'ai-engineer': {
    prefix: 'AI SYSTEMS',
    suffixes: ['& AGENTIC WORKFLOWS', '& NEURAL PIPELINES', '& LLM ARCHITECTURES']
  },
  'cloud-architect': {
    prefix: 'CLOUD INFRA',
    suffixes: ['& KUBERNETES', '& DISTRIBUTED SYSTEMS', '& ZERO-TRUST ARCHITECTURE']
  },
  'product-builder': {
    prefix: 'PRODUCT DESIGN',
    suffixes: ['& DESIGN SYSTEMS', '& 0-TO-1 PLATFORMS', '& HYPER-GROWTH UX']
  },
  entrepreneur: {
    prefix: 'TECH VENTURES',
    suffixes: ['& SCALABLE MVPS', '& SYSTEM ARCHITECTURE', '& GROWTH STRATEGY']
  }
}

const PERSONA_HERO_DESCRIPTIONS: Record<PersonaId, string> = {
  fullstack: 'I architect resilient full-stack systems and high-performance digital experiences. From scalable backend APIs to reactive interfaces, I build software that scales.',
  'ai-engineer': 'I design intelligent systems, autonomous agents, and production RAG pipelines. Bridging foundation models with enterprise engineering to solve high-impact challenges.',
  'cloud-architect': 'I design fault-tolerant cloud infrastructures, automated CI/CD meshes, and multi-region microservices built for zero downtime and extreme scale.',
  'product-builder': 'I engineer human-centric products from 0 to 1. Merging high-fidelity design systems with robust engineering to turn ambitious ideas into market reality.',
  entrepreneur: 'I build high-growth tech ventures and agile MVPs. Architecting digital products, aligning technology with business models, and executing with speed.'
}

export default function HeroSection() {
  const { activePersona, personaConfig } = usePersona()
  const [wordIndex, setWordIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const highlightColor = personaConfig?.theme?.accentLight || themeAccent
  const eyebrowConfig = HERO_EYEBROWS[activePersona] || HERO_EYEBROWS.fullstack

  useEffect(() => {
    setWordIndex(0)
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % eyebrowConfig.suffixes.length)
    }, 2600)
    return () => clearInterval(timer)
  }, [activePersona, eyebrowConfig])

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo('.hero-eyebrow', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
      .fromTo('.hero-title', { opacity: 0, y: 35, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, '-=0.5')
      .fromTo('.hero-tagline', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .fromTo('.hero-cta', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6 }, '-=0.3')
  }, { scope: containerRef, dependencies: [] })

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen -mt-28 flex flex-col items-center justify-center text-center px-6 z-[2] overflow-hidden"
    >
      {/* Center depth vignette glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-10 blur-[130px] transition-all duration-700"
        style={{ background: `radial-gradient(circle at center, ${themeAccent} 0%, transparent 65%)` }}
      />

      {/* Crystal 1 — Bottom-Left (strictly in Hero, scrolls away with hero, brought inwards) */}
      <div
        className="absolute -bottom-[35px] -left-[60px] sm:-bottom-[50px] sm:-left-[85px] md:-bottom-[80px] md:-left-[120px] w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[500px] md:h-[500px] lg:w-[580px] lg:h-[580px] pointer-events-none select-none z-[1]"
        style={{
          transform: 'scaleX(-1) rotate(30deg)',
          transformOrigin: 'center center',
        }}
      >
        <div
          className="absolute inset-0 rounded-full blur-[80px] opacity-25 transition-all duration-700"
          style={{ background: `radial-gradient(circle, ${themeAccent} 0%, transparent 70%)` }}
        />
        <video autoPlay loop muted playsInline className="w-full h-full object-contain mix-blend-screen">
          <source src="/videos/crystal-transparent.webm" type="video/webm" />
          <source src="/videos/crystal-black-700.mp4" type="video/mp4" />
          <source src="/videos/crystal-loop.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Crystal 2 — Top-Right (strictly in Hero, scrolls away with hero, brought inwards) */}
      <div
        className="absolute -top-[35px] -right-[60px] sm:-top-[50px] sm:-right-[85px] md:-top-[80px] md:-right-[120px] w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[500px] md:h-[500px] lg:w-[580px] lg:h-[580px] pointer-events-none select-none z-[1]"
        style={{
          transform: 'scaleX(-1) rotate(210deg)',
          transformOrigin: 'center center',
        }}
      >
        <div
          className="absolute inset-0 rounded-full blur-[80px] opacity-25 transition-all duration-700"
          style={{ background: `radial-gradient(circle, ${themeAccent} 0%, transparent 70%)` }}
        />
        <video autoPlay loop muted playsInline className="w-full h-full object-contain mix-blend-screen">
          <source src="/videos/crystal-transparent.webm" type="video/webm" />
          <source src="/videos/crystal-black-700.mp4" type="video/mp4" />
          <source src="/videos/crystal-loop.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main content — z-10 above crystals (z-1), below navbar (z-100) */}
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-3 sm:gap-5 relative z-10 pt-10 sm:pt-14">

          {/* Aeruk-style clean typographic rotating eyebrow (no pill box, no sparkle) */}
          <div className="hero-eyebrow opacity-0 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-widest uppercase h-6">
            <span className="text-white/90 font-display leading-none">{eyebrowConfig.prefix}</span>
            <span className="relative inline-flex items-center overflow-hidden h-6 text-left" style={{ minWidth: '185px' }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${activePersona}-${wordIndex}`}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="block font-display tracking-widest whitespace-nowrap leading-none"
                  style={{ color: highlightColor }}
                >
                  {eyebrowConfig.suffixes[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          {/* Giant Title: Aeruk-style — pure white monolithic name, glow responds to persona */}
          <h1
            className="hero-title opacity-0 font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase leading-none select-none my-1"
            style={{
              background: 'linear-gradient(170deg, #ffffff 0%, rgba(255,255,255,0.82) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: `drop-shadow(0 0 38px ${themeAccent}55)`,
              transition: 'filter 0.5s ease',
            }}
          >
            SNOWDEV
          </h1>

          {/* Tagline: Aeruk-style concise 2-3 line statement */}
          <p className="hero-tagline opacity-0 font-sans text-xs sm:text-sm md:text-base text-text-secondary max-w-xs sm:max-w-md md:max-w-xl font-normal leading-relaxed text-center px-2 my-2">
            {PERSONA_HERO_DESCRIPTIONS[activePersona]}
          </p>

          {/* Single CTA: Aeruk-style 'Start a project' pill */}
          <div className="hero-cta opacity-0 mt-3 sm:mt-5 flex justify-center">
            <Link
              href={`/contact?persona=${activePersona}`}
              className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                backgroundColor: themeAccent,
                boxShadow: `0 0 28px -4px ${themeAccent}cc, 0 4px 14px rgba(0,0,0,0.4)`
              }}
            >
              Start a project
            </Link>
          </div>

        </div>

        {/* Bottom atmospheric shadow transition — softly dissolves the bottom crystal and blends hero into next sections */}
        <div
          className="absolute bottom-0 left-0 right-0 h-44 sm:h-64 pointer-events-none z-[3]"
          style={{
            background: 'linear-gradient(to top, #060618 0%, rgba(6, 6, 24, 0.85) 40%, rgba(6, 6, 24, 0.3) 75%, transparent 100%)'
          }}
        />

      </section>
  )
}
