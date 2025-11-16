import Image from 'next/image'
import artistData from '@/data/artist.json'
import type { Artist } from '@/types'

const artist = artistData as Artist

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Artist Profile Header */}
      <section className="py-16 md:py-24">
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
              />
            </div>

            {/* Name */}
            <h1 className="font-serif text-4xl md:text-5xl mb-2">
              {artist.name}
            </h1>
            <p className="text-xl text-secondary mb-8">{artist.nameKr}</p>

            {/* Education */}
            <div className="space-y-2">
              {artist.education.map((edu, index) => (
                <p key={index} className="text-secondary">
                  {edu.degree}
                  <br />
                  <span className="text-sm">
                    {edu.institution}, {edu.year}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Artist Statement - Korean */}
      <section className="py-16 md:py-24 bg-pastel-green/10">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl mb-8 text-center">
              Artist Statement
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

      {/* Artist Statement - English */}
      <section className="py-16 md:py-24">
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
    </div>
  )
}
