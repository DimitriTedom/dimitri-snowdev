'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { usePersona } from '@/hooks/usePersona'

const PERSONA_CTA: Record<string, { headline: string; sub: string }> = {
  fullstack: {
    headline: "Let's build something remarkable.",
    sub: 'Full-stack systems, production APIs, reactive UIs — from 0 to shipped.',
  },
  'ai-engineer': {
    headline: 'Ready to ship intelligent systems?',
    sub: 'Agentic workflows, RAG pipelines, LLM integrations — production-ready AI.',
  },
  'cloud-architect': {
    headline: 'Scale infrastructure without limits.',
    sub: 'Cloud architecture, CI/CD meshes, multi-region resilience built for zero downtime.',
  },
  'product-builder': {
    headline: 'Got a product idea? Let\'s execute it.',
    sub: 'From design system to market-ready product — 0 to 1 is my speciality.',
  },
  entrepreneur: {
    headline: 'Bring your venture to life.',
    sub: 'MVPs, growth strategy, tech stack selection — built for speed and scale.',
  },
}

export default function ContactStrip() {
  const { activePersona, personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const cta = PERSONA_CTA[activePersona] ?? PERSONA_CTA.fullstack

  return (
    <section className="relative w-full py-24 md:py-32 px-6 overflow-hidden">
      {/* Ambient background glow behind the strip */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${themeAccent}0d 0%, transparent 70%)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative max-w-4xl mx-auto text-center"
      >
        {/* Eyebrow */}
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-5 font-display"
          style={{ color: themeAccent }}
        >
          Start a project
        </p>

        {/* Headline */}
        <h2
          className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-none mb-6"
          style={{
            background: `linear-gradient(to right, #ffffff 30%, ${themeAccent} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {cta.headline}
        </h2>

        {/* Sub */}
        <p className="text-sm md:text-base text-white/45 max-w-xl mx-auto leading-relaxed mb-10">
          {cta.sub}
        </p>

        {/* CTA */}
        <div className="flex items-center justify-center gap-4">
          <Link
            href={`/contact?persona=${activePersona}`}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: themeAccent,
              boxShadow: `0 0 32px -4px ${themeAccent}cc, 0 4px 14px rgba(0,0,0,0.4)`,
            }}
          >
            Get in touch
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>

          <Link
            href={`/projects?persona=${activePersona}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white/60 border border-white/10 hover:border-white/25 hover:text-white transition-all duration-300"
          >
            See my work
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
