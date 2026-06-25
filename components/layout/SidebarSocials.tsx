'use client'

import { motion } from 'framer-motion'
import { PROFILE } from '@/data/profile'
import { usePersona } from '@/hooks/usePersona'
import { Github, Linkedin, Twitter, Instagram, LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
}

export default function SidebarSocials() {
  const { personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {PROFILE.socials.map((social, index) => {
        const IconComponent = iconMap[social.icon.toLowerCase()] || Github
        
        return (
          <motion.a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: `${themeAccent}20`,
              borderColor: themeAccent,
              boxShadow: `0 0 20px -3px ${themeAccent}99`
            }}
            className="flex items-center justify-center w-[52px] h-[52px] rounded-full border border-glass-border bg-bg-surface/20 backdrop-blur-glass text-text-secondary hover:text-white transition-colors duration-300"
            aria-label={social.platform}
          >
            <IconComponent size={20} />
          </motion.a>
        )
      })}
    </div>
  )
}
