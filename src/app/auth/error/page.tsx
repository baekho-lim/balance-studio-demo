'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const errorMessages: Record<string, string> = {
  Configuration: 'There is a problem with the server configuration.',
  AccessDenied: 'You do not have permission to sign in.',
  Verification: 'The verification token has expired or has already been used.',
  Default: 'An error occurred during authentication.',
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') || 'Default'

  const message = errorMessages[error] || errorMessages.Default

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl text-red-500">!</div>
        <h1 className="text-2xl font-bold text-gray-900">Authentication Error</h1>
        <p className="text-gray-600">{message}</p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/signin"
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </main>
  )
}
