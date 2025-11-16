'use client'

import { useState, useMemo } from 'react'
import WorksFilter from '@/components/works/WorksFilter'
import WorksGrid from '@/components/works/WorksGrid'
import ChapterSection from '@/components/works/ChapterSection'

// Import dummy data
import artworksData from '@/data/artworks.json'
import chaptersData from '@/data/chapters.json'

import type { Artwork, Chapter, ChapterSlug } from '@/types'

const artworks = artworksData as Artwork[]
const chapters = chaptersData as Chapter[]

export default function WorksPage() {
  const [activeFilter, setActiveFilter] = useState<ChapterSlug | 'all'>('all')

  // Filter artworks based on selected chapter
  const filteredArtworks = useMemo(() => {
    if (activeFilter === 'all') return artworks
    return artworks.filter((artwork) => artwork.chapter === activeFilter)
  }, [activeFilter])

  // Group artworks by chapter for sectioned view
  const artworksByChapter = useMemo(() => {
    return chapters.map((chapter) => ({
      chapter,
      artworks: artworks
        .filter((artwork) => artwork.chapter === chapter.id)
        .sort((a, b) => a.order - b.order),
    }))
  }, [])

  return (
    <div className="pt-24">
      {/* Page Header */}
      <section className="py-16 md:py-24 text-center">
        <div className="container-wide">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            Works
          </h1>
          <p className="text-secondary text-lg">작품</p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-16">
        <div className="container-wide">
          <WorksFilter
            chapters={chapters.map((c) => ({ id: c.id, title: c.title }))}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </section>

      {/* Works Display */}
      <section className="pb-24 md:pb-32">
        <div className="container-wide">
          {activeFilter === 'all' ? (
            // Sectioned view by chapter
            <div className="space-y-24 md:space-y-32">
              {artworksByChapter.map(({ chapter, artworks: chapterArtworks }) => (
                <div key={chapter.id}>
                  <ChapterSection chapter={chapter} />
                  <WorksGrid artworks={chapterArtworks} />
                </div>
              ))}
            </div>
          ) : (
            // Filtered view
            <WorksGrid artworks={filteredArtworks} />
          )}
        </div>
      </section>
    </div>
  )
}
