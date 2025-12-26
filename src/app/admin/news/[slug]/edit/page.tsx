'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Save, ImageIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import newsData from '@/data/news.json'
import artworksData from '@/data/artworks.json'
import exhibitionsData from '@/data/exhibitions.json'
import { NewsArticle, Artwork, Exhibition } from '@/types'

const news = newsData as NewsArticle[]
const artworks = artworksData as Artwork[]
const exhibitions = exhibitionsData as Exhibition[]

export default function NewsEditPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const originalArticle = news.find((n) => n.slug === slug)

  const [formData, setFormData] = useState<NewsArticle | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (originalArticle) {
      setFormData({ ...originalArticle })
    }
  }, [originalArticle])

  if (!originalArticle || !formData) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-serif mb-4">News not found</h1>
        <Link href="/admin/news" className="text-primary hover:underline">
          Back to News
        </Link>
      </div>
    )
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/news', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save')
      }

      setSuccess('Saved! Redirecting...')
      setTimeout(() => {
        router.push(`/admin/news/${formData.slug}`)
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: keyof NewsArticle, value: unknown) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null)
  }

  const updateTitle = (lang: 'en' | 'ko' | 'vi', value: string) => {
    setFormData(prev => {
      if (!prev) return null
      return {
        ...prev,
        title: { ...prev.title, [lang]: value }
      }
    })
  }

  const updateExcerpt = (lang: 'en' | 'ko', value: string) => {
    setFormData(prev => {
      if (!prev) return null
      return {
        ...prev,
        excerpt: { ...prev.excerpt, [lang]: value }
      }
    })
  }

  const updateContent = (lang: 'en' | 'ko' | 'vi', value: string) => {
    setFormData(prev => {
      if (!prev) return null
      return {
        ...prev,
        content: { ...prev.content, [lang]: value }
      }
    })
  }

  const updateHeroImage = (artworkId: string) => {
    const artwork = artworks.find(a => a.id === artworkId)
    if (!artwork) return

    setFormData(prev => {
      if (!prev) return null
      return {
        ...prev,
        images: {
          ...prev.images,
          hero: artwork.images.thumbnail,
          heroArtworkId: artworkId
        }
      }
    })
  }

  const updateTags = (tagsString: string) => {
    const tags = tagsString.split(',').map(t => t.trim()).filter(Boolean)
    updateField('tags', tags)
  }

  // Find current hero artwork
  const currentHeroArtwork = formData?.images?.hero
    ? artworks.find(a => a.images.thumbnail === formData.images?.hero || a.images.full === formData.images?.hero)
    : null

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/news/${formData.slug}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-serif">Edit News</h1>
            <p className="text-secondary text-sm">{formData.title.en}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-lg">{success}</div>
      )}

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-4">Basic Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-secondary mb-1">Slug (URL, read-only)</label>
              <input
                type="text"
                value={formData.slug}
                disabled
                className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => updateField('type', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              >
                <option value="press-release">Press Release</option>
                <option value="interview">Interview</option>
                <option value="review">Review</option>
                <option value="feature">Feature</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Publish Date</label>
              <input
                type="date"
                value={formData.publishDate}
                onChange={(e) => updateField('publishDate', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Related Exhibition</label>
              <select
                value={formData.exhibition || ''}
                onChange={(e) => updateField('exhibition', e.target.value || undefined)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              >
                <option value="">None</option>
                {exhibitions.map(ex => (
                  <option key={ex.id} value={ex.id}>
                    {ex.title} ({ex.startDate})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-secondary mb-1">Featured</label>
              <select
                value={formData.featured ? 'true' : 'false'}
                onChange={(e) => updateField('featured', e.target.value === 'true')}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              >
                <option value="true">Yes - Show on main page</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-4">Title</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-secondary mb-1">English</label>
              <input
                type="text"
                value={formData.title.en}
                onChange={(e) => updateTitle('en', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Korean</label>
              <input
                type="text"
                value={formData.title.ko}
                onChange={(e) => updateTitle('ko', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Vietnamese (optional)</label>
              <input
                type="text"
                value={formData.title.vi || ''}
                onChange={(e) => updateTitle('vi', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-2 flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Hero Image
          </h2>
          <p className="text-sm text-secondary mb-4">Select an artwork image for the news article.</p>

          <div className="grid grid-cols-2 gap-6">
            {/* Current Image Preview */}
            <div>
              <label className="block text-sm text-secondary mb-2">Current Image</label>
              <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
                {formData.images?.hero ? (
                  <Image
                    src={formData.images.hero}
                    alt="Hero image"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
              </div>
              {currentHeroArtwork && (
                <p className="text-sm text-secondary mt-2">
                  {currentHeroArtwork.title} ({currentHeroArtwork.year})
                </p>
              )}
            </div>

            {/* Image Selection */}
            <div>
              <label className="block text-sm text-secondary mb-2">Select Artwork</label>
              <select
                value={currentHeroArtwork?.id || ''}
                onChange={(e) => updateHeroImage(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 mb-3"
              >
                <option value="">-- Select an artwork --</option>
                {artworks.map(artwork => (
                  <option key={artwork.id} value={artwork.id}>
                    {artwork.title} ({artwork.year}) - {artwork.chapter}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-400">
                The selected artwork image will be displayed as the hero image for this article.
              </p>
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-4">Excerpt (Summary)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-secondary mb-1">English</label>
              <textarea
                value={formData.excerpt.en}
                onChange={(e) => updateExcerpt('en', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Korean</label>
              <textarea
                value={formData.excerpt.ko}
                onChange={(e) => updateExcerpt('ko', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-2">Content (Markdown)</h2>
          <p className="text-sm text-secondary mb-4">Use Markdown format for the article content.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-secondary mb-1">English</label>
              <textarea
                value={formData.content.en}
                onChange={(e) => updateContent('en', e.target.value)}
                rows={10}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Korean</label>
              <textarea
                value={formData.content.ko}
                onChange={(e) => updateContent('ko', e.target.value)}
                rows={10}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Vietnamese (optional)</label>
              <textarea
                value={formData.content.vi || ''}
                onChange={(e) => updateContent('vi', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-2">Tags</h2>
          <p className="text-sm text-secondary mb-4">Enter tags separated by commas.</p>
          <input
            type="text"
            value={formData.tags.join(', ')}
            onChange={(e) => updateTags(e.target.value)}
            placeholder="group-exhibition, art-fair, vietnam, 2024"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Save Button (bottom) */}
        <div className="flex justify-end gap-4">
          <Link
            href={`/admin/news/${formData.slug}`}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
