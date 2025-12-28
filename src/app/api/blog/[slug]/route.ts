/**
 * Blog Post Detail API
 * GET, PUT, DELETE operations for individual blog posts
 */

import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// Blog post type
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

// Calculate read time
function calculateReadTime(content: string): number {
  const wordCount = content.split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

// GET - Get single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const posts = await getBlogPosts()
    const post = posts.find(p => p.slug === slug || p.id === slug)

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Increment view count for published posts (optional: could be skipped for admin)
    const { searchParams } = new URL(request.url)
    const incrementView = searchParams.get('view') === 'true'

    if (incrementView && post.status === 'published') {
      post.viewCount += 1
      await saveBlogPosts(posts)
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Failed to get blog post:', error)
    return NextResponse.json(
      { error: 'Failed to get blog post' },
      { status: 500 }
    )
  }
}

// PUT - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()
    const posts = await getBlogPosts()
    const index = posts.findIndex(p => p.slug === slug || p.id === slug)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    const existingPost = posts[index]
    const now = new Date().toISOString()

    // Check for slug conflict if changing slug
    if (body.slug && body.slug !== existingPost.slug) {
      if (posts.some(p => p.slug === body.slug && p.id !== existingPost.id)) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 400 }
        )
      }
    }

    // Handle status changes
    let publishedAt = existingPost.publishedAt
    if (body.status === 'published' && existingPost.status !== 'published') {
      publishedAt = now
    }

    const content = body.content || existingPost.content

    const updatedPost: BlogPost = {
      ...existingPost,
      slug: body.slug || existingPost.slug,
      title: body.title || existingPost.title,
      content,
      excerpt: body.excerpt || existingPost.excerpt,
      categoryId: body.categoryId !== undefined ? body.categoryId : existingPost.categoryId,
      authorId: body.authorId || existingPost.authorId,
      authorName: body.authorName || existingPost.authorName,
      status: body.status || existingPost.status,
      publishedAt,
      scheduledAt: body.scheduledAt !== undefined ? body.scheduledAt : existingPost.scheduledAt,
      seoTitle: body.seoTitle !== undefined ? body.seoTitle : existingPost.seoTitle,
      seoDescription: body.seoDescription !== undefined ? body.seoDescription : existingPost.seoDescription,
      seoKeywords: body.seoKeywords || existingPost.seoKeywords,
      ogImage: body.ogImage !== undefined ? body.ogImage : existingPost.ogImage,
      featuredImage: body.featuredImage !== undefined ? body.featuredImage : existingPost.featuredImage,
      readTime: calculateReadTime(content.en || content.ko || ''),
      featured: body.featured !== undefined ? body.featured : existingPost.featured,
      pinned: body.pinned !== undefined ? body.pinned : existingPost.pinned,
      tags: body.tags || existingPost.tags,
      updatedAt: now
    }

    posts[index] = updatedPost
    await saveBlogPosts(posts)

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Failed to update blog post:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// DELETE - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const posts = await getBlogPosts()
    const index = posts.findIndex(p => p.slug === slug || p.id === slug)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    const deletedPost = posts.splice(index, 1)[0]
    await saveBlogPosts(posts)

    return NextResponse.json({
      message: 'Blog post deleted',
      post: deletedPost
    })
  } catch (error) {
    console.error('Failed to delete blog post:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
