import type { PersonaId } from './persona'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
}

export interface ChatSession {
  id: string
  sessionId: string
  personaRef: PersonaId
  messages: ChatMessage[]
  createdAt: string
  updatedAt: string
}

export interface JobOfferAnalysis {
  title: string
  company?: string
  requiredSkills: string[]
  niceToHaveSkills: string[]
  technologies: string[]
  keywords: string[]
  seniorityLevel: 'junior' | 'mid' | 'senior' | 'lead'
  matchScore: number // Compat score vs selected profile
  recommendedPersona: PersonaId // Best matching persona
  suggestions: string[]
}

export interface RAGContext {
  projectsSummary: string
  experiencesSummary: string
  skillsSummary: string
  achievementsSummary: string
  personalStatement: string
}
