'use client'

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePersona } from '@/hooks/usePersona'

export interface IconCloudItem {
  id: string
  name: string
  category: string
  iconUrl?: string | null
  proficiency?: number
  accentColor?: string
}

interface InteractiveIconCloudProps {
  items: IconCloudItem[]
  radius?: number
  highlightedCategory?: string | null
  onSelectSkill?: (item: IconCloudItem) => void
}

interface SpherePoint {
  item: IconCloudItem
  x: number
  y: number
  z: number
  origX: number
  origY: number
  origZ: number
  scale: number
  alpha: number
}

export function InteractiveIconCloud({
  items,
  radius = 210,
  highlightedCategory = null,
  onSelectSkill,
}: InteractiveIconCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || '#ae6bf6'

  const [hoveredItem, setHoveredItem] = useState<IconCloudItem | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Rotation angles & velocities
  const rotationRef = useRef({
    rx: 0.002,
    ry: 0.003,
    angleX: 0,
    angleY: 0,
    dragLastX: 0,
    dragLastY: 0,
    velX: 0,
    velY: 0,
  })

  // Distribute items uniformly on a sphere using the Fibonacci lattice
  const initialPoints = useMemo<SpherePoint[]>(() => {
    const n = items.length
    if (n === 0) return []

    const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle in radians

    return items.map((item, i) => {
      const y = 1 - (i / Math.max(1, n - 1)) * 2 // y goes from 1 to -1
      const r = Math.sqrt(Math.max(0, 1 - y * y)) // radius at y
      const theta = phi * i // golden angle increment

      const x = Math.cos(theta) * r
      const z = Math.sin(theta) * r

      return {
        item,
        x: x * radius,
        y: y * radius,
        z: z * radius,
        origX: x * radius,
        origY: y * radius,
        origZ: z * radius,
        scale: 1,
        alpha: 1,
      }
    })
  }, [items, radius])

  const [points, setPoints] = useState<SpherePoint[]>(initialPoints)

  // Sync points when items change
  useEffect(() => {
    setPoints(initialPoints)
  }, [initialPoints])

  // Animation frame loop for 3D rotation
  useEffect(() => {
    let animId: number

    const tick = () => {
      const rot = rotationRef.current

      // Apply inertia damping when not dragging
      if (!isDragging) {
        rot.velX *= 0.94
        rot.velY *= 0.94
        // Base constant drift
        const dx = rot.velX + 0.003
        const dy = rot.velY + 0.002
        rot.angleX += dx
        rot.angleY += dy
      }

      const cosX = Math.cos(rot.angleX)
      const sinX = Math.sin(rot.angleX)
      const cosY = Math.cos(rot.angleY)
      const sinY = Math.sin(rot.angleY)

      setPoints(() =>
        initialPoints.map((pt) => {
          // Rotate around Y axis
          const x1 = pt.origX * cosY - pt.origZ * sinY
          const z1 = pt.origZ * cosY + pt.origX * sinY

          // Rotate around X axis
          const y2 = pt.origY * cosX - z1 * sinX
          const z2 = z1 * cosX + pt.origY * sinX

          // Perspective depth calculation
          const depth = radius * 2.5
          const cameraZ = radius * 1.8
          const scale = (depth + z2) / (depth + cameraZ)
          const alpha = Math.max(0.2, (z2 + radius) / (2 * radius))

          return {
            ...pt,
            x: x1,
            y: y2,
            z: z2,
            scale: Math.max(0.55, Math.min(1.25, scale)),
            alpha: Math.max(0.25, Math.min(1, alpha)),
          }
        })
      )

      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [initialPoints, isDragging, radius])

  // Pointer Drag Handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true)
    rotationRef.current.dragLastX = e.clientX
    rotationRef.current.dragLastY = e.clientY
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }, [])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - rotationRef.current.dragLastX
      const deltaY = e.clientY - rotationRef.current.dragLastY

      rotationRef.current.dragLastX = e.clientX
      rotationRef.current.dragLastY = e.clientY

      rotationRef.current.velX = deltaY * 0.005
      rotationRef.current.velY = -deltaX * 0.005

      rotationRef.current.angleX += rotationRef.current.velX
      rotationRef.current.angleY += rotationRef.current.velY
    },
    [isDragging]
  )

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false)
    try {
      ;(e.target as HTMLElement).releasePointerCapture?.(e.pointerId)
    } catch {
      // ignore
    }
  }, [])

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center select-none">
      {/* Ambient background glows */}
      <div
        className="absolute w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-20 -z-10 transition-colors duration-700"
        style={{ backgroundColor: themeAccent }}
      />
      <div
        className="absolute w-44 h-44 rounded-full blur-[60px] pointer-events-none opacity-25 -z-10 animate-pulse"
        style={{ backgroundColor: themeAccentLight }}
      />

      {/* Outer subtle orbital ring for depth */}
      <div
        className="absolute inset-4 rounded-full border border-dashed border-white/[0.06] pointer-events-none animate-[spin_60s_linear_infinite]"
        style={{ borderColor: `${themeAccent}20` }}
      />

      {/* 3D Sphere Interactive Stage */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-full cursor-grab active:cursor-grabbing touch-none flex items-center justify-center"
        style={{ perspective: '1000px' }}
      >
        {points.map((pt) => {
          const isCategoryMatch =
            !highlightedCategory || pt.item.category === highlightedCategory
          const isHovered = hoveredItem?.id === pt.item.id

          return (
            <div
              key={pt.item.id}
              className="absolute transition-transform duration-75 ease-out"
              style={{
                transform: `translate3d(${pt.x}px, ${pt.y}px, ${pt.z}px) scale(${
                  isHovered ? pt.scale * 1.35 : pt.scale
                })`,
                zIndex: Math.round((pt.z + radius) * 10) + (isHovered ? 5000 : 0),
                opacity: isCategoryMatch ? pt.alpha : pt.alpha * 0.25,
              }}
              onMouseEnter={() => setHoveredItem(pt.item)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => onSelectSkill?.(pt.item)}
            >
              <div
                className={`relative flex items-center justify-center p-3 rounded-2xl border backdrop-blur-md transition-all duration-300 ${
                  isHovered
                    ? 'border-white bg-white/20 shadow-2xl scale-110'
                    : isCategoryMatch
                    ? 'border-white/15 bg-[#0c0d12]/85 hover:border-white/40'
                    : 'border-white/5 bg-[#0c0d12]/40'
                }`}
                style={{
                  boxShadow: isHovered
                    ? `0 0 30px ${themeAccent}, 0 4px 20px rgba(0,0,0,0.8)`
                    : isCategoryMatch && pt.z > 0
                    ? `0 4px 20px -5px ${themeAccent}30`
                    : '0 4px 15px rgba(0,0,0,0.6)',
                }}
              >
                {/* Tech Icon */}
                {pt.item.iconUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={pt.item.iconUrl}
                    alt={pt.item.name}
                    className="w-7 h-7 object-contain pointer-events-none drop-shadow-md"
                    onError={(e) => {
                      ;(e.target as HTMLElement).style.display = 'none'
                    }}
                  />
                ) : (
                  <div
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: themeAccentLight }}
                  />
                )}

                {/* Micro aura dot */}
                {isHovered && (
                  <span
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping"
                    style={{ backgroundColor: themeAccentLight }}
                  />
                )}
              </div>
            </div>
          )
        })}

        {/* Floating Center Core Label on Hover */}
        <AnimatePresence>
          {hoveredItem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute pointer-events-none z-50 flex flex-col items-center justify-center p-4 rounded-2xl bg-black/90 border border-white/20 backdrop-blur-xl shadow-2xl"
              style={{
                borderColor: `${themeAccent}80`,
                boxShadow: `0 0 30px -5px ${themeAccent}60, 0 8px 32px rgba(0,0,0,0.9)`,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                {hoveredItem.iconUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={hoveredItem.iconUrl}
                    alt={hoveredItem.name}
                    className="w-4 h-4 object-contain"
                  />
                )}
                <span className="font-display font-bold text-sm text-white uppercase tracking-wider">
                  {hoveredItem.name}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono text-white/60">
                <span>{hoveredItem.category}</span>
                {hoveredItem.proficiency && (
                  <>
                    <span>•</span>
                    <span style={{ color: themeAccentLight }}>
                      {hoveredItem.proficiency}% Mastery
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Drag Hint Footer */}
      <div className="absolute bottom-2 text-center pointer-events-none">
        <p className="text-[10px] font-mono uppercase tracking-widest text-white/30">
          Drag to spin • Hover to inspect
        </p>
      </div>
    </div>
  )
}
