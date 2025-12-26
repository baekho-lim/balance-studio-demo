import Image from 'next/image'
import { Metadata } from 'next'
import Link from 'next/link'
import artistData from '@/data/artist.json'
import type { Artist } from '@/types'
import PersonJsonLd from '@/components/seo/PersonJsonLd'

const artist = artistData as Artist

export const metadata: Metadata = {
  title: 'About | Lim Hyejung',
  description: 'Learn about Lim Hyejung (임혜정, b. 1981), a contemporary Korean artist known for her artistic philosophy "Utopia = Reality" and mixed media paintings exploring nature and inner worlds.',
  keywords: ['Lim Hyejung', '임혜정', 'Korean artist', 'contemporary art', 'mixed media', 'Utopia Reality', 'artist biography', 'artist statement', 'TomuraLee Gallery'],
  openGraph: {
    title: 'About Lim Hyejung | Contemporary Korean Artist',
    description: 'Discover the artistic journey, philosophy, and background of Lim Hyejung, a Korean contemporary artist exploring nature and reality through "Utopia = Reality".',
    type: 'profile',
    images: [{ url: '/images/artist-profile.webp', width: 1200, height: 630, alt: 'Lim Hyejung Artist Profile' }],
  },
  alternates: {
    canonical: 'https://limhyejung.com/about',
    languages: {
      'en': 'https://limhyejung.com/about',
      'ko': 'https://limhyejung.com/about',
    },
  },
}

export default function AboutPage() {
  return (
    <>
      {/* About 페이지 전용 강화된 Person 스키마 */}
      <PersonJsonLd />

      <article
        className="pt-24"
        itemScope
        itemType="https://schema.org/Person"
      >
        {/* Hidden semantic data for LLM/SEO */}
      <meta itemProp="name" content="Lim Hyejung" />
      <meta itemProp="alternateName" content="임혜정" />
      <meta itemProp="birthDate" content="1981" />
      <meta itemProp="nationality" content="South Korea" />
      <meta itemProp="jobTitle" content="Visual Artist" />

      {/* Artist Profile Header with Key Facts */}
      <section className="py-16 md:py-24" aria-label="Artist Overview">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            {/* Profile Image */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 rounded-full overflow-hidden">
              <Image
                src={artist.profileImage}
                alt={artist.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 256px"
                itemProp="image"
              />
            </div>

            {/* Name */}
            <h1 className="font-serif text-4xl md:text-5xl mb-2" itemProp="name">
              {artist.name}
            </h1>
            <p className="text-xl text-secondary mb-8" itemProp="alternateName">
              {artist.nameKr}
            </p>

            {/* Key Facts Box - LLM Optimized */}
            <div className="bg-pastel-cream/50 rounded-lg p-6 md:p-8 max-w-2xl mx-auto mb-8">
              <h2 className="sr-only">Key Facts</h2>
              <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <dt className="text-secondary font-medium mb-1">Birth Year</dt>
                  <dd className="text-primary" itemProp="birthDate">1981</dd>
                </div>
                <div>
                  <dt className="text-secondary font-medium mb-1">Nationality</dt>
                  <dd className="text-primary" itemProp="nationality">Korean</dd>
                </div>
                <div>
                  <dt className="text-secondary font-medium mb-1">Medium</dt>
                  <dd className="text-primary">Mixed Media</dd>
                </div>
                <div>
                  <dt className="text-secondary font-medium mb-1">Philosophy</dt>
                  <dd className="text-primary font-medium">&quot;Utopia = Reality&quot;</dd>
                </div>
              </dl>
            </div>

            {/* Education */}
            <div
              className="space-y-2"
              itemProp="alumniOf"
              itemScope
              itemType="https://schema.org/CollegeOrUniversity"
            >
              {artist.education.map((edu, index) => (
                <p key={index} className="text-secondary">
                  <span itemProp="department">{edu.degree}</span>
                  <br />
                  <span className="text-sm">
                    <a
                      href={edu.institutionUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                      itemProp="name"
                    >
                      {edu.institution}
                    </a>
                    {edu.year && `, ${edu.year}`}
                  </span>
                </p>
              ))}
            </div>

            {/* Current Representation */}
            {artist.affiliations?.find(a => a.type === 'representedBy') && (
              <div className="mt-6 pt-6 border-t border-pastel-green/20">
                <p className="text-sm text-secondary">
                  Currently represented by{' '}
                  <a
                    href={artist.affiliations.find(a => a.type === 'representedBy')?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    {artist.affiliations.find(a => a.type === 'representedBy')?.name}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Artistic Philosophy Section */}
      <section
        className="py-16 md:py-24 bg-pastel-green/10"
        aria-label="Artistic Philosophy"
      >
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl mb-4 text-center">
              Artistic Philosophy
            </h2>
            <h3 className="text-lg text-secondary text-center mb-8">
              &quot;Utopia = Reality&quot; — 유토피아는 곧 현실이다
            </h3>
            <div className="prose prose-lg max-w-none" itemProp="description">
              <p className="text-primary/80 leading-relaxed mb-6">
                The artist explores a version of nature reconstructed through imagination,
                rather than depicting &quot;nature as it is.&quot; This nature is not a simple landscape,
                but another world shaped by the emotions and experiences she has lived through.
              </p>
              <p className="text-primary/80 leading-relaxed mb-6">
                At the point where ideals and reality blur, her works exist as living worlds
                that are continuously refined and transformed, rather than fixed forms.
                Within this worldview, complex emotions such as oppression, melancholy,
                and healing naturally merge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Materials & Technique Section */}
      <section
        className="py-16 md:py-24"
        aria-label="Materials and Technique"
      >
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl mb-8 text-center">
              Materials &amp; Technique
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-primary/80 leading-relaxed mb-6">
                Lim Hyejung uses a proprietary medium she developed by fusing Eastern and
                Western traditional materials. This unique technique creates transparent,
                flowing textures on canvas reminiscent of watercolor, incorporating silver
                and gold leaf to embed the materiality of light onto the work&apos;s surface.
              </p>
              <p className="text-primary/80 leading-relaxed">
                As a result, her pieces function not as fixed images but as living objects
                that transform moment by moment with changing light and viewing angles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Statement - Korean (Full) */}
      <section
        className="py-16 md:py-24 bg-pastel-cream/30"
        aria-label="Artist Statement Korean"
      >
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl mb-8 text-center">
              작가 노트
              <span className="block text-base font-sans text-secondary mt-2">
                Artist Statement (Korean)
              </span>
            </h2>
            <div className="prose prose-lg max-w-none">
              {artist.statement.kr.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className="text-primary/80 leading-relaxed mb-6 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Artist Statement - English (Full) */}
      <section
        className="py-16 md:py-24"
        aria-label="Artist Statement English"
      >
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl mb-8 text-center">
              Artist Statement
              <span className="block text-base font-sans text-secondary mt-2">
                English
              </span>
            </h2>
            <div className="prose prose-lg max-w-none">
              {artist.statement.en.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className="text-primary/80 leading-relaxed mb-6 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 md:py-20 bg-pastel-green/10"
        aria-label="Learn More"
      >
        <div className="container-wide text-center">
          <h2 className="font-serif text-2xl mb-4">Explore Further</h2>
          <p className="text-secondary mb-8 max-w-xl mx-auto">
            Discover the artist&apos;s works and current exhibitions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/archive"
              className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              View Artworks
            </Link>
            <Link
              href="/exhibitions"
              className="px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              Current Exhibitions
            </Link>
            <Link
              href="/partnership"
              className="px-6 py-3 border border-secondary text-secondary rounded-full hover:border-primary hover:text-primary transition-colors"
            >
              Inquire
            </Link>
          </div>
        </div>
      </section>
      </article>
    </>
  )
}
