import type { PersonaId } from '@/types/persona'

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactSubmission extends ContactFormData {
  id: string
  persona_ref: PersonaId
  status: 'new' | 'read' | 'replied'
  created_at: string
}
