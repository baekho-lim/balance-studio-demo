'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Edit, ExternalLink, Calendar, FileText, Star, ImageIcon, Tags } from 'lucide-react'
import { useState } from 'react'
import newsData from '@/data/news.json'
import artworksData from '@/data/artworks.json'
import { NewsArticle, Artwork } from '@/types'

const news = newsData as NewsArticle[]
const artworks = artworksData as Artwork[]

export default function AdminNewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const article = news.find((n) => n.slug === slug)
  const [deleting, setDeleting] = useState(false)

  if (!article) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-serif mb-4">News not found</h1>
        <Link href="/admin/news" className="text-primary hover:underline">
          Back to News
        </Link>
      </div>
    )
  }

  const heroArtwork = article.images?.hero
    ? artworks.find(a => a.images.thumbnail === article.images?.hero || a.images.full === article.images?.hero)
    : null

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this news article?')) return

    setDeleting(true)
    try {
      const response = await fetch('/api/news', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: article.slug }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete')
      }

      router.push('/admin/news')
    } catch (error) {
      alert('Failed to delete news article')
    } finally {
      setDeleting(false)
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'press-release': return 'Press Release'
      case 'interview': return 'Interview'
      case 'review': return 'Review'
      case 'feature': return 'Feature'
      default: return type
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/news"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-serif">{article.title.en}</h1>
            <p className="text-secondary text-sm">{article.title.ko}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/news/${article.slug}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Hero Image */}
        {article.images?.hero && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Hero Image
            </h2>
            <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={article.images.hero}
                alt="Hero image"
                fill
                className="object-cover"
              />
            </div>
            {heroArtwork && (
              <p className="text-sm text-secondary mt-2">
                {heroArtwork.title} ({heroArtwork.year})
              </p>
            )}
          </div>
        )}

        {/* Basic Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-4">Basic Info</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-secondary">Type:</span>
              <span className="ml-2 font-medium">{getTypeLabel(article.type)}</span>
            </div>
            <div>
              <span className="text-secondary">Featured:</span>
              <span className="ml-2">{article.featured ? <Star className="w-4 h-4 inline text-yellow-500 fill-yellow-500" /> : 'No'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              <span className="text-secondary">Published:</span>
              <span className="font-medium">{article.publishDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-secondary" />
              <span className="text-secondary">Exhibition:</span>
              {article.exhibition ? (
                <Link href={`/admin/exhibitions/${article.exhibition}`} className="text-primary hover:underline">
                  {article.exhibition}
                </Link>
              ) : (
                <span className="text-gray-400">None</span>
              )}
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-4">Excerpt</h2>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-secondary block mb-1">English:</span>
              <p>{article.excerpt.en}</p>
            </div>
            <div>
              <span className="text-secondary block mb-1">Korean:</span>
              <p>{article.excerpt.ko}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Tags className="w-5 h-5" />
            Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* External Links */}
        {article.links && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              External Links
            </h2>
            <div className="space-y-2 text-sm">
              {article.links.artfair && (
                <div>
                  <span className="text-secondary">Art Fair:</span>
                  <a href={article.links.artfair.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">
                    {article.links.artfair.name}
                  </a>
                </div>
              )}
              {article.links.gallery && (
                <div>
                  <span className="text-secondary">Gallery:</span>
                  <a href={article.links.gallery.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">
                    {article.links.gallery.name}
                  </a>
                </div>
              )}
              {article.links.venue && (
                <div>
                  <span className="text-secondary">Venue:</span>
                  <a href={article.links.venue.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">
                    {article.links.venue.name}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* View on Site */}
        <div className="flex justify-center">
          <a
            href={`/news/${article.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View on Site
          </a>
        </div>
      </div>
    </div>
  )
}
