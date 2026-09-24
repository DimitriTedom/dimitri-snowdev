'use client'

import * as React from 'react'
import { ProjectWithPersonas } from '@/types/project'
import ProjectCard from '@/components/cards/ProjectCard'

interface ProjectsGridProps {
  projects: ProjectWithPersonas[]
  revealedIndices?: number[]
}

const TRIONN_RHYTHMS = [
  'lg:w-[48%] lg:ml-[2%] lg:mr-auto mb-20 lg:mb-36', // Card 1: Left prominent
  'lg:w-[42%] lg:mr-[3%] lg:ml-auto mb-20 lg:mb-36 lg:-mt-24', // Card 2: Right medium with interlocking negative margin
  'lg:w-[46%] lg:ml-[4%] lg:mr-auto mb-20 lg:mb-36', // Card 3: Left wide
  'lg:w-[52%] lg:mx-auto mb-20 lg:mb-40', // Card 4: Center cinematic wide
  'lg:w-[44%] lg:mr-[2%] lg:ml-auto mb-20 lg:mb-36', // Card 5: Right medium
  'lg:w-[40%] lg:ml-[5%] lg:mr-auto mb-20 lg:mb-36 lg:-mt-20', // Card 6: Left accent
  'lg:w-[50%] lg:mx-auto mb-20 lg:mb-40', // Card 7: Center wide
  'lg:w-[38%] lg:mr-[4%] lg:ml-auto mb-20 lg:mb-36', // Card 8: Right narrow accent
]

export default function ProjectsGrid({ projects, revealedIndices = [] }: ProjectsGridProps) {
  return (
    <div className="w-full relative z-10 flex flex-col">
      {/* Asymmetric Staggered Editorial Flow (Exact Trionn Rhythm) */}
      <div className="flex flex-col w-full">
        {projects.map((project, idx) => {
          const rhythmClass = TRIONN_RHYTHMS[idx % TRIONN_RHYTHMS.length]
          const isRevealed = revealedIndices.includes(idx)

          return (
            <div
              key={project.id}
              className={`w-full transition-all duration-500 ${rhythmClass}`}
            >
              <ProjectCard project={project} index={idx} isRevealed={isRevealed} />
            </div>
          )
        })}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-24 text-text-muted font-mono text-sm tracking-widest uppercase">
          No projects found for this persona.
        </div>
      )}
    </div>
  )
}
