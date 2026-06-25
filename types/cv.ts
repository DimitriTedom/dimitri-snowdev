import type { PersonaId } from './persona'

export interface CVSection {
  title: string
  content: string | string[]
  type: 'text' | 'list' | 'skills' | 'projects' | 'achievements'
}

export interface CVData {
  persona: PersonaId
  fullName: string
  title: string // Persona-specific professional title
  objective: string // Objective/summary adapted to persona
  contact: {
    email: string
    github: string
    linkedin: string
    portfolio: string
    location: string
  }
  highlightedSkills: string[] // Priority skills for this persona
  highlightedProjects: string[] // UUIDs of the most relevant projects
  highlightedAchievements: string[] // IDs of the most relevant certs/awards
  experiences: string[] // UUIDs of experiences sorted by relevance
  customSections: CVSection[] // Custom sections specific to this persona
  accentColor: string // Accent color for the generated CV layout
  generatedAt: string // ISO timestamp
}

export interface CVGenerationRequest {
  persona: PersonaId
  jobOffer?: string // Raw text of job offer (for dynamic ATS tuning)
  targetRole?: string // Target role
}

export interface CVMatchResult {
  score: number // ATS compatibility score (0-100)
  matchedKeywords: string[]
  missingKeywords: string[]
  suggestions: string[]
  recommendedPersona: PersonaId
}
