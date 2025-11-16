import Image from 'next/image'
import type { Artist } from '@/types'

interface ArtistIntroProps {
  artist: Artist
}

export default function ArtistIntro({ artist }: ArtistIntroProps) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Artist Photo */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={artist.profileImage}
              alt={artist.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right: Bio Text */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-2">
                {artist.name}
              </h2>
              <p className="text-secondary text-lg">{artist.nameKr}</p>
            </div>

            <p className="text-lg leading-relaxed text-primary/80">
              {artist.bio.en}
            </p>

            <p className="text-base leading-relaxed text-secondary">
              {artist.bio.kr}
            </p>

            {/* Education */}
            <div className="pt-4 border-t border-primary/10">
              {artist.education.map((edu, index) => (
                <p key={index} className="text-sm text-secondary">
                  {edu.degree}, {edu.institution} ({edu.year})
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
