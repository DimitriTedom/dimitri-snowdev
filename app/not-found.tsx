import { Metadata } from 'next'
import { NotFound } from '@/components/ui/not-found-2'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PersonaFloatingButton from '@/components/layout/PersonaFloatingButton'
import { PersonaProvider } from '@/components/providers/PersonaProvider'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Dimitri Tedom',
  description: "The page you're looking for might have been moved or doesn't exist.",
}

export default function RootNotFound() {
  return (
    <PersonaProvider>
      <div className="relative min-h-screen bg-black flex flex-col justify-between overflow-x-clip">
        <Navbar />
        <main className="relative flex-grow w-full flex items-center justify-center">
          <NotFound
            statusCode="404"
            description={
              <>
                The page you&apos;re looking for might have been <br />
                moved or doesn&apos;t exist.
              </>
            }
            primaryHref="/"
            primaryLabel="Go Home"
            secondaryHref="/projects"
            secondaryLabel="Explore"
          />
        </main>
        <Footer />
        <PersonaFloatingButton />
      </div>
    </PersonaProvider>
  )
}
