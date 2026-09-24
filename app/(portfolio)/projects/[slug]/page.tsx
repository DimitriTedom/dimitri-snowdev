import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getAdjacentProjects } from '@/lib/project'
import { isValidPersona, getServerPersona } from '@/lib/persona'
import { PersonaId } from '@/types/persona'
import { PERSONAS } from '@/data/personas'
import { PROJECTS } from '@/data/projects'
import ProjectDetailHeroAeruk from '@/components/sections/ProjectDetailHeroAeruk'
import ProjectDetailTrionnContent from '@/components/sections/ProjectDetailTrionnContent'
import ProjectDetailNextProjectBanner from '@/components/sections/ProjectDetailNextProjectBanner'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) {
    return {
      title: 'Project Not Found | Dimitri Tedom',
    }
  }

  return {
    title: `${project.title} | Case Study | Dimitri Tedom (SnowDev)`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Case Study by Dimitri Tedom`,
      description: project.description,
      images: [project.image_url],
    },
  }
}

export default async function ProjectDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const resolvedParams = await searchParams
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  // Determine active persona context to align accents
  const pParam = resolvedParams.persona
  let personaId: PersonaId = 'fullstack'
  if (typeof pParam === 'string' && isValidPersona(pParam)) {
    personaId = pParam
  } else {
    personaId = await getServerPersona()
  }

  const personaConfig = PERSONAS.find((p) => p.id === personaId) || PERSONAS[0]
  const themeAccent = personaConfig.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig.theme?.accentLight || '#ae6bf6'

  // Fetch adjacent projects for Trionn pagination and bottom next banner
  const { prevProject, nextProject } = await getAdjacentProjects(slug, personaId)

  return (
    <div className="relative min-h-screen w-full bg-[#040508] overflow-x-clip">
      {/* 1. Aeruk Style Hero: 3D Device Mockup stage with centered monumental title (no back button, no tech tags) */}
      <ProjectDetailHeroAeruk
        project={project}
        themeAccent={themeAccent}
        themeAccentLight={themeAccentLight}
      />

      {/* 2. Trionn Case Study Layout: Sticky left metadata & 4 interactive tabs + right visual stream */}
      <ProjectDetailTrionnContent
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
        personaId={personaId}
        themeAccent={themeAccent}
        themeAccentLight={themeAccentLight}
      />

      {/* 3. Trionn Bottom Next Project Teaser Banner */}
      <ProjectDetailNextProjectBanner
        nextProject={nextProject}
        personaId={personaId}
        themeAccent={themeAccent}
        themeAccentLight={themeAccentLight}
      />
    </div>
  )
}
