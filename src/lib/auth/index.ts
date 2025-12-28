/**
 * NextAuth.js v5 Configuration
 * Supports multiple authentication providers with RBAC
 */

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import type { UserRole } from './types'

// Extend the default session types
declare module 'next-auth' {
  interface User {
    role?: UserRole
  }
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: UserRole
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Use JWT session strategy (no database required for basic auth)
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },

  providers: [
    // Credentials provider for admin password (backward compatibility)
    Credentials({
      id: 'admin-password',
      name: 'Admin Password',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Simple password check for backward compatibility
        const adminPassword = process.env.ADMIN_PASSWORD || '1234'

        if (credentials?.password === adminPassword) {
          // Return a pseudo-user for admin access
          return {
            id: 'admin-local',
            name: 'Admin',
            email: 'admin@local',
            role: 'admin' as UserRole,
          }
        }
        return null
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.role = user.role || 'admin'
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || ''
        session.user.role = (token.role as UserRole) || 'viewer'
      }
      return session
    },
  },
})
