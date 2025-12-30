'use client'

import { ArrowRight, CheckCircle } from 'lucide-react'

interface FitDogConfig {
  name: { en: string; ko: string }
  colors: { primary: string; accent: string }
  preRegistration: {
    goal: number
    current: number
    benefits: string[]
    betaLimit: number
    betaBenefit?: { en: string; ko: string }
  }
}

interface Props {
  config: FitDogConfig
}

export default function FitDogFinalCTA({ config }: Props) {
  const primaryColor = config.colors.primary
  const accentColor = config.colors.accent
  const progress = (config.preRegistration.current / config.preRegistration.goal) * 100

  return (
    <section
      className="py-20 md:py-28 px-4"
      style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}
    >
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
          보호자님의 &apos;불안&apos;을 줄이는 첫 걸음,<br className="hidden md:block" />
          오늘 시작하세요.
        </h2>
        <p className="text-white/80 max-w-xl mx-auto mb-8">
          매일 &quot;이게 맞나?&quot; 하는 고민 대신,<br />
          데이터로 확인하는 맞춤 영양 관리를 경험해보세요.
        </p>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {config.preRegistration.benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#register"
          className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium rounded-full transition-all hover:scale-105 shadow-lg"
          style={{ backgroundColor: accentColor, color: 'white' }}
        >
          지금 사전등록하기
          <ArrowRight className="w-5 h-5" />
        </a>

        {/* Progress */}
        <div className="mt-10 max-w-md mx-auto">
          <div className="flex justify-between text-sm text-white/70 mb-2">
            <span>선착순 {config.preRegistration.goal.toLocaleString()}명</span>
            <span className="font-medium text-white">
              {config.preRegistration.current.toLocaleString()}명 등록 완료
            </span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundColor: accentColor }}
            />
          </div>
          <p className="mt-2 text-xs text-white/60">
            베타 테스터 {config.preRegistration.betaLimit}명 중 23자리 남음
          </p>
        </div>
      </div>
    </section>
  )
}
