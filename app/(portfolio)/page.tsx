'use client'

import { usePersona } from '@/hooks/usePersona'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PortfolioHome() {
  const { activePersona, personaConfig } = usePersona()
  
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      
      {/* Background gradients */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 blur-[130px] pointer-events-none rounded-full transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${themeAccent} 0%, transparent 85%)`,
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-6">
        
        {/* Eyebrow */}
        <motion.div
          key={`eyebrow-${activePersona}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-glass-border bg-bg-surface/30 backdrop-blur-glass text-xs font-semibold text-text-secondary"
        >
          <Sparkles size={12} style={{ color: themeAccent }} />
          <span>Active Persona: <strong style={{ color: themeAccent }} className="uppercase">{personaConfig?.label}</strong></span>
        </motion.div>

        {/* Title */}
        <motion.h1
          key={`title-${activePersona}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase text-white leading-none"
        >
          Dimitri <span className="transition-colors duration-500" style={{ color: themeAccent }}>Tedom</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          key={`tagline-${activePersona}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-lg sm:text-2xl text-text-secondary max-w-2xl font-light leading-relaxed"
        >
          {personaConfig?.description || 'Architecting premium digital experiences — from pixel to cloud.'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex flex-wrap justify-center gap-4"
        >
          <Link
            href={`/projects?persona=${activePersona}`}
            className="px-6 py-3 rounded-full text-sm font-semibold text-white flex items-center gap-2 transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: themeAccent,
              boxShadow: `0 0 20px -3px ${themeAccent}99`,
            }}
          >
            <span>View Case Studies</span>
            <ArrowRight size={14} />
          </Link>
          
          <Link
            href={`/contact?persona=${activePersona}`}
            className="px-6 py-3 rounded-full text-sm font-semibold text-text-secondary hover:text-white border border-glass-border bg-bg-surface/10 hover:bg-bg-surface/30 backdrop-blur-glass transition-all duration-300"
          >
            Get In Touch
          </Link>
        </motion.div>
      </div>

    </div>
  )
}
