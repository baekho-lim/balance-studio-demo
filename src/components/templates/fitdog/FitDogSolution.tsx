'use client'

import { Check, Eye, Shield } from 'lucide-react'

interface SolutionPoint {
  id: string
  title: { en: string; ko: string }
  description: { en: string; ko: string }
  icon: string
}

interface Props {
  solution: {
    headline: { en: string; ko: string }
    points: SolutionPoint[]
  }
  colors: { primary: string; accent: string }
}

const iconMap: Record<string, React.ReactNode> = {
  Check: <Check className="w-6 h-6" />,
  Eye: <Eye className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
}

export default function FitDogSolution({ solution, colors }: Props) {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium mb-2" style={{ color: colors.primary }}>
            핏독의 약속
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {solution.headline.ko}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solution.points.map((point) => (
            <div key={point.id} className="text-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${colors.primary}15` }}
              >
                <span style={{ color: colors.primary }}>{iconMap[point.icon]}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {point.title.ko}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {point.description.ko}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
