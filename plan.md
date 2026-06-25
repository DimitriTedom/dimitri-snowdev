# PLAN.md — SnowDev V2 Portfolio : Feuille de Route Complète
> **Basé sur** : Cahier des Charges V1.0 (21 Juin 2026) · ARCHITECTURE.md · DESIGN_SYSTEM.md · DATA_MAPPING.md
> **Principe** : Diviser pour mieux régner — Chaque objectif est autonome, livrable et testable.
> **Infra** : Supabase local via Docker déjà actif ✅ · Vercel déploiement cible

---

## 📦 État Initial du Projet (Baseline)

### Ce qui existe déjà ✅
- Next.js 15 App Router + TypeScript configuré
- Supabase SSR client (`lib/supabase/server.ts`, `client.ts`, `middleware.ts`)
- Prisma 6 avec schéma User + Profile
- Shadcn UI (button, card, dialog, form, input, label, sonner)
- Magic UI (interactive-grid-pattern, typing-animation, number-ticker)
- Framer Motion 12, Lucide React, Zod, React Hook Form
- Auth flow complet (login, register, callback, logout, account)
- Docker + Docker Compose configuré
- **Supabase local Docker actif** (Storage inclus)

### Ce qui est à installer (par phase, au fil du besoin)
> On n'installe que ce dont on a besoin à l'étape courante — pas d'over-engineering.

---

## 🗂️ Vue d'ensemble des 5 Phases

| Phase | Contenu | Durée estimée | Priorité |
|---|---|---|---|
| **Phase 1** | Fondations + Portfolio Multi-Persona (core) | Sprint 1-3 | 🔴 CRITIQUE |
| **Phase 2** | CV Intelligent + Blog + Modules complémentaires | Sprint 4-5 | 🟠 HAUTE |
| **Phase 3** | Dashboard CMS + Architecture Gallery + Métriques | Sprint 6-7 | 🟡 MOYENNE |
| **Phase 4** | Assistant IA "Chat with Dimitri" | Sprint 8 | 🟢 AVANCÉ |
| **Phase 5** | Analyse d'offres d'emploi + Génération CV ciblé | Sprint 9 | 🔵 PREMIUM |

---

# ═══════════════════════════════════════════
# PHASE 1 — Portfolio Multi-Persona (Core)
# ═══════════════════════════════════════════

## 🎯 Objectif 1 : Fondations Design System & Configuration Globale

**But** : Remplacer le starter générique par l'identité SnowDev "Dark Tech Premium". C'est le socle de tout le reste.

### Tâches

#### 1.1 — Migration `globals.css` + Tailwind Config
- Remplacer `styles/globals.css` par le design system SnowDev (cf. `DESIGN_SYSTEM.md §3`)
- Migrer `tailwind.config.js` → `tailwind.config.ts` avec tous les tokens custom (couleurs, fonts, animations, shadows)
- Déplacer `app/globals.css` (importer depuis `app/layout.tsx` directement)

#### 1.2 — Installation Google Fonts via Next.js
- Configurer `Space_Grotesk`, `Inter`, `JetBrains_Mono` dans `app/layout.tsx`
- Variables CSS : `--font-display`, `--font-sans`, `--font-mono`

#### 1.3 — Mise à jour `app/layout.tsx`
- Intégrer les providers : `ThemeProvider` (déjà existant) + `PersonaProvider` (à créer)
- Métadonnées SEO globales (`generateMetadata` avec Open Graph, Twitter Card)
- Dark mode forcé (`forcedTheme="dark"` pour next-themes)

#### 1.4 — Nettoyage du `app/page.tsx`
- Vider le contenu starter (Interactive Grid Pattern générique)
- Préparer le shell pour accueillir la `HeroSection`

**Skills utilisés** :
- `nextjs-app-router-fundamentals` — layout.tsx, providers, metadata
- `nextjs-server-client-components` — séparation server/client
- `shadcn` — adaptation des CSS variables Shadcn au design system SnowDev
- `ui-ux-pro-max` — tokens de design, hiérarchie visuelle
- `high-end-visual-design` — palette Dark Tech, glassmorphism, animations CSS

---

## 🎯 Objectif 2 : Système Multi-Persona

**But** : Implémenter le moteur central du portfolio — le système qui permet à tout le contenu de s'adapter selon le persona actif.

### Tâches

#### 2.1 — Types TypeScript Personas
- Créer `types/persona.ts` — `PersonaId`, `PersonaConfig`, `PERSONAS` constant
- Les 5 personas officiels (CdC) : `fullstack`, `ai-engineer`, `cloud-architect`, `product-builder`, `entrepreneur`
- Thèmes couleurs par persona dans `PERSONA_THEMES`

#### 2.2 — `PersonaProvider` (Context React)
- Créer `components/providers/PersonaProvider.tsx`
- Triple source de vérité : URL param + React Context + Cookie
- `useTransition` pour les transitions fluides
- Injection CSS variables dynamiques (`--accent`, `--accent-light`, `--accent-glow`)

#### 2.3 — `usePersona` Hook
- Créer `hooks/usePersona.ts`
- Expose : `activePersona`, `personaConfig`, `setPersona`, `isPending`, `allPersonas`

#### 2.4 — `getServerPersona` (lib server-side)
- Créer `lib/persona.ts`
- Lecture persona depuis : searchParam > cookie > default `fullstack`
- `isValidPersona()`, `getServerPersona()`

#### 2.5 — `PersonaFloatingButton` (Sticky Switcher — concept clé du CdC)
- Créer `components/layout/PersonaFloatingButton.tsx` — `'use client'`
- Bouton flottant sticky (coin bas-droite)
- Popover/modal avec les 5 personas, icônes Lucide, couleur accent par persona
- Animation Framer Motion (AnimatePresence, scale in/out)

**Skills utilisés** :
- `nextjs-server-client-components` — séparation Provider/Hook/Server util
- `nextjs-use-search-params-suspense` — gestion URL params persona
- `nextjs-client-cookie-pattern` — persistance cookie snowdev_persona
- `nextjs-server-navigation` — router.push() avec searchParams

---

## 🎯 Objectif 3 : Base de Données Supabase (Migrations)

**But** : Créer le schéma complet de la base de données locale (Docker actif) et le peupler avec les données migrées de la V1.

### Tâches

#### 3.1 — Migrations SQL
Créer les fichiers dans `supabase/migrations/` :
- `001_personas.sql` — Table personas + seed des 5 personas
- `002_projects.sql` — Table projects + project_personas
- `003_experiences_skills.sql` — Tables experiences, experience_personas, skills, skill_personas
- `004_achievements.sql` — Table achievements
- `005_blog_testimonials.sql` — Tables blog_posts, testimonials
- `006_services_cv.sql` — Tables services, cv_templates
- `007_contact_ai.sql` — Tables contact_submissions, ai_chat_sessions
- `008_rls_policies.sql` — Toutes les politiques RLS
- `009_indexes.sql` — Index de performance

#### 3.2 — Seed Data (Migration V1)
- Créer `supabase/seed.sql` — insertion de toutes les données V1 migrées
- 15 projets avec leurs personas recalculés (nouveaux IDs)
- 2 expériences, 10 achievements, skills catégorisés

#### 3.3 — Data Layer TypeScript
- Créer `data/personas.ts` — Config `PERSONAS` complète
- Créer `data/projects.ts` — 15 projets migrés V1 avec nouveaux persona IDs
- Créer `data/experiences.ts` — 2 expériences
- Créer `data/achievements.ts` — 10 certifications
- Créer `data/skills.ts` — Skills catégorisés par persona
- Créer `data/profile.ts` — Données biographiques Dimitri

#### 3.4 — Supabase Storage Buckets (Docker local)
- Créer les buckets via Supabase CLI ou dashboard local :
  - `project-images`, `achievements`, `avatars`, `architecture-diagrams`, `cv-exports`, `showcase-videos`
- Configurer les politiques de storage (lecture publique pour images portfolio)

#### 3.5 — Génération Types TypeScript Supabase
- `npx supabase gen types typescript --local > types/database.ts`
- Créer les types manuels : `types/project.ts`, `types/experience.ts`, `types/achievement.ts`, `types/blog.ts`, `types/testimonial.ts`, `types/cv.ts`, `types/ai.ts`

**Skills utilisés** :
- `supabase` — migrations, RLS, client server/browser
- `supabase-postgres-best-practices` — index, RLS policies, triggers, JSONB
- `nextjs-app-router-fundamentals` — Server Components + data fetching pattern

---

## 🎯 Objectif 4 : Navbar + Layout Principal

**But** : Créer la navigation "capsule pill glassmorphism" inspirée d'aerukart.com, avec le PersonaSwitcher intégré.
ALAWAYS USE THE ui-ux-pro-max skill, always use the 21st.dev mcp server here, if it's not responding, stop and try luchning it and alert user.
### Tâches

#### 4.1 — `Navbar.tsx`
- Créer `components/layout/Navbar.tsx` — `'use client'`
- Style : capsule pill flottante centrée, glassmorphism (`glass-md`)
- Logo SnowDev (gauche) + liens (Projets, Services, À propos, Contact) + CTA "Start a project" (droite)
- Lien actif mis en valeur (gradient violet)
- Hook `useScrollPosition` : Navbar apparaît/disparaît selon direction du scroll

#### 4.2 — `SidebarSocials.tsx`
- Créer `components/layout/SidebarSocials.tsx` — `'use client'`
- Dock social fixe à gauche (verticalement centré)
- Icônes : GitHub, LinkedIn, Instagram, Behance
- Style circulaire glassmorphism, hover avec glow violet

#### 4.3 — `Footer.tsx`
- Créer `components/layout/Footer.tsx` — Server Component
- Liens sociaux, copyright, navigation rapide

#### 4.4 — Route Group `(portfolio)/layout.tsx`
- Créer `app/(portfolio)/layout.tsx`
- Composer : `PersonaProvider` + `Navbar` + `SidebarSocials` + `Footer` + `PersonaFloatingButton`
- `Suspense` boundary autour de `PersonaProvider` (nécessaire pour `useSearchParams`)

**Skills utilisés** :
- `nextjs-app-router-fundamentals` — Route Groups, layout nesting
- `nextjs-server-client-components` — Server layout shell + Client components
- `shadcn` — composition avec primitives Shadcn
- `ui-ux-pro-max` — design navbar capsule, glassmorphism
- `high-end-visual-design` — effets hover, transitions

---

## 🎯 Objectif 5 : Hero Section Dynamique

**But** : Créer la section hero multi-persona avec animations premium GSAP/Framer Motion et éléments 3D décoratifs.
utilise le skill ui-ux-pro-max
### Tâches
POUR COMMENCER, INSPIRE TOI DU DESIGN DE https://aerukart.com/ pour la partie hero, utilise les assets de reactbits.dev pour t'aider si besoin en installant leur mcp, ou alors magic ui, sache aussi que l'ia antigravity a des outils pour t'aider avec les 3d. et que le dossier ../inspiration contient des captures d'ecran du site de https://aerukart.com/  qui pourraient t'inspirer. et c'est aussi le dossier obtenu en convertissant sont site en zip, . Le dossier ../New assets contien la   video glassmorp adapté a notre brand avec le style inspiré de celle de aerukart.com, ainsi que le logoMark que nus allons utiliser dans notre nav bar.

implémente la d'abord comme celle de aerukart.com, en utilisant les assets que j'ai mis a disposition.  ensuite, si je juge vais juger le rendu et te laisser implémenter les étapes qui suivent : 
#### 5.1 — Installation dépendances Hero
```bash
npm install gsap @gsap/react three @react-three/fiber @react-three/drei
```

#### 5.2 — `HeroSection.tsx`
- Créer `components/sections/HeroSection.tsx` — `'use client'`
- Layout : eyebrow text (catégorie persona animée) + titre géant + tagline + CTA buttons
- **Titre dynamique** selon persona actif (transition Framer Motion AnimatePresence)
- Background : Meteors (Magic UI) + gradient radial violet subtil
- Éléments décoratifs 3D en arrière-plan (objets géométriques iridescents, inspiré aerukart)

#### 5.3 — `TechOrb.tsx` (Three.js)
- Créer `components/three/TechOrb.tsx` — `'use client'`
- Sphère 3D holographique animée (wireframe, matériau iridescent)
- Positionné en arrière-plan droit du hero
- `useFrame` pour rotation continue
- `Suspense` + `Canvas` de `@react-three/fiber`

#### 5.4 — Animations GSAP Hero entrance
- Hook `useGSAP` pour l'animation d'entrée du hero
- Stagger : eyebrow → titre → tagline → boutons (séquence fluide)

#### 5.5 — Intégration dans `app/(portfolio)/page.tsx`
- Server Component, données persona lues côté serveur via `getServerPersona()`
- Passer `defaultPersona` au `HeroSection`

**Skills utilisés** :
- `nextjs-server-client-components` — Server page + Client hero
- `nextjs-use-search-params-suspense` — lecture persona sans blocking
- `ui-ux-pro-max` — layout hero, typographie architecturale, CTA design
- `high-end-visual-design` — animations d'entrée, Three.js décoration, Meteors

---

## 🎯 Objectif 6 : Section Projets (Catalogue + Cards)

**But** : Créer la grille de projets filtrée par persona avec les cards glassmorphism style aerukart.

### Tâches

#### 6.1 — `ProjectCard.tsx`
- Créer `components/cards/ProjectCard.tsx` — Server Component
- Style exact aerukart : image `border-radius: 25px`, badges `#1d1d1d`, titre uppercase
- Hover : lift effect Framer Motion (`whileHover: { y: -8 }`)
- `BorderBeam` (Magic UI) sur les cartes featured

#### 6.2 — `ProjectsGrid.tsx`
- Créer `components/sections/ProjectsGrid.tsx` — Server Component shell
- Grid 2 colonnes (desktop) / 1 colonne (mobile)
- Recevoir `projects[]` comme props (pas de fetch dans le composant)
- Animations d'entrée staggerées avec `BlurFade` (Magic UI)

#### 6.3 — `ProjectsFilter.tsx`
- Créer `components/sections/ProjectsFilter.tsx` — `'use client'`
- Filtres par catégorie (client-side, pas de refetch)
- Affiche les catégories disponibles pour le persona actif
- Framer Motion `layout` pour la réorganisation animée

#### 6.4 — Page `/projects` (Server)
- Créer `app/(portfolio)/projects/page.tsx`
- `getProjectsByPersona(persona)` côté serveur
- `generateMetadata` dynamique par persona
- Passer data → `ProjectsGrid` + `ProjectsFilter`

#### 6.5 — Page `/projects/[slug]` (Case Study)
- Créer `app/(portfolio)/projects/[slug]/page.tsx`
- `generateStaticParams` pour les slugs connus
- `generateMetadata` avec Open Graph image du projet
- Layout : images full-width + challenge/solution/result + tags + liens

**Skills utilisés** :
- `nextjs-dynamic-routes-params` — [slug] + generateStaticParams
- `nextjs-pathname-id-fetch` — fetch par slug depuis Supabase
- `nextjs-server-client-components` — Server shell + Client filters
- `supabase` — requêtes filtrées par persona avec join project_personas
- `ui-ux-pro-max` — design cards aerukart-style
- `high-end-visual-design` — hover effects, BorderBeam, BlurFade

---

## 🎯 Objectif 7 : Section Skills — Tech Radar Interactif

**But** : Visualisation des compétences techniques par persona, avec un Tech Radar interactif.

### Tâches

#### 7.1 — Installation dépendance
```bash
npm install d3  # Pour le Tech Radar SVG custom
```

#### 7.2 — `SkillsCloud.tsx`
- Créer `components/sections/SkillsCloud.tsx` — `'use client'`
- Grille de badges skills animés (entrée staggerée Framer Motion)
- Filtrés par persona actif et catégorie
- Icônes devicons (via CDN `cdn.jsdelivr.net/gh/devicons/devicon`)

#### 7.3 — `TechRadar.tsx`
- Créer `components/sections/TechRadar.tsx` — `'use client'`
- Radar chart SVG custom (D3 ou SVG manuel)
- 4 axes : Frontend, Backend, AI, Cloud/DevOps
- Points interactifs (hover → tooltip avec nom + niveau)
- Animation d'entrée GSAP

#### 7.4 — Page `/skills`
- Créer `app/(portfolio)/skills/page.tsx`
- Server Component → passe `skills[]` filtrés par persona
- Composer : `SkillsCloud` + `TechRadar`

**Skills utilisés** :
- `nextjs-server-client-components`
- `supabase` — requêtes skills par persona
- `ui-ux-pro-max` — design badges, radar chart
- `high-end-visual-design` — animations stagger, hover tooltips

---

## 🎯 Objectif 8 : Sections About + Timeline Professionnelle

**But** : Page "À propos" avec le scroll-driven storytelling de la timeline (CdC §4).

### Tâches

#### 8.1 — `ExperienceTimeline.tsx`
- Créer `components/sections/ExperienceTimeline.tsx` — `'use client'`
- Ligne verticale centrale + cards d'expérience alternées gauche/droite
- **Scroll-driven** : GSAP ScrollTrigger anime chaque item au scroll
- Filtrées par persona actif

#### 8.2 — `LearningJourney.tsx`
- Créer `components/sections/LearningJourney.tsx` — `'use client'`
- Progression visuelle de l'apprentissage (timeline horizontale ou steps)
- Étapes clés : premier projet → premières missions → awards → certifications
- GSAP ScrollTrigger + animation de remplissage de la barre de progression

#### 8.3 — `AchievementsSection.tsx`
- Créer `components/sections/AchievementsSection.tsx` — Server Component
- Grid de certifications (Udemy, AWS, Canva, Concours)
- `AchievementCard.tsx` avec image, provider, date, lien vérification
- `NumberTicker` (Magic UI) pour le compteur "9+ certifications"

#### 8.4 — Page `/about`
- Créer `app/(portfolio)/about/page.tsx`
- Composer : bio Dimitri + `ExperienceTimeline` + `LearningJourney` + `AchievementsSection`
- Globe Three.js (localisation Yaoundé, Cameroun)

**Skills utilisés** :
- `nextjs-server-client-components`
- `supabase` — requêtes expériences + achievements filtrés par persona
- `ui-ux-pro-max` — design timeline, cards certifs
- `high-end-visual-design` — GSAP ScrollTrigger, animations scroll-driven

---

## 🎯 Objectif 9 : Section Services + Contact Premium

**But** : Pages services et contact finales pour compléter la Phase 1.

### Tâches

#### 9.1 — `ServiceCard.tsx` + `ServicesSection.tsx`
- Créer `components/cards/ServiceCard.tsx` — Server Component
- Icône Lucide + titre + description + liste de features + badge prix
- Glass card style avec hover glow

#### 9.2 — Page `/services`
- Créer `app/(portfolio)/services/page.tsx`
- Services différents par persona (fullstack = dev web, ai-engineer = automatisation, etc.)
- `generateMetadata` dynamique

#### 9.3 — `ContactSection.tsx`
- Créer `components/sections/ContactSection.tsx` — `'use client'`
- Formulaire premium : Nom, Email, Message, Persona sélectionné (auto-rempli)
- Validation Zod + React Hook Form (déjà installé)
- Soumission vers `/api/contact` → email via Resend
- Sonner toast pour feedback (déjà installé)
- Côté visuel : Globe Three.js + infos de contact

#### 9.4 — API Route `/api/contact`
- Créer `app/api/contact/route.ts`
- Validation serveur, insertion Supabase `contact_submissions`, envoi email (Resend)

**Skills utilisés** :
- `nextjs-server-client-components`
- `nextjs-app-router-fundamentals` — API Routes, Route Handlers
- `supabase` — insertion contact_submissions
- `shadcn` — Form, Input, Label, Button
- `ui-ux-pro-max` — formulaire premium, feedback UX

---

## 🎯 Objectif 10 : SEO, Performance & Déploiement Phase 1

**But** : Préparer la Phase 1 pour un déploiement Vercel de qualité production.

### Tâches

#### 10.1 — SEO complet
- `generateMetadata` sur toutes les pages (title, description, OG, Twitter Card)
- `opengraph-image.tsx` dynamique pour les projets
- `sitemap.ts` généré dynamiquement
- `robots.ts` configuré

#### 10.2 — Optimisation images
- Tous les images via `next/image` avec `sizes`, `priority` sur les images above-the-fold
- Images projets stockées dans Supabase Storage → URL publiques optimisées

#### 10.3 — Tests & validation
- `npm run build` → 0 erreur TypeScript
- `npm run lint` → 0 warning ESLint
- Test Lighthouse : Performance > 85, SEO > 95, Accessibility > 90

#### 10.4 — Variables d'environnement Vercel
- Configurer `.env.local` pour dev, `.env.example` comme référence
- Déploiement Vercel preview branch

**Skills utilisés** :
- `seo-audit` — metadata, OG, sitemap, robots
- `nextjs-advanced-routing` — dynamic routes, generateStaticParams, ISR
- `supabase` — variables env production
- `vercel-ai-sdk` — configuration Vercel (même SDK pour les API routes)

---

# ═══════════════════════════════════════════
# PHASE 2 — CV Intelligent + Blog + Modules
# ═══════════════════════════════════════════

## 🎯 Objectif 11 : CV Intelligent Dynamique (CdC §5)

**But** : Générer un CV PDF adapté au persona actif, avec les projets et compétences les plus pertinents.

### Tâches

#### 11.1 — Installation
```bash
npm install @react-pdf/renderer
```

#### 11.2 — Templates CV par persona
- Créer `components/cv/CVTemplate.tsx` — Template React-PDF
- Couleurs, mise en page, typographie adaptées au persona
- Sections : Header, Objectif, Expériences, Projets, Skills, Certifications

#### 11.3 — `CVPreview.tsx`
- Créer `components/cv/CVPreview.tsx` — `'use client'`
- Aperçu iframe du CV généré (PDFViewer react-pdf)
- Bouton "Télécharger" → appel API `/api/cv/generate`

#### 11.4 — API Route `/api/cv/generate`
- Créer `app/api/cv/generate/route.ts`
- Lire persona depuis query param
- Composer les données CV depuis Supabase (`cv_templates`, projets, skills, achievements)
- Générer PDF avec React-PDF → upload Supabase Storage → retourner URL signée

#### 11.5 — Page `/cv`
- Créer `app/(portfolio)/cv/page.tsx`
- Afficher `CVPreview` + bouton download
- Mention "CV adapté au profil [Persona] actif"

**Skills utilisés** :
- `nextjs-server-client-components` — API Route server-side PDF generation
- `supabase` — lecture cv_templates, Storage upload
- `resume-tailoring` — structure et contenu CV par persona
- `ui-ux-pro-max` — design page CV, download button

---

## 🎯 Objectif 12 : Blog Technique (MDX + Supabase) (CdC §4)

**But** : Blog technique avec MDX pour le rendu riche et Supabase pour les métadonnées CRUD.

### Tâches

#### 12.1 — Installation
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react remark-gfm rehype-highlight
```

#### 12.2 — Configuration MDX
- Configurer `next.config.ts` pour supporter MDX
- Créer `lib/mdx.ts` — compileMDX, parseFrontmatter
- Créer `content/blog/` — premiers articles `.mdx`

#### 12.3 — Page `/blog`
- Créer `app/(portfolio)/blog/page.tsx` — Server Component
- Lister articles depuis Supabase `blog_posts` (filtre persona optionnel)
- Cards articles avec cover, titre, excerpt, tags

#### 12.4 — Page `/blog/[slug]`
- Créer `app/(portfolio)/blog/[slug]/page.tsx`
- Charger MDX depuis filesystem + metadata depuis Supabase
- `generateStaticParams` pour les articles publiés
- Rendu MDX avec syntaxe highlighting

**Skills utilisés** :
- `nextjs-advanced-routing` — MDX, generateStaticParams, ISR
- `nextjs-dynamic-routes-params` — [slug] routing
- `supabase` — blog_posts metadata
- `ui-ux-pro-max` — design article, typographie lecture

---

## 🎯 Objectif 13 : Témoignages + Modules Lab (CdC §4 & §6)

### Tâches

#### 13.1 — `TestimonialsSection.tsx`
- Grid de témoignages avec avatar, nom, poste, entreprise, contenu, stars
- Carousel automatique sur mobile (Framer Motion)

#### 13.2 — Page `/lab` (Startup Lab + Now Building + Roadmap)
- Section "Now Building" — projet en cours, avec status et technos
- Section "Roadmap Publique" — étapes futures, visuellement engageante
- Section "Startup Lab" — idées et expérimentations SnowDev

#### 13.3 — Page `/ecosystem`
- Créer `components/sections/DigitalEcosystem.tsx` — `'use client'`
- Graphe interactif des technologies et projets SnowDev (nœuds connectés)
- Utiliser D3 force simulation ou Three.js

**Skills utilisés** :
- `nextjs-server-client-components`
- `supabase` — testimonials, contenus dynamiques
- `high-end-visual-design` — carousel, force graph
- `ui-ux-pro-max` — mise en page témoignages, roadmap design

---

# ═══════════════════════════════════════════
# PHASE 3 — Dashboard CMS + Architecture Gallery
# ═══════════════════════════════════════════

## 🎯 Objectif 14 : Dashboard Admin (CMS)

**But** : Interface d'administration pour gérer tout le contenu portfolio sans toucher au code.

### Tâches

#### 14.1 — Layout Dashboard Protégé
- Créer `app/dashboard/layout.tsx` — vérification auth serveur
- Sidebar navigation (projets, blog, témoignages, CV templates, métriques)
- Redirect vers `/auth/login` si non authentifié

#### 14.2 — CRUD Projets
- Liste, création, édition, suppression de projets
- Formulaire Shadcn (react-hook-form + zod)
- Upload images vers Supabase Storage

#### 14.3 — CRUD Blog
- Éditeur MDX simple (textarea + preview) ou intégration éditeur tiers
- Gestion publication/dépublication

#### 14.4 — CRUD Témoignages
- Formulaire d'ajout, modération, toggle featured

#### 14.5 — Dashboard Métriques
- Stats : vues, projets publiés, messages reçus, CV téléchargés
- `NumberTicker` (Magic UI) pour les chiffres clés

**Skills utilisés** :
- `nextjs-server-client-components` — Server layout auth check
- `nextjs-app-router-fundamentals` — Server Actions pour CRUD
- `supabase` — CRUD operations, Storage, RLS auth
- `supabase-postgres-best-practices` — requêtes admin efficaces
- `shadcn` — Form, Table, Dialog, Badge

---

## 🎯 Objectif 15 : Architecture Gallery (CdC §6)

**But** : Galerie de diagrammes système et d'architecture cloud — showcase technique différenciant.

### Tâches

#### 15.1 — Installation
```bash
npm install mermaid  # Rendu diagrammes Mermaid
```

#### 15.2 — `ArchitectureDiagram.tsx`
- Créer `components/sections/ArchitectureDiagram.tsx` — `'use client'`
- Rendu Mermaid.js pour diagrammes système
- Zoom/pan interactif
- Mode fullscreen

#### 15.3 — Page `/architecture`
- Grid de diagrammes (infrastructure AWS, flow données, architecture Next.js)
- Images uploadées sur Supabase Storage
- Filtres par type (cloud, data flow, UI architecture)

**Skills utilisés** :
- `nextjs-server-client-components`
- `supabase` — Storage pour images diagrammes
- `ui-ux-pro-max` — design gallery, interactions zoom/pan

---

# ═══════════════════════════════════════════
# PHASE 4 — Assistant IA "Chat with Dimitri"
# ═══════════════════════════════════════════

## 🎯 Objectif 16 : Chat IA avec RAG (CdC §7)

**But** : Un chatbot qui répond comme Dimitri, alimenté par le contenu de son portfolio (RAG).

### Tâches

#### 16.1 — Installation
```bash
npm install ai @ai-sdk/google @ai-sdk/openai
```
> Utiliser le `vercel-ai-sdk` (skill disponible) pour orchestrer Gemini + DeepSeek V3

#### 16.2 — Contexte RAG
- Créer `lib/ai/rag-context.ts`
- Agréger : projets, expériences, skills, bio, achievements → texte structuré
- Stocké dans Supabase ou construit dynamiquement à chaque session

#### 16.3 — API Route `/api/ai/chat`
- Créer `app/api/ai/chat/route.ts`
- Streaming response (Edge Runtime compatible)
- Système de prompt : "Tu es Dimitri Tedom, alias SnowDev..."
- RAG : injecter le contexte dans le prompt système

#### 16.4 — `ChatWidget.tsx`
- Créer `components/ai/ChatWidget.tsx` — `'use client'`
- Interface chat (messages, input, streaming réponse)
- Utiliser `useChat` de Vercel AI SDK
- Bouton floating ou page dédiée `/chat`

**Skills utilisés** :
- `vercel-ai-sdk` — useChat, streamText, generateText, RAG pattern
- `nextjs-server-client-components` — Edge API Route streaming
- `nextjs-app-router-fundamentals` — Edge Runtime config
- `supabase` — persistance sessions chat ai_chat_sessions

---

# ═══════════════════════════════════════════
# PHASE 5 — Analyse d'Offres + CV Ciblé
# ═══════════════════════════════════════════

## 🎯 Objectif 17 : Matching CV ↔ Offre d'Emploi (CdC §7)

**But** : L'utilisateur colle une offre d'emploi → le système analyse, score, et génère un CV ciblé PDF.

### Tâches

#### 17.1 — API Route `/api/ai/analyze-job`
- Parser l'offre d'emploi avec LLM → extraire stack, keywords, seniority
- Calculer score de matching par persona

#### 17.2 — API Route `/api/ai/match-cv`
- Recommander le persona optimal
- Adapter le CV template au contexte de l'offre
- Générer CV PDF ciblé → Supabase Storage → URL signée

#### 17.3 — `JobAnalyzer.tsx`
- Créer `components/ai/JobAnalyzer.tsx` — `'use client'`
- Zone de texte pour coller l'offre
- Affichage : score, keywords matchés, persona recommandé, bouton "Générer mon CV"

**Skills utilisés** :
- `vercel-ai-sdk` — generateObject, structured outputs
- `resume-tailoring` — adaptation contenu CV selon offre
- `supabase` — Storage CV exports
- `nextjs-server-client-components`

---

# 📋 Récapitulatif Skills par Objectif

| Objectif | Skills principaux |
|---|---|
| 1 — Design System | `nextjs-app-router-fundamentals` · `shadcn` · `ui-ux-pro-max` · `high-end-visual-design` |
| 2 — Système Persona | `nextjs-server-client-components` · `nextjs-client-cookie-pattern` · `nextjs-use-search-params-suspense` |
| 3 — Base de Données | `supabase` · `supabase-postgres-best-practices` |
| 4 — Navbar + Layout | `nextjs-app-router-fundamentals` · `shadcn` · `ui-ux-pro-max` |
| 5 — Hero Section | `nextjs-server-client-components` · `ui-ux-pro-max` · `high-end-visual-design` |
| 6 — Projets | `nextjs-dynamic-routes-params` · `supabase` · `ui-ux-pro-max` · `high-end-visual-design` |
| 7 — Skills Radar | `nextjs-server-client-components` · `supabase` · `ui-ux-pro-max` |
| 8 — About + Timeline | `nextjs-server-client-components` · `supabase` · `high-end-visual-design` |
| 9 — Services + Contact | `shadcn` · `supabase` · `nextjs-app-router-fundamentals` |
| 10 — SEO + Déploiement | `seo-audit` · `nextjs-advanced-routing` · `supabase` |
| 11 — CV Intelligent | `nextjs-server-client-components` · `supabase` · `resume-tailoring` |
| 12 — Blog MDX | `nextjs-advanced-routing` · `supabase` · `ui-ux-pro-max` |
| 13 — Témoignages + Lab | `nextjs-server-client-components` · `supabase` · `high-end-visual-design` |
| 14 — Dashboard CMS | `supabase` · `shadcn` · `supabase-postgres-best-practices` |
| 15 — Architecture Gallery | `nextjs-server-client-components` · `supabase` · `ui-ux-pro-max` |
| 16 — Chat IA | `vercel-ai-sdk` · `nextjs-app-router-fundamentals` · `supabase` |
| 17 — Job Matching | `vercel-ai-sdk` · `resume-tailoring` · `supabase` |

---

# ⚡ Règles de Développement (à respecter tout au long)

1. **Skills en tête** : Avant de coder un composant, identifier et activer le skill approprié via son nom
2. **Ordre strict** : Chaque objectif dépend du précédent — ne pas sauter d'étape
3. **Fallback statique** : Toujours utiliser les fichiers `data/*.ts` si Supabase est indisponible
4. **Server First** : Tout composant est Server Component par défaut — `'use client'` seulement si nécessaire
5. **Typed everywhere** : Aucun `any` en TypeScript — utiliser les types de `types/*.ts`
6. **Design token strict** : Aucune couleur hors du design system, aucune police non définie
7. **Mobile-first** : Chaque composant est responsive avant d'être enrichi pour desktop
8. **Test avant PR** : `npm run build` + `npm run lint` sans erreur avant chaque commit

---

# 📍 Prochain Démarrage

> **Commencer par l'Objectif 1** : Design System & Configuration Globale
> Activer les skills : `ui-ux-pro-max` · `high-end-visual-design` · `shadcn` · `nextjs-app-router-fundamentals`

---

# 🔒 VERIFICATION GATES — Checklist après chaque objectif

> **Règle absolue** : Aucun objectif n'est "terminé" tant que sa gate n'est pas passée à 100%.
> Ces gates préviennent la dette technique et garantissent que le build final ne cache aucune surprise.

## Gate Standard (applicable à TOUS les objectifs)

```bash
# 1. TypeScript — zéro erreur
npx tsc --noEmit

# 2. Lint — zéro warning
npm run lint

# 3. Build de production local
npm run build

# 4. Dev server — vérification visuelle
npm run dev
# → ouvrir http://localhost:3000
# → tester le rendu desktop + responsive mobile (DevTools → 390px)
# → vérifier la console browser : zéro erreur, zéro warning React

# 5. Vérification Supabase (si l'objectif touche la BDD)
npm run supabase:status   # Docker local doit être UP
```

## Gates Spécifiques par Phase

### Objectif 1 (Design System)
- [ ] `npm run build` → ✅ no errors
- [ ] Palette couleurs visible dans DevTools (CSS vars `--accent`, `--bg-deep`, etc.)
- [ ] Fonts Space Grotesk + Inter chargées (Network tab → aucune erreur 404)
- [ ] `body` background = `#060618` en dark mode

### Objectif 2 (Persona System)
- [ ] `?persona=ai-engineer` dans l'URL → `--accent` change vers `#7c3aed`
- [ ] Cookie `snowdev_persona` créé après premier changement (DevTools → Application)
- [ ] Refresh de page → persona persisté depuis cookie
- [ ] `isPending: true` pendant la transition (bouton loader visible)

### Objectif 3 (BDD Supabase)
- [ ] `supabase db diff` → aucune migration en attente
- [ ] Test query : `SELECT * FROM projects LIMIT 1;` retourne des données dans Supabase Studio local
- [ ] RLS : requête sans auth → uniquement projets `is_published = true`
- [ ] Types générés : `npx supabase gen types typescript --local > types/database.ts` → fichier valide

### Objectif 4 (Navbar)
- [ ] Navigation entre pages → aucun flash blanc, transition fluide
- [ ] Mobile (390px) → menu responsive (hamburger ou version compacte)
- [ ] PersonaFloatingButton visible et fonctionnel sur toutes les pages portfolio

### Objectif 5 (Hero)
- [ ] Three.js canvas → aucun memory leak (vérifier via profiler DevTools)
- [ ] `Suspense` boundary → aucune erreur hydration dans la console
- [ ] Hero text change instantanément au changement de persona (AnimatePresence)
- [ ] Lighthouse Performance ≥ 80 sur la homepage (GSAP + Three.js doit être lazy)

### Objectif 6 (Projets)
- [ ] `/projects?persona=fullstack` → uniquement projets fullstack
- [ ] `/projects?persona=ai-engineer` → uniquement projets AI Engineer
- [ ] `/projects/chezflora-ecommerce-webapp` → page case study rendue (SSG)
- [ ] Image projet → `next/image` optimisé (WebP en production)
- [ ] `generateStaticParams` → toutes les pages slugs pré-rendues

### Objectif 10 (SEO + Build)
- [ ] `npm run build` → output: Static pour les pages statiques, Dynamic pour les pages avec searchParams
- [ ] Lighthouse SEO ≥ 95
- [ ] Open Graph visible via `https://www.opengraph.xyz/` ou similaire
- [ ] `sitemap.xml` accessible à `http://localhost:3000/sitemap.xml`
- [ ] `robots.txt` accessible à `http://localhost:3000/robots.txt`

### Objectif 11 (CV PDF)
- [ ] `/api/cv/generate?persona=fullstack` → retourne un PDF valide (content-type: application/pdf)
- [ ] PDF téléchargeable contient les bons projets et skills du persona
- [ ] Supabase Storage `cv-exports` → fichier uploadé après génération

### Objectif 16 (Chat IA)
- [ ] `/api/ai/chat` → streaming response sans timeout
- [ ] Le chatbot connaît les projets et expériences de Dimitri (RAG fonctionnel)
- [ ] Pas de credentials exposés dans le bundle client (vérifier Network tab)

---

# 🌿 STRATÉGIE GIT & VERSIONING

## Structure de branches

```
main                          ← Production stable (Vercel)
│
├── develop                   ← Branche d'intégration continue
│   │
│   ├── feat/obj-01-design-system
│   ├── feat/obj-02-persona-system
│   ├── feat/obj-03-database
│   ├── feat/obj-04-navbar-layout
│   ├── feat/obj-05-hero-section
│   ├── feat/obj-06-projects
│   ├── feat/obj-07-skills-radar
│   ├── feat/obj-08-about-timeline
│   ├── feat/obj-09-services-contact
│   ├── feat/obj-10-seo-deploy
│   │                         ← Merge → develop → main : RELEASE Phase 1
│   ├── feat/obj-11-cv-intelligent
│   ├── feat/obj-12-blog-mdx
│   ├── feat/obj-13-lab-testimonials
│   │                         ← Merge → develop → main : RELEASE Phase 2
│   ├── feat/obj-14-dashboard-cms
│   ├── feat/obj-15-architecture-gallery
│   │                         ← Merge → develop → main : RELEASE Phase 3
│   ├── feat/obj-16-ai-chat
│   │                         ← Merge → develop → main : RELEASE Phase 4
│   └── feat/obj-17-job-matching
│                             ← Merge → develop → main : RELEASE Phase 5
│
└── fix/*                     ← Corrections de bugs (depuis main ou develop)
```

## Convention de commits (Conventional Commits)

```
<type>(<scope>): <description courte>

Types :
  feat     → nouvelle fonctionnalité
  fix      → correction de bug
  style    → CSS/design (aucun changement logique)
  refactor → refactoring sans changement de comportement
  chore    → config, dépendances, outils
  docs     → documentation uniquement
  test     → ajout/modification de tests
  perf     → optimisation performance

Exemples :
  feat(persona): add PersonaProvider with cookie persistence
  feat(hero): add Three.js TechOrb with framer motion entrance
  style(navbar): apply glassmorphism pill design from design system
  fix(supabase): fix RLS policy blocking public project reads
  chore(deps): install gsap and @react-three/fiber
  docs(plan): update gate checklist for objective 3
```

## Workflow par objectif

```bash
# 1. Démarrer un objectif
git checkout develop
git pull origin develop
git checkout -b feat/obj-01-design-system

# 2. Développer (commits atomiques réguliers)
git add -p                                    # Ajouter par hunks (précis)
git commit -m "chore(tailwind): migrate to .ts and add SnowDev tokens"
git commit -m "style(globals): replace starter CSS with dark tech design system"
git commit -m "feat(layout): configure Space Grotesk + Inter fonts via next/font"

# 3. Vérification gate OBLIGATOIRE avant merge
npx tsc --noEmit && npm run lint && npm run build
# → Si tout passe :

# 4. Merge vers develop
git checkout develop
git merge --no-ff feat/obj-01-design-system -m "feat(obj-01): design system & global config ✅"
git push origin develop

# 5. Tag de release par phase (après objectif 10, 13, 15, 16, 17)
git tag -a v1.0.0-phase1 -m "Phase 1: Portfolio Multi-Persona core complete"
git push origin v1.0.0-phase1

# 6. Merge vers main (déploiement Vercel)
git checkout main
git merge --no-ff develop -m "release: Phase 1 — Portfolio Multi-Persona ✅"
git push origin main
```

## Tags de version sémantique

| Tag | Milestone | Contenu |
|---|---|---|
| `v0.1.0` | Baseline commit initial | Starter template |
| `v0.2.0` | Après Obj 1-2 | Design system + Persona system |
| `v0.3.0` | Après Obj 3 | BDD + Data layer |
| `v1.0.0-alpha` | Après Obj 5 | Hero visible + Layout complet |
| `v1.0.0-beta` | Après Obj 9 | Portfolio complet (toutes sections) |
| `v1.0.0` | Après Obj 10 | Phase 1 production-ready ✅ |
| `v1.1.0` | Après Obj 13 | Phase 2 (CV + Blog) |
| `v1.2.0` | Après Obj 15 | Phase 3 (Dashboard + Gallery) |
| `v2.0.0-beta` | Après Obj 16 | Phase 4 (Chat IA) |
| `v2.0.0` | Après Obj 17 | Phase 5 — version finale complète ✅ |

## Commit initial (à faire maintenant — avant de démarrer)

```bash
# Committer tous les fichiers de contexte créés aujourd'hui
git add ARCHITECTURE.md DESIGN_SYSTEM.md DATA_MAPPING.md plan.md skills-names.md
git commit -m "docs: add full project context files (architecture, design system, data mapping, plan)

- ARCHITECTURE.md: Next.js 15 structure, Supabase schema, 5-phase roadmap
- DESIGN_SYSTEM.md: Dark tech design tokens, Tailwind config, component specs
- DATA_MAPPING.md: TypeScript interfaces, V1 data migration, persona types corrected
- plan.md: 17 objectives with skills, verification gates, git strategy
- skills-names.md: installed skills reference"

git push origin main
```

---

# 🩺 CHECKLIST SANTÉ DU BUILD (avant chaque merge vers main)

```bash
#!/bin/bash
# scripts/pre-merge-check.sh — à exécuter avant tout merge main

echo "🔍 TypeScript check..."
npx tsc --noEmit || exit 1

echo "🔍 ESLint..."
npm run lint || exit 1

echo "🔍 Production build..."
npm run build || exit 1

echo "🔍 Bundle size check..."
npx @next/bundle-analyzer 2>/dev/null || true

echo "✅ All checks passed — safe to merge to main"
```

> Coller ce script dans `.github/workflows/ci.yml` pour automatisation GitHub Actions (optionnel).

```yaml
# .github/workflows/ci.yml
name: CI — Build & Type Check
on:
  push:
    branches: [develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npm run lint
      - run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          DIRECT_URL: ${{ secrets.DIRECT_URL }}
          NEXT_PUBLIC_SITE_URL: https://snowdev.vercel.app
```
