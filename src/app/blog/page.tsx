import Link from 'next/link'
import Image from 'next/image'
import { readFile, stat } from 'fs/promises'
import path from 'path'

interface BlogPost {
  id: string
  slug: string
  title: { en: string; ko: string }
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
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const filePath = path.join(process.cwd(), 'src/data/blog-posts.json')
    await stat(filePath)
    const data = await readFile(filePath, 'utf-8')
    const posts: BlogPost[] = JSON.parse(data)

    // Only return published posts
    return posts
      .filter(p => p.status === 'published')
      .sort((a, b) => {
        if (a.pinned && !b.pinned) return -1
        if (!a.pinned && b.pinned) return 1
        return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
      })
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-sage-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">Blog</h1>
          <p className="text-lg text-gray-600">
            예술과 창작에 대한 생각을 나눕니다
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">아직 작성된 글이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map(post => (
              <article
                key={post.id}
                className="group border-b border-gray-100 pb-8 last:border-0"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Featured Image */}
                    {post.featuredImage && (
                      <div className="md:w-48 h-32 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={post.featuredImage}
                          alt={post.title.ko || post.title.en}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {post.pinned && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                            고정
                          </span>
                        )}
                        {post.featured && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                            추천
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {post.title.ko || post.title.en}
                      </h2>

                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {post.excerpt.ko || post.excerpt.en}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
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

                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {post.tags.slice(0, 4).map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export const revalidate = 60 // Revalidate every minute
