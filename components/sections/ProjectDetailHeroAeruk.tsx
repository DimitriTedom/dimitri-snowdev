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
    <section className="relative w-full h-[50vh] min-h-[380px] max-h-[460px] flex flex-col justify-end items-center overflow-hidden bg-[#040508] pt-14 pb-4 select-none">
      {/* ─── Ambient Atmospheric Lighting ─── */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] rounded-full filter blur-[120px] opacity-30"
        style={{
          background: `radial-gradient(ellipse at center, ${themeAccentLight} 0%, ${themeAccent} 40%, transparent 70%)`
        }}
      />

      {/* Subtle Grid Matrix Texture in the Background */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* ─── Aeruk 3D Device Mockup Stage (Scaled for ~50vh Half-Page Landing) ─── */}
      <div className="relative w-full max-w-[1100px] h-[190px] sm:h-[220px] md:h-[250px] lg:h-[280px] flex items-center justify-center perspective-[1400px] px-4 pointer-events-none">
        
        {/* 1. Left Angled Tablet / Secondary Browser Preview */}
        <motion.div
          initial={{ opacity: 0, x: -50, y: 20, rotateY: 26, rotateX: 10, rotateZ: -5 }}
          animate={{ opacity: 0.85, x: 0, y: 0, rotateY: 22, rotateX: 8, rotateZ: -4 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[4%] sm:left-[8%] md:left-[12%] lg:left-[16%] top-[12%] w-[200px] sm:w-[260px] md:w-[320px] aspect-[16/10] rounded-lg overflow-hidden border border-white/15 bg-white/[0.03] shadow-[0_15px_40px_rgba(0,0,0,0.85)] backdrop-blur-md hidden sm:block z-[2]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Browser header bar */}
          <div className="h-5 w-full bg-[#111216]/90 border-b border-white/10 flex items-center px-2.5 gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
          </div>
          <div className="relative w-full h-[calc(100%-20px)] overflow-hidden bg-black/60">
            <Image
              src={secondaryImage}
              alt={`${project.title} Interface view`}
              fill
              priority
              sizes="(max-width: 768px) 260px, 320px"
              className="object-cover opacity-90"
            />
          </div>
        </motion.div>

        {/* 2. Centerpiece: Sleek Angled MacBook Pro Laptop */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative z-[4] w-[280px] sm:w-[380px] md:w-[480px] lg:w-[540px] aspect-[16/10] flex flex-col items-center"
          style={{
            transform: 'rotateX(7deg) rotateY(-3deg) rotateZ(0.5deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Laptop Screen Bezel */}
          <div className="relative w-full h-[88%] rounded-t-xl rounded-b-sm bg-[#121316] border-[4px] sm:border-[5px] md:border-[6px] border-[#1e2025] shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden">
            {/* Top Webcam Dot */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/20 z-10" />
            
            {/* Display Glass Sheen & Screen Content */}
            <div className="relative w-full h-full overflow-hidden bg-black">
              <Image
                src={mainImage}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 768px) 380px, 540px"
                className="object-cover"
              />
              {/* Glass Reflection Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Laptop Base / Bottom Lip */}
          <div className="relative w-[105%] h-[10px] sm:h-[13px] md:h-[15px] -mt-0.5 bg-gradient-to-b from-[#2a2c33] via-[#1a1b20] to-[#0e0f13] rounded-b-lg border-t border-white/20 shadow-[0_12px_25px_rgba(0,0,0,0.9)] flex items-center justify-center">
            {/* Notch Cutout for Opening */}
            <div className="w-12 sm:w-16 h-1 bg-[#0a0b0d] rounded-b-sm" />
          </div>
        </motion.div>

        {/* 3. Right Foreground: Floating iPhone Smartphone Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 55, y: 30, rotateY: -24, rotateX: 12, rotateZ: 6 }}
          animate={{ opacity: 1, x: 0, y: 0, rotateY: -18, rotateX: 7, rotateZ: 4 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          className="absolute right-[4%] sm:right-[7%] md:right-[11%] lg:right-[15%] top-[16%] w-[95px] sm:w-[125px] md:w-[155px] aspect-[9/19.5] rounded-[20px] sm:rounded-[26px] bg-[#0c0d10] border-[3px] sm:border-[4px] border-[#2b2d35] shadow-[0_20px_50px_rgba(0,0,0,0.95)] overflow-hidden z-[6]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Dynamic Island / Notch */}
          <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-2 sm:h-2.5 bg-black rounded-full z-20 flex items-center justify-end px-1.5">
            <span className="w-0.5 h-0.5 rounded-full bg-blue-500/40" />
          </div>

          {/* Mobile Screen Content */}
          <div className="relative w-full h-full overflow-hidden bg-black">
            <Image
              src={mobileImage}
              alt={`${project.title} Mobile View`}
              fill
              priority
              sizes="(max-width: 768px) 125px, 155px"
              className="object-cover"
            />
            {/* Phone Screen Gloss */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none" />
          </div>
        </motion.div>

      </div>

      {/* ─── Heavy Seamless Dark Gradient Overlay ─── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-b from-transparent via-[#040508]/80 to-[#040508] z-[8]" />

      {/* ─── Aeruk Centered Project Title (No Back Button, No Tech Tags) ─── */}
      <div className="relative z-10 w-full max-w-[1200px] px-6 text-center mt-[-15px] sm:mt-[-25px] md:mt-[-35px]">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="flex flex-col items-center"
        >
          <h1 
            className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-white uppercase leading-[1.08] max-w-4xl drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]"
            style={{
              textShadow: '0 4px 25px rgba(0,0,0,0.9), 0 0 35px rgba(255,255,255,0.06)'
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
