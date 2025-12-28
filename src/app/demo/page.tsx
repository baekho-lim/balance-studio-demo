'use client'

import Link from 'next/link'

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Agency Platform Demo
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Phase 0에서 생성된 모듈화 패키지들의 기능 데모입니다.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* @agency/core Demo */}
          <Link
            href="/demo/core"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📦</span>
              <h2 className="text-xl font-semibold text-gray-900">@agency/core</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              타입 시스템, Entity 모델, Zod 스키마, 유틸리티 함수
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Entity Types (Person, LocalBusiness, Product...)</li>
              <li>• MultilingualText & Locale 시스템</li>
              <li>• Slug 생성기, 날짜 포맷터</li>
              <li>• 업종별 타입 (Pilates, Restaurant, E-commerce)</li>
            </ul>
          </Link>

          {/* @agency/seo Demo */}
          <Link
            href="/demo/seo"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🔍</span>
              <h2 className="text-xl font-semibold text-gray-900">@agency/seo</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              JSON-LD 생성기, Meta Tags, LLM Context, robots.txt
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Person/Artist JSON-LD 생성</li>
              <li>• LocalBusiness/Restaurant 스키마</li>
              <li>• Event/Exhibition 스키마</li>
              <li>• LLM Citation 최적화</li>
            </ul>
          </Link>

          {/* @agency/themes Demo */}
          <Link
            href="/demo/themes"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🎨</span>
              <h2 className="text-xl font-semibold text-gray-900">@agency/themes</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              테마 시스템, 컬러 팔레트, 타이포그래피
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• 기본 테마 설정</li>
              <li>• 커스텀 테마 생성</li>
              <li>• 컬러 팔레트 미리보기</li>
              <li>• 타이포그래피 스타일</li>
            </ul>
          </Link>

          {/* Business Types Demo */}
          <Link
            href="/demo/business"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🏢</span>
              <h2 className="text-xl font-semibold text-gray-900">업종별 타입</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              필라테스, 레스토랑, 이커머스 전용 타입
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• FitnessClass, Instructor, MembershipPlan</li>
              <li>• MenuItem, MenuCategory, Reservation</li>
              <li>• Product, Variant, Order</li>
            </ul>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            패키지 구조
          </h3>
          <pre className="text-sm text-blue-800 overflow-x-auto">
{`packages/
├── agency-core/      # 56KB - 타입, 스키마, 유틸리티
├── agency-seo/       # 22KB - SEO/AEO/GEO
├── agency-ui/        # scaffold - UI 컴포넌트
├── agency-admin/     # scaffold - 어드민 시스템
├── agency-blog/      # scaffold - 블로그/CMS
└── agency-themes/    # 기본 테마 포함`}
          </pre>
        </div>
      </div>
    </main>
  )
}
