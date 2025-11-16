'use client'

import Image from 'next/image'
import type { Artwork } from '@/types'
import type { ViewMode } from './ViewModeSelector'

interface ArtworkCardProps {
  artwork: Artwork
  onClick: (artwork: Artwork) => void
  viewMode?: ViewMode
}

export default function ArtworkCard({
  artwork,
  onClick,
  viewMode = 'grid',
}: ArtworkCardProps) {
  // Calculate aspect ratio from image dimensions
  const aspectRatio =
    artwork.imageWidth && artwork.imageHeight
      ? artwork.imageWidth / artwork.imageHeight
      : 0.8 // default 4:5

  // Determine grid span for large view based on size category
  const getGridSpan = () => {
    if (viewMode !== 'large') return ''
    if (artwork.sizeCategory === 'large') return 'max-w-5xl mx-auto'
    if (artwork.sizeCategory === 'medium') return 'max-w-3xl mx-auto'
    return 'max-w-xl mx-auto'
  }

  // Get container classes based on view mode
  const getContainerClasses = () => {
    if (viewMode === 'proportional') {
      return 'break-inside-avoid mb-8'
    }
    if (viewMode === 'large') {
      return getGridSpan()
    }
    return ''
  }

  // Get image container styles based on view mode
  const getImageContainerStyle = () => {
    if (viewMode === 'grid') {
      return { aspectRatio: '4/5' }
    }
    if (viewMode === 'proportional' || viewMode === 'large') {
      return { aspectRatio: aspectRatio.toString() }
    }
    return {}
  }

  return (
    <article
      onClick={() => onClick(artwork)}
      className={`group cursor-pointer ${getContainerClasses()}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(artwork)
        }
      }}
    >
      {/* Image Container */}
      <div
        className="relative overflow-hidden bg-pastel-cream"
        style={getImageContainerStyle()}
      >
        <Image
          src={artwork.images.thumbnail}
          alt={artwork.images.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={
            viewMode === 'large'
              ? '100vw'
              : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          }
        />

        {/* Hover Overlay */}
        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/60
                     transition-all duration-400 flex items-end"
        >
          <div
            className="w-full p-6 translate-y-full group-hover:translate-y-0
                       transition-transform duration-400"
          >
            {/* Artwork Title */}
            <h3
              className={`font-serif text-white mb-2 ${
                viewMode === 'large' ? 'text-2xl md:text-3xl' : 'text-xl'
              }`}
            >
              {artwork.title}
            </h3>

            {/* Year & Medium */}
            <p className="text-sm text-white/80 mb-3">
              {artwork.year} · {artwork.medium}
            </p>

            {/* Question */}
            {artwork.question && (
              <p
                className={`italic text-white/70 leading-relaxed ${
                  viewMode === 'large' ? 'text-base' : 'text-sm'
                }`}
              >
                &ldquo;{artwork.question}&rdquo;
              </p>
            )}

            {/* View Detail Indicator */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <span className="text-xs tracking-widest uppercase text-white/60">
                Click to view
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Large View: Always Visible Info */}
      <div
        className={`mt-4 ${viewMode === 'large' ? 'block' : 'md:hidden'}`}
      >
        <h3
          className={`font-serif ${
            viewMode === 'large' ? 'text-xl md:text-2xl' : 'text-lg'
          }`}
        >
          {artwork.title}
        </h3>
        <p className="text-sm text-secondary mt-1">
          {artwork.year} · {artwork.medium}
        </p>
        {viewMode === 'large' && artwork.question && (
          <p className="text-sm italic text-primary/70 mt-3">
            &ldquo;{artwork.question}&rdquo;
          </p>
        )}
      </div>
    </article>
  )
}
