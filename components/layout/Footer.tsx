import Link from 'next/link'
import { getServerPersona } from '@/lib/persona'
import { PERSONAS } from '@/data/personas'
import { PROFILE } from '@/data/profile'

export default async function Footer() {
  const activePersonaId = await getServerPersona()
  const activePersona = PERSONAS.find(p => p.id === activePersonaId) || PERSONAS[0]
  const themeAccent = activePersona.theme?.accent || '#5e17eb'

  const navigationColumns = [
    {
      title: 'Navigation',
      links: [
        { label: 'Projects', href: '/projects' },
        { label: 'Services', href: '/services' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Ecosystem',
      links: [
        { label: 'Startup Lab', href: '/lab' },
        { label: 'Ecosystem', href: '/ecosystem' },
        { label: 'Achievements', href: '/achievements' },
        { label: 'Intelligent CV', href: '/cv' },
      ],
    },
  ]

  return (
    <footer className="w-full bg-bg-deep border-t border-glass-border/30 py-12 md:py-16 mt-20 relative overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] opacity-10 blur-[120px] pointer-events-none rounded-full"
        style={{
          background: `radial-gradient(circle, ${themeAccent} 0%, transparent 80%)`,
        }}
      />

      <div className="container mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href={`/?persona=${activePersonaId}`} className="group w-fit">
              <span className="font-display font-bold text-2xl tracking-tight text-text-primary">
                Snow<span className="transition-colors duration-300" style={{ color: themeAccent }}>Dev</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm max-w-sm leading-relaxed font-sans">
              {PROFILE.tagline}
            </p>
            <div className="flex flex-col gap-1 text-xs text-text-muted mt-2">
              <span>Persona Profile: <strong style={{ color: themeAccent }} className="uppercase">{activePersona.label}</strong></span>
              <span>Location: {PROFILE.location}</span>
            </div>
          </div>

          {/* Quick Links Columns */}
          {navigationColumns.map(col => (
            <div key={col.title} className="flex flex-col gap-4">
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-text-primary">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2 font-sans">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={`${link.href}?persona=${activePersonaId}`}
                      className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-250 hover:underline decoration-1"
                      style={{
                        textDecorationColor: themeAccent,
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-glass-border/20 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-muted font-sans relative z-10">
          <div>
            &copy; {new Date().getFullYear()} SnowDev. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Built by Dimitri Tedom</span>
            <span>&bull;</span>
            <a 
              href={`mailto:${PROFILE.email}`}
              className="hover:text-text-primary transition-colors"
            >
              {PROFILE.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
