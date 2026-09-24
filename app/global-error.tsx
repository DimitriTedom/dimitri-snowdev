'use client'

import * as React from 'react'
import { NotFound } from '@/components/ui/not-found-2'
import { RefreshCw, HomeIcon } from 'lucide-react'
import '@/styles/globals.css'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    console.error('Global Error Boundary caught:', error)
  }, [error])

  return (
    <html lang="en" className="dark">
      <body className="bg-black text-foreground antialiased font-sans">
        <main className="relative min-h-screen w-full flex items-center justify-center bg-black">
          <NotFound
            statusCode="500"
            description={
              <>
                A critical system error occurred. <br />
                We apologize for the inconvenience.
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
      </body>
    </html>
  )
}
