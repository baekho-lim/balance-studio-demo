'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Copy, Check } from 'lucide-react'
import AuthGuard from '@/components/admin/AuthGuard'
import siteSettingsData from '@/data/site-settings.json'
import artworksData from '@/data/artworks.json'
import type { SiteSettings, Artwork } from '@/types'

const artworks = artworksData as Artwork[]
const initialSettings = siteSettingsData as SiteSettings

export default function ResourcesManagementPage() {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings)
  const [copied, setCopied] = useState(false)

  // Handle home hero selection
  const handleSetHomeHero = (artworkId: string) => {
    const artwork = artworks.find(a => a.id === artworkId)
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

  // Handle catalog cover selection
  const handleSetCatalogCover = (artworkId: string) => {
    const artwork = artworks.find(a => a.id === artworkId)
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

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-serif mb-2">Resources Management</h1>
            <p className="text-secondary">작품 이미지 리소스 관리 - 시각적 선택</p>
          </div>

          {/* Current Selections Summary */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-medium mb-4">Current Selections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-secondary mb-2">Homepage Hero:</p>
                <p className="text-lg">{settings.homeHero.artworkId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-secondary mb-2">Catalog Cover:</p>
                <p className="text-lg">{settings.catalogCover.artworkId}</p>
              </div>
            </div>
          </div>

          {/* Artwork Grid */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-medium mb-6">Select Images</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {artworks.map(artwork => {
                const isHomeHero = settings.homeHero.artworkId === artwork.id
                const isCatalogCover = settings.catalogCover.artworkId === artwork.id

                return (
                  <div
                    key={artwork.id}
                    className={`border-2 rounded-lg overflow-hidden transition-all ${
                      isHomeHero || isCatalogCover
                        ? 'border-primary shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Image Thumbnail */}
                    <div className="relative w-full aspect-square bg-gray-100">
                      <Image
                        src={artwork.images.thumbnail}
                        alt={artwork.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Artwork Info */}
                    <div className="p-4">
                      <p className="text-xs text-secondary mb-1">{artwork.id}</p>
                      <h3 className="font-medium text-sm mb-1">{artwork.title}</h3>
                      <p className="text-xs text-secondary mb-3">
                        {artwork.year} • {artwork.chapter}
                      </p>

                      {/* Selection Checkboxes */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="homeHero"
                            checked={isHomeHero}
                            onChange={() => handleSetHomeHero(artwork.id)}
                            className="w-4 h-4 text-primary focus:ring-primary"
                          />
                          <span className="text-sm">Home Hero</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="catalogCover"
                            checked={isCatalogCover}
                            onChange={() => handleSetCatalogCover(artwork.id)}
                            className="w-4 h-4 text-primary focus:ring-primary"
                          />
                          <span className="text-sm">Catalog Cover</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Save Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
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
