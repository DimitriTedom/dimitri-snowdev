'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectWithPersonas } from '@/types/project'
import { PersonaId } from '@/types/persona'
import { ExternalLink, Github, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Zap, Layers } from 'lucide-react'

interface ProjectDetailTrionnContentProps {
  project: ProjectWithPersonas
  prevProject: ProjectWithPersonas
  nextProject: ProjectWithPersonas
  personaId: PersonaId
  themeAccent?: string
  themeAccentLight?: string
}

type TabKey = 'challenge' | 'approach' | 'outcome' | 'whatWeDid'

export default function ProjectDetailTrionnContent({
  project,
  prevProject,
  nextProject,
  personaId,
  themeAccent = '#5e17eb',
  themeAccentLight = '#ae6bf6',
}: ProjectDetailTrionnContentProps) {
  const [activeTab, setActiveTab] = React.useState<TabKey>('challenge')

  // Visual gallery setup
  const gallery = [project.image_url, project.image_url_2, project.image_url_3]
    .filter((url): url is string => typeof url === 'string' && url.length > 0)
    .filter((url, idx, self) => self.indexOf(url) === idx)

  // Deliverables derived from category and tags
  const deliverables = [
    `${project.category} Architecture`,
    'Interactive UI / Motion Systems',
    'Responsive Multi-Device Engineering',
    'Performance Optimization & Testing',
  ]

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'challenge', label: 'The challenge' },
    { key: 'approach', label: 'Approach' },
    { key: 'outcome', label: 'Outcome' },
    { key: 'whatWeDid', label: 'What we did' },
  ]

  return (
    <section className="relative w-full bg-[#040508] text-white pt-4 sm:pt-6 pb-24 px-4 sm:px-6 md:px-10 lg:px-14">
      
      {/* Subtle background glow */}
      <div 
        className="pointer-events-none absolute top-20 right-[-80px] w-[500px] h-[500px] rounded-full filter blur-[150px] opacity-15"
        style={{
          background: `radial-gradient(circle, ${themeAccent} 0%, transparent 70%)`
        }}
      />

      <div className="container mx-auto max-w-[1360px]">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">

          {/* ─────────────────────────────────────────────────────────── */}
          {/* LEFT COLUMN: Visual Showcase Stream (order-2 on mobile,     */}
          {/* order-1 on desktop, scrolls naturally alongside sticky text)*/}
          {/* ─────────────────────────────────────────────────────────── */}
          <div className="col-span-12 lg:col-span-7 xl:col-span-7 order-2 lg:order-1 flex flex-col gap-8 sm:gap-10 lg:gap-12">
            
            {/* Visual 1: Primary Master Screen */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-[0_20px_50px_rgba(0,0,0,0.85)] group"
            >
              <Image
                src={gallery[0]}
                alt={`${project.title} Master Overview`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 760px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Visual 2: Secondary Feature Showcase (if available) */}
            {gallery[1] && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7 }}
                className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-[0_20px_50px_rgba(0,0,0,0.85)] group"
              >
                <Image
                  src={gallery[1]}
                  alt={`${project.title} Detailed Screen`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 760px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            )}

            {/* Technical Highlights Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-3.5"
            >
              {/* Highlight 1 */}
              <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm flex flex-col gap-2">
                <Zap size={16} style={{ color: themeAccentLight }} />
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white">Performance</h3>
                <p className="text-[11px] text-white/60 leading-relaxed font-sans">
                  Optimized render cycles, dynamic imports, and instant hydration.
                </p>
              </div>

              {/* Highlight 2 */}
              <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm flex flex-col gap-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white">Type Safety</h3>
                <p className="text-[11px] text-white/60 leading-relaxed font-sans">
                  Strict TypeScript types, runtime contract validations, and modular APIs.
                </p>
              </div>

              {/* Highlight 3 */}
              <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm flex flex-col gap-2">
                <Layers size={16} className="text-cyan-400" />
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white">Architecture</h3>
                <p className="text-[11px] text-white/60 leading-relaxed font-sans">
                  Multi-device UI system engineered with modern dark mode aesthetic.
                </p>
              </div>
            </motion.div>

            {/* Visual 3: Third Showcase / Interface Screen (if available) */}
            {gallery[2] && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7 }}
                className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-[0_20px_50px_rgba(0,0,0,0.85)] group"
              >
                <Image
                  src={gallery[2]}
                  alt={`${project.title} Interface Flow`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 760px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            )}

            {/* Deployed Technologies Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col gap-3.5"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
                Technologies & Tools Deployed
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider border border-white/15 bg-white/[0.03] text-white/80 hover:border-white/40 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ─────────────────────────────────────────────────────────── */}
          {/* RIGHT COLUMN: Trionn Sticky Text Panel ("Does Not Obey")   */}
          {/* Stays pinned on desktop viewport while images scroll!      */}
          {/* ─────────────────────────────────────────────────────────── */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-5 order-1 lg:order-2 lg:sticky lg:top-20 self-start z-20 flex flex-col justify-between max-h-none lg:max-h-[calc(100vh-100px)] overflow-y-visible lg:overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-col gap-4 sm:gap-5">

              {/* Back to Projects Navigation */}
              <div className="flex items-center justify-between">
                <Link
                  href={`/projects?persona=${personaId}`}
                  className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-200"
                >
                  <ArrowLeft size={13} className="transition-transform duration-200 group-hover:-translate-x-1" />
                  <span>Back to projects</span>
                </Link>
              </div>

              {/* Trionn Separator Line with Centered Crosshair (+) */}
              <div className="relative w-full h-px bg-white/10 my-0.5 flex items-center justify-center">
                <div className="absolute w-3 h-3 flex items-center justify-center bg-[#040508] text-white/40">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="4.5" y1="0" x2="4.5" y2="9" stroke="currentColor" strokeWidth="1" />
                    <line x1="0" y1="4.5" x2="9" y2="4.5" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>
              </div>

              {/* Project Meta Index & Year */}
              <div className="flex items-center justify-between text-xs font-mono tracking-wider text-white/50">
                <span className="font-bold" style={{ color: themeAccentLight }}>
                  0{project.sort_order} {'//'} {project.category.toUpperCase()}
                </span>
                <span>{project.date.slice(0, 4)}</span>
              </div>

              {/* Tagline / Summary */}
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-sans">
                {project.description}
              </p>

              {/* Deliverables List */}
              <div className="py-2 border-y border-white/5 my-0.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 block mb-2">
                  Scope & Deliverables
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5">
                  {deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-white/80 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: themeAccentLight }} />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trionn 4-Tab Interactive System */}
              <div className="flex flex-col gap-3 mt-1">
                {/* Tab Buttons */}
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-b border-white/10 pb-2.5">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.key
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`text-xs font-mono uppercase tracking-wider pb-1 transition-all duration-200 cursor-pointer relative ${
                          isActive ? 'text-white font-bold opacity-100' : 'text-white/40 hover:text-white/80 opacity-60'
                        }`}
                      >
                        {tab.label}
                        {isActive && (
                          <motion.div
                            layoutId="activeTabUnderline"
                            className="absolute bottom-[-11px] left-0 right-0 h-[2px]"
                            style={{ backgroundColor: themeAccentLight }}
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Tab Content Display with Animated Crossfade */}
                <div className="min-h-[120px] pt-1">
                  <AnimatePresence mode="wait">
                    {activeTab === 'challenge' && (
                      <motion.div
                        key="challenge"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs text-white/70 leading-relaxed font-sans whitespace-pre-line"
                      >
                        {project.challenge}
                      </motion.div>
                    )}

                    {activeTab === 'approach' && (
                      <motion.div
                        key="approach"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs text-white/70 leading-relaxed font-sans whitespace-pre-line"
                      >
                        {project.solution}
                      </motion.div>
                    )}

                    {activeTab === 'outcome' && (
                      <motion.div
                        key="outcome"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs text-white/70 leading-relaxed font-sans whitespace-pre-line"
                      >
                        {project.result}
                      </motion.div>
                    )}

                    {activeTab === 'whatWeDid' && (
                      <motion.div
                        key="whatWeDid"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs text-white/70 leading-relaxed font-sans flex flex-col gap-2"
                      >
                        <p>
                          Engineered end-to-end full-stack software combining modern UI design tokens and reactive architecture:
                        </p>
                        <ul className="flex flex-col gap-1.5 pl-1">
                          <li className="flex items-start gap-2 text-white/80">
                            <CheckCircle2 size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                            <span>Deployed with {project.tags.join(', ')}.</span>
                          </li>
                          <li className="flex items-start gap-2 text-white/80">
                            <CheckCircle2 size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                            <span>100% strict TypeScript types and zero runtime warnings.</span>
                          </li>
                          <li className="flex items-start gap-2 text-white/80">
                            <CheckCircle2 size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                            <span>Optimized responsive layout tested across mobile & desktop.</span>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Trionn Interactive CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white py-1.5"
                  >
                    <span className="relative z-10 font-bold">Live Preview</span>
                    <ExternalLink size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <span 
                      className="absolute bottom-0 left-0 w-full h-[1px] transition-all duration-300 origin-left scale-x-100 group-hover:h-[2px]"
                      style={{ backgroundColor: themeAccentLight }}
                    />
                  </a>
                )}

                {project.code_url && (
                  <a
                    href={project.code_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white py-1.5"
                  >
                    <Github size={13} />
                    <span className="relative z-10">Source Code</span>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 transition-all duration-300 group-hover:bg-white/60" />
                  </a>
                )}
              </div>

            </div>

            {/* Trionn Bottom Pagination (Previous / Next) */}
            <div className="border-t border-white/10 pt-3 mt-5 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-white/50">
              <Link
                href={`/projects/${prevProject.slug}?persona=${personaId}`}
                className="group flex items-center gap-1.5 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft size={12} className="transition-transform duration-200 group-hover:-translate-x-1" />
                <span>Previous</span>
              </Link>

              <span className="text-white/20">/</span>

              <Link
                href={`/projects/${nextProject.slug}?persona=${personaId}`}
                className="group flex items-center gap-1.5 hover:text-white transition-colors duration-200"
              >
                <span>Next</span>
                <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
