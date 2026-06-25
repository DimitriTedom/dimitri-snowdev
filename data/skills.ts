import type { SkillWithPersonas } from '@/types/skill'

export const SKILLS: SkillWithPersonas[] = [
  // ─── FRONTEND ──────────────────────────────────────
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    icon_slug: 'react',
    proficiency: 90,
    sort_order: 1,
    skill_personas: [{ persona_id: 'fullstack' }, { persona_id: 'ai-engineer' }]
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    icon_slug: 'nextdotjs',
    proficiency: 88,
    sort_order: 2,
    skill_personas: [{ persona_id: 'fullstack' }, { persona_id: 'ai-engineer' }]
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Language',
    icon_slug: 'typescript',
    proficiency: 85,
    sort_order: 3,
    skill_personas: [{ persona_id: 'fullstack' }, { persona_id: 'ai-engineer' }]
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'Frontend',
    icon_slug: 'tailwindcss',
    proficiency: 92,
    sort_order: 4,
    skill_personas: [{ persona_id: 'fullstack' }, { persona_id: 'product-builder' }]
  },

  // ─── BACKEND ──────────────────────────────────────
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    icon_slug: 'nodedotjs',
    proficiency: 82,
    sort_order: 5,
    skill_personas: [{ persona_id: 'fullstack' }]
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend',
    icon_slug: 'express',
    proficiency: 80,
    sort_order: 6,
    skill_personas: [{ persona_id: 'fullstack' }]
  },

  // ─── DATABASE ─────────────────────────────────────
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Database',
    icon_slug: 'postgresql',
    proficiency: 80,
    sort_order: 7,
    skill_personas: [{ persona_id: 'fullstack' }, { persona_id: 'cloud-architect' }]
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Database',
    icon_slug: 'supabase',
    proficiency: 85,
    sort_order: 8,
    skill_personas: [{ persona_id: 'fullstack' }, { persona_id: 'cloud-architect' }]
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Database',
    icon_slug: 'mongodb',
    proficiency: 78,
    sort_order: 9,
    skill_personas: [{ persona_id: 'fullstack' }]
  },

  // ─── AI & AUTOMATION ──────────────────────────────
  {
    id: 'n8n',
    name: 'n8n',
    category: 'AI & Automation',
    icon_slug: 'n8n',
    proficiency: 80,
    sort_order: 10,
    skill_personas: [{ persona_id: 'ai-engineer' }]
  },
  {
    id: 'gemini',
    name: 'Google Gemini API',
    category: 'AI & Automation',
    icon_slug: 'google',
    proficiency: 85,
    sort_order: 11,
    skill_personas: [{ persona_id: 'ai-engineer' }]
  },
  {
    id: 'openai',
    name: 'OpenAI API',
    category: 'AI & Automation',
    icon_slug: 'openai',
    proficiency: 80,
    sort_order: 12,
    skill_personas: [{ persona_id: 'ai-engineer' }]
  },
  {
    id: 'groq',
    name: 'GROQ / Llama',
    category: 'AI & Automation',
    proficiency: 78,
    sort_order: 13,
    skill_personas: [{ persona_id: 'ai-engineer' }]
  },

  // ─── DESIGN ───────────────────────────────────────
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design',
    icon_slug: 'figma',
    proficiency: 90,
    sort_order: 14,
    skill_personas: [{ persona_id: 'product-builder' }]
  },
  {
    id: 'canva',
    name: 'Canva Pro',
    category: 'Design',
    icon_slug: 'canva',
    proficiency: 95,
    sort_order: 15,
    skill_personas: [{ persona_id: 'product-builder' }]
  },

  // ─── CLOUD & DEVOPS ───────────────────────────────
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud & DevOps',
    icon_slug: 'amazonaws',
    proficiency: 65,
    sort_order: 16,
    skill_personas: [{ persona_id: 'cloud-architect' }]
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Cloud & DevOps',
    icon_slug: 'docker',
    proficiency: 72,
    sort_order: 17,
    skill_personas: [{ persona_id: 'cloud-architect' }, { persona_id: 'fullstack' }]
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Cloud & DevOps',
    icon_slug: 'vercel',
    proficiency: 90,
    sort_order: 18,
    skill_personas: [{ persona_id: 'cloud-architect' }, { persona_id: 'fullstack' }]
  },

  // ─── ENTREPRENEURSHIP & BUSINESS ──────────────────
  {
    id: 'business-dev',
    name: 'Business Development',
    category: 'Tools',
    proficiency: 85,
    sort_order: 19,
    skill_personas: [{ persona_id: 'entrepreneur' }]
  },
  {
    id: 'content-creation',
    name: 'Content Creation',
    category: 'Design',
    proficiency: 90,
    sort_order: 20,
    skill_personas: [{ persona_id: 'entrepreneur' }, { persona_id: 'product-builder' }]
  },
  {
    id: 'course-design',
    name: 'Course Design',
    category: 'Design',
    proficiency: 88,
    sort_order: 21,
    skill_personas: [{ persona_id: 'entrepreneur' }]
  },
  {
    id: 'community-building',
    name: 'Community Building',
    category: 'Tools',
    proficiency: 85,
    sort_order: 22,
    skill_personas: [{ persona_id: 'entrepreneur' }]
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    category: 'Tools',
    proficiency: 80,
    sort_order: 23,
    skill_personas: [{ persona_id: 'entrepreneur' }]
  }
]
