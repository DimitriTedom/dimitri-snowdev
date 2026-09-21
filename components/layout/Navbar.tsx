'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { usePersona } from '@/hooks/usePersona'
import { Button } from '@/components/ui/button'
import { Home, Briefcase, Sparkles, User, Mail } from 'lucide-react'

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
  { label: 'Services', href: '/services', icon: Sparkles },
  { label: 'About', href: '/about', icon: User },
  { label: 'Contact', href: '/contact', icon: Mail },
]

export default function Navbar() {
  const pathname = usePathname()
  const { activePersona, personaConfig } = usePersona()
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  // Scroll handler to hide/show desktop navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < 10) {
        setVisible(true)
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down -> hide navbar
        setVisible(false)
      } else {
        // Scrolling up -> show navbar
        setVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Dynamic theme color (fallbacks included)
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'

  return (
    <>
      {/* ─── DESKTOP NAVBAR (Top Floating Capsule) ──────────────────────── */}
      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{ y: -100, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            exit={{ y: -100, x: '-50%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-4xl hidden md:block"
          >
            {/* Main Floating Capsule */}
            <div
              className="relative flex items-center justify-between backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
              style={{ background: 'rgba(9, 12, 26, 0.45)' }}
            >
              {/* Pure Logomark */}
              <Link
                href={`/?persona=${activePersona}`}
                className="flex items-center group cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src="/brand/snowdev-logo-transparent.png"
                  alt="SnowDev Monogram"
                  width={32}
                  height={32}
                  priority
                  className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                />
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="flex items-center gap-1 font-sans">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={`${link.href}?persona=${activePersona}`}
                      className="relative px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeNavHighlight"
                          className="absolute inset-0 rounded-full -z-10"
                          style={{
                            background: `radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0%, transparent 100%)`,
                            borderBottom: `2px solid ${themeAccent}`,
                          }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      {link.label}
                    </Link>
                  )
                })}
              </nav>

              {/* Desktop CTA */}
              <div className="flex items-center">
                <Button
                  asChild
                  className="rounded-full font-medium text-xs md:text-sm px-5 py-2 transition-transform duration-200 hover:scale-105"
                  style={{
                    backgroundColor: themeAccent,
                    color: '#ffffff',
                    boxShadow: `0 0 15px -3px ${themeAccent}66`,
                  }}
                >
                  <Link href={`/contact?persona=${activePersona}`}>Start a project</Link>
                </Button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ─── MOBILE TOP BRAND MARK (Small Screens Only) ─────────────────── */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <Link
          href={`/?persona=${activePersona}`}
          className="flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-xl border border-white/20 bg-black/60 shadow-lg active:scale-95 transition-transform"
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

      {/* ─── MOBILE BOTTOM APP DOCK (Native Mobile Feel) ───────────────── */}
      <nav
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-sm md:hidden"
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
