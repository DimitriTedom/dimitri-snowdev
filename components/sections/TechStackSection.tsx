'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { usePersona } from '@/hooks/usePersona'
import { SKILLS } from '@/data/skills'

// Map skill slugs → Devicon / SimpleIcons CDN URL
const getIconUrl = (slug?: string): string | null => {
  if (!slug) return null
  let s = slug.toLowerCase()

  if (s === 'nextdotjs') s = 'nextjs'
  if (s === 'nodedotjs') s = 'nodejs'
  if (s === 'amazonaws') s = 'amazonwebservices'

  const simpleIcons = ['openai', 'n8n', 'groq']
  if (simpleIcons.includes(s)) {
    return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${s}.svg`
  }

  const deviconMap: Record<string, string> = {
    react: 'react/react-original',
    nextjs: 'nextjs/nextjs-original',
    typescript: 'typescript/typescript-original',
    tailwindcss: 'tailwindcss/tailwindcss-original',
    nodejs: 'nodejs/nodejs-original',
    express: 'express/express-original',
    postgresql: 'postgresql/postgresql-original',
    supabase: 'supabase/supabase-original',
    mongodb: 'mongodb/mongodb-original',
    figma: 'figma/figma-original',
    canva: 'canva/canva-original',
    amazonwebservices: 'amazonwebservices/amazonwebservices-original-wordmark',
    docker: 'docker/docker-original',
    vercel: 'vercel/vercel-original',
    python: 'python/python-original',
    graphql: 'graphql/graphql-plain',
    redis: 'redis/redis-original',
    git: 'git/git-original',
  }

  const path = deviconMap[s] ?? `${s}/${s}-original`
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}.svg`
}

// Category label mapping
const CATEGORY_LABELS: Record<string, string> = {
  Frontend: 'Frontend',
  Backend: 'Backend',
  Language: 'Languages',
  Database: 'Databases',
  Cloud: 'Cloud & DevOps',
  'AI/ML': 'AI & ML',
  Design: 'Design',
  Tool: 'Tools',
}

export default function TechStackSection() {
  const { activePersona, personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || themeAccent

  const activeSkills = useMemo(() => {
    return SKILLS.filter((s) =>
      s.skill_personas.some((sp) => sp.persona_id === activePersona)
    ).sort((a, b) => a.sort_order - b.sort_order)
  }, [activePersona])

  // Group by category
  const grouped = useMemo(() => {
    const map = new Map<string, typeof SKILLS>()
    activeSkills.forEach((skill) => {
      const label = CATEGORY_LABELS[skill.category] ?? skill.category
      if (!map.has(label)) map.set(label, [])
      map.get(label)!.push(skill)
    })
    return map
  }, [activeSkills])

  return (
    <section className="relative w-full py-24 md:py-32 px-6 overflow-hidden">
      {/* Section header */}
      <div className="max-w-6xl mx-auto">
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
            Tech Arsenal
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-white leading-none">
            Stack &amp;{' '}
            <span
              style={{
                background: `linear-gradient(to right, #ffffff 0%, ${themeAccent} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Tools
            </span>
          </h2>
        </motion.div>

        {/* Skill groups */}
        <motion.div
          key={activePersona}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="flex flex-col gap-10"
        >
          {Array.from(grouped.entries()).map(([category, skills]) => (
            <motion.div
              key={category}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              {/* Category label */}
              <p className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-white/30 mb-4">
                {category}
              </p>

              {/* Icon pill grid */}
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill) => {
                  const iconUrl = getIconUrl(skill.icon_slug)
                  return (
                    <motion.div
                      key={skill.id}
                      whileHover={{ y: -3, scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="group relative flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-white/[0.16] hover:bg-white/[0.06] transition-all duration-200 cursor-default"
                    >
                      {/* Accent glow on hover */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"
                        style={{ background: `${themeAccent}18` }}
                      />

                      {/* Icon */}
                      {iconUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={iconUrl}
                          alt={skill.name}
                          className="w-4 h-4 object-contain shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none'
                          }}
                        />
                      ) : (
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: themeAccent }}
                        />
                      )}

                      {/* Name */}
                      <span className="text-xs font-medium text-white/60 group-hover:text-white/90 transition-colors duration-200 whitespace-nowrap">
                        {skill.name}
                      </span>

                      {/* Proficiency bar — tooltip style */}
                      <span
                        className="text-[10px] font-mono text-white/25 group-hover:text-white/50 transition-colors duration-200"
                        style={{ color: skill.proficiency >= 85 ? themeAccentLight : undefined }}
                      >
                        {skill.proficiency}%
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-20"
        style={{ background: `linear-gradient(to right, transparent, ${themeAccent}, transparent)` }}
      />
    </section>
  )
}
