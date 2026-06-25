'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { usePersona } from '@/hooks/usePersona'
import { Code, Flame, Award, BookOpen, BrainCircuit } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Milestone {
  year: string
  title: string
  description: string
  icon: typeof Code
}

const MILESTONES: Milestone[] = [
  {
    year: '2022',
    title: 'First Code Line',
    description: 'Dived into core technologies (HTML, CSS, JS) and built foundational programming concepts.',
    icon: Code
  },
  {
    year: '2023',
    title: 'Interactive Web & Design',
    description: 'Began building React apps, working with Canva Pro, and designing digital brand assets.',
    icon: BookOpen
  },
  {
    year: '2024',
    title: 'Full Stack Integration',
    description: 'Mastered database integrations (Supabase, MongoDB), backend servers, and complete layouts.',
    icon: Flame
  },
  {
    year: '2025',
    title: 'National Winner 🏆',
    description: 'Awarded 1st Place in the National E-commerce Competition for ChezFlora e-commerce platform.',
    icon: Award
  },
  {
    year: '2026',
    title: 'AI & Cloud Era',
    description: 'Implementing LLM workflows, RAG pipelines, n8n agents, and preparing AWS SAA-C03 certification.',
    icon: BrainCircuit
  }
]

export default function LearningJourney() {
  const { personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  
  const containerRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!progressLineRef.current || !containerRef.current) return

    gsap.set(progressLineRef.current, { scaleX: 0, transformOrigin: 'left center' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'bottom 70%',
        scrub: 1.2
      }
    })

    tl.to(progressLineRef.current, {
      scaleX: 1,
      ease: 'none'
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, { scope: containerRef, dependencies: [] })

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-5xl mx-auto px-4 py-16 flex flex-col gap-12"
    >
      <div className="flex flex-col items-center text-center gap-2 mb-4">
        <h3 className="font-display text-xl font-bold uppercase tracking-wider text-text-primary">
          Learning <span className="text-gradient">Journey</span>
        </h3>
        <p className="text-xs text-text-muted max-w-md">
          A visual record of milestones that shaped my engineering mindset.
        </p>
      </div>

      <div className="relative flex flex-col md:flex-row items-stretch md:justify-between gap-8 md:gap-4 mt-6">
        
        {/* Horizontal track line for desktop */}
        <div className="hidden md:block absolute left-6 right-6 top-[28px] h-1 bg-glass-border/20 rounded-full -z-10" />

        {/* Glowing filled track line (GSAP scroll animated) */}
        <div 
          ref={progressLineRef}
          className="hidden md:block absolute left-6 right-6 top-[28px] h-1 rounded-full pointer-events-none -z-10 filter blur-[0.5px]"
          style={{
            background: `linear-gradient(to right, ${themeAccent}dd, ${themeAccent}55)`,
            boxShadow: `0 0 8px ${themeAccent}aa`
          }}
        />

        {/* Milestone Steps */}
        {MILESTONES.map((step, idx) => {
          const MilestoneIcon = step.icon
          
          return (
            <motion.div
              key={step.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ type: 'spring', stiffness: 100, damping: 15, delay: idx * 0.1 }}
              className="flex md:flex-col items-start md:items-center md:text-center gap-6 md:gap-4 flex-1 relative group"
            >
              {/* Step Circle / Number */}
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center border-2 bg-bg-deep transition-all duration-500 z-10 shrink-0 shadow-lg group-hover:scale-105"
                style={{
                  borderColor: themeAccent,
                  boxShadow: `0 0 10px ${themeAccent}55, inset 0 0 10px ${themeAccent}33`
                }}
              >
                <MilestoneIcon 
                  size={20} 
                  className="transition-colors duration-500" 
                  style={{ color: themeAccent }}
                />
              </div>

              {/* Step Info Content */}
              <div className="flex flex-col gap-1.5 md:items-center">
                <span 
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-black/40 border inline-block w-fit text-center"
                  style={{ borderColor: `${themeAccent}33`, color: themeAccent }}
                >
                  {step.year}
                </span>
                
                <h4 className="font-display font-bold text-sm text-text-primary uppercase tracking-tight">
                  {step.title}
                </h4>
                
                <p className="text-[11px] text-text-secondary leading-relaxed font-light max-w-[200px]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          )
        })}

      </div>
    </div>
  )
}
