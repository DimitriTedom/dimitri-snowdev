'use client'

import * as React from 'react'
import { NotFound } from '@/components/ui/not-found-2'
import { RefreshCw, HomeIcon } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PersonaFloatingButton from '@/components/layout/PersonaFloatingButton'
import { PersonaProvider } from '@/components/providers/PersonaProvider'

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    console.error('Root Error Boundary caught:', error)
  }, [error])

  return (
    <PersonaProvider>
      <div className="relative min-h-screen bg-black flex flex-col justify-between overflow-x-clip">
        <Navbar />
        <main className="relative flex-grow w-full flex items-center justify-center">
          <NotFound
            statusCode="500"
            description={
              <>
                Something went wrong while loading this page. <br />
                Our automated telemetry has logged the issue.
              </>
            }
            primaryLabel="Try Again"
            primaryIcon={<RefreshCw className="size-4 mr-2" data-icon="inline-start" />}
            onPrimaryClick={() => reset()}
            secondaryHref="/"
            secondaryLabel="Go Home"
            secondaryIcon={<HomeIcon className="size-4 mr-2" data-icon="inline-start" />}
          >
            {process.env.NODE_ENV === 'development' && error?.message && (
              <p className="mt-4 max-w-md rounded-lg border border-red-500/20 bg-red-500/10 p-3 font-mono text-xs text-red-300">
                {error.message}
              </p>
            )}
          </NotFound>
        </main>
        <Footer />
        <PersonaFloatingButton />
      </div>
    </PersonaProvider>
  )
}
