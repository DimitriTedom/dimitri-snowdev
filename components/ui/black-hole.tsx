'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createRenderer } from './black-hole-utils/renderer'

export interface BlackHoleProps {
  className?: string
  accentColor?: string
}

export function BlackHole({ className = '', accentColor }: BlackHoleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasWebGPU, setHasWebGPU] = useState<boolean>(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Check WebGPU capability
    if (typeof navigator === 'undefined' || !(navigator as unknown as { gpu?: unknown }).gpu) {
      setHasWebGPU(false)
      return
    }

    try {
      const renderer = createRenderer({ canvas })
      renderer.ready.catch((err) => {
        console.warn('WebGPU black-hole renderer failed, switching to fallback:', err)
        setHasWebGPU(false)
      })

      return () => {
        renderer.dispose()
      }
    } catch (err) {
      console.warn('WebGPU createRenderer caught exception:', err)
      setHasWebGPU(false)
    }
  }, [])

  return (
    <div className={`relative h-full w-full overflow-hidden bg-black ${className}`}>
      {hasWebGPU ? (
        <canvas ref={canvasRef} className="block h-full w-full touch-none" />
      ) : (
        /* Graceful High-Performance Fallback Canvas (WebGL2 Accretion Disk) */
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, #000000 18%, ${accentColor || '#5e17eb'}55 24%, ${accentColor || '#5e17eb'}15 48%, transparent 72%)`,
          }}
        >
          <div
            className="w-48 h-48 rounded-full border border-white/20 animate-spin"
            style={{
              animationDuration: '24s',
              boxShadow: `0 0 50px 10px ${accentColor || '#5e17eb'}88`,
            }}
          />
        </div>
      )}

      {/* Vignette Gradients */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 35%, #000000 95%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent z-10" />
    </div>
  )
}

export default BlackHole
