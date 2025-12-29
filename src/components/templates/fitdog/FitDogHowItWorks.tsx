'use client'

import { Camera, BarChart2, Utensils, ArrowRight } from 'lucide-react'

interface Step {
  step: number
  title: { en: string; ko: string }
  description: { en: string; ko: string }
  icon: string
}

interface Props {
  howItWorks: {
    headline: { en: string; ko: string }
    steps: Step[]
  }
  colors: { primary: string; accent: string }
}

const iconMap: Record<string, React.ReactNode> = {
  Camera: <Camera className="w-8 h-8" />,
  BarChart2: <BarChart2 className="w-8 h-8" />,
  Utensils: <Utensils className="w-8 h-8" />,
}

export default function FitDogHowItWorks({ howItWorks, colors }: Props) {
  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium mb-2" style={{ color: colors.primary }}>
            3단계로 시작
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {howItWorks.headline.ko}
          </h2>
        </div>

        <div className="relative">
          {/* Desktop: Horizontal Steps */}
          <div className="hidden md:grid grid-cols-3 gap-8">
            {howItWorks.steps.map((step, idx) => (
              <div key={step.step} className="relative">
                {idx < howItWorks.steps.length - 1 && (
                  <div className="absolute top-12 left-1/2 w-full flex items-center justify-center z-0">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
                <div className="relative z-10 bg-white rounded-2xl p-8 shadow-sm text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${colors.primary}15` }}
                  >
                    <span style={{ color: colors.primary }}>{iconMap[step.icon]}</span>
                  </div>
                  <div
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold mb-4"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title.ko}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description.ko}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Vertical Steps */}
          <div className="md:hidden space-y-6">
            {howItWorks.steps.map((step) => (
              <div key={step.step} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${colors.primary}15` }}
                  >
                    <span style={{ color: colors.primary }}>{iconMap[step.icon]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: colors.primary }}
                      >
                        {step.step}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {step.title.ko}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.description.ko}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
