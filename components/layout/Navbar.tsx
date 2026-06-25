'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { usePersona } from '@/hooks/usePersona'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

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

export default function Navbar() {
  const pathname = usePathname()
  const { activePersona, personaConfig } = usePersona()
  const [visible, setVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  // Scroll handler to hide/show navbar
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
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -100, x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
          exit={{ y: -100, x: '-50%', opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl"
        >
          {/* Main Floating Capsule */}
          <div className="relative flex items-center justify-between bg-bg-surface/30 dark:bg-bg-surface/20 backdrop-blur-glass border border-glass-border px-6 py-3 rounded-pill shadow-glass">
            
            {/* Logo */}
            <Link href={`/?persona=${activePersona}`} className="flex items-center gap-2.5 group cursor-pointer">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-glass-border bg-bg-surface/50 p-1.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Image 
                  src="/images/snowdev-logo.png" 
                  alt="SnowDev Logo" 
                  width={20} 
                  height={20} 
                  className="object-contain"
                />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-text-primary">
                Snow<span className="transition-colors duration-300" style={{ color: themeAccent }}>Dev</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 font-sans">
              {NAV_LINKS.map(link => {
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
                          background: `radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, transparent 100%)`,
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
            <div className="hidden md:flex items-center">
              <Button
                asChild
                className="rounded-full font-medium transition-transform duration-200 hover:scale-105"
                style={{
                  backgroundColor: themeAccent,
                  color: '#ffffff',
                  boxShadow: `0 0 15px -3px ${themeAccent}66`,
                }}
              >
                <Link href={`/contact?persona=${activePersona}`}>Start a project</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden p-2 text-text-secondary hover:text-text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Overlay Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-bg-surface/90 backdrop-blur-lg border border-glass-border p-4 rounded-3xl shadow-xl flex flex-col gap-3 md:hidden"
              >
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.href}
                    href={`${link.href}?persona=${activePersona}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors font-medium"
                    style={{
                      borderLeft: pathname === link.href ? `3px solid ${themeAccent}` : 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  asChild
                  className="w-full mt-2 rounded-xl"
                  style={{
                    backgroundColor: themeAccent,
                    color: '#ffffff',
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href={`/contact?persona=${activePersona}`}>Start a project</Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
