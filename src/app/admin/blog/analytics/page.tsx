'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  BarChart3,
  TrendingUp,
  Eye,
  FileText,
  Clock,
  ArrowLeft,
  ExternalLink,
  Calendar
} from 'lucide-react'

interface BlogPost {
  id: string
  slug: string
  title: { en: string; ko: string }
  status: 'draft' | 'review' | 'scheduled' | 'published' | 'archived'
  publishedAt?: string
  viewCount: number
  readTime?: number
  tags: string[]
  createdAt: string
}

interface Analytics {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  scheduledPosts: number
  totalViews: number
  avgReadTime: number
  topPosts: BlogPost[]
  recentPosts: BlogPost[]
  tagDistribution: { tag: string; count: number }[]
  monthlyStats: { month: string; posts: number; views: number }[]
}

export default function BlogAnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  async function fetchAnalytics() {
    try {
      const res = await fetch('/api/blog')
      if (!res.ok) throw new Error('Failed to fetch')

      const data = await res.json()
      const posts: BlogPost[] = data.posts

      // Calculate analytics
      const publishedPosts = posts.filter(p => p.status === 'published')
      const draftPosts = posts.filter(p => p.status === 'draft')
      const scheduledPosts = posts.filter(p => p.status === 'scheduled')

      const totalViews = posts.reduce((sum, p) => sum + p.viewCount, 0)
      const avgReadTime = publishedPosts.length > 0
        ? publishedPosts.reduce((sum, p) => sum + (p.readTime || 0), 0) / publishedPosts.length
        : 0

      // Top posts by view count
      const topPosts = [...posts]
        .filter(p => p.status === 'published')
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, 5)

      // Recent posts
      const recentPosts = [...posts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)

      // Tag distribution
      const tagCounts: Record<string, number> = {}
      posts.forEach(p => {
        p.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1
        })
      })
      const tagDistribution = Object.entries(tagCounts)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

      // Monthly stats (last 6 months)
      const now = new Date()
      const monthlyStats: { month: string; posts: number; views: number }[] = []

      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const monthKey = date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'short' })

        const monthPosts = posts.filter(p => {
          const postDate = new Date(p.createdAt)
          return postDate.getMonth() === date.getMonth() &&
                 postDate.getFullYear() === date.getFullYear()
        })

        monthlyStats.push({
          month: monthKey,
          posts: monthPosts.length,
          views: monthPosts.reduce((sum, p) => sum + p.viewCount, 0)
        })
      }

      setAnalytics({
        totalPosts: posts.length,
        publishedPosts: publishedPosts.length,
        draftPosts: draftPosts.length,
        scheduledPosts: scheduledPosts.length,
        totalViews,
        avgReadTime: Math.round(avgReadTime),
        topPosts,
        recentPosts,
        tagDistribution,
        monthlyStats
      })
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/blog" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">블로그 분석</h1>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-500">분석 데이터 로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/blog" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">블로그 분석</h1>
        </div>
        <p className="text-red-500">분석 데이터를 불러오지 못했습니다.</p>
      </div>
    )
  }

  // Find max values for chart scaling
  const maxPosts = Math.max(...analytics.monthlyStats.map(m => m.posts), 1)
  const maxViews = Math.max(...analytics.monthlyStats.map(m => m.views), 1)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">블로그 분석</h1>
            <p className="text-sm text-gray-500">블로그 성과 및 통계</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <FileText className="w-4 h-4" />
            <span className="text-xs">전체 글</span>
          </div>
          <div className="text-2xl font-bold">{analytics.totalPosts}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs">발행됨</span>
          </div>
          <div className="text-2xl font-bold">{analytics.publishedPosts}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <FileText className="w-4 h-4" />
            <span className="text-xs">초안</span>
          </div>
          <div className="text-2xl font-bold">{analytics.draftPosts}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-blue-500 mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-xs">예약됨</span>
          </div>
          <div className="text-2xl font-bold">{analytics.scheduledPosts}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <Eye className="w-4 h-4" />
            <span className="text-xs">총 조회수</span>
          </div>
          <div className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-orange-500 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-xs">평균 읽기</span>
          </div>
          <div className="text-2xl font-bold">{analytics.avgReadTime}분</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Chart */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-gray-500" />
            <h2 className="font-semibold">월별 통계</h2>
          </div>
          <div className="space-y-4">
            {analytics.monthlyStats.map((stat, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{stat.month}</span>
                  <span className="text-gray-400">{stat.posts}개 글, {stat.views} 조회</span>
                </div>
                <div className="flex gap-2 h-4">
                  <div
                    className="bg-blue-500 rounded-sm"
                    style={{ width: `${(stat.posts / maxPosts) * 50}%` }}
                    title={`${stat.posts}개 글`}
                  />
                  <div
                    className="bg-purple-500 rounded-sm"
                    style={{ width: `${(stat.views / maxViews) * 50}%` }}
                    title={`${stat.views} 조회`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-sm" />
              <span>발행 글</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-500 rounded-sm" />
              <span>조회수</span>
            </div>
          </div>
        </div>

        {/* Top Posts */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-gray-500" />
            <h2 className="font-semibold">인기 글 Top 5</h2>
          </div>
          {analytics.topPosts.length === 0 ? (
            <p className="text-gray-400 text-sm">발행된 글이 없습니다</p>
          ) : (
            <div className="space-y-3">
              {analytics.topPosts.map((post, idx) => (
                <div key={post.id} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">
                      {post.title.ko || post.title.en}
                    </div>
                    <div className="text-xs text-gray-400">
                      {post.viewCount.toLocaleString()} 조회
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tag Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="font-semibold mb-4">태그 분포</h2>
          {analytics.tagDistribution.length === 0 ? (
            <p className="text-gray-400 text-sm">태그가 없습니다</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {analytics.tagDistribution.map(({ tag, count }) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  #{tag}
                  <span className="ml-1 text-gray-400">({count})</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Recent Posts */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="font-semibold mb-4">최근 작성 글</h2>
          {analytics.recentPosts.length === 0 ? (
            <p className="text-gray-400 text-sm">글이 없습니다</p>
          ) : (
            <div className="space-y-3">
              {analytics.recentPosts.map(post => (
                <div key={post.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">
                      {post.title.ko || post.title.en}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    post.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : post.status === 'scheduled'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {post.status === 'published' ? '발행됨' :
                     post.status === 'scheduled' ? '예약됨' :
                     post.status === 'draft' ? '초안' : post.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
