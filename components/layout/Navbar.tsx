'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { usePersona } from '@/hooks/usePersona'
import { X, Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import { PROFILE } from '@/data/profile'

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Dynamic theme colors
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'
  const themeAccentLight = personaConfig?.theme?.accentLight || '#ae6bf6'

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

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
      {/* 2. MOBILE AERUK HEADER (.CONTHEADERM - Floating Glass Capsule)      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <header className="fixed top-4 left-4 right-4 z-[100] md:hidden">
        <div
          className="w-full flex items-center justify-between px-5 py-2.5 rounded-full border border-white/20 shadow-[0_6px_25px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          }}
        >
          {/* Mobile Logo */}
          <Link
            href={`/?persona=${activePersona}`}
            className="flex items-center cursor-pointer active:scale-95 transition-transform"
            aria-label="SnowDev Home"
          >
            <Image
              src="/brand/snowdev-logo-transparent.png"
              alt="SnowDev Monogram"
              width={28}
              height={28}
              priority
              className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            />
          </Link>

          {/* Aeruk Custom 3-Line Stylized Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="w-8 h-8 flex items-center justify-center rounded-full text-white/90 hover:text-white active:scale-90 transition-transform cursor-pointer"
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 60 60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M56.66,33.69c-.29.03-.59.03-.87.03H4.19c-2.36,0-3.86-1.18-4.17-3.29-.29-2,1.25-3.96,3.27-4.16.41-.03.81-.03,1.23-.03h51.41c2.24,0,3.72,1.22,4.03,3.24.32,2.06-1.23,4.02-3.3,4.2Z" />
              <path d="M37.5,48.78c-.03,2.13-1.7,3.71-3.98,3.72h-14.76c-5.01,0-10.02,0-15.03-.02-1.65,0-3.03-1.02-3.54-2.52-.5-1.47-.14-3.15,1.14-4.04.72-.51,1.71-.9,2.56-.91,9.9-.06,19.8-.05,29.7-.03,2.25.02,3.93,1.7,3.9,3.79Z" />
              <path d="M57.47,14.76c-.48.15-1.02.23-1.54.23-9.78.02-19.56.02-29.36.02-1.67,0-2.97-.64-3.71-2.18-.66-1.4-.48-2.76.5-3.96.78-.97,1.83-1.4,3.08-1.38h14.85c4.98,0,9.96-.02,14.94,0,1.94.02,3.42,1.31,3.72,3.2.29,1.75-.75,3.51-2.48,4.08Z" />
            </svg>
          </button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. AERUK FULLSCREEN MOBILE NAVIGATION OVERLAY (Elementor-609 Style) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 md:hidden"
          >
            {/* Top Bar inside Overlay: Logo & Close Button */}
            <div className="flex items-center justify-between w-full">
              <Link
                href={`/?persona=${activePersona}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center"
              >
                <Image
                  src="/brand/snowdev-logo-transparent.png"
                  alt="SnowDev Monogram"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 active:scale-95 transition-all"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Center: Large Typographic Navigation Links */}
            <nav className="flex flex-col items-center justify-center gap-6 my-auto">
              {NAV_LINKS.map((link, idx) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * (idx + 1), duration: 0.4, ease: 'easeOut' }}
                  >
                    <Link
                      href={`${link.href}?persona=${activePersona}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight transition-colors duration-200"
                      style={{
                        color: isActive ? themeAccentLight : '#ffffff',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}

              {/* Start a project Pill CTA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-6 w-full max-w-xs"
              >
                <Link
                  href={`/contact?persona=${activePersona}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center py-4 rounded-full font-display font-bold text-base text-white border border-white/20 shadow-lg"
                  style={{
                    backgroundColor: themeAccent,
                    boxShadow: `0 0 25px -4px ${themeAccent}88`,
                  }}
                >
                  Start a project
                </Link>
              </motion.div>
            </nav>

            {/* Bottom: Social Media Circles */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/10">
              {PROFILE.socials.map((social) => {
                const icon =
                  social.platform.toLowerCase() === 'github'
                    ? Github
                    : social.platform.toLowerCase() === 'linkedin'
                    ? Linkedin
                    : social.platform.toLowerCase() === 'twitter'
                    ? Twitter
                    : Instagram

                const IconComponent = icon

                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
                    aria-label={social.platform}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
