export type AchievementCategory =
  | 'UI/UX Design'
  | 'Development'
  | 'Design'
  | 'AI & Productivity'
  | 'Business & AI'
  | 'Productivity'
  | 'Cloud Computing'
  | 'Competition'

export interface Achievement {
  id: string
  title: string
  description: string
  provider: string
  category: AchievementCategory
  date: string
  duration?: string
  image_url?: string
  verify_url?: string
  is_published: boolean
  sort_order: number
  created_at: string
}
