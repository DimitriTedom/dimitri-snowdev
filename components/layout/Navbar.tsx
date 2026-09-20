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
          className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-4xl"
        >
          {/* Main Floating Capsule */}
          <div 
            className="relative flex items-center justify-between backdrop-blur-xl border border-white/20 px-5 md:px-6 py-2.5 md:py-3 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
            style={{ background: 'rgba(9, 12, 26, 0.25)' }}
          >
            
            {/* Pure Logomark (No background box) */}
            <Link href={`/?persona=${activePersona}`} className="flex items-center group cursor-pointer transition-transform duration-300 hover:scale-105">
              <Image 
                src="/brand/snowdev-logo-transparent.png" 
                alt="SnowDev Monogram" 
                width={30} 
                height={30} 
                priority
                className="w-7 h-7 md:w-8 md:h-8 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              />
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
            <div className="hidden md:flex items-center">
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

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden p-1.5 text-white hover:text-white/80 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
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
                className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-xl border border-white/15 p-4 rounded-3xl shadow-2xl flex flex-col gap-3 md:hidden"
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
