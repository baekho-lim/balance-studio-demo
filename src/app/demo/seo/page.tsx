'use client'

import Link from 'next/link'
import { useState } from 'react'

// Import from @agency/seo
import {
  generatePersonJsonLd,
  generateArtistJsonLd,
  generateLocalBusinessJsonLd,
  generateRestaurantJsonLd,
  generateHealthBusinessJsonLd,
  generateEventJsonLd,
  generateExhibitionJsonLd,
  generateArticleJsonLd,
  generateFAQJsonLd,
  generateProductJsonLd,
  generateWebsiteJsonLd,
} from '../../../../packages/agency-seo/src/generators'

import {
  generateLLMContext,
} from '../../../../packages/agency-seo/src/utils/llm-context'

import {
  generateRobotsTxt,
  defaultRobotsConfig,
} from '../../../../packages/agency-seo/src/utils/robots'

import type { PersonEntity } from '../../../../packages/agency-core/src/types'

export default function SeoDemoPage() {
  const [activeTab, setActiveTab] = useState<'person' | 'business' | 'event' | 'faq' | 'robots' | 'llm'>('person')

  // Sample data
  const samplePerson: PersonEntity = {
    id: 'artist-001',
    type: 'Person',
    slug: 'hyejung-lim',
    name: { en: 'Hyejung Lim', ko: '임혜정' },
    description: { en: 'Contemporary artist specializing in oil painting', ko: '유화 전문 현대 미술가' },
    images: { thumbnail: '/images/artist/profile.jpg', main: '/images/artist/profile-large.jpg' },
    seo: { title: 'Hyejung Lim - Contemporary Artist' },
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-26T00:00:00Z',
    givenName: { en: 'Hyejung', ko: '혜정' },
    familyName: { en: 'Lim', ko: '임' },
    jobTitle: { en: 'Visual Artist', ko: '시각예술가' },
    email: 'contact@limhyejung.com',
    nationality: 'KR',
  }

  // Generate JSON-LD outputs
  const personJsonLd = generatePersonJsonLd(samplePerson, {
    siteUrl: 'https://limhyejung.com',
    locale: 'en',
  })

  const artistJsonLd = generateArtistJsonLd(samplePerson, {
    siteUrl: 'https://limhyejung.com',
    locale: 'en',
    artMedium: ['Oil on canvas', 'Mixed media'],
    artworkCount: 150,
  })

  const businessJsonLd = generateLocalBusinessJsonLd(
    {
      id: 'studio-001',
      type: 'LocalBusiness',
      slug: 'zen-pilates',
      name: { en: 'Zen Pilates Studio' },
      description: { en: 'Premium pilates studio in Gangnam' },
      images: { thumbnail: '/studio.jpg', main: '/studio-main.jpg' },
      seo: {},
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
      ],
    },
    { siteUrl: 'https://zenpilates.com', locale: 'en' }
  )

  const eventJsonLd = generateExhibitionJsonLd(
    {
      id: 'exhibition-001',
      type: 'Event',
      slug: 'via-artfair-2025',
      name: { en: 'VIA Art Fair 2025', ko: 'VIA 아트페어 2025' },
      description: { en: 'International art fair in Ho Chi Minh City' },
      images: { thumbnail: '/exhibition.jpg', main: '/exhibition-main.jpg' },
      seo: {},
      status: 'published',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-12-26T00:00:00Z',
      eventType: 'ExhibitionEvent',
      startDate: '2025-03-01',
      endDate: '2025-03-05',
      location: {
        name: 'Saigon Exhibition Center',
        address: {
          streetAddress: '799 Nguyen Van Linh',
          addressLocality: 'District 7',
          addressRegion: 'Ho Chi Minh City',
          addressCountry: 'VN',
        },
      },
      eventStatus: 'scheduled',
      eventAttendanceMode: 'offline',
    },
    {
      siteUrl: 'https://limhyejung.com',
      locale: 'en',
      artworksCount: 12,
      exhibitionType: 'Group Exhibition',
    }
  )

  const faqJsonLd = generateFAQJsonLd([
    {
      question: { en: 'What is your art style?', ko: '어떤 스타일의 작품을 하시나요?' },
      answer: { en: 'I create contemporary oil paintings inspired by nature and human emotions.', ko: '자연과 인간 감성에서 영감을 받은 현대 유화 작품을 제작합니다.' },
    },
    {
      question: { en: 'Do you accept commissions?', ko: '커미션 작업을 받으시나요?' },
      answer: { en: 'Yes, I accept commissions. Please contact me for details.', ko: '네, 커미션 작업을 받습니다. 자세한 내용은 연락 주세요.' },
    },
  ], { locale: 'en' })

  const robotsTxt = generateRobotsTxt(defaultRobotsConfig)

  const llmContext = generateLLMContext({
    entity: {
      type: 'Person',
      name: 'Hyejung Lim',
      alternateName: ['임혜정', '林恵晶'],
    },
    primaryFacts: [
      'Contemporary visual artist based in South Korea',
      'Specializes in oil painting and mixed media',
      'Featured at VIA Art Fair 2024 and 2025',
      'Works held in private collections in Asia and Europe',
    ],
    expertise: ['Oil painting', 'Mixed media', 'Contemporary art'],
    uniqueValue: 'Blends Eastern philosophy with Western painting techniques',
    contact: {
      email: 'contact@limhyejung.com',
      website: 'https://limhyejung.com',
    },
    externalAuthority: {
      wikidata: 'Q137589862',
      socialProfiles: [
        'https://www.instagram.com/limhyejung_art',
      ],
    },
    lastUpdated: '2024-12-26',
  })

  const tabs = [
    { id: 'person', label: 'Person/Artist' },
    { id: 'business', label: 'LocalBusiness' },
    { id: 'event', label: 'Event/Exhibition' },
    { id: 'faq', label: 'FAQ' },
    { id: 'robots', label: 'robots.txt' },
    { id: 'llm', label: 'LLM Context' },
  ] as const

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/demo" className="text-blue-600 hover:underline mb-4 inline-block">
          ← 데모 목록으로
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          @agency/seo 데모
        </h1>
        <p className="text-gray-600 mb-8">
          Schema.org JSON-LD 생성기, robots.txt, LLM Context 기능을 확인하세요.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'person' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">generatePersonJsonLd() & generateArtistJsonLd()</h2>
              <p className="text-sm text-gray-500 mb-4">
                Person 및 Artist 타입의 Schema.org JSON-LD 생성
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2 text-purple-700">Person JSON-LD</h3>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto max-h-80">
                    {JSON.stringify(personJsonLd.jsonLd, null, 2)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-medium mb-2 text-purple-700">Artist JSON-LD (확장)</h3>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto max-h-80">
                    {JSON.stringify(artistJsonLd.jsonLd, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'business' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">generateLocalBusinessJsonLd()</h2>
              <p className="text-sm text-gray-500 mb-4">
                LocalBusiness, Restaurant, HealthAndBeautyBusiness 등의 JSON-LD 생성
              </p>

              <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto max-h-96">
                {JSON.stringify(businessJsonLd.jsonLd, null, 2)}
              </pre>
            </div>
          )}

          {activeTab === 'event' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">generateExhibitionJsonLd()</h2>
              <p className="text-sm text-gray-500 mb-4">
                ExhibitionEvent 타입의 JSON-LD 생성 (전시회, 아트페어 등)
              </p>

              <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto max-h-96">
                {JSON.stringify(eventJsonLd.jsonLd, null, 2)}
              </pre>
            </div>
          )}

          {activeTab === 'faq' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">generateFAQJsonLd()</h2>
              <p className="text-sm text-gray-500 mb-4">
                FAQPage 스키마 생성 (Google 검색 결과 FAQ 리치 스니펫)
              </p>

              <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto max-h-96">
                {JSON.stringify(faqJsonLd, null, 2)}
              </pre>
            </div>
          )}

          {activeTab === 'robots' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">generateRobotsTxt()</h2>
              <p className="text-sm text-gray-500 mb-4">
                robots.txt 생성 - AI 크롤러 (GPTBot, Claude-Web 등) 명시적 허용
              </p>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto max-h-96 whitespace-pre">
                {robotsTxt}
              </pre>

              <div className="mt-4 p-4 bg-blue-50 rounded">
                <h3 className="font-medium text-blue-800 mb-2">AI 크롤러 지원</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• GPTBot (OpenAI)</li>
                  <li>• ChatGPT-User (OpenAI)</li>
                  <li>• Google-Extended (Google AI)</li>
                  <li>• Anthropic-ai (Anthropic)</li>
                  <li>• Claude-Web (Anthropic)</li>
                  <li>• CCBot (Common Crawl)</li>
                  <li>• PerplexityBot (Perplexity)</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'llm' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">generateLLMContext()</h2>
              <p className="text-sm text-gray-500 mb-4">
                AI/LLM이 인용하기 쉬운 구조화된 컨텍스트 생성 (AEO 최적화)
              </p>

              <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto max-h-96">
                {JSON.stringify(llmContext, null, 2)}
              </pre>

              <div className="mt-4 p-4 bg-green-50 rounded">
                <h3 className="font-medium text-green-800 mb-2">AEO (Answer Engine Optimization) 전략</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• <strong>primaryFacts</strong>: ChatGPT, Gemini, Perplexity가 직접 인용 가능</li>
                  <li>• <strong>expertise</strong>: 전문 분야 명시</li>
                  <li>• <strong>externalAuthority</strong>: Wikidata, 소셜 프로필 연결</li>
                  <li>• <strong>lastUpdated</strong>: 정보 최신성 표시</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
