'use client'

import { motion } from 'framer-motion'

interface ProjectsFilterProps {
  categories: string[]
  selectedCategory: string
  onChangeCategory: (category: string) => void
  themeAccent: string
}

export default function ProjectsFilter({
  categories,
  selectedCategory,
  onChangeCategory,
  themeAccent,
}: ProjectsFilterProps) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mb-10 relative z-10">
      {categories.map((category) => {
        const isActive = category === selectedCategory
        
        return (
          <button
            key={category}
            onClick={() => onChangeCategory(category)}
            className="relative px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border border-glass-border bg-bg-surface/10 hover:bg-bg-surface/20 text-text-secondary hover:text-white transition-colors duration-250 cursor-pointer"
            style={{
              borderColor: isActive ? themeAccent : 'rgba(255, 255, 255, 0.10)',
            }}
          >
            {/* Background Active Pill */}
            {isActive && (
              <motion.span
                layoutId="activeFilterPill"
                className="absolute inset-0 rounded-full -z-10"
                style={{
                  backgroundColor: `${themeAccent}15`,
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            
            <span style={{ color: isActive ? themeAccent : 'inherit' }} className="transition-colors duration-300">
              {category}
            </span>
          </button>
        )
      })}
    </div>
  )
}
