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
  AlertCircle: <AlertCircle className="w-6 h-6" />,
  HelpCircle: <HelpCircle className="w-6 h-6" />,
  Search: <Search className="w-6 h-6" />,
}

export default function FitDogPainPoints({ painPoints, colors }: Props) {
  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium mb-2" style={{ color: colors.accent }}>
            공감합니다
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            보호자님이 불안한 건,<br className="md:hidden" /> 보호자님 탓이 아닙니다.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            많은 보호자님들이 같은 고민을 하고 계세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((point, idx) => (
            <div
              key={point.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${colors.accent}15` }}
              >
                <span style={{ color: colors.accent }}>{iconMap[point.icon]}</span>
              </div>
              <div className="text-xs text-gray-400 mb-2">Pain #{idx + 1}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {point.title.ko}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {point.description.ko}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            &ldquo;이게 맞나?&rdquo; 하는 불안감, 저희가 해결해드릴게요.
          </p>
        </div>
      </div>
    </section>
  )
}
