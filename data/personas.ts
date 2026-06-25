import type { PersonaConfig } from '@/types/persona'

export const PERSONAS: ReadonlyArray<PersonaConfig> = [
  {
    id: 'fullstack',
    label: 'Full Stack Developer',
    description: 'End‑to‑end web development expertise.',
    theme: { accent: '#5e17eb', accentLight: '#ae6bf6', accentGlow: 'rgba(94,23,235,0.4)' },
  },
  {
    id: 'ai-engineer',
    label: 'AI Engineer',
    description: 'Machine learning, automation and RAG pipelines.',
    theme: { accent: '#7c3aed', accentLight: '#a78bfa', accentGlow: 'rgba(124,58,237,0.4)' },
  },
  {
    id: 'cloud-architect',
    label: 'Cloud & Architect',
    description: 'Infrastructure, AWS and scalability.',
    theme: { accent: '#0ea5e9', accentLight: '#38bdf8', accentGlow: 'rgba(14,165,233,0.4)' },
  },
  {
    id: 'product-builder',
    label: 'Product Builder',
    description: 'Digital product design and delivery.',
    theme: { accent: '#10b981', accentLight: '#34d399', accentGlow: 'rgba(16,185,129,0.4)' },
  },
  {
    id: 'entrepreneur',
    label: 'Tech Entrepreneur',
    description: 'Business, growth and market strategy.',
    theme: { accent: '#f59e0b', accentLight: '#fbbf24', accentGlow: 'rgba(245,158,11,0.4)' },
  },
] as const
