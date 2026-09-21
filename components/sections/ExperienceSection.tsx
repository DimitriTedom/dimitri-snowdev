'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'
import { usePersona } from '@/hooks/usePersona'
import { EXPERIENCES } from '@/data/experiences'

export default function ExperienceSection() {
  const { activePersona, personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || themeAccent

  const activeExperiences = useMemo(() => {
    return EXPERIENCES.filter((exp) =>
      exp.experience_personas.some((ep) => ep.persona_id === activePersona)
    ).sort((a, b) => a.sort_order - b.sort_order)
  }, [activePersona])

  if (activeExperiences.length === 0) return null

  return (
    <section className="relative w-full py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 font-display"
            style={{ color: themeAccent }}
          >
            Career
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-white leading-none">
            Work{' '}
            <span
              style={{
                background: `linear-gradient(to right, #ffffff 0%, ${themeAccent} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Experience
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute left-4 md:left-6 top-2 bottom-2 w-px origin-top"
            style={{ backgroundColor: `${themeAccent}44` }}
          />

          <div className="flex flex-col gap-8 md:gap-10">
            {activeExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
                className="relative pl-12 md:pl-16"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-[11px] md:left-[18px] top-5 w-3 h-3 rounded-full border-2 border-current ring-4 ring-black"
                  style={{ borderColor: themeAccent, color: themeAccent, backgroundColor: '#000' }}
                />

                {/* Card */}
                <div className="group p-5 md:p-6 rounded-2xl border border-white/[0.07] bg-[#0a0a0c] hover:border-white/[0.14] transition-all duration-300">
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-display text-base md:text-lg font-bold text-white leading-tight">
                        {exp.position}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Briefcase className="w-3.5 h-3.5" style={{ color: themeAccentLight }} />
                        <span
                          className="text-xs font-semibold"
                          style={{ color: themeAccentLight }}
                        >
                          {exp.company}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <Calendar className="w-3 h-3 text-white/30" />
                      <span className="text-[11px] font-mono text-white/40">{exp.duration}</span>
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                        style={{
                          color: themeAccent,
                          borderColor: `${themeAccent}44`,
                          backgroundColor: `${themeAccent}11`,
                        }}
                      >
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/50 leading-relaxed mb-4">{exp.description}</p>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono px-2 py-0.5 rounded text-white/40 bg-white/[0.04] border border-white/[0.06]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-20"
        style={{ background: `linear-gradient(to right, transparent, ${themeAccent}, transparent)` }}
      />
    </section>
  )
}
