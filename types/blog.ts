import type { PersonaId } from './persona'

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string // MDX compiled or raw content
  mdxPath: string // Local path to the .mdx file
  coverUrl?: string
  tags: string[]
  personaId?: PersonaId
  published: boolean
  publishedAt: string
  createdAt: string
  updatedAt: string
}

export type BlogPostSummary = Pick<
  BlogPost,
  'id' | 'slug' | 'title' | 'excerpt' | 'coverUrl' | 'tags' | 'personaId' | 'publishedAt'
>
