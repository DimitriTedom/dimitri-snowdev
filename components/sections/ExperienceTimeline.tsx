'use client'

import { useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ExperienceWithPersonas } from '@/types/experience'
import { usePersona } from '@/hooks/usePersona'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ExperienceTimelineProps {
  experiences: ExperienceWithPersonas[]
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const { activePersona, personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const containerRef = useRef<HTMLDivElement>(null)
  const lineProgressRef = useRef<HTMLDivElement>(null)

  // Filter experiences for active persona
  const activeExperiences = useMemo(() => {
    return experiences.filter((exp) =>
      exp.experience_personas.some((ep) => ep.persona_id === activePersona)
    )
  }, [experiences, activePersona])

  // GSAP ScrollTrigger to animate the vertical progress line filling up
  useGSAP(() => {
    if (!lineProgressRef.current || !containerRef.current) return

    // Reset line scale
    gsap.set(lineProgressRef.current, { scaleY: 0, transformOrigin: 'top center' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: 1, // Smooth animation linked to scroll speed
      }
    })

    tl.to(lineProgressRef.current, {
      scaleY: 1,
      ease: 'none',
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, { scope: containerRef, dependencies: [activeExperiences] })

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto px-4 py-10 overflow-hidden"
    >
      <h3 className="font-display text-center text-2xl font-bold uppercase tracking-wider text-text-primary mb-16">
        Professional <span className="text-gradient">Timeline</span>
      </h3>

      {activeExperiences.length === 0 ? (
        <div className="text-center py-10 text-text-muted">
          No experience items recorded for this persona.
        </div>
      ) : (
        <div className="relative">
          {/* Central vertical line track */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 bottom-2 w-1 bg-glass-border/20 rounded-full" />

          {/* GSAP Scroll-driven progress line */}
          <div 
            ref={lineProgressRef}
            className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 bottom-2 w-1 rounded-full pointer-events-none filter blur-[0.5px]"
            style={{
              background: `linear-gradient(to bottom, ${themeAccent}dd, ${themeAccent}55)`,
              boxShadow: `0 0 10px ${themeAccent}aa`
            }}
          />

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-16 relative">
            {activeExperiences.map((exp, idx) => {
              const isEven = idx % 2 === 0
              
              return (
                <div 
                  key={exp.id}
                  className={`flex flex-col md:flex-row items-start md:items-center w-full relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Point Indicator */}
                  <div 
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-bg-deep transition-all duration-300 z-10"
                    style={{
                      borderColor: themeAccent,
                      boxShadow: `0 0 8px ${themeAccent}`
                    }}
                  />

                  {/* Experience Card Spacer (Desktop) */}
                  <div className="hidden md:block w-1/2" />

                  {/* Experience Card content */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.1 }}
                    className="w-full md:w-[45%] ml-10 md:ml-0 p-6 rounded-2xl bg-bg-surface/30 backdrop-blur-glass border border-glass-border/40 hover:border-glass-border transition-all duration-300 shadow-glass group relative"
                  >
                    {/* Glowing highlight on hover */}
                    <div 
                      className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 blur-[10px]"
                      style={{ backgroundColor: themeAccent }}
                    />

                    {/* Header */}
                    <div className="flex items-start gap-4 pb-3 border-b border-glass-border/20">
                      <div 
                        className="p-2.5 rounded-xl border border-glass-border/45 bg-bg-surface/50 text-text-primary"
                        style={{ color: themeAccent }}
                      >
                        <Briefcase size={18} />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-display font-bold text-base text-text-primary uppercase tracking-tight">
                          {exp.position}
                        </h4>
                        <span className="text-xs text-text-muted font-medium mt-0.5">
                          {exp.company}
                        </span>
                      </div>
                    </div>

                    {/* Metadata (Duration / Location / Type) */}
                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-text-muted mt-3.5">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} />
                        {exp.type}
                      </span>
                    </div>

                    {/* Description */}
                    {exp.description && (
                      <p className="text-xs text-text-secondary leading-relaxed font-light mt-3.5 border-t border-glass-border/10 pt-3">
                        {exp.description}
                      </p>
                    )}

                    {/* Skills badges */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {exp.skills.map((skill) => (
                          <span 
                            key={skill}
                            className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-black/35 text-text-muted hover:text-white transition-colors"
                            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
