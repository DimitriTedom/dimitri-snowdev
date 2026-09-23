import { Metadata } from 'next'
import { getProjectsByPersona } from '@/lib/project'
import { isValidPersona, getServerPersona } from '@/lib/persona'
import { PersonaId } from '@/types/persona'
import { PERSONAS } from '@/data/personas'
import ProjectsHeroAeruk from '@/components/sections/ProjectsHeroAeruk'
import ProjectsCatalogueFlow from '@/components/sections/ProjectsCatalogueFlow'
import ProjectsCTA from '@/components/sections/ProjectsCTA'

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

  const personaConfig = PERSONAS.find((p) => p.id === personaId) || PERSONAS[0]
  const personaLabel = personaConfig.label

  return {
    title: `${personaLabel} Projects | Dimitri Tedom (SnowDev)`,
    description: `Explore the creative engineering, architectural solutions, and cutting-edge software built for the ${personaLabel} persona by Dimitri Tedom.`,
    openGraph: {
      title: `${personaLabel} Projects — Dimitri Tedom`,
      description: `Explore the creative engineering, architectural solutions, and cutting-edge software built for the ${personaLabel} persona by Dimitri Tedom.`,
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

  return (
    <div className="relative min-h-screen w-full bg-black text-white flex flex-col items-center overflow-x-hidden selection:bg-white selection:text-black">
      {/* 1. Aeruk Style Hero with 21st.dev Energy Beam */}
      <ProjectsHeroAeruk />

      {/* 2. Scroll-Reactive Light Beams & Asymmetric Trionn Editorial Projects Flow */}
      <ProjectsCatalogueFlow projects={projects} />

      {/* 3. Agency-Grade Contact CTA */}
      <ProjectsCTA />
    </div>
  )
}
