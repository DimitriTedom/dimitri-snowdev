'use client'

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { HomeIcon, CompassIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NotFoundProps {
  className?: string
  statusCode?: string | number
  title?: string
  description?: React.ReactNode
  primaryHref?: string
  primaryLabel?: string
  primaryIcon?: React.ReactNode
  onPrimaryClick?: () => void
  secondaryHref?: string
  secondaryLabel?: string
  secondaryIcon?: React.ReactNode
  onSecondaryClick?: () => void
  children?: React.ReactNode
}

export function NotFound({
  className,
  statusCode = "404",
  description = (
    <>
      The page you&apos;re looking for might have been <br />
      moved or doesn&apos;t exist.
    </>
  ),
  primaryHref = "/",
  primaryLabel = "Go Home",
  primaryIcon = <HomeIcon className="size-4 mr-2" data-icon="inline-start" />,
  onPrimaryClick,
  secondaryHref = "/projects",
  secondaryLabel = "Explore",
  secondaryIcon = <CompassIcon className="size-4 mr-2" data-icon="inline-start" />,
  onSecondaryClick,
  children,
}: NotFoundProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[75vh] w-full items-center justify-center overflow-hidden py-16 px-4 select-none",
        className
      )}
    >
      {/* Ambient background glow */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full filter blur-[140px] opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(174, 107, 246, 0.5) 0%, rgba(94, 23, 235, 0.3) 40%, transparent 70%)'
        }}
      />

      {/* Subtle grid pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <Empty className="relative z-10">
        <EmptyHeader>
          <EmptyTitle
            className="mask-b-from-20% mask-b-to-80% font-display font-black text-8xl sm:text-9xl tracking-tighter uppercase leading-none select-none"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 25%, rgba(0,0,0,0.15) 85%)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 25%, rgba(0,0,0,0.15) 85%)',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #D4B8FF 50%, rgba(174, 107, 246, 0.2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 80px rgba(174, 107, 246, 0.4)',
            }}
          >
            {statusCode}
          </EmptyTitle>
          <EmptyDescription className="-mt-6 sm:-mt-8 text-balance text-sm sm:text-base text-foreground/80 font-sans leading-relaxed">
            {description}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {onPrimaryClick ? (
              <Button
                onClick={onPrimaryClick}
                className="rounded-full px-6 py-2.5 font-display font-medium text-white shadow-[0_4px_20px_rgba(94,23,235,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: '#5e17eb',
                }}
              >
                {primaryIcon}
                {primaryLabel}
              </Button>
            ) : (
              <Button
                asChild
                className="rounded-full px-6 py-2.5 font-display font-medium text-white shadow-[0_4px_20px_rgba(94,23,235,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: '#5e17eb',
                }}
              >
                <Link href={primaryHref}>
                  {primaryIcon}
                  {primaryLabel}
                </Link>
              </Button>
            )}

            {onSecondaryClick ? (
              <Button
                onClick={onSecondaryClick}
                variant="outline"
                className="rounded-full px-6 py-2.5 font-display font-medium border-white/20 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:text-white backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {secondaryIcon}
                {secondaryLabel}
              </Button>
            ) : secondaryHref ? (
              <Button
                asChild
                variant="outline"
                className="rounded-full px-6 py-2.5 font-display font-medium border-white/20 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:text-white backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Link href={secondaryHref}>
                  {secondaryIcon}
                  {secondaryLabel}
                </Link>
              </Button>
            ) : null}
          </div>
          {children}
        </EmptyContent>
      </Empty>
    </div>
  )
}

export default NotFound
