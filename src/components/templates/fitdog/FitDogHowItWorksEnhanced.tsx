'use client'

import { Camera, BarChart2, Utensils } from 'lucide-react'

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
  Camera: <Camera className="w-10 h-10" />,
  BarChart2: <BarChart2 className="w-10 h-10" />,
  Utensils: <Utensils className="w-10 h-10" />,
}

export default function FitDogHowItWorksEnhanced({ howItWorks, colors }: Props) {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary}dd 50%, ${colors.primary}bb 100%)`,
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 bg-white" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10 bg-white" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">
            🚀 3단계로 시작
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {howItWorks.headline.ko}
          </h2>
          <p className="text-white/80 max-w-xl mx-auto">
            복잡한 절차 없이, 사진 한 장으로 시작하세요
          </p>
        </div>

        {/* Desktop: Horizontal Steps with connecting line */}
        <div className="hidden md:block relative">
          {/* Connecting line */}
          <div className="absolute top-24 left-[15%] right-[15%] h-1 bg-white/20 rounded-full" />
          <div
            className="absolute top-24 left-[15%] h-1 rounded-full transition-all duration-1000"
            style={{
              width: '70%',
              background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent}80)`,
            }}
          />

          <div className="grid grid-cols-3 gap-8">
            {howItWorks.steps.map((step) => (
              <div key={step.step} className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
                  {/* Step number circle */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}dd)`,
                      color: 'white',
                    }}
                  >
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-white/20 backdrop-blur-sm">
                    <span className="text-white">{iconMap[step.icon]}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title.ko}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {step.description.ko}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical Steps */}
        <div className="md:hidden space-y-6">
          {howItWorks.steps.map((step, idx) => (
            <div key={step.step} className="relative">
              {/* Vertical line */}
              {idx < howItWorks.steps.length - 1 && (
                <div
                  className="absolute left-6 top-20 bottom-0 w-0.5"
                  style={{ backgroundColor: `${colors.accent}50` }}
                />
              )}

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-start gap-4">
                  {/* Step number */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}dd)`,
                      color: 'white',
                    }}
                  >
                    {step.step}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20">
                        <span className="text-white">{iconMap[step.icon]}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {step.title.ko}
                      </h3>
                    </div>
                    <p className="text-white/80 leading-relaxed">
                      {step.description.ko}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA hint */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm">
            ⬇️ 아래에서 더 자세히 알아보세요
          </p>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 80L48 74.7C96 69 192 59 288 53.3C384 48 480 48 576 53.3C672 59 768 69 864 69.3C960 69 1056 59 1152 53.3C1248 48 1344 48 1392 48L1440 48V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V80Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
