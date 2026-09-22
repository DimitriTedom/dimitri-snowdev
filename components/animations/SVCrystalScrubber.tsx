'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

interface SVCrystalScrubberProps {
  accent: string
  accentLight: string
  /** Scroll progress from 0 (entry) to 1 (exit) */
  progress?: number
  /** Total number of frames in sequence (192 for 8s @ 24fps) */
  frameCount?: number
  className?: string
}

export default function SVCrystalScrubber({
  accent,
  accentLight: _accentLight,
  progress = 0,
  frameCount = 192,
  className = '',
}: SVCrystalScrubberProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const lastDrawnIndexRef = useRef<number>(-1)

  // Draw a specific frame to canvas
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  }, [])

  // Preload frames sequence
  useEffect(() => {
    let isCancelled = false

    // 1. Immediately load frame 1 for instant display
    const firstImg = new window.Image()
    firstImg.src = '/frames/sv/0001.webp'
    firstImg.onload = () => {
      if (isCancelled) return
      setFirstFrameLoaded(true)
      drawFrame(firstImg)
    }

    // 2. Preload all remaining frames into memory
    const loadedImages: HTMLImageElement[] = new Array(frameCount)
    loadedImages[0] = firstImg

    for (let i = 2; i <= frameCount; i++) {
      const img = new window.Image()
      const padded = String(i).padStart(4, '0')
      img.src = `/frames/sv/${padded}.webp`
      loadedImages[i - 1] = img
    }

    imagesRef.current = loadedImages

    return () => {
      isCancelled = true
    }
  }, [frameCount, drawFrame])

  // Scrub frame on scroll progress change
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const clampedProgress = Math.max(0, Math.min(1, progress))
    const targetIndex = Math.min(frameCount - 1, Math.floor(clampedProgress * (frameCount - 1)))

    if (targetIndex === lastDrawnIndexRef.current) return

    const img = imagesRef.current[targetIndex]
    if (img && img.complete && img.naturalWidth > 0) {
      drawFrame(img)
      lastDrawnIndexRef.current = targetIndex
    } else {
      // If target frame is still decoding, find the closest available loaded frame
      for (let offset = 1; offset < 10; offset++) {
        const prev = imagesRef.current[targetIndex - offset]
        if (prev && prev.complete && prev.naturalWidth > 0) {
          drawFrame(prev)
          lastDrawnIndexRef.current = targetIndex - offset
          break
        }
      }
    }
  }, [progress, frameCount, drawFrame])

  return (
    <div className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}>
      {/* Instant fallback layer before canvas draws */}
      {!firstFrameLoaded && (
        <img
          src="/frames/sv/0001.webp"
          alt="SV Crystal Background"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      )}

      {/* Primary 1080p full-bleed canvas */}
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Atmospheric Cinematic Vignette — blends 100% into #060618 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 35%, rgba(6,6,24,0.6) 75%, #060618 100%)',
        }}
      />

      {/* Persona Theme Accent Glow behind the crystal */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 blur-[120px]"
        style={{ background: accent }}
      />
    </div>
  )
}
