'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { usePersona } from '@/hooks/usePersona'
import { PROJECTS } from '@/data/projects'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function FeaturedProjects() {
  const { activePersona, personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || themeAccent

  // Get top 4 featured projects for the active persona (for a balanced 2x2 grid)
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

    // Fallback: if less than 4 persona-specific, pad with other featured projects
    if (personaProjects.length >= 4) return personaProjects.slice(0, 4)

    const remaining = PROJECTS.filter(
      (p) =>
        p.is_published &&
        p.featured &&
        !personaProjects.find((pp) => pp.id === p.id)
    ).sort((a, b) => a.sort_order - b.sort_order)

    return [...personaProjects, ...remaining].slice(0, 4)
  }, [activePersona])

  if (featuredProjects.length === 0) return null

  return (
    <section id="projects" className="relative w-full py-16 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section header — Aeruk inspired */}
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
              Selected Works
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-white leading-tight">
              Featured
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

          {/* Aeruk-style capsule pill button */}
          <Link
            href={`/projects?persona=${activePersona}`}
            className="self-start md:self-end inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium text-white transition-all duration-300 group border"
            style={{
              backgroundColor: `${themeAccent}20`,
              borderColor: `${themeAccent}50`,
              boxShadow: `0 0 20px -5px ${themeAccent}40`,
            }}
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* 2-Column Aeruk Grid (2x2 balanced layout) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <AerukProjectCard
                project={project}
                themeAccent={themeAccent}
                themeAccentLight={themeAccentLight}
                activePersona={activePersona}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All button */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link
            href={`/projects?persona=${activePersona}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white border"
            style={{
              backgroundColor: `${themeAccent}20`,
              borderColor: `${themeAccent}50`,
            }}
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Subtle section divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-15"
        style={{ background: `linear-gradient(to right, transparent, ${themeAccent}, transparent)` }}
      />
    </section>
  )
}

// ─── Aeruk Style Project Card ───────────────────────────────────────────────────

interface AerukProjectCardProps {
  project: (typeof PROJECTS)[number]
  themeAccent: string
  themeAccentLight: string
  activePersona: string
}

function AerukProjectCard({
  project,
  themeAccent,
  themeAccentLight,
  activePersona,
}: AerukProjectCardProps) {
  // Extract subtitle format: e.g. "WEB APPS • TYPESCRIPT"
  const subtitle = `${project.category.toUpperCase()} ${
    project.tags[0] ? `• ${project.tags[0].toUpperCase()}` : ''
  }`

  return (
    <Link
      href={`/projects/${project.slug}?persona=${activePersona}`}
      className="group flex flex-col gap-4 cursor-pointer"
    >
      {/* 1. Image container with border-radius: 24px and inner bottom overlay */}
      <div
        className="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden border border-white/[0.12] transition-all duration-500 group-hover:border-white/[0.24]"
        style={{
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.7)',
        }}
      >
        <Image
          src={project.image_url}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Top-right floating glass arrow */}
        <div className="absolute top-4 right-4 z-10">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 group-hover:scale-110"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderColor: `${themeAccent}40`,
            }}
          >
            <ArrowUpRight
              className="w-4 h-4 transition-colors"
              style={{
                color: themeAccentLight,
              }}
            />
          </div>
        </div>

        {/* Bottom gradient scrim with Title & Subtitle inside the image (Aeruk signature) */}
        <div className="absolute inset-x-0 bottom-0 pt-28 pb-5 px-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col justify-end">
          <h3 className="font-display font-bold uppercase text-lg sm:text-xl md:text-2xl text-white tracking-tight leading-snug line-clamp-2 group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p
            className="font-mono uppercase text-xs tracking-wider mt-1 font-medium line-clamp-1"
            style={{ color: themeAccentLight }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* 2. Below the image: Badges & narrative summary (Aeruk exact) */}
      <div className="flex flex-col gap-2.5 px-1">
        {/* Badges in #1d1d1d */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-full text-[#d6d6d6] bg-[#1d1d1d] border border-white/[0.12] transition-colors group-hover:border-white/[0.22]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Narrative Description excerpt */}
        <p className="text-sm md:text-[15px] text-[#d6d6d6]/80 leading-relaxed line-clamp-3 font-sans mt-0.5">
          {project.description}
        </p>
      </div>
    </Link>
  )
}
