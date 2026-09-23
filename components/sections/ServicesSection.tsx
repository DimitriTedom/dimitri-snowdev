'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight, X, ChevronRight } from 'lucide-react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import { usePersona } from '@/hooks/usePersona'
import { SERVICES, ServiceItem } from '@/data/services'
import SVCrystalScrubber from '@/components/animations/SVCrystalScrubber'

gsap.registerPlugin(ScrollTrigger)

// ─── Tech stack pills per service ────────────────────────────────────────────
const TECH_STACKS: Record<string, string[]> = {
  'fullstack-engineering': ['Next.js 15', 'TypeScript', 'Supabase', 'Tailwind'],
  'ai-engineering': ['LangChain', 'RAG', 'OpenAI', 'Pinecone'],
  'cloud-architecture': ['Docker', 'AWS', 'Supabase', 'Redis'],
  'mvp-engineering': ['Next.js', 'Stripe', 'Postgres', 'Vercel'],
  'creative-engineering': ['GSAP', 'Framer', 'Three.js', 'Figma'],
  'systems-architecture': ['WebSockets', 'Redis', 'Kafka', 'gRPC'],
}

// ─── Inline Tilt + Spotlight (ibelick pattern — no extra install) ─────────────
function TiltCard({
  children,
  className,
  accentLight,
}: {
  children: React.ReactNode
  className?: string
  accentLight: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springOpts = { stiffness: 26.7, damping: 4.1, mass: 0.2 }
  const xSpring = useSpring(mouseX, springOpts)
  const ySpring = useSpring(mouseY, springOpts)

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-8, 8])
  const transform = useMotionTemplate`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

  // Spotlight position
  const spotX = useTransform(xSpring, [-0.5, 0.5], ['0%', '100%'])
  const spotY = useTransform(ySpring, [-0.5, 0.5], ['0%', '100%'])
  const spotOpacity = useMotionValue(0)
  const spotOpacitySpring = useSpring(spotOpacity, springOpts)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
    spotOpacity.set(1)
  }, [mouseX, mouseY, spotOpacity])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    spotOpacity.set(0)
  }, [mouseX, mouseY, spotOpacity])

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className ?? ''}`}
      style={{ transformStyle: 'preserve-3d', transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight sheen */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl z-10"
        style={{
          background: useMotionTemplate`radial-gradient(320px circle at ${spotX} ${spotY}, ${accentLight}22 0%, transparent 70%)`,
          opacity: spotOpacitySpring,
        }}
      />
      {children}
    </motion.div>
  )
}

// ─── Tech Stack Pills ─────────────────────────────────────────────────────────
function TechPills({ serviceId, accentLight }: { serviceId: string; accentLight: string }) {
  const pills = TECH_STACKS[serviceId] ?? []
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {pills.map((pill) => (
        <span
          key={pill}
          className="font-mono text-[9px] tracking-[0.18em] uppercase px-2 py-0.5 rounded-full border"
          style={{
            color: accentLight,
            borderColor: `${accentLight}40`,
            background: `${accentLight}10`,
          }}
        >
          {pill}
        </span>
      ))}
    </div>
  )
}

// ─── HUD Progress Tracker ─────────────────────────────────────────────────────
const PAIR_LABELS = ['01', '02', '03']

function HUDProgress({
  activePair,
  accentLight,
  accent,
}: {
  activePair: number
  accentLight: string
  accent: string
}) {
  return (
    <div className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2.5 pointer-events-none">
      {PAIR_LABELS.map((label, i) => {
        const isActive = i === activePair
        return (
          <div key={label} className="flex flex-col items-center gap-1">
            <motion.div
              animate={{
                height: isActive ? 32 : 12,
                opacity: isActive ? 1 : 0.3,
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="rounded-full w-[2px]"
              style={{
                background: isActive
                  ? `linear-gradient(to bottom, ${accentLight}, ${accent})`
                  : 'rgba(255,255,255,0.25)',
                boxShadow: isActive ? `0 0 8px ${accentLight}` : 'none',
              }}
            />
            <motion.span
              animate={{ opacity: isActive ? 0.9 : 0.25 }}
              className="font-mono text-[8px] tracking-[0.2em] text-white"
            >
              {label}
            </motion.span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Quick-View Drawer ────────────────────────────────────────────────────────
function QuickViewDrawer({
  service,
  onClose,
  accent,
  accentLight,
}: {
  service: ServiceItem | null
  onClose: () => void
  accent: string
  accentLight: string
}) {
  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Scrim */}
          <motion.div
            key="scrim"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            className="fixed right-0 top-0 h-full z-50 w-full max-w-[420px] flex flex-col"
            style={{
              background:
                'linear-gradient(135deg, rgba(9,9,26,0.97) 0%, rgba(20,10,45,0.97) 100%)',
              backdropFilter: 'blur(24px)',
              borderLeft: `1px solid ${accentLight}25`,
              boxShadow: `-24px 0 80px rgba(0,0,0,0.7)`,
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
          >
            {/* Header */}
            <div
              className="flex items-start justify-between p-6 pb-4 border-b"
              style={{ borderColor: `${accentLight}20` }}
            >
              <div className="flex-1 pr-4">
                <span
                  className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2 block"
                  style={{ color: accentLight }}
                >
                  Service Overview
                </span>
                <h3 className="font-display font-extrabold text-white text-xl leading-tight uppercase tracking-tight">
                  {service.title}
                </h3>
                <p className="text-white/45 text-xs font-mono mt-1 tracking-widest uppercase">
                  {service.tagline}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg border border-white/10 hover:border-white/25 text-white/40 hover:text-white transition-all duration-200 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed">{service.description}</p>

              {/* Tech Stack */}
              <div>
                <span
                  className="font-mono text-[9px] tracking-[0.3em] uppercase mb-3 block"
                  style={{ color: accentLight }}
                >
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(TECH_STACKS[service.id] ?? []).map((pill) => (
                    <span
                      key={pill}
                      className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border"
                      style={{
                        color: accentLight,
                        borderColor: `${accentLight}40`,
                        background: `${accentLight}12`,
                      }}
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <span
                  className="font-mono text-[9px] tracking-[0.3em] uppercase mb-3 block"
                  style={{ color: accentLight }}
                >
                  What&apos;s Included
                </span>
                <ul className="flex flex-col gap-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <ChevronRight
                        className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                        style={{ color: accentLight }}
                      />
                      <span className="text-slate-300 text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div>
                <span
                  className="font-mono text-[9px] tracking-[0.3em] uppercase mb-3 block"
                  style={{ color: accentLight }}
                >
                  Deliverables
                </span>
                <ul className="flex flex-col gap-2">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                        style={{ background: accentLight }}
                      />
                      <span className="text-slate-300 text-sm leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="p-6 pt-4 border-t" style={{ borderColor: `${accentLight}20` }}>
              <Link
                href={`/contact?service=${service.id}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${accent} 0%, ${accentLight} 100%)`,
                  boxShadow: `0 0 24px ${accent}55`,
                }}
                onClick={onClose}
              >
                <span>Start This Service</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Icon map ─────────────────────────────────────────────────────────────────
const ICON_COMPONENTS: Record<string, React.ReactNode> = {
  code: (
    <svg viewBox="0 0 512 512" fill="none" className="w-full h-full">
      <line x1="56" y1="56" x2="456" y2="56" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
      <line x1="56" y1="189" x2="456" y2="189" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
      <line x1="56" y1="323" x2="456" y2="323" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
      <line x1="456" y1="456" x2="456" y2="456" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
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
  ),
  bot: (
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
  ),
  cloud: (
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
  ),
  layers: (
    <svg viewBox="0 0 512 512" fill="none" className="w-full h-full">
      <rect x="72" y="72" width="368" height="368" rx="8" stroke="currentColor" strokeWidth="14" />
      <rect x="136" y="136" width="240" height="240" rx="6" stroke="currentColor" strokeWidth="14" opacity="0.85" />
      <rect x="200" y="200" width="112" height="112" rx="4" stroke="currentColor" strokeWidth="14" opacity="0.7" />
      <circle cx="256" cy="256" r="14" fill="currentColor" />
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 512 512" fill="none" className="w-full h-full">
      <path d="M 120 120 A 136 136 0 0 1 120 392" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
      <path d="M 170 160 A 96 96 0 0 1 170 352" stroke="currentColor" strokeWidth="14" strokeLinecap="round" opacity="0.85" />
      <path d="M 220 200 A 56 56 0 0 1 220 312" stroke="currentColor" strokeWidth="14" strokeLinecap="round" opacity="0.7" />
      <path d="M 392 120 A 136 136 0 0 0 392 392" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
      <path d="M 342 160 A 96 96 0 0 0 342 352" stroke="currentColor" strokeWidth="14" strokeLinecap="round" opacity="0.85" />
      <path d="M 292 200 A 56 56 0 0 0 292 312" stroke="currentColor" strokeWidth="14" strokeLinecap="round" opacity="0.7" />
    </svg>
  ),
  cpu: (
    <svg viewBox="0 0 512 512" fill="none" className="w-full h-full">
      <rect x="144" y="144" width="224" height="224" rx="20" stroke="currentColor" strokeWidth="16" />
      <rect x="192" y="192" width="128" height="128" rx="8" stroke="currentColor" strokeWidth="12" fill="currentColor" fillOpacity="0.15" />
      <circle cx="256" cy="256" r="28" fill="currentColor" />
      <line x1="200" y1="56" x2="200" y2="144" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      <line x1="256" y1="56" x2="256" y2="144" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      <line x1="312" y1="56" x2="312" y2="144" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      <line x1="200" y1="368" x2="200" y2="456" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      <line x1="256" y1="368" x2="256" y2="456" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      <line x1="312" y1="368" x2="312" y2="456" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      <line x1="56" y1="200" x2="144" y2="200" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      <line x1="56" y1="256" x2="144" y2="256" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      <line x1="56" y1="312" x2="144" y2="312" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      <line x1="368" y1="200" x2="456" y2="200" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      <line x1="368" y1="256" x2="456" y2="256" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      <line x1="368" y1="312" x2="456" y2="312" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
    </svg>
  ),
}

// ─── Service Card (with Tilt, Spotlight, Pills, Quick-View trigger) ───────────
function ServiceCard({
  index,
  service,
  accentLight,
  isMobile = false,
  onQuickView,
}: {
  index: number
  service: ServiceItem
  accentLight: string
  isMobile?: boolean
  onQuickView: (svc: ServiceItem) => void
}) {
  const { title, tagline, shortDescription, icon, id } = service

  const cardContent = (
    <div
      className={`flex flex-col gap-3 rounded-2xl border transition-colors duration-300 will-change-transform group ${
        isMobile
          ? 'p-5 sm:p-6 bg-[#070716]/95 backdrop-blur-2xl border-white/[0.18] w-full shadow-[0_20px_50px_rgba(0,0,0,0.95)]'
          : 'p-6 sm:p-7 md:p-8 bg-[#070716]/95 backdrop-blur-2xl border-white/[0.18] hover:border-white/30 shadow-[0_24px_60px_rgba(0,0,0,0.92),inset_0_1px_0_rgba(255,255,255,0.12)]'
      }`}
    >
      {/* Category / Index Badge */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-white/50 uppercase">
          {`0${index + 1} // ${tagline ? tagline.split('&')[0].trim() : 'SERVICE'}`}
        </span>
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: accentLight, boxShadow: `0 0 8px ${accentLight}` }}
        />
      </div>

      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <h3
          className={`font-display font-extrabold text-white uppercase tracking-tight leading-[1.15] break-words flex-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${
            isMobile ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl lg:text-[28px]'
          }`}
        >
          {title}
        </h3>
        <div
          className={`flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
            isMobile ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-11 h-11 md:w-12 md:h-12'
          }`}
          style={{
            color: accentLight,
            filter: `drop-shadow(0 0 12px ${accentLight}40)`,
          }}
        >
          {ICON_COMPONENTS[icon]}
        </div>
      </div>

      <p
        className={`text-slate-100 font-normal leading-relaxed font-sans drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] ${
          isMobile ? 'text-xs sm:text-sm max-w-[320px]' : 'text-sm sm:text-[15px] max-w-[360px]'
        }`}
      >
        {shortDescription}
      </p>

      {/* Tech Stack Pills */}
      <TechPills serviceId={id} accentLight={accentLight} />

      {/* Quick-View trigger */}
      <button
        onClick={() => onQuickView(service)}
        className="mt-1 self-start inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 hover:gap-2"
        style={{ color: accentLight }}
      >
        <span>View Details</span>
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  )

  if (isMobile) return cardContent

  return (
    <TiltCard accentLight={accentLight} className="w-full">
      {cardContent}
    </TiltCard>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ServicesSection() {
  const { activePersona, personaConfig } = usePersona()
  const accent = personaConfig?.theme?.accent ?? '#5e17eb'
  const accentLight = personaConfig?.theme?.accentLight ?? '#ae6bf6'
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activePair, setActivePair] = useState(0)
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const mobileTrackRef = useRef<HTMLDivElement>(null)

  // 3 Balanced Pairs
  const leftServices = [SERVICES[0], SERVICES[2], SERVICES[4]]
  const rightServices = [SERVICES[1], SERVICES[3], SERVICES[5]]

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const mm = gsap.matchMedia()

      // ─────────────────────────────────────────────────────────────
      // DESKTOP (>= 768px): Synchronized Dual Semicircular Orbital Stage
      // Enhanced with Z-axis depth for 3D spatial feel
      // ─────────────────────────────────────────────────────────────
      mm.add('(min-width: 768px)', () => {
        const leftCards = gsap.utils.toArray<HTMLElement>('.svc-card-desktop-left')
        const rightCards = gsap.utils.toArray<HTMLElement>('.svc-card-desktop-right')
        if (leftCards.length === 0 || rightCards.length === 0) return

        const scrollLength = window.innerHeight * 4.2
        const yDist = Math.min(window.innerHeight * 0.35, 290)
        const xDist = Math.min(window.innerWidth * 0.08, 110)
        const zActive = 40     // Pushed forward when active
        const zCorner = -60    // Pushed back when at corners

        // Master scrubbed timeline for the pinned section
        // Paced across 100 units so cards progressively glide over generous scroll distance
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${scrollLength}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            refreshPriority: 2,
            onUpdate: (self) => {
              setScrollProgress(self.progress)
              const p = self.progress
              if (p < 0.38) setActivePair(0)
              else if (p < 0.72) setActivePair(1)
              else setActivePair(2)
            },
          },
        })

        // ─────────────────────────────────────────────────────────────
        // 1. INITIAL STATE (Scroll = 0):
        // Pair 0 is in the middle (full focus, sharp, z=40)
        // Pair 1 is waiting at bottom corners (blur 10px, 35% opacity, z=-60)
        // Pair 2 is deep below (blur 20px, 0% opacity, z=-80)
        // ─────────────────────────────────────────────────────────────
        gsap.set(leftCards[0], { x: 0, y: 0, z: zActive, rotation: 0, opacity: 1, filter: 'blur(0px)', scale: 1 })
        gsap.set(rightCards[0], { x: 0, y: 0, z: zActive, rotation: 0, opacity: 1, filter: 'blur(0px)', scale: 1 })

        if (leftCards[1] && rightCards[1]) {
          gsap.set(leftCards[1], { x: -xDist, y: yDist, z: zCorner, rotation: 5, opacity: 0.35, filter: 'blur(10px)', scale: 0.92 })
          gsap.set(rightCards[1], { x: xDist, y: yDist, z: zCorner, rotation: -5, opacity: 0.35, filter: 'blur(10px)', scale: 0.92 })
        }
        if (leftCards[2] && rightCards[2]) {
          gsap.set(leftCards[2], { x: -xDist, y: yDist + 120, z: zCorner - 20, rotation: 6, opacity: 0, filter: 'blur(18px)', scale: 0.85 })
          gsap.set(rightCards[2], { x: xDist, y: yDist + 120, z: zCorner - 20, rotation: -6, opacity: 0, filter: 'blur(18px)', scale: 0.85 })
        }

        // ─────────────────────────────────────────────────────────────
        // 2. FIRST PROGRESSIVE TRANSITION (Time: 8 -> 46, duration: 38)
        // Pair 0 glides from center UP to top corners (dissolving progressively to blur + opacity 0)
        // Pair 1 glides from bottom corners INTO center (progressive focus: blur 10px -> 0px, opacity 0.35 -> 1)
        // Pair 2 enters bottom corners from below (opacity 0 -> 0.35, blur 18px -> 10px)
        // ─────────────────────────────────────────────────────────────
        tl.to(
          leftCards[0],
          { x: -xDist, y: -yDist, z: zCorner, rotation: -5, opacity: 0, filter: 'blur(16px)', scale: 0.88, ease: 'power1.inOut', duration: 38 },
          8
        )
        tl.to(
          rightCards[0],
          { x: xDist, y: -yDist, z: zCorner, rotation: 5, opacity: 0, filter: 'blur(16px)', scale: 0.88, ease: 'power1.inOut', duration: 38 },
          8
        )

        if (leftCards[1] && rightCards[1]) {
          tl.to(
            [leftCards[1], rightCards[1]],
            { x: 0, y: 0, z: zActive, rotation: 0, opacity: 1, filter: 'blur(0px)', scale: 1, ease: 'power1.inOut', duration: 38 },
            8
          )
        }

        if (leftCards[2] && rightCards[2]) {
          tl.to(
            leftCards[2],
            { x: -xDist, y: yDist, z: zCorner, rotation: 5, opacity: 0.35, filter: 'blur(10px)', scale: 0.92, ease: 'power1.inOut', duration: 30 },
            16
          )
          tl.to(
            rightCards[2],
            { x: xDist, y: yDist, z: zCorner, rotation: -5, opacity: 0.35, filter: 'blur(10px)', scale: 0.92, ease: 'power1.inOut', duration: 30 },
            16
          )
        }

        // ─────────────────────────────────────────────────────────────
        // 3. SECOND PROGRESSIVE TRANSITION (Time: 56 -> 94, duration: 38)
        // Pair 1 glides from center UP to top corners (dissolving progressively to blur + opacity 0)
        // Pair 2 glides from bottom corners INTO center (progressive focus: blur 10px -> 0px, opacity 0.35 -> 1)
        // ─────────────────────────────────────────────────────────────
        if (leftCards[1] && rightCards[1]) {
          tl.to(
            leftCards[1],
            { x: -xDist, y: -yDist, z: zCorner, rotation: -5, opacity: 0, filter: 'blur(16px)', scale: 0.88, ease: 'power1.inOut', duration: 38 },
            56
          )
          tl.to(
            rightCards[1],
            { x: xDist, y: -yDist, z: zCorner, rotation: 5, opacity: 0, filter: 'blur(16px)', scale: 0.88, ease: 'power1.inOut', duration: 38 },
            56
          )
        }

        if (leftCards[2] && rightCards[2]) {
          tl.to(
            [leftCards[2], rightCards[2]],
            { x: 0, y: 0, z: zActive, rotation: 0, opacity: 1, filter: 'blur(0px)', scale: 1, ease: 'power1.inOut', duration: 38 },
            56
          )
        }
      })

      // ─────────────────────────────────────────────────────────────
      // MOBILE (< 768px): Progressive Vertical Stream
      // ─────────────────────────────────────────────────────────────
      mm.add('(max-width: 767px)', () => {
        const mobileTrack = mobileTrackRef.current
        if (!mobileTrack) return

        const mobileCards = gsap.utils.toArray<HTMLElement>('.svc-mobile-card')
        const totalCards = SERVICES.length
        const mobileScrollLength = window.innerHeight * 3.2

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: `+=${mobileScrollLength}`,
          pin: true,
          anticipatePin: 1,
          refreshPriority: 2,
          onUpdate: (self) => {
            setScrollProgress(self.progress)
          },
        })

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
              refreshPriority: 2,
            },
          }
        )

        mobileCards.forEach((card, i) => {
          const centerProgress = i / (totalCards - 1)
          const halfWindow = 0.45 / (totalCards - 1)
          const enterStart = Math.max(0, centerProgress - halfWindow)
          const exitEnd = Math.min(1, centerProgress + halfWindow)

          if (i === 0) {
            gsap.set(card, { autoAlpha: 1, filter: 'blur(0px)', scale: 1, y: 0 })
            gsap.to(card, {
              autoAlpha: 0, filter: 'blur(14px)', scale: 0.9, y: -30, ease: 'power1.in',
              scrollTrigger: {
                trigger: section,
                start: `top+=${centerProgress * mobileScrollLength} top`,
                end: `top+=${exitEnd * mobileScrollLength} top`,
                scrub: 0.6,
              },
            })
          } else if (i === totalCards - 1) {
            gsap.set(card, { autoAlpha: 0, filter: 'blur(14px)', scale: 0.9, y: 30 })
            gsap.to(card, {
              autoAlpha: 1, filter: 'blur(0px)', scale: 1, y: 0, ease: 'power1.out',
              scrollTrigger: {
                trigger: section,
                start: `top+=${enterStart * mobileScrollLength} top`,
                end: `top+=${centerProgress * mobileScrollLength} top`,
                scrub: 0.6,
              },
            })
          } else {
            gsap.set(card, { autoAlpha: 0, filter: 'blur(14px)', scale: 0.9, y: 30 })
            gsap.fromTo(
              card,
              { autoAlpha: 0, filter: 'blur(14px)', scale: 0.9, y: 30 },
              {
                autoAlpha: 1, filter: 'blur(0px)', scale: 1, y: 0, ease: 'power1.out',
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
              { autoAlpha: 1, filter: 'blur(0px)', scale: 1, y: 0 },
              {
                autoAlpha: 0, filter: 'blur(14px)', scale: 0.9, y: -30, ease: 'power1.in',
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
    <>
      <section
        ref={sectionRef}
        id="services"
        className="relative w-full h-screen overflow-hidden bg-[#060618] isolate"
        style={{ perspective: '1200px' }}
      >
        {/* 1. BACKGROUND VIDEO LAYER */}
        <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
          <SVCrystalScrubber
            accent={accent}
            accentLight={accentLight}
            progress={scrollProgress}
            className="w-full h-full"
          />
        </div>

        {/* Atmospheric Top Blend */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-48 sm:h-64 md:h-80 z-10"
          style={{
            background: 'linear-gradient(to bottom, #060618 0%, #060618 20%, rgba(6,6,24,0.92) 45%, rgba(6,6,24,0.45) 75%, transparent 100%)',
          }}
        />
        {/* Radial Lamp Glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] max-w-[95vw] h-48 blur-2xl opacity-35 z-10"
          style={{
            background: `radial-gradient(ellipse 60% 100% at 50% 0%, ${accentLight} 0%, ${accent} 45%, transparent 100%)`,
          }}
        />
        {/* Horizon Beam */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] z-20 overflow-hidden flex items-center justify-center">
          <div
            className="w-full max-w-4xl h-[1px] opacity-75"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${accentLight} 50%, transparent 100%)`,
              boxShadow: `0 0 16px 2px ${accent}`,
            }}
          />
        </div>
        {/* Bottom Blend */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 sm:h-40 z-10"
          style={{
            background: 'linear-gradient(to top, #060618 0%, rgba(6,6,24,0.9) 35%, transparent 100%)',
          }}
        />

        {/* Section Label */}
        <div className="absolute top-5 sm:top-7 md:top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
          <span className="text-[9px] sm:text-[10px] md:text-xs font-mono uppercase tracking-[0.45em] text-white/45">
            Our Services
          </span>
        </div>

        {/* HUD Progress (desktop only) */}
        <div className="hidden md:block">
          <HUDProgress activePair={activePair} accent={accent} accentLight={accentLight} />
        </div>

        {/* 3A. DESKTOP CARDS */}
        <div
          className="hidden md:flex relative z-20 w-full h-full items-center justify-between px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* LEFT COLUMN */}
          <div className="relative w-full max-w-[320px] sm:max-w-[350px] lg:max-w-[390px] h-full flex items-center justify-center overflow-visible pointer-events-none">
            {leftServices.map((svc, index) => (
              <div
                key={`left-${svc.id}`}
                className="svc-card-desktop-left absolute w-full pointer-events-auto will-change-transform"
                style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
              >
                <ServiceCard
                  index={index * 2}
                  service={svc}
                  accentLight={accentLight}
                  onQuickView={setSelectedService}
                />
              </div>
            ))}
          </div>

          {/* CENTER VOID */}
          <div className="flex-1 pointer-events-none min-w-[80px] md:min-w-[160px] lg:min-w-[220px]" />

          {/* RIGHT COLUMN */}
          <div className="relative w-full max-w-[320px] sm:max-w-[350px] lg:max-w-[390px] h-full flex items-center justify-center overflow-visible pointer-events-none">
            {rightServices.map((svc, index) => (
              <div
                key={`right-${svc.id}`}
                className="svc-card-desktop-right absolute w-full pointer-events-auto will-change-transform"
                style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
              >
                <ServiceCard
                  index={index * 2 + 1}
                  service={svc}
                  accentLight={accentLight}
                  onQuickView={setSelectedService}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 3B. MOBILE CARDS */}
        <div className="flex md:hidden absolute inset-0 z-20 overflow-hidden pointer-events-none justify-center">
          <div
            ref={mobileTrackRef}
            className="w-full max-w-[340px] sm:max-w-[380px] flex flex-col items-center will-change-transform pointer-events-auto px-4 pt-[17.5vh] pb-[17.5vh]"
          >
            {SERVICES.map((svc, index) => (
              <div
                key={`mobile-${svc.id}`}
                className="svc-mobile-slot w-full h-[65vh] flex items-center justify-center flex-shrink-0"
              >
                <div className="svc-mobile-card w-full">
                  <ServiceCard
                    index={index}
                    service={svc}
                    accentLight={accentLight}
                      isMobile
                    onQuickView={setSelectedService}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. BOTTOM CTAs */}
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

      {/* Quick-View Drawer — rendered outside section to escape stacking context */}
      <QuickViewDrawer
        service={selectedService}
        onClose={() => setSelectedService(null)}
        accent={accent}
        accentLight={accentLight}
      />
    </>
  )
}
