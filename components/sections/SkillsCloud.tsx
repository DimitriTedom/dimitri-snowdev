'use client'

import { useMemo } from 'react'
import { motion, Variants } from 'framer-motion'
import { SkillWithPersonas } from '@/types/skill'
import { usePersona } from '@/hooks/usePersona'

interface SkillsCloudProps {
  skills: SkillWithPersonas[]
}

// Map database slugs to Devicon/SimpleIcons names
const getIconUrl = (slug?: string) => {
  if (!slug) return null

  let cleanSlug = slug.toLowerCase()
  let source: 'devicon' | 'simpleicons' = 'devicon'

  // Map slugs to devicon names
  if (cleanSlug === 'nextdotjs') {
    cleanSlug = 'nextjs'
  } else if (cleanSlug === 'nodedotjs') {
    cleanSlug = 'nodejs'
  } else if (cleanSlug === 'amazonaws') {
    cleanSlug = 'amazonwebservices'
  } else if (cleanSlug === 'openai' || cleanSlug === 'n8n' || cleanSlug === 'groq') {
    source = 'simpleicons'
  }

  if (source === 'simpleicons') {
    return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${cleanSlug}.svg`
  }

  // Devicon CDN structure
  const deviconSlug = cleanSlug
  if (deviconSlug === 'react') return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg`
  if (deviconSlug === 'nextjs') return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg`
  if (deviconSlug === 'typescript') return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg`
  if (deviconSlug === 'tailwindcss') return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg`
  if (deviconSlug === 'nodejs') return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg`
  if (deviconSlug === 'express') return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg`
  if (deviconSlug === 'postgresql') return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg`
  if (deviconSlug === 'supabase') return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg`
  if (deviconSlug === 'mongodb') return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg`
  if (deviconSlug === 'figma') return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg`
  if (deviconSlug === 'canva') return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg`
  if (deviconSlug === 'amazonwebservices') return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg`
  if (deviconSlug === 'docker') return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg`
  if (deviconSlug === 'vercel') return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg`

  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconSlug}/${deviconSlug}-original.svg`
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
}

export default function SkillsCloud({ skills }: SkillsCloudProps) {
  const { activePersona, personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'

  // Filter skills for the active persona
  const activeSkills = useMemo(() => {
    return skills.filter((skill) =>
      skill.skill_personas.some((sp) => sp.persona_id === activePersona)
    )
  }, [skills, activePersona])

  // Group by category
  const groupedSkills = useMemo(() => {
    const groups: Record<string, SkillWithPersonas[]> = {}
    activeSkills.forEach((skill) => {
      let cat: string = skill.category
      if (cat === 'Database') cat = 'Backend & DB'
      if (cat === 'Backend' && !groups['Backend & DB']) cat = 'Backend & DB'
      if (cat === 'Language' && skill.id === 'typescript') cat = 'Frontend'
      
      if (!groups[cat]) {
        groups[cat] = []
      }
      groups[cat].push(skill)
    })
    return groups
  }, [activeSkills])

  return (
    <div className="w-full flex flex-col gap-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activePersona}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {Object.entries(groupedSkills).map(([category, items]) => (
          <div 
            key={category} 
            className="p-6 rounded-2xl bg-bg-surface/30 backdrop-blur-glass border border-glass-border/40 hover:border-glass-border transition-all duration-300 shadow-glass flex flex-col gap-4"
          >
            <h3 className="font-display text-lg font-bold tracking-wider uppercase text-text-primary border-b border-glass-border/20 pb-2">
              {category}
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {items.map((skill) => {
                const iconUrl = getIconUrl(skill.icon_slug)
                
                return (
                  <motion.div
                    key={skill.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-bg-surface/50 border border-glass-border/30 hover:border-glass-border transition-all duration-300"
                    style={{
                      boxShadow: `0 4px 20px -5px rgba(0, 0, 0, 0.3)`,
                    }}
                  >
                    <div 
                      className="absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-[8px]"
                      style={{ backgroundColor: themeAccent }}
                    />

                    {iconUrl ? (
                      <img
                        src={iconUrl}
                        alt={`${skill.name} icon`}
                        className="w-5 h-5 object-contain filter group-hover:brightness-110 transition-all"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none'
                        }}
                      />
                    ) : (
                      <div 
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: themeAccent }}
                      />
                    )}

                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-text-primary">
                        {skill.name}
                      </span>
                    </div>

                    <span 
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-text-muted group-hover:text-white transition-colors"
                      style={{
                        border: `1px solid ${themeAccent}22`
                      }}
                    >
                      {skill.proficiency}%
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
