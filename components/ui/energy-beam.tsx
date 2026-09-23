'use client'

import React, { useEffect, useRef } from 'react'

interface UnicornStudioInstance {
  init: () => void
  destroy?: () => void
}

declare global {
  interface Window {
    UnicornStudio?: UnicornStudioInstance
  }
}

interface EnergyBeamProps {
  projectId?: string
  className?: string
  accentColor?: string
}

export const EnergyBeam: React.FC<EnergyBeamProps> = ({
  projectId = 'hRFfUymDGOHwtFe7evR2',
  className = '',
  accentColor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // If UnicornStudio is already on window, initialize immediately
    if (window.UnicornStudio) {
      try {
        window.UnicornStudio.init()
      } catch (err) {
        console.warn('[EnergyBeam] UnicornStudio init warning:', err)
      }
      return
    }

    // Check if script tag already exists in head
    const scriptSrc = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.2/dist/unicornStudio.umd.js'
    let script = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement | null

    const handleLoad = () => {
      if (window.UnicornStudio && containerRef.current) {
        try {
          window.UnicornStudio.init()
        } catch (err) {
          console.warn('[EnergyBeam] UnicornStudio init warning:', err)
        }
      }
    }

    if (!script) {
      script = document.createElement('script')
      script.src = scriptSrc
      script.async = true
      script.onload = handleLoad
      document.head.appendChild(script)
    } else {
      script.addEventListener('load', handleLoad)
    }

    return () => {
      if (script) {
        script.removeEventListener('load', handleLoad)
      }
    }
  }, [projectId])

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Unicorn Studio WebGL canvas container */}
      <div
        ref={containerRef}
        data-us-project={projectId}
        className="w-full h-full relative z-[1]"
      />

      {/* Theme Accent Atmospheric Glow / Tint Overlay */}
      {accentColor && (
        <div
          className="absolute inset-0 pointer-events-none z-[2] mix-blend-screen opacity-25 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${accentColor} 0%, transparent 70%)`,
          }}
        />
      )}
    </div>
  )
}

export default EnergyBeam
