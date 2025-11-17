'use client'

import { useState, useMemo } from 'react'
import ArtworkCard from '@/components/works/ArtworkCard'
import LightboxModal from '@/components/works/LightboxModal'
import type { ViewMode } from '@/components/works/ViewModeSelector'

import artworksData from '@/data/artworks.json'
import chaptersData from '@/data/chapters.json'

import type { Artwork, Chapter } from '@/types'

const artworks = artworksData as Artwork[]
const chapters = chaptersData as Chapter[]

interface WorksViewProps {
  viewMode: ViewMode
}

export default function WorksView({ viewMode }: WorksViewProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)

  // Group artworks by chapter
  const artworksByChapter = useMemo(() => {
    return chapters.map((chapter) => ({
      chapter,
      artworks: artworks
        .filter((artwork) => artwork.chapter === chapter.id)
        .sort((a, b) => a.order - b.order),
    }))
  }, [])

  return (
    <>
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-4">
            Works
          </h2>
          <p className="text-secondary text-center mb-12">
            작품
          </p>

          {/* View Mode Indicator */}
          <div className="text-center mb-8">
            <span className="text-xs tracking-widest uppercase text-secondary">
              {viewMode === 'grid' && 'Grid View'}
              {viewMode === 'proportional' && 'Proportional View'}
              {viewMode === 'large' && 'Large View'}
            </span>
          </div>

          {/* Chapters */}
          <div className="space-y-32 md:space-y-40">
            {artworksByChapter.map(({ chapter, artworks: chapterArtworks }) => (
              <div key={chapter.id} id={chapter.id} className="scroll-mt-24">
                {/* Chapter Header */}
                <div className="mb-16 text-center max-w-3xl mx-auto">
                  <h3 className="font-serif text-2xl md:text-3xl mb-4">
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-secondary mb-6">
                    {chapter.titleKr}
                  </p>

                  <p className="text-lg italic text-primary/70 mb-2">
                    &ldquo;{chapter.question}&rdquo;
                  </p>
                  <p className="text-sm text-secondary/80 mb-8">
                    {chapter.questionKr}
                  </p>

                  <div className="w-16 h-px bg-primary/20 mx-auto mb-8" />

                  <p className="text-primary/60 leading-relaxed">
                    {chapter.description}
                  </p>
                  <p className="text-sm text-secondary/60 mt-2">
                    {chapter.descriptionKr}
                  </p>
                </div>

                {/* Chapter Artworks Grid */}
                <div
                  className={`
                    ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12' : ''}
                    ${viewMode === 'proportional' ? 'columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8' : ''}
                    ${viewMode === 'large' ? 'space-y-12' : ''}
                  `}
                >
                  {chapterArtworks.map((artwork) => (
                    <ArtworkCard
                      key={artwork.id}
                      artwork={artwork}
                      onClick={setSelectedArtwork}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
