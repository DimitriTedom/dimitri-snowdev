'use client'

import * as React from 'react'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import { usePersona } from '@/hooks/usePersona'
import { ArrowUpRight, Github, Linkedin, Mail, Twitter, ArrowUp } from 'lucide-react'

// Register ScrollTrigger safely for React
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.9; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.5)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.8)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 35s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
  box-shadow: 
      0 10px 30px -10px rgba(0, 0, 0, 0.8), 
      inset 0 1px 1px rgba(255, 255, 255, 0.12), 
      inset 0 -1px 2px rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 
      0 20px 40px -10px rgba(0, 0, 0, 0.9), 
      inset 0 1px 1px rgba(255, 255, 255, 0.25);
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 23vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.07);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, transparent 65%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.5) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 25px rgba(255, 255, 255, 0.15));
}
`

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export interface MagneticButtonProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  href?: string
  target?: string
  rel?: string
}

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = 'button', ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null)

    useEffect(() => {
      if (typeof window === 'undefined') return
      const element = localRef.current
      if (!element) return

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect()
          const h = rect.width / 2
          const w = rect.height / 2
          const x = e.clientX - rect.left - h
          const y = e.clientY - rect.top - w

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            scale: 1.04,
            ease: 'power2.out',
            duration: 0.4,
          })
        }

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: 'elastic.out(1, 0.3)',
            duration: 1.2,
          })
        }

        element.addEventListener('mousemove', handleMouseMove)
        element.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          element.removeEventListener('mousemove', handleMouseMove)
          element.removeEventListener('mouseleave', handleMouseLeave)
        }
      }, element)

      return () => ctx.revert()
    }, [])

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          if (localRef) {
            ;(localRef as React.MutableRefObject<HTMLElement | null>).current = node
          }
          if (typeof forwardedRef === 'function') {
            forwardedRef(node)
          } else if (forwardedRef) {
            ;(forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node
          }
        }}
        className={cn('cursor-pointer', className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
MagneticButton.displayName = 'MagneticButton'

// -------------------------------------------------------------------------
// 3. MARQUEE ITEM (SnowDev Branded)
// -------------------------------------------------------------------------
const MarqueeItem = ({ accentColor }: { accentColor: string }) => (
  <div className="flex items-center space-x-12 px-6">
    <span>Full Stack Architecture</span> <span style={{ color: accentColor }}>✦</span>
    <span>Autonomous AI Systems</span> <span className="text-white/40">✦</span>
    <span>Cloud Scalability</span> <span style={{ color: accentColor }}>✦</span>
    <span>Next.js 15 & Supabase</span> <span className="text-white/40">✦</span>
    <span>Deep Tech Engineering</span> <span style={{ color: accentColor }}>✦</span>
    <span>Production Grade</span> <span className="text-white/40">✦</span>
  </div>
)

// -------------------------------------------------------------------------
// 4. MAIN CINEMATIC FOOTER COMPONENT
// -------------------------------------------------------------------------
export function CinematicFooter() {
  const { activePersona, personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'

  const wrapperRef = useRef<HTMLDivElement>(null)
  const giantTextRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!wrapperRef.current) return

    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: '8vh', scale: 0.85, opacity: 0 },
        {
          y: '0vh',
          scale: 1,
          opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 85%',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      )

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 50%',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      )
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* 
        The "Curtain Reveal" Wrapper:
        It sits in standard flow. Because it has clip-path, its contents
        are ONLY visible within its bounding box as the user scrolls past.
      */}
      <div
        ref={wrapperRef}
        className="relative h-screen min-h-[640px] w-full mt-24"
        style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
      >
        {/* The actual footer stays fixed to the viewport underneath everything */}
        <footer className="fixed bottom-0 left-0 flex h-screen min-h-[640px] w-full flex-col justify-between overflow-hidden bg-black text-white font-sans">
          
          {/* Ambient Light & Grid Background with Persona Accent Glow */}
          <div
            className="absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[100px] pointer-events-none z-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${themeAccent}33 0%, rgba(89, 48, 212, 0.15) 45%, transparent 70%)`,
            }}
          />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text: SNOWDEV */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text font-display absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none uppercase"
          >
            SNOWDEV
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-10 left-0 w-full overflow-hidden border-y border-white/[0.08] bg-black/60 backdrop-blur-md py-3.5 z-10 -rotate-1 scale-105 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.25em] text-white/60 uppercase font-mono">
              <MarqueeItem accentColor={themeAccent} />
              <MarqueeItem accentColor={themeAccent} />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-16 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display footer-text-glow tracking-tight mb-10 text-center uppercase"
            >
              Ready to begin?
            </h2>

            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-5 w-full">
              {/* Primary Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton
                  as={Link}
                  href={`/contact?persona=${activePersona}`}
                  className="footer-glass-pill px-8 md:px-10 py-4 md:py-5 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-3 group"
                  style={{
                    borderColor: `${themeAccent}55`,
                    boxShadow: `0 10px 30px -10px ${themeAccent}40`,
                  }}
                >
                  <Mail className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </MagneticButton>

                <MagneticButton
                  as={Link}
                  href={`/services?persona=${activePersona}`}
                  className="footer-glass-pill px-8 md:px-10 py-4 md:py-5 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-3 group"
                >
                  <span>Explore Services</span>
                  <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </MagneticButton>
              </div>

              {/* Secondary Navigation & Social Links */}
              <div className="flex flex-wrap justify-center gap-2.5 md:gap-4 w-full mt-2">
                <MagneticButton
                  as={Link}
                  href={`/projects?persona=${activePersona}`}
                  className="footer-glass-pill px-5 py-2.5 rounded-full text-white/70 font-medium text-xs md:text-sm hover:text-white"
                >
                  Projects
                </MagneticButton>
                <MagneticButton
                  as={Link}
                  href={`/about?persona=${activePersona}`}
                  className="footer-glass-pill px-5 py-2.5 rounded-full text-white/70 font-medium text-xs md:text-sm hover:text-white"
                >
                  About
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="https://github.com/DimitriTedom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-glass-pill px-5 py-2.5 rounded-full text-white/70 font-medium text-xs md:text-sm hover:text-white flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="https://linkedin.com/in/dimitri-tedom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-glass-pill px-5 py-2.5 rounded-full text-white/70 font-medium text-xs md:text-sm hover:text-white flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="https://twitter.com/snowdev_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-glass-pill px-5 py-2.5 rounded-full text-white/70 font-medium text-xs md:text-sm hover:text-white flex items-center gap-1.5"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  Twitter
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-white/50 text-[10px] md:text-xs font-mono font-semibold tracking-widest uppercase order-2 md:order-1">
              © {new Date().getFullYear()} Dimitri Tedom (SnowDev). All rights reserved.
            </div>

            {/* "Crafted with Love" Badge */}
            <div className="footer-glass-pill px-6 py-2.5 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default">
              <span className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-widest">Crafted with</span>
              <span className="animate-footer-heartbeat text-sm md:text-base text-red-500">❤</span>
              <span className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-widest">by</span>
              <span className="text-white font-bold text-xs md:text-sm tracking-normal ml-0.5 font-display">SnowDev</span>
            </div>

            {/* Back to top Button */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-11 h-11 rounded-full footer-glass-pill flex items-center justify-center text-white/70 hover:text-white group order-3"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" />
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  )
}
