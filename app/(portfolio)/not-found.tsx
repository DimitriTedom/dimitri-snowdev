import { Metadata } from 'next'
import { NotFound } from '@/components/ui/not-found-2'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Dimitri Tedom (SnowDev)',
  description: "The page you're looking for might have been moved or doesn't exist.",
}

export default function PortfolioNotFound() {
  return (
    <div className="relative min-h-[85vh] w-full flex items-center justify-center">
      <NotFound
        statusCode="404"
        description={
          <>
            The page you&apos;re looking for might have been <br />
            moved or doesn&apos;t exist in this dimension.
          </>
        }
        primaryHref="/"
        primaryLabel="Go Home"
        secondaryHref="/projects"
        secondaryLabel="Explore Projects"
      />
    </div>
  )
}
