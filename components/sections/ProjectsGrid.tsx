'use client'

import * as React from 'react'
import { ProjectWithPersonas } from '@/types/project'
import ProjectCard from '@/components/cards/ProjectCard'

interface ProjectsGridProps {
  projects: ProjectWithPersonas[]
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="w-full relative z-10 flex flex-col">
      {/* Asymmetric Staggered Editorial Flow (Cloning Trionn UX) */}
      <div className="flex flex-col w-full">
        {projects.map((project, idx) => {
          const isEven = idx % 2 === 0
          
          return (
            <div
              key={project.id}
              className={`w-full transition-all duration-500 ${
                isEven
                  ? 'lg:w-[56%] mr-auto mb-16 lg:mb-32'
                  : 'lg:w-[48%] ml-auto mb-16 lg:mb-32 lg:-mt-24'
              }`}
            >
              <ProjectCard project={project} index={idx} />
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
