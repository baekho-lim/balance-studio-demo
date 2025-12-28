/**
 * Database Connection
 * Uses Neon Serverless PostgreSQL
 */

import { neon, NeonQueryFunction } from '@neondatabase/serverless'
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// Check for database URL
const databaseUrl = process.env.DATABASE_URL

// Only create actual connection if DATABASE_URL is set
// This allows build to succeed without a database
let sql: NeonQueryFunction<false, false> | null = null
let _db: NeonHttpDatabase<typeof schema> | null = null

if (databaseUrl) {
  sql = neon(databaseUrl)
  _db = drizzle(sql, { schema })
}

// Lazy getter for database - throws at runtime if not configured
export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_, prop) {
    if (!_db) {
      throw new Error('DATABASE_URL is not configured. Please set the DATABASE_URL environment variable.')
    }
    return (_db as unknown as Record<string | symbol, unknown>)[prop]
  }
})

// Check if database is configured
export const isDatabaseConfigured = () => !!databaseUrl

// Re-export schema for convenience
export * from './schema'

// Helper type for database transactions
export type Database = typeof db
