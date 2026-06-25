import { cookies } from 'next/headers'
import { PersonaId, PERSONAS } from '@/types/persona'

/**
 * Validates whether a given string is a supported PersonaId.
 */
export function isValidPersona(value: string | null): value is PersonaId {
  if (!value) return false
  return PERSONAS.some(p => p.id === value)
}

/**
 * Resolves the active persona on the server side using the cookie store.
 * Falls back to 'fullstack' if no cookie is present or if it's invalid.
 */
export async function getServerPersona(): Promise<PersonaId> {
  try {
    const cookieStore = await cookies()
    const cookieVal = cookieStore.get('snowdev_persona')?.value
    if (cookieVal && isValidPersona(cookieVal)) {
      return cookieVal
    }
  } catch (error) {
    console.error('[getServerPersona] Error reading cookies:', error)
  }
  return 'fullstack'
}
