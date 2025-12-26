'use client'

import { useState, useMemo } from 'react'
import Hero from '@/components/home/Hero'
import ArtworkCard from '@/components/works/ArtworkCard'
import LightboxModal from '@/components/works/LightboxModal'
import ContactSection from '@/components/home/ContactSection'
import ViewModeSelector, { type ViewMode } from '@/components/works/ViewModeSelector'
import ArtistProfileImage from '@/components/artist/ArtistProfileImage'

// Import validated data
import { getArtist, getArtworks, getChapters, getSiteSettings } from '@/lib/data'
import type { Artwork } from '@/lib/schemas'

const artist = getArtist()
const artworks = getArtworks()
const chapters = getChapters()
const settings = getSiteSettings()

// Find hero artwork for alt text
const heroArtwork = artworks.find((a) => a.id === settings.homeHero.artworkId)

export default function HomePage() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

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
      {/* Hero Section - Full Screen */}
      <Hero
        backgroundImage={settings.homeHero.imagePath}
        artistName="Lim Hyejung"
        tagline={settings.homeHero.tagline.en}
        artworkTitle={heroArtwork?.title}
      />

      {/* Works Section - Chapter by Chapter */}
      <section id="works" className="py-24 md:py-32 scroll-mt-20">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-4">
            Works
          </h2>
          <p className="text-secondary text-center mb-12">
            작품
          </p>

          {/* View Mode Selector */}
          <ViewModeSelector currentMode={viewMode} onModeChange={setViewMode} />

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

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-pastel-green/10 scroll-mt-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="text-center mb-16">
              <ArtistProfileImage size="large" className="mx-auto mb-8" />
              <h2 className="font-serif text-3xl md:text-4xl mb-2">
                {artist.name}
              </h2>
              <p className="text-xl text-secondary mb-6">{artist.nameKr}</p>

              {/* Education */}
              <div className="space-y-1">
                {artist.education.map((edu, index) => (
                  <p key={index} className="text-sm text-secondary">
                    {edu.degree}, {edu.institution}{edu.year ? ` (${edu.year})` : ''}
                  </p>
                ))}
              </div>
            </div>

            {/* Artist Statement */}
            <div className="space-y-12">
              <div>
                <h3 className="font-serif text-xl mb-6 text-center">Artist Statement</h3>
                <div className="prose prose-lg max-w-none">
                  {artist.statement.en.split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-primary/80 leading-relaxed mb-4 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-primary/10">
                <div className="prose prose-lg max-w-none">
                  {artist.statement.kr.split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-secondary leading-relaxed mb-4 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div id="contact" className="scroll-mt-20">
        <ContactSection contact={artist.contact} />
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
