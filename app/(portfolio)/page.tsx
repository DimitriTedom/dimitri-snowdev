import HeroSection from '@/components/sections/HeroSection'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import TechStackSection from '@/components/sections/TechStackSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ContactStrip from '@/components/sections/ContactStrip'

export default function PortfolioHome() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <TechStackSection />
      <ExperienceSection />
      <ContactStrip />
    </>
  )
}
