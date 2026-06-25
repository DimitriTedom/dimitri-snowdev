import type { PersonaId } from './persona'

export interface Testimonial {
  id: string
  author: string
  position?: string
  company?: string
  avatarUrl?: string
  content: string
  rating: 1 | 2 | 3 | 4 | 5
  personaId?: PersonaId // Specific to a particular persona
  isFeatured: boolean
  isPublished: boolean
  createdAt: string
}
