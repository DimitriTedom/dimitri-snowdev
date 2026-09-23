'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePersona } from '@/hooks/usePersona'
import { ArrowUpRight, Sparkles } from 'lucide-react'

export default function ProjectsCTA() {
  const { activePersona, personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || '#ae6bf6'

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 overflow-hidden flex justify-center items-center">
      {/* Ambient Radial Persona Glow */}
      <div
        className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full filter blur-[140px] opacity-15 transition-colors duration-1000"
        style={{
          background: `radial-gradient(ellipse at center, ${themeAccent} 0%, transparent 70%)`,
        }}
      />

      <div className="container mx-auto max-w-4xl relative z-10 text-center flex flex-col items-center">
        {/* Subtle Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70"
        >
          <Sparkles size={13} style={{ color: themeAccentLight }} />
          <span>Next-Gen Engineering</span>
        </motion.div>

        {/* Hero Hook */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white mb-6 leading-[1.05]"
        >
          Have a vision in mind?{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, #ffffff 40%, ${themeAccentLight} 100%)`,
            }}
          >
            Let&apos;s build it.
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-text-secondary text-base sm:text-lg font-light font-sans max-w-xl mb-10 leading-relaxed"
        >
          Whether you need mission-critical cloud infrastructure, an award-winning full-stack application, or automated AI pipelines — I turn ambitious ideas into reality.
        </motion.p>

        {/* Kinetic CTA Pill Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            id="contact-cta-btn"
            href={`/contact?persona=${activePersona}`}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white text-black font-sans font-semibold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)] cursor-pointer"
            style={{
              boxShadow: `0 0 30px -5px ${themeAccent}66`,
            }}
          >
            <span>Initiate Collaboration</span>
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
