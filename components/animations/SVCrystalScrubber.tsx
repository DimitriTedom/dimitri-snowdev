'use client'

import { useRef, useEffect, useState } from 'react'

interface SVCrystalScrubberProps {
  accent: string
  accentLight: string
  /** Scroll progress from 0 (entry) to 1 (exit) */
  progress?: number
  /** Total number of frames in sequence (default: 180 for 6s @ 30fps) */
  frameCount?: number
}

// Fallback / CSS Crystal (active until Flow video frames are dropped in /public/frames/sv/)
export function SVCrystalPlaceholder({
  accent,
  accentLight,
}: {
  accent: string
  accentLight: string
}) {
  return (
    <div className="relative flex items-center justify-center select-none pointer-events-none will-change-transform">
      <div
        className="relative w-[190px] h-[228px] md:w-[252px] md:h-[302px]"
        style={{
          clipPath:
            'polygon(50% 0%,88% 14%,100% 52%,84% 88%,50% 100%,16% 88%,0% 52%,12% 14%)',
          background: `linear-gradient(148deg,rgba(13,16,41,0.96) 0%,rgba(6,6,24,0.98) 62%,${accent}16 100%)`,
          boxShadow: `0 0 80px -20px ${accent}55,inset 0 0 40px -12px ${accent}18`,
          border: `1px solid ${accent}28`,
        }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 252 302" fill="none">
          <line x1="126" y1="0" x2="126" y2="302" stroke={accent} strokeWidth="0.5" opacity="0.18" />
          <line x1="0" y1="151" x2="252" y2="151" stroke={accent} strokeWidth="0.5" opacity="0.18" />
          <line x1="30" y1="42" x2="222" y2="260" stroke={accent} strokeWidth="0.4" opacity="0.1" />
          <line x1="222" y1="42" x2="30" y2="260" stroke={accent} strokeWidth="0.4" opacity="0.1" />
          <path
            d="M 55 75 L 55 95 L 75 95 L 75 115 L 95 115"
            stroke={accentLight}
            strokeWidth="0.9"
            opacity="0.28"
            fill="none"
          />
          <path
            d="M 197 75 L 197 95 L 177 95 L 177 128"
            stroke={accentLight}
            strokeWidth="0.9"
            opacity="0.28"
            fill="none"
          />
          <path
            d="M 55 218 L 75 218 L 75 198 L 108 198 L 108 178"
            stroke={accentLight}
            strokeWidth="0.9"
            opacity="0.22"
            fill="none"
          />
          <path
            d="M 197 228 L 177 228 L 177 208 L 157 208"
            stroke={accentLight}
            strokeWidth="0.9"
            opacity="0.22"
            fill="none"
          />
          <circle cx="55" cy="75" r="2.5" fill={accentLight} opacity="0.4" />
          <circle cx="197" cy="75" r="2.5" fill={accentLight} opacity="0.4" />
          <circle cx="55" cy="228" r="2.5" fill={accentLight} opacity="0.3" />
          <circle cx="197" cy="228" r="2.5" fill={accentLight} opacity="0.3" />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display font-black text-5xl md:text-6xl"
            style={{
              background: `radial-gradient(circle at 40% 40%,${accentLight} 0%,${accent} 55%,transparent 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: `drop-shadow(0 0 18px ${accent}cc)`,
              letterSpacing: '-0.04em',
            }}
          >
            SV
          </span>
        </div>

        <div
          className="absolute inset-0 animate-[svPulse_3.5s_ease-in-out_infinite]"
          style={{ background: `radial-gradient(circle at 50% 50%,${accent}38 0%,transparent 62%)` }}
        />
      </div>

      <div
        className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full opacity-8 blur-3xl"
        style={{ background: accent }}
      />
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="text-[9px] font-mono uppercase tracking-[0.42em] text-white/32">
          Our Services
        </span>
      </div>
    </div>
  )
}

export default function SVCrystalScrubber({
  accent,
  accentLight,
  progress = 0,
  frameCount = 180,
}: SVCrystalScrubberProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [framesLoaded, setFramesLoaded] = useState(false)
  const imagesRef = useRef<HTMLImageElement[]>([])

  // Attempt to preload frames if available in /frames/sv/
  useEffect(() => {
    let isCancelled = false
    const testImg = new Image()
    testImg.src = '/frames/sv/0001.webp'

    testImg.onload = () => {
      if (isCancelled) return
      // First frame exists — preload sequence
      const loadedImages: HTMLImageElement[] = []
      let loadedCount = 0

      for (let i = 1; i <= frameCount; i++) {
        const img = new Image()
        const padded = String(i).padStart(4, '0')
        img.src = `/frames/sv/${padded}.webp`
        img.onload = () => {
          loadedCount++
          if (loadedCount >= Math.min(30, frameCount)) {
            setFramesLoaded(true)
          }
        }
        loadedImages.push(img)
      }
      imagesRef.current = loadedImages
    }

    testImg.onerror = () => {
      // Frames not yet generated — keep framesLoaded as false (renders CSS placeholder)
      setFramesLoaded(false)
    }

    return () => {
      isCancelled = true
    }
  }, [frameCount])

  // Draw current frame on canvas when progress or frames change
  useEffect(() => {
    if (!framesLoaded || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const clampedProgress = Math.max(0, Math.min(1, progress))
    const frameIndex = Math.floor(clampedProgress * (frameCount - 1))
    const img = imagesRef.current[frameIndex]

    if (img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
  }, [progress, framesLoaded, frameCount])

  if (!framesLoaded) {
    return <SVCrystalPlaceholder accent={accent} accentLight={accentLight} />
  }

  return (
    <div className="relative flex items-center justify-center select-none pointer-events-none will-change-transform">
      <canvas
        ref={canvasRef}
        width={512}
        height={614}
        className="w-[190px] h-[228px] md:w-[252px] md:h-[302px] object-contain"
        style={{
          filter: `drop-shadow(0 0 40px ${accent}40)`,
        }}
      />
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="text-[9px] font-mono uppercase tracking-[0.42em] text-white/32">
          Our Services
        </span>
      </div>
    </div>
  )
}
