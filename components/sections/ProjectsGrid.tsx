'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectWithPersonas } from '@/types/project'
import { usePersona } from '@/hooks/usePersona'
import ProjectCard from '@/components/cards/ProjectCard'
import ProjectsFilter from './ProjectsFilter'
import { BlurFade } from '@/components/ui/blur-fade'

interface ProjectsGridProps {
  projects: ProjectWithPersonas[]
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const { personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Extract categories dynamically from the projects mapped to the active persona
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category))
    return ['All', ...Array.from(cats)]
  }, [projects])

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects
    return projects.filter((p) => p.category === selectedCategory)
  }, [projects, selectedCategory])

  return (
    <div className="w-full flex flex-col items-center">
      {/* Category Filter buttons */}
      {categories.length > 2 && (
        <ProjectsFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onChangeCategory={setSelectedCategory}
          themeAccent={themeAccent}
        />
      )}

      {/* Grid container */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 w-full z-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <BlurFade delay={0.03 * idx} inView>
                <ProjectCard project={project} />
              </BlurFade>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-text-muted">
          No projects found in this category.
        </div>
      )}
    </div>
  )
}
