'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-4xl md:text-5xl mb-4">
          Something went wrong
        </h1>
        <p className="text-secondary mb-8">
          We apologize for the inconvenience. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-pastel-sage text-white rounded-md hover:bg-pastel-sage/90 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-primary/20 rounded-md hover:bg-pastel-cream transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
