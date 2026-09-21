'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Layers, Cpu, Cloud, Database, Code2 } from 'lucide-react'
import { usePersona } from '@/hooks/usePersona'
import { SKILLS } from '@/data/skills'
import { InteractiveIconCloud, IconCloudItem } from '@/components/ui/interactive-icon-cloud'

// Map skill slugs → Devicon / SimpleIcons CDN URL
const getIconUrl = (slug?: string): string | null => {
  if (!slug) return null
  let s = slug.toLowerCase()

  if (s === 'nextdotjs') s = 'nextjs'
  if (s === 'nodedotjs') s = 'nodejs'
  if (s === 'amazonaws') s = 'amazonwebservices'

  const simpleIcons = ['openai', 'n8n', 'groq', 'huggingface', 'anthropic']
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

// Category configuration with icons
const CATEGORY_CONFIG: Record<
  string,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  all: { label: 'All Technologies', icon: Layers },
  Frontend: { label: 'Frontend & UI', icon: Code2 },
  'AI/ML': { label: 'AI & Autonomous Agents', icon: Cpu },
  'AI & Automation': { label: 'AI & Automation', icon: Cpu },
  Backend: { label: 'Backend & APIs', icon: Layers },
  Database: { label: 'Databases & Storage', icon: Database },
  Cloud: { label: 'Cloud & Infrastructure', icon: Cloud },
}

export default function TechStackSection() {
  const { activePersona, personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || themeAccent

  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedSkill, setSelectedSkill] = useState<IconCloudItem | null>(null)

  // Get active skills filtered by active persona
  const activeSkills = useMemo(() => {
    return SKILLS.filter((s) =>
      s.skill_personas.some((sp) => sp.persona_id === activePersona)
    ).sort((a, b) => a.sort_order - b.sort_order)
  }, [activePersona])

  // Extract unique categories available for this persona
  const categories = useMemo(() => {
    const set = new Set<string>()
    activeSkills.forEach((s) => set.add(s.category))
    return ['all', ...Array.from(set)]
  }, [activeSkills])

  // Filter skills for list display
  const displayedSkills = useMemo(() => {
    if (activeCategory === 'all') return activeSkills
    return activeSkills.filter((s) => s.category === activeCategory)
  }, [activeSkills, activeCategory])

  // Map skills to 3D Icon Cloud format
  const cloudItems = useMemo<IconCloudItem[]>(() => {
    return activeSkills.map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      iconUrl: getIconUrl(s.icon_slug),
      proficiency: s.proficiency,
    }))
  }, [activeSkills])

  return (
    <section id="tech-stack" className="relative w-full py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-3 font-mono"
              style={{ color: themeAccent }}
            >
              Tech Arsenal
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-white leading-tight">
              Stack &amp;
              <br />
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
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-white/50 border border-white/10 rounded-full px-4 py-2 bg-white/[0.02]">
            <Sparkles className="w-3.5 h-3.5" style={{ color: themeAccentLight }} />
            <span>{activeSkills.length} Core Technologies Loaded</span>
          </div>
        </motion.div>

        {/* 2-Column Split: Interactive Skills Matrix + 3D Holographic Icon Sphere */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Category Filter Pills & Tech Grid */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((catKey) => {
                const config = CATEGORY_CONFIG[catKey] || {
                  label: catKey,
                  icon: Layers,
                }
                const Icon = config.icon
                const isActive = activeCategory === catKey

                return (
                  <button
                    key={catKey}
                    onClick={() => setActiveCategory(catKey)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${
                      isActive
                        ? 'text-white border-white bg-white/10 shadow-lg'
                        : 'text-white/60 border-white/10 bg-[#0c0d12]/80 hover:border-white/30 hover:text-white'
                    }`}
                    style={{
                      borderColor: isActive ? themeAccent : undefined,
                      backgroundColor: isActive ? `${themeAccent}25` : undefined,
                      boxShadow: isActive ? `0 0 20px -5px ${themeAccent}50` : undefined,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{config.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Tech Chips Grid */}
            <motion.div
              key={`${activePersona}-${activeCategory}`}
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              {displayedSkills.map((skill) => {
                const iconUrl = getIconUrl(skill.icon_slug)
                const isSelected = selectedSkill?.id === skill.id

                return (
                  <motion.div
                    key={skill.id}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                    }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    onClick={() =>
                      setSelectedSkill({
                        id: skill.id,
                        name: skill.name,
                        category: skill.category,
                        iconUrl,
                        proficiency: skill.proficiency,
                      })
                    }
                    className={`group relative flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'border-white bg-white/[0.08] shadow-xl'
                        : 'border-white/[0.08] bg-[#0c0d12]/90 hover:border-white/[0.2] hover:bg-white/[0.04]'
                    }`}
                    style={{
                      borderColor: isSelected ? themeAccent : undefined,
                      boxShadow: isSelected ? `0 0 25px -5px ${themeAccent}40` : undefined,
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {iconUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={iconUrl}
                          alt={skill.name}
                          className="w-5 h-5 object-contain shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                          onError={(e) => {
                            ;(e.target as HTMLElement).style.display = 'none'
                          }}
                        />
                      ) : (
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: themeAccent }}
                        />
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold text-white/90 group-hover:text-white truncate">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono text-white/40 truncate">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    {/* Mastery percentage */}
                    <span
                      className="text-[11px] font-mono font-medium shrink-0 ml-2"
                      style={{ color: skill.proficiency >= 85 ? themeAccentLight : 'rgba(255,255,255,0.35)' }}
                    >
                      {skill.proficiency}%
                    </span>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Selected Skill Quick Inspector Card */}
            <AnimatePresence mode="wait">
              {selectedSkill && (
                <motion.div
                  key={selectedSkill.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-5 rounded-2xl border border-white/15 bg-white/[0.02] backdrop-blur-md flex items-center justify-between"
                  style={{ borderColor: `${themeAccent}50` }}
                >
                  <div className="flex items-center gap-3.5">
                    {selectedSkill.iconUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={selectedSkill.iconUrl}
                        alt={selectedSkill.name}
                        className="w-8 h-8 object-contain"
                      />
                    )}
                    <div>
                      <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                        {selectedSkill.name}
                      </h4>
                      <p className="text-xs font-mono text-white/50">
                        {selectedSkill.category} • Professional Production Experience
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-sm font-mono font-bold px-3 py-1 rounded-full border"
                    style={{
                      backgroundColor: `${themeAccent}20`,
                      borderColor: `${themeAccent}50`,
                      color: themeAccentLight,
                    }}
                  >
                    {selectedSkill.proficiency}%
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: 3D Holographic Icon Cloud Sphere */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full relative flex items-center justify-center">
              <InteractiveIconCloud
                items={cloudItems}
                radius={190}
                highlightedCategory={activeCategory === 'all' ? null : activeCategory}
                onSelectSkill={(item) => setSelectedSkill(item)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom subtle separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-20"
        style={{ background: `linear-gradient(to right, transparent, ${themeAccent}, transparent)` }}
      />
    </section>
  )
}
