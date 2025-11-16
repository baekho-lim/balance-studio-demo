'use client'

import Image from 'next/image'
import type { Artwork } from '@/types'

interface ArtworkCardProps {
  artwork: Artwork
  onClick: (artwork: Artwork) => void
}

export default function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  return (
    <article
      onClick={() => onClick(artwork)}
      className="group cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(artwork)
        }
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-pastel-cream">
        <Image
          src={artwork.images.thumbnail}
          alt={artwork.images.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            <h3 className="font-serif text-xl text-white mb-2">
              {artwork.title}
            </h3>

            {/* Year & Medium */}
            <p className="text-sm text-white/80 mb-3">
              {artwork.year} · {artwork.medium}
            </p>

            {/* Question */}
            {artwork.question && (
              <p className="text-sm italic text-white/70 leading-relaxed">
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

      {/* Mobile: Always Visible Info */}
      <div className="mt-4 md:hidden">
        <h3 className="font-serif text-lg">{artwork.title}</h3>
        <p className="text-sm text-secondary mt-1">
          {artwork.year} · {artwork.medium}
        </p>
      </div>
    </article>
  )
}
