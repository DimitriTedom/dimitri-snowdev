'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ProjectWithPersonas } from '@/types/project'
import { PersonaId } from '@/types/persona'
import { ArrowUpRight } from 'lucide-react'

interface ProjectDetailNextProjectBannerProps {
  nextProject: ProjectWithPersonas
  personaId: PersonaId
  themeAccent?: string
  themeAccentLight?: string
}

export default function ProjectDetailNextProjectBanner({
  nextProject,
  personaId,
  themeAccentLight = '#ae6bf6',
}: ProjectDetailNextProjectBannerProps) {
  const nextImage = nextProject.image_url || '/ChezFlora_Thumbnail.png'

  return (
    <section className="relative w-full bg-black border-t border-white/10 overflow-hidden">
      <Link
        href={`/projects/${nextProject.slug}?persona=${personaId}`}
        className="group relative block w-full py-24 sm:py-32 md:py-40 px-6 sm:px-12 md:px-20 overflow-hidden cursor-pointer"
      >
        {/* Background Teaser with Dark Overlay & Zoom on Hover */}
        <div className="absolute inset-0 z-0">
          <Image
            src={nextImage}
            alt={nextProject.title}
            fill
            sizes="100vw"
            className="object-cover opacity-20 filter grayscale group-hover:grayscale-0 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/90 pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto max-w-[1200px] flex flex-col items-center text-center">
          
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-white/50 mb-4"
          >
            <span>Next Project</span>
            <span style={{ color: themeAccentLight }}>→</span>
          </motion.div>

          {/* Huge Next Project Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-white transition-transform duration-500 ease-out group-hover:scale-[1.02] flex items-center justify-center gap-3 sm:gap-4"
          >
            <span>{nextProject.title}</span>
            <ArrowUpRight 
              size={36} 
              className="text-white/40 group-hover:text-white group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-all duration-300 hidden sm:inline-block" 
            />
          </motion.h2>

          {/* Category Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm font-mono tracking-wider text-white/40 uppercase mt-4"
          >
            {nextProject.category} {'//'} {nextProject.date.slice(0, 4)}
          </motion.p>

        </div>
      </Link>
    </section>
  )
}
