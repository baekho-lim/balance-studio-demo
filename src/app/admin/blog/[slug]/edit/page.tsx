'use client'

import { useState, useEffect, use } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Clock, Eye, Send, Trash2, ExternalLink } from 'lucide-react'
import MarkdownEditor from '@/components/admin/MarkdownEditor'

interface BlogPostForm {
  id: string
  title: { en: string; ko: string }
  content: { en: string; ko: string }
  excerpt: { en: string; ko: string }
  slug: string
  status: 'draft' | 'review' | 'scheduled' | 'published' | 'archived'
  publishedAt?: string
  scheduledAt: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  featuredImage: string
  ogImage: string
  tags: string
  featured: boolean
  pinned: boolean
  viewCount: number
  createdAt: string
}

export default function EditBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const isNewlyCreated = searchParams.get('created') === 'true'

  const [form, setForm] = useState<BlogPostForm | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(isNewlyCreated ? '글이 저장되었습니다!' : null)
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content')
  const [activeLang, setActiveLang] = useState<'ko' | 'en'>('ko')
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  useEffect(() => {
    fetchPost()
  }, [slug])

  async function fetchPost() {
    try {
      setLoading(true)
      const res = await fetch(`/api/blog/${slug}`)
      if (!res.ok) throw new Error('Post not found')

      const post = await res.json()
      setForm({
        ...post,
        scheduledAt: post.scheduledAt || '',
        seoTitle: post.seoTitle || '',
        seoDescription: post.seoDescription || '',
        seoKeywords: (post.seoKeywords || []).join(', '),
        featuredImage: post.featuredImage || '',
        ogImage: post.ogImage || '',
        tags: (post.tags || []).join(', ')
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (newStatus?: 'draft' | 'published' | 'scheduled' | 'archived') => {
    if (!form) return

    try {
      setSaving(true)
      setError(null)
      setSuccess(null)

      const status = newStatus || form.status

      if (status === 'scheduled' && !form.scheduledAt) {
        setError('예약 발행 시간을 선택해주세요')
        return
      }

      const payload = {
        ...form,
        status,
        seoKeywords: form.seoKeywords.split(',').map(k => k.trim()).filter(Boolean),
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
      }

      const res = await fetch(`/api/blog/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update post')
      }

      const updated = await res.json()

      // If slug changed, redirect
      if (updated.slug !== slug) {
        router.push(`/admin/blog/${updated.slug}/edit?saved=true`)
      } else {
        setForm({
          ...updated,
          scheduledAt: updated.scheduledAt || '',
          seoTitle: updated.seoTitle || '',
          seoDescription: updated.seoDescription || '',
          seoKeywords: (updated.seoKeywords || []).join(', '),
          featuredImage: updated.featuredImage || '',
          ogImage: updated.ogImage || '',
          tags: (updated.tags || []).join(', ')
        })
        setSuccess('저장되었습니다!')
        setTimeout(() => setSuccess(null), 3000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장 실패')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!form) return

    try {
      setSaving(true)
      const res = await fetch(`/api/blog/${slug}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete post')

      router.push('/admin/blog')
    } catch (err) {
      setError(err instanceof Error ? err.message : '삭제 실패')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-500">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || '글을 찾을 수 없습니다'}</p>
          <Link href="/admin/blog" className="text-blue-600 hover:underline">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/blog"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {form.title.ko || form.title.en || '제목 없음'}
                </h1>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    form.status === 'published' ? 'bg-green-100 text-green-700' :
                    form.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                    form.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {form.status === 'published' ? '발행됨' :
                     form.status === 'draft' ? '초안' :
                     form.status === 'scheduled' ? '예약됨' : form.status}
                  </span>
                  <span>|</span>
                  <span>조회 {form.viewCount.toLocaleString()}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {form.status === 'published' && (
                <Link
                  href={`/blog/${form.slug}`}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  보기
                </Link>
              )}
              <button
                onClick={() => handleSave()}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                저장
              </button>
              {form.status !== 'published' && (
                <>
                  <button
                    onClick={() => handleSave('scheduled')}
                    disabled={saving || !form.scheduledAt}
                    className="flex items-center gap-2 px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
                    title={!form.scheduledAt ? '설정 탭에서 예약 시간을 설정하세요' : ''}
                  >
                    <Clock className="w-4 h-4" />
                    예약
                  </button>
                  <button
                    onClick={() => handleSave('published')}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    발행
                  </button>
                </>
              )}
              {form.status === 'published' && (
                <button
                  onClick={() => handleSave('archived')}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors disabled:opacity-50"
                >
                  보관
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      {(error || success) && (
        <div className="max-w-7xl mx-auto px-4 py-2">
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
              {success}
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-4 border-b border-gray-200">
          {(['content', 'seo', 'settings'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'content' && '콘텐츠'}
              {tab === 'seo' && 'SEO'}
              {tab === 'settings' && '설정'}
            </button>
          ))}
        </div>
      </div>

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="max-w-7xl mx-auto px-4 pb-8">
          {/* Language Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveLang('ko')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeLang === 'ko'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              한국어
            </button>
            <button
              onClick={() => setActiveLang('en')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeLang === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              English
            </button>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              제목 ({activeLang === 'ko' ? '한국어' : 'English'})
            </label>
            <input
              type="text"
              value={form.title[activeLang]}
              onChange={(e) => setForm(prev => prev ? ({
                ...prev,
                title: { ...prev.title, [activeLang]: e.target.value }
              }) : null)}
              placeholder={activeLang === 'ko' ? '블로그 글 제목을 입력하세요' : 'Enter blog post title'}
              className="w-full px-4 py-3 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Excerpt */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              요약 ({activeLang === 'ko' ? '한국어' : 'English'})
            </label>
            <textarea
              value={form.excerpt[activeLang]}
              onChange={(e) => setForm(prev => prev ? ({
                ...prev,
                excerpt: { ...prev.excerpt, [activeLang]: e.target.value }
              }) : null)}
              placeholder={activeLang === 'ko' ? '글 요약을 입력하세요 (목록에 표시됨)' : 'Enter excerpt (shown in lists)'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
            />
          </div>

          {/* Content Editor */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              본문 ({activeLang === 'ko' ? '한국어' : 'English'})
            </label>
            <MarkdownEditor
              value={form.content[activeLang]}
              onChange={(value) => setForm(prev => prev ? ({
                ...prev,
                content: { ...prev.content, [activeLang]: value }
              }) : null)}
              placeholder={activeLang === 'ko' ? '마크다운으로 글을 작성하세요...' : 'Write your content in Markdown...'}
              minHeight="500px"
            />
          </div>
        </div>
      )}

      {/* SEO Tab */}
      {activeTab === 'seo' && (
        <div className="max-w-3xl mx-auto px-4 pb-8">
          <div className="bg-white rounded-lg p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL 슬러그
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 text-sm">
                  /blog/
                </span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm(prev => prev ? ({ ...prev, slug: e.target.value }) : null)}
                  placeholder="post-url-slug"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO 제목
              </label>
              <input
                type="text"
                value={form.seoTitle}
                onChange={(e) => setForm(prev => prev ? ({ ...prev, seoTitle: e.target.value }) : null)}
                placeholder="검색 결과에 표시될 제목"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO 설명
              </label>
              <textarea
                value={form.seoDescription}
                onChange={(e) => setForm(prev => prev ? ({ ...prev, seoDescription: e.target.value }) : null)}
                placeholder="검색 결과에 표시될 설명"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                키워드
              </label>
              <input
                type="text"
                value={form.seoKeywords}
                onChange={(e) => setForm(prev => prev ? ({ ...prev, seoKeywords: e.target.value }) : null)}
                placeholder="키워드1, 키워드2, 키워드3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OG 이미지 URL
              </label>
              <input
                type="text"
                value={form.ogImage}
                onChange={(e) => setForm(prev => prev ? ({ ...prev, ogImage: e.target.value }) : null)}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="max-w-3xl mx-auto px-4 pb-8">
          <div className="bg-white rounded-lg p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                대표 이미지 URL
              </label>
              <input
                type="text"
                value={form.featuredImage}
                onChange={(e) => setForm(prev => prev ? ({ ...prev, featuredImage: e.target.value }) : null)}
                placeholder="/images/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                태그
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm(prev => prev ? ({ ...prev, tags: e.target.value }) : null)}
                placeholder="태그1, 태그2, 태그3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                예약 발행 시간
              </label>
              <input
                type="datetime-local"
                value={form.scheduledAt}
                onChange={(e) => setForm(prev => prev ? ({ ...prev, scheduledAt: e.target.value }) : null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm(prev => prev ? ({ ...prev, featured: e.target.checked }) : null)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">추천 글로 표시</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.pinned}
                  onChange={(e) => setForm(prev => prev ? ({ ...prev, pinned: e.target.checked }) : null)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">상단 고정</span>
              </label>
            </div>

            {/* Danger Zone */}
            <div className="border-t pt-6 mt-6">
              <h3 className="text-red-600 font-medium mb-3">위험 영역</h3>
              {deleteConfirm ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">정말 삭제하시겠습니까?</span>
                  <button
                    onClick={handleDelete}
                    disabled={saving}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    삭제 확인
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    취소
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirm(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  이 글 삭제
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
