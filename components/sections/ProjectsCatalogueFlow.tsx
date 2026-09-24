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
