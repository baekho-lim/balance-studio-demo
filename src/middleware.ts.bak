/**
 * NextAuth.js Middleware
 * Protects routes based on authentication status
 */

import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/admin']

// Routes that require specific roles
const roleProtectedRoutes: Record<string, string[]> = {
  '/admin/users': ['admin'],
  '/admin/settings': ['admin'],
}

export default auth((req) => {
  const { pathname } = req.nextUrl

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Check authentication
  if (!req.auth) {
    // Redirect to sign in page
    const signInUrl = new URL('/auth/signin', req.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Check role-based access
  const userRole = req.auth.user?.role || 'viewer'

  for (const [route, allowedRoles] of Object.entries(roleProtectedRoutes)) {
    if (pathname.startsWith(route)) {
      if (!allowedRoles.includes(userRole)) {
        // Redirect to unauthorized page
        return NextResponse.redirect(new URL('/auth/unauthorized', req.url))
      }
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
}
