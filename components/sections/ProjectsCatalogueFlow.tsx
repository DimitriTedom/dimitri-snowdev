'use client'

import * as React from 'react'
import { ProjectWithPersonas } from '@/types/project'
import ScrollLightBeams from '@/components/effects/ScrollLightBeams'
import ProjectsGrid from '@/components/sections/ProjectsGrid'

interface ProjectsCatalogueFlowProps {
  projects: ProjectWithPersonas[]
}

export default function ProjectsCatalogueFlow({ projects }: ProjectsCatalogueFlowProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [revealedIndices, setRevealedIndices] = React.useState<number[]>([])

  const handleRevealProject = React.useCallback((index: number) => {
    setRevealedIndices((prev) => {
      if (prev.includes(index)) return prev
      return [...prev, index]
    })
  }, [])

  // Pre-reveal projects that are already scrolled past on initial mount / reload
  React.useEffect(() => {
    const handleInitialScroll = () => {
      if (typeof window === 'undefined') return
      const currentScroll = window.scrollY
      if (currentScroll < 100) return

      const thumbs = Array.from(document.querySelectorAll<HTMLElement>('[data-project-thumb="true"]'))
      const toReveal: number[] = []
      thumbs.forEach((thumb, idx) => {
        const top = thumb.getBoundingClientRect().top + window.scrollY
        if (top < currentScroll + window.innerHeight * 0.5) {
          toReveal.push(idx)
        }
      })
      if (toReveal.length > 0) {
        setRevealedIndices((prev) => Array.from(new Set([...prev, ...toReveal])))
      }
    }

    const t = setTimeout(handleInitialScroll, 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 overflow-visible z-[3]">
      {/* Scroll-Reactive Light Beams Stream Down From The Singularity */}
      <ScrollLightBeams
        containerRef={containerRef}
        revealedIndices={revealedIndices}
        onRevealProject={handleRevealProject}
      />

      {/* Asymmetric Staggered Projects Editorial List */}
      <ProjectsGrid
        projects={projects}
        revealedIndices={revealedIndices}
      />
    </div>
  )
}
