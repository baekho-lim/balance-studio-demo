/**
 * Scheduled Publishing Cron Job API
 *
 * This endpoint is called by Vercel Cron to publish scheduled blog posts.
 * Add to vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/blog/publish-scheduled",
 *     "schedule": "0 * * * *"  // Every hour
 *   }]
 * }
 */

import { NextResponse } from 'next/server'
import { readFile, writeFile, stat } from 'fs/promises'
import path from 'path'

interface BlogPost {
  id: string
  slug: string
  status: 'draft' | 'review' | 'scheduled' | 'published' | 'archived'
  scheduledAt?: string
  publishedAt?: string
  [key: string]: unknown
}

const BLOG_FILE = path.join(process.cwd(), 'src/data/blog-posts.json')

async function getAndPublishScheduledPosts(): Promise<{ published: string[], errors: string[] }> {
  const published: string[] = []
  const errors: string[] = []

  try {
    await stat(BLOG_FILE)
    const data = await readFile(BLOG_FILE, 'utf-8')
    const posts: BlogPost[] = JSON.parse(data)

    const now = new Date()
    let hasChanges = false

    const updatedPosts = posts.map(post => {
      // Check if this post should be published
      if (post.status === 'scheduled' && post.scheduledAt) {
        const scheduledDate = new Date(post.scheduledAt)

        if (scheduledDate <= now) {
          // Time to publish!
          hasChanges = true
          published.push(post.slug)

          return {
            ...post,
            status: 'published' as const,
            publishedAt: now.toISOString(),
          }
        }
      }
      return post
    })

    // Save if there were changes
    if (hasChanges) {
      await writeFile(BLOG_FILE, JSON.stringify(updatedPosts, null, 2))
    }

  } catch (error) {
    errors.push(error instanceof Error ? error.message : 'Unknown error')
  }

  return { published, errors }
}

// GET - Check scheduled posts (can be used for debugging)
export async function GET(request: Request) {
  // Verify cron secret for security (optional but recommended)
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  // If CRON_SECRET is set, verify it
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const result = await getAndPublishScheduledPosts()

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    published: result.published,
    publishedCount: result.published.length,
    errors: result.errors,
  })
}

// POST - Same as GET, for flexibility
export async function POST(request: Request) {
  return GET(request)
}
