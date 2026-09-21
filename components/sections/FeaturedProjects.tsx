'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { usePersona } from '@/hooks/usePersona'
import { PROJECTS } from '@/data/projects'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function FeaturedProjects() {
  const { activePersona, personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || themeAccent

  // Get top 3 featured projects for the active persona
  // Priority: relevance 2 first, then relevance 1, then cross-persona featured
  const featuredProjects = useMemo(() => {
    const personaProjects = PROJECTS.filter(
      (p) =>
        p.is_published &&
        p.featured &&
        p.project_personas.some((pp) => pp.persona_id === activePersona)
    ).sort((a, b) => {
      const aRel = a.project_personas.find((pp) => pp.persona_id === activePersona)?.relevance ?? 0
      const bRel = b.project_personas.find((pp) => pp.persona_id === activePersona)?.relevance ?? 0
      return bRel - aRel || a.sort_order - b.sort_order
    })

    // Fallback: if less than 3 persona-specific, pad with other featured projects
    if (personaProjects.length >= 3) return personaProjects.slice(0, 3)

    const remaining = PROJECTS.filter(
      (p) =>
        p.is_published &&
        p.featured &&
        !personaProjects.find((pp) => pp.id === p.id)
    ).sort((a, b) => a.sort_order - b.sort_order)

    return [...personaProjects, ...remaining].slice(0, 3)
  }, [activePersona])

  if (featuredProjects.length === 0) return null

  return (
    <section className="relative w-full py-24 md:py-32 px-6 overflow-hidden">
      {/* Section header */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12 md:mb-16"
        >
          <div>
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 font-display"
              style={{ color: themeAccent }}
            >
              Featured Work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-white leading-none">
              Selected
              <br />
              <span
                style={{
                  background: `linear-gradient(to right, #ffffff 0%, ${themeAccent} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Projects
              </span>
            </h2>
          </div>

          <Link
            href={`/projects?persona=${activePersona}`}
            className="hidden md:flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors duration-200 group"
          >
            View all projects
            <ArrowUpRight
              className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </Link>
        </motion.div>

        {/* Projects grid — 1 large + 2 stacked on desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
        >
          {/* Large featured card — first project */}
          <motion.div variants={cardVariants} className="md:row-span-2">
            <ProjectCard
              project={featuredProjects[0]}
              themeAccent={themeAccent}
              themeAccentLight={themeAccentLight}
              activePersona={activePersona}
              size="large"
            />
          </motion.div>

          {/* Two smaller cards stacked */}
          {featuredProjects[1] && (
            <motion.div variants={cardVariants}>
              <ProjectCard
                project={featuredProjects[1]}
                themeAccent={themeAccent}
                themeAccentLight={themeAccentLight}
                activePersona={activePersona}
                size="small"
              />
            </motion.div>
          )}
          {featuredProjects[2] && (
            <motion.div variants={cardVariants}>
              <ProjectCard
                project={featuredProjects[2]}
                themeAccent={themeAccent}
                themeAccentLight={themeAccentLight}
                activePersona={activePersona}
                size="small"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Mobile "view all" link */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href={`/projects?persona=${activePersona}`}
            className="flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors duration-200"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Subtle bottom separator fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-20"
        style={{ background: `linear-gradient(to right, transparent, ${themeAccent}, transparent)` }}
      />
    </section>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: (typeof PROJECTS)[number]
  themeAccent: string
  themeAccentLight: string
  activePersona: string
  size: 'large' | 'small'
}

function ProjectCard({ project, themeAccent, themeAccentLight, activePersona, size }: ProjectCardProps) {
  const isLarge = size === 'large'

  return (
    <Link
      href={`/projects/${project.slug}?persona=${activePersona}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a0a0c] hover:border-white/[0.14] transition-all duration-300 ${
        isLarge ? 'h-[420px] md:h-full md:min-h-[520px]' : 'h-[240px] md:h-[248px]'
      }`}
      style={{
        boxShadow: '0 1px 40px rgba(0,0,0,0.5)',
      }}
    >
      {/* Thumbnail */}
      <div className={`relative w-full overflow-hidden ${isLarge ? 'h-[55%]' : 'h-[55%]'}`}>
        <Image
          src={project.image_url}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={isLarge ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <span
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md"
            style={{ backgroundColor: `${themeAccent}cc`, color: '#fff' }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View case study
          </span>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="text-[10px] font-semibold px-2 py-1 rounded-md backdrop-blur-md font-mono uppercase tracking-wider"
            style={{
              backgroundColor: `${themeAccent}22`,
              color: themeAccentLight,
              border: `1px solid ${themeAccent}44`,
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 md:p-5">
        <h3
          className={`font-display font-bold text-white tracking-tight leading-tight mb-1.5 ${
            isLarge ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
          }`}
        >
          {project.title}
        </h3>

        {isLarge && (
          <p className="text-xs md:text-sm text-white/50 leading-relaxed line-clamp-2 mb-3">
            {project.description}
          </p>
        )}

        {/* Tags + links */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, isLarge ? 4 : 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-1.5 py-0.5 rounded text-white/40 bg-white/[0.05]"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {project.code_url && (
              <span
                onClick={(e) => {
                  e.preventDefault()
                  window.open(project.code_url, '_blank')
                }}
                className="text-white/30 hover:text-white transition-colors duration-200 cursor-pointer"
                title="Source code"
              >
                <Github className="w-3.5 h-3.5" />
              </span>
            )}
            <ArrowUpRight
              className="w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
              style={{ color: undefined }}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}
