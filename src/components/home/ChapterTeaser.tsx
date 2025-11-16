import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Chapter } from '@/types'

interface ChapterTeaserProps {
  chapter: Chapter
  isReversed?: boolean
}

export default function ChapterTeaser({
  chapter,
  isReversed = false,
}: ChapterTeaserProps) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center
                  ${isReversed ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Image */}
      <div
        className={`relative aspect-[4/3] overflow-hidden group
                    ${isReversed ? 'lg:order-2' : ''}`}
      >
        <Image
          src={chapter.coverImage}
          alt={chapter.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-400" />
      </div>

      {/* Content */}
      <div className={`space-y-6 ${isReversed ? 'lg:order-1 lg:text-right' : ''}`}>
        <h3 className="font-serif text-2xl md:text-3xl">{chapter.title}</h3>

        <p className="text-lg italic text-secondary leading-relaxed">
          &ldquo;{chapter.question}&rdquo;
        </p>

        <p className="text-sm text-secondary">{chapter.questionKr}</p>

        <Link
          href={`/works#${chapter.id}`}
          className={`inline-flex items-center gap-2 text-sm tracking-widest uppercase
                      hover:text-pastel-sage transition-colors group/link
                      ${isReversed ? 'flex-row-reverse' : ''}`}
        >
          <span>View works</span>
          <ArrowRight
            size={16}
            className={`transition-transform group-hover/link:translate-x-1
                       ${isReversed ? 'rotate-180 group-hover/link:-translate-x-1' : ''}`}
          />
        </Link>
      </div>
    </div>
  )
}
