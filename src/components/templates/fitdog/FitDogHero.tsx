'use client'

import { useState } from 'react'
import { ArrowRight, Shield, Users, Sparkles, CheckCircle } from 'lucide-react'

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

export default function FitDogHero({ config }: Props) {
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
      className="relative py-16 md:py-24 px-4"
      style={{ background: `linear-gradient(135deg, ${primaryColor}08, ${accentColor}05)` }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {config.hero.headline.ko}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              {config.hero.subheadline.ko}
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              {config.hero.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-sm text-sm text-gray-600"
                >
                  <span style={{ color: primaryColor }}>{iconMap[badge.icon]}</span>
                  {badge.label.ko}
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto lg:mx-0">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>사전등록 진행률</span>
                <span className="font-medium" style={{ color: primaryColor }}>
                  {config.preRegistration.current.toLocaleString()} / {config.preRegistration.goal.toLocaleString()}명
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, backgroundColor: primaryColor }}
                />
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-md mx-auto lg:mx-0 w-full">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${primaryColor}15` }}
                >
                  <CheckCircle className="w-8 h-8" style={{ color: primaryColor }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">등록 완료!</h3>
                <p className="text-gray-600 mb-4">
                  곧 무료 AI 변 리포트 안내를 보내드릴게요.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-500">
                  베타 테스터 선착순 50명 중 <strong className="text-gray-700">23자리</strong> 남았어요!
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-2">무료로 시작하기</h2>
                <p className="text-gray-500 text-sm mb-6">
                  사전등록하고 무료 AI 변 리포트를 받아보세요
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="이메일 또는 휴대폰 번호"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      크기 <span className="text-gray-400">(선택)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['소형', '중형', '대형'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setFormData({ ...formData, dogSize: size })}
                          className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                            formData.dogSize === size
                              ? 'border-teal-500 bg-teal-50 text-teal-700'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.contact}
                    className="w-full py-4 rounded-xl text-white font-medium text-lg flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: accentColor }}
                  >
                    {isSubmitting ? '등록 중...' : '사전등록하기'}
                    {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                  </button>
                </form>

                {/* Benefits */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center mb-3">등록하면 받는 혜택</p>
                  <div className="space-y-2">
                    {config.preRegistration.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
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
    </section>
  )
}
