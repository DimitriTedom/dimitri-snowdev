'use client'

/**
 * SectionTransition
 * Wraps the NEXT section. As the PREVIOUS section exits the viewport,
 * this section reveals itself via a scroll-driven clip-path animation.
 *
 * Types:
 *  "scale-blur"       — T3: Projects → TechStack (scale-up + blur-out reveal)
 *  "curtain-drop"     — T4: TechStack → Contact (dark curtain falls from top)
 *  "horizontal-split" — T2: Services → Projects (dual curtain panels split open)
 *  "fade-rise"        — gentle fade + rise, used between minor sections
 *
 * Usage:
 *   <SectionTransition type="horizontal-split">
 *     <FeaturedProjects />
 *   </SectionTransition>
 */

import { useRef, useEffect, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type TransitionType = 'horizontal-split' | 'scale-blur' | 'curtain-drop' | 'fade-rise'

interface SectionTransitionProps {
  children: ReactNode
  type: TransitionType
  /** Class name applied to the outer wrapper — use to set bg color */
  className?: string
}

export default function SectionTransition({ children, type, className = '' }: SectionTransitionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const panelLeftRef = useRef<HTMLDivElement>(null)
  const panelRightRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const inner = innerRef.current
    if (!wrapper) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      if (type === 'horizontal-split') {
        // Two curtain panels retract sideways, revealing the section beneath
        const panelL = panelLeftRef.current
        const panelR = panelRightRef.current
        if (!panelL || !panelR) return
        gsap.fromTo(
          panelL, { x: '0%' }, {
            x: '-100%', ease: 'power2.inOut',
            scrollTrigger: { trigger: wrapper, start: 'top 75%', end: 'top 20%', scrub: 1.2 },
          }
        )
        gsap.fromTo(
          panelR, { x: '0%' }, {
            x: '100%', ease: 'power2.inOut',
            scrollTrigger: { trigger: wrapper, start: 'top 75%', end: 'top 20%', scrub: 1.2 },
          }
        )
      }

      if (type === 'scale-blur') {
        // Section starts scaled up + blurred, normalises as it scrolls into view
        if (!inner) return
        gsap.fromTo(
          inner,
          { scale: 1.08, filter: 'blur(12px)', opacity: 0 },
          {
            scale: 1, filter: 'blur(0px)', opacity: 1, ease: 'power2.out',
            scrollTrigger: { trigger: wrapper, start: 'top 80%', end: 'top 20%', scrub: 1.4 },
          }
        )
      }

      if (type === 'curtain-drop') {
        // Dark curtain panel drops from top → reveals section beneath
        const panelL = panelLeftRef.current
        if (!panelL) return
        gsap.fromTo(
          panelL, { y: '-100%' }, {
            y: '100%', ease: 'power3.inOut',
            scrollTrigger: { trigger: wrapper, start: 'top 80%', end: 'top 0%', scrub: 1.3 },
          }
        )
      }

      if (type === 'fade-rise') {
        if (!inner) return
        gsap.fromTo(
          inner, { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, ease: 'power2.out',
            scrollTrigger: { trigger: wrapper, start: 'top 80%', end: 'top 40%', scrub: 1 },
          }
        )
      }
    })

    return () => mm.revert()
  }, [type])

  // Horizontal split: two panels (absolute overlay on desktop) + content underneath
  if (type === 'horizontal-split') {
    return (
      <div ref={wrapperRef} className={`relative overflow-hidden ${className}`}>
        {/* Left curtain panel — desktop only */}
        <div
          ref={panelLeftRef}
          className="hidden md:block absolute top-0 left-0 w-1/2 h-full z-20 pointer-events-none"
          style={{ background: '#060618' }}
        />
        {/* Right curtain panel — desktop only */}
        <div
          ref={panelRightRef}
          className="hidden md:block absolute top-0 right-0 w-1/2 h-full z-20 pointer-events-none"
          style={{ background: '#060618' }}
        />
        {children}
      </div>
    )
  }

  // Curtain drop: single full-width panel sweeps down (desktop only)
  if (type === 'curtain-drop') {
    return (
      <div ref={wrapperRef} className={`relative overflow-hidden ${className}`}>
        <div
          ref={panelLeftRef}
          className="hidden md:block absolute top-0 left-0 w-full h-full z-20 pointer-events-none"
          style={{ background: '#060618' }}
        />
        {children}
      </div>
    )
  }

  // Scale-blur & fade-rise: inner div animated
  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div ref={innerRef} className="w-full">
        {children}
      </div>
    </div>
  )
}
