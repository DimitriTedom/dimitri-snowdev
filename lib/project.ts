import { createSupabaseServerClient } from './supabase/server'
import { PROJECTS } from '@/data/projects'
import { PersonaId } from '@/types/persona'
import { ProjectWithPersonas } from '@/types/project'

/**
 * Fetches all published projects associated with a given persona.
 * Falls back to static data if Supabase is offline or returns empty.
 */
export async function getProjectsByPersona(personaId: PersonaId): Promise<ProjectWithPersonas[]> {
  try {
    const supabase = await createSupabaseServerClient()
    if (supabase) {
      const { data, error } = await supabase
        .from('projects')
        .select('*, project_personas!inner(persona_id, relevance)')
        .eq('is_published', true)
        .eq('project_personas.persona_id', personaId)
        .order('sort_order', { ascending: true })

      if (!error && data && data.length > 0) {
        // Map database response to ProjectWithPersonas shape
        return (data as unknown[]).map((p) => {
          const proj = p as Record<string, unknown>
          return {
            ...proj,
            project_personas: Array.isArray(proj.project_personas)
              ? proj.project_personas
              : proj.project_personas
              ? [proj.project_personas]
              : [],
          }
        }) as unknown as ProjectWithPersonas[]
      }
      if (error) {
        console.warn('[getProjectsByPersona] Supabase query error, falling back:', error.message)
      }
    }
  } catch (err) {
    console.error('[getProjectsByPersona] Failed to fetch from Supabase:', err)
  }

  // Fallback to static data
  return PROJECTS.filter(
    (proj) =>
      proj.is_published &&
      proj.project_personas.some((p) => p.persona_id === personaId)
  ).sort((a, b) => a.sort_order - b.sort_order)
}

/**
 * Fetches a single published project by its slug.
 * Falls back to static data if Supabase is offline or slug is not found.
 */
export async function getProjectBySlug(slug: string): Promise<ProjectWithPersonas | null> {
  try {
    const supabase = await createSupabaseServerClient()
    if (supabase) {
      const { data, error } = await supabase
        .from('projects')
        .select('*, project_personas(persona_id, relevance)')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle()

      if (!error && data) {
        return {
          ...data,
          project_personas: Array.isArray(data.project_personas)
            ? data.project_personas
            : data.project_personas
            ? [data.project_personas]
            : [],
        } as ProjectWithPersonas
      }
      if (error) {
        console.warn('[getProjectBySlug] Supabase query error, falling back:', error.message)
      }
    }
  } catch (err) {
    console.error('[getProjectBySlug] Failed to fetch from Supabase:', err)
  }

  // Fallback to static data
  return PROJECTS.find((proj) => proj.slug === slug && proj.is_published) || null
}
