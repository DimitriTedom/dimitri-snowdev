'use client'

import { useMemo, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { usePersona } from '@/hooks/usePersona'
import { PROJECTS } from '@/data/projects'
import type { ProjectWithPersonas } from '@/types/project'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedProjects() {
  const { activePersona, personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || themeAccent

  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Get top 4 featured projects for the active persona
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

    if (personaProjects.length >= 4) return personaProjects.slice(0, 4)

    const remaining = PROJECTS.filter(
      (p) =>
        p.is_published &&
        p.featured &&
        !personaProjects.find((pp) => pp.id === p.id)
    ).sort((a, b) => a.sort_order - b.sort_order)

    return [...personaProjects, ...remaining].slice(0, 4)
  }, [activePersona])

  // GSAP Trionn-style Horizontal Pin & Y-Slide-Up Parabolic Animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const section = sectionRef.current
        const track = trackRef.current
        if (!section || !track) return

        const getScrollDistance = () => track.scrollWidth - window.innerWidth

        // 1. Master horizontal scroll tween
        const horizontalTween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.max(getScrollDistance(), window.innerHeight * 2.8)}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        // 2. Signature Trionn motion: Each card slides UP from the Y-axis as it enters from the right
        const cardInners = track.querySelectorAll<HTMLElement>('.project-card-inner')
        cardInners.forEach((inner) => {
          const cardSlot = inner.closest<HTMLElement>('.project-card-slot')
          if (!cardSlot) return

          gsap.fromTo(
            inner,
            { y: 240, opacity: 0.25, scale: 0.93 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: cardSlot,
                containerAnimation: horizontalTween,
                start: 'left 95%', // Starts as card enters near the right edge
                end: 'center 50%', // Finishes when card reaches active viewport center
                scrub: true,
              },
            }
          )
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [activePersona, featuredProjects] }
  )

  if (featuredProjects.length === 0) return null

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full bg-[#060618] text-white isolate select-none"
    >
      {/* ─── DESKTOP (>= 768px): Horizontal Pinned Scroll with Y-Slide-Up ─── */}
      <div className="hidden md:flex w-full h-screen overflow-hidden items-center">
        <div
          ref={trackRef}
          className="flex flex-row items-center h-full will-change-transform pl-10 lg:pl-16 pr-20"
        >
          {/* Slide 0: Trionn-style Section Header Column */}
          <div className="w-[34vw] min-w-[340px] max-w-[460px] h-[78vh] flex flex-col justify-between py-6 pr-8 flex-shrink-0">
            <div>
              <p
                className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 font-mono"
                style={{ color: themeAccent }}
              >
                Selected Work &amp; Explorations
              </p>
              <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-black uppercase text-white tracking-tight leading-[0.98]">
                Featured
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 10%, ${themeAccent} 100%)`,
                  }}
                >
                  Projects
                </span>
                <br />
                <span className="text-white/70 text-3xl lg:text-4xl xl:text-5xl font-medium tracking-normal">
                  &amp; Systems
                </span>
              </h2>
            </div>

            {/* Aeruk-style capsule pill button */}
            <div className="mt-8">
              <Link
                href={`/projects?persona=${activePersona}`}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white transition-all duration-300 group border"
                style={{
                  backgroundColor: `${themeAccent}20`,
                  borderColor: `${themeAccent}60`,
                  boxShadow: `0 0 24px -4px ${themeAccent}40`,
                }}
              >
                <span>View All Projects</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* Vertical divider line */}
          <div className="w-px h-[58vh] bg-white/[0.08] flex-shrink-0 mx-4 lg:mx-8 self-center" />

          {/* Slides 1..N: Trionn-style Cards with Y-Slide-Up */}
          {featuredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="project-card-slot w-[50vw] min-w-[480px] max-w-[700px] h-[82vh] flex-shrink-0 flex items-center px-4 lg:px-6 relative"
            >
              <div className="project-card-inner w-full flex flex-col will-change-transform">
                <TrionnProjectCard
                  project={project}
                  index={idx + 1}
                  themeAccent={themeAccent}
                  themeAccentLight={themeAccentLight}
                  activePersona={activePersona}
                />
              </div>

              {/* Subtle vertical separator between cards */}
              {idx < featuredProjects.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-[45vh] bg-white/[0.06] pointer-events-none" />
              )}
            </div>
          ))}

          {/* Slide N+1: Final Archive Exploration Card */}
          <div className="w-[32vw] min-w-[320px] max-w-[420px] h-[82vh] flex-shrink-0 flex items-center px-6">
            <div className="w-full p-8 sm:p-10 rounded-[28px] border border-white/[0.12] bg-[#080816]/90 backdrop-blur-xl flex flex-col justify-between gap-6 shadow-[0_16px_48px_rgba(0,0,0,0.8)] relative overflow-hidden group">
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none transition-opacity group-hover:opacity-50"
                style={{ background: themeAccent }}
              />

              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 block mb-3">
                  Archive
                </span>
                <h3 className="font-display text-2xl lg:text-3xl font-bold uppercase tracking-tight text-white leading-snug">
                  Explore More
                  <br />
                  <span style={{ color: themeAccentLight }}>Works</span>
                </h3>
                <p className="text-white/60 text-xs sm:text-sm font-sans leading-relaxed mt-4">
                  Discover production applications, agentic AI pipelines, open-source libraries, and
                  technical architecture case studies.
                </p>
              </div>

              <Link
                href={`/projects?persona=${activePersona}`}
                className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl border border-white/20 bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-white transition-all group-hover:border-white/40"
              >
                <span>Full Project Catalog</span>
                <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MOBILE (< 768px): Native Vertical Flow with Smooth Stagger ─── */}
      <div className="flex md:hidden flex-col py-16 px-5 gap-10">
        <div>
          <p
            className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-2 font-mono"
            style={{ color: themeAccent }}
          >
            Selected Work &amp; Explorations
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight leading-tight">
            Featured
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(to right, #ffffff 10%, ${themeAccent} 100%)`,
              }}
            >
              Projects
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={`mobile-${project.id}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              <TrionnProjectCard
                project={project}
                index={idx + 1}
                themeAccent={themeAccent}
                themeAccentLight={themeAccentLight}
                activePersona={activePersona}
                isMobile
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <Link
            href={`/projects?persona=${activePersona}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white border"
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

      {/* Subtle section bottom border line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-20 pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent, ${themeAccent}, transparent)`,
        }}
      />
    </section>
  )
}

// ─── Trionn-style Project Card Component ──────────────────────────────────────

interface TrionnProjectCardProps {
  project: ProjectWithPersonas
  index: number
  themeAccent: string
  themeAccentLight: string
  activePersona: string
  isMobile?: boolean
}

function TrionnProjectCard({
  project,
  index: _index,
  themeAccent,
  themeAccentLight,
  activePersona,
  isMobile = false,
}: TrionnProjectCardProps) {
  const subtitle = `${project.category.toUpperCase()} ${
    project.tags[0] ? `• ${project.tags[0].toUpperCase()}` : ''
  }`

  return (
    <Link
      href={`/projects/${project.slug}?persona=${activePersona}`}
      className="group flex flex-col gap-4 cursor-pointer w-full"
    >
      {/* 1. Large Media Viewport (Trionn signature aesthetic) */}
      <div
        className={`relative w-full rounded-[24px] sm:rounded-[28px] overflow-hidden border border-white/[0.12] transition-all duration-500 group-hover:border-white/30 bg-[#080816] ${
          isMobile ? 'aspect-[16/10]' : 'aspect-[16/10] max-h-[46vh]'
        }`}
        style={{
          boxShadow: '0 8px 36px rgba(0, 0, 0, 0.75)',
        }}
      >
        <Image
          src={project.image_url}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes={isMobile ? '100vw' : '55vw'}
          priority={false}
        />

        {/* Top-right floating glass arrow pill */}
        <div className="absolute top-4 right-4 z-10">
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 group-hover:scale-110"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
              borderColor: `${themeAccent}50`,
            }}
          >
            <ArrowUpRight
              className="w-4 h-4 transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ color: themeAccentLight }}
            />
          </div>
        </div>

        {/* Bottom subtle gradient vignette */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* 2. Below Media: Title, Category, Description, and Tags (Trionn layout) */}
      <div className="flex flex-col gap-2.5 px-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3
              className={`font-display font-bold uppercase text-white tracking-tight leading-snug group-hover:text-white transition-colors ${
                isMobile ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl lg:text-[26px]'
              }`}
            >
              {project.title}
            </h3>
            <p
              className="font-mono uppercase text-[11px] sm:text-xs tracking-wider mt-1 font-semibold"
              style={{ color: themeAccentLight }}
            >
              {subtitle}
            </p>
          </div>

          {/* Desktop "Explore Project" text link */}
          {!isMobile && (
            <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors whitespace-nowrap pt-1">
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          )}
        </div>

        {/* Concise Description */}
        <p className="text-xs sm:text-sm text-white/60 leading-relaxed line-clamp-2 font-sans">
          {project.description}
        </p>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-full text-white/70 bg-[#161622] border border-white/[0.08] transition-colors group-hover:border-white/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
