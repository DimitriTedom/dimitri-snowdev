export interface ServiceItem {
  id: string
  title: string
  tagline: string
  shortDescription: string
  description: string
  icon: 'code' | 'bot' | 'cloud' | 'layers' | 'palette' | 'cpu'
  features: string[]
  deliverables: string[]
  personas: string[]
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'fullstack-engineering',
    title: 'Full Stack Web Engineering',
    tagline: 'High-Performance & Scalable Web Applications',
    shortDescription:
      'End-to-end Next.js systems — APIs, interfaces, and databases engineered for real scale.',
    description:
      'End-to-end architecture and modern web application development using Next.js 15, React, TypeScript, and Supabase. Crafted with pixel-perfect responsive interfaces, robust backend APIs, and blazing-fast performance.',
    icon: 'code',
    features: [
      'Next.js 15 App Router & Server Components',
      'Secure PostgreSQL, Supabase & REST/GraphQL APIs',
      'Lighthouse 95+ performance, SEO & WCAG accessibility',
      'Automated CI/CD pipelines & Vercel deployment',
    ],
    deliverables: [
      'Production-ready web application',
      'Responsive design across mobile, tablet, and desktop',
      'Clean, modular, and documented codebase',
      'Post-launch warranty & technical handoff',
    ],
    personas: ['fullstack', 'product-builder', 'entrepreneur'],
  },
  {
    id: 'ai-engineering',
    title: 'AI Engineering & Automation',
    tagline: 'Intelligent Workflows & Autonomous Agents',
    shortDescription:
      'Custom LLM pipelines, RAG agents, and autonomous workflows that run in production.',
    description:
      'Seamless integration of state-of-the-art LLMs (Gemini, Claude, GPT-4, DeepSeek) into your business workflows. From semantic vector search (RAG) to custom autonomous agentic pipelines.',
    icon: 'bot',
    features: [
      'Retrieval-Augmented Generation (RAG) & Vector DBs',
      'Multi-agent autonomous workflows & tool calling',
      'Real-time streaming, token caching & low latency',
      'Custom prompt architecture & fine-tuning strategy',
    ],
    deliverables: [
      'AI assistant or automated workflow microservice',
      'Vector database setup & embedding ingestion pipeline',
      'API connectors and interactive test harness',
      'Evaluation benchmarks & cost-optimization report',
    ],
    personas: ['ai-engineer', 'fullstack', 'entrepreneur'],
  },
  {
    id: 'cloud-architecture',
    title: 'Cloud Architecture & DevOps',
    tagline: 'Resilient Infrastructure & Scalability',
    shortDescription:
      'Resilient, zero-downtime infrastructure. Containerized, secured, and monitored for scale.',
    description:
      'Design and deployment of highly available, secure, and cost-effective cloud systems. Leveraging AWS, Docker, Supabase, and edge networks to guarantee 99.9% uptime and friction-free scale.',
    icon: 'cloud',
    features: [
      'Serverless architectures & containerization (Docker)',
      'Row Level Security (RLS), OAuth & RBAC data policies',
      'Automated disaster recovery & zero-downtime rollouts',
      'Cloud cost optimization & performance telemetry',
    ],
    deliverables: [
      'Infrastructure as Code (IaC) or cloud topology',
      'Docker Compose & container deployment scripts',
      'Security audit report & access governance rules',
      'Real-time monitoring dashboard & alerting configuration',
    ],
    personas: ['cloud-architect', 'fullstack', 'product-builder'],
  },
  {
    id: 'mvp-engineering',
    title: 'MVP & Product Engineering',
    tagline: 'Rapid Prototyping & High-Velocity Execution',
    shortDescription:
      'Investor-ready MVPs built to validate hypotheses, onboard users, and scale seamlessly.',
    description:
      'From product discovery to functional SaaS deployment in record time. Clean modular architectures designed to accommodate rapid user feedback and future feature scaling without technical debt.',
    icon: 'layers',
    features: [
      'Rapid prototype-to-production sprint cycles',
      'Stripe payments, subscriptions & billing integrations',
      'Multi-tenant database modeling & authentication',
      'Product telemetry, posthog analytics & funnel tracking',
    ],
    deliverables: [
      'Full working MVP ready for public launch',
      'Interactive Figma prototypes & user journeys',
      'Self-healing automated deployment pipeline',
      'Product roadmap & technical scaling strategy',
    ],
    personas: ['product-builder', 'entrepreneur', 'fullstack'],
  },
  {
    id: 'creative-engineering',
    title: 'Creative UI/UX & Design Systems',
    tagline: 'Fluid Micro-Interactions & Modern Aesthetics',
    shortDescription:
      'High-craft design systems, dark-mode glassmorphism, and 60fps animations.',
    description:
      'Architectural typography, bespoke component libraries, and interactive 3D/canvas storytelling that captivate users and establish undeniable digital brand authority.',
    icon: 'palette',
    features: [
      '60fps GSAP, Framer Motion & Three.js canvas animations',
      'Tailored dark-mode glassmorphism & typography hierarchies',
      'Atomic design systems with Shadcn & Tailwind CSS',
      'Micro-interactions that elevate brand perception',
    ],
    deliverables: [
      'Comprehensive design token library & UI component kit',
      'Fluid interactive prototypes with zero frame drop',
      'Accessibility (a11y) & cross-browser audit',
      'Design handoff documentation & component showcase',
    ],
    personas: ['product-builder', 'fullstack', 'entrepreneur'],
  },
  {
    id: 'systems-architecture',
    title: 'Autonomous Systems & Architecture',
    tagline: 'Agentic Swarms & Microservice Topology',
    shortDescription:
      'Event-driven architectures, self-healing microservices, and multi-agent coordination.',
    description:
      'Architecting decentralized, event-driven backends and multi-agent coordination frameworks. Built with high-throughput message brokers, self-healing state machines, and resilient failover topologies.',
    icon: 'cpu',
    features: [
      'Multi-agent swarm orchestration & state persistence',
      'Event-driven microservices & WebSocket messaging',
      'High-throughput distributed caching & Redis pub/sub',
      'Fault-tolerant distributed system telemetry & tracing',
    ],
    deliverables: [
      'Production autonomous agent framework',
      'Microservice architecture blueprint & Docker swarm',
      'State persistence schema & Redis event bus',
      'Distributed telemetry & performance dashboard',
    ],
    personas: ['ai-engineer', 'cloud-architect', 'fullstack'],
  },
]
