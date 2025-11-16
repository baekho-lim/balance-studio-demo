'use client'

import { useState } from 'react'
import ArtworkCard from './ArtworkCard'
import LightboxModal from './LightboxModal'
import type { Artwork } from '@/types'

interface WorksGridProps {
  artworks: Artwork[]
}

export default function WorksGrid({ artworks }: WorksGridProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)

  return (
    <>
      {/* Responsive Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                   gap-8 md:gap-10 lg:gap-12"
      >
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onClick={setSelectedArtwork}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedArtwork && (
        <LightboxModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </>
  )
}
