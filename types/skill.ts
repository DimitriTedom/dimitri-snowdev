import type { PersonaId } from '@/types/persona'

export type SkillCategory =
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Design'
  | 'AI & Automation'
  | 'Cloud & DevOps'
  | 'Language'
  | 'Tools'

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  icon_slug?: string
  proficiency: number
  sort_order: number
}

export interface SkillWithPersonas extends Skill {
  skill_personas: Array<{ persona_id: PersonaId }>
}
