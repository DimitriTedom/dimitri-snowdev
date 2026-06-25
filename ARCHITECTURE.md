# ARCHITECTURE.md — SnowDev V2 Portfolio
> **Document de référence expert** — Aligné sur le Cahier des Charges V1.0 (21 Juin 2026).
> Ne pas dévier sans approbation explicite.

**Stack officielle (CdC §8) :**
Next.js 15+ (App Router) · TypeScript 5 · TailwindCSS · GSAP · Three.js · Framer Motion 12
21st.dev · Reactbits · Shadcn UI · Magic UI · Supabase + PostgreSQL + Supabase Storage
Supabase Auth · MDX/Content Collections · Vercel · Gemini (AI) · DeepSeek V3 (RAG) · n8n

---

## 1. Vision & Concept Central

> "Créer un portfolio nouvelle génération représentant non seulement un développeur Full Stack, mais également un AI Builder, Cloud Engineer, Product Builder et Entrepreneur Tech."

Le portfolio SnowDev V2 est une application **multi-persona dynamique** : le visiteur bascule entre profils via un **bouton flottant sticky**. Chaque profil modifie automatiquement :
- Les couleurs de l'interface (thème par persona)
- Les compétences affichées
- Les projets mis en avant
- Les certifications présentées
- Les statistiques affichées
- Le CV généré (export PDF ciblé)

---

## 2. Personas (CdC §2)

| Persona ID | Titre Officiel (CdC) | Ancienne dénomination V1 |
|---|---|---|
| `fullstack` | Full Stack Developer | ✅ Full Stack JS Developer |
| `ai-engineer` | AI Engineer | ✅ AI & Automation Engineer |
| `cloud-architect` | Cloud & AWS Architect | ✅ Cloud Architect |
| `product-builder` | Digital Product Builder | ⚠️ Manquait (était "graphic-designer") |
| `entrepreneur` | Tech Entrepreneur | ⚠️ Manquait (nouveau) |

> **Note migration** : Les personas `uiux-designer` et `graphic-designer` sont absorbés par `product-builder`. La V1 avait 5 personas incorrects ; ceux-ci sont les 5 officiels du CdC.

### Logique de changement de persona
```
Bouton flottant sticky (coin bas-droite ou sidebar)
    ↓ clic persona
Changement immédiat :
  - Couleur accent du thème  (CSS variable swap)
  - Contenu hero (titre, tagline, skills highlights)
  - Grille projets filtrée
  - Section compétences réorganisée
  - CV téléchargeable recalculé
```

---

## 3. Arborescence Next.js 15 App Router

```
dimitri-snowdev/
├── app/
│   ├── layout.tsx                        # Root layout — Server Component
│   ├── page.tsx                          # → Redirect vers (portfolio)/
│   ├── not-found.tsx
│   ├── globals.css
│   │
│   ├── (portfolio)/                      # Route Group — Portfolio public
│   │   ├── layout.tsx                    # Navbar + PersonaProvider + SidebarSocials
│   │   ├── page.tsx                      # Homepage Hero + sections dynamiques
│   │   │
│   │   ├── about/page.tsx                # À propos + Learning Journey + Timeline
│   │   │
│   │   ├── projects/
│   │   │   ├── page.tsx                  # Catalogue avancé (filtres + CRUD-like)
│   │   │   └── [slug]/page.tsx           # Case Study détaillé
│   │   │
│   │   ├── services/page.tsx             # Services par persona
│   │   │
│   │   ├── skills/page.tsx               # Tech Radar interactif + Skills cloud
│   │   │
│   │   ├── architecture/page.tsx         # Architecture Gallery (Phase 3)
│   │   │   # Galerie de diagrammes système, Architecture Showcase
│   │   │
│   │   ├── lab/page.tsx                  # Startup Lab + Now Building + Roadmap publique
│   │   │
│   │   ├── ecosystem/page.tsx            # Digital Ecosystem + visualisation SnowDev
│   │   │
│   │   ├── blog/
│   │   │   ├── page.tsx                  # Blog technique (CRUD via MDX + Supabase)
│   │   │   └── [slug]/page.tsx           # Article (MDX rendu)
│   │   │
│   │   ├── testimonials/page.tsx         # Témoignages (CRUD)
│   │   │
│   │   ├── achievements/page.tsx         # Certifications + Learning Journey
│   │   │
│   │   ├── cv/
│   │   │   └── page.tsx                  # CV Intelligent — aperçu + génération PDF
│   │   │
│   │   └── contact/page.tsx              # Formulaire de contact premium
│   │
│   ├── chat/
│   │   └── page.tsx                      # Assistant IA "Chat with Dimitri" (Phase 4)
│   │                                     # Gemini + RAG DeepSeek V3 via n8n
│   │
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── callback/route.ts
│   │
│   ├── dashboard/                        # CMS Admin — routes protégées
│   │   ├── layout.tsx
│   │   ├── page.tsx                      # Tableau de bord des métriques
│   │   ├── projects/
│   │   │   ├── page.tsx                  # CRUD projets
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx                  # CRUD articles blog
│   │   │   └── new/page.tsx
│   │   ├── testimonials/
│   │   │   └── page.tsx                  # CRUD témoignages
│   │   ├── cv/
│   │   │   └── page.tsx                  # Gestion templates CV par persona
│   │   └── metrics/
│   │       └── page.tsx                  # Dashboard métriques (analytics)
│   │
│   └── api/
│       ├── projects/route.ts
│       ├── contact/route.ts              # Email via Resend
│       ├── cv/generate/route.ts          # Génération CV PDF (puppeteer/react-pdf)
│       ├── ai/chat/route.ts              # Chat IA Dimitri (Gemini + RAG)
│       ├── ai/match-cv/route.ts          # Matching offre ↔ CV (Phase 5)
│       ├── ai/analyze-job/route.ts       # Analyse offre d'emploi (Phase 5)
│       └── revalidate/route.ts
│
├── components/
│   ├── ui/                               # Shadcn UI — ne pas modifier directement
│   ├── magicui/                          # Magic UI components
│   ├── reactbits/                        # Reactbits components
│   │   └── (components issus de reactbits.dev)
│   ├── 21stdev/                          # 21st.dev components
│   │
│   ├── layout/
│   │   ├── Navbar.tsx                    # 'use client' — pill glassmorphism
│   │   ├── Footer.tsx                    # Server Component
│   │   ├── SidebarSocials.tsx            # 'use client' — dock social fixe gauche
│   │   └── PersonaFloatingButton.tsx     # 'use client' — STICKY BUTTON (concept CdC)
│   │
│   ├── persona/
│   │   ├── PersonaProvider.tsx           # 'use client' — Context Provider
│   │   ├── PersonaSwitcher.tsx           # 'use client' — modal/popover de sélection
│   │   └── PersonaThemeInjector.tsx      # 'use client' — injecte CSS vars du thème
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx               # 'use client' — GSAP + Three.js + Framer
│   │   ├── ProjectsCatalogue.tsx         # Server shell + Client filters
│   │   ├── CaseStudySection.tsx          # Server Component
│   │   ├── SkillsRadar.tsx               # 'use client' — Tech Radar interactif (D3/GSAP)
│   │   ├── Timeline.tsx                  # 'use client' — Scroll-driven storytelling
│   │   ├── LearningJourney.tsx           # 'use client' — progression visuelle
│   │   ├── NowBuilding.tsx               # Server Component
│   │   ├── RoadmapPublique.tsx           # Server Component
│   │   ├── ArchitectureGallery.tsx       # 'use client' — galerie diagrammes système
│   │   ├── StartupLab.tsx               # Server Component
│   │   ├── DigitalEcosystem.tsx          # 'use client' — visualisation graphe
│   │   ├── TestimonialsSection.tsx       # Server Component
│   │   ├── MetricsDashboard.tsx          # 'use client' — stats temps réel
│   │   └── ContactSection.tsx            # 'use client' — form premium
│   │
│   ├── cv/
│   │   ├── CVPreview.tsx                 # 'use client' — aperçu CV par persona
│   │   ├── CVTemplate.tsx               # React-PDF template
│   │   └── CVDownloadButton.tsx         # 'use client'
│   │
│   ├── ai/
│   │   ├── ChatWidget.tsx               # 'use client' — Chat with Dimitri
│   │   ├── JobAnalyzer.tsx              # 'use client' — analyse offre (Phase 5)
│   │   └── CVMatcher.tsx                # 'use client' — matching CV ↔ Offre
│   │
│   ├── three/                            # Three.js components
│   │   ├── HeroCanvas.tsx               # 'use client' — scène 3D hero
│   │   ├── TechOrb.tsx                  # 'use client' — orbe tech 3D
│   │   └── ParticleField.tsx            # 'use client' — champ de particules
│   │
│   └── providers/
│       ├── PersonaProvider.tsx
│       └── ThemeProvider.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── server.ts                     ← existant ✅
│   │   ├── client.ts                     ← existant ✅
│   │   └── middleware.ts                 ← existant ✅
│   ├── prisma.ts                         ← existant ✅
│   ├── utils.ts                          ← existant ✅
│   ├── validations.ts                    ← existant ✅
│   ├── persona.ts                        # getServerPersona(), thème par persona
│   ├── cv-generator.ts                   # Logique génération CV par persona
│   ├── mdx.ts                            # Configuration MDX pour le blog
│   └── ai/
│       ├── gemini.ts                     # Client Gemini pour Chat IA
│       ├── deepseek.ts                   # Client DeepSeek V3 pour RAG
│       └── n8n-webhook.ts               # Webhooks n8n pour workflows IA
│
├── hooks/
│   ├── usePersona.ts
│   ├── useScrollProgress.ts             # Scroll-driven animations
│   ├── useActiveSection.ts
│   └── useGSAP.ts                       # Hook GSAP avec cleanup
│
├── content/                              # MDX Content Collections (Blog)
│   ├── blog/
│   │   └── *.mdx
│   └── case-studies/
│       └── *.mdx
│
├── types/
│   ├── persona.ts
│   ├── project.ts
│   ├── experience.ts
│   ├── achievement.ts
│   ├── blog.ts                           # Post, PostMeta
│   ├── testimonial.ts
│   ├── cv.ts                             # CVData, CVSection
│   └── database.ts                       # Types Supabase générés
│
├── data/
│   ├── projects.ts                       # ← Migration V1
│   ├── experiences.ts
│   ├── achievements.ts
│   ├── skills.ts
│   ├── personas.ts                       # Config personas + thèmes couleurs
│   └── profile.ts                        # Données biographiques publiques
│
├── public/
│   ├── images/
│   │   ├── projects/
│   │   ├── achievements/
│   │   ├── diagrams/                     # Architecture diagrams
│   │   └── avatar/
│   ├── fonts/
│   └── cv/                               # Templates CV statiques (fallback)
│
├── supabase/
│   ├── config.toml                       ← existant ✅
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_portfolio_content.sql
│   │   ├── 003_blog_testimonials.sql
│   │   └── 004_rls_policies.sql
│   └── seed.sql
│
├── middleware.ts                         ← existant ✅ (à étendre)
├── next.config.ts                        ← existant ✅
├── tailwind.config.ts
├── tsconfig.json
├── components.json
├── ARCHITECTURE.md                       ← CE FICHIER
├── DESIGN_SYSTEM.md
└── DATA_MAPPING.md
```

---

## 4. Règles Strictes : Server vs Client Components

| Besoin | Directive | Raison |
|---|---|---|
| Fetch data Supabase / Prisma | **Server** | Pas d'exposition de credentials |
| GSAP animations, ScrollTrigger | **'use client'** | APIs browser (requestAnimationFrame) |
| Three.js (WebGL, Canvas) | **'use client'** | APIs browser (WebGL context) |
| Framer Motion animations | **'use client'** | APIs browser |
| Hooks React (useState, useEffect) | **'use client'** | Runtime browser uniquement |
| Formulaires (react-hook-form) | **'use client'** | Interaction utilisateur |
| Rendu HTML statique / SEO | **Server** | TTI optimal, indexable |
| Context API (PersonaProvider) | **'use client'** | State partagé |
| Chat IA (streaming) | **'use client'** | ReadableStream browser |
| MDX Blog articles | **Server** | Rendu statique optimal |
| Génération CV (react-pdf) | **'use client'** ou **API Route** | Dépend de l'implémentation |
| generateMetadata SEO | **Server** | Export async depuis page.tsx |

### Anti-Patterns Interdits ❌
- ❌ `'use client'` sur `app/layout.tsx`
- ❌ Import Supabase server client dans un Client Component
- ❌ `useEffect` pour data fetching
- ❌ Three.js / GSAP côté serveur
- ❌ Variables d'env secrètes exposées dans `NEXT_PUBLIC_*`

---

## 5. State Management — Système Multi-Persona

### Sources de vérité (triple)
1. **URL Search Param** `?persona=fullstack` — SSR, bookmarkable
2. **React Context** — transitions fluides sans rechargement
3. **Cookie** `snowdev_persona` — persistance sessions

### Impact d'un changement de persona
```
setPersona('cloud-architect')
    ↓
1. Cookie mis à jour
2. URL param mis à jour (router.push)
3. CSS variables thème injectées (accent-color, bg-elevated)
4. Contenu filtré (projets, skills, certifications)
5. Hero title/tagline mis à jour
6. CV template sélectionné correspondant
```

### Thème par persona (CSS Variables dynamiques)
```ts
// data/personas.ts
export const PERSONA_THEMES = {
  'fullstack':       { accent: '#5e17eb', accentLight: '#ae6bf6', accentGlow: 'rgba(94,23,235,0.4)' },
  'ai-engineer':     { accent: '#7c3aed', accentLight: '#a78bfa', accentGlow: 'rgba(124,58,237,0.4)' },
  'cloud-architect': { accent: '#0ea5e9', accentLight: '#38bdf8', accentGlow: 'rgba(14,165,233,0.4)' },
  'product-builder': { accent: '#10b981', accentLight: '#34d399', accentGlow: 'rgba(16,185,129,0.4)' },
  'entrepreneur':    { accent: '#f59e0b', accentLight: '#fbbf24', accentGlow: 'rgba(245,158,11,0.4)' },
}
```

---

## 6. Base de Données Supabase (PostgreSQL 17)

```sql
-- ============================================================
-- PERSONAS
-- ============================================================
CREATE TABLE personas (
  id           TEXT PRIMARY KEY,          -- 'fullstack', 'ai-engineer', 'cloud-architect', 'product-builder', 'entrepreneur'
  label        TEXT NOT NULL,
  description  TEXT,
  icon         TEXT,
  accent_color TEXT,
  theme_config JSONB,                     -- Stocke les tokens de thème complets
  sort_order   INTEGER DEFAULT 0,
  is_active    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- PROJECTS
-- ============================================================
CREATE TABLE projects (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  description   TEXT,
  challenge     TEXT,
  solution      TEXT,
  result        TEXT,
  case_study    TEXT,                     -- Contenu long (Markdown/MDX) pour case studies
  category      TEXT NOT NULL,
  tags          TEXT[] DEFAULT '{}',
  image_url     TEXT,
  image_url_2   TEXT,
  image_url_3   TEXT,
  video_url     TEXT,                     -- Google Veo3 showcase videos
  demo_url      TEXT,
  code_url      TEXT,
  date          DATE,
  featured      BOOLEAN DEFAULT false,
  sort_order    INTEGER DEFAULT 0,
  is_published  BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE project_personas (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  persona_id TEXT REFERENCES personas(id) ON DELETE CASCADE,
  relevance  INTEGER DEFAULT 1,           -- 1=secondaire, 2=principal
  PRIMARY KEY (project_id, persona_id)
);

-- ============================================================
-- EXPERIENCES
-- ============================================================
CREATE TABLE experiences (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company     TEXT NOT NULL,
  position    TEXT NOT NULL,
  duration    TEXT NOT NULL,
  start_date  DATE,
  end_date    DATE,
  type        TEXT DEFAULT 'Part-time',
  description TEXT,
  skills      TEXT[] DEFAULT '{}',
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE experience_personas (
  experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
  persona_id    TEXT REFERENCES personas(id) ON DELETE CASCADE,
  PRIMARY KEY (experience_id, persona_id)
);

-- ============================================================
-- SKILLS
-- ============================================================
CREATE TABLE skills (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  category    TEXT NOT NULL,
  icon_slug   TEXT,
  proficiency INTEGER DEFAULT 80,
  sort_order  INTEGER DEFAULT 0
);
CREATE TABLE skill_personas (
  skill_id   UUID REFERENCES skills(id) ON DELETE CASCADE,
  persona_id TEXT REFERENCES personas(id) ON DELETE CASCADE,
  PRIMARY KEY (skill_id, persona_id)
);

-- ============================================================
-- ACHIEVEMENTS
-- ============================================================
CREATE TABLE achievements (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  description  TEXT,
  provider     TEXT NOT NULL,
  category     TEXT NOT NULL,
  date         TEXT,
  duration     TEXT,
  image_url    TEXT,
  verify_url   TEXT,
  is_published BOOLEAN DEFAULT true,
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- BLOG POSTS (MDX + Supabase metadata)
-- ============================================================
CREATE TABLE blog_posts (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  excerpt      TEXT,
  mdx_path     TEXT,                      -- Chemin vers fichier MDX local
  cover_url    TEXT,
  tags         TEXT[] DEFAULT '{}',
  persona_id   TEXT REFERENCES personas(id),
  published    BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- TESTIMONIALS
-- ============================================================
CREATE TABLE testimonials (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author      TEXT NOT NULL,
  position    TEXT,
  company     TEXT,
  avatar_url  TEXT,
  content     TEXT NOT NULL,
  rating      INTEGER DEFAULT 5,
  persona_id  TEXT REFERENCES personas(id),
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- SERVICES
-- ============================================================
CREATE TABLE services (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  persona_id  TEXT REFERENCES personas(id),
  title       TEXT NOT NULL,
  description TEXT,
  features    TEXT[] DEFAULT '{}',
  price_label TEXT,
  icon        TEXT,
  sort_order  INTEGER DEFAULT 0,
  is_active   BOOLEAN DEFAULT true
);

-- ============================================================
-- CV_TEMPLATES (CV Intelligent par persona)
-- ============================================================
CREATE TABLE cv_templates (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  persona_id  TEXT UNIQUE REFERENCES personas(id),
  title       TEXT NOT NULL,             -- 'Dimitri Tedom — Full Stack Developer'
  objective   TEXT,                      -- Résumé adapté au persona
  highlighted_skills TEXT[] DEFAULT '{}',
  highlighted_projects UUID[] DEFAULT '{}',
  highlighted_achievements TEXT[] DEFAULT '{}',
  custom_sections JSONB,                 -- Sections supplémentaires flexibles
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- CONTACT_SUBMISSIONS
-- ============================================================
CREATE TABLE contact_submissions (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  message     TEXT NOT NULL,
  persona_ref TEXT,
  status      TEXT DEFAULT 'new',
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- AI_CHAT_SESSIONS (Chat with Dimitri)
-- ============================================================
CREATE TABLE ai_chat_sessions (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id  TEXT UNIQUE NOT NULL,
  persona_ref TEXT,
  messages    JSONB DEFAULT '[]',        -- Array de {role, content, timestamp}
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Lecture publique portfolio
CREATE POLICY "Public read published projects" ON projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public read published blog" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read published testimonials" ON testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public insert contact" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Écriture admin
CREATE POLICY "Admin write projects" ON projects FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin write blog" ON blog_posts FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin write testimonials" ON testimonials FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin read contact" ON contact_submissions FOR SELECT USING (auth.uid() IS NOT NULL);

-- ============================================================
-- TRIGGERS updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- INDEX
-- ============================================================
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_published ON projects(is_published, sort_order);
CREATE INDEX idx_project_personas ON project_personas(persona_id, relevance DESC);
CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_persona ON blog_posts(persona_id, published_at DESC);
```

---

## 7. Roadmap de Réalisation (CdC §9)

| Phase | Contenu | Status |
|---|---|---|
| **Phase 1** | Portfolio Multi-Persona (Hero, Projets, Skills, Timeline, Contact) | 🚀 Active |
| **Phase 2** | CV Intelligent (génération PDF dynamique par persona) | ⏳ Pending |
| **Phase 3** | Dashboard & Architecture Gallery (CMS, diagrammes système) | ⏳ Pending |
| **Phase 4** | Assistant IA "Chat with Dimitri" (Gemini + RAG DeepSeek V3 + n8n) | ⏳ Pending |
| **Phase 5** | Analyse d'offres d'emploi + Génération CV personnalisés ciblés | ⏳ Pending |

---

## 8. Architecture IA (Phases 4 & 5)

```
Utilisateur → Chat with Dimitri
    ↓
API Route /api/ai/chat
    ↓
n8n Workflow orchestration
    ↓
DeepSeek V3 (RAG sur données portfolio Dimitri)  +  Gemini API (génération réponse)
    ↓
Streaming response → Client component <ChatWidget>

Phase 5 — Analyse offre emploi :
Utilisateur colle une offre → /api/ai/analyze-job
    ↓
LLM analyse offre → extrait keywords, requis, stack
    ↓
Matching avec CV par persona → score de compatibilité
    ↓
Génération CV PDF ciblé → Supabase Storage → lien de téléchargement
```

---

## 9. Modules Différenciants (CdC §6)

| Module | Route | Type | Phase |
|---|---|---|---|
| Learning Journey | `/about` | Section dans About | 1 |
| Roadmap publique | `/lab` | Page dédiée | 1 |
| Now Building | `/lab` | Section dans Lab | 1 |
| Architecture Showcase | `/architecture` | Page dédiée | 3 |
| Galerie de diagrammes système | `/architecture` | Grille interactive | 3 |
| Historique des projets | `/projects` | Catalogue filtrable | 1 |
| Visualisation écosystème SnowDev | `/ecosystem` | Graphe interactif (D3/Three.js) | 2 |
| Blog technique (CRUD) | `/blog` | MDX + Supabase | 2 |
| Témoignages (CRUD) | `/testimonials` | Supabase CRUD | 1 |
| Dashboard métriques | `/dashboard/metrics` | Charts temps réel | 3 |

---

## 10. Variables d'Environnement

| Variable | Description | Phase |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL projet Supabase | P1 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anon | P1 |
| `DATABASE_URL` | Prisma pooler URL | P1 |
| `DIRECT_URL` | Prisma direct URL | P1 |
| `NEXT_PUBLIC_SITE_URL` | URL publique | P1 |
| `RESEND_API_KEY` | Emails contact | P1 |
| `GEMINI_API_KEY` | Google Gemini | P4 |
| `DEEPSEEK_API_KEY` | DeepSeek V3 RAG | P4 |
| `N8N_WEBHOOK_URL` | n8n orchestration | P4 |
| `N8N_API_KEY` | Auth n8n | P4 |
| `SUPABASE_SERVICE_ROLE_KEY` | Storage admin | P2 |

---

## 11. Conventions de Code

### Nommage
- **Composants** : PascalCase (`ProjectCard.tsx`)
- **Hooks** : camelCase préfixé `use` (`usePersona.ts`)
- **Types** : PascalCase (`PersonaId`, `ProjectWithPersonas`)
- **Constants** : SCREAMING_SNAKE_CASE (`PERSONA_THEMES`, `VALID_PERSONAS`)

### Path Aliases (tsconfig.json)
```json
{
  "paths": {
    "@/*": ["./*"],
    "@/components/*": ["./components/*"],
    "@/lib/*": ["./lib/*"],
    "@/hooks/*": ["./hooks/*"],
    "@/types/*": ["./types/*"],
    "@/data/*": ["./data/*"],
    "@/content/*": ["./content/*"]
  }
}
```

### Middleware (extension du fichier existant)
```ts
// Injecter persona dans headers pour usage downstream
const persona = request.cookies.get('snowdev_persona')?.value || 'fullstack'
response.headers.set('x-persona', isValidPersona(persona) ? persona : 'fullstack')
```
