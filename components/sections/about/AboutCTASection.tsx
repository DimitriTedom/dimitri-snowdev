'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'

export default function AboutCTASection() {
  return (
    <section className="relative w-full py-28 sm:py-36 px-4 overflow-hidden flex justify-center items-center">
      {/* Background Video with subtle dark vignette & scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
          style={{ opacity: 0.35 }}
        >
          <source src="/videos/snodev-glass.mp4" type="video/mp4" />
          <source src="/videos/sv-crystal-raw.mp4" type="video/mp4" />
        </video>

        {/* Dark radial scrim */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(6,6,24,0.4) 0%, rgba(6,6,24,0.92) 85%, #060618 100%)',
          }}
        />

        {/* Top/bottom soft fades */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#060618] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060618] to-transparent" />
      </div>

      {/* Ambient Radial Persona Glow */}
      <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full filter blur-[140px] opacity-25 bg-violet-600/40" />

      <div className="container mx-auto max-w-4xl relative z-10 text-center flex flex-col items-center">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70"
        >
          <Sparkles size={13} className="text-violet-400" />
          <span>Next-Gen Engineering</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white mb-6 leading-[1.05]"
        >
          {"Prêt à donner vie à "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-fuchsia-300 to-white">
            votre projet ?
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
          Que ce soit pour une application web sur mesure, une architecture cloud résiliente ou un système d&apos;intelligence artificielle interactif, construisons une solution remarquable.
        </motion.p>

        {/* Kinetic CTA Pill Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white text-black font-sans font-semibold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)] cursor-pointer"
            style={{
              boxShadow: '0 0 30px -5px rgba(94, 23, 235, 0.45)',
            }}
          >
            <span>Démarrer un projet</span>
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
