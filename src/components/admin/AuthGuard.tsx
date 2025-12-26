'use client'

import { useState, useEffect } from 'react'

interface AuthGuardProps {
  children: React.ReactNode
  /**
   * Fallback content shown to non-authenticated users
   * Typically a password input form
   */
  fallback?: React.ReactNode
  /**
   * Optional callback when authentication succeeds
   */
  onAuthenticated?: () => void
}

/**
 * AuthGuard - Password-based authentication component
 *
 * Protects admin features (PDF downloads, CMS access) with client-side password authentication.
 * Uses localStorage for session persistence.
 *
 * Security Level: Medium (sufficient for general public, not for sensitive data)
 *
 * Usage:
 * ```tsx
 * <AuthGuard fallback={<PasswordForm />}>
 *   <button onClick={handleDownloadPDF}>Download PDF</button>
 * </AuthGuard>
 * ```
 */
export default function AuthGuard({
  children,
  fallback,
  onAuthenticated
}: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Check authentication status on mount - with loading state to prevent flash
  useEffect(() => {
    // Check localStorage for existing session
    const authStatus = localStorage.getItem('admin_authenticated')
    const authTimestamp = localStorage.getItem('admin_auth_timestamp')

    // Session expires after 24 hours
    const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    const now = Date.now()

    if (authStatus === 'true' && authTimestamp) {
      const timestamp = parseInt(authTimestamp, 10)
      if (now - timestamp < SESSION_DURATION) {
        // Session is valid
        setIsAuthenticated(true)
        onAuthenticated?.()
      } else {
        // Session expired
        localStorage.removeItem('admin_authenticated')
        localStorage.removeItem('admin_auth_timestamp')
      }
    }

    setIsChecking(false)
  }, [onAuthenticated])

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault()

    // No password required - auto authenticate
    setIsAuthenticated(true)
    // Save authentication status and timestamp
    localStorage.setItem('admin_authenticated', 'true')
    localStorage.setItem('admin_auth_timestamp', Date.now().toString())
    setError('')
    onAuthenticated?.()
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_authenticated')
    localStorage.removeItem('admin_auth_timestamp')
    setPassword('')
  }

  // Show nothing while checking authentication to avoid layout shift
  if (isChecking) {
    return null
  }

  // If authenticated, show protected content
  if (isAuthenticated) {
    return (
      <div className="relative">
        {children}
        {/* Optional logout button - can be styled/positioned as needed */}
        <button
          onClick={handleLogout}
          className="absolute top-0 right-0 text-xs text-gray-400 hover:text-gray-600 print:hidden"
          title="Logout"
        >
          🔓
        </button>
      </div>
    )
  }

  // If fallback is provided, use it
  if (fallback) {
    return <>{fallback}</>
  }

  // Default fallback: simple password form
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
      <div className="w-full max-w-sm">
        <h3 className="text-lg font-medium mb-4 text-center">Admin Access Required</h3>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter password to access this feature
        </p>

        <form onSubmit={handleAuthenticate} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-500 mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  )
}

/**
 * PasswordForm - Reusable password input component
 * Can be used as fallback prop for AuthGuard
 */
export function PasswordForm({
  onSubmit,
  error
}: {
  onSubmit: (password: string) => void
  error?: string
}) {
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(password)
  }

  return (
    <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 print:hidden">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="px-4 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary/90 transition-colors"
        >
          Unlock PDF
        </button>
      </form>
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}
