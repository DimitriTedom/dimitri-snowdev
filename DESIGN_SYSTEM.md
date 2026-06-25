# DESIGN_SYSTEM.md — SnowDev V2 Portfolio
> **Document de référence Design** — Identité visuelle "Dark Tech" inspirée d'aerukart.com, adaptée à la palette SnowDev.
> Outils : TailwindCSS 3 · Shadcn UI · Magic UI · 21st.dev · Framer Motion 12

---

## 1. Identité Visuelle — "Dark Tech Premium"

### Concept Directeur
Le design SnowDev V2 s'inspire de l'esthétique **Dark Tech Premium** d'aerukart.com :
- Fond **quasi-noir profond** (pas de noir pur) pour éviter la fatigue visuelle
- **Glassmorphism** omniprésent : éléments flottants semi-transparents avec blur
- **Accent violet/mauve** (au lieu du cyan aerukart) pour l'identité SnowDev
- Typographie **architecturale large** pour les titres (wide font)
- Objets 3D holographiques en décoration de fond (iridescent/chromed)
- Navigation en **capsule pill flottante** avec effet glassmorphism

### Sources de référence analysées
- `aerukart.com` — structure, glassmorphism, navigation capsule, cards grid
- Screenshots Figma `inspiration-portfolio` — layout, hiérarchie typographique
- Screenshots `inspiratoinal-saveweb2zip-com-aerukart-com/` — couleurs réelles, espacements

---

## 2. Palette de Couleurs

### Couleurs de Base SnowDev

```css
:root {
  /* ─── FONDS ──────────────────────────────────────────── */
  --bg-deep:       #060618;    /* Fond le plus profond (noir bleuté) */
  --bg-base:       #090c1a;    /* Fond principal des sections */
  --bg-surface:    #0d1029;    /* Cartes, panneaux surélevés */
  --bg-elevated:   #111432;    /* Éléments encore plus au-dessus */

  /* ─── ACCENTS VIOLET (identité SnowDev) ─────────────── */
  --accent-primary:   #5e17eb;  /* Violet principal */
  --accent-secondary: #5930d4;  /* Violet secondaire */
  --accent-light:     #ae6bf6;  /* Violet clair, hover states */
  --accent-glow:      rgba(94, 23, 235, 0.4); /* Neon glow effect */

  /* ─── GLASSMORPHISM (inspiré aerukart cyan → violet) ── */
  --glass-bg:         rgba(255, 255, 255, 0.02);  /* Fond glassmorphism */
  --glass-border:     rgba(255, 255, 255, 0.10);  /* Bordure glassmorphism légère */
  --glass-border-md:  rgba(255, 255, 255, 0.19);  /* Bordure glassmorphism standard (aerukart) */
  --glass-border-lg:  rgba(255, 255, 255, 0.30);  /* Bordure glassmorphism accentuée */
  --glass-accent:     rgba(94, 23, 235, 0.15);    /* Glass teinté violet */

  /* ─── TEXTE ─────────────────────────────────────────── */
  --text-primary:   #ffffff;   /* Blanc pur — titres principaux */
  --text-secondary: #d6d6d6;   /* Gris clair — corps de texte (aerukart: rgb(214,214,214)) */
  --text-muted:     #8892b0;   /* Gris bleuté — texte secondaire, captions */
  --text-accent:    #ae6bf6;   /* Violet clair — liens, highlights */

  /* ─── BADGES & TAGS ─────────────────────────────────── */
  --badge-bg:          #1d1d1d;           /* Fond badge sombre (aerukart exact) */
  --badge-border:      rgba(255, 255, 255, 0.19);
  --badge-bg-accent:   rgba(94, 23, 235, 0.20); /* Badge violet teinté */

  /* ─── BOUTONS ────────────────────────────────────────── */
  --btn-primary-bg:    rgba(94, 23, 235, 0.55);   /* Bouton principal (adapté de rgba(0,237,255,0.45)) */
  --btn-primary-glow:  rgba(94, 23, 235, 0.6) 0px 0px 25px -5px; /* Neon glow */
  --btn-outline-bg:    rgba(255, 255, 255, 0.02);
  --btn-outline-border: rgba(255, 255, 255, 0.19);
}
```

### Valeurs Tailwind à configurer dans `tailwind.config.ts`

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Fonds
        'bg-deep':     '#060618',
        'bg-base':     '#090c1a',
        'bg-surface':  '#0d1029',
        'bg-elevated': '#111432',

        // Accents SnowDev
        'accent': {
          DEFAULT:   '#5e17eb',
          secondary: '#5930d4',
          light:     '#ae6bf6',
        },

        // Shadcn UI CSS vars (dark mode only pour ce projet)
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
      },

      fontFamily: {
        // Police d'affichage architecturale (équivalent "Roc Grotesk wide")
        display: ['Space Grotesk', 'Syne', 'sans-serif'],
        // Corps de texte moderne
        sans:    ['Inter', 'DM Sans', 'sans-serif'],
        // Code / monospace
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      borderRadius: {
        'pill': '100px',   // Navigation capsule & boutons pill (aerukart)
        'card': '25px',    // Images de projets (aerukart exact)
        'badge': '5px',    // Badges de catégorie (aerukart exact)
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      backdropBlur: {
        'glass': '10px',   // Glassmorphism standard (aerukart exact)
        'glass-lg': '20px',
      },

      boxShadow: {
        'neon-violet': '0px 0px 25px -5px rgba(94, 23, 235, 0.8)',
        'neon-light':  '0px 0px 15px -5px rgba(174, 107, 246, 0.6)',
        'glass':       '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'card-hover':  '0 20px 60px -10px rgba(94, 23, 235, 0.3)',
      },

      keyframes: {
        // Gradient animé (persona switcher, hero)
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        // Flottement (objets 3D décoratifs)
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        // Pulsation néon
        'neon-pulse': {
          '0%, 100%': { 'box-shadow': '0px 0px 25px -5px rgba(94,23,235,0.8)' },
          '50%': { 'box-shadow': '0px 0px 40px -5px rgba(174,107,246,0.9)' },
        },
        // Shimmer sur cartes
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        // Accordion Shadcn
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },

      animation: {
        'gradient-shift': 'gradient-shift 4s ease infinite',
        'float': 'float 4s ease-in-out infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },

      backgroundImage: {
        'gradient-hero': 'radial-gradient(ellipse at center top, rgba(94,23,235,0.15) 0%, transparent 70%)',
        'gradient-card': 'linear-gradient(135deg, rgba(94,23,235,0.1) 0%, rgba(174,107,246,0.05) 100%)',
        'gradient-text': 'linear-gradient(90deg, #5e17eb, #ae6bf6, #5930d4)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
```

---

## 3. CSS Variables Globales (`globals.css` remplacé)

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Dark mode uniquement pour SnowDev V2 */
    --background:  224 71% 4%;     /* #060618 */
    --foreground:  210 40% 98%;    /* #ffffff */

    --card:        228 67% 7%;     /* #090c1a */
    --card-foreground: 210 40% 98%;

    --primary:     259 82% 51%;    /* #5e17eb */
    --primary-foreground: 210 40% 98%;

    --secondary:   251 63% 51%;    /* #5930d4 */
    --secondary-foreground: 210 40% 98%;

    --muted:       228 30% 15%;
    --muted-foreground: 215 20% 65%;

    --accent:      271 89% 69%;    /* #ae6bf6 */
    --accent-foreground: 210 40% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --border:      217 32% 17%;
    --input:       217 32% 17%;
    --ring:        259 82% 51%;    /* violet accent */

    --radius: 0.75rem;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-bg-deep text-foreground antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  /* Scrollbar personnalisée */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #060618; }
  ::-webkit-scrollbar-thumb { background: #5e17eb; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #ae6bf6; }
}

@layer utilities {
  /* Glassmorphism utilitaires */
  .glass {
    @apply bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.10)] backdrop-blur-[10px];
  }
  .glass-md {
    @apply bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.19)] backdrop-blur-[10px];
  }
  .glass-accent {
    @apply bg-[rgba(94,23,235,0.10)] border border-[rgba(94,23,235,0.30)] backdrop-blur-[10px];
  }

  /* Gradient texte */
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-text;
    background-image: linear-gradient(90deg, #5e17eb, #ae6bf6, #5930d4);
  }

  /* Neon glow */
  .neon-violet {
    box-shadow: 0px 0px 25px -5px rgba(94, 23, 235, 0.8);
  }
}
```

---

## 4. Typographie

### Polices Recommandées (Google Fonts — libres)

| Usage | Police | Équivalent aerukart | Import |
|---|---|---|---|
| Titres H1/H2 display | **Space Grotesk** | Roc Grotesk wide | `Space+Grotesk:wght@300;400;500;600;700` |
| Corps de texte | **Inter** | Roc Grotesk regular | `Inter:wght@300;400;500;600` |
| Alternative display | **Syne** | Roc Grotesk wide | `Syne:wght@400;700;800` |
| Code & tech | **JetBrains Mono** | — | `JetBrains+Mono:wght@400;500` |

### Hiérarchie Typographique

```
HERO TITLE (H1)
  font-family: 'Space Grotesk', sans-serif
  font-weight: 700 (bold)
  font-size:   clamp(3rem, 8vw, 7rem)     /* responsive 48px → 112px */
  line-height: 1.0
  letter-spacing: -0.03em
  text-transform: uppercase               /* inspiré AERUK hero */
  color: #ffffff

SECTION TITLE (H2)
  font-family: 'Space Grotesk', sans-serif
  font-weight: 600
  font-size:   clamp(1.75rem, 4vw, 3rem)  /* 28px → 48px */
  line-height: 1.1
  letter-spacing: -0.02em

CARD TITLE (H3)
  font-family: 'Space Grotesk', sans-serif
  font-weight: 700
  font-size:   clamp(1rem, 2vw, 1.5rem)   /* 16px → 24px */
  line-height: 1.2
  text-transform: uppercase               /* inspiré aerukart cards */

SUBTITLE / EYEBROW (catégorie)
  font-family: 'Inter', sans-serif
  font-weight: 400
  font-size:   0.875rem (14px)
  letter-spacing: 0.1em
  text-transform: uppercase
  color: #ae6bf6 ou #d6d6d6

BODY TEXT
  font-family: 'Inter', sans-serif
  font-weight: 400
  font-size:   1rem (16px)
  line-height: 1.6
  color: #d6d6d6 (--text-secondary)

CODE / MONOSPACE
  font-family: 'JetBrains Mono', monospace
  font-weight: 400-500
  font-size:   0.875rem (14px)
  color: #ae6bf6
```

---

## 5. Composants UI — Règles d'utilisation

### 5.1 Shadcn UI (base)

Les composants Shadcn servent de **fondation non-modifiée**. On les surcharge via `className` :

```tsx
// ✅ Correct — surcharge via className
<Button
  className="rounded-pill bg-[rgba(94,23,235,0.55)] border border-[rgba(255,255,255,0.19)]
             shadow-[0px_0px_25px_-5px_rgba(94,23,235,0.8)] text-white
             hover:bg-[rgba(174,107,246,0.55)] transition-all duration-300"
>
  Start a project
</Button>

// ❌ Interdit — modifier directement components/ui/button.tsx
```

### 5.2 Magic UI — Composants animations premium

Source : `magicui.design` — Intégrer via les fichiers dans `components/magicui/`

| Composant | Usage dans SnowDev |
|---|---|
| `<Meteors />` | Fond hero section (pluie de météores) |
| `<AnimatedGradientText />` | Eyebrow text "Full Stack Developer" animé |
| `<BorderBeam />` | Cartes projets featured — bordure lumineuse |
| `<BlurFade />` | Apparition sections au scroll (remplace FadeIn V1) |
| `<NumberTicker />` | Statistiques (10k+ queries, 92% satisfaction) |
| `<TypingAnimation />` | Titre hero alternatif |
| `<Globe />` | Section localisation (Yaoundé, Cameroun) |
| `<ShimmerButton />` | CTA secondaires |
| `<InteractiveGridPattern />` | Déjà présent — fond sections alternatives |

### 5.3 21st.dev — Composants premium

Source : MCP `@21st-dev/magic` — via `call_mcp_tool("21st_magic_component_builder", ...)`

Utiliser pour :
- **Navigation capsule pill** (clone exact style aerukart)
- **Hero section** avec layout premium
- **Project cards** avec hover effects avancés
- **Timeline d'expérience** animée

### 5.4 Framer Motion — Animations

```tsx
// Pattern standard pour apparition au scroll
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

// Staggered children (grilles de projets, skills)
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

// Hover card effect
const cardHover = {
  whileHover: { y: -8, scale: 1.02, transition: { duration: 0.3 } }
}
```

---

## 6. Composants Clés — Specs Détaillées

### 6.1 Navigation Capsule (inspirée aerukart)

```
Layout    : fixed top, centered pill
Bg        : rgba(255, 255, 255, 0.02)
Border    : 1px solid rgba(255, 255, 255, 0.19)
Border-r  : 100px (full pill)
Backdrop  : blur(10px)
Height    : 52px
Padding   : 0 20px
Shadow    : none (sobre)
Font      : Inter 400 16px
Links clr : #ffffff → hover: #ae6bf6
Active    : text-gradient violet
```

**PersonaSwitcher** intégré à droite de la navbar — dropdown avec les 5 personas.

### 6.2 Project Cards (inspirées aerukart)

```
Image container:
  border-radius : 25px          ← aerukart exact
  border        : 1px solid rgba(255, 255, 255, 0.19)
  overflow      : hidden
  aspect-ratio  : 16/9

Card wrapper:
  background    : transparent (pas de bg sur le wrapper)
  display       : flex flex-col gap-3

Category badge(s):
  bg            : #1d1d1d       ← aerukart exact
  border-radius : 5px           ← aerukart exact
  padding       : 4px 12px      ← aerukart exact
  font          : Inter 14px uppercase
  color         : #d6d6d6

Title (H3):
  font          : Space Grotesk 700 uppercase
  color         : #ffffff
  font-size     : 18-20px

Subtitle (catégorie sous le titre):
  font          : Inter 400 12px
  color         : #d6d6d6
  letter-spacing: 0.05em

Description excerpt:
  font          : Inter 400 16px
  color         : #d6d6d6
  line-height   : 1.6
  max-lines     : 3 (line-clamp-3)

Grid layout:
  grid-cols     : 2 (desktop), 1 (mobile)
  gap           : 20px columns, 30px rows ← aerukart exact
```

### 6.3 Glassmorphism Buttons (CTA primary)

```
Bg            : rgba(94, 23, 235, 0.55)    /* violet semi-transparent */
Border        : 1px solid rgba(255, 255, 255, 0.19)
Border-radius : 100px                       /* pill shape */
Box-shadow    : 0px 0px 25px -5px rgba(94, 23, 235, 0.8)  /* neon glow */
Padding       : 12px 28px
Font          : Inter 500 16px
Color         : #ffffff
Hover bg      : rgba(174, 107, 246, 0.55)
Hover shadow  : 0px 0px 35px -5px rgba(174, 107, 246, 0.9)
Transition    : all 0.3s ease
```

### 6.4 Social Sidebar Dock (inspiré aerukart)

```
Position      : fixed left-6, vertically centered
Icons         : circulaires, 52x52px
Bg            : rgba(255, 255, 255, 0.02)
Border        : 1px solid rgba(255, 255, 255, 0.19)
Border-radius : 100px
Hover bg      : rgba(94, 23, 235, 0.20)
Hover border  : rgba(94, 23, 235, 0.50)
Icons         : Instagram, LinkedIn, Behance, GitHub, Twitter
```

### 6.5 Persona Switcher (composant unique SnowDev)

```
Trigger       : Bouton dans la navbar (ex: "Full Stack JS ▾")
Dropdown      : glass card 280px
Bg            : rgba(9, 12, 26, 0.95) + backdrop-blur(20px)
Border        : 1px solid rgba(255, 255, 255, 0.19)
Border-radius : 16px
Items         : 5 personas avec icône + label + description courte
Active item   : bg rgba(94, 23, 235, 0.20), border-left 3px violet
Transition    : framer-motion AnimatePresence (scale + opacity)
```

---

## 7. Responsive Design

| Breakpoint | Largeur | Comportement |
|---|---|---|
| `sm` | 640px | Mobile landscape — 1 col projets |
| `md` | 768px | Tablet — layout adapté |
| `lg` | 1024px | Desktop — 2 cols projets, sidebar sociale visible |
| `xl` | 1280px | Large desktop — pleine largeur |
| `2xl` | 1536px | Ultra-wide — container max-width: 1400px |

```tsx
// Container standard
<div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
```

---

## 8. Intégration Fonts (Next.js)

```tsx
// app/layout.tsx — Server Component
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
```

---

## 9. Effets et Animations — Référence Rapide

| Effet | Implémentation | Usage |
|---|---|---|
| Glassmorphism card | `.glass-md` utility class | Navbar, modal, persona switcher |
| Neon button glow | `box-shadow` violet | CTA primaires |
| Background grid | `<InteractiveGridPattern>` (Magic UI) | Sections alternatives |
| Meteors rain | `<Meteors count={20}>` (Magic UI) | Hero section |
| Card hover lift | `whileHover: { y: -8 }` Framer | Toutes les cards |
| Stagger entrance | `staggerChildren: 0.1` Framer | Grilles projets, skills |
| Text gradient | `.text-gradient` utility | Titre hero, persona name |
| Blur fade scroll | `<BlurFade>` (Magic UI) | Chaque section au scroll |
| Number count-up | `<NumberTicker>` (Magic UI) | Section stats/chiffres |
| Border beam | `<BorderBeam>` (Magic UI) | Featured project card |
| Float animation | `animate-float` (Tailwind keyframe) | Objets 3D décoratifs |

---

## 10. Règles d'Usage des Outils UI

### Priority Order (à respecter strictement)
1. **Magic UI** → animations et effets visuels premium
2. **21st.dev** → composants UI structurels premium  
3. **Shadcn UI** → primitives de base (buttons, inputs, dialogs)
4. **Custom CSS/Tailwind** → ajustements finaux uniquement

### Ne JAMAIS faire
- ❌ Mélanger plusieurs bibliothèques d'animation (Framer Motion suffit)
- ❌ Utiliser des couleurs non définies dans ce design system
- ❌ Ajouter du `border-radius` en dehors des valeurs definies (pill/card/badge)
- ❌ Utiliser des polices non listées
- ❌ Créer des composants Magic UI/21st.dev manuellement — toujours via MCP

---

## 11. Stack Animations — Priorité & Usage (CdC §8)

### Hiérarchie des outils d'animation

| Outil | Usage prioritaire | Cas d'usage SnowDev |
|---|---|---|
| **GSAP + ScrollTrigger** | Scroll-driven storytelling | Timeline professionnelle, Hero entrance, section reveals |
| **Three.js** | Scènes 3D WebGL | Hero canvas 3D, Tech Orb, particules de fond, écosystème |
| **Framer Motion** | Transitions UI, micro-animations | Page transitions, card hovers, modal, persona switcher |
| **Magic UI** | Composants animés prêts | Meteors, BorderBeam, BlurFade, NumberTicker |
| **Reactbits** | UI animations supplémentaires | Composants supplémentaires depuis reactbits.dev |
| **21st.dev** | Composants structurels premium | Navbar, Hero layout, Cards avancées |

### Règle d'or : ne PAS superposer GSAP + Framer Motion sur le même élément
- GSAP → animations séquentielles, scroll-driven, timeline
- Framer Motion → états React (hover, tap, animatePresence, layout)

### Scroll-Driven Storytelling (CdC §4)
```ts
// Exemple GSAP ScrollTrigger — Timeline professionnelle
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

useGSAP(() => {
  gsap.fromTo('.timeline-item', 
    { opacity: 0, x: -60 },
    {
      opacity: 1, x: 0,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      }
    }
  )
}, { scope: containerRef })
```

### Three.js — Hero Canvas (CdC §8 "Visual & sound from code")
```tsx
// components/three/HeroCanvas.tsx
'use client'
// Utiliser @react-three/fiber + @react-three/drei pour simplifier
// Scène : particules, objets géométriques 3D animés (inspiration objets iridescents aerukart)
// "Visual & sound from code" : optionnel, utiliser Tone.js pour audio réactif ou mieux, installer soundcn de github : bunx --bun shadcn add @soundcn/belt-handle-2 ou par son repo : https://github.com/kapishdima/soundcn
```

---

## 12. CV Intelligent — Design (CdC §5 & §7)

### Principe de design du CV
Chaque persona génère un CV visuellement cohérent avec son thème :

| Persona | Accent CV | Focus |
|---|---|---|
| `fullstack` | Violet `#5e17eb` | Next.js, Node.js, Supabase, projets web |
| `ai-engineer` | Violet foncé `#7c3aed` | LLMs, n8n, Gemini, automatisation |
| `cloud-architect` | Bleu `#0ea5e9` | AWS, Docker, architecture, scalabilité |
| `product-builder` | Vert `#10b981` | Produits digitaux, Figma, design systems |
| `entrepreneur` | Ambre `#f59e0b` | Business, leadership, vision, cours créés |

### Génération PDF
- **Outil recommandé** : `@react-pdf/renderer` (React → PDF côté serveur dans API Route)
- **Alternative** : `puppeteer` (screenshot de la page CV en PDF)
- **Stockage** : Supabase Storage → URL temporaire signée pour téléchargement

---

## 13. Fonctionnalités Visuelles Différenciantes (CdC §4)

| Feature | Implémentation |
|---|---|
| Scroll-driven animations | GSAP ScrollTrigger — timeline, reveals |
| Scroll-driven storytelling | GSAP + Three.js — narration visuelle au scroll |
| Visual & sound from code | Three.js + Tone.js (optionnel phase 2+) |
| Changement de thème par profil | CSS Variables dynamiques via PersonaThemeInjector |
| Tech Radar interactif | D3.js ou custom SVG + Framer Motion |
| Architecture Gallery | Grid de diagrammes (Mermaid.js rendu côté client) |
| Digital Ecosystem visualisation | Three.js force-graph ou D3 network graph |
| Hero Section dynamique | Three.js canvas + GSAP + typewriter |
