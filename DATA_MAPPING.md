# DATA_MAPPING.md — SnowDev V2 Portfolio
> **Document de référence Data** — Interfaces TypeScript, schémas de données et stratégie de migration V1 → V2.
> Sources migrées : `snow-dev-portfolio-v1/src/data/projects.ts`, `achievements.ts`, `profile.md`, `src/app/page.tsx`

---

## 1. Inventaire des Données V1

### Projets (15 entrées dans projects.ts)

| ID | Titre | Catégorie | Tags principaux | Personas cibles |
|---|---|---|---|---|
| 1 | ChezFlora UI/UX Design | UI/UX Design | Figma, Design System | `uiux-designer`, `graphic-designer` |
| 2 | Canva Pro Course | Product Design | CanvaPro, Teaching, AI | `graphic-designer`, `ai-engineer` |
| 3 | ChezFlora E-commerce (🏆 1st Place) | Web Apps | MERN, Tailwind, Redux | `fullstack` |
| 4 | NjangiTech Tontine | Web Apps | React, PostgreSQL, Supabase | `fullstack`, `cloud-architect` |
| 5 | AI SnowPrompt Builder | Web Apps | Next.js, LLM, GROQ | `fullstack`, `ai-engineer` |
| 6 | STS Library Design | UI/UX Design | Figma, Canva | `uiux-designer`, `graphic-designer` |
| 7 | MLTI Website | Web Apps | React, Framer Motion | `fullstack` |
| 8 | Graphic Designs Collection | Product Design | CanvaPro, AI | `graphic-designer` |
| 9 | Snow Brain AI Chatbot | Web Apps | React, Gemini, LLMs | `ai-engineer`, `fullstack` |
| 10 | Client Portfolio (48h) | Web Apps | React, Framer Motion | `fullstack`, `uiux-designer` |
| 11 | STS HTML/CSS Portfolio | Web Apps | HTML5, CSS3, Next.js | `fullstack` |
| 12 | STS KeyCode ASCII | Web Apps | HTML5, JS, Education | `fullstack` |
| 13 | STS Password Generator | Web Apps | HTML5, CSS3, Security | `fullstack` |
| 14 | STS Coin Flip | Web Apps | HTML5, CSS3, Animation | `fullstack` |
| 15 | STS Tech Stickers | Web Apps | HTML5, CSS3, Design | `fullstack`, `graphic-designer` |

### Expériences (extraites de V1)

| Entreprise | Poste | Durée | Type | Personas |
|---|---|---|---|---|
| Worketyamo | Graphic Designer, Full Stack Dev Teacher | 2023–Present | Part-time | `graphic-designer`, `fullstack` |
| Master Language & Tech Institute (MLTI) | Community Manager, Full Stack JS Developer | April 2025–Present | Full-time | `fullstack`, `ai-engineer` |

### Certifications (10 entrées dans achievements.ts)

| ID | Titre | Fournisseur | Catégorie | Statut |
|---|---|---|---|---|
| figma-ui-ux | Figma Essential for UI/UX | Udemy | UI/UX Design | ✅ |
| react-mastery | React: All You Need to Know | Udemy | Development | ✅ |
| canva-100-designs | Canva 100 Designs Milestone | Canva | Design | ✅ |
| canva-200-designs | Canva 200 Designs Milestone | Canva | Design | ✅ |
| chatgpt-master | ChatGPT Master Course | Udemy | AI & Productivity | ✅ |
| wordpress-developer | Complete WordPress Developer | Udemy | Development | ✅ |
| canva-passive-income | Canva + AI Passive Income | Udemy | Business & AI | ✅ |
| canva-productivity | Canva Productivity | Udemy | Productivity | ✅ |
| competition-winner | ChezFlora — 1st Place Winner | Competition | Competition | ✅ |
| aws-in-progress | AWS Solutions Architect Associate | AWS | Cloud Computing | 🎯 In Progress |

---

## 2. Interfaces TypeScript

### 2.1 Types de base

```ts
// types/persona.ts

export type PersonaId =
  | 'fullstack'
  | 'ai-engineer'
  | 'uiux-designer'
  | 'graphic-designer'
  | 'cloud-architect'

export interface PersonaConfig {
  id:          PersonaId
  label:       string       // 'Full Stack JS Developer'
  emoji:       string       // '🚀'
  icon:        string       // Lucide icon name: 'Code2'
  description: string       // Courte description (1 phrase)
  accentColor: string       // Couleur hex spécifique '#5e17eb'
  skills:      string[]     // Skills mis en avant pour ce persona
  tagline:     string       // Tagline affichée dans le hero
}

// Référentiel complet des personas
export const PERSONAS: Record<PersonaId, PersonaConfig> = {
  'fullstack': {
    id: 'fullstack',
    label: 'Full Stack JS Developer',
    emoji: '🚀',
    icon: 'Code2',
    description: 'Building scalable web applications with React, Node.js & Next.js',
    accentColor: '#5e17eb',
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Supabase'],
    tagline: 'Architecting digital experiences from front to back'
  },
  'ai-engineer': {
    id: 'ai-engineer',
    label: 'AI & Automation Engineer',
    emoji: '🤖',
    icon: 'Brain',
    description: 'Building AI-powered workflows and LLM integrations',
    accentColor: '#7c3aed',
    skills: ['n8n', 'LLMs', 'Gemini API', 'GROQ', 'OpenAI', 'Automation'],
    tagline: 'Orchestrating intelligence, automating the future'
  },
  'uiux-designer': {
    id: 'uiux-designer',
    label: 'UI/UX Designer',
    emoji: '🎨',
    icon: 'Figma',
    description: 'Crafting beautiful, intuitive interfaces and design systems',
    accentColor: '#8b5cf6',
    skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research', 'Auto Layout'],
    tagline: 'Where pixels meet purpose and design meets function'
  },
  'graphic-designer': {
    id: 'graphic-designer',
    label: 'Graphic Designer & Creator',
    emoji: '✨',
    icon: 'Palette',
    description: 'Brand identity, visual design & content creation at scale',
    accentColor: '#a855f7',
    skills: ['Canva Pro', 'Brand Identity', 'Visual Design', 'Content Creation', 'Teaching'],
    tagline: 'Visual stories that leave a lasting impression'
  },
  'cloud-architect': {
    id: 'cloud-architect',
    label: 'Cloud Architect',
    emoji: '☁️',
    icon: 'Cloud',
    description: 'Designing scalable cloud infrastructure on AWS',
    accentColor: '#6d28d9',
    skills: ['AWS', 'Docker', 'Vercel', 'CI/CD', 'PostgreSQL', 'Scalability'],
    tagline: 'Building infrastructure that scales without limits'
  }
} as const
```

### 2.2 Interface Project

```ts
// types/project.ts

export type ProjectCategory =
  | 'Web Apps'
  | 'UI/UX Design'
  | 'Product Design'
  | 'AI & Automation'
  | 'Cloud & DevOps'

export interface Project {
  // Identifiants
  id:          string    // UUID (Supabase) ou number (V1 legacy)
  slug:        string    // URL-friendly: 'chezflora-ecommerce'

  // Contenu
  title:       string
  description: string
  challenge:   string
  solution:    string
  result:      string

  // Métadonnées
  category:    ProjectCategory
  tags:        string[]
  date:        string   // ISO date ou texte formaté V1

  // Media
  image_url:   string
  image_url_2?: string
  image_url_3?: string

  // Liens
  demo_url?:   string
  code_url?:   string

  // CMS
  featured:    boolean
  sort_order:  number
  is_published: boolean
  created_at:  string   // ISO timestamp
  updated_at:  string
}

export interface ProjectWithPersonas extends Project {
  project_personas: Array<{
    persona_id: PersonaId
    relevance:  1 | 2        // 1=secondaire, 2=principal
  }>
}

// Type allégé pour les listings (grid)
export type ProjectSummary = Pick<
  Project,
  'id' | 'slug' | 'title' | 'category' | 'tags' | 'date' | 'image_url' | 'featured'
>
```

### 2.3 Interface Experience

```ts
// types/experience.ts

export type ExperienceType = 'Full-time' | 'Part-time' | 'Freelance' | 'Contract'

export interface Experience {
  id:          string   // UUID
  company:     string
  position:    string
  duration:    string   // '2023-Present'
  start_date?: string   // ISO date
  end_date?:   string   // null si en cours
  type:        ExperienceType
  description?: string
  skills:      string[]
  sort_order:  number
  created_at:  string
}

export interface ExperienceWithPersonas extends Experience {
  experience_personas: Array<{ persona_id: PersonaId }>
}
```

### 2.4 Interface Achievement

```ts
// types/achievement.ts

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
  id:           string   // Slug ou UUID
  title:        string
  description:  string
  provider:     string   // 'Udemy', 'AWS', 'Canva', 'Competition'
  category:     AchievementCategory
  date:         string   // '2024' ou 'April 2025'
  duration?:    string   // '4 hours', '11 hours'
  image_url?:   string
  verify_url?:  string
  is_published: boolean
  sort_order:   number
  created_at:   string
}
```

### 2.5 Interface Skill

```ts
// types/skill.ts

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
  id:          string
  name:        string
  category:    SkillCategory
  icon_slug?:  string   // Pour devicons/simple-icons
  proficiency: number   // 0-100
  sort_order:  number
}

export interface SkillWithPersonas extends Skill {
  skill_personas: Array<{ persona_id: PersonaId }>
}
```

### 2.6 Type Contact

```ts
// types/contact.ts

export interface ContactFormData {
  name:    string
  email:   string
  message: string
}

export interface ContactSubmission extends ContactFormData {
  id:          string
  persona_ref: PersonaId
  status:      'new' | 'read' | 'replied'
  created_at:  string
}
```

### 2.7 Types Supabase générés (auto)

```bash
# Commande pour générer les types depuis le schéma Supabase réel
npx supabase gen types typescript --project-id <PROJECT_ID> > types/database.ts
```

---

## 3. Mapping V1 → V2 : Transformation des Données

### 3.1 Transformation Projet V1

```ts
// data/projects.ts — Migration complète depuis V1

import type { ProjectWithPersonas } from '@/types/project'
import type { PersonaId } from '@/types/persona'

// Fonction utilitaire de slug
const toSlug = (title: string): string =>
  title.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

// Mapping catégorie V1 → PersonaIds
const CATEGORY_TO_PERSONAS: Record<string, PersonaId[]> = {
  'Web Apps':      ['fullstack'],
  'UI/UX Design':  ['uiux-designer'],
  'Product Design': ['graphic-designer'],
}

// Mapping tags → PersonaIds additionnels
const TAG_TO_PERSONAS: Record<string, PersonaId[]> = {
  'LLM':          ['ai-engineer'],
  'LLMs Automation': ['ai-engineer'],
  'Gemini-1.5-flash': ['ai-engineer'],
  'GROQ':         ['ai-engineer'],
  'AI':           ['ai-engineer'],
  'n8n':          ['ai-engineer'],
  'AWS':          ['cloud-architect'],
  'Docker':       ['cloud-architect'],
  'Supabase':     ['cloud-architect'],
  'PostgreSQL':   ['cloud-architect'],
  'Figma':        ['uiux-designer'],
  'Design System': ['uiux-designer'],
  'CanvaPro':     ['graphic-designer'],
  'teaching':     ['graphic-designer'],
}

// Calcule les personas pour un projet V1
function inferPersonas(category: string, tags: string[]): Array<{ persona_id: PersonaId; relevance: 1 | 2 }> {
  const personaMap = new Map<PersonaId, number>()

  // Catégorie → persona principal (relevance 2)
  const categoryPersonas = CATEGORY_TO_PERSONAS[category] ?? ['fullstack']
  categoryPersonas.forEach(p => personaMap.set(p, 2))

  // Tags → personas additionnels (relevance 1)
  tags.forEach(tag => {
    const personas = TAG_TO_PERSONAS[tag] ?? []
    personas.forEach(p => {
      if (!personaMap.has(p)) personaMap.set(p, 1)
    })
  })

  return Array.from(personaMap.entries())
    .map(([persona_id, relevance]) => ({ persona_id, relevance: relevance as 1 | 2 }))
}

export const projectsData: ProjectWithPersonas[] = [
  {
    id: '1',
    slug: 'chezflora-ui-ux-design',
    title: 'ChezFlora Design System',
    description: 'Comprehensive design system for ChezFlora e-commerce platform — 8 organized Figma pages, auto layout components, and interactive prototypes reducing dev time by 40%.',
    challenge: 'Create a complete design ecosystem from scratch within 5 days, balancing aesthetics with technical feasibility across a complex e-commerce flow.',
    solution: 'Structured approach with foundational design tokens (Figma variables), nested auto layout components, and comprehensive developer documentation across 8+ organized pages.',
    result: '40% reduction in implementation time. Interactive prototypes expedited stakeholder approvals. The design system became a living reference document for the product.',
    category: 'UI/UX Design',
    tags: ['Figma', 'Design System', 'Auto Layout', 'Prototyping', 'E-commerce'],
    image_url: '/images/projects/ChezFlora_Thumbnail.png',
    image_url_2: '/images/projects/ChesFlora_Demo_Thumbnail.png',
    image_url_3: '/images/projects/ChezFlora_Thumbnail.png',
    demo_url: 'https://www.figma.com/design/iB4YKXeWuJByp0kGGwO2NY/ChezFlora',
    code_url: 'https://www.figma.com/design/iB4YKXeWuJByp0kGGwO2NY/ChezFlora',
    date: '2025-03-22',
    featured: true,
    sort_order: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    project_personas: inferPersonas('UI/UX Design', ['Figma', 'Design System'])
  },
  {
    id: '3',
    slug: 'chezflora-ecommerce-webapp',
    title: 'ChezFlora E-commerce — 1st Place Winner 🏆',
    description: 'Award-winning full-stack e-commerce platform built in 1 month under competition conditions. User role-based authentication, real-time data visualization, fully responsive.',
    challenge: 'Design, build and deploy a complex e-commerce system handling frontend and backend data while maintaining a clean interface — all within one month.',
    solution: 'MERN stack with TypeScript, user role-based authentication, real-time data, 4-day UX design sprint, responsive across all devices.',
    result: '1st place winner out of all competition participants. Exceptional jury reception with significantly higher engagement metrics than other submissions.',
    category: 'Web Apps',
    tags: ['MERN', 'Tailwind CSS', 'Redux Toolkit', 'TypeScript', 'MongoDB'],
    image_url: '/images/projects/ChezFlora_Thumbnail.png',
    image_url_2: '/images/projects/ChesFlora_Demo_Thumbnail.png',
    image_url_3: '/images/projects/ChezFloraPReview.png',
    demo_url: 'https://chez-flora-sigma.vercel.app/',
    code_url: 'https://github.com/DimitriTedom/ChezFlora',
    date: '2025-04-20',
    featured: true,
    sort_order: 2,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    project_personas: inferPersonas('Web Apps', ['MERN', 'TypeScript'])
  },
  {
    id: '4',
    slug: 'njangitech-tontine-management',
    title: 'NjangiTech — Tontine Management System',
    description: 'Full-stack rotating savings management platform with real-time dashboard, role-based auth, contribution tracking. Deployed on Vercel with Supabase backend.',
    challenge: 'Build a robust financial management system handling complex tontine operations, real-time sync, and role-based security accessible to non-technical users.',
    solution: 'React + TypeScript frontend, Supabase (PostgreSQL) for real-time updates and auth, interactive dashboards, comprehensive RBAC with admin and member roles.',
    result: 'Production-deployed on Vercel. Modernizes traditional community savings with automated calculations, real-time updates, and transparent financial tracking.',
    category: 'Web Apps',
    tags: ['React', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'Financial Management'],
    image_url: '/images/projects/tontine-app.png',
    image_url_2: '/images/projects/tontine-app.png',
    image_url_3: '/images/projects/tontine-app.png',
    demo_url: 'https://tontine-app-inf-221.vercel.app/',
    code_url: 'https://github.com/DimitriTedom/Systeme-de-Gestion-de-Tontine',
    date: '2026-02-06',
    featured: true,
    sort_order: 3,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    project_personas: inferPersonas('Web Apps', ['Supabase', 'PostgreSQL'])
  },
  {
    id: '5',
    slug: 'ai-snowprompt-builder',
    title: 'AI SnowPrompt Builder',
    description: 'AI-powered prompt discovery and generation platform. CRUD operations on AI-generated prompts via GROQ API (Llama-3-Versatile), Google Auth with NextAuth.js.',
    challenge: 'Build a first Next.js project with AI prompt generation and CRUD operations while maintaining clean, accessible interfaces.',
    solution: 'Next.js with NextAuth.js (Google OAuth), GROQ API integration for Llama-3-Versatile LLM, prompt CRUD with sharing features.',
    result: 'Widely appreciated by LinkedIn and WhatsApp developer communities. Growing user adoption.',
    category: 'Web Apps',
    tags: ['Next.js', 'LLM', 'GROQ', 'Tailwind CSS', 'JavaScript'],
    image_url: '/images/projects/snow-prompt.png',
    image_url_2: '/images/projects/snowprompt.png',
    image_url_3: '/images/projects/snowprompt.png',
    demo_url: 'https://snow-prompt-builder.vercel.app/',
    code_url: 'https://github.com/DimitriTedom/Snow-Prompt-Builder',
    date: '2025-05-10',
    featured: true,
    sort_order: 4,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    project_personas: inferPersonas('Web Apps', ['LLM', 'GROQ', 'AI'])
  },
  {
    id: '9',
    slug: 'snow-brain-ai-chatbot',
    title: 'Snow Brain AI — Gemini Chatbot',
    description: 'ChatBot powered by Google Gemini 1.5-flash with real-time multimodal reasoning, markdown rendering, and stream-based responses. 10k+ daily queries, 92% satisfaction rate.',
    challenge: 'Build a responsive AI assistant handling complex multimodal inputs with fast response times and coherent context management across extended sessions.',
    solution: 'React frontend with Gemini API integration, strategic caching, stream-based responses, markdown interpreter for enhanced readability.',
    result: '10,000+ daily queries, 92% user satisfaction, sub-1-second average response time.',
    category: 'Web Apps',
    tags: ['React.Js', 'Gemini-1.5-flash', 'LLMs Automation', 'TypeScript', 'AI'],
    image_url: 'https://snow-brain-ai.vercel.app/Snow-Brain-ai-preview.png',
    image_url_2: 'https://snow-brain-ai.vercel.app/Snow-Brain-AI.png',
    image_url_3: 'https://snow-brain-ai.vercel.app/eSnow-Brain-ai-preview.png',
    demo_url: 'https://snow-brain-ai.vercel.app/',
    code_url: 'https://github.com/DimitriTedom/Snow-Brain-Ai',
    date: '2024-09-12',
    featured: true,
    sort_order: 5,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    project_personas: inferPersonas('Web Apps', ['Gemini-1.5-flash', 'LLMs Automation', 'AI'])
  },
  // ... les 10 autres projets V1 suivent le même pattern
]
```

### 3.2 Expériences V2

```ts
// data/experiences.ts

import type { ExperienceWithPersonas } from '@/types/experience'

export const experiencesData: ExperienceWithPersonas[] = [
  {
    id: 'worketyamo-2023',
    company: 'Worketyamo',
    position: 'Graphic Designer & Full Stack Developer Teacher',
    duration: '2023–Present',
    start_date: '2023-01-01',
    end_date: undefined, // en cours
    type: 'Part-time',
    description: 'Brand identity and visual design for clients. Teaching full-stack JavaScript development to students. Mentoring web development best practices.',
    skills: ['Canva Pro', 'Brand Identity', 'React', 'JavaScript', 'Teaching', 'Mentoring'],
    sort_order: 1,
    created_at: new Date().toISOString(),
    experience_personas: [
      { persona_id: 'graphic-designer' },
      { persona_id: 'fullstack' },
    ]
  },
  {
    id: 'mlti-2025',
    company: 'Master Language & Technology Institute (MLTI)',
    position: 'Community Manager & Full Stack JS Developer',
    duration: 'April 2025–Present',
    start_date: '2025-04-01',
    end_date: undefined,
    type: 'Full-time',
    description: 'Digital community management and engagement strategies. Full-stack web development for the institute\'s digital presence. Built the MLTI website (React, Framer Motion, EmailJS).',
    skills: ['Community Management', 'Next.js', 'React', 'TypeScript', 'EmailJS', 'Framer Motion'],
    sort_order: 2,
    created_at: new Date().toISOString(),
    experience_personas: [
      { persona_id: 'fullstack' },
      { persona_id: 'ai-engineer' },
    ]
  }
]
```

### 3.3 Skills V2 (par persona)

```ts
// data/skills.ts

import type { SkillWithPersonas } from '@/types/skill'

export const skillsData: SkillWithPersonas[] = [
  // ─── FRONTEND ──────────────────────────────────────
  { id: 'react', name: 'React', category: 'Frontend', icon_slug: 'react', proficiency: 90, sort_order: 1,
    skill_personas: [{ persona_id: 'fullstack' }, { persona_id: 'ai-engineer' }] },
  { id: 'nextjs', name: 'Next.js', category: 'Frontend', icon_slug: 'nextdotjs', proficiency: 88, sort_order: 2,
    skill_personas: [{ persona_id: 'fullstack' }, { persona_id: 'ai-engineer' }] },
  { id: 'typescript', name: 'TypeScript', category: 'Language', icon_slug: 'typescript', proficiency: 85, sort_order: 3,
    skill_personas: [{ persona_id: 'fullstack' }, { persona_id: 'ai-engineer' }] },
  { id: 'tailwindcss', name: 'Tailwind CSS', category: 'Frontend', icon_slug: 'tailwindcss', proficiency: 92, sort_order: 4,
    skill_personas: [{ persona_id: 'fullstack' }, { persona_id: 'uiux-designer' }] },

  // ─── BACKEND ──────────────────────────────────────
  { id: 'nodejs', name: 'Node.js', category: 'Backend', icon_slug: 'nodedotjs', proficiency: 82, sort_order: 5,
    skill_personas: [{ persona_id: 'fullstack' }] },
  { id: 'express', name: 'Express.js', category: 'Backend', icon_slug: 'express', proficiency: 80, sort_order: 6,
    skill_personas: [{ persona_id: 'fullstack' }] },

  // ─── DATABASE ─────────────────────────────────────
  { id: 'postgresql', name: 'PostgreSQL', category: 'Database', icon_slug: 'postgresql', proficiency: 80, sort_order: 7,
    skill_personas: [{ persona_id: 'fullstack' }, { persona_id: 'cloud-architect' }] },
  { id: 'supabase', name: 'Supabase', category: 'Database', icon_slug: 'supabase', proficiency: 85, sort_order: 8,
    skill_personas: [{ persona_id: 'fullstack' }, { persona_id: 'cloud-architect' }] },
  { id: 'mongodb', name: 'MongoDB', category: 'Database', icon_slug: 'mongodb', proficiency: 78, sort_order: 9,
    skill_personas: [{ persona_id: 'fullstack' }] },

  // ─── AI & AUTOMATION ──────────────────────────────
  { id: 'n8n', name: 'n8n', category: 'AI & Automation', icon_slug: 'n8n', proficiency: 80, sort_order: 10,
    skill_personas: [{ persona_id: 'ai-engineer' }] },
  { id: 'gemini', name: 'Google Gemini API', category: 'AI & Automation', icon_slug: 'google', proficiency: 85, sort_order: 11,
    skill_personas: [{ persona_id: 'ai-engineer' }] },
  { id: 'openai', name: 'OpenAI API', category: 'AI & Automation', icon_slug: 'openai', proficiency: 80, sort_order: 12,
    skill_personas: [{ persona_id: 'ai-engineer' }] },
  { id: 'groq', name: 'GROQ / Llama', category: 'AI & Automation', proficiency: 78, sort_order: 13,
    skill_personas: [{ persona_id: 'ai-engineer' }] },

  // ─── DESIGN ───────────────────────────────────────
  { id: 'figma', name: 'Figma', category: 'Design', icon_slug: 'figma', proficiency: 90, sort_order: 14,
    skill_personas: [{ persona_id: 'uiux-designer' }, { persona_id: 'graphic-designer' }] },
  { id: 'canva', name: 'Canva Pro', category: 'Design', icon_slug: 'canva', proficiency: 95, sort_order: 15,
    skill_personas: [{ persona_id: 'graphic-designer' }] },

  // ─── CLOUD & DEVOPS ───────────────────────────────
  { id: 'aws', name: 'AWS', category: 'Cloud & DevOps', icon_slug: 'amazonaws', proficiency: 65, sort_order: 16,
    skill_personas: [{ persona_id: 'cloud-architect' }] },
  { id: 'docker', name: 'Docker', category: 'Cloud & DevOps', icon_slug: 'docker', proficiency: 72, sort_order: 17,
    skill_personas: [{ persona_id: 'cloud-architect' }, { persona_id: 'fullstack' }] },
  { id: 'vercel', name: 'Vercel', category: 'Cloud & DevOps', icon_slug: 'vercel', proficiency: 90, sort_order: 18,
    skill_personas: [{ persona_id: 'cloud-architect' }, { persona_id: 'fullstack' }] },
]
```

---

## 4. Stratégie de Migration V1 → V2

### Phase 1 — Données statiques (immédiat)
```
data/projects.ts      ← migration et enrichissement du fichier V1
data/experiences.ts   ← extraites de profile.md + page.tsx V1
data/achievements.ts  ← migration directe depuis achievements.ts V1
data/skills.ts        ← catégorisation et association personas
data/personas.ts      ← nouveau fichier, référentiel personas
```

**Ces fichiers servent de fallback** si Supabase est indisponible.

### Phase 2 — Migration vers Supabase (sprint suivant)
```sql
-- Script de seed (supabase/seed.sql)
-- Génération depuis les tableaux TypeScript ci-dessus
-- via un script de migration : scripts/migrate-v1-to-supabase.ts
```

### Phase 3 — CMS Dashboard (optionnel)
```
/dashboard/projects  → Gestion CRUD des projets via Supabase
/dashboard/content   → Gestion du contenu textuel par persona
```

---

## 5. Logique de Filtrage par Persona

### Côté Serveur (Next.js Server Component)

```ts
// lib/persona.ts

import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { PersonaId } from '@/types/persona'
import type { ProjectWithPersonas } from '@/types/project'

export async function getProjectsByPersona(persona: PersonaId): Promise<ProjectWithPersonas[]> {
  const supabase = await createSupabaseServerClient()
  if (!supabase) return [] // Fallback gracieux

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_personas!inner (
        persona_id,
        relevance
      )
    `)
    .eq('project_personas.persona_id', persona)
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[getProjectsByPersona] Supabase error:', error)
    // Fallback vers données statiques
    return getProjectsByPersonaStatic(persona)
  }

  return data ?? []
}

// Fallback données statiques (si Supabase indisponible)
import { projectsData } from '@/data/projects'
export function getProjectsByPersonaStatic(persona: PersonaId): ProjectWithPersonas[] {
  return projectsData.filter(p =>
    p.project_personas.some(pp => pp.persona_id === persona)
  )
}

export async function getFeaturedProjectsByPersona(persona: PersonaId, limit = 3) {
  const projects = await getProjectsByPersona(persona)
  return projects
    .filter(p => p.featured)
    .sort((a, b) => (b.project_personas.find(pp => pp.persona_id === persona)?.relevance ?? 1) -
                    (a.project_personas.find(pp => pp.persona_id === persona)?.relevance ?? 1))
    .slice(0, limit)
}
```

### Côté Client (filtre local sans refetch)

```ts
// hooks/usePersona.ts
'use client'

import { usePersona } from '@/components/providers/PersonaProvider'
import type { ProjectWithPersonas } from '@/types/project'

export function useFilteredProjects(allProjects: ProjectWithPersonas[]) {
  const { activePersona } = usePersona()

  return allProjects.filter(project =>
    project.project_personas.some(pp => pp.persona_id === activePersona)
  ).sort((a, b) => {
    // Trier par relevance pour le persona actif
    const aRel = a.project_personas.find(pp => pp.persona_id === activePersona)?.relevance ?? 1
    const bRel = b.project_personas.find(pp => pp.persona_id === activePersona)?.relevance ?? 1
    return bRel - aRel
  })
}
```

---

## 6. Plan de Migration des Assets (Images)

### Mapping des chemins

```
V1 Source (public/)          →  V2 Destination (public/images/projects/)
/ChezFlora_Thumbnail.png     →  /images/projects/chezflora-design-thumb.png
/ChesFlora Demo_Thumbnail.png →  /images/projects/chezflora-demo.png
/tontine-app.png             →  /images/projects/njangitech.png
/snow-prompt.png             →  /images/projects/snowprompt.png
/mlti.png                    →  /images/projects/mlti.png
/achievements/*.png          →  /images/achievements/*.png
```

### Script de migration

```bash
# Copier les assets V1 vers V2
cp -r /home/snowdev/Documents/dimitri-snowdev-v2/snow-dev-portfolio-v1/public/* \
      /home/snowdev/Documents/dimitri-snowdev-v2/dimitri-snowdev/public/
```

---

## 7. Profil Dimitri — Données Biographiques Clés

```ts
// data/profile.ts — données publiques non-sensibles

export const PROFILE = {
  name:        'Dimitri Tedom',
  alias:       'SnowDev',
  location:    'Yaoundé, Cameroun 🇨🇲',
  tagline:     'Architecting digital experiences that seamlessly blend cutting-edge technology with intuitive design',
  philosophy:  'Creating solutions that don\'t just work — they inspire.',
  availability: 'Open for innovative projects & collaboration',
  email:       'dimitritedom@gmail.com',
  socials: {
    github:   'https://github.com/DimitriTedom',
    linkedin: 'https://linkedin.com/in/dimitri-tedom',
    portfolio: 'https://snowdev-portfolio.vercel.app',
  },
  education: {
    degree: 'GCE A-Levels (Maths, Further Maths, Physics, Chemistry, Biology)',
    school: 'GBHS Mbalmayo',
    year:   '2022-2023',
    honors: 'Graduated with honors',
  },
  stats: {
    yearsExperience:  '2+',
    projectsDelivered: '15+',
    certifications:   '9+',
    canvaDesigns:     '200+',
    aiQueriesPerDay:  '10,000+',
    aiSatisfaction:   '92%',
    competitionWins:  1,
  }
} as const
```

---

## 8. Correction Personas (Alignement CdC §2)

> ⚠️ **CORRECTION IMPORTANTE** : Le cahier des charges définit 5 personas spécifiques.
> Les anciens IDs `uiux-designer` et `graphic-designer` sont remplacés par `product-builder` et `entrepreneur`.

### Mapping officiel CdC → Code

```ts
// types/persona.ts — VERSION CORRIGÉE

export type PersonaId =
  | 'fullstack'          // Full Stack Developer
  | 'ai-engineer'        // AI Engineer
  | 'cloud-architect'    // Cloud & AWS Architect
  | 'product-builder'    // Digital Product Builder  ← Remplace 'uiux-designer' + 'graphic-designer'
  | 'entrepreneur'       // Tech Entrepreneur        ← Nouveau

export const PERSONAS: Record<PersonaId, PersonaConfig> = {
  'fullstack': {
    id: 'fullstack',
    label: 'Full Stack Developer',
    emoji: '🚀',
    icon: 'Code2',
    description: 'Building scalable web applications with React, Node.js & Next.js',
    accentColor: '#5e17eb',
    theme: { accent: '#5e17eb', accentLight: '#ae6bf6', accentGlow: 'rgba(94,23,235,0.4)' },
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'MERN'],
    tagline: 'Architecting digital experiences from front to back',
    cvFocus: ['Next.js', 'Node.js', 'Supabase', 'projets web'],
  },
  'ai-engineer': {
    id: 'ai-engineer',
    label: 'AI Engineer',
    emoji: '🤖',
    icon: 'Brain',
    description: 'Building AI-powered workflows, LLM integrations & automation pipelines',
    accentColor: '#7c3aed',
    theme: { accent: '#7c3aed', accentLight: '#a78bfa', accentGlow: 'rgba(124,58,237,0.4)' },
    skills: ['n8n', 'Gemini API', 'DeepSeek V3', 'GROQ/Llama', 'RAG', 'Automation'],
    tagline: 'Orchestrating intelligence, automating the future',
    cvFocus: ['LLMs', 'n8n', 'Gemini', 'automatisation', 'RAG'],
  },
  'cloud-architect': {
    id: 'cloud-architect',
    label: 'Cloud & AWS Architect',
    emoji: '☁️',
    icon: 'Cloud',
    description: 'Designing scalable cloud infrastructure on AWS & modern DevOps practices',
    accentColor: '#0ea5e9',
    theme: { accent: '#0ea5e9', accentLight: '#38bdf8', accentGlow: 'rgba(14,165,233,0.4)' },
    skills: ['AWS', 'Docker', 'CI/CD', 'Vercel', 'Supabase', 'PostgreSQL', 'Infrastructure'],
    tagline: 'Building infrastructure that scales without limits',
    cvFocus: ['cloud', 'architectures', 'certifications AWS', 'scalabilité'],
  },
  'product-builder': {
    id: 'product-builder',
    label: 'Digital Product Builder',
    emoji: '🎨',
    icon: 'Layers',
    description: 'Designing & building digital products from design systems to production',
    accentColor: '#10b981',
    theme: { accent: '#10b981', accentLight: '#34d399', accentGlow: 'rgba(16,185,129,0.4)' },
    skills: ['Figma', 'Design Systems', 'Canva Pro', 'UX/UI', 'Prototyping', 'Product Strategy'],
    tagline: 'Where pixels meet purpose and products find their market',
    cvFocus: ['design systems', 'Figma', 'product strategy', 'UI/UX'],
  },
  'entrepreneur': {
    id: 'entrepreneur',
    label: 'Tech Entrepreneur',
    emoji: '⚡',
    icon: 'Zap',
    description: 'Building digital businesses, courses & tech ventures from scratch',
    accentColor: '#f59e0b',
    theme: { accent: '#f59e0b', accentLight: '#fbbf24', accentGlow: 'rgba(245,158,11,0.4)' },
    skills: ['Business Development', 'Content Creation', 'Course Design', 'Community Building', 'Marketing Digital'],
    tagline: 'Turning ideas into products, products into businesses',
    cvFocus: ['entrepreneuriat', 'cours créés', 'leadership', 'business digital'],
  }
} as const
```

### Migration des anciens IDs → nouveaux IDs

```ts
// Mapping pour migration des données V1
const PERSONA_MIGRATION_MAP: Record<string, PersonaId> = {
  'uiux-designer':    'product-builder',  // → Digital Product Builder
  'graphic-designer': 'product-builder',  // → Digital Product Builder (absorbe aussi)
  'fullstack':        'fullstack',         // ✅ inchangé
  'ai-engineer':      'ai-engineer',       // ✅ inchangé
  'cloud-architect':  'cloud-architect',   // ✅ inchangé
}
```

### Remapping des projets V1 avec les nouveaux personas

| Projet V1 | Anciens personas | Nouveaux personas |
|---|---|---|
| ChezFlora Design System | `uiux-designer`, `graphic-designer` | `product-builder` |
| Canva Pro Course | `graphic-designer`, `ai-engineer` | `entrepreneur`, `ai-engineer` |
| ChezFlora E-commerce | `fullstack` | `fullstack`, `product-builder` |
| NjangiTech Tontine | `fullstack`, `cloud-architect` | `fullstack`, `cloud-architect` |
| AI SnowPrompt | `fullstack`, `ai-engineer` | `fullstack`, `ai-engineer` |
| STS Library Design | `uiux-designer`, `graphic-designer` | `product-builder` |
| MLTI Website | `fullstack` | `fullstack`, `entrepreneur` |
| Graphic Designs Collection | `graphic-designer` | `product-builder`, `entrepreneur` |
| Snow Brain AI | `ai-engineer`, `fullstack` | `ai-engineer`, `fullstack` |
| Client Portfolio 48h | `fullstack`, `uiux-designer` | `fullstack`, `product-builder` |
| STS HTML/CSS Portfolio | `fullstack` | `fullstack`, `entrepreneur` |
| STS Tools (3 projets) | `fullstack` | `fullstack` |

---

## 9. CV Intelligent — Interfaces TypeScript (CdC §5 & §7)

```ts
// types/cv.ts

import type { PersonaId } from './persona'

export interface CVSection {
  title: string
  content: string | string[]
  type: 'text' | 'list' | 'skills' | 'projects' | 'achievements'
}

export interface CVData {
  persona:    PersonaId
  fullName:   string
  title:      string               // Titre professionnel selon persona
  objective:  string               // Résumé/objectif adapté au persona
  contact: {
    email:    string
    github:   string
    linkedin: string
    portfolio: string
    location: string
  }
  highlightedSkills:    string[]   // Skills prioritaires pour ce persona
  highlightedProjects:  string[]   // UUIDs des projets les plus pertinents
  highlightedAchievements: string[] // IDs des certifs les plus pertinentes
  experiences:         string[]    // UUIDs des expériences, triées par pertinence
  customSections:      CVSection[] // Sections spécifiques au persona
  accentColor:         string      // Couleur d'accent du CV
  generatedAt:         string      // ISO timestamp
}

export interface CVGenerationRequest {
  persona:    PersonaId
  jobOffer?:  string               // Texte de l'offre d'emploi (Phase 5)
  targetRole?: string              // Rôle ciblé
}

export interface CVMatchResult {
  score:            number         // 0-100 score de compatibilité
  matchedKeywords:  string[]
  missingKeywords:  string[]
  suggestions:      string[]
  recommendedPersona: PersonaId
}
```

---

## 10. Types Blog & Témoignages (CdC §4)

```ts
// types/blog.ts

import type { PersonaId } from './persona'

export interface BlogPost {
  id:           string
  slug:         string
  title:        string
  excerpt:      string
  content:      string              // MDX compilé
  mdxPath:      string              // Chemin fichier .mdx local
  coverUrl?:    string
  tags:         string[]
  personaId?:   PersonaId
  published:    boolean
  publishedAt:  string
  createdAt:    string
  updatedAt:    string
}

export type BlogPostSummary = Pick<
  BlogPost,
  'id' | 'slug' | 'title' | 'excerpt' | 'coverUrl' | 'tags' | 'personaId' | 'publishedAt'
>

// types/testimonial.ts

export interface Testimonial {
  id:          string
  author:      string
  position?:   string
  company?:    string
  avatarUrl?:  string
  content:     string
  rating:      1 | 2 | 3 | 4 | 5
  personaId?:  PersonaId           // Témoignage spécifique à un persona
  isFeatured:  boolean
  isPublished: boolean
  createdAt:   string
}
```

---

## 11. Types IA (CdC §7 — Modules IA)

```ts
// types/ai.ts

import type { PersonaId } from './persona'

export interface ChatMessage {
  id:        string
  role:      'user' | 'assistant' | 'system'
  content:   string
  timestamp: string
}

export interface ChatSession {
  id:         string
  sessionId:  string
  personaRef: PersonaId
  messages:   ChatMessage[]
  createdAt:  string
  updatedAt:  string
}

export interface JobOfferAnalysis {
  title:            string
  company?:         string
  requiredSkills:   string[]
  niceToHaveSkills: string[]
  technologies:     string[]
  keywords:         string[]
  seniorityLevel:   'junior' | 'mid' | 'senior' | 'lead'
  matchScore:       number          // Score 0-100 vs profil actif
  recommendedPersona: PersonaId    // Persona le plus adapté
  suggestions:      string[]
}

export interface RAGContext {
  projectsSummary:     string
  experiencesSummary:  string
  skillsSummary:       string
  achievementsSummary: string
  personalStatement:   string
}
```

---

## 12. Supabase Storage (CdC §8 "Supabase Storage")

```ts
// lib/storage.ts

// Buckets Supabase Storage
export const STORAGE_BUCKETS = {
  PROJECTS:      'project-images',    // Images de projets
  ACHIEVEMENTS:  'achievements',      // Certificats et images récompenses
  AVATARS:       'avatars',           // Photos de profil
  DIAGRAMS:      'architecture-diagrams', // Diagrammes Architecture Gallery
  CV:            'cv-exports',        // CVs générés en PDF
  VIDEOS:        'showcase-videos',   // Google Veo3 showcase videos
} as const

// URLs signées pour CVs (expiration 1h)
export async function getSignedCVUrl(filePath: string): Promise<string> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase!.storage
    .from(STORAGE_BUCKETS.CV)
    .createSignedUrl(filePath, 3600)
  return data?.signedUrl ?? ''
}
```
