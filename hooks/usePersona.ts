import { usePersona as usePersonaContext } from '@/components/providers/PersonaProvider'
import { PERSONAS, PersonaConfig } from '@/types/persona'

/**
 * Custom hook to access active persona state, theme variables, and switcher capabilities
 * in Client Components. Exposes rich semantic naming according to the architecture plan.
 */
export function usePersona() {
  const { persona, setPersona } = usePersonaContext()

  // Find configuration details of the active persona (fall back to the first persona if not found)
  const personaConfig: PersonaConfig = PERSONAS.find(p => p.id === persona) || PERSONAS[0]

  return {
    /** Currently active persona id */
    activePersona: persona,
    /** Configuration details for the active persona including labels and theme accents */
    personaConfig,
    /** Transition active persona */
    setPersona,
    /** Default pending state for page-load operations (unused in raw context) */
    isPending: false,
    /** Complete list of supported personas and configurations */
    allPersonas: PERSONAS,
  }
}
