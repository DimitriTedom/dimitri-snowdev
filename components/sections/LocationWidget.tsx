'use client'

import { useState, useEffect } from 'react'
import { MapPin, Clock, Compass } from 'lucide-react'
import { usePersona } from '@/hooks/usePersona'

export default function LocationWidget() {
  const { personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      // Yaounde is GMT+1 (Africa/Douala)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Douala',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }
      setTime(new Date().toLocaleTimeString('en-US', options))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full p-6 rounded-2xl bg-bg-surface/20 backdrop-blur-glass border border-glass-border/40 hover:border-glass-border transition-all duration-300 shadow-glass flex flex-col gap-6 relative group overflow-hidden">
      {/* Grid Pattern Background overlay */}
      <div 
        className="absolute inset-0 opacity-5 -z-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />
      
      {/* Hover glow */}
      <div 
        className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 blur-[8px]"
        style={{ backgroundColor: themeAccent }}
      />

      <div className="flex items-center justify-between border-b border-glass-border/10 pb-3">
        <h4 className="font-display text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
          <Compass size={14} style={{ color: themeAccent }} />
          Geo-Location Hub
        </h4>
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-accent-light bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">
          Yaoundé, CM
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {/* Radar Map Graphic */}
        <div className="relative h-28 w-full rounded-xl bg-black/45 border border-glass-border/20 overflow-hidden flex items-center justify-center">
          
          {/* Concentric Radar Rings */}
          <div className="absolute w-24 h-24 rounded-full border border-glass-border/10 animate-pulse" />
          <div 
            className="absolute w-16 h-16 rounded-full border opacity-50"
            style={{ borderColor: `${themeAccent}33` }}
          />
          <div className="absolute w-8 h-8 rounded-full border border-glass-border/5" />
          
          {/* Coordinate grid crosshair */}
          <div className="absolute left-0 right-0 h-px bg-glass-border/10" />
          <div className="absolute top-0 bottom-0 w-px bg-glass-border/10" />

          {/* Pulse Node over target */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span className="absolute inline-flex h-4 w-4 rounded-full opacity-75 animate-ping" style={{ backgroundColor: themeAccent }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 shadow-neon-violet" style={{ backgroundColor: themeAccent }} />
          </div>

          <span className="absolute bottom-2 right-3 text-[8px] font-mono text-text-muted">
            SCALE: 1:250,000
          </span>
          <span className="absolute top-2 left-3 text-[8px] font-mono text-text-muted">
            SYS: ACTIVE
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-text-muted uppercase flex items-center gap-1">
              <MapPin size={10} style={{ color: themeAccent }} /> Coordinates
            </span>
            <span className="text-xs font-mono font-bold text-text-primary">
              3.8480° N, 11.5021° E
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-text-muted uppercase flex items-center gap-1">
              <Clock size={10} style={{ color: themeAccent }} /> Local Time (GMT+1)
            </span>
            <span className="text-xs font-mono font-bold text-text-primary">
              {time || '00:00:00'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
