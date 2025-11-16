import Link from 'next/link'
import exhibitionsData from '@/data/exhibitions.json'

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

  return (
    <div className="pt-24 pb-16">
      <div className="container-wide">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-4">
          Archive
        </h1>
        <p className="text-secondary text-center mb-16">
          Exhibition History
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
