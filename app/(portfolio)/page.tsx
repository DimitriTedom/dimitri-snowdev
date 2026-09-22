import HeroSection from '@/components/sections/HeroSection'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import ServicesSection from '@/components/sections/ServicesSection'
import TechStackSection from '@/components/sections/TechStackSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import SectionTransition from '@/components/layout/SectionTransition'

export default function PortfolioHome() {
  return (
    <>
      {/* Hero — no wrapper, crystal animation IS the T1 transition into Services */}
      <HeroSection />

      {/* Services — crystal descends naturally from hero bottom edge */}
      <ServicesSection />

      {/* Featured Projects — horizontal pinned scroll (Trionn style) */}
      <FeaturedProjects />

      {/* T3: Projects → TechStack — scale-blur reveal */}
      <SectionTransition type="scale-blur">
        <TechStackSection />
      </SectionTransition>

      {/* T4: TechStack → Experience/Contact — curtain drop */}
      <SectionTransition type="curtain-drop">
        <ExperienceSection />
      </SectionTransition>
    </>
  )
}

