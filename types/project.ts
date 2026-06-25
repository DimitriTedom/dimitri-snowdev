import type { PersonaId } from '@/types/persona'

export type ProjectCategory =
  | 'Web Apps'
  | 'UI/UX Design'
  | 'Product Design'
  | 'AI & Automation'
  | 'Cloud & DevOps'

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  challenge: string
  solution: string
  result: string
  category: ProjectCategory
  tags: string[]
  date: string
  image_url: string
  image_url_2?: string
  image_url_3?: string
  demo_url?: string
  code_url?: string
  video_url?: string
  case_study?: string
  featured: boolean
  sort_order: number
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface ProjectWithPersonas extends Project {
  project_personas: Array<{
    persona_id: PersonaId
    relevance: 1 | 2
  }>
}

export type ProjectSummary = Pick<
  Project,
  'id' | 'slug' | 'title' | 'category' | 'tags' | 'date' | 'image_url' | 'featured'
>
