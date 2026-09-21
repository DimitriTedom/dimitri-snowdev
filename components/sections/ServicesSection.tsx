'use client'

import Link from 'next/link'
import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { Code2, Cpu, Cloud, ArrowUpRight, Sparkles } from 'lucide-react'
import { usePersona } from '@/hooks/usePersona'
import { SERVICES } from '@/data/services'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function ServicesSection() {
  const { activePersona, personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || themeAccent

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'bot':
        return <Cpu className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
      case 'cloud':
        return <Cloud className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
      default:
        return <Code2 className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
    }
  }

  return (
    <section id="services" className="relative w-full py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Aeruk-style Manifesto Header */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            {/* Tagline */}
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase font-mono"
              style={{ color: themeAccent }}
            >
              Expertise & Solutions
            </p>

            {/* Aeruk bold narrative text */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-sans font-normal text-white/90 leading-snug md:leading-relaxed max-w-4xl">
              Forged with triple expertise in{' '}
              <span className="font-bold text-white underline decoration-2 underline-offset-8" style={{ textDecorationColor: themeAccent }}>
                modern full-stack engineering
              </span>
              ,{' '}
              <span className="font-bold text-white underline decoration-2 underline-offset-8" style={{ textDecorationColor: themeAccent }}>
                autonomous AI systems
              </span>{' '}
              and{' '}
              <span className="font-bold text-white underline decoration-2 underline-offset-8" style={{ textDecorationColor: themeAccent }}>
                cloud architecture
              </span>
              , I architect high-performance digital ecosystems. My mission: delivering{' '}
              <span className="font-bold text-white">unique, resilient, and custom-tailored solutions</span> that accelerate your ambitions.
            </h2>

            {/* Aeruk dual action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <Link
                href={`/contact?persona=${activePersona}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 group border"
                style={{
                  backgroundColor: `${themeAccent}28`,
                  borderColor: `${themeAccent}70`,
                  boxShadow: `0 0 25px -5px ${themeAccent}50`,
                }}
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href={`/services?persona=${activePersona}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white/80 hover:text-white transition-all duration-300 group border border-white/20 hover:border-white/40 bg-white/[0.03]"
              >
                <span>Explore Services</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-white/50 group-hover:text-white" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 3 Services Cards Grid (Aeruk signature) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {SERVICES.map((service) => {
            const isPersonaAffinity = service.personas.includes(activePersona)

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group relative flex flex-col justify-between p-8 md:p-9 rounded-[24px] border transition-all duration-500 bg-[#0c0d12]/90 hover:-translate-y-1.5"
                style={{
                  borderColor: isPersonaAffinity ? `${themeAccent}40` : 'rgba(255, 255, 255, 0.12)',
                  boxShadow: isPersonaAffinity
                    ? `0 4px 30px rgba(0, 0, 0, 0.7), 0 0 30px -10px ${themeAccent}25`
                    : '0 4px 30px rgba(0, 0, 0, 0.7)',
                }}
              >
                {/* Top: Icon + Badge */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center border transition-colors duration-300"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        borderColor: isPersonaAffinity ? `${themeAccent}50` : 'rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      {getServiceIcon(service.icon)}
                    </div>

                    {isPersonaAffinity && (
                      <span
                        className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border"
                        style={{
                          backgroundColor: `${themeAccent}18`,
                          borderColor: `${themeAccent}40`,
                          color: themeAccentLight,
                        }}
                      >
                        <Sparkles className="w-3 h-3" />
                        Focus
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display font-bold text-xl md:text-2xl text-white uppercase tracking-tight mb-2">
                    {service.title}
                  </h3>
                  <p
                    className="text-xs font-mono uppercase tracking-wider mb-4 font-medium"
                    style={{ color: themeAccentLight }}
                  >
                    {service.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm md:text-[15px] text-[#d6d6d6]/80 leading-relaxed mb-6 font-sans">
                    {service.description}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-2.5 pt-4 border-t border-white/[0.08]">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5 text-xs text-white/70">
                        <span className="text-[10px] mt-0.5" style={{ color: themeAccentLight }}>
                          ✦
                        </span>
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-8 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <Link
                    href={`/contact?persona=${activePersona}&service=${service.id}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70 group-hover:text-white transition-colors"
                  >
                    <span>Start This Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>

                  <div
                    className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150"
                    style={{ backgroundColor: themeAccent }}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Subtle bottom separator fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-15"
        style={{ background: `linear-gradient(to right, transparent, ${themeAccent}, transparent)` }}
      />
    </section>
  )
}
