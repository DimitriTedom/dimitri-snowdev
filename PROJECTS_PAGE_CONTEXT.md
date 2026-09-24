# SnowDev V2 — Projects Page Architecture & Next Target Context

> **Context Document for AI Agents & Developers**  
> **Last Updated**: September 24, 2026  
> **Repository**: `dimitri-snowdev` | **Branch**: `main`  
> **Previous Milestone**: Projects Page Light Beams & 3D Core Reveal (Trionn-Style)  
> **Next Target**: The **"About"** Page (`/about`)

---

## 1. What Was Engineered in the Projects Page (`/projects?persona=...`)

### A. Hero Section & 3D Artifact Core
- **Transparent Navbar**: Transparent header overlays the 3D scene seamlessly on desktop without obscuring background video or Three.js canvas. Bottom navigation dock maintained on mobile viewports for a native app feel.
- **3D Interactive Model (`FuturisticEnergyCore3D.tsx`)**:
  - Uses `futuristic energy core 3d model.glb` placed at `/models/futuristic_energy_core_3d_model.glb`.
  - Positioned dead-center in the hero viewport with subtle continuous rotation and tilt physics.
  - The base tip of this 3D core acts as the absolute origin anchor point for the light beam emission into the project catalogue.

### B. Trionn-Style Light Beams & Pitch-Black Void Reveal (`ScrollLightBeams.tsx`)
- **Pitch-Black Void Before Arrival**:
  - Unrevealed cards are completely invisible: `opacity: 0, y: 45, scale: 0.94, filter: 'blur(6px)', pointerEvents: 'none'`.
  - No placeholder borders, no ghost cards, no tacky HUD radar circles, no fake tags.
- **Stationary Target Dots**:
  - Ahead of the beams, a single stationary dot (radius 2.5px, subtle `#d4b8ff` outer glow) marks each upcoming project location in the void.
- **3-Strand Living Wave Curves**:
  - 3 cubic Bézier curves emanate from the origin (Hero 3D model base for project 1; exit anchor of project $N-1$ for project $N$).
  - Bright tip dots (radius 2.4px, pure white `#FFFFFF` with radial glow) lead each strand as they propagate downwards.
  - Continuous sine wave oscillation keeps the strands floating like liquid light waves even when the user stops scrolling.
  - When scroll progress reaches $p \ge 0.97$, the 3 strands touch the stationary target dot simultaneously.
- **Contact Bloom & Agency Card Reveal (`ProjectCard.tsx` & `ProjectsCatalogueFlow.tsx`)**:
  - A subtle radial flash bloom appears at the convergence point upon contact.
  - The card animates in smoothly to `opacity: 1, y: 0, scale: 1, filter: 'blur(0px)'` and stays permanently unlocked as the user continues exploring.

### C. Dev Server & System Stability Fixes
- **Disk Space Fix**: Cleared orphaned browser subagent WebP test recordings in `.gemini/antigravity-ide/browser_recordings/`, restoring 1.5 GB of free space on Drive `C:\` and eliminating Node.js `ERR_MEMORY_ALLOCATION_FAILED` crashes.
- **Supabase Offline Timeout (`lib/supabase/server.ts`)**:
  - Added `AbortSignal.timeout(1000)` to the global fetch override in `createServerClient`.
  - When local Docker Supabase (`http://127.0.0.1:54342`) is offline, server-side data fetching immediately falls back to static project data in 1 second instead of blocking every SSR request for 8.5 seconds.
  - Page response time reduced from infinite freeze to **260 ms**.

---

## 2. What Was Engineered in the Project Detail / Case Study Page (`/projects/[slug]`)

### A. Global Layout & Header Transparency Standard
- **Root Layout (`app/(portfolio)/layout.tsx`)**:
  - Removed artificial `pt-28 pb-10` from `<main className="relative flex-grow w-full">` which previously caused a solid 112px black band under the header across new pages.
  - Replaced `overflow-x-hidden` with `overflow-x-clip` on the layout wrapper so `position: sticky` is not broken by the browser.
  - Removed `-mt-28` hack from `HeroSection.tsx`, `ProjectsHeroAeruk.tsx`, and `ProjectDetailHeroAeruk.tsx`.
  - The transparent header floats naturally at `y: 0` directly above page backgrounds on desktop (`pt-5`) and mobile (`top-4 left-4` monogram + `bottom-4` dock).

### B. Aeruk-Style Half-Page Hero Section (`ProjectDetailHeroAeruk.tsx`)
- **Proportional ~50vh Half-Page Viewport Ratio**:
  - Instead of taking 100vh of space and pushing the case study below the fold, the hero occupies `h-[50vh] min-h-[380px] max-h-[460px]`.
  - When the user arrives on the page, the top half shows the Aeruk 3D device preview (MacBook centerpiece, left angled tablet, right floating iPhone) with the monumental centered title (`CHEZFLORA E-COMMERCE WEB APP`).
  - The lower half of the initial viewport immediately reveals the beginning of the Trionn case study content above the fold!
  - **Explicit exclusions respected**: Excluded the `< Retour` back button and tech tags in the hero.

### C. Trionn-Style Case Study Layout (`ProjectDetailTrionnContent.tsx`)
- **Visual Stream on Left (`col-span-12 lg:col-span-7 xl:col-span-7 order-2 lg:order-1`)**:
  - Visual 1: Primary master screen overview.
  - Visual 2: Secondary feature screen.
  - Technical Highlights cards: Performance, Type Safety, Architecture.
  - Visual 3: Third showcase interface flow.
  - Deployed Technologies cluster.
- **Sticky Text Panel on Right ("Does Not Obey the Scroll") (`col-span-12 lg:col-span-5 xl:col-span-5 order-1 lg:order-2 lg:sticky lg:top-20 self-start z-20`)**:
  - Minimalist `← Back to projects` navigation link.
  - Trionn line separator with centered crosshair `+`.
  - Meta index (`03 // WEB APPS`) and year.
  - Description summary.
  - Scope & Deliverables list.
  - 4 interactive tabs (`The challenge`, `Approach`, `Outcome`, `What we did`) with smooth crossfade.
  - Live Preview and Source Code CTA buttons.
  - Bottom previous / next project pagination.
  - Remains pinned to the screen as the user scrolls through the visuals on the left.
    - Trionn signature separator line with center crosshair (`+`).
    - Project index & metadata (`03 // WEB APPS`, `2025`).
    - Scope & Deliverables bullet points.
    - **4-Tab Interactive System** with animated underline and smooth content crossfade:
      1. `The challenge`: Problem context and obstacles.
      2. `Approach`: Architecture, design tokens, and technical strategy.
      3. `Outcome`: Measurable metrics and client/jury reception.
      4. `What we did`: Key technical accomplishments and deployment specifications.
    - **Trionn-Style Action Links**:
      - `Live Preview ↗` and `Source Code ↗` with animated underline hover effects.
    - **Bottom Pagination**:
      - `← Previous` and `Next →` project navigation links.
  - **Right Visual Stream (`col-span-12 lg:col-span-7 xl:col-span-8`)**:
    - High-res full-width master platform screenshot.
    - Secondary and tertiary feature showcases.
    - 3 Technical Highlight Cards: Performance, Type Safety (100% strict), and Architecture.
    - Deployed Technologies badge cluster.

### C. Trionn Next Project Teaser Banner (`ProjectDetailNextProjectBanner.tsx`)
- Full-width dark magnetic banner at the bottom of the case study.
- Oversized title with arrow `NEXT PROJECT → [Next Project Title]`.
- Subtle zoom on hover and instant transition to the next case study.

---

## 3. File Reference Map for Projects & Case Studies

| File | Purpose |
|------|---------|
| `app/(portfolio)/projects/page.tsx` | Main projects catalogue route with Aeruk hero & Trionn beams flow |
| `app/(portfolio)/projects/[slug]/page.tsx` | Project case study page route |
| `components/sections/ProjectDetailHeroAeruk.tsx` | Aeruk-style 3D device hero (no back button, no tags) |
| `components/sections/ProjectDetailTrionnContent.tsx` | Trionn split-screen layout with 4 tabs & visual stream |
| `components/sections/ProjectDetailNextProjectBanner.tsx` | Trionn bottom next project teaser banner |
| `components/sections/ProjectsHeroAeruk.tsx` | Main projects page hero with 3D model |
| `components/effects/ScrollLightBeams.tsx` | 3-strand curves, living waves, stationary dots, contact bloom |
| `components/sections/ProjectsCatalogueFlow.tsx` | Flow orchestrator for catalogue cards |
| `components/cards/ProjectCard.tsx` | Catalogue card with blur-to-focus reveal animation |
| `lib/project.ts` | Data helpers: `getProjectsByPersona`, `getProjectBySlug`, `getAdjacentProjects` |
| `lib/supabase/server.ts` | Server Supabase client with 1s fallback timeout |
| `data/projects.ts` | Static project data for all personas |

---

## 4. Immediate Next Target: The "About" Page (`/about`)

### Goals & Directives for the Next Agent:
1. **Route**: `/about` (adapts dynamically to `?persona=` fullstack, ai-engineer, cloud-architect, product-builder, entrepreneur).
2. **Visual Direction**:
   - Deep Tech Dark Mode (`#090c1a`, `#060618`) with glassmorphism / hydro-brutalist accents.
   - Clean transparent navbar at top, floating mobile dock on small screens.
   - High-end Trionn / Aerukart-level polish with GSAP scroll animations and Framer Motion micro-interactions.
3. **Key Modules to Refine / Implement**:
   - **Hero / Bio Statement**: Sharp display typography (Cabinet Grotesk / Space Grotesk) and architectural reading body (Geist Sans).
   - **Interactive Experience & Career Timeline (`ExperienceTimeline.tsx`)**: GSAP ScrollTrigger vertical laser line syncing with career milestones.
   - **Interactive Tech Radar & Skills (`SkillsRadar.tsx` / `SkillsCloud.tsx`)**.
   - **Geo-Location Hub & Real-time Status (`LocationWidget.tsx`)**: Yaoundé GMT+1 live status, coordinates, and availability badge.
   - **Verified Achievements & Metrics (`AchievementsSection.tsx`)**: Certified numbers with animated tickers.
4. **Code Quality Standards**:
   - Strict TypeScript: Zero `any` types, zero linter warnings.
   - Fast SSR: Fallback safely if local Supabase is offline.
   - Test compilation with `npx tsc --noEmit` before concluding.
