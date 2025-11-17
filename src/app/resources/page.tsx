'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Download } from 'lucide-react'
import artworksData from '@/data/artworks.json'
import chaptersData from '@/data/chapters.json'
import { Artwork, Chapter } from '@/types'

const artworks = artworksData as Artwork[]
const chapters = chaptersData as Chapter[]

export default function ResourcesPage() {
  // Group artworks by chapter
  const artworksByChapter = artworks.reduce((acc, artwork) => {
    const chapterId = artwork.chapter
    if (!acc[chapterId]) {
      acc[chapterId] = []
    }
    acc[chapterId].push(artwork)
    return acc
  }, {} as Record<string, Artwork[]>)

  const handleDownload = async (imageUrl: string, artworkTitle: string, artworkId: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${artworkId}_${artworkTitle.replace(/\s+/g, '_')}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-wide">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-4">
          Artwork Resources
        </h1>
        <p className="text-secondary text-center mb-16">
          Complete artwork list with metadata and high-resolution downloads
        </p>

        <div className="space-y-20">
          {chapters.map((chapter) => {
            const chapterArtworks = artworksByChapter[chapter.id] || []
            if (chapterArtworks.length === 0) return null

            return (
              <div key={chapter.id}>
                <h2 className="font-serif text-3xl mb-8 text-center">
                  {chapter.title} / {chapter.titleKr}
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-lg shadow-sm border border-primary/10">
                    <thead className="bg-pastel-sage/10">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                          #
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                          Thumbnail
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                          ID
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                          Title
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                          Year
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                          Medium
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                          Dimensions
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                          Size
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-primary">
                          Download
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {chapterArtworks
                        .sort((a, b) => a.order - b.order)
                        .map((artwork) => (
                          <tr
                            key={artwork.id}
                            className="border-t border-primary/5 hover:bg-pastel-sage/5 transition-colors"
                          >
                            <td className="px-4 py-3 text-sm font-medium text-primary">
                              {artwork.order}
                            </td>
                            <td className="px-4 py-3">
                              <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100">
                                <Image
                                  src={artwork.images.thumbnail}
                                  alt={artwork.title}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-secondary font-mono">
                              {artwork.id}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <div>
                                <div className="font-medium text-primary">
                                  {artwork.title}
                                </div>
                                {artwork.titleKr && (
                                  <div className="text-xs text-secondary mt-1">
                                    {artwork.titleKr}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-secondary">
                              {artwork.year}
                            </td>
                            <td className="px-4 py-3 text-sm text-secondary">
                              {artwork.medium}
                            </td>
                            <td className="px-4 py-3 text-sm text-secondary">
                              {artwork.dimensions}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  artwork.sizeCategory === 'large'
                                    ? 'bg-pastel-green/30 text-primary'
                                    : artwork.sizeCategory === 'medium'
                                    ? 'bg-pastel-cream/50 text-primary'
                                    : 'bg-pastel-lavender/30 text-primary'
                                }`}
                              >
                                {artwork.sizeCategory}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() =>
                                  handleDownload(
                                    artwork.images.full,
                                    artwork.title,
                                    artwork.id
                                  )
                                }
                                className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/70 transition-colors"
                                title="Download high-resolution image"
                              >
                                <Download size={16} />
                                <span className="hidden md:inline">Download</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary */}
                <div className="mt-4 text-center text-sm text-secondary">
                  {chapterArtworks.length} artwork{chapterArtworks.length !== 1 ? 's' : ''}
                </div>
              </div>
            )
          })}
        </div>

        {/* Notes */}
        <div className="mt-16 max-w-3xl mx-auto bg-pastel-sage/10 rounded-lg p-8">
          <h3 className="font-serif text-xl mb-4">Notes for Galleries & Curators</h3>
          <ul className="space-y-2 text-sm text-secondary">
            <li>
              <strong className="text-primary">#</strong> - Reference number for artwork
              identification and communication
            </li>
            <li>
              <strong className="text-primary">ID</strong> - Unique identifier in the format
              [series]-[number]
            </li>
            <li>
              <strong className="text-primary">Download</strong> - High-resolution image files
              suitable for print and reproduction
            </li>
            <li>
              <strong className="text-primary">Thumbnails</strong> - Optimized preview images
              (original files available via download)
            </li>
          </ul>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-block text-sm tracking-widest uppercase hover:text-pastel-sage transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
