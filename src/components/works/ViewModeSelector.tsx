'use client'

import { Grid3X3, LayoutGrid, Maximize2 } from 'lucide-react'

export type ViewMode = 'grid' | 'proportional' | 'large'

interface ViewModeSelectorProps {
  currentMode: ViewMode
  onModeChange: (mode: ViewMode) => void
}

const modes = [
  {
    id: 'grid' as ViewMode,
    icon: Grid3X3,
    label: 'Grid',
    labelKr: '그리드',
  },
  {
    id: 'proportional' as ViewMode,
    icon: LayoutGrid,
    label: 'Proportional',
    labelKr: '비율',
  },
  {
    id: 'large' as ViewMode,
    icon: Maximize2,
    label: 'Large',
    labelKr: '크게',
  },
]

export default function ViewModeSelector({
  currentMode,
  onModeChange,
}: ViewModeSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-12">
      <span className="text-sm text-secondary mr-3">View:</span>
      <div className="flex bg-white rounded-lg shadow-sm border border-primary/10 p-1">
        {modes.map((mode) => {
          const Icon = mode.icon
          const isActive = currentMode === mode.id
          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all
                ${
                  isActive
                    ? 'bg-pastel-sage/30 text-primary font-medium'
                    : 'text-secondary hover:text-primary hover:bg-gray-50'
                }
              `}
              aria-label={`${mode.label} view`}
            >
              <Icon size={18} />
              <span className="hidden sm:inline">{mode.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
