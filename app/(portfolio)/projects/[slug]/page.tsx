import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjectBySlug } from '@/lib/project'
import { isValidPersona, getServerPersona } from '@/lib/persona'
import { PersonaId } from '@/types/persona'
import { PERSONAS } from '@/data/personas'
import { PROJECTS } from '@/data/projects'
import { BlurFade } from '@/components/ui/blur-fade'
import { ArrowLeft, ExternalLink, Github, Calendar, Target, Award, Sparkles } from 'lucide-react'

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
    title: `${project.title} | Case Study | Dimitri Tedom`,
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

  const personaConfig = PERSONAS.find(p => p.id === personaId) || PERSONAS[0]
  const themeAccent = personaConfig.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig.theme?.accentLight || '#ae6bf6'

  // Extract gallery images and filter duplicates
  const gallery = [project.image_url, project.image_url_2, project.image_url_3]
    .filter((url): url is string => typeof url === 'string')
    .filter((url, idx, self) => self.indexOf(url) === idx)

  return (
    <div className="relative min-h-screen w-full overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div 
        className="pointer-events-none absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full filter blur-[150px] opacity-10 transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle, ${themeAccent} 0%, transparent 70%)`
        }}
      />
      
      <div className="container mx-auto max-w-[1100px] pt-6 pb-24 relative z-10">
        
        {/* Navigation & Header */}
        <BlurFade delay={0.05} inView>
          <div className="mb-8">
            <Link 
              href={`/projects?persona=${personaId}`} 
              className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors duration-250 group font-mono text-xs uppercase tracking-wider"
            >
              <ArrowLeft size={14} className="transition-transform duration-250 group-hover:-translate-x-1" />
              Back to Catalogue
            </Link>
          </div>
        </BlurFade>

        {/* Title and Intro */}
        <BlurFade delay={0.1} inView>
          <div className="flex flex-col gap-4 mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#1D1D1D] text-[#D6D6D6] rounded-[5px] px-3 py-1 text-xs font-semibold uppercase tracking-wider border border-glass-border/30">
                {project.category}
              </span>
              <span className="text-text-muted text-xs font-mono flex items-center gap-1.5">
                <Calendar size={12} />
                {project.date}
              </span>
            </div>
            
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight">
              {project.title}
            </h1>

            <p className="text-text-secondary text-base sm:text-lg leading-relaxed font-sans max-w-3xl">
              {project.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-4">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-xs uppercase font-bold tracking-wider text-white shadow-neon-violet flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all duration-250 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${themeAccent} 0%, ${themeAccentLight} 100%)`,
                  }}
                >
                  <ExternalLink size={14} />
                  Live Preview
                </a>
              )}
              {project.code_url && (
                <a
                  href={project.code_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-xs uppercase font-bold tracking-wider text-white bg-bg-surface/30 hover:bg-bg-surface/50 border border-glass-border shadow-glass flex items-center gap-2 active:scale-95 transition-all duration-250 cursor-pointer"
                >
                  <Github size={14} />
                  Source Code
                </a>
              )}
            </div>
          </div>
        </BlurFade>

        {/* Hero Image / Video */}
        <BlurFade delay={0.15} inView>
          <div 
            className="relative aspect-[16/9] w-full overflow-hidden border border-glass-border bg-bg-surface/30 shadow-glass rounded-card mb-16"
            style={{
              boxShadow: `0 20px 50px -20px ${themeAccent}33`
            }}
          >
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              sizes="(max-width: 1200px) 100vw, 1100px"
              className="object-cover"
              priority
            />
          </div>
        </BlurFade>

        {/* Case Study Core Grid (Challenge, Solution, Result) */}
        <div className="grid grid-cols-1 gap-12 mb-16">
          
          {/* Challenge Section */}
          <BlurFade delay={0.2} inView>
            <div className="bg-bg-surface/10 rounded-card border border-glass-border/40 p-6 sm:p-8 relative overflow-hidden backdrop-blur-glass">
              {/* Highlight bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500/60" />
              
              <h2 className="font-display font-bold text-xl uppercase tracking-tight text-white flex items-center gap-2 mb-4">
                <Target className="text-red-400" size={20} />
                The Challenge
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-sans whitespace-pre-line">
                {project.challenge}
              </p>
            </div>
          </BlurFade>

          {/* Solution Section */}
          <BlurFade delay={0.25} inView>
            <div 
              className="bg-bg-surface/10 rounded-card border p-6 sm:p-8 relative overflow-hidden backdrop-blur-glass"
              style={{
                borderColor: `${themeAccent}33`,
                boxShadow: `0 10px 30px -15px ${themeAccent}22`
              }}
            >
              {/* Highlight bar */}
              <div 
                className="absolute top-0 left-0 w-1 h-full" 
                style={{ backgroundColor: themeAccent }}
              />
              
              <h2 className="font-display font-bold text-xl uppercase tracking-tight text-white flex items-center gap-2 mb-4">
                <Sparkles style={{ color: themeAccent }} size={20} />
                The Solution & Architecture
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-sans whitespace-pre-line">
                {project.solution}
              </p>

              {/* Technologies Used */}
              <div className="mt-6 pt-6 border-t border-glass-border/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block mb-3">
                  Technologies Deployed
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs font-mono text-text-secondary px-3 py-1 rounded-md bg-bg-surface/30 border border-glass-border/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </BlurFade>

          {/* Result Section */}
          <BlurFade delay={0.3} inView>
            <div className="bg-bg-surface/10 rounded-card border border-glass-border/40 p-6 sm:p-8 relative overflow-hidden backdrop-blur-glass">
              {/* Highlight bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/60" />
              
              <h2 className="font-display font-bold text-xl uppercase tracking-tight text-white flex items-center gap-2 mb-4">
                <Award className="text-emerald-400" size={20} />
                Key Results & Impact
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-sans whitespace-pre-line">
                {project.result}
              </p>
            </div>
          </BlurFade>

        </div>

        {/* Gallery Showcase */}
        {gallery.length > 1 && (
          <BlurFade delay={0.35} inView>
            <div className="border-t border-glass-border/20 pt-16">
              <h2 className="font-display font-bold text-2xl uppercase tracking-tight text-white text-center mb-10">
                Visual Showcase
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gallery.slice(1).map((imgUrl, index) => (
                  <div 
                    key={index} 
                    className="relative aspect-[16/9] w-full overflow-hidden border border-glass-border bg-bg-surface/30 shadow-glass rounded-card group hover:scale-[1.01] transition-transform duration-300"
                  >
                    <Image
                      src={imgUrl}
                      alt={`${project.title} Screenshot ${index + 2}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>
        )}

      </div>
    </div>
  )
}
