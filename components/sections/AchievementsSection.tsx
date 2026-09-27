'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Achievement } from '@/types/achievement'
import { usePersona } from '@/hooks/usePersona'
import NumberTicker from '@/components/ui/number-ticker'
import { Award, ExternalLink, ShieldCheck, Eye, ChevronDown } from 'lucide-react'

interface AchievementsSectionProps {
  achievements: Achievement[]
  initialLimit?: number
}

export default function AchievementsSection({
  achievements,
  initialLimit = 6,
}: AchievementsSectionProps) {
  const { personaConfig } = usePersona()
  const themeAccent = personaConfig?.theme?.accent || '#5e17eb'

  // Expandable display state for progressive disclosure & future CRUD integration
  const [showAll, setShowAll] = useState(false)

  // Total count of certifications
  const totalCount = achievements.length
  const displayedAchievements = showAll ? achievements : achievements.slice(0, initialLimit)
  const hasMore = achievements.length > initialLimit

  // Entrance animations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 flex flex-col gap-12">
      {/* Compteur Grid */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-bg-surface/20 border border-glass-border/30 rounded-2xl p-8 backdrop-blur-glass shadow-glass">
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-xl font-bold uppercase tracking-wider text-text-primary">
            Certifications & <span className="text-gradient">Milestones</span>
          </h3>
          <p className="text-xs text-text-muted max-w-sm">
            Validating technical capabilities and active learning through industry-standard certifications.
          </p>
        </div>

        {/* Ticker box */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="flex flex-col items-center">
            <div className="flex items-baseline font-display text-5xl font-extrabold text-white">
              <NumberTicker value={totalCount} className="text-white" />
              <span style={{ color: themeAccent }}>+</span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted mt-1">
              Credentials
            </span>
          </div>

          <div className="h-10 w-px bg-glass-border/20" />

          <div className="flex items-center gap-3">
            <div
              className="p-3 rounded-full border border-glass-border/30 bg-bg-surface/50"
              style={{ color: themeAccent }}
            >
              <Award size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-text-primary">Verifiable</span>
              <span className="text-[10px] text-text-muted">100% Authenticity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {displayedAchievements.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative p-5 rounded-2xl bg-bg-surface/30 backdrop-blur-glass border border-glass-border/40 hover:border-violet-500/50 transition-all duration-300 shadow-glass flex flex-col justify-between gap-4"
            >
              {/* Hover border glow */}
              <div
                className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-[12px]"
                style={{ backgroundColor: themeAccent }}
              />

              <div className="flex flex-col gap-3">
                {/* Header: Provider & Date */}
                <div className="flex items-center justify-between text-[10px] font-mono text-text-muted border-b border-glass-border/10 pb-2.5">
                  <span className="px-2 py-0.5 rounded bg-black/40 border border-glass-border/20 text-[9px] font-semibold tracking-wider text-text-secondary uppercase">
                    {item.provider}
                  </span>
                  <span>{item.date}</span>
                </div>

                {/* Certificate Image Preview thumbnail if available */}
                {item.image_url && (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center group-hover:border-violet-500/30 transition-colors">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    {/* Hover overlay with "View" CTA */}
                    {item.verify_url && (
                      <a
                        href={item.verify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-[#060618]/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-xs font-mono font-semibold text-white tracking-wider uppercase"
                      >
                        <Eye size={15} className="text-violet-400" />
                        <span>View Credential</span>
                      </a>
                    )}
                  </div>
                )}

                {/* Title & Description */}
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-display font-bold text-sm text-text-primary uppercase tracking-tight line-clamp-2 group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-text-secondary leading-relaxed font-light line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Footer with View / Verify link */}
              <div className="flex items-center justify-between mt-2 pt-3 border-t border-glass-border/10">
                <span className="text-[9px] font-mono text-text-muted">{item.category}</span>

                {item.verify_url ? (
                  <a
                    href={item.verify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-violet-600 border border-white/10 hover:border-violet-500 text-[10px] font-mono font-bold text-white transition-all duration-200 group-hover:shadow-[0_0_12px_rgba(94,23,235,0.4)]"
                  >
                    <Eye size={11} className="text-violet-300" />
                    <span>View</span>
                    <ExternalLink size={10} className="opacity-60" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono text-text-muted">
                    Secured <ShieldCheck size={10} />
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Progressive Disclosure: "View More" / "Show Less" Button ── */}
      {hasMore && (
        <div className="flex justify-center items-center pt-2">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl border border-white/15 bg-white/[0.03] hover:bg-violet-600/15 hover:border-violet-500/50 backdrop-blur-md text-xs font-mono font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:shadow-[0_0_24px_rgba(94,23,235,0.35)] active:scale-95 cursor-pointer"
          >
            <span>{showAll ? 'Show Less' : `View More Certifications (${achievements.length - initialLimit} remaining)`}</span>
            <ChevronDown
              size={15}
              className={`text-violet-400 transition-transform duration-300 ${
                showAll ? 'rotate-180' : 'group-hover:translate-y-0.5'
              }`}
            />
          </button>
        </div>
      )}
    </div>
  )
}
