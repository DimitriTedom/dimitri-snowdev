'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePersona } from '@/hooks/usePersona'
import { PersonaId } from '@/types/persona'
import { Code2, Brain, Cloud, Layers, Zap, LucideIcon, Sparkles } from 'lucide-react'

const iconMap: Record<PersonaId, LucideIcon> = {
  fullstack: Code2,
  'ai-engineer': Brain,
  'cloud-architect': Cloud,
  'product-builder': Layers,
  entrepreneur: Zap,
}

export default function PersonaFloatingButton() {
  const { activePersona, personaConfig, setPersona, allPersonas } = usePersona()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const ActiveIcon = iconMap[activePersona] || Code2

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="mb-4 w-[310px] bg-bg-surface/95 dark:bg-bg-surface/90 backdrop-blur-glass-lg border border-glass-border p-4 rounded-2xl shadow-glass flex flex-col gap-2.5"
            style={{
              boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.5), 0 0 25px -10px ${themeAccent}66`,
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-glass-border/20 pb-2 px-1">
              <Sparkles size={14} style={{ color: themeAccent }} />
              <span className="text-xs font-display font-semibold uppercase tracking-wider text-text-primary">
                Switch Portfolio Persona
              </span>
            </div>

            {/* Persona List */}
            <div className="flex flex-col gap-1.5 max-h-[350px] overflow-y-auto pr-1">
              {allPersonas.map((p) => {
                const PersonaIcon = iconMap[p.id] || Code2
                const isActive = p.id === activePersona
                const pAccent = p.theme?.accent || '#5e17eb'

                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPersona(p.id)
                      setIsOpen(false)
                    }}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all duration-300 group"
                    style={{
                      backgroundColor: isActive ? `${pAccent}15` : 'transparent',
                      borderLeft: isActive ? `3px solid ${pAccent}` : '3px solid transparent',
                    }}
                  >
                    <div 
                      className="p-1.5 rounded-lg border transition-colors duration-300"
                      style={{
                        borderColor: isActive ? pAccent : 'rgba(255,255,255,0.08)',
                        backgroundColor: isActive ? `${pAccent}20` : 'rgba(255,255,255,0.02)',
                        color: isActive ? pAccent : '#d6d6d6',
                      }}
                    >
                      <PersonaIcon size={16} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex flex-col">
                      <span 
                        className="text-xs font-semibold tracking-tight text-text-primary transition-colors duration-300"
                        style={{ color: isActive ? pAccent : '#ffffff' }}
                      >
                        {p.label}
                      </span>
                      {p.description && (
                        <span className="text-[10px] text-text-muted mt-0.5 line-clamp-1">
                          {p.description}
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full flex items-center justify-center border border-glass-border bg-bg-surface/30 backdrop-blur-glass text-white shadow-lg cursor-pointer"
        style={{
          borderColor: themeAccent,
          boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.4), 0 0 20px -3px ${themeAccent}99`,
        }}
        aria-label="Switch persona"
      >
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex items-center justify-center"
        >
          <ActiveIcon size={24} style={{ color: themeAccent }} />
        </motion.div>
      </motion.button>

    </div>
  )
}
