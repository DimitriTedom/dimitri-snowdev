import { getExperiences } from '@/lib/experience'
import { getAchievements } from '@/lib/achievement'
import ExperienceTimeline from '@/components/sections/ExperienceTimeline'
import AchievementsSection from '@/components/sections/AchievementsSection'
import AboutHeroSection from '@/components/sections/about/AboutHeroSection'
import AboutStorySection from '@/components/sections/about/AboutStorySection'
import AboutCTASection from '@/components/sections/about/AboutCTASection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about Dimitri Tedom, a Lead AI Engineer, Full Stack Developer, and Tech Entrepreneur.',
}

export default async function AboutPage() {
  const experiences = await getExperiences()
  const achievements = await getAchievements()

  return (
    <div className="relative w-full flex flex-col">

      {/* ── 1. Immersive About Hero with 3D model & cursor tracking ── */}
      <AboutHeroSection />

      {/* ── 2. Aeruk-inspired Story & Origins section (Hello ! Je suis Dimitri... + SnowDev origin) ── */}
      <AboutStorySection />

      {/* ── 3. Professional Experience & Timeline ── */}
      <div className="relative w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-16 border-t border-white/10">
        <ExperienceTimeline experiences={experiences} />
      </div>

      {/* ── 4. Certifications & Milestones Section ── */}
      <div className="relative w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-16 border-t border-white/10">
        <AchievementsSection achievements={achievements} />
      </div>

      {/* ── 5. Aeruk-style CTA Section ("Prêt à donner vie à votre projet ?") with glass video ── */}
      <AboutCTASection />

    </div>
  )
}
