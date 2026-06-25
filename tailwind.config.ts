import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

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
        // Backgrounds
        'bg-deep': '#060618',
        'bg-base': '#090c1a',
        'bg-surface': '#0d1029',
        'bg-elevated': '#111432',
        // Accents SnowDev
        accent: {
          DEFAULT: '#5e17eb',
          secondary: '#5930d4',
          light: '#ae6bf6',
        },
        // Shadcn UI CSS vars (dark mode only for this project)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'Syne', 'sans-serif'],
        sans: ['Inter', 'DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        pill: '100px',
        card: '25px',
        badge: '5px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backdropBlur: {
        glass: '10px',
        'glass-lg': '20px',
      },
      boxShadow: {
        'neon-violet': '0px 0px 25px -5px rgba(94, 23, 235, 0.8)',
        'neon-light': '0px 0px 15px -5px rgba(174, 107, 246, 0.6)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'card-hover': '0 20px 60px -10px rgba(94, 23, 235, 0.3)',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'neon-pulse': {
          '0%, 100%': { 'box-shadow': '0px 0px 25px -5px rgba(94,23,235,0.8)' },
          '50%': { 'box-shadow': '0px 0px 40px -5px rgba(174,107,246,0.9)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      animation: {
        'gradient-shift': 'gradient-shift 4s ease infinite',
        float: 'float 4s ease-in-out infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        shimmer: 'shimmer 1.5s infinite',
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
  plugins: [animate],
} satisfies Config;
