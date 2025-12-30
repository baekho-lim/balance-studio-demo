'use client'

import { AlertCircle, HelpCircle, Search } from 'lucide-react'

interface PainPoint {
  id: string
  title: { en: string; ko: string }
  description: { en: string; ko: string }
  icon: string
}

interface Props {
  painPoints: PainPoint[]
  colors: { primary: string; accent: string }
}

const iconMap: Record<string, React.ReactNode> = {
  AlertCircle: <AlertCircle className="w-8 h-8" />,
  HelpCircle: <HelpCircle className="w-8 h-8" />,
  Search: <Search className="w-8 h-8" />,
}

export default function FitDogPainPointsEnhanced({ painPoints, colors }: Props) {
  return (
    <section
      className="py-20 md:py-28 px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, white 0%, ${colors.accent}08 50%, ${colors.accent}15 100%)`,
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-20 right-0 w-64 h-64 rounded-full opacity-10 -translate-x-1/2"
        style={{ backgroundColor: colors.accent }}
      />
      <div
        className="absolute bottom-0 left-10 w-40 h-40 rounded-full opacity-10"
        style={{ backgroundColor: colors.accent }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{
              backgroundColor: `${colors.accent}15`,
              color: colors.accent,
            }}
          >
            💭 공감합니다
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            보호자님이 불안한 건,<br className="md:hidden" /> 보호자님 탓이 아닙니다.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            많은 보호자님들이 같은 고민을 하고 계세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {painPoints.map((point, idx) => (
            <div
              key={point.id}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent}20, ${colors.accent}40)`,
                }}
              >
                <span style={{ color: colors.accent }}>{iconMap[point.icon]}</span>
              </div>
              <div
                className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
                style={{
                  backgroundColor: `${colors.accent}10`,
                  color: colors.accent,
                }}
              >
                Pain #{idx + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {point.title.ko}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {point.description.ko}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${colors.accent}10, ${colors.primary}10)`,
            }}
          >
            <span className="text-2xl">🐕</span>
            <p className="text-gray-600 font-medium">
              &ldquo;이게 맞나?&rdquo; 하는 불안감, 저희가 해결해드릴게요.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
