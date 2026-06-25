import { createSupabaseServerClient } from './supabase/server'
import { ACHIEVEMENTS } from '@/data/achievements'
import { Achievement } from '@/types/achievement'

/**
 * Fetches all achievements from the database.
 * Falls back to static data if Supabase is offline or returns empty.
 */
export async function getAchievements(): Promise<Achievement[]> {
  try {
    const supabase = await createSupabaseServerClient()
    if (supabase) {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })

      if (!error && data && data.length > 0) {
        return data as Achievement[]
      }
      if (error) {
        console.warn('[getAchievements] Supabase query error, falling back:', error.message)
      }
    }
  } catch (err) {
    console.error('[getAchievements] Failed to fetch from Supabase:', err)
  }

  // Fallback to static data
  return ACHIEVEMENTS.filter((a) => a.is_published)
}
