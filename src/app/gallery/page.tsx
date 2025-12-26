'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import LightboxModal from '@/components/works/LightboxModal'
import artworksData from '@/data/artworks.json'
import { getArtistName } from '@/lib/config'
import type { Artwork } from '@/types'

const artworks = artworksData as Artwork[]

export default function GalleryPage() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)

  return (
    <div className="min-h-screen bg-pastel-cream py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif mb-3">Gallery</h1>
          <p className="text-secondary text-lg mb-2">작품 갤러리</p>
          <p className="text-sm text-secondary max-w-2xl">
            Click on any artwork to view details. For purchase inquiries, please contact us.
          </p>
        </div>

        {/* Artwork Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          style={{
            // Prevent image saving via CSS
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none'
          }}
          onContextMenu={(e) => e.preventDefault()} // Prevent right-click
        >
          {artworks.map(artwork => (
            <div
              key={artwork.id}
              onClick={() => setSelectedArtwork(artwork)}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-all cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-square bg-gray-100">
                <Image
                  src={artwork.images.thumbnail}
                  alt={artwork.images.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  draggable={false} // Prevent dragging
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                    View Details
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                {/* Exhibition Number (if available) */}
                {artwork.exhibitionNumber && (
                  <p className="text-xs text-pastel-sage font-medium mb-1">
                    No. {artwork.exhibitionNumber}
                  </p>
                )}

                {/* Artwork ID */}
                <p className="text-xs text-secondary mb-1">{artwork.id}</p>

                {/* Title */}
                <h3 className="font-medium text-sm mb-1 line-clamp-1">
                  {artwork.title}
                </h3>
                {artwork.titleKr && (
                  <p className="text-xs text-secondary mb-2 line-clamp-1">
                    {artwork.titleKr}
                  </p>
                )}

                {/* Year & Chapter */}
                <p className="text-xs text-secondary mb-1">
                  {artwork.year} • {artwork.chapter}
                </p>

                {/* Medium */}
                <p className="text-xs text-secondary line-clamp-2">
                  {artwork.medium}
                </p>

                {/* Dimensions */}
                {artwork.dimensions && (
                  <p className="text-xs text-secondary mt-1">
                    {artwork.dimensions}
                  </p>
                )}

                {/* Orientation Badge */}
                {artwork.orientation && (
                  <div className="mt-2">
                    <span className="inline-block px-2 py-0.5 text-xs bg-pastel-cream rounded">
                      {artwork.orientation}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-serif mb-3">Purchase Inquiry</h2>
          <p className="text-secondary mb-6">
            작품 구매 및 전시 문의는 아래 연락처로 연락 주세요.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Copyright Notice */}
        <div className="mt-8 text-center text-xs text-secondary">
          <p>© {new Date().getFullYear()} {getArtistName('en')}. All artworks are protected by copyright.</p>
          <p className="mt-1">모든 작품의 저작권은 작가에게 있으며 무단 복제 및 사용을 금지합니다.</p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedArtwork && (
        <LightboxModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </div>
  )
}
