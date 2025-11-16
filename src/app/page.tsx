'use client'

import { useState } from 'react'
import Image from 'next/image'
import Hero from '@/components/home/Hero'
import ArtworkCard from '@/components/works/ArtworkCard'
import LightboxModal from '@/components/works/LightboxModal'
import ContactSection from '@/components/home/ContactSection'

// Import data
import artistData from '@/data/artist.json'
import artworksData from '@/data/artworks.json'

import type { Artist, Artwork } from '@/types'

const artist = artistData as Artist
const artworks = artworksData as Artwork[]

export default function HomePage() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)

  return (
    <>
      {/* Hero Section - Full Screen */}
      <Hero
        backgroundImage="/images/works/1. I am only passing though the woods..jpg"
        artistName="Lim Hyejung"
        tagline="Utopia = Reality"
      />

      {/* Works Section */}
      <section id="works" className="py-24 md:py-32 scroll-mt-20">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-4">
            Works
          </h2>
          <p className="text-secondary text-center mb-16">
            작품
          </p>

          {/* Works Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                onClick={setSelectedArtwork}
              />
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
              <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 rounded-full overflow-hidden">
                <Image
                  src={artist.profileImage}
                  alt={artist.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 256px"
                />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl mb-2">
                {artist.name}
              </h2>
              <p className="text-xl text-secondary mb-6">{artist.nameKr}</p>

              {/* Education */}
              <div className="space-y-1">
                {artist.education.map((edu, index) => (
                  <p key={index} className="text-sm text-secondary">
                    {edu.degree}, {edu.institution} ({edu.year})
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
