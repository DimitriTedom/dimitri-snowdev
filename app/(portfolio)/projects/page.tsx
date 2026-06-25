import { Metadata } from 'next'
import { getProjectsByPersona } from '@/lib/project'
import { isValidPersona, getServerPersona } from '@/lib/persona'
import { PersonaId } from '@/types/persona'
import { PERSONAS } from '@/data/personas'
import ProjectsGrid from '@/components/sections/ProjectsGrid'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await searchParams
  const pParam = resolvedParams.persona
  
  let personaId: PersonaId = 'fullstack'
  if (typeof pParam === 'string' && isValidPersona(pParam)) {
    personaId = pParam
  } else {
    personaId = await getServerPersona()
  }

  const personaConfig = PERSONAS.find(p => p.id === personaId) || PERSONAS[0]
  const personaLabel = personaConfig.label

  return {
    title: `${personaLabel} Projects | Dimitri Tedom (SnowDev)`,
    description: `Browse ${personaLabel} projects, case studies, and engineering achievements by Dimitri Tedom.`,
    openGraph: {
      title: `${personaLabel} Projects — Dimitri Tedom`,
      description: `Browse ${personaLabel} projects, case studies, and engineering achievements by Dimitri Tedom.`,
      images: ['/opengraph.png'],
    },
  }
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams
  const pParam = resolvedParams.persona

  let personaId: PersonaId = 'fullstack'
  if (typeof pParam === 'string' && isValidPersona(pParam)) {
    personaId = pParam
  } else {
    personaId = await getServerPersona()
  }

  const projects = await getProjectsByPersona(personaId)
  const personaConfig = PERSONAS.find(p => p.id === personaId) || PERSONAS[0]
  const themeAccent = personaConfig.theme?.accent || '#5e17eb'

  return (
    <div className="relative min-h-screen w-full overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background Radial Glow */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[150px] opacity-10 transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle, ${themeAccent} 0%, transparent 70%)`
        }}
      />

      <div className="container mx-auto max-w-[1400px] pt-10 pb-20 relative z-10 flex flex-col items-center">
        {/* Page Header */}
        <div className="text-center max-w-2xl mb-16 flex flex-col items-center">
          <span 
            className="text-[10px] font-mono tracking-[0.2em] uppercase mb-3 transition-colors duration-1000"
            style={{ color: themeAccent }}
          >
            Showcase
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white mb-6">
            Projects Catalogue
          </h1>
          <p className="text-text-secondary text-base leading-relaxed font-sans max-w-xl">
            A curated selection of technical solutions, architectures, and design works built for the <span className="text-white font-semibold">{personaConfig.label}</span> persona.
          </p>
        </div>

        {/* Dynamic Client Grid */}
        <ProjectsGrid projects={projects} />
      </div>
    </div>
  )
}
