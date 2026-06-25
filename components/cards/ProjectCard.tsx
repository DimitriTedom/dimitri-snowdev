'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ProjectWithPersonas } from '@/types/project'
import { usePersona } from '@/hooks/usePersona'
import { BorderBeam } from '@/components/ui/border-beam'
import { ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  project: ProjectWithPersonas
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { activePersona, personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || '#ae6bf6'

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative flex flex-col gap-3.5 w-full bg-transparent"
    >
      {/* Featured Border Beam */}
      {project.featured && (
        <BorderBeam 
          colorFrom={themeAccent}
          colorTo={themeAccentLight}
          size={200}
          duration={6}
          borderWidth={1.5}
        />
      )}

      {/* Image Container */}
      <div 
        className="relative aspect-[16/9] w-full overflow-hidden border border-glass-border bg-bg-surface/30 shadow-glass rounded-card"
        style={{
          boxShadow: project.featured ? `0 0 25px -10px ${themeAccent}44` : '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
        }}
      >
        <Image
          src={project.image_url}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={project.featured}
        />
        {/* Hover overlay link */}
        <div className="absolute inset-0 bg-bg-deep/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-transform duration-300 scale-90 group-hover:scale-100"
            style={{ backgroundColor: `${themeAccent}99` }}
          >
            <ExternalLink size={18} />
          </div>
        </div>
      </div>

      {/* Card Info Stack */}
      <div className="flex flex-col gap-1 px-1">
        
        {/* Category & Date */}
        <div className="flex justify-between items-center text-[10px] tracking-wider uppercase font-semibold font-sans mt-0.5">
          <span className="bg-[#1D1D1D] text-[#D6D6D6] rounded-[5px] px-2.5 py-1 border border-glass-border/30">
            {project.category}
          </span>
          <span className="text-text-muted">{project.date.split('-')[0]}</span>
        </div>

        {/* Title */}
        <h3 
          className="font-display font-bold text-lg md:text-xl uppercase tracking-tight text-white mt-1.5 transition-colors duration-300"
          style={{
            color: 'var(--title-color)',
            '--title-color': '#ffffff',
          } as React.CSSProperties}
          onMouseEnter={(e) => e.currentTarget.style.color = themeAccent}
          onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
        >
          <Link href={`/projects/${project.slug}?persona=${activePersona}`}>
            {project.title}
          </Link>
        </h3>

        {/* Description Excerpt */}
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 font-sans mt-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {project.tags.slice(0, 5).map((tag) => (
            <span 
              key={tag} 
              className="text-[9px] font-mono text-text-muted px-2 py-0.5 rounded bg-bg-surface/20 border border-glass-border/10"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </motion.div>
  )
}
