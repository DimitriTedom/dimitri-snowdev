'use client'

import * as React from 'react'
import { usePersona } from '@/hooks/usePersona'

interface ScrollLightBeamsProps {
  containerRef: React.RefObject<HTMLDivElement | null>
  revealedIndices?: number[]
  onRevealProject?: (index: number) => void
}

interface Point {
  x: number
  y: number
}

interface BezierCurve {
  p0: Point
  cp1: Point
  cp2: Point
  p1: Point
}

interface BeamSegment {
  origin: Point
  target: Point
  scrollStart: number
  scrollEnd: number
  smoothProgress: number
  cardIndex: number // -1 for Hero->Card0, 0 for Card0->Card1, etc.
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

// Split a cubic Bezier at parameter t in [0, 1] using de Casteljau's algorithm
function splitBezierAt(p0: Point, cp1: Point, cp2: Point, p1: Point, t: number): BezierCurve {
  if (t <= 0.001) {
    return { p0, cp1: p0, cp2: p0, p1: p0 }
  }
  if (t >= 0.999) {
    return { p0, cp1, cp2, p1 }
  }

  const p01 = { x: lerp(p0.x, cp1.x, t), y: lerp(p0.y, cp1.y, t) }
  const p12 = { x: lerp(cp1.x, cp2.x, t), y: lerp(cp1.y, cp2.y, t) }
  const p23 = { x: lerp(cp2.x, p1.x, t), y: lerp(cp2.y, p1.y, t) }

  const p012 = { x: lerp(p01.x, p12.x, t), y: lerp(p01.y, p12.y, t) }
  const p123 = { x: lerp(p12.x, p23.x, t), y: lerp(p12.y, p23.y, t) }

  const b = { x: lerp(p012.x, p123.x, t), y: lerp(p012.y, p123.y, t) }

  return {
    p0,
    cp1: p01,
    cp2: p012,
    p1: b, // Leading tip coordinate at parameter t
  }
}

export default function ScrollLightBeams({
  containerRef,
  revealedIndices = [],
  onRevealProject,
}: ScrollLightBeamsProps) {
  const { personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || '#ae6bf6'

  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const segmentsRef = React.useRef<BeamSegment[]>([])
  const offsetTopRef = React.useRef(460) // Extra canvas bleed upward into the hero section
  const onRevealProjectRef = React.useRef(onRevealProject)
  onRevealProjectRef.current = onRevealProject

  // Discover nodes (3D Hero Emitter -> Project Cards -> Contact CTA)
  const updateSegments = React.useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const contRect = container.getBoundingClientRect()
    const containerWidth = contRect.width

    // 1. Origin Node: 3D Artifact Core Emitter in Hero
    const emitterEl = document.getElementById('artifact-core-emitter') || document.getElementById('singularity-origin')
    let heroX = containerWidth / 2
    let heroY = -280

    if (emitterEl) {
      const eRect = emitterEl.getBoundingClientRect()
      heroX = eRect.left - contRect.left + eRect.width / 2
      heroY = eRect.top - contRect.top + eRect.height / 2
    }

    const offsetTop = Math.max(380, Math.abs(heroY) + 80)
    offsetTopRef.current = offsetTop

    // Canvas coordinates have origin at y = 0, so all relative points are shifted by +offsetTop
    const originPoint: Point = { x: heroX, y: heroY + offsetTop }

    // 2. Discover Project Cards
    const thumbs = Array.from(container.querySelectorAll<HTMLElement>('[data-project-thumb="true"]'))
    const cardNodes: { target: Point; emitter: Point; scrollY: number }[] = []

    thumbs.forEach((thumb, i) => {
      const tRect = thumb.getBoundingClientRect()
      const relLeft = tRect.left - contRect.left
      const relTop = tRect.top - contRect.top + offsetTop
      const relWidth = tRect.width
      const relHeight = tRect.height

      // Check for explicit target & emitter elements inside the card
      const targetEl = thumb.querySelector<HTMLElement>(`[data-project-target="${i}"]`)
      const emitterEl = thumb.querySelector<HTMLElement>(`[data-project-emitter="${i}"]`)

      let target: Point
      let emitter: Point

      if (targetEl) {
        const targetRect = targetEl.getBoundingClientRect()
        target = {
          x: targetRect.left - contRect.left + targetRect.width / 2,
          y: targetRect.top - contRect.top + offsetTop + targetRect.height / 2,
        }
      } else {
        // Fallback: Center of media
        target = { x: relLeft + relWidth * 0.5, y: relTop + relHeight * 0.5 }
      }

      if (emitterEl) {
        const emitRect = emitterEl.getBoundingClientRect()
        emitter = {
          x: emitRect.left - contRect.left + emitRect.width / 2,
          y: emitRect.top - contRect.top + offsetTop + emitRect.height / 2,
        }
      } else {
        // Fallback: Edge exit (right side for even, left side for odd)
        const isLeft = relLeft + relWidth / 2 < containerWidth * 0.5
        emitter = isLeft
          ? { x: relLeft + relWidth - 4, y: relTop + relHeight * 0.5 }
          : { x: relLeft + 4, y: relTop + relHeight * 0.5 }
      }

      const cardPageY = tRect.top + window.scrollY
      cardNodes.push({ target, emitter, scrollY: cardPageY })
    })

    // 3. Destination Node: Contact CTA
    const ctaEl = document.getElementById('contact-cta-btn')
    let ctaPoint: Point = { x: containerWidth / 2, y: contRect.height + offsetTop }
    let ctaPageY = contRect.bottom + window.scrollY

    if (ctaEl) {
      const cRect = ctaEl.getBoundingClientRect()
      ctaPoint = {
        x: cRect.left - contRect.left + cRect.width / 2,
        y: cRect.top - contRect.top + offsetTop + cRect.height / 2,
      }
      ctaPageY = cRect.top + window.scrollY
    }

    // 4. Build Chained Segments
    const newSegments: BeamSegment[] = []
    const windowH = typeof window !== 'undefined' ? window.innerHeight : 900

    if (cardNodes.length > 0) {
      // ─── Segment 0: 3D Core in Hero -> Project 0 Target Point ───
      // Starts when user scrolls past top of page, reaches convergence as Project 0 comes into view
      const seg0Start = 60
      const seg0End = Math.max(seg0Start + 220, cardNodes[0].scrollY - windowH * 0.5)

      newSegments.push({
        origin: originPoint,
        target: cardNodes[0].target,
        scrollStart: seg0Start,
        scrollEnd: seg0End,
        smoothProgress: 0,
        cardIndex: 0, // Targets Card 0
      })

      // ─── Segment i: Project i-1 Emitter -> Project i Target Point ───
      for (let i = 1; i < cardNodes.length; i++) {
        const fromCard = cardNodes[i - 1]
        const toCard = cardNodes[i]

        const startS = fromCard.scrollY - windowH * 0.35
        const endS = Math.max(startS + 240, toCard.scrollY - windowH * 0.5)

        newSegments.push({
          origin: fromCard.emitter,
          target: toCard.target,
          scrollStart: startS,
          scrollEnd: endS,
          smoothProgress: 0,
          cardIndex: i, // Targets Card i
        })
      }

      // ─── Final Segment: Last Card Emitter -> Contact CTA ───
      const lastCard = cardNodes[cardNodes.length - 1]
      const finalStart = lastCard.scrollY - windowH * 0.3
      const finalEnd = Math.max(finalStart + 250, ctaPageY - windowH * 0.5)

      newSegments.push({
        origin: lastCard.emitter,
        target: ctaPoint,
        scrollStart: finalStart,
        scrollEnd: finalEnd,
        smoothProgress: 0,
        cardIndex: -1, // Targets Contact CTA
      })
    }

    // Preserve existing smooth progress on resize
    newSegments.forEach((seg, i) => {
      if (segmentsRef.current[i]) {
        seg.smoothProgress = segmentsRef.current[i].smoothProgress
      }
    })

    segmentsRef.current = newSegments
  }, [containerRef])

  // Canvas render loop with 60fps/120fps wave physics and de Casteljau Bezier evaluation
  React.useEffect(() => {
    updateSegments()

    const canvas = canvasRef.current
    if (!canvas) return

    let animationFrameId: number
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1

    const handleResize = () => {
      updateSegments()
    }

    window.addEventListener('resize', handleResize)
    const timer1 = setTimeout(updateSegments, 400)
    const timer2 = setTimeout(updateSegments, 1200)

    const render = () => {
      const container = containerRef.current
      if (!canvas || !container) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      const contRect = container.getBoundingClientRect()
      const offsetTop = offsetTopRef.current
      const width = contRect.width
      const height = contRect.height + offsetTop + 120

      // Match canvas physical resolution to layout bounds
      const targetW = Math.floor(width * dpr)
      const targetH = Math.floor(height * dpr)
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW
        canvas.height = targetH
      }

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, width, height)

      // Living floating wave continuous time (runs continuously even when user stops scrolling)
      const time = performance.now() * 0.0016
      const currentScrollY = window.scrollY
      const segments = segmentsRef.current

      // Draw each chained segment
      segments.forEach((seg, sIdx) => {
        // Calculate target progress from scroll
        const rawProgress = Math.max(
          0,
          Math.min(1, (currentScrollY - seg.scrollStart) / (seg.scrollEnd - seg.scrollStart))
        )
        // Spring / Lerp smoothing towards current scroll position
        seg.smoothProgress += (rawProgress - seg.smoothProgress) * 0.12

        const p = seg.smoothProgress
        const p0 = seg.origin
        const p1 = seg.target

        const dx = p1.x - p0.x
        const dy = p1.y - p0.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 10) return

        // Tangent and normal vectors
        const nx = -dy / dist
        const ny = dx / dist

        // Trigger project reveal callback when the 3 beams converge at p1
        if (p >= 0.96 && seg.cardIndex >= 0) {
          onRevealProjectRef.current?.(seg.cardIndex)
        }

        // ─── A. PRE-VISIBLE TARGET DOT ─────────────────────────────────────
        // The target point is ALREADY VISIBLE in space BEFORE the 3 lines reach it!
        if (p < 0.98) {
          // Stationary glowing target dot in empty space
          ctx.beginPath()
          ctx.arc(p1.x, p1.y, 3.5, 0, Math.PI * 2)
          ctx.fillStyle = '#ffffff'
          ctx.shadowColor = '#ffffff'
          ctx.shadowBlur = 8
          ctx.fill()
          ctx.shadowBlur = 0

          // Pulsing delicate radar reticle
          const radarPulse = Math.sin(time * 3.5 + sIdx * 1.5) * 0.3 + 0.7
          ctx.beginPath()
          ctx.arc(p1.x, p1.y, 16 * radarPulse, 0, Math.PI * 2)
          ctx.strokeStyle = `${themeAccentLight}77`
          ctx.lineWidth = 1.2
          ctx.setLineDash([3, 5])
          ctx.stroke()
          ctx.setLineDash([])
        } else if (p >= 0.98 && p < 1.3) {
          // ─── B. SIMULTANEOUS CONVERGENCE IMPACT BLOOM ────────────────────
          // When all 3 strands touch the target point at the same time:
          const bloomFade = Math.max(0, 1 - (p - 0.98) * 4) // Fades smoothly as user scrolls further
          if (bloomFade > 0.05) {
            ctx.beginPath()
            ctx.arc(p1.x, p1.y, 22 * (1.2 - bloomFade * 0.2), 0, Math.PI * 2)
            ctx.fillStyle = `${themeAccentLight}${Math.floor(bloomFade * 60).toString(16).padStart(2, '0')}`
            ctx.fill()

            ctx.beginPath()
            ctx.arc(p1.x, p1.y, 5, 0, Math.PI * 2)
            ctx.fillStyle = '#ffffff'
            ctx.shadowColor = '#ffffff'
            ctx.shadowBlur = 16 * bloomFade
            ctx.fill()
            ctx.shadowBlur = 0
          }
        }

        // If this segment has not started growing yet, don't draw strands
        if (p <= 0.005) return

        // ─── C. THE 3 MULTI-STRAND BEAMS (Upper, Center, Lower) ────────────
        // 3 distinct paths spreading out from origin, waving in space, and converging at target
        const strandConfigs = [
          { spreadFactor: -1.0, phase: 0, lineWidth: 1.4, opacity: 0.8 },
          { spreadFactor: 0.0, phase: Math.PI * 0.5, lineWidth: 2.0, opacity: 1.0 },
          { spreadFactor: 1.0, phase: Math.PI, lineWidth: 1.4, opacity: 0.8 },
        ]

        strandConfigs.forEach((strand, k) => {
          // Organic floating wave physics (living wave motion even when scroll stops)
          const wave1 = Math.sin(time * 2.2 + strand.phase + sIdx * 1.8) * 18
          const wave2 = Math.cos(time * 1.7 + strand.phase + sIdx * 1.4) * 18
          const wave3 = Math.sin(time * 1.3 + strand.phase * 1.3) * 10

          const lateralSpread = strand.spreadFactor * Math.max(45, Math.min(110, dist * 0.2))

          // 3D-curved Bezier Control Points oscillating in real time
          const cp1: Point = {
            x: p0.x + dx * 0.32 + nx * (lateralSpread + wave1) + ny * wave3 * 0.2,
            y: p0.y + dy * 0.32 + ny * (lateralSpread + wave1) - nx * wave3 * 0.2,
          }
          const cp2: Point = {
            x: p0.x + dx * 0.68 + nx * (lateralSpread * 0.6 + wave2) - ny * wave3 * 0.2,
            y: p0.y + dy * 0.68 + ny * (lateralSpread * 0.6 + wave2) + nx * wave3 * 0.2,
          }

          // Evaluate the sub-curve up to parameter t = p
          const sub = splitBezierAt(p0, cp1, cp2, p1, p)

          // 1. Outer Soft Energetic Glow
          ctx.beginPath()
          ctx.moveTo(sub.p0.x, sub.p0.y)
          ctx.bezierCurveTo(sub.cp1.x, sub.cp1.y, sub.cp2.x, sub.cp2.y, sub.p1.x, sub.p1.y)
          ctx.strokeStyle = themeAccent
          ctx.lineWidth = strand.lineWidth * 3.5
          ctx.globalAlpha = 0.4 * strand.opacity
          ctx.shadowColor = themeAccent
          ctx.shadowBlur = 12
          ctx.stroke()
          ctx.shadowBlur = 0

          // 2. Core Laser Filament
          ctx.beginPath()
          ctx.moveTo(sub.p0.x, sub.p0.y)
          ctx.bezierCurveTo(sub.cp1.x, sub.cp1.y, sub.cp2.x, sub.cp2.y, sub.p1.x, sub.p1.y)
          ctx.strokeStyle = k === 1 ? '#ffffff' : themeAccentLight
          ctx.lineWidth = strand.lineWidth
          ctx.globalAlpha = strand.opacity
          ctx.stroke()
          ctx.globalAlpha = 1.0

          // 3. Leading Spark Dot at the tip of each strand while traveling
          if (p > 0.02 && p < 0.99) {
            ctx.beginPath()
            ctx.arc(sub.p1.x, sub.p1.y, 3.5, 0, Math.PI * 2)
            ctx.fillStyle = '#ffffff'
            ctx.shadowColor = '#ffffff'
            ctx.shadowBlur = 9
            ctx.fill()

            ctx.beginPath()
            ctx.arc(sub.p1.x, sub.p1.y, 8, 0, Math.PI * 2)
            ctx.fillStyle = `${themeAccentLight}55`
            ctx.fill()
            ctx.shadowBlur = 0
          }
        })

        // Origin Emitter Halo
        ctx.beginPath()
        ctx.arc(p0.x, p0.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = themeAccentLight
        ctx.fill()
      })

      ctx.restore()
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [containerRef, themeAccent, themeAccentLight, updateSegments])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-visible select-none"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute left-0 w-full overflow-visible"
        style={{
          top: `-${offsetTopRef.current}px`,
          height: `calc(100% + ${offsetTopRef.current + 120}px)`,
        }}
      />
    </div>
  )
}

