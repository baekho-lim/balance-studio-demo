'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, Pin, Star, Search, Filter, BarChart3 } from 'lucide-react'

interface BlogPost {
  id: string
  slug: string
  title: { en: string; ko: string }
  excerpt: { en: string; ko: string }
  authorName: string
  status: 'draft' | 'review' | 'scheduled' | 'published' | 'archived'
  publishedAt?: string
  scheduledAt?: string
  viewCount: number
  featured: boolean
  pinned: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  review: 'bg-yellow-100 text-yellow-800',
  scheduled: 'bg-blue-100 text-blue-800',
  published: 'bg-green-100 text-green-800',
  archived: 'bg-red-100 text-red-800'
}

const STATUS_LABELS: Record<string, string> = {
  draft: '초안',
  review: '검토 중',
  scheduled: '예약됨',
  published: '발행됨',
  archived: '보관됨'
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [statusFilter])

  async function fetchPosts() {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter !== 'all') {
        params.set('status', statusFilter)
      }

      const res = await fetch(`/api/blog?${params}`)
      if (!res.ok) throw new Error('Failed to fetch posts')

      const data = await res.json()
      setPosts(data.posts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(slug: string) {
    try {
      const res = await fetch(`/api/blog/${slug}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete post')

      setPosts(posts.filter(p => p.slug !== slug))
      setDeleteConfirm(null)
    } catch (err) {
      alert('삭제 실패: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  async function togglePin(post: BlogPost) {
    try {
      const res = await fetch(`/api/blog/${post.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pinned: !post.pinned })
      })
      if (!res.ok) throw new Error('Failed to update post')

      const updated = await res.json()
      setPosts(posts.map(p => p.id === post.id ? updated : p))
    } catch (err) {
      alert('업데이트 실패')
    }
  }

  async function toggleFeatured(post: BlogPost) {
    try {
      const res = await fetch(`/api/blog/${post.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !post.featured })
      })
      if (!res.ok) throw new Error('Failed to update post')

      const updated = await res.json()
      setPosts(posts.map(p => p.id === post.id ? updated : p))
    } catch (err) {
      alert('업데이트 실패')
    }
  }

  // Filter by search query
  const filteredPosts = posts.filter(post => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      post.title.en?.toLowerCase().includes(query) ||
      post.title.ko?.toLowerCase().includes(query) ||
      post.tags.some(t => t.toLowerCase().includes(query))
    )
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">블로그 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            블로그 글을 작성하고 관리합니다
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/blog/analytics"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            분석
          </Link>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            새 글 작성
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="제목, 태그로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">모든 상태</option>
            <option value="draft">초안</option>
            <option value="review">검토 중</option>
            <option value="scheduled">예약됨</option>
            <option value="published">발행됨</option>
            <option value="archived">보관됨</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {(['all', 'draft', 'review', 'scheduled', 'published'] as const).map(status => {
          const count = status === 'all'
            ? posts.length
            : posts.filter(p => p.status === status).length
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`p-4 rounded-lg text-left transition-colors ${
                statusFilter === status
                  ? 'bg-blue-100 border-2 border-blue-500'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl font-bold">{count}</div>
              <div className="text-sm text-gray-500">
                {status === 'all' ? '전체' : STATUS_LABELS[status]}
              </div>
            </button>
          )
        })}
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-500">로딩 중...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">
          <p>{error}</p>
          <button
            onClick={fetchPosts}
            className="mt-2 text-blue-600 hover:underline"
          >
            다시 시도
          </button>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">블로그 글이 없습니다</p>
          <Link
            href="/admin/blog/new"
            className="text-blue-600 hover:underline"
          >
            첫 번째 글 작성하기
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제목
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  조회
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  날짜
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map(post => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {post.pinned && (
                        <Pin className="w-4 h-4 text-blue-500" />
                      )}
                      {post.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      )}
                      <div>
                        <div className="font-medium text-gray-900">
                          {post.title.ko || post.title.en}
                        </div>
                        <div className="text-sm text-gray-500">
                          {post.authorName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[post.status]}`}>
                      {STATUS_LABELS[post.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {post.viewCount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString('ko-KR')
                      : new Date(post.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => togglePin(post)}
                        className={`p-2 rounded-lg transition-colors ${
                          post.pinned ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-400'
                        }`}
                        title={post.pinned ? '고정 해제' : '고정'}
                      >
                        <Pin className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleFeatured(post)}
                        className={`p-2 rounded-lg transition-colors ${
                          post.featured ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-gray-100 text-gray-400'
                        }`}
                        title={post.featured ? '추천 해제' : '추천'}
                      >
                        <Star className="w-4 h-4" />
                      </button>
                      {post.status === 'published' && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"
                          title="보기"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        href={`/admin/blog/${post.slug}/edit`}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"
                        title="편집"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      {deleteConfirm === post.slug ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(post.slug)}
                            className="px-2 py-1 bg-red-600 text-white text-xs rounded"
                          >
                            확인
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded"
                          >
                            취소
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(post.slug)}
                          className="p-2 hover:bg-red-100 rounded-lg text-gray-400 hover:text-red-600"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
