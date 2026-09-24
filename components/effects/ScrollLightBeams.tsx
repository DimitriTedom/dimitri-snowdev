'use client'

import * as React from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { usePersona } from '@/hooks/usePersona'

interface ScrollLightBeamsProps {
  containerRef: React.RefObject<HTMLDivElement | null>
}

interface Point {
  x: number
  y: number
}

// Convert an array of points into a smooth cubic Bezier SVG path (Catmull-Rom to Cubic Bezier)
function getSmoothSplinePath(points: Point[], offsetX = 0): string {
  if (points.length < 2) return ''

  const pts = points.map((p) => ({ x: p.x + offsetX, y: p.y }))
  let d = `M ${pts[0].x} ${pts[0].y}`

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]

    // Tension factor
    const tension = 0.45
    const cp1x = p1.x + ((p2.x - p0.x) / 6) * (1 / tension)
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * (1 / tension)
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * (1 / tension)
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * (1 / tension)

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }

  return d
}

export default function ScrollLightBeams({ containerRef }: ScrollLightBeamsProps) {
  const { personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || '#ae6bf6'

  const [splinePaths, setSplinePaths] = React.useState<{
    center: string
    left: string
    right: string
  }>({ center: '', left: '', right: '' })

  const [containerSize, setContainerSize] = React.useState({ width: 1400, height: 4000 })
  const [sparkPositions, setSparkPositions] = React.useState<{ x: number; y: number }[]>([])

  // Measure card thumbnail centers to build Trionn's global spline network
  const updateSplines = React.useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const contRect = container.getBoundingClientRect()
    const width = contRect.width
    const height = contRect.height
    setContainerSize({ width, height })

    // Origin: Query the exact 3D Artifact Core emission node
    const emitterEl = document.getElementById('artifact-core-emitter') || document.getElementById('singularity-origin')
    let originX = width / 2
    let originY = 0

    if (emitterEl) {
      const eRect = emitterEl.getBoundingClientRect()
      originX = eRect.left - contRect.left + eRect.width / 2
      originY = eRect.top - contRect.top + eRect.height / 2
    }

    const points: Point[] = [
      { x: originX, y: originY },
      // Direct vertical drop from the 3D crystal tip
      { x: originX, y: originY + 60 },
      // Fluid intermediate transition bridging hero to project catalogue
      { x: (originX + width / 2) / 2, y: originY * 0.3 },
      { x: width / 2, y: 50 },
    ]

    // Query all project card thumbnails
    const thumbs = Array.from(container.querySelectorAll<HTMLElement>('[data-project-thumb="true"]'))

    thumbs.forEach((thumb) => {
      const rect = thumb.getBoundingClientRect()
      const cx = rect.left - contRect.left + rect.width / 2
      const cy = rect.top - contRect.top + rect.height / 2
      points.push({ x: cx, y: cy })
    })

    // Destination: Contact CTA button
    const cta = document.getElementById('contact-cta-btn')
    if (cta) {
      const ctaRect = cta.getBoundingClientRect()
      const ctaX = ctaRect.left - contRect.left + ctaRect.width / 2
      const ctaY = ctaRect.top - contRect.top + ctaRect.height / 2
      points.push({ x: ctaX, y: ctaY })
    } else {
      points.push({ x: width / 2, y: height })
    }

    if (points.length >= 2) {
      setSplinePaths({
        center: getSmoothSplinePath(points, 0),
        left: getSmoothSplinePath(points, -28),
        right: getSmoothSplinePath(points, 28),
      })
      setSparkPositions(points)
    }
  }, [containerRef])

  React.useEffect(() => {
    updateSplines()

    const handleResize = () => {
      updateSplines()
    }

    window.addEventListener('resize', handleResize)
    // Small delay to let images and fonts settle layout bounds
    const timer = setTimeout(updateSplines, 600)
    const timer2 = setTimeout(updateSplines, 1800)

    const observer = new ResizeObserver(() => {
      updateSplines()
    })

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
      clearTimeout(timer2)
      observer.disconnect()
    }
  }, [containerRef, updateSplines])

  // Scroll animations linked to scroll position - active throughout the entire projects catalogue
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 95%', 'end 85%'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001,
  })

  // Stroke dashoffset for animated laser pulse along the splines
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-visible select-none"
    >
      <svg
        className="w-full h-full overflow-visible"
        viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Persona Gradient for Main Spline */}
          <linearGradient id="trionn-spline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={themeAccent} stopOpacity="0.2" />
            <stop offset="20%" stopColor={themeAccent} stopOpacity="0.9" />
            <stop offset="55%" stopColor={themeAccentLight} stopOpacity="1" />
            <stop offset="85%" stopColor={themeAccent} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="spline-laser-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ─── 1. Persistent Hairline Guide Splines (Trionn Structural Lines) ─── */}
        {splinePaths.left && (
          <path
            d={splinePaths.left}
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth="1.2"
            strokeDasharray="4 5"
            fill="none"
          />
        )}
        {splinePaths.right && (
          <path
            d={splinePaths.right}
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth="1.2"
            strokeDasharray="4 5"
            fill="none"
          />
        )}
        {splinePaths.center && (
          <path
            d={splinePaths.center}
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.5"
            fill="none"
          />
        )}

        {/* ─── 2. Traveling Glowing Laser Splines (Reacting to Scroll) ─── */}
        {splinePaths.center && (
          <>
            {/* Outer Soft Laser Glow */}
            <motion.path
              d={splinePaths.center}
              stroke={themeAccent}
              strokeWidth="5"
              strokeOpacity="0.4"
              fill="none"
              style={{
                pathLength,
              }}
              filter="url(#spline-laser-glow)"
            />

            {/* Core Intense Laser Ray */}
            <motion.path
              d={splinePaths.center}
              stroke="url(#trionn-spline-gradient)"
              strokeWidth="2.2"
              fill="none"
              style={{
                pathLength,
              }}
            />
          </>
        )}

        {/* Left & Right Accompanying Laser Strands */}
        {splinePaths.left && (
          <motion.path
            d={splinePaths.left}
            stroke={themeAccentLight}
            strokeWidth="1"
            strokeOpacity="0.5"
            fill="none"
            style={{
              pathLength,
            }}
          />
        )}
        {splinePaths.right && (
          <motion.path
            d={splinePaths.right}
            stroke={themeAccentLight}
            strokeWidth="1"
            strokeOpacity="0.5"
            fill="none"
            style={{
              pathLength,
            }}
          />
        )}

        {/* ─── 3. Singularity Core Emitter Energy Crown at 3D Model Crystal Tip ─── */}
        {sparkPositions.length > 0 && (
          <g transform={`translate(${sparkPositions[0].x}, ${sparkPositions[0].y})`}>
            <circle
              r="22"
              fill="none"
              stroke={themeAccentLight}
              strokeWidth="1.5"
              strokeOpacity="0.45"
              strokeDasharray="3 3"
            />
            <circle
              r="10"
              fill={themeAccent}
              fillOpacity="0.75"
              filter="url(#spline-laser-glow)"
            />
            <circle
              r="3.5"
              fill="#ffffff"
            />
          </g>
        )}

        {/* ─── 4. Target Node Spark Rings at Each Project Center ─── */}
        {sparkPositions.slice(1, -1).map((pt, i) => (
          <g key={i} transform={`translate(${pt.x}, ${pt.y})`}>
            {/* Outer halo */}
            <circle
              r="24"
              fill="none"
              stroke={themeAccent}
              strokeWidth="1"
              strokeOpacity="0.15"
              strokeDasharray="2 3"
            />
            {/* Inner pulse */}
            <circle
              r="6"
              fill={themeAccentLight}
              fillOpacity="0.4"
            />
            <circle
              r="2"
              fill="#ffffff"
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
