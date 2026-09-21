import HeroSection from '@/components/sections/HeroSection'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import ServicesSection from '@/components/sections/ServicesSection'
import TechStackSection from '@/components/sections/TechStackSection'
import ExperienceSection from '@/components/sections/ExperienceSection'

export default function PortfolioHome() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <ServicesSection />
      <TechStackSection />
      <ExperienceSection />
    </>
  )
}
