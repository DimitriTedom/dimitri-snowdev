import { createSupabaseServerClient } from './supabase/server'
import { SKILLS } from '@/data/skills'
import { SkillWithPersonas } from '@/types/skill'

/**
 * Fetches all skills from the database.
 * Falls back to static data if Supabase is offline or returns empty.
 */
export async function getSkills(): Promise<SkillWithPersonas[]> {
  try {
    const supabase = await createSupabaseServerClient()
    if (supabase) {
      const { data, error } = await supabase
        .from('skills')
        .select('*, skill_personas(persona_id)')
        .order('sort_order', { ascending: true })

      if (!error && data && data.length > 0) {
        return (data as unknown[]).map((s) => {
          const skill = s as Record<string, unknown>
          return {
            ...skill,
            skill_personas: Array.isArray(skill.skill_personas)
              ? skill.skill_personas
              : skill.skill_personas
              ? [skill.skill_personas]
              : [],
          }
        }) as unknown as SkillWithPersonas[]
      }
      if (error) {
        console.warn('[getSkills] Supabase query error, falling back:', error.message)
      }
    }
  } catch (err) {
    console.error('[getSkills] Failed to fetch from Supabase:', err)
  }

  // Fallback to static data
  return SKILLS
}
