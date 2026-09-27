'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function AboutCTASection() {
  return (
    <section className="relative w-full py-20 sm:py-28 px-4 overflow-hidden flex flex-col justify-center items-center">
      {/* ── Aeruk-style Centered Rotating Crystal Video ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative w-[140px] h-[140px] sm:w-[190px] sm:h-[190px] md:w-[240px] md:h-[240px] pointer-events-none select-none flex items-center justify-center -mb-2 sm:-mb-4 z-0"
      >
        {/* Subtle radial purple/violet glow directly behind the transparent crystal */}
        <div className="absolute inset-4 rounded-full bg-violet-600/20 blur-3xl -z-10" />

        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain mix-blend-screen"
        >
          <source src="/videos/crystal-transparent.webm" type="video/webm" />
          <source src="/videos/crystal-black-700.mp4" type="video/mp4" />
          <source src="/videos/crystal-loop.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ── Content container (stacked beneath / slightly overlapping the crystal) ── */}
      <div className="container mx-auto max-w-3xl relative z-10 text-center flex flex-col items-center">
        {/* Title — Aeruk style gradient */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-4 leading-tight"
        >
          {"Prêt à donner vie à "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#d4b5ff] to-[#abf9ff]">
            votre projet ?
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-secondary text-sm sm:text-base md:text-lg font-light font-sans max-w-xl mb-8 sm:mb-10 leading-relaxed"
        >
          Parlez-moi de vos idées et envies, discutons-en et travaillons ensemble !
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
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 sm:py-4 rounded-full border border-white/20 bg-white text-black font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.5)] cursor-pointer"
            style={{
              boxShadow: '0 0 30px -5px rgba(94, 23, 235, 0.45)',
            }}
          >
            <span>Démarrer un projet</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={15} />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
