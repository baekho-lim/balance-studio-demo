import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { readFile, stat } from 'fs/promises'
import path from 'path'
import { ArrowLeft } from 'lucide-react'

interface BlogPost {
  id: string
  slug: string
  title: { en: string; ko: string }
  content: { en: string; ko: string }
  excerpt: { en: string; ko: string }
  authorName: string
  status: string
  publishedAt?: string
  featuredImage?: string
  viewCount: number
  readTime?: number
  featured: boolean
  pinned: boolean
  tags: string[]
  seoTitle?: string
  seoDescription?: string
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(process.cwd(), 'src/data/blog-posts.json')
    await stat(filePath)
    const data = await readFile(filePath, 'utf-8')
    const posts: BlogPost[] = JSON.parse(data)

    return posts.find(p => p.slug === slug && p.status === 'published') || null
  } catch {
    return null
  }
}

async function getAllSlugs(): Promise<string[]> {
  try {
    const filePath = path.join(process.cwd(), 'src/data/blog-posts.json')
    await stat(filePath)
    const data = await readFile(filePath, 'utf-8')
    const posts: BlogPost[] = JSON.parse(data)

    return posts.filter(p => p.status === 'published').map(p => p.slug)
  } catch {
    return []
  }
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.seoTitle || post.title.ko || post.title.en,
    description: post.seoDescription || post.excerpt.ko || post.excerpt.en,
    openGraph: {
      title: post.seoTitle || post.title.ko || post.title.en,
      description: post.seoDescription || post.excerpt.ko || post.excerpt.en,
      images: post.featuredImage ? [post.featuredImage] : [],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.authorName]
    }
  }
}

// Simple Markdown to HTML (same as editor preview)
function markdownToHtml(md: string): string {
  let html = md
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mt-10 mb-4">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-12 mb-6">$1</h1>')
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener">$1</a>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<figure class="my-8"><img src="$2" alt="$1" class="w-full rounded-lg" /><figcaption class="text-center text-sm text-gray-500 mt-2">$1</figcaption></figure>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg my-6 overflow-x-auto"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-red-600 px-1 py-0.5 rounded">$1</code>')
    .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic my-6 text-gray-600">$1</blockquote>')
    .replace(/^\* (.*$)/gm, '<li class="ml-4 my-1">$1</li>')
    .replace(/^- (.*$)/gm, '<li class="ml-4 my-1">$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 my-1 list-decimal">$1</li>')
    .replace(/\n\n/g, '</p><p class="my-4 leading-relaxed">')
    .replace(/\n/g, '<br />')

  html = html.replace(/(<li.*<\/li>)/g, '<ul class="list-disc ml-4 my-4">$1</ul>')

  return `<p class="my-4 leading-relaxed">${html}</p>`
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const content = post.content.ko || post.content.en

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-sage-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            블로그로 돌아가기
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.pinned && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                고정 글
              </span>
            )}
            {post.featured && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
                추천 글
              </span>
            )}
          </div>

          <h1 className="text-4xl font-serif text-gray-900 mb-4">
            {post.title.ko || post.title.en}
          </h1>

          <div className="flex items-center gap-4 text-gray-600">
            <span>{post.authorName}</span>
            <span>•</span>
            <span>
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : ''}
            </span>
            {post.readTime && (
              <>
                <span>•</span>
                <span>{post.readTime}분 읽기</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="max-w-4xl mx-auto px-4 -mt-6">
          <div className="relative aspect-[2/1] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={post.featuredImage}
              alt={post.title.ko || post.title.en}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-3">태그</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Back to Blog */}
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          다른 글 보기
        </Link>
      </div>
    </main>
  )
}

export const revalidate = 60
