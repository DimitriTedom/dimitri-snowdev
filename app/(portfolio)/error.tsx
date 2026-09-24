'use client'

import * as React from 'react'
import { NotFound } from '@/components/ui/not-found-2'
import { RefreshCw, HomeIcon } from 'lucide-react'

export default function PortfolioError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // Log error to console / monitoring in dev
    console.error('Portfolio Error Boundary caught:', error)
  }, [error])

  return (
    <div className="relative min-h-[85vh] w-full flex items-center justify-center">
      <NotFound
        statusCode="500"
        description={
          <>
            Something went wrong while processing your request. <br />
            Our systems have logged this incident.
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
    </div>
  )
}
