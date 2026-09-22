'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from 'lucide-react'
import { usePersona } from '@/hooks/usePersona'
import { SERVICES } from '@/data/services'
import SVCrystalScrubber from '@/components/animations/SVCrystalScrubber'

gsap.registerPlugin(ScrollTrigger)

// Minimal Trionn-style service card (Title + Geometric SVG Icon + 2-line Description)
function ServiceCard({
  title,
  shortDescription,
  icon,
  accentLight,
  isMobile = false,
}: {
  title: string
  shortDescription: string
  icon: string
  accentLight: string
  isMobile?: boolean
}) {
  return (
    <div
      className={`flex flex-col gap-3 sm:gap-4 rounded-2xl border transition-all duration-300 will-change-transform group ${
        isMobile
          ? 'p-5 sm:p-6 bg-[#080816]/95 backdrop-blur-2xl border-white/[0.14] w-full shadow-[0_16px_48px_rgba(0,0,0,0.95)]'
          : 'p-6 sm:p-7 md:p-8 bg-[#080816]/90 backdrop-blur-xl border-white/[0.12] hover:border-white/25 hover:bg-[#080816]/95 shadow-[0_16px_48px_rgba(0,0,0,0.85)]'
      }`}
    >
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <h3
          className={`font-display font-bold text-white uppercase tracking-tight leading-[1.15] break-words flex-1 ${
            isMobile ? 'text-base sm:text-lg' : 'text-2xl sm:text-3xl lg:text-[28px]'
          }`}
        >
          {title}
        </h3>
        <div
          className={`flex-shrink-0 opacity-90 group-hover:opacity-100 transition-opacity ${
            isMobile ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-11 h-11 md:w-12 md:h-12'
          }`}
          style={{ color: accentLight }}
        >
          {/* Fullstack Web Engineering Icon — 4x4 Grid Matrix */}
          {icon === 'code' && (
            <svg viewBox="0 0 512 512" fill="none" className="w-full h-full">
              <line x1="56" y1="56" x2="456" y2="56" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
              <line x1="56" y1="189" x2="456" y2="189" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
              <line x1="56" y1="323" x2="456" y2="323" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
              <line x1="56" y1="456" x2="456" y2="456" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
              <line x1="56" y1="56" x2="56" y2="456" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
              <line x1="189" y1="56" x2="189" y2="456" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
              <line x1="323" y1="56" x2="323" y2="456" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
              <line x1="456" y1="56" x2="456" y2="456" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
              {[56, 189, 323, 456].flatMap((x) =>
                [56, 189, 323, 456].map((y) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="26" fill="currentColor" />
                ))
              )}
            </svg>
          )}

          {/* AI Engineering & Automation Icon — Neural Network Diagram */}
          {icon === 'bot' && (
            <svg viewBox="0 0 512 512" fill="none" className="w-full h-full">
              {[112, 208, 304, 400].flatMap((y1) =>
                [160, 256, 352].map((y2) => (
                  <line key={`l1-${y1}-${y2}`} x1="106" y1={y1} x2="256" y2={y2} stroke="currentColor" strokeWidth="10" opacity="0.6" />
                ))
              )}
              {[160, 256, 352].flatMap((y2) =>
                [208, 304].map((y3) => (
                  <line key={`l2-${y2}-${y3}`} x1="256" y1={y2} x2="406" y2={y3} stroke="currentColor" strokeWidth="10" opacity="0.6" />
                ))
              )}
              {[112, 208, 304, 400].map((y) => (
                <circle key={`c1-${y}`} cx="106" cy={y} r="24" stroke="currentColor" strokeWidth="12" fill="#060618" />
              ))}
              {[160, 256, 352].map((y) => (
                <circle key={`c2-${y}`} cx="256" cy={y} r="24" stroke="currentColor" strokeWidth="12" fill="#060618" />
              ))}
              {[208, 304].map((y) => (
                <circle key={`c3-${y}`} cx="406" cy={y} r="24" stroke="currentColor" strokeWidth="12" fill="#060618" />
              ))}
            </svg>
          )}

          {/* Cloud Architecture & DevOps Icon — Concentric Hexagons & Rays */}
          {icon === 'cloud' && (
            <svg viewBox="0 0 512 512" fill="none" className="w-full h-full">
              <polygon points="468.0,256.0 362.0,439.6 150.0,439.6 44.0,256.0 150.0,72.4 362.0,72.4" stroke="currentColor" strokeWidth="14" strokeLinejoin="round" />
              <polygon points="388.0,256.0 322.0,370.3 190.0,370.3 124.0,256.0 190.0,141.7 322.0,141.7" stroke="currentColor" strokeWidth="14" strokeLinejoin="round" />
              <polygon points="310.0,256.0 283.0,302.8 229.0,302.8 202.0,256.0 229.0,209.2 283.0,209.2" stroke="currentColor" strokeWidth="14" strokeLinejoin="round" />
              <line x1="310.0" y1="256.0" x2="468.0" y2="256.0" stroke="currentColor" strokeWidth="11" strokeLinecap="round" opacity="0.7" />
              <line x1="296.5" y1="279.4" x2="415.0" y2="347.8" stroke="currentColor" strokeWidth="11" strokeLinecap="round" opacity="0.7" />
              <line x1="283.0" y1="302.8" x2="362.0" y2="439.6" stroke="currentColor" strokeWidth="11" strokeLinecap="round" opacity="0.7" />
              <line x1="256.0" y1="302.8" x2="256.0" y2="439.6" stroke="currentColor" strokeWidth="11" strokeLinecap="round" opacity="0.7" />
              <line x1="229.0" y1="302.8" x2="150.0" y2="439.6" stroke="currentColor" strokeWidth="11" strokeLinecap="round" opacity="0.7" />
              <line x1="215.5" y1="279.4" x2="97.0" y2="347.8" stroke="currentColor" strokeWidth="11" strokeLinecap="round" opacity="0.7" />
              <line x1="202.0" y1="256.0" x2="44.0" y2="256.0" stroke="currentColor" strokeWidth="11" strokeLinecap="round" opacity="0.7" />
              <line x1="215.5" y1="232.6" x2="97.0" y2="164.2" stroke="currentColor" strokeWidth="11" strokeLinecap="round" opacity="0.7" />
              <line x1="229.0" y1="209.2" x2="150.0" y2="72.4" stroke="currentColor" strokeWidth="11" strokeLinecap="round" opacity="0.7" />
              <line x1="256.0" y1="209.2" x2="256.0" y2="72.4" stroke="currentColor" strokeWidth="11" strokeLinecap="round" opacity="0.7" />
              <line x1="283.0" y1="209.2" x2="362.0" y2="72.4" stroke="currentColor" strokeWidth="11" strokeLinecap="round" opacity="0.7" />
              <line x1="296.5" y1="232.6" x2="415.0" y2="164.2" stroke="currentColor" strokeWidth="11" strokeLinecap="round" opacity="0.7" />
            </svg>
          )}

          {/* MVP & Product Engineering Icon — Nested Concentric Squares */}
          {icon === 'layers' && (
            <svg viewBox="0 0 512 512" fill="none" className="w-full h-full">
              <rect x="72" y="72" width="368" height="368" rx="8" stroke="currentColor" strokeWidth="14" />
              <rect x="136" y="136" width="240" height="240" rx="6" stroke="currentColor" strokeWidth="14" opacity="0.85" />
              <rect x="200" y="200" width="112" height="112" rx="4" stroke="currentColor" strokeWidth="14" opacity="0.7" />
              <circle cx="256" cy="256" r="14" fill="currentColor" />
            </svg>
          )}

          {/* Creative UI/UX & Design Systems Icon — Concentric Arcs */}
          {icon === 'palette' && (
            <svg viewBox="0 0 512 512" fill="none" className="w-full h-full">
              <path d="M 120 120 A 136 136 0 0 1 120 392" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
              <path d="M 170 160 A 96 96 0 0 1 170 352" stroke="currentColor" strokeWidth="14" strokeLinecap="round" opacity="0.85" />
              <path d="M 220 200 A 56 56 0 0 1 220 312" stroke="currentColor" strokeWidth="14" strokeLinecap="round" opacity="0.7" />
              <path d="M 392 120 A 136 136 0 0 0 392 392" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
              <path d="M 342 160 A 96 96 0 0 0 342 352" stroke="currentColor" strokeWidth="14" strokeLinecap="round" opacity="0.85" />
              <path d="M 292 200 A 56 56 0 0 0 292 312" stroke="currentColor" strokeWidth="14" strokeLinecap="round" opacity="0.7" />
            </svg>
          )}
        </div>
      </div>
      <p
        className={`text-white/60 leading-relaxed font-sans ${
          isMobile ? 'text-xs sm:text-sm max-w-[300px]' : 'text-sm sm:text-[15px] max-w-[340px]'
        }`}
      >
        {shortDescription}
      </p>
    </div>
  )
}

export default function ServicesSection() {
  const { activePersona, personaConfig } = usePersona()
  const accent = personaConfig?.theme?.accent ?? '#5e17eb'
  const accentLight = personaConfig?.theme?.accentLight ?? '#ae6bf6'
  const [scrollProgress, setScrollProgress] = useState(0)

  const sectionRef = useRef<HTMLElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const mobileTrackRef = useRef<HTMLDivElement>(null)

  // 5 Unique Services partitioned across left and right — ZERO DUPLICATION
  // Left Column (3 services): Full Stack, Cloud Architecture, Creative UI/UX
  const leftServices = [SERVICES[0], SERVICES[2], SERVICES[4]]
  // Right Column (2 services): AI Engineering, MVP Engineering
  const rightServices = [SERVICES[1], SERVICES[3]]

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

    const mm = gsap.matchMedia()

    // ─────────────────────────────────────────────────────────────
    // DESKTOP (>= 768px): Progressive Dual Rolling Columns (Trionn Desktop)
    // ─────────────────────────────────────────────────────────────
    mm.add('(min-width: 768px)', () => {
      const leftCol = leftColRef.current
      const rightCol = rightColRef.current
      if (!leftCol || !rightCol) return

      const leftCards = gsap.utils.toArray<HTMLElement>('.svc-card-desktop-left')
      const rightCards = gsap.utils.toArray<HTMLElement>('.svc-card-desktop-right')
      const scrollLength = window.innerHeight * 4.5

      // 1. Pin Section & Scrub Progress (Priority 2: Evaluated first in DOM flow)
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${scrollLength}`,
        pin: true,
        anticipatePin: 1,
        refreshPriority: 2,
        onUpdate: (self) => {
          setScrollProgress(self.progress)
        },
      })

      // 2. Left column rolls UPwards smoothly across scroll
      gsap.fromTo(
        leftCol,
        { y: '28%' },
        {
          y: '-32%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${scrollLength}`,
            scrub: 1.2,
            refreshPriority: 2,
          },
        }
      )

      // 3. Right column rolls DOWNwards smoothly across scroll
      gsap.fromTo(
        rightCol,
        { y: '-32%' },
        {
          y: '28%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${scrollLength}`,
            scrub: 1.2,
            refreshPriority: 2,
          },
        }
      )

      // 4. Staggered progressive card focus arc
      // Cards sit at clean base opacity (0.35) and peak to 1.0 as they cross the vertical center
      const setupProgressiveArc = (cards: HTMLElement[], totalItems: number, offsetProgress = 0) => {
        cards.forEach((card, i) => {
          const centerPoint = (i + offsetProgress) / totalItems
          const windowSpan = 0.35 / totalItems

          const enterP = Math.max(0, centerPoint - windowSpan)
          const exitP = Math.min(1, centerPoint + windowSpan)

          gsap.fromTo(
            card,
            { opacity: 0.35, scale: 0.94 },
            {
              opacity: 1,
              scale: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: `top+=${enterP * scrollLength} top`,
                end: `top+=${centerPoint * scrollLength} top`,
                scrub: 0.8,
              },
            }
          )

          gsap.fromTo(
            card,
            { opacity: 1, scale: 1 },
            {
              opacity: 0.35,
              scale: 0.94,
              ease: 'power2.in',
              scrollTrigger: {
                trigger: section,
                start: `top+=${centerPoint * scrollLength} top`,
                end: `top+=${exitP * scrollLength} top`,
                scrub: 0.8,
              },
            }
          )
        })
      }

      setupProgressiveArc(leftCards, 3, 0.45)
      setupProgressiveArc(rightCards, 2, 0.55)
    })

    // ─────────────────────────────────────────────────────────────
    // MOBILE (< 768px): Progressive Vertical Stream (Trionn Mobile)
    // ─────────────────────────────────────────────────────────────
    mm.add('(max-width: 767px)', () => {
      const mobileTrack = mobileTrackRef.current
      if (!mobileTrack) return

      const mobileCards = gsap.utils.toArray<HTMLElement>('.svc-mobile-card')
      const totalCards = SERVICES.length
      const mobileScrollLength = window.innerHeight * 3.2

      // 1. Pin Section on mobile
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${mobileScrollLength}`,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress)
        },
      })

      // 2. Translate the vertical stream upwards smoothly
      // Each slot is 65vh. Distance to move so each card passes through center:
      // When y: 0, Card 0 is centered.
      // When y: -(totalCards - 1) * 65vh, Card (N-1) is centered.
      const slotHeight = window.innerHeight * 0.65
      const totalTranslate = slotHeight * (totalCards - 1)

      gsap.fromTo(
        mobileTrack,
        { y: 0 },
        {
          y: -totalTranslate,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${mobileScrollLength}`,
            scrub: 1,
          },
        }
      )

      // 3. Progressive Reveal for each card:
      // Active card in viewport center is full opacity (1.0), scale 1.0.
      // Cards entering from bottom or exiting to top sit at solid base opacity (0.35), scale 0.94.
      mobileCards.forEach((card, i) => {
        const centerProgress = i / (totalCards - 1)
        const halfWindow = 0.45 / (totalCards - 1)
        const enterStart = Math.max(0, centerProgress - halfWindow)
        const exitEnd = Math.min(1, centerProgress + halfWindow)

        if (i === 0) {
          // First card starts in center, active immediately
          gsap.set(card, { opacity: 1, scale: 1 })
          gsap.to(card, {
            opacity: 0.35,
            scale: 0.94,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: section,
              start: `top+=${centerProgress * mobileScrollLength} top`,
              end: `top+=${exitEnd * mobileScrollLength} top`,
              scrub: 0.6,
            },
          })
        } else if (i === totalCards - 1) {
          // Last card enters from below, stays active at the end
          gsap.set(card, { opacity: 0.35, scale: 0.94 })
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: `top+=${enterStart * mobileScrollLength} top`,
              end: `top+=${centerProgress * mobileScrollLength} top`,
              scrub: 0.6,
            },
          })
        } else {
          // Intermediate cards: enter from below -> peak at center -> exit to top
          gsap.set(card, { opacity: 0.35, scale: 0.94 })

          gsap.fromTo(
            card,
            { opacity: 0.35, scale: 0.94 },
            {
              opacity: 1,
              scale: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: `top+=${enterStart * mobileScrollLength} top`,
                end: `top+=${centerProgress * mobileScrollLength} top`,
                scrub: 0.6,
              },
            }
          )

          gsap.fromTo(
            card,
            { opacity: 1, scale: 1 },
            {
              opacity: 0.35,
              scale: 0.94,
              ease: 'power2.in',
              scrollTrigger: {
                trigger: section,
                start: `top+=${centerProgress * mobileScrollLength} top`,
                end: `top+=${exitEnd * mobileScrollLength} top`,
                scrub: 0.6,
              },
            }
          )
        }
      })
    })

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [activePersona] }
  )

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full h-screen overflow-hidden bg-[#060618] isolate"
    >
      {/* 1. FULL-WIDTH BACKGROUND VIDEO LAYER — strictly in background (-z-10) */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <SVCrystalScrubber
          accent={accent}
          accentLight={accentLight}
          progress={scrollProgress}
          className="w-full h-full"
        />
      </div>

      {/* 21st.dev inspired Atmospheric Horizon & Beam Transition */}
      {/* 1. Deep Multi-Stop Gradient Mask: Seamlessly dissolves Hero #060618 into the 3D crystal nebula */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-48 sm:h-64 md:h-80 z-10"
        style={{
          background: 'linear-gradient(to bottom, #060618 0%, #060618 20%, rgba(6,6,24,0.92) 45%, rgba(6,6,24,0.45) 75%, transparent 100%)',
        }}
      />

      {/* 2. Soft Atmospheric Radial Lamp Glow at Horizon (21st.dev Lamp / Radial Glow style) */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] max-w-[95vw] h-48 blur-2xl opacity-35 z-10"
        style={{
          background: `radial-gradient(ellipse 60% 100% at 50% 0%, ${accentLight} 0%, ${accent} 45%, transparent 100%)`,
        }}
      />

      {/* 3. Glowing Horizon Threshold Beam (21st.dev Border Beam / Grid Beam style) */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] z-20 overflow-hidden flex items-center justify-center">
        <div
          className="w-full max-w-4xl h-[1px] opacity-75"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${accentLight} 50%, transparent 100%)`,
            boxShadow: `0 0 16px 2px ${accent}`,
          }}
        />
      </div>

      {/* Bottom Seamless Blend into Featured Projects */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 sm:h-40 z-10"
        style={{
          background: 'linear-gradient(to top, #060618 0%, rgba(6,6,24,0.9) 35%, transparent 100%)',
        }}
      />

      {/* 2. CENTER "OUR SERVICES" LABEL (Trionn aesthetic) */}
      <div className="absolute top-5 sm:top-7 md:top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
        <span className="text-[9px] sm:text-[10px] md:text-xs font-mono uppercase tracking-[0.45em] text-white/45">
          Our Services
        </span>
      </div>

      {/* 3A. DESKTOP FOREGROUND (>= 768px): Progressive Dual Rolling Columns (NO DUPLICATION, z-20) */}
      <div className="hidden md:flex relative z-20 w-full h-full items-center justify-between px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 pointer-events-none">
        {/* LEFT COLUMN — rolls UP (3 unique services) */}
        <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[380px] h-full flex items-center overflow-hidden pointer-events-auto">
          <div ref={leftColRef} className="flex flex-col gap-28 md:gap-36 w-full py-32 will-change-transform">
            {leftServices.map((svc) => (
              <div key={`left-${svc.id}`} className="svc-card-desktop-left relative z-10">
                <ServiceCard
                  title={svc.title}
                  shortDescription={svc.shortDescription}
                  icon={svc.icon}
                  accentLight={accentLight}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CENTER VOID — Generous open space framing the 3D crystal */}
        <div className="flex-1 pointer-events-none min-w-[80px] md:min-w-[160px] lg:min-w-[220px]" />

        {/* RIGHT COLUMN — rolls DOWN (2 unique services) */}
        <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[380px] h-full flex items-center overflow-hidden pointer-events-auto">
          <div ref={rightColRef} className="flex flex-col gap-32 md:gap-40 w-full py-40 will-change-transform">
            {rightServices.map((svc) => (
              <div key={`right-${svc.id}`} className="svc-card-desktop-right relative z-10">
                <ServiceCard
                  title={svc.title}
                  shortDescription={svc.shortDescription}
                  icon={svc.icon}
                  accentLight={accentLight}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3B. MOBILE FOREGROUND (< 768px): Progressive Vertical Stream (Trionn Mobile) */}
      <div className="flex md:hidden absolute inset-0 z-20 overflow-hidden pointer-events-none justify-center">
        <div
          ref={mobileTrackRef}
          className="w-full max-w-[340px] sm:max-w-[380px] flex flex-col items-center will-change-transform pointer-events-auto px-4 pt-[17.5vh] pb-[17.5vh]"
        >
          {SERVICES.map((svc) => (
            <div
              key={`mobile-${svc.id}`}
              className="svc-mobile-slot w-full h-[65vh] flex items-center justify-center flex-shrink-0"
            >
              <div className="svc-mobile-card w-full">
                <ServiceCard
                  title={svc.title}
                  shortDescription={svc.shortDescription}
                  icon={svc.icon}
                  accentLight={accentLight}
                  isMobile
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. BOTTOM CTAs (Muted Background, Global Sound State Architecture) */}
      <div className="absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3 md:gap-4 flex-nowrap justify-center pointer-events-auto max-w-[95vw]">
        <Link
          href={`/contact?persona=${activePersona}`}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-white border transition-all duration-300 group hover:scale-105 whitespace-nowrap shadow-[0_0_24px_-6px_rgba(94,23,235,0.6)]"
          style={{
            background: `${accent}35`,
            borderColor: `${accent}80`,
          }}
        >
          <span>Start a Project</span>
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
        <Link
          href={`/services?persona=${activePersona}`}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-white/70 hover:text-white border border-white/15 hover:border-white/30 bg-black/50 backdrop-blur-md transition-all duration-300 group hover:scale-105 whitespace-nowrap"
        >
          <span>All Services</span>
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  )
}
