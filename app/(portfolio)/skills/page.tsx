import { getSkills } from '@/lib/skill'
import SkillsCloud from '@/components/sections/SkillsCloud'
import SkillsRadar from '@/components/sections/SkillsRadar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skills & Tech Radar',
  description: 'Interactive mapping of Dimitri Tedom\'s technical skills and level of proficiency across frontend, backend, AI and cloud.',
}

export default async function SkillsPage() {
  const skills = await getSkills()

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header section */}
      <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-glass-border/30 bg-bg-surface/30 backdrop-blur-glass text-[10px] font-mono uppercase tracking-widest text-accent-light">
          Core Capabilities
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-none">
          Skills & <span className="text-gradient">Tech Radar</span>
        </h1>
        <p className="font-sans text-sm sm:text-base text-text-secondary max-w-2xl font-light leading-relaxed">
          Interactive mapping of my technical expertise. Toggle different personas using the switcher at the bottom-right of the screen to explore specific skill matrices and proficiencies.
        </p>
      </div>

      {/* Interactive visualizer grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Tech Radar Visualization */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <SkillsRadar skills={skills} />
        </div>

        {/* Right: Detailed Badges / Skills Cloud */}
        <div className="lg:col-span-7 w-full">
          <SkillsCloud skills={skills} />
        </div>

      </div>

    </div>
  )
}
