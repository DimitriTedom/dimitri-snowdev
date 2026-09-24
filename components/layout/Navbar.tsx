'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { usePersona } from '@/hooks/usePersona'
import { Home, Briefcase, Layers, User, Mail } from 'lucide-react'

interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const MOBILE_NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Projects', href: '/projects', icon: Briefcase },
  { label: 'Services', href: '/services', icon: Layers },
  { label: 'About', href: '/about', icon: User },
  { label: 'Contact', href: '/contact', icon: Mail },
]

export default function Navbar() {
  const pathname = usePathname()
  const { activePersona, personaConfig } = usePersona()

  // Dynamic theme colors
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || '#ae6bf6'

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. DESKTOP AERUK HEADER (Fixed Dual-Layer: Edge Bar + Center Pill)  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 w-full z-[100] pointer-events-none hidden md:block pt-5 px-6 sm:px-10 md:px-14 lg:px-20">
        <div className="relative w-full flex items-center justify-between">
          
          {/* ── FAR LEFT: Brand Monogram (40px) ── */}
          <div className="pointer-events-auto">
            <Link
              href={`/?persona=${activePersona}`}
              className="group flex items-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
              aria-label="SnowDev Home"
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src="/brand/snowdev-logo-transparent.png"
                  alt="SnowDev Monogram"
                  width={38}
                  height={38}
                  priority
                  className="w-[38px] h-[38px] object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.35)] transition-all duration-300 group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.6)]"
                />
              </div>
            </Link>
          </div>

          {/* ── EXACT CENTER: Floating Glass Pill Navigation (.CONTHEADER) ── */}
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
            <nav
              aria-label="Primary Navigation"
              className="relative flex items-center justify-center min-h-[50px] px-3 sm:px-4 rounded-full border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
              }}
            >
              <ul className="flex items-center gap-1 sm:gap-2 m-0 p-0 list-none">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))

                  return (
                    <li key={link.href} className="relative">
                      <Link
                        href={`${link.href}?persona=${activePersona}`}
                        className="relative block px-5 sm:px-6 py-2.5 text-[15px] font-bold font-display tracking-tight text-white transition-colors duration-200 hover:text-white"
                        style={{
                          color: isActive ? themeAccentLight : '#ffffff',
                        }}
                      >
                        {/* Aeruk-style subtle hover & active glowing pill */}
                        {isActive && (
                          <motion.span
                            layoutId="aerukActiveNavPill"
                            className="absolute inset-0 rounded-full -z-10"
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.08)',
                              boxShadow: `inset 0 0 12px 0 ${themeAccent}30`,
                            }}
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10">{link.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* ── FAR RIGHT: Standalone "Start a project" Glass Pill ── */}
          <div className="pointer-events-auto">
            <Link
              href={`/contact?persona=${activePersona}`}
              className="group inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[15px] font-medium font-display text-white border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              style={{
                backgroundColor: `${themeAccent}40`,
                borderColor: 'rgba(255, 255, 255, 0.25)',
              }}
            >
              <span className="transition-transform duration-200 group-hover:scale-[1.02]">
                Start a project
              </span>
            </Link>
          </div>

        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. MOBILE TOP BRAND MARK (Clean, Unobtrusive Small Screen Header)   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="fixed top-4 left-4 z-40 md:hidden pointer-events-auto">
        <Link
          href={`/?persona=${activePersona}`}
          className="flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-xl border border-white/20 bg-black/50 shadow-lg active:scale-95 transition-transform"
          aria-label="SnowDev Home"
        >
          <Image
            src="/brand/snowdev-logo-transparent.png"
            alt="SnowDev Monogram"
            width={24}
            height={24}
            priority
            className="w-6 h-6 object-contain drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
          />
        </Link>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. MOBILE BOTTOM APP DOCK (Native Mobile App Experience)            */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <nav
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-sm md:hidden pointer-events-auto select-none"
        aria-label="Mobile Navigation Dock"
      >
        <div
          className="relative flex items-center justify-around px-2 py-2 rounded-full border border-white/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
          style={{
            background: 'rgba(8, 8, 12, 0.88)',
            boxShadow: `0 8px 32px 0 rgba(0,0,0,0.9), 0 0 20px -5px ${themeAccent}35`,
          }}
        >
          {MOBILE_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={`${item.href}?persona=${activePersona}`}
                className="relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-200 active:scale-95"
              >
                {isActive && (
                  <motion.span
                    layoutId="mobileActiveDockTab"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{
                      backgroundColor: `${themeAccent}25`,
                      border: `1px solid ${themeAccent}60`,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={19}
                  className="transition-transform duration-200"
                  style={{
                    color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                    transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
                <span
                  className="text-[10px] font-mono tracking-tight mt-0.5"
                  style={{
                    color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
