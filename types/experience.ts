import type { PersonaId } from '@/types/persona'

export type ExperienceType = 'Full-time' | 'Part-time' | 'Freelance' | 'Contract'

export interface Experience {
  id: string
  company: string
  position: string
  duration: string
  start_date?: string
  end_date?: string
  type: ExperienceType
  description?: string
  skills: string[]
  sort_order: number
  created_at: string
}

export interface ExperienceWithPersonas extends Experience {
  experience_personas: Array<{ persona_id: PersonaId }>
}
