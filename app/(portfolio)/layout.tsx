import { Suspense } from 'react'
import { PersonaProvider } from '@/components/providers/PersonaProvider'
import Navbar from '@/components/layout/Navbar'
import SidebarSocials from '@/components/layout/SidebarSocials'
import PersonaFloatingButton from '@/components/layout/PersonaFloatingButton'
import Footer from '@/components/layout/Footer'

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-deep flex items-center justify-center text-text-secondary">Loading...</div>}>
      <PersonaProvider>
        <div className="relative min-h-screen bg-bg-deep flex flex-col justify-between">
          <Navbar />
          <SidebarSocials />
          
          <main className="relative flex-grow w-full pt-28 pb-10">
            {children}
          </main>
          
          <Footer />
          <PersonaFloatingButton />
        </div>
      </PersonaProvider>
    </Suspense>
  )
}
