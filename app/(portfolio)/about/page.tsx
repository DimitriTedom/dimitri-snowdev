import Image from 'next/image'
import { PROFILE } from '@/data/profile'
import { getExperiences } from '@/lib/experience'
import { getAchievements } from '@/lib/achievement'
import ExperienceTimeline from '@/components/sections/ExperienceTimeline'
import LearningJourney from '@/components/sections/LearningJourney'
import AchievementsSection from '@/components/sections/AchievementsSection'
import LocationWidget from '@/components/sections/LocationWidget'
import { Metadata } from 'next'
import { Sparkles, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about Dimitri Tedom, a Lead AI Engineer, Full Stack Developer, and Tech Entrepreneur.',
}

export default async function AboutPage() {
  const experiences = await getExperiences()
  const achievements = await getAchievements()

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16">
      
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-2/3 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header section */}
      <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-glass-border/30 bg-bg-surface/30 backdrop-blur-glass text-[10px] font-mono uppercase tracking-widest text-accent-light">
          Biography
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-none">
          ABOUT <span className="text-gradient">DIMITRI TEDOM</span>
        </h1>
        <p className="font-sans text-sm sm:text-base text-text-secondary max-w-2xl font-light leading-relaxed">
          Get to know the developer, architect and entrepreneur behind the projects.
        </p>
      </div>

      {/* Biography and Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Portrait & Biography */}
        <div className="lg:col-span-7 flex flex-col gap-6 p-8 rounded-2xl bg-bg-surface/10 backdrop-blur-glass border border-glass-border/30 shadow-glass">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar frame */}
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-glass-border/60 shrink-0">
              <Image
                src={PROFILE.avatar_url}
                alt={PROFILE.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Bio textual details */}
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="font-display font-bold text-xl uppercase tracking-tight text-white">
                  {PROFILE.name}
                </h2>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" title="Available for work" />
              </div>
              
              <span className="text-xs font-mono text-text-muted">
                {PROFILE.title}
              </span>
              
              <p className="text-xs text-text-secondary leading-relaxed font-light mt-2 whitespace-pre-line">
                {PROFILE.bio}
              </p>
            </div>
          </div>

          {/* Collateral traits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 border-t border-glass-border/10 pt-6">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-bg-surface/30 border border-glass-border/20">
              <Sparkles className="text-accent-light shrink-0" size={16} />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-text-muted uppercase">My Philosophy</span>
                <span className="text-[11px] text-text-secondary leading-normal font-light mt-0.5">
                  Balancing extreme visual excellence with solid, production-grade logic.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-bg-surface/30 border border-glass-border/20">
              <Heart className="text-accent-light shrink-0" size={16} />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-text-muted uppercase">Interests</span>
                <span className="text-[11px] text-text-secondary leading-normal font-light mt-0.5">
                  LLM orchestration, agentic AI systems, automated workflows, and UI animation.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Location & Quick Metrics */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <LocationWidget />
          
          {/* Quick Metrics grid */}
          <div className="grid grid-cols-2 gap-4 flex-grow">
            
            <div className="p-5 rounded-2xl bg-bg-surface/10 backdrop-blur-glass border border-glass-border/30 shadow-glass flex flex-col justify-center items-center text-center gap-1.5">
              <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted">Experience</span>
              <span className="font-display text-2xl font-bold text-white">
                {PROFILE.years_of_experience}+ Years
              </span>
              <span className="text-[9px] font-sans font-light text-text-secondary leading-none">
                Development & Teaching
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-bg-surface/10 backdrop-blur-glass border border-glass-border/30 shadow-glass flex flex-col justify-center items-center text-center gap-1.5">
              <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted">Status</span>
              <span className="font-display text-base font-semibold text-emerald-400 flex items-center gap-1.5">
                Active & Open
              </span>
              <span className="text-[9px] font-sans font-light text-text-secondary leading-none">
                For Freelance / Contracts
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Learning Journey horizontal progression timeline */}
      <div className="border-t border-glass-border/10 pt-8">
        <LearningJourney />
      </div>

      {/* Experience Timeline section (vertical scroll-driven layout) */}
      <div className="border-t border-glass-border/10 pt-8">
        <ExperienceTimeline experiences={experiences} />
      </div>

      {/* Achievements and Credentials Section (certification list with NumberTicker) */}
      <div className="border-t border-glass-border/10 pt-8">
        <AchievementsSection achievements={achievements} />
      </div>

    </div>
  )
}
