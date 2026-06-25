import { createSupabaseServerClient } from './supabase/server'
import { EXPERIENCES } from '@/data/experiences'
import { ExperienceWithPersonas } from '@/types/experience'

/**
 * Fetches all experiences from the database.
 * Falls back to static data if Supabase is offline or returns empty.
 */
export async function getExperiences(): Promise<ExperienceWithPersonas[]> {
  try {
    const supabase = await createSupabaseServerClient()
    if (supabase) {
      const { data, error } = await supabase
        .from('experiences')
        .select('*, experience_personas(persona_id)')
        .order('sort_order', { ascending: true })

      if (!error && data && data.length > 0) {
        return (data as unknown[]).map((e) => {
          const exp = e as Record<string, unknown>
          return {
            ...exp,
            experience_personas: Array.isArray(exp.experience_personas)
              ? exp.experience_personas
              : exp.experience_personas
              ? [exp.experience_personas]
              : [],
          }
        }) as unknown as ExperienceWithPersonas[]
      }
      if (error) {
        console.warn('[getExperiences] Supabase query error, falling back:', error.message)
      }
    }
  } catch (err) {
    console.error('[getExperiences] Failed to fetch from Supabase:', err)
  }

  // Fallback to static data
  return EXPERIENCES
}
