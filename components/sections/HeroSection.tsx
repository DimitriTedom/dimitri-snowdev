'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { usePersona } from '@/hooks/usePersona'
import { PersonaId } from '@/types/persona'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const rotatingTexts: Record<PersonaId, string[]> = {
  fullstack: ['Frontend & Backend', 'React & Next.js', 'Databases & APIs'],
  'ai-engineer': ['AI & Automation', 'LLMs & RAG Pipelines', 'n8n & AI Workflows'],
  'cloud-architect': ['AWS & Infrastructure', 'Docker & CI/CD', 'Scalable Architectures'],
  'product-builder': ['UI/UX & Figma', 'Digital Products', 'Design Systems'],
  entrepreneur: ['Tech Entrepreneur', 'Startup Lab', 'Growth & MVP Execution']
}

/** Crystal monoliths rendered via React portal into document.body
 *  so they are completely free from any parent clipping / z-index stacking.
 *  They auto-unmount when HeroSection unmounts (i.e., on other pages). */
function CrystalPortal({ themeAccent }: { themeAccent: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return createPortal(
    <>
      {/* Crystal 1 — Bottom-Left (rotate 30deg, scaleX -1) */}
      <div
        className="fixed -bottom-[80px] -left-[130px] sm:-bottom-[100px] sm:-left-[160px] md:-bottom-[140px] md:-left-[220px] w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[500px] md:h-[500px] lg:w-[580px] lg:h-[580px] pointer-events-none select-none"
        style={{
          zIndex: 1,
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

      {/* Crystal 2 — Top-Right (rotate 210deg, scaleX -1) */}
      <div
        className="fixed -top-[80px] -right-[130px] sm:-top-[100px] sm:-right-[160px] md:-top-[140px] md:-right-[220px] w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[500px] md:h-[500px] lg:w-[580px] lg:h-[580px] pointer-events-none select-none"
        style={{
          zIndex: 1,
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
    </>,
    document.body
  )
}

export default function HeroSection() {
  const { activePersona, personaConfig } = usePersona()
  const [wordIndex, setWordIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const activeWords = rotatingTexts[activePersona] || rotatingTexts.fullstack

  useEffect(() => {
    setWordIndex(0)
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % activeWords.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [activePersona, activeWords])

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo('.hero-eyebrow', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
      .fromTo('.hero-title', { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, '-=0.5')
      .fromTo('.hero-tagline', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .fromTo('.hero-cta', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6 }, '-=0.3')
      .fromTo('.hero-scroll', { opacity: 0, y: -20 }, { opacity: 1, y: 0.4, duration: 0.6 }, '-=0.2')
  }, { scope: containerRef, dependencies: [] })

  return (
    <>
      {/* Crystals escape all clipping via React portal into document.body */}
      <CrystalPortal themeAccent={themeAccent} />

      <section
        ref={containerRef}
        className="relative w-full min-h-screen -mt-28 flex flex-col items-center justify-center text-center px-6 z-[2]"
      >
        {/* Center depth vignette glow */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-10 blur-[130px] transition-all duration-700"
          style={{ background: `radial-gradient(circle at center, ${themeAccent} 0%, transparent 65%)` }}
        />

        {/* Main content — z-10 above crystals (z-1), below navbar (z-100) */}
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10 pt-10">

          {/* Eyebrow tag */}
          <div className="hero-eyebrow opacity-0 h-8 flex items-center justify-center">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-glass-border bg-bg-surface/20 backdrop-blur-glass text-xs font-semibold text-text-secondary">
              <Sparkles size={12} style={{ color: themeAccent }} />
              <span className="w-48 text-center overflow-hidden inline-block h-4">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${activePersona}-${wordIndex}`}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="block font-display tracking-widest uppercase"
                    style={{ color: themeAccent }}
                  >
                    {activeWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          </div>

          {/* Giant Title */}
          <h1 className="hero-title opacity-0 font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight uppercase text-white leading-none">
            DIMITRI <span className="transition-colors duration-500" style={{ color: themeAccent }}>TEDOM</span>
          </h1>

          {/* Tagline */}
          <p className="hero-tagline opacity-0 font-sans text-base sm:text-xl text-text-secondary max-w-2xl font-light leading-relaxed">
            {personaConfig?.description || 'Architecting premium digital experiences — from pixel to cloud.'}
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta opacity-0 mt-4 flex flex-wrap justify-center gap-4">
            <Link
              href={`/projects?persona=${activePersona}`}
              className="px-6 py-3 rounded-full text-sm font-semibold text-white flex items-center gap-2 transition-all duration-300 hover:scale-105 group"
              style={{ backgroundColor: themeAccent, boxShadow: `0 0 25px -5px ${themeAccent}99` }}
            >
              <span>View Case Studies</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={`/contact?persona=${activePersona}`}
              className="px-6 py-3 rounded-full text-sm font-semibold text-text-secondary hover:text-white border border-glass-border bg-bg-surface/10 hover:bg-bg-surface/30 backdrop-blur-glass transition-all duration-300"
            >
              Get In Touch
            </Link>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-scroll opacity-0 pointer-events-none md:pointer-events-auto">
          <div className="w-[20px] h-[32px] rounded-full border border-glass-border flex justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-text-muted"
            />
          </div>
          <span className="text-[9px] uppercase tracking-widest text-text-muted font-sans">Scroll</span>
        </div>

      </section>
    </>
  )
}
