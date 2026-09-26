'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, Flame } from 'lucide-react'

export default function AboutStorySection() {
  return (
    <section className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-24">
      {/* ── 1. Aeruk-style Greeting & Introduction Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left: Dimitri Portrait Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative group"
        >
          {/* Neon ambient backglow */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-violet-600/30 via-fuchsia-500/20 to-purple-600/10 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

          <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 bg-[#0d0c1d]/80 backdrop-blur-xl shadow-2xl">
            <Image
              src="/images/about/dimitri1.png"
              alt="Dimitri Tedom - SnowDev"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              priority
            />
            {/* Subtle inner gradient shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060618] via-transparent to-transparent opacity-80" />

            {/* Bottom floating chip */}
            <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/15 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest">
                  Status
                </span>
                <span className="text-xs font-semibold text-white">
                  Available for contracts & freelance
                </span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Right: Introduction Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm text-[11px] font-mono uppercase tracking-widest text-violet-300 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            Introduction
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight">
            {"Hello! I'm "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-white bg-clip-text text-transparent">
              Dimitri Tedom
            </span>
            {", Full Stack Developer & AI Engineer"}
          </h2>

          <div className="space-y-4 text-text-secondary font-light text-base sm:text-lg leading-relaxed">
            <p>
              My journey into the world of development began in 2023, where I discovered my deep passion for both architectural code and creative interface design. What started as pure curiosity evolved into a career enabling me to work with diverse clients and build ambitious digital products.
            </p>
            <p>
              From architecting e-commerce platforms like ChezFlora to designing intuitive dashboard ecosystems and AI pipelines, I have tackled complex engineering challenges while continuously expanding both technically and creatively.
            </p>
          </div>

          {/* Quick Metrics highlight */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col">
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                3+
              </span>
              <span className="text-xs font-mono text-text-muted mt-0.5">
                Years of Coding
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col">
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-violet-400">
                12+
              </span>
              <span className="text-xs font-mono text-text-muted mt-0.5">
                Shipped Projects
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col">
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-fuchsia-400">
                1st
              </span>
              <span className="text-xs font-mono text-text-muted mt-0.5">
                ChezFlora Winner
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 2. The Origin of "SnowDev" (The Snow Leopard Story) ── */}
      <div className="relative rounded-3xl p-8 sm:p-12 border border-white/10 bg-gradient-to-br from-[#0c0b1f]/90 via-[#070716]/95 to-[#050512] overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 text-[10px] font-mono uppercase tracking-widest text-fuchsia-300 w-fit">
              <Flame className="w-3 h-3 text-fuchsia-400" />
              Origins & Philosophy
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white">
              Why the name <span className="text-violet-400">“SnowDev”</span> ?
            </h3>

            <div className="space-y-4 text-text-secondary font-light text-sm sm:text-base leading-relaxed">
              <p>
                When I entered the tech realm, I started completely as an autodidact, studying alone for long hours, learning every framework from the ground up, and pushing past every roadblock through relentless resilience.
              </p>
              <p>
                My story mirrors that of the <strong className="text-white font-medium">snow leopard</strong>: solitary in high altitudes, never discouraged by isolation, fiercely strong, patient, and continually driven to master its territory. I adopted this moniker from the very beginning to channel that quiet ferocity into every line of code.
              </p>
              <p>
                In March 2024, I elevated that self-taught foundation through an intensive 1-year MERN Full Stack and AWS Cloud Architect program at Worketyamo, and later transitioned into enterprise-level development and instruction at Master Language and Technology Institute.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative group">
            <div className="relative aspect-square w-full max-w-sm mx-auto rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02]">
              <Image
                src="/images/about/dimitri4.png"
                alt="SnowDev Origin"
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060618] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
