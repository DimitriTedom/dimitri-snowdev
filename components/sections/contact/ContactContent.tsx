'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  Send,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  Building,
} from 'lucide-react'

const SERVICE_OPTIONS = [
  'Full Stack Web Application (Next.js / MERN)',
  'AI Engineering & Automated Workflows',
  'AWS Cloud Architecture & DevOps',
  'UI/UX Design & High-Fidelity Prototyping (Figma)',
  'Custom E-commerce Platform',
  'API & Backend Engineering',
  'Consulting & Technical Mentoring',
]

export default function ContactContent() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    service: SERVICE_OPTIONS[0],
    message: '',
    privacyAccepted: false,
    termsAccepted: false,
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.privacyAccepted || !formData.termsAccepted) {
      setStatus('error')
      setStatusMessage('Please accept both the privacy policy and terms before submitting.')
      return
    }

    setStatus('loading')
    setStatusMessage('')

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim() || formData.firstName
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email: formData.email,
          company: formData.company,
          service: formData.service,
          message: formData.message,
          termsAccepted: true,
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to send message')
      }

      setStatus('success')
      setStatusMessage('Your message has been sent successfully! I will reply very soon.')
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        service: SERVICE_OPTIONS[0],
        message: '',
        privacyAccepted: false,
        termsAccepted: false,
      })
    } catch {
      setStatus('error')
      setStatusMessage('Something went wrong sending your message. Please try again or email directly.')
    }
  }

  return (
    <div className="relative w-full min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-20">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* ── Top Aeruk-Style Marquee Strip ── */}
      <div className="w-full overflow-hidden border-y border-white/10 py-3 -mt-6 select-none opacity-80">
        <div className="flex gap-8 whitespace-nowrap animate-footer-scroll-marquee text-xs font-mono font-medium tracking-[0.25em] text-white/50 uppercase">
          <span>LET&apos;S TALK</span>
          <span className="text-violet-400">✦</span>
          <span>START A PROJECT</span>
          <span className="text-violet-400">✦</span>
          <span>OPEN FOR FREELANCE</span>
          <span className="text-violet-400">✦</span>
          <span>BUILD TOGETHER</span>
          <span className="text-violet-400">✦</span>
          <span>NEXT-GEN ENGINEERING</span>
          <span className="text-violet-400">✦</span>
          <span>LET&apos;S TALK</span>
          <span className="text-violet-400">✦</span>
          <span>START A PROJECT</span>
          <span className="text-violet-400">✦</span>
          <span>OPEN FOR FREELANCE</span>
          <span className="text-violet-400">✦</span>
          <span>BUILD TOGETHER</span>
        </div>
      </div>

      {/* ── Main Contact Grid: Left Info & Right Form ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Direct info, approach & personal data policy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col gap-8"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm text-[11px] font-mono uppercase tracking-widest text-violet-300 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            Get In Touch
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
              CONTACT
            </h1>
            <p className="font-display font-bold text-lg sm:text-xl text-violet-400">
              Have a project in mind?
            </p>
          </div>

          <div className="space-y-4 text-text-secondary font-light text-sm sm:text-base leading-relaxed">
            <p>
              Whether you need high-performance web development, AI workflow automation, or bespoke interface design, feel free to reach out!
            </p>
            <p>
              We will exchange by email in the first instance, and can easily follow up on WhatsApp or Google Meet to facilitate seamless collaboration. I am ready to bring your vision to life.
            </p>
          </div>

          {/* Direct Contact Cards */}
          <div className="flex flex-col gap-3.5 pt-2">
            {/* Phone */}
            <a
              href="tel:+237695760594"
              className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-violet-500/40 hover:bg-violet-600/10 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                  Direct Phone / WhatsApp
                </span>
                <span className="text-base font-semibold text-white tracking-wide group-hover:text-violet-200">
                  +237 695 760 594
                </span>
              </div>
              <ArrowUpRight className="ml-auto w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* Email */}
            <a
              href="mailto:dimitritedom@gmail.com"
              className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-violet-500/40 hover:bg-violet-600/10 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                  Primary Email
                </span>
                <span className="text-base font-semibold text-white tracking-wide group-hover:text-violet-200">
                  dimitritedom@gmail.com
                </span>
              </div>
              <ArrowUpRight className="ml-auto w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>

          {/* Aeruk-style Personal Data Processing Notice */}
          <div className="p-4 rounded-2xl bg-white/[0.015] border border-white/10 text-[11px] text-text-muted leading-relaxed font-light space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-mono uppercase text-white/70">
              <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
              Personal Data Processing Notice
            </span>
            <p>
              Your contact information is collected strictly to respond to your project request and will never be sold or shared with third parties. You hold full rights to access, amend, or request the deletion of your transmitted data at any time.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Aeruk-Style Interactive Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="relative rounded-3xl p-6 sm:p-10 border border-white/10 bg-[#0c0b1d]/85 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <MessageSquare className="w-4 h-4 text-violet-400" />
              <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-white">
                Project Inquiry Form
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="firstName" className="text-xs font-mono uppercase text-white/70">
                    First Name <span className="text-violet-400">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 focus:border-violet-500 focus:bg-white/[0.06] text-white placeholder-white/30 text-sm outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="lastName" className="text-xs font-mono uppercase text-white/70">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 focus:border-violet-500 focus:bg-white/[0.06] text-white placeholder-white/30 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              {/* Company & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-xs font-mono uppercase text-white/70">
                    Company / Project Name
                  </label>
                  <div className="relative">
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Studio"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 focus:border-violet-500 focus:bg-white/[0.06] text-white placeholder-white/30 text-sm outline-none transition-all"
                    />
                    <Building className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-mono uppercase text-white/70">
                    Email Address <span className="text-violet-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 focus:border-violet-500 focus:bg-white/[0.06] text-white placeholder-white/30 text-sm outline-none transition-all"
                    />
                    <Mail className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Service Selection dropdown */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="service" className="text-xs font-mono uppercase text-white/70">
                  Select Your Service <span className="text-violet-400">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#09081a] border border-white/15 focus:border-violet-500 text-white text-sm outline-none transition-all cursor-pointer"
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#09081a] text-white py-1">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-mono uppercase text-white/70">
                  Message & Project Details <span className="text-violet-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, deliverables, and goals..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 focus:border-violet-500 focus:bg-white/[0.06] text-white placeholder-white/30 text-sm outline-none transition-all resize-y min-h-[120px]"
                />
              </div>

              {/* RGPD / GDPR Checkboxes (Aeruk style) */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="privacyAccepted"
                    checked={formData.privacyAccepted}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-violet-600 focus:ring-violet-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-xs text-text-secondary font-light leading-relaxed">
                    I have read and accept the{' '}
                    <span className="text-white underline">privacy policy</span>{' '}
                    <span className="text-violet-400">*</span>
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-violet-600 focus:ring-violet-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-xs text-text-secondary font-light leading-relaxed">
                    I have read and agree to the{' '}
                    <span className="text-white underline">terms &amp; conditions</span>{' '}
                    <span className="text-violet-400">*</span>
                  </span>
                </label>
              </div>

              {/* Feedback messages */}
              {status === 'success' && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white text-black font-sans font-semibold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
                  style={{
                    boxShadow: '0 0 30px -5px rgba(94, 23, 235, 0.45)',
                  }}
                >
                  <span>{status === 'loading' ? 'Sending Message...' : 'Send Message'}</span>
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <Send size={15} />
                  </div>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
