'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { usePersona } from '@/hooks/usePersona'
import { SERVICES } from '@/data/services'

export default function ServicesPage() {
  const { activePersona, personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || themeAccent

  const [activeFilter, setActiveFilter] = useState<string>('all')

  const filteredServices =
    activeFilter === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.id === activeFilter)

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb & Header — Aeruk style */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/50 mb-3">
            HOME &gt; SERVICES
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-8">
            MES SERVICES
          </h1>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-xl mx-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-white text-black border-white'
                  : 'bg-[#1d1d1d] text-white/70 border-white/10 hover:border-white/30'
              }`}
            >
              Tous
            </button>
            {SERVICES.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveFilter(service.id)}
                className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${
                  activeFilter === service.id
                    ? 'border-white text-white'
                    : 'bg-[#1d1d1d] text-white/70 border-white/10 hover:border-white/30'
                }`}
                style={{
                  backgroundColor: activeFilter === service.id ? `${themeAccent}30` : undefined,
                  borderColor: activeFilter === service.id ? themeAccent : undefined,
                }}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Service Rows (Aeruk Inspiration layout) */}
        <div className="space-y-20 md:space-y-28">
          {filteredServices.map((service, index) => {
            const isPersonaAffinity = service.personas.includes(activePersona)

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center border-b border-white/[0.08] pb-16 md:pb-20"
              >
                {/* Left Column: Details, Features, CTAs */}
                <div className="lg:col-span-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs font-mono uppercase tracking-wider font-semibold"
                      style={{ color: themeAccentLight }}
                    >
                      0{index + 1} {'//'} {service.tagline}
                    </span>
                    {isPersonaAffinity && (
                      <span
                        className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: `${themeAccent}18`,
                          borderColor: `${themeAccent}40`,
                          color: themeAccentLight,
                        }}
                      >
                        <Sparkles className="w-2.5 h-2.5" /> Recommandé
                      </span>
                    )}
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">
                    {service.title}
                  </h2>

                  <p className="text-[#d6d6d6] text-sm md:text-base leading-relaxed mb-6 font-sans">
                    {service.description}
                  </p>

                  {/* Bullet points with crystal markers */}
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 text-xs md:text-sm text-white/80">
                        <span className="mt-0.5" style={{ color: themeAccentLight }}>
                          ✦
                        </span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href={`/projects?persona=${activePersona}`}
                      className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white border border-white/20 hover:border-white/40 bg-white/[0.03] transition-all"
                    >
                      Voir les projets
                    </Link>

                    <Link
                      href={`/contact?persona=${activePersona}&service=${service.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-white transition-all border"
                      style={{
                        backgroundColor: `${themeAccent}28`,
                        borderColor: `${themeAccent}70`,
                        boxShadow: `0 0 20px -5px ${themeAccent}40`,
                      }}
                    >
                      <span>Start a project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Deliverables Card / Visual Panel */}
                <div className="lg:col-span-6">
                  <div
                    className="p-8 md:p-10 rounded-[24px] border border-white/[0.12] bg-[#0c0d12]/90 backdrop-blur-md relative overflow-hidden"
                    style={{
                      boxShadow: '0 4px 35px rgba(0,0,0,0.8)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                      <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                        Livrables inclus
                      </span>
                      <span
                        className="text-xs font-mono uppercase font-bold"
                        style={{ color: themeAccentLight }}
                      >
                        Production-Ready
                      </span>
                    </div>

                    <div className="space-y-4">
                      {service.deliverables.map((deliverable) => (
                        <div key={deliverable} className="flex items-start gap-3 text-sm text-white/90">
                          <CheckCircle2
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: themeAccentLight }}
                          />
                          <span className="leading-snug">{deliverable}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/50">
                      <span>Accompagnement continu</span>
                      <span className="font-mono text-white/80">Support inclus</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA Block — Aeruk signature */}
        <div className="mt-28 text-center p-12 md:p-16 rounded-[28px] border border-white/[0.12] bg-[#0c0d12]/60 backdrop-blur-md max-w-4xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">
            Prêt à donner vie à votre projet ?
          </h2>
          <p className="text-[#d6d6d6] text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Parlez-moi de vos idées et objectifs, échangeons sur votre vision et concevons ensemble une solution à fort impact.
          </p>
          <Link
            href={`/contact?persona=${activePersona}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white transition-all border"
            style={{
              backgroundColor: `${themeAccent}30`,
              borderColor: `${themeAccent}70`,
              boxShadow: `0 0 30px -5px ${themeAccent}50`,
            }}
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
