'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ProjectWithPersonas } from '@/types/project'
import { usePersona } from '@/hooks/usePersona'
import { ArrowUpRight } from 'lucide-react'

interface ProjectCardProps {
  project: ProjectWithPersonas
  index: number
  isRevealed?: boolean
}

export default function ProjectCard({ project, index, isRevealed = true }: ProjectCardProps) {
  const { activePersona, personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || '#ae6bf6'

  const cardRef = React.useRef<HTMLDivElement>(null)
  const thumbRef = React.useRef<HTMLDivElement>(null)

  // ─── 1. Scroll-Linked Image Parallax (Signature Trionn Effect) ───
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  // Subtle vertical glide as you scroll through the card
  const imageY = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.05, 1.14])

  // ─── 2. Interactive 3D Perspective Tilt & Floating Cursor ───
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0, isHovered: false })

  const springConfig = { damping: 20, stiffness: 200 }
  const tiltX = useSpring(0, springConfig)
  const tiltY = useSpring(0, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!thumbRef.current) return
    const rect = thumbRef.current.getBoundingClientRect()
    const relativeX = (e.clientX - rect.left) / rect.width
    const relativeY = (e.clientY - rect.top) / rect.height

    // Calculate rotation between -5 and +5 deg
    tiltX.set((relativeY - 0.5) * -10)
    tiltY.set((relativeX - 0.5) * 10)

    setMousePos({
      x: relativeX,
      y: relativeY,
      isHovered: true,
    })
  }

  const handleMouseLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
    setMousePos((prev) => ({ ...prev, isHovered: false }))
  }

  const formattedIndex = String(index + 1).padStart(2, '0')
  const projectYear = project.date ? project.date.split('-')[0] : '2025'

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 45, scale: 0.94 }}
      animate={
        isRevealed
          ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
          : { opacity: 0, y: 45, scale: 0.94, filter: 'blur(6px)' }
      }
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      style={{
        pointerEvents: isRevealed ? 'auto' : 'none',
      }}
      className="group relative flex flex-col w-full bg-transparent select-none transition-all duration-700"
    >
      {/* ─── Top Hairline Divider & Monospace Header ─── */}
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

      {/* ─── Cinematic Media Container with 3D Tilt & Parallax ─── */}
      <motion.div
        ref={thumbRef}
        data-project-thumb="true"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 1000,
        }}
        className="relative mt-4 mb-6 aspect-[16/10] sm:aspect-[812/568] w-full overflow-hidden rounded-xl border border-white/10 bg-bg-surface/50 shadow-glass cursor-pointer"
      >
        {/* Convergence Target Anchor */}
        <div
          data-project-target={index}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 pointer-events-none z-30 opacity-0"
        />

        {/* Exit Emitter Anchor (New Origin for the next beams) */}
        <div
          data-project-emitter={index}
          className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 pointer-events-none z-30 opacity-0 ${
            index % 2 === 0 ? 'right-0' : 'left-0'
          }`}
        />

        {/* Flash Reveal Bloom Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: [0, 0.7, 0] } : { opacity: 0 }}
          transition={{ duration: 0.9, times: [0, 0.2, 1] }}
          className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-white/30 via-white/10 to-transparent"
        />
        <Link
          href={`/projects/${project.slug}?persona=${activePersona}`}
          className="block w-full h-full relative"
          aria-label={`View ${project.title}`}
        >
          {/* Parallax Moving Image Inner */}
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="relative w-full h-full will-change-transform"
          >
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority={index < 2}
            />
          </motion.div>

          {/* Cinematic Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

          {/* Floating Magnetic "EXPLORE" Cursor Badge (Trionn Signature) */}
          <div
            className={`pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
              mousePos.isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: `${mousePos.x * 100}%`,
              top: `${mousePos.y * 100}%`,
            }}
          >
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/30 backdrop-blur-xl flex flex-col items-center justify-center text-white shadow-2xl transition-transform duration-200"
              style={{
                backgroundColor: 'rgba(8, 8, 12, 0.75)',
                boxShadow: `0 0 25px -4px ${themeAccent}88`,
              }}
            >
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-white">
                VIEW
              </span>
              <ArrowUpRight size={13} className="text-white/80 mt-0.5" />
            </div>
          </div>

          {/* Top-Right Static Corner Action Pill */}
          <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90">
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </Link>
      </motion.div>

      {/* ─── Bottom Information Stack & Kinetic Typography ─── */}
      <div className="flex flex-col gap-3">
        {/* Project Title */}
        <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white transition-colors duration-300">
          <Link
            href={`/projects/${project.slug}?persona=${activePersona}`}
            className="hover:underline decoration-white/30 underline-offset-4"
          >
            {project.title}
          </Link>
        </h3>

        {/* Narrative Description */}
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-sans line-clamp-2 font-light opacity-85">
          {project.description}
        </p>

        {/* Metadata Stack & Kinetic Explore Link */}
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

          {/* Trionn's Signature Kinetic "EXPLORE PROJECT →" Link with Animated Underline */}
          <Link
            href={`/projects/${project.slug}?persona=${activePersona}`}
            className="group/btn relative inline-flex items-center gap-2 pt-1 font-mono text-xs uppercase tracking-widest font-semibold transition-colors duration-200"
            style={{ color: '#ffffff' }}
          >
            <span className="relative">
              EXPLORE PROJECT
              <span
                className="absolute -bottom-1 left-0 w-full h-[1.5px] transition-transform duration-300 origin-left scale-x-0 group-hover/btn:scale-x-100"
                style={{ backgroundColor: themeAccentLight }}
              />
            </span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover/btn:translate-x-1.5 group-hover/btn:-translate-y-1"
              style={{ color: themeAccentLight }}
            />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
