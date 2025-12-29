'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, X } from 'lucide-react'

interface FitDogConfig {
  name: { en: string; ko: string }
  colors: { primary: string; accent: string }
  preRegistration: {
    goal: number
    current: number
    benefits: string[]
  }
}

export default function FitDogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [config, setConfig] = useState<FitDogConfig | null>(null)
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    fetch('/api/demo-data?template=fitdog&file=config')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past hero (approximately 600px)
      setShowStickyCTA(window.scrollY > 600 && !dismissed)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [dismissed])

  const primaryColor = config?.colors?.primary || '#16A3A3'
  const accentColor = config?.colors?.accent || '#FF6B6B'

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link href="/demo/fitdog" className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
              >
                F
              </div>
              <span className="font-semibold text-gray-900">
                {config?.name?.ko || '핏독'}
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <a href="#how-it-works" className="hover:text-gray-900 transition-colors">어떻게 작동하나요</a>
              <a href="#products" className="hover:text-gray-900 transition-colors">제품</a>
              <a href="#pricing" className="hover:text-gray-900 transition-colors">가격</a>
              <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
            </nav>
            <a
              href="#register"
              className="hidden md:inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white rounded-full transition-all hover:opacity-90"
              style={{ backgroundColor: accentColor }}
            >
              사전등록
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Sticky CTA Bar (Mobile) */}
      {showStickyCTA && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-lg"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex-1 mr-3">
              <p className="text-xs text-gray-500">지금 등록하면</p>
              <p className="text-sm font-medium" style={{ color: primaryColor }}>
                {config?.preRegistration?.benefits?.[0] || '무료 AI 리포트'}
              </p>
            </div>
            <a
              href="#register"
              className="flex-shrink-0 px-5 py-2.5 text-sm font-medium text-white rounded-full"
              style={{ backgroundColor: accentColor }}
            >
              사전등록
            </a>
            <button
              onClick={() => setDismissed(true)}
              className="ml-2 p-1 text-gray-400 hover:text-gray-600"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
                >
                  F
                </div>
                <span className="font-semibold text-white">핏독</span>
              </div>
              <p className="text-sm max-w-xs">
                품종 말고, 우리 아이 &apos;건강 데이터&apos;로 맞추는 식단.
                AI 변 분석으로 맞춤 영양을 설계합니다.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">서비스</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">어떻게 작동하나요</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">베이스 & 토핑</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">가격</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">고객지원</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#faq" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
                <li><a href="mailto:hello@fitdog.kr" className="hover:text-white transition-colors">이메일 문의</a></li>
                <li><a href="https://pf.kakao.com/fitdog" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">카카오톡 상담</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
              <p>&copy; {new Date().getFullYear()} FitDog. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
                <a href="#" className="hover:text-white transition-colors">이용약관</a>
              </div>
            </div>
            <p className="text-center text-xs mt-4 text-gray-600">
              * 핏독은 수의학적 진단을 대체하지 않습니다. 건강 이상 시 반드시 수의사와 상담하세요.
            </p>
          </div>
        </div>
      </footer>

      {/* Preview Banner */}
      <div className="fixed top-16 left-4 bg-yellow-500 text-yellow-900 px-3 py-1.5 rounded-lg shadow-lg text-xs font-medium z-40">
        🐕 데모 템플릿
      </div>
    </div>
  )
}
