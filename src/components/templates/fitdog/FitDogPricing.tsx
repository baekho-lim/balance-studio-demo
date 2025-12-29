'use client'

import { CheckCircle, Gift, Percent, Star, Shield, BarChart, Package, RefreshCw, MessageCircle } from 'lucide-react'

interface Props {
  pricing: {
    currency: string
    monthly: {
      basePrice: number
      description: { en: string; ko: string }
    }
    includes: Array<{
      id: string
      title: { en: string; ko: string }
      description: { en: string; ko: string }
      icon: string
    }>
    sizeVariations: Array<{
      size: string
      label: { en: string; ko: string }
      priceRange: { min: number; max: number }
    }>
    preRegistrationBenefits: Array<{
      id: string
      title: { en: string; ko: string }
      description: { en: string; ko: string }
      value: string
      icon: string
      limited?: boolean
      remaining?: number
    }>
    guarantee: {
      title: { en: string; ko: string }
      description: { en: string; ko: string }
      icon: string
    }
  }
  colors: { primary: string; accent: string }
}

const getIcon = (iconName: string, className: string, color: string) => {
  const iconProps = { className, style: { color } }
  switch (iconName) {
    case 'BarChart': return <BarChart {...iconProps} />
    case 'Package': return <Package {...iconProps} />
    case 'RefreshCw': return <RefreshCw {...iconProps} />
    case 'MessageCircle': return <MessageCircle {...iconProps} />
    case 'Gift': return <Gift {...iconProps} />
    case 'Percent': return <Percent {...iconProps} />
    case 'Star': return <Star {...iconProps} />
    case 'Shield': return <Shield {...iconProps} />
    default: return <CheckCircle {...iconProps} />
  }
}

export default function FitDogPricing({ pricing, colors }: Props) {
  return (
    <section id="pricing" className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium mb-2" style={{ color: colors.primary }}>
            가격
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            월 {pricing.monthly.basePrice.toLocaleString()}원
          </h2>
          <p className="text-gray-500">{pricing.monthly.description.ko}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Pricing Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div
              className="px-6 py-5 text-white"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}cc)` }}
            >
              <h3 className="text-lg font-semibold">월 구독</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold">
                  ₩{pricing.monthly.basePrice.toLocaleString()}
                </span>
                <span className="text-white/70">/월 (평균)</span>
              </div>
            </div>

            {/* Includes */}
            <div className="p-6">
              <h4 className="font-medium text-gray-900 mb-4">포함 내용</h4>
              <div className="space-y-3">
                {pricing.includes.map((item) => {
                  return (
                    <div key={item.id} className="flex items-start gap-3">
                      {getIcon(item.icon, "w-5 h-5 flex-shrink-0 mt-0.5", colors.primary)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.title.ko}</p>
                        <p className="text-xs text-gray-500">{item.description.ko}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Size Variations */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-3">크기별 가격</h4>
                <div className="space-y-2">
                  {pricing.sizeVariations.map((variation) => (
                    <div key={variation.size} className="flex justify-between text-sm">
                      <span className="text-gray-600">{variation.label.ko}</span>
                      <span className="text-gray-900 font-medium">
                        ₩{variation.priceRange.min.toLocaleString()} - {variation.priceRange.max.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantee */}
              <div className="mt-6 p-4 rounded-xl bg-green-50">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">{pricing.guarantee.title.ko}</p>
                    <p className="text-xs text-green-700 mt-1">{pricing.guarantee.description.ko}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pre-registration Benefits */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Gift className="w-5 h-5" style={{ color: colors.accent }} />
                <h3 className="font-semibold text-gray-900">사전등록 혜택</h3>
              </div>

              <div className="space-y-4">
                {pricing.preRegistrationBenefits.map((benefit) => {
                  return (
                    <div
                      key={benefit.id}
                      className={`p-4 rounded-xl ${
                        benefit.limited ? 'bg-gradient-to-r from-amber-50 to-orange-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: benefit.limited ? `${colors.accent}20` : `${colors.primary}15` }}
                        >
                          {getIcon(benefit.icon, "w-5 h-5", benefit.limited ? colors.accent : colors.primary)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{benefit.title.ko}</h4>
                            <span
                              className="text-sm font-bold"
                              style={{ color: benefit.limited ? colors.accent : colors.primary }}
                            >
                              {benefit.value.startsWith('20') ? benefit.value : `₩${parseInt(benefit.value).toLocaleString()}`}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{benefit.description.ko}</p>
                          {benefit.limited && benefit.remaining && (
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-xs font-medium text-orange-600">
                                🔥 {benefit.remaining}자리 남음
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <a
                href="#register"
                className="mt-6 w-full py-4 rounded-xl text-white font-medium text-center flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{ backgroundColor: colors.accent }}
              >
                지금 사전등록하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
