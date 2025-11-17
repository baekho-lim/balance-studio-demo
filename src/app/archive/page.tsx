import Link from 'next/link'
import exhibitionsData from '@/data/exhibitions.json'
import artworksData from '@/data/artworks.json'
import chaptersData from '@/data/chapters.json'
import { Artwork, Chapter } from '@/types'

interface Exhibition {
  year: number
  title: string
  titleKr: string
  venue: string
  location: string
  startDate: string
  endDate: string
  type: string
  description: string
  descriptionKr: string
  chapters: string[]
  featured: boolean
}

const exhibitions = exhibitionsData as Exhibition[]
const artworks = artworksData as Artwork[]
const chapters = chaptersData as Chapter[]

export default function ArchivePage() {
  // Group exhibitions by year
  const exhibitionsByYear = exhibitions.reduce((acc, exhibition) => {
    const year = exhibition.year
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(exhibition)
    return acc
  }, {} as Record<number, Exhibition[]>)

  const years = Object.keys(exhibitionsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  // Group artworks by chapter
  const artworksByChapter = artworks.reduce((acc, artwork) => {
    const chapterId = artwork.chapter
    if (!acc[chapterId]) {
      acc[chapterId] = []
    }
    acc[chapterId].push(artwork)
    return acc
  }, {} as Record<string, Artwork[]>)

  return (
    <div className="pt-24 pb-16">
      <div className="container-wide">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-4">
          Archive
        </h1>
        <p className="text-secondary text-center mb-16">
          Exhibition History & Artwork Resources
        </p>

        {/* Year-by-Year List */}
        <div className="max-w-4xl mx-auto space-y-16">
          {years.map((year) => (
            <div key={year}>
              <h2 className="font-serif text-3xl mb-8 text-center">
                {year}
              </h2>
              <div className="space-y-8">
                {exhibitionsByYear[year].map((exhibition, index) => (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-lg shadow-sm border border-primary/10"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-2xl mb-2">
                          {exhibition.title}
                        </h3>
                        <p className="text-secondary mb-4">
                          {exhibition.titleKr}
                        </p>
                        {exhibition.venue && (
                          <p className="text-sm text-primary/70 mb-2">
                            {exhibition.venue}
                            {exhibition.location && `, ${exhibition.location}`}
                          </p>
                        )}
                        <p className="text-sm text-secondary mb-4">
                          {exhibition.startDate}
                          {exhibition.endDate && ` - ${exhibition.endDate}`}
                        </p>
                      </div>
                      <span
                        className={`inline-block px-3 py-1 text-xs uppercase tracking-wider rounded-full ${
                          exhibition.type === 'solo'
                            ? 'bg-pastel-sage/30 text-primary'
                            : 'bg-pastel-lavender/30 text-primary'
                        }`}
                      >
                        {exhibition.type === 'solo' ? 'Solo' : 'Group'}
                      </span>
                    </div>
                    <p className="text-primary/80 leading-relaxed mb-2">
                      {exhibition.description}
                    </p>
                    <p className="text-sm text-secondary">
                      {exhibition.descriptionKr}
                    </p>
                    {exhibition.featured && (
                      <div className="mt-6">
                        <Link
                          href="/"
                          className="inline-block text-sm text-pastel-sage hover:text-primary transition-colors underline underline-offset-4"
                        >
                          View Current Exhibition
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Artwork Resources */}
        <div className="mt-32 max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl mb-4 text-center">
            Artwork Resources
          </h2>
          <p className="text-secondary text-center mb-12">
            Complete list of artworks by series
          </p>

          <div className="space-y-16">
            {chapters.map((chapter) => {
              const chapterArtworks = artworksByChapter[chapter.id] || []
              if (chapterArtworks.length === 0) return null

              return (
                <div key={chapter.id}>
                  <h3 className="font-serif text-2xl mb-6 text-center">
                    {chapter.title} / {chapter.titleKr}
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded-lg shadow-sm border border-primary/10">
                      <thead className="bg-pastel-sage/10">
                        <tr>
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
                              <td className="px-4 py-3 text-sm text-secondary">
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
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            })}
          </div>
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
