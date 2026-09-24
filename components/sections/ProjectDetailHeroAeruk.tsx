'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ProjectWithPersonas } from '@/types/project'

interface ProjectDetailHeroAerukProps {
  project: ProjectWithPersonas
  themeAccent?: string
  themeAccentLight?: string
}

export default function ProjectDetailHeroAeruk({
  project,
  themeAccent = '#5e17eb',
  themeAccentLight = '#ae6bf6',
}: ProjectDetailHeroAerukProps) {
  const mainImage = project.image_url || '/ChezFlora_Thumbnail.png'
  const secondaryImage = project.image_url_2 || mainImage
  const mobileImage = project.image_url_3 || secondaryImage

  return (
    <section className="relative w-full min-h-[90vh] -mt-28 flex flex-col justify-center items-center overflow-hidden bg-[#040508] pt-16 sm:pt-20 pb-6">
      {/* ─── Ambient Atmospheric Lighting ─── */}
      <div 
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] rounded-full filter blur-[140px] opacity-25"
        style={{
          background: `radial-gradient(ellipse at center, ${themeAccentLight} 0%, ${themeAccent} 45%, transparent 70%)`
        }}
      />

      {/* Subtle Grid Matrix Texture in the Background */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* ─── Aeruk 3D Device Mockup Stage ─── */}
      <div className="relative w-full max-w-[1200px] h-[320px] sm:h-[380px] md:h-[440px] lg:h-[480px] flex items-center justify-center perspective-[1600px] px-4 select-none pointer-events-none">
        
        {/* 1. Left Angled Tablet / Secondary Browser Preview */}
        <motion.div
          initial={{ opacity: 0, x: -70, y: 30, rotateY: 28, rotateX: 12, rotateZ: -6 }}
          animate={{ opacity: 0.85, x: 0, y: 0, rotateY: 24, rotateX: 10, rotateZ: -5 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[2%] sm:left-[6%] md:left-[10%] lg:left-[14%] top-[15%] w-[260px] sm:w-[340px] md:w-[440px] aspect-[16/10] rounded-xl overflow-hidden border border-white/15 bg-white/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md hidden sm:block z-[2]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Browser header bar */}
          <div className="h-6 w-full bg-[#111216]/90 border-b border-white/10 flex items-center px-3 gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/60" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <span className="w-2 h-2 rounded-full bg-green-500/60" />
          </div>
          <div className="relative w-full h-[calc(100%-24px)] overflow-hidden bg-black/60">
            <Image
              src={secondaryImage}
              alt={`${project.title} Interface view`}
              fill
              priority
              sizes="(max-width: 768px) 300px, 440px"
              className="object-cover opacity-90"
            />
          </div>
        </motion.div>

        {/* 2. Centerpiece: Sleek Angled MacBook Pro Laptop */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative z-[4] w-[340px] sm:w-[480px] md:w-[640px] lg:w-[740px] aspect-[16/10] flex flex-col items-center"
          style={{
            transform: 'rotateX(8deg) rotateY(-4deg) rotateZ(1deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Laptop Screen Bezel */}
          <div className="relative w-full h-[88%] rounded-t-2xl rounded-b-sm bg-[#121316] border-[4px] sm:border-[6px] md:border-[8px] border-[#1e2025] shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden">
            {/* Top Webcam Dot */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/20 z-10" />
            
            {/* Display Glass Sheen & Screen Content */}
            <div className="relative w-full h-full overflow-hidden bg-black">
              <Image
                src={mainImage}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 640px, 740px"
                className="object-cover"
              />
              {/* Glass Reflection Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Laptop Base / Bottom Lip */}
          <div className="relative w-[106%] h-[12px] sm:h-[16px] md:h-[20px] -mt-1 bg-gradient-to-b from-[#2a2c33] via-[#1a1b20] to-[#0e0f13] rounded-b-xl border-t border-white/20 shadow-[0_15px_30px_rgba(0,0,0,0.9)] flex items-center justify-center">
            {/* Notch Cutout for Opening */}
            <div className="w-16 sm:w-24 h-1.5 bg-[#0a0b0d] rounded-b-md" />
          </div>
        </motion.div>

        {/* 3. Right Foreground: Floating iPhone Smartphone Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 80, y: 40, rotateY: -28, rotateX: 14, rotateZ: 8 }}
          animate={{ opacity: 1, x: 0, y: 0, rotateY: -20, rotateX: 8, rotateZ: 5 }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="absolute right-[2%] sm:right-[5%] md:right-[9%] lg:right-[13%] top-[20%] w-[130px] sm:w-[170px] md:w-[210px] aspect-[9/19.5] rounded-[28px] sm:rounded-[36px] bg-[#0c0d10] border-[4px] sm:border-[5px] border-[#2b2d35] shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden z-[6]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Dynamic Island / Notch */}
          <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-3 sm:h-3.5 bg-black rounded-full z-20 flex items-center justify-end px-2">
            <span className="w-1 h-1 rounded-full bg-blue-500/40" />
          </div>

          {/* Mobile Screen Content */}
          <div className="relative w-full h-full overflow-hidden bg-black">
            <Image
              src={mobileImage}
              alt={`${project.title} Mobile View`}
              fill
              priority
              sizes="(max-width: 768px) 150px, 210px"
              className="object-cover"
            />
            {/* Phone Screen Gloss */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent pointer-events-none" />
          </div>
        </motion.div>

      </div>

      {/* ─── Heavy Seamless Dark Gradient Overlay ─── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-transparent via-[#040508]/85 to-[#040508] z-[8]" />

      {/* ─── Aeruk Centered Project Title (No Back Button, No Tech Tags) ─── */}
      <div className="relative z-10 w-full max-w-[1200px] px-6 text-center mt-[-30px] sm:mt-[-50px] md:mt-[-70px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <h1 
            className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.1] drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)] max-w-5xl"
            style={{
              textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 0 40px rgba(255,255,255,0.08)'
            }}
          >
            <span className="bg-gradient-to-r from-white via-[#f3ecff] to-[#d6bcfa] bg-clip-text text-transparent">
              {project.title}
            </span>
          </h1>
        </motion.div>
      </div>
    </section>
  )
}
