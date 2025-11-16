'use client'

import type { ChapterSlug } from '@/types'

interface WorksFilterProps {
  chapters: { id: ChapterSlug; title: string }[]
  activeFilter: ChapterSlug | 'all'
  onFilterChange: (filter: ChapterSlug | 'all') => void
}

export default function WorksFilter({
  chapters,
  activeFilter,
  onFilterChange,
}: WorksFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {/* All Filter */}
      <button
        onClick={() => onFilterChange('all')}
        className={`text-sm tracking-widest uppercase transition-colors pb-1
                   ${
                     activeFilter === 'all'
                       ? 'text-primary border-b-2 border-pastel-sage'
                       : 'text-secondary hover:text-primary'
                   }`}
      >
        All
      </button>

      {/* Chapter Filters */}
      {chapters.map((chapter) => (
        <button
          key={chapter.id}
          onClick={() => onFilterChange(chapter.id)}
          className={`text-sm tracking-widest uppercase transition-colors pb-1
                     ${
                       activeFilter === chapter.id
                         ? 'text-primary border-b-2 border-pastel-sage'
                         : 'text-secondary hover:text-primary'
                     }`}
        >
          {chapter.title}
        </button>
      ))}
    </div>
  )
}
