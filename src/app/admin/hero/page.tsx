'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Copy, Check } from 'lucide-react'
import AuthGuard from '@/components/admin/AuthGuard'
import siteSettingsData from '@/data/site-settings.json'
import artworksData from '@/data/artworks.json'
import type { SiteSettings, Artwork } from '@/types'

const artworks = artworksData as Artwork[]
const initialSettings = siteSettingsData as SiteSettings

export default function HeroManagementPage() {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings)
  const [copied, setCopied] = useState(false)
  const [homeTaglineEn, setHomeTaglineEn] = useState(initialSettings.homeHero.tagline.en)
  const [homeTaglineKr, setHomeTaglineKr] = useState(initialSettings.homeHero.tagline.kr)

  // Find artwork by ID
  const findArtwork = (artworkId: string) => {
    return artworks.find(a => a.id === artworkId)
  }

  // Handle home hero image change
  const handleHomeHeroChange = (artworkId: string) => {
    const artwork = findArtwork(artworkId)
    if (!artwork) return

    setSettings(prev => ({
      ...prev,
      homeHero: {
        ...prev.homeHero,
        artworkId,
        imagePath: artwork.images.full
      },
      meta: {
        ...prev.meta,
        lastUpdated: new Date().toISOString()
      }
    }))
  }

  // Handle catalog cover image change
  const handleCatalogCoverChange = (artworkId: string) => {
    const artwork = findArtwork(artworkId)
    if (!artwork) return

    setSettings(prev => ({
      ...prev,
      catalogCover: {
        artworkId,
        imagePath: artwork.images.full
      },
      meta: {
        ...prev.meta,
        lastUpdated: new Date().toISOString()
      }
    }))
  }

  // Handle tagline change
  const handleTaglineChange = () => {
    setSettings(prev => ({
      ...prev,
      homeHero: {
        ...prev.homeHero,
        tagline: {
          en: homeTaglineEn,
          kr: homeTaglineKr
        }
      },
      meta: {
        ...prev.meta,
        lastUpdated: new Date().toISOString()
      }
    }))
  }

  // Copy JSON to clipboard
  const handleCopyJSON = async () => {
    const json = JSON.stringify(settings, null, 2)
    await navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Download JSON file
  const handleDownloadJSON = () => {
    const json = JSON.stringify(settings, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'site-settings.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const homeHeroArtwork = findArtwork(settings.homeHero.artworkId)
  const catalogCoverArtwork = findArtwork(settings.catalogCover.artworkId)

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-serif mb-2">Hero Image Management</h1>
            <p className="text-secondary">홈페이지 히어로 및 카탈로그 커버 이미지 관리</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Home Hero Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-medium mb-4">Homepage Hero</h2>

              {/* Current Image Preview */}
              <div className="mb-6">
                <p className="text-sm text-secondary mb-2">Current Image:</p>
                <div className="relative w-full h-64 bg-gray-100 rounded overflow-hidden">
                  {homeHeroArtwork && (
                    <Image
                      src={settings.homeHero.imagePath}
                      alt={homeHeroArtwork.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <p className="text-sm text-secondary mt-2">
                  {homeHeroArtwork?.title} ({homeHeroArtwork?.year})
                </p>
              </div>

              {/* Image Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Select New Hero Image:
                </label>
                <select
                  value={settings.homeHero.artworkId}
                  onChange={(e) => handleHomeHeroChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {artworks.map(artwork => (
                    <option key={artwork.id} value={artwork.id}>
                      {artwork.title} ({artwork.year}) - {artwork.chapter}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tagline Editing */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tagline (English):
                  </label>
                  <input
                    type="text"
                    value={homeTaglineEn}
                    onChange={(e) => setHomeTaglineEn(e.target.value)}
                    onBlur={handleTaglineChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Utopia = Reality"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tagline (Korean):
                  </label>
                  <input
                    type="text"
                    value={homeTaglineKr}
                    onChange={(e) => setHomeTaglineKr(e.target.value)}
                    onBlur={handleTaglineChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="유토피아 = 현실"
                  />
                </div>
              </div>
            </div>

            {/* Catalog Cover Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-medium mb-4">Catalog Cover</h2>

              {/* Current Image Preview */}
              <div className="mb-6">
                <p className="text-sm text-secondary mb-2">Current Image:</p>
                <div className="relative w-full h-64 bg-gray-100 rounded overflow-hidden">
                  {catalogCoverArtwork && (
                    <Image
                      src={settings.catalogCover.imagePath}
                      alt={catalogCoverArtwork.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <p className="text-sm text-secondary mt-2">
                  {catalogCoverArtwork?.title} ({catalogCoverArtwork?.year})
                </p>
              </div>

              {/* Image Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Select New Cover Image:
                </label>
                <select
                  value={settings.catalogCover.artworkId}
                  onChange={(e) => handleCatalogCoverChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {artworks.map(artwork => (
                    <option key={artwork.id} value={artwork.id}>
                      {artwork.title} ({artwork.year}) - {artwork.chapter}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Save Instructions */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">💾 Save Changes</h3>
            <p className="text-sm text-secondary mb-4">
              변경사항을 저장하려면 아래 JSON을 복사하여 <code className="bg-white px-2 py-1 rounded">/src/data/site-settings.json</code> 파일에 붙여넣으세요.
            </p>

            <div className="flex gap-3 mb-4">
              <button
                onClick={handleCopyJSON}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy JSON'}
              </button>

              <button
                onClick={handleDownloadJSON}
                className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Download JSON
              </button>
            </div>

            {/* JSON Preview */}
            <details className="text-sm">
              <summary className="cursor-pointer text-secondary hover:text-primary">
                Preview JSON
              </summary>
              <pre className="mt-3 bg-white p-4 rounded border overflow-x-auto text-xs">
                {JSON.stringify(settings, null, 2)}
              </pre>
            </details>
          </div>

          {/* Preview Links */}
          <div className="mt-6 flex gap-4 justify-center">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-primary hover:underline"
            >
              Preview Homepage →
            </Link>
            <Link
              href="/catalog"
              target="_blank"
              className="text-sm text-primary hover:underline"
            >
              Preview Catalog →
            </Link>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
