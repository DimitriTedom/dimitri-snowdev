'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { usePersona } from '@/hooks/usePersona'
import { SERVICES } from '@/data/services'
import SVCrystalScrubber from '@/components/animations/SVCrystalScrubber'

gsap.registerPlugin(ScrollTrigger)

// Minimal service card — same on left and right (Trionn pattern)
function ServiceCard({
  title,
  shortDescription,
  icon,
  accentLight,
  align,
}: {
  title: string
  shortDescription: string
  icon: string
  accentLight: string
  align: 'left' | 'right'
}) {
  const isRight = align === 'right'
  return (
    <div className={`flex flex-col gap-3 py-10 will-change-transform ${isRight ? 'items-end text-right' : 'items-start text-left'}`}>
      <div className="flex-shrink-0 w-10 h-10 opacity-55" style={{ color: accentLight }}>
        {icon === 'code' && (
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            {[0, 1, 2].flatMap(r => [0, 1, 2].map(c => (
              <circle key={`${r}-${c}`} cx={8 + c * 12} cy={8 + r * 12} r="2" stroke="currentColor" strokeWidth="1.5" />
            )))}
            {[0, 1, 2].flatMap(r => [0, 1].map(c => (
              <line key={`h-${r}-${c}`} x1={10 + c * 12} y1={8 + r * 12} x2={18 + c * 12} y2={8 + r * 12} stroke="currentColor" strokeWidth="1" opacity="0.7" />
            )))}
            {[0, 1].flatMap(r => [0, 1, 2].map(c => (
              <line key={`v-${r}-${c}`} x1={8 + c * 12} y1={10 + r * 12} x2={8 + c * 12} y2={18 + r * 12} stroke="currentColor" strokeWidth="1" opacity="0.7" />
            )))}
          </svg>
        )}
        {icon === 'bot' && (
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            {[0, 1, 2, 3].map(i => <circle key={`l0-${i}`} cx="6" cy={5 + i * 9} r="2.5" stroke="currentColor" strokeWidth="1.5" />)}
            {[0, 1, 2].map(i => <circle key={`l1-${i}`} cx="20" cy={9 + i * 11} r="2.5" stroke="currentColor" strokeWidth="1.5" />)}
            {[0, 1].map(i => <circle key={`l2-${i}`} cx="34" cy={14 + i * 12} r="2.5" stroke="currentColor" strokeWidth="1.5" />)}
            {[0, 1, 2, 3].flatMap(i => [0, 1, 2].map(j => <line key={`c0-${i}-${j}`} x1="8.5" y1={5 + i * 9} x2="17.5" y2={9 + j * 11} stroke="currentColor" strokeWidth="0.75" opacity="0.5" />))}
            {[0, 1, 2].flatMap(i => [0, 1].map(j => <line key={`c1-${i}-${j}`} x1="22.5" y1={9 + i * 11} x2="31.5" y2={14 + j * 12} stroke="currentColor" strokeWidth="0.75" opacity="0.5" />))}
          </svg>
        )}
        {icon === 'cloud' && (
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <polygon points="20,4 27,8.5 27,17.5 20,22 13,17.5 13,8.5" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
            <polygon points="20,9 24,11.5 24,16.5 20,19 16,16.5 16,11.5" stroke="currentColor" strokeWidth="1.2" opacity="0.65" />
            <polygon points="20,13 22,14.5 22,17.5 20,19 18,17.5 18,14.5" stroke="currentColor" strokeWidth="1.5" />
            {[0, 1, 2, 3, 4, 5].map(i => {
              const a = (i * 60 - 90) * Math.PI / 180
              return <line key={i} x1="20" y1="20" x2={20 + Math.cos(a) * 14} y2={20 + Math.sin(a) * 14} stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
            })}
          </svg>
        )}
      </div>
      <h3 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-white uppercase tracking-tight leading-none">
        {title}
      </h3>
      <p className="text-sm text-white/42 leading-relaxed max-w-[220px]">
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
  const crystalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const leftCol = leftColRef.current
    const rightCol = rightColRef.current
    if (!section || !leftCol || !rightCol) return

    const leftCards = gsap.utils.toArray<HTMLElement>('.svc-card-left')
    const rightCards = gsap.utils.toArray<HTMLElement>('.svc-card-right')
    const n = leftCards.length
    const scrollLength = window.innerHeight * 5

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      ScrollTrigger.create({
        trigger: section, start: 'top top', end: `+=${scrollLength}`,
        pin: true, anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress)
        },
      })

      gsap.fromTo(leftCol, { y: leftCol.scrollHeight * 0.48 }, {
        y: -leftCol.scrollHeight * 0.48, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: `+=${scrollLength}`, scrub: 1.4 },
      })

      gsap.fromTo(rightCol, { y: -rightCol.scrollHeight * 0.48 }, {
        y: rightCol.scrollHeight * 0.48, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: `+=${scrollLength}`, scrub: 1.4 },
      })

      const applyArcFade = (cards: HTMLElement[], dir: 1 | -1) => {
        cards.forEach((card, i) => {
          const enter = (i / n) * scrollLength
          const peak = ((i + 0.5) / n) * scrollLength
          const exit = ((i + 1) / n) * scrollLength
          gsap.fromTo(card, { opacity: 0, scale: 0.78, rotateX: dir * 30 }, {
            opacity: 1, scale: 1, rotateX: 0, ease: 'power2.out',
            scrollTrigger: { trigger: section, start: `top+=${enter * 0.88} top`, end: `top+=${peak} top`, scrub: 1 },
          })
          gsap.fromTo(card, { opacity: 1, scale: 1, rotateX: 0 }, {
            opacity: 0, scale: 0.78, rotateX: dir * -30, ease: 'power2.in',
            scrollTrigger: { trigger: section, start: `top+=${peak} top`, end: `top+=${exit * 1.12} top`, scrub: 1 },
          })
        })
      }
      applyArcFade(leftCards, 1)
      applyArcFade(rightCards, -1)

      if (crystalRef.current) {
        gsap.fromTo(crystalRef.current, { scale: 0.55, opacity: 0, y: -50 }, {
          scale: 1, opacity: 1, y: 0, ease: 'power3.out', duration: 1.1,
          scrollTrigger: { trigger: section, start: 'top 85%', end: 'top top', scrub: false, toggleActions: 'play none none reverse' },
        })
      }
    })

    mm.add('(max-width: 767px)', () => {
      gsap.from([...leftCards, ...rightCards], {
        opacity: 0, y: 35, stagger: 0.13, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' },
      })
    })

    return () => mm.revert()
  }, [activePersona])

  return (
    <>
      <style>{`
        @keyframes svPulse {
          0%,100% { opacity:0; transform:scale(0.82); }
          50%      { opacity:1; transform:scale(1.12); }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="services"
        className="relative w-full min-h-screen overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#060618 0%,#07081a 50%,#060618 100%)' }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse 52% 42% at 50% 50%,${accent}0c 0%,transparent 68%)` }}
        />

        {/* Top fade mask (blends into hero below) */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 z-10"
          style={{ background: 'linear-gradient(to bottom,#060618,transparent)' }} />

        {/* 3D perspective stage */}
        <div
          className="relative flex items-center justify-center w-full h-screen"
          style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}
        >
          {/* LEFT — rolls UP */}
          <div className="absolute left-0 w-[38%] h-full flex items-center overflow-hidden pl-8 md:pl-16 lg:pl-24 pr-2">
            <div ref={leftColRef} className="flex flex-col w-full" style={{ transformStyle: 'preserve-3d' }}>
              {SERVICES.map(svc => (
                <div key={svc.id} className="svc-card-left">
                  <ServiceCard title={svc.title} shortDescription={svc.shortDescription} icon={svc.icon} accentLight={accentLight} align="left" />
                </div>
              ))}
            </div>
          </div>

          {/* CENTER — SV Crystal Scrubber / Placeholder */}
          <div ref={crystalRef} className="relative z-10 flex-shrink-0">
            <SVCrystalScrubber accent={accent} accentLight={accentLight} progress={scrollProgress} />
          </div>

          {/* RIGHT — rolls DOWN */}
          <div className="absolute right-0 w-[38%] h-full flex items-center overflow-hidden pr-8 md:pr-16 lg:pr-24 pl-2">
            <div ref={rightColRef} className="flex flex-col w-full" style={{ transformStyle: 'preserve-3d' }}>
              {SERVICES.map(svc => (
                <div key={svc.id} className="svc-card-right">
                  <ServiceCard title={svc.title} shortDescription={svc.shortDescription} icon={svc.icon} accentLight={accentLight} align="right" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 flex-wrap justify-center">
          <Link
            href={`/contact?persona=${activePersona}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white border transition-all duration-300 group hover:scale-105"
            style={{ background: `${accent}28`, borderColor: `${accent}60`, boxShadow: `0 0 25px -8px ${accent}55` }}
          >
            Start a Project
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <Link
            href={`/services?persona=${activePersona}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white/55 hover:text-white border border-white/12 hover:border-white/28 bg-white/[0.02] transition-all duration-300 group hover:scale-105"
          >
            View All Services
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Bottom fade mask */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-10"
          style={{ background: 'linear-gradient(to top,#060618,transparent)' }} />
      </section>
    </>
  )
}
