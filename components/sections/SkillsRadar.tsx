'use client'

import { useMemo, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as d3 from 'd3'
import { SkillWithPersonas } from '@/types/skill'
import { usePersona } from '@/hooks/usePersona'

interface SkillsRadarProps {
  skills: SkillWithPersonas[]
}

interface RadarDataPoint {
  axis: string
  value: number
  skillsInAxis: string[]
}

const AXIS_MAPPING: Record<string, string[]> = {
  'Frontend': ['Frontend', 'Language'],
  'Backend & DB': ['Backend', 'Database'],
  'AI & Automation': ['AI & Automation'],
  'Cloud & DevOps': ['Cloud & DevOps'],
  'Design & Brand': ['Design'],
  'Tools & Strategy': ['Tools']
}

export default function SkillsRadar({ skills }: SkillsRadarProps) {
  const { activePersona, personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const containerRef = useRef<HTMLDivElement>(null)
  
  const [hoveredPoint, setHoveredPoint] = useState<RadarDataPoint | null>(null)
  const [windowWidth, setWindowWidth] = useState(0)

  // Listen to resize for responsiveness
  useEffect(() => {
    const getRadarSize = (width: number) => (width > 768 ? 420 : 280)
    
    setWindowWidth(getRadarSize(window.innerWidth))
    const handleResize = () => setWindowWidth(getRadarSize(window.innerWidth))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const size = windowWidth || 320
  const margin = 50
  const radius = (size - margin * 2) / 2
  const center = size / 2

  // Group and calculate values per axis for the active persona
  const radarData = useMemo<RadarDataPoint[]>(() => {
    const activeSkills = skills.filter((s) =>
      s.skill_personas.some((sp) => sp.persona_id === activePersona)
    )

    return Object.entries(AXIS_MAPPING).map(([axisName, categories]) => {
      // Find all skills matching the category for this axis
      const matchingSkills = activeSkills.filter((s) => categories.includes(s.category))
      
      // Calculate average proficiency, or default to 15 if no matching skills
      const val = matchingSkills.length > 0
        ? Math.round(d3.mean(matchingSkills, (s) => s.proficiency) || 15)
        : 15

      return {
        axis: axisName,
        value: val,
        skillsInAxis: matchingSkills.map((s) => s.name)
      }
    })
  }, [skills, activePersona])

  // Scales & D3 helper math
  const rScale = useMemo(() => {
    return d3.scaleLinear()
      .domain([0, 100])
      .range([0, radius])
  }, [radius])

  const angleSlice = (Math.PI * 2) / radarData.length

  // Calculate coordinates for the radar shape polygon
  const polygonPoints = useMemo(() => {
    return radarData.map((d, i) => {
      const r = rScale(d.value)
      const angle = i * angleSlice - Math.PI / 2 // offset by -90 deg to start top-center
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle),
        ...d
      }
    })
  }, [radarData, rScale, angleSlice, center])

  // Concentric circle grid levels
  const levels = [20, 40, 60, 80, 100]

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center p-6 rounded-2xl bg-bg-surface/10 backdrop-blur-glass border border-glass-border/20 shadow-glass w-full max-w-[480px] aspect-square mx-auto"
    >
      <h3 className="absolute top-4 left-6 font-display text-xs font-semibold uppercase tracking-wider text-text-muted">
        Tech Radar Visualization
      </h3>

      <svg width={size} height={size} className="overflow-visible select-none">
        <g>
          {/* Concentric grid circles */}
          {levels.map((level) => (
            <circle
              key={level}
              cx={center}
              cy={center}
              r={rScale(level)}
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          ))}

          {/* Level text labels (100% only to avoid clutter) */}
          <text
            x={center}
            y={center - rScale(100) - 6}
            className="text-[9px] font-mono fill-text-muted text-center"
            textAnchor="middle"
          >
            100%
          </text>

          {/* Axis radiating lines & labels */}
          {radarData.map((d, i) => {
            const angle = i * angleSlice - Math.PI / 2
            const lineX = center + rScale(100) * Math.cos(angle)
            const lineY = center + rScale(100) * Math.sin(angle)
            
            // Positioning labels slightly further out
            const labelDistance = radius + 22
            const labelX = center + labelDistance * Math.cos(angle)
            const labelY = center + labelDistance * Math.sin(angle)

            return (
              <g key={d.axis}>
                {/* Radiation line */}
                <line
                  x1={center}
                  y1={center}
                  x2={lineX}
                  y2={lineY}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1"
                />

                {/* Text Label */}
                <text
                  x={labelX}
                  y={labelY}
                  dy={angle === -Math.PI / 2 ? "-0.2em" : angle === Math.PI / 2 ? "0.8em" : "0.35em"}
                  textAnchor={Math.cos(angle) > 0.01 ? "start" : Math.cos(angle) < -0.01 ? "end" : "middle"}
                  className="text-[9px] font-display font-semibold fill-text-secondary uppercase tracking-widest"
                >
                  {d.axis}
                </text>
              </g>
            )
          })}

          {/* Radar area polygon */}
          {polygonPoints.length > 0 && (
            <g>
              {/* Pulsing glow line behind */}
              <path
                d={`M ${polygonPoints.map(p => `${p.x},${p.y}`).join(' L ')} Z`}
                fill={`${themeAccent}11`}
                stroke={themeAccent}
                strokeWidth="3"
                className="transition-all duration-700 ease-in-out filter blur-[2px] opacity-75"
              />
              <path
                d={`M ${polygonPoints.map(p => `${p.x},${p.y}`).join(' L ')} Z`}
                fill={`${themeAccent}22`}
                stroke={themeAccent}
                strokeWidth="1.5"
                className="transition-all duration-700 ease-in-out"
              />
            </g>
          )}

          {/* Interactive Radar vertex points */}
          {polygonPoints.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r="7"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => {
                  setHoveredPoint(p)
                }}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="4.5"
                fill="#ffffff"
                stroke={themeAccent}
                strokeWidth="2.5"
                className="pointer-events-none transition-all duration-700 ease-in-out shadow-neon-violet"
                style={{
                  filter: `drop-shadow(0 0 4px ${themeAccent})`
                }}
              />
            </g>
          ))}
        </g>
      </svg>

      {/* Glassmorphic Tooltip overlay */}
      <AnimatePresence>
        {hoveredPoint && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            className="absolute z-30 pointer-events-none p-3 rounded-xl bg-bg-surface/90 border border-glass-border shadow-glass w-48 text-left"
            style={{
              left: `${center - 96}px`,
              top: `${center - 60}px`,
            }}
          >
            <div className="text-[10px] font-display font-semibold uppercase tracking-wider text-text-muted">
              {hoveredPoint.axis}
            </div>
            <div 
              className="text-lg font-display font-bold mt-0.5"
              style={{ color: themeAccent }}
            >
              {hoveredPoint.value}% <span className="text-[10px] font-sans font-light text-text-secondary">avg</span>
            </div>
            {hoveredPoint.skillsInAxis.length > 0 ? (
              <div className="text-[9px] text-text-secondary mt-1.5 flex flex-wrap gap-1 leading-tight">
                {hoveredPoint.skillsInAxis.join(', ')}
              </div>
            ) : (
              <div className="text-[9px] text-text-muted mt-1">No active skills</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
