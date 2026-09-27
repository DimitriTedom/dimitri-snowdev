import { Metadata } from 'next'
import ContactContent from '@/components/sections/contact/ContactContent'

export const metadata: Metadata = {
  title: 'Contact | Dimitri Tedom (SnowDev)',
  description:
    'Get in touch with Dimitri Tedom (SnowDev) for freelance web development, AI engineering, cloud architecture, and UI/UX design projects.',
}

export default function ContactPage() {
  return (
    <main className="relative w-full flex flex-col bg-[#060618] overflow-hidden">
      <ContactContent />
    </main>
  )
}
