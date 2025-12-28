'use client'

import Link from 'next/link'
import { useState } from 'react'

import {
  generateLLMContext,
} from '../../../../packages/agency-seo/src/utils/llm-context'

import {
  generateRobotsTxt,
  defaultRobotsConfig,
} from '../../../../packages/agency-seo/src/utils/robots'

export default function SeoDemoPage() {
  const [activeTab, setActiveTab] = useState<'person' | 'business' | 'event' | 'faq' | 'robots' | 'llm'>('person')

  // Sample JSON-LD outputs (pre-generated for demo display)
  const personJsonLd = {
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://limhyejung.com/#artist',
      name: 'Hyejung Lim',
      alternateName: '임혜정',
      givenName: 'Hyejung',
      familyName: 'Lim',
      jobTitle: 'Visual Artist',
      description: 'Contemporary artist specializing in oil painting',
      nationality: { '@type': 'Country', name: 'South Korea' },
      email: 'mailto:contact@limhyejung.com',
      url: 'https://limhyejung.com',
      image: 'https://limhyejung.com/images/artist/profile.jpg',
    }
  }

  const artistJsonLd = {
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://limhyejung.com/#artist',
      name: 'Hyejung Lim',
      alternateName: '임혜정',
      givenName: 'Hyejung',
      familyName: 'Lim',
      jobTitle: 'Visual Artist',
      description: 'Contemporary artist specializing in oil painting',
      nationality: { '@type': 'Country', name: 'South Korea' },
      email: 'mailto:contact@limhyejung.com',
      url: 'https://limhyejung.com',
      image: 'https://limhyejung.com/images/artist/profile.jpg',
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Visual Artist',
        occupationalCategory: '27-1013',
      },
      knowsAbout: ['Oil Painting', 'Mixed media', 'Contemporary Art'],
      artMedium: ['Oil on canvas', 'Mixed media'],
    }
  }

  const businessJsonLd = {
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'HealthAndBeautyBusiness',
      '@id': 'https://zenpilates.com/#business',
      name: 'Zen Pilates Studio',
      description: 'Premium pilates studio in Gangnam',
      url: 'https://zenpilates.com',
      telephone: '+82-2-1234-5678',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Gangnam-daero',
        addressLocality: 'Gangnam-gu',
        addressRegion: 'Seoul',
        postalCode: '06000',
        addressCountry: 'KR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 37.4979,
        longitude: 127.0276,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '06:00',
          closes: '22:00',
        },
      ],
    }
  }

  const eventJsonLd = {
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ExhibitionEvent',
      '@id': 'https://limhyejung.com/exhibitions/via-artfair-2025',
      name: 'VIA Art Fair 2025',
      alternateName: 'VIA 아트페어 2025',
      description: 'International art fair in Ho Chi Minh City',
      startDate: '2025-03-01',
      endDate: '2025-03-05',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: 'Saigon Exhibition Center',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '799 Nguyen Van Linh',
          addressLocality: 'District 7',
          addressRegion: 'Ho Chi Minh City',
          addressCountry: 'VN',
        },
      },
      organizer: {
        '@type': 'Organization',
        name: 'VIA Art Fair',
      },
    }
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is your art style?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I create contemporary oil paintings inspired by nature and human emotions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you accept commissions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, I accept commissions. Please contact me for details.',
        },
      },
    ],
  }

  const robotsTxt = generateRobotsTxt(defaultRobotsConfig)

  const llmContext = generateLLMContext({
    entityType: 'Person',
    entityName: 'Hyejung Lim',
    primaryFacts: [
      'Contemporary visual artist based in South Korea',
      'Specializes in oil painting and mixed media',
      'Featured at VIA Art Fair 2024 and 2025',
      'Works held in private collections in Asia and Europe',
    ],
    expertise: ['Oil painting', 'Mixed media', 'Contemporary art'],
    uniqueValue: 'Blends Eastern philosophy with Western painting techniques',
    contactInfo: {
      email: 'contact@limhyejung.com',
      website: 'https://limhyejung.com',
    },
    externalAuthority: {
      wikidata: 'Q137589862',
      socialProfiles: [
        'https://www.instagram.com/limhyejung_art',
      ],
    },
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
