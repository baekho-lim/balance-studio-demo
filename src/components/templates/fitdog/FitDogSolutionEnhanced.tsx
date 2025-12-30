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
  Check: <Check className="w-8 h-8" />,
  Eye: <Eye className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
}

export default function FitDogSolutionEnhanced({ solution, colors }: Props) {
  return (
    <section className="py-20 md:py-28 px-4 bg-white relative">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 60L60 52.5C120 45 240 30 360 22.5C480 15 600 15 720 20C840 25 960 35 1080 37.5C1200 40 1320 35 1380 32.5L1440 30V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V60Z"
            fill={`${colors.accent}08`}
          />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{
              backgroundColor: `${colors.primary}15`,
              color: colors.primary,
            }}
          >
            ✨ 핏독의 약속
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {solution.headline.ko}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solution.points.map((point, idx) => (
            <div
              key={point.id}
              className="group relative"
            >
              {/* Gradient border effect */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                  padding: '2px',
                }}
              >
                <div className="w-full h-full bg-white rounded-3xl" />
              </div>

              <div className="relative bg-white rounded-3xl p-8 text-center border-2 border-gray-100 group-hover:border-transparent transition-all duration-300 h-full">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}15, ${colors.primary}30)`,
                  }}
                >
                  <span style={{ color: colors.primary }}>{iconMap[point.icon]}</span>
                </div>
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white text-lg font-bold mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}cc)`,
                  }}
                >
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {point.title.ko}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {point.description.ko}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 flex justify-center">
          <div
            className="flex items-center gap-4 px-8 py-4 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}10, ${colors.accent}10)`,
            }}
          >
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: colors.primary }}
            />
            <p className="text-gray-600 font-medium">
              데이터 기반 맞춤 영양 관리
            </p>
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: colors.accent }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
