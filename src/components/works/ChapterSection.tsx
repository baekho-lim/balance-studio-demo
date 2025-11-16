import type { Chapter } from '@/types'

interface ChapterSectionProps {
  chapter: Chapter
}

export default function ChapterSection({ chapter }: ChapterSectionProps) {
  return (
    <section id={chapter.id} className="scroll-mt-24">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl mb-4">
          {chapter.title}
        </h2>

        <p className="text-lg italic text-secondary mb-2">
          &ldquo;{chapter.question}&rdquo;
        </p>

        <p className="text-sm text-secondary/80">{chapter.questionKr}</p>

        <div className="mt-6 w-16 h-px bg-primary/20 mx-auto" />

        <p className="mt-6 text-primary/70 leading-relaxed">
          {chapter.description}
        </p>
      </div>
    </section>
  )
}
