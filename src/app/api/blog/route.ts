/**
 * Blog Posts API
 * CRUD operations for blog posts
 */

import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// Blog post type (simplified for JSON storage)
interface BlogPost {
  id: string
  slug: string
  title: { en: string; ko: string }
  content: { en: string; ko: string }
  excerpt: { en: string; ko: string }
  categoryId?: string
  authorId: string
  authorName: string
  status: 'draft' | 'review' | 'scheduled' | 'published' | 'archived'
  publishedAt?: string
  scheduledAt?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  ogImage?: string
  featuredImage?: string
  viewCount: number
  readTime?: number
  featured: boolean
  pinned: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}

const DATA_FILE = path.join(process.cwd(), 'src/data/blog-posts.json')

// Helper to read blog posts
async function getBlogPosts(): Promise<BlogPost[]> {
  if (!existsSync(DATA_FILE)) {
    return []
  }
  const data = await readFile(DATA_FILE, 'utf-8')
  return JSON.parse(data)
}

// Helper to write blog posts
async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  await writeFile(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8')
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Calculate read time (approx 200 words per minute)
function calculateReadTime(content: string): number {
  const wordCount = content.split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

// GET - List all blog posts (with filters)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let posts = await getBlogPosts()

    // Apply filters
    if (status) {
      posts = posts.filter(p => p.status === status)
    }
    if (category) {
      posts = posts.filter(p => p.categoryId === category)
    }
    if (tag) {
      posts = posts.filter(p => p.tags.includes(tag))
    }
    if (featured === 'true') {
      posts = posts.filter(p => p.featured)
    }

    // Sort by pinned first, then by date
    posts.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    // Pagination
    const total = posts.length
    posts = posts.slice(offset, offset + limit)

    return NextResponse.json({
      posts,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    })
  } catch (error) {
    console.error('Failed to get blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to get blog posts' },
      { status: 500 }
    )
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const posts = await getBlogPosts()

    // Validate required fields
    if (!body.title?.en && !body.title?.ko) {
      return NextResponse.json(
        { error: 'Title is required (at least one language)' },
        { status: 400 }
      )
    }

    // Generate ID and slug
    const id = `post-${Date.now()}`
    const slug = body.slug || generateSlug(body.title.en || body.title.ko)

    // Check for duplicate slug
    if (posts.some(p => p.slug === slug)) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()
    const content = body.content || { en: '', ko: '' }

    const newPost: BlogPost = {
      id,
      slug,
      title: body.title || { en: '', ko: '' },
      content,
      excerpt: body.excerpt || { en: '', ko: '' },
      categoryId: body.categoryId,
      authorId: body.authorId || 'admin-local',
      authorName: body.authorName || 'Admin',
      status: body.status || 'draft',
      publishedAt: body.status === 'published' ? now : undefined,
      scheduledAt: body.scheduledAt,
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
      seoKeywords: body.seoKeywords || [],
      ogImage: body.ogImage,
      featuredImage: body.featuredImage,
      viewCount: 0,
      readTime: calculateReadTime(content.en || content.ko || ''),
      featured: body.featured || false,
      pinned: body.pinned || false,
      tags: body.tags || [],
      createdAt: now,
      updatedAt: now
    }

    posts.push(newPost)
    await saveBlogPosts(posts)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error('Failed to create blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
