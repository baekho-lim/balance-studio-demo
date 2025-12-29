'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, ArrowRight, Store, ShoppingBag, Megaphone, BarChart3 } from 'lucide-react'
import { CommerceModal } from '@/components/templates/commerce'
import commerceConfig from '@/data/demo/commerce-config.json'

const platformIcons: Record<string, React.ReactNode> = {
  shopify: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-.854-.854-.963-.969c-.028-.03-.055-.048-.084-.058l-1.404 21.646zm-3.846-3.021l-.596-3.121s-.66.315-1.469.315c-1.188 0-1.248-.744-1.248-.932 0-1.022.301-1.738.603-2.416.302-.677.631-1.387.631-2.363 0-1.851-1.322-3.106-3.194-3.106-2.382 0-3.597 1.775-3.597 3.644 0 .932.355 1.968.808 2.777l-.025.016c-.193.309-1.528 2.376-1.528 4.397 0 2.441 1.581 4.199 4.473 4.199 2.198 0 3.728-1.236 4.142-3.41z"/>
    </svg>
  ),
  cafe24: (
    <span className="text-2xl font-bold text-orange-500">C24</span>
  ),
  woocommerce: (
    <span className="text-2xl font-bold text-purple-600">Woo</span>
  ),
  imweb: (
    <span className="text-2xl font-bold text-blue-600">IM</span>
  ),
  naver: (
    <span className="text-2xl font-bold text-green-500">N</span>
  ),
  coupang: (
    <span className="text-2xl font-bold text-red-500">CP</span>
  ),
}

export default function CommerceOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  const steps = commerceConfig.onboarding.steps
  const platforms = commerceConfig.onboarding.platforms

  const handleConnect = (platformId: string) => {
    setSelectedPlatform(platformId)
    setShowModal(true)
  }

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
          <Store className="w-4 h-4" />
          온보딩 가이드
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {commerceConfig.onboarding.title.ko}
        </h1>
        <p className="text-lg text-gray-600">
          {commerceConfig.onboarding.subtitle.ko}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex-1 relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 w-full h-0.5 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}

              <div className="relative flex flex-col items-center">
                {/* Step circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold z-10 ${
                    currentStep > step.number
                      ? 'bg-blue-600 text-white'
                      : currentStep === step.number
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>

                {/* Step text */}
                <div className="mt-3 text-center">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step.title.ko}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {step.description.ko}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Grid */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          이커머스 플랫폼 연결
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => handleConnect(platform.id)}
              className={`relative p-6 bg-white rounded-xl border-2 transition-all hover:shadow-lg ${
                platform.popular
                  ? 'border-blue-200 hover:border-blue-400'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {platform.popular && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded-full">
                  인기
                </span>
              )}
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center text-gray-700">
                  {platformIcons[platform.icon] || <ShoppingBag className="w-8 h-8" />}
                </div>
                <span className="font-medium text-gray-900">{platform.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                이미 스토어가 연결되어 있나요?
              </h3>
              <p className="text-blue-100 text-sm">
                대시보드에서 바로 데이터를 확인하세요
              </p>
            </div>
            <Link
              href="/demo/commerce/dashboard"
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              대시보드로 이동
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">통합 대시보드</h3>
            <p className="text-sm text-gray-600">
              모든 판매 채널의 매출, 주문, 고객 데이터를 한눈에
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-4">
              <Megaphone className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">광고 통합 관리</h3>
            <p className="text-sm text-gray-600">
              Meta, Google, TikTok 광고를 한 곳에서 관리
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI 콘텐츠 스튜디오</h3>
            <p className="text-sm text-gray-600">
              SEO 최적화된 상품 설명과 블로그 콘텐츠 자동 생성
            </p>
          </div>
        </div>
      </div>

      {/* HITL Modal */}
      <CommerceModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type="approval"
        title="플랫폼 연결 요청"
        message={`${selectedPlatform?.toUpperCase()} 연결을 요청합니다. 이 작업은 프로덕션 환경에서 OAuth 인증이 필요합니다.`}
      />
    </div>
  )
}
