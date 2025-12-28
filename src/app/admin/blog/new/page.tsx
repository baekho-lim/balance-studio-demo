'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Clock, Eye, Send } from 'lucide-react'
import MarkdownEditor from '@/components/admin/MarkdownEditor'

interface BlogPostForm {
  title: { en: string; ko: string }
  content: { en: string; ko: string }
  excerpt: { en: string; ko: string }
  slug: string
  status: 'draft' | 'review' | 'scheduled' | 'published'
  scheduledAt: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  featuredImage: string
  ogImage: string
  tags: string
  featured: boolean
  pinned: boolean
}

const initialForm: BlogPostForm = {
  title: { en: '', ko: '' },
  content: { en: '', ko: '' },
  excerpt: { en: '', ko: '' },
  slug: '',
  status: 'draft',
  scheduledAt: '',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  featuredImage: '',
  ogImage: '',
  tags: '',
  featured: false,
  pinned: false
}

export default function NewBlogPostPage() {
  const router = useRouter()
  const [form, setForm] = useState<BlogPostForm>(initialForm)
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content')
  const [activeLang, setActiveLang] = useState<'ko' | 'en'>('ko')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Auto-generate slug from Korean title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s]+/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (lang: 'ko' | 'en', value: string) => {
    setForm(prev => ({
      ...prev,
      title: { ...prev.title, [lang]: value },
      // Auto-generate slug from Korean title if slug is empty
      slug: lang === 'ko' && !prev.slug ? generateSlug(value) : prev.slug
    }))
  }

  const handleSubmit = async (publishStatus: 'draft' | 'published' | 'scheduled') => {
    try {
      setSaving(true)
      setError(null)

      // Validation
      if (!form.title.ko && !form.title.en) {
        setError('제목을 입력해주세요 (최소 한 언어)')
        return
      }

      if (publishStatus === 'scheduled' && !form.scheduledAt) {
        setError('예약 발행 시간을 선택해주세요')
        return
      }

      const payload = {
        ...form,
        status: publishStatus,
        seoKeywords: form.seoKeywords.split(',').map(k => k.trim()).filter(Boolean),
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
      }

      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create post')
      }

      const newPost = await res.json()
      router.push(`/admin/blog/${newPost.slug}/edit?created=true`)
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장 실패')
    } finally {
      setSaving(false)
    }
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
                <h1 className="text-xl font-bold text-gray-900">새 블로그 글</h1>
                <p className="text-sm text-gray-500">블로그 글을 작성합니다</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSubmit('draft')}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                초안 저장
              </button>
              <button
                onClick={() => handleSubmit('scheduled')}
                disabled={saving || !form.scheduledAt}
                className="flex items-center gap-2 px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
                title={!form.scheduledAt ? '설정 탭에서 예약 시간을 설정하세요' : ''}
              >
                <Clock className="w-4 h-4" />
                예약 발행
              </button>
              <button
                onClick={() => handleSubmit('published')}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                즉시 발행
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
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
              onChange={(e) => handleTitleChange(activeLang, e.target.value)}
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
              onChange={(e) => setForm(prev => ({
                ...prev,
                excerpt: { ...prev.excerpt, [activeLang]: e.target.value }
              }))}
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
              onChange={(value) => setForm(prev => ({
                ...prev,
                content: { ...prev.content, [activeLang]: value }
              }))}
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
                  onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
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
                onChange={(e) => setForm(prev => ({ ...prev, seoTitle: e.target.value }))}
                placeholder="검색 결과에 표시될 제목 (비워두면 글 제목 사용)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">권장: 50-60자</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO 설명
              </label>
              <textarea
                value={form.seoDescription}
                onChange={(e) => setForm(prev => ({ ...prev, seoDescription: e.target.value }))}
                placeholder="검색 결과에 표시될 설명"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
              <p className="mt-1 text-xs text-gray-500">권장: 150-160자</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                키워드
              </label>
              <input
                type="text"
                value={form.seoKeywords}
                onChange={(e) => setForm(prev => ({ ...prev, seoKeywords: e.target.value }))}
                placeholder="키워드1, 키워드2, 키워드3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">쉼표로 구분</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OG 이미지 URL
              </label>
              <input
                type="text"
                value={form.ogImage}
                onChange={(e) => setForm(prev => ({ ...prev, ogImage: e.target.value }))}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">소셜 미디어 공유 시 표시될 이미지</p>
            </div>

            {/* Preview */}
            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-700 mb-3">검색 결과 미리보기</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                  {form.seoTitle || form.title.ko || form.title.en || '블로그 제목'}
                </div>
                <div className="text-green-700 text-sm">
                  limhyejung.com/blog/{form.slug || 'post-url'}
                </div>
                <div className="text-gray-600 text-sm mt-1">
                  {form.seoDescription || form.excerpt.ko || form.excerpt.en || '블로그 글 설명이 여기에 표시됩니다...'}
                </div>
              </div>
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
                onChange={(e) => setForm(prev => ({ ...prev, featuredImage: e.target.value }))}
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
                onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="태그1, 태그2, 태그3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">쉼표로 구분</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                예약 발행 시간
              </label>
              <input
                type="datetime-local"
                value={form.scheduledAt}
                onChange={(e) => setForm(prev => ({ ...prev, scheduledAt: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">설정하면 상단의 '예약 발행' 버튼 사용 가능</p>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">추천 글로 표시</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.pinned}
                  onChange={(e) => setForm(prev => ({ ...prev, pinned: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">상단 고정</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
