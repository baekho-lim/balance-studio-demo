'use client'

import Link from 'next/link'

// Import types from @agency/core
import type {
  MultilingualText,
  LocaleCode,
  BaseEntity,
  PersonEntity,
  LocalBusinessEntity,
  ServiceEntity,
} from '../../../../packages/agency-core/src/types'

// Import utilities
import {
  getText,
  getLocaleDisplayName,
  createMultilingualText,
  slugify,
  formatDate,
  formatRelativeTime,
} from '../../../../packages/agency-core/src/utils'

export default function CoreDemoPage() {
  // Demo data
  const multilingualName: MultilingualText = {
    en: 'Hyejung Lim',
    ko: '임혜정',
    ja: '林恵晶',
    vi: 'Lim Hyejung',
  }

  const samplePerson: PersonEntity = {
    id: 'artist-001',
    type: 'Person',
    slug: 'hyejung-lim',
    name: multilingualName,
    description: {
      en: 'Contemporary artist specializing in oil painting',
      ko: '유화 전문 현대 미술가',
    },
    images: {
      thumbnail: '/images/artist/profile.jpg',
      main: '/images/artist/profile-large.jpg',
    },
    seo: {
      title: 'Hyejung Lim - Contemporary Artist',
      description: 'Portfolio of Hyejung Lim',
    },
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-26T00:00:00Z',
    givenName: { en: 'Hyejung', ko: '혜정' },
    familyName: { en: 'Lim', ko: '임' },
    jobTitle: { en: 'Visual Artist', ko: '시각예술가' },
  }

  const sampleBusiness: LocalBusinessEntity = {
    id: 'studio-001',
    type: 'LocalBusiness',
    slug: 'zen-pilates-studio',
    name: { en: 'Zen Pilates Studio', ko: '젠 필라테스 스튜디오' },
    description: { en: 'Premium pilates studio', ko: '프리미엄 필라테스 스튜디오' },
    images: { thumbnail: '/images/studio.jpg', main: '/images/studio-main.jpg' },
    seo: { title: 'Zen Pilates Studio' },
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-26T00:00:00Z',
    businessType: 'HealthAndBeautyBusiness',
    address: {
      streetAddress: '123 Gangnam-daero',
      addressLocality: 'Gangnam-gu',
      addressRegion: 'Seoul',
      postalCode: '06000',
      addressCountry: 'KR',
    },
    geo: { latitude: 37.4979, longitude: 127.0276 },
    telephone: '+82-2-1234-5678',
    openingHours: [
      { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '06:00', closes: '22:00' },
      { dayOfWeek: ['Saturday'], opens: '08:00', closes: '18:00' },
    ],
  }

  const locales: LocaleCode[] = ['en', 'ko', 'ja', 'vi', 'zh-CN', 'fr', 'de']

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/demo" className="text-blue-600 hover:underline mb-4 inline-block">
          ← 데모 목록으로
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          @agency/core 데모
        </h1>
        <p className="text-gray-600 mb-8">
          타입 시스템, 유틸리티 함수, 다국어 지원 기능을 확인하세요.
        </p>

        {/* MultilingualText Demo */}
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">1. MultilingualText & getText()</h2>
          <p className="text-sm text-gray-500 mb-4">
            다국어 텍스트를 저장하고 원하는 언어로 가져오는 시스템
          </p>

          <div className="bg-gray-100 p-4 rounded mb-4">
            <pre className="text-sm overflow-x-auto">
{`const name: MultilingualText = ${JSON.stringify(multilingualName, null, 2)}`}
            </pre>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {locales.map((locale) => (
              <div key={locale} className="bg-blue-50 p-3 rounded">
                <div className="text-xs text-blue-600 mb-1">
                  {getLocaleDisplayName(locale)}
                </div>
                <div className="font-medium">
                  {getText(multilingualName, locale)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Slugify Demo */}
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">2. slugify() 함수</h2>
          <p className="text-sm text-gray-500 mb-4">
            URL-safe slug 생성 (한글, 일본어 등 지원)
          </p>

          <div className="space-y-3">
            {[
              '안녕하세요 Hello World',
              '林恵晶 アーティスト',
              'Zen Pilates Studio',
              '2024년 특별 전시회',
            ].map((input) => (
              <div key={input} className="flex items-center gap-4 bg-gray-50 p-3 rounded">
                <span className="text-gray-600 flex-1">{input}</span>
                <span className="text-gray-400">→</span>
                <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {slugify(input)}
                </code>
              </div>
            ))}
          </div>
        </section>

        {/* Date Formatting Demo */}
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">3. formatDate() & formatRelativeTime()</h2>
          <p className="text-sm text-gray-500 mb-4">
            날짜 포맷팅 및 상대 시간 표시
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-medium mb-3">formatDate()</h3>
              {(['en', 'ko', 'ja'] as LocaleCode[]).map((locale) => (
                <div key={locale} className="flex justify-between py-1 border-b border-gray-200 last:border-0">
                  <span className="text-gray-500">{locale}:</span>
                  <span>{formatDate(new Date(), locale)}</span>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-medium mb-3">formatRelativeTime()</h3>
              {[
                new Date(Date.now() - 5 * 60 * 1000),      // 5분 전
                new Date(Date.now() - 3 * 60 * 60 * 1000), // 3시간 전
                new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2일 전
              ].map((date, i) => (
                <div key={i} className="flex justify-between py-1 border-b border-gray-200 last:border-0">
                  <span className="text-gray-500">en:</span>
                  <span>{formatRelativeTime(date, 'en')}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Entity Types Demo */}
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">4. Entity Types</h2>
          <p className="text-sm text-gray-500 mb-4">
            BaseEntity를 확장한 다양한 엔티티 타입들
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded">
              <h3 className="font-medium text-purple-800 mb-2">PersonEntity</h3>
              <pre className="text-xs overflow-x-auto text-purple-900">
{JSON.stringify({
  id: samplePerson.id,
  type: samplePerson.type,
  name: samplePerson.name,
  jobTitle: samplePerson.jobTitle,
  status: samplePerson.status,
}, null, 2)}
              </pre>
            </div>
            <div className="bg-orange-50 p-4 rounded">
              <h3 className="font-medium text-orange-800 mb-2">LocalBusinessEntity</h3>
              <pre className="text-xs overflow-x-auto text-orange-900">
{JSON.stringify({
  id: sampleBusiness.id,
  type: sampleBusiness.type,
  name: sampleBusiness.name,
  businessType: sampleBusiness.businessType,
  address: sampleBusiness.address.addressLocality,
}, null, 2)}
              </pre>
            </div>
          </div>
        </section>

        {/* createMultilingualText Demo */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">5. createMultilingualText()</h2>
          <p className="text-sm text-gray-500 mb-4">
            단일 언어 텍스트를 MultilingualText로 변환
          </p>

          <div className="bg-gray-100 p-4 rounded">
            <pre className="text-sm overflow-x-auto">
{`// 단일 문자열 → MultilingualText
createMultilingualText('Hello World')
// Result: ${JSON.stringify(createMultilingualText('Hello World'))}

// 특정 언어로 생성
createMultilingualText('안녕하세요', 'ko')
// Result: ${JSON.stringify(createMultilingualText('안녕하세요', 'ko'))}`}
            </pre>
          </div>
        </section>
      </div>
    </main>
  )
}
