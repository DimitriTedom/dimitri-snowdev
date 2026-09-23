'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ProjectWithPersonas } from '@/types/project'
import { usePersona } from '@/hooks/usePersona'
import { ArrowUpRight } from 'lucide-react'

interface ProjectCardProps {
  project: ProjectWithPersonas
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { activePersona, personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || '#ae6bf6'

  // Format index as 2-digit zero-padded string: 01, 02, etc.
  const formattedIndex = String(index + 1).padStart(2, '0')
  const projectYear = project.date ? project.date.split('-')[0] : '2025'

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col w-full bg-transparent"
    >
      {/* Top Hairline Divider & Monospace Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs tracking-widest text-text-muted">
        <div className="flex items-center gap-3">
          <span 
            className="font-bold text-sm transition-colors duration-300"
            style={{ color: themeAccentLight }}
          >
            {formattedIndex}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="uppercase text-white/70">{project.category}</span>
        </div>
        <span className="text-white/40">{projectYear}</span>
      </div>

      {/* Cinematic Media Container (Aspect 812/568 inspired by Trionn) */}
      <div 
        data-project-thumb="true"
        className="relative mt-4 mb-5 aspect-[16/10] sm:aspect-[812/568] w-full overflow-hidden rounded-lg sm:rounded-xl border border-white/10 bg-bg-surface/40 shadow-glass"
      >

        <Image
          src={project.image_url}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={index < 2}
        />

        {/* Cinematic Scrim & Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
        
        {/* Floating Quick Action Badge on Corner */}
        <Link
          href={`/projects/${project.slug}?persona=${activePersona}`}
          aria-label={`View ${project.title}`}
          className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90 hover:bg-white hover:text-black"
        >
          <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* Bottom Information Stack */}
      <div className="flex flex-col gap-3">
        {/* Title */}
        <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-white group-hover:text-white transition-colors duration-300">
          <Link 
            href={`/projects/${project.slug}?persona=${activePersona}`}
            className="hover:underline decoration-white/30 underline-offset-4"
          >
            {project.title}
          </Link>
        </h3>

        {/* Narrative Description */}
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-sans line-clamp-2 font-light">
          {project.description}
        </p>

        {/* Metadata Stack & Kinetic Explore Pill Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono uppercase tracking-wider text-text-muted px-2.5 py-1 rounded border border-white/10 bg-white/[0.02]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Trionn-style Kinetic "Explore Project" Pill */}
          <Link
            href={`/projects/${project.slug}?persona=${activePersona}`}
            className="group/btn relative inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/[0.03] hover:bg-white text-white hover:text-black font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer backdrop-blur-sm"
          >
            <span>Explore Project</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
