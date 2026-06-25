import type { ExperienceWithPersonas } from '@/types/experience'

export const EXPERIENCES: ExperienceWithPersonas[] = [
  {
    id: 'worketyamo-2023',
    company: 'Worketyamo',
    position: 'Graphic Designer & Full Stack Developer Teacher',
    duration: '2023–Present',
    start_date: '2023-09-01',
    end_date: undefined,
    type: 'Part-time',
    description:
      'Designed brand assets, marketing collateral and digital content at scale using Canva Pro and Figma. ' +
      'Simultaneously taught Full Stack web development (HTML, CSS, JavaScript, React) to junior developers — ' +
      '15+ students onboarded into production-ready coding workflows.',
    skills: ['Canva Pro', 'Figma', 'HTML', 'CSS', 'JavaScript', 'React', 'Teaching', 'Brand Identity'],
    sort_order: 1,
    created_at: new Date().toISOString(),
    experience_personas: [
      { persona_id: 'fullstack' },
      { persona_id: 'product-builder' },
      { persona_id: 'entrepreneur' },
    ],
  },
  {
    id: 'mlti-2025',
    company: 'Master Language & Tech Institute (MLTI)',
    position: 'Community Manager & Full Stack JS Developer',
    duration: 'April 2025–Present',
    start_date: '2025-04-01',
    end_date: undefined,
    type: 'Full-time',
    description:
      'Leading digital presence and community engagement strategy for MLTI. ' +
      'Built and deployed the institutional website using React and Framer Motion. ' +
      'Orchestrated social media growth (+140% engagement) and automated content workflows using n8n and AI tools.',
    skills: ['React', 'Framer Motion', 'n8n', 'Community Management', 'Content Strategy', 'Social Media', 'AI Automation'],
    sort_order: 2,
    created_at: new Date().toISOString(),
    experience_personas: [
      { persona_id: 'fullstack' },
      { persona_id: 'ai-engineer' },
      { persona_id: 'entrepreneur' },
    ],
  },
]
