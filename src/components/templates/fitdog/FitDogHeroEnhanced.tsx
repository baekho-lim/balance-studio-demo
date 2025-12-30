'use client'

import { useState } from 'react'
import { ArrowRight, Shield, Users, Sparkles, CheckCircle, Dog } from 'lucide-react'

interface FitDogConfig {
  name: { en: string; ko: string }
  colors: { primary: string; accent: string }
  preRegistration: {
    goal: number
    current: number
    benefits: string[]
    betaLimit: number
  }
  hero: {
    headline: { en: string; ko: string }
    subheadline: { en: string; ko: string }
    badges: Array<{ id: string; label: { en: string; ko: string }; icon: string }>
  }
}

interface Props {
  config: FitDogConfig
}

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
}

export default function FitDogHeroEnhanced({ config }: Props) {
  const [formData, setFormData] = useState({
    contact: '',
    dogName: '',
    dogSize: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const primaryColor = config.colors.primary
  const accentColor = config.colors.accent
  const progress = (config.preRegistration.current / config.preRegistration.goal) * 100

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.contact) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/fitdog/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setIsSubmitted(true)
      }
    } catch (err) {
      console.error('Registration failed:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="register"
      className="relative min-h-[90vh] flex items-center py-16 md:py-24 px-4 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 50%, ${accentColor}99 100%)`,
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        <div
          className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-10"
          style={{ backgroundColor: 'white' }}
        />
        <div
          className="absolute bottom-20 right-10 w-48 h-48 rounded-full opacity-10"
          style={{ backgroundColor: 'white' }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full opacity-5"
          style={{ backgroundColor: 'white' }}
        />
        {/* Paw prints pattern */}
        <div className="absolute top-1/4 right-1/4 opacity-10">
          <Dog className="w-16 h-16 text-white" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 opacity-5">
          <Dog className="w-24 h-24 text-white rotate-12" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              AI 기반 맞춤 영양 솔루션
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {config.hero.headline.ko}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0">
              {config.hero.subheadline.ko}
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              {config.hero.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white border border-white/30"
                >
                  <span>{iconMap[badge.icon]}</span>
                  {badge.label.ko}
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto lg:mx-0 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex justify-between text-sm text-white/80 mb-2">
                <span>사전등록 진행률</span>
                <span className="font-medium text-white">
                  {config.preRegistration.current.toLocaleString()} / {config.preRegistration.goal.toLocaleString()}명
                </span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${accentColor}, ${accentColor}dd)`,
                  }}
                />
              </div>
              <p className="text-xs text-white/60 mt-2 text-center">
                🔥 목표까지 {(config.preRegistration.goal - config.preRegistration.current).toLocaleString()}명 남았어요!
              </p>
            </div>
          </div>

          {/* Right: Form - Glassmorphism */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 max-w-md mx-auto lg:mx-0 w-full border border-white/50">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}20, ${primaryColor}40)`,
                  }}
                >
                  <CheckCircle className="w-10 h-10" style={{ color: primaryColor }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">등록 완료!</h3>
                <p className="text-gray-600 mb-4">
                  곧 무료 AI 변 리포트 안내를 보내드릴게요.
                </p>
                <div
                  className="rounded-xl p-4 text-sm"
                  style={{ backgroundColor: `${accentColor}15` }}
                >
                  <span style={{ color: accentColor }}>
                    🎉 베타 테스터 선착순 50명 중 <strong>23자리</strong> 남았어요!
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">무료로 시작하기</h2>
                  <p className="text-gray-500">
                    사전등록하고 무료 AI 변 리포트를 받아보세요
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      연락처 <span style={{ color: accentColor }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="이메일 또는 휴대폰 번호"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all text-lg"
                      style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      강아지 이름 <span className="text-gray-400">(선택)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="예: 코코, 뽀삐"
                      value={formData.dogName}
                      onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all"
                      style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      크기 <span className="text-gray-400">(선택)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['소형', '중형', '대형'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setFormData({ ...formData, dogSize: size })}
                          className="py-3 rounded-xl border-2 text-sm font-medium transition-all"
                          style={{
                            borderColor: formData.dogSize === size ? primaryColor : '#E5E7EB',
                            backgroundColor: formData.dogSize === size ? `${primaryColor}10` : 'transparent',
                            color: formData.dogSize === size ? primaryColor : '#4B5563',
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.contact}
                    className="w-full py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
                    }}
                  >
                    {isSubmitting ? '등록 중...' : '사전등록하기'}
                    {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                  </button>
                </form>

                {/* Benefits */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center mb-3">✨ 등록하면 받는 혜택</p>
                  <div className="space-y-2">
                    {config.preRegistration.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2"
                      >
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: primaryColor }} />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
