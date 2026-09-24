import { Suspense } from 'react'
import { PersonaProvider } from '@/components/providers/PersonaProvider'
import Navbar from '@/components/layout/Navbar'
import SidebarSocials from '@/components/layout/SidebarSocials'
import PersonaFloatingButton from '@/components/layout/PersonaFloatingButton'
import Footer from '@/components/layout/Footer'

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-text-secondary">Loading...</div>}>
      <PersonaProvider>
        <div className="relative min-h-screen bg-black flex flex-col justify-between overflow-x-clip">
          <Navbar />
          <SidebarSocials />
          
          <main className="relative flex-grow w-full">
            {children}
          </main>
          
          <Footer />
          <PersonaFloatingButton />
        </div>
      </PersonaProvider>
    </Suspense>
  )
}
