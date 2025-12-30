'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ExternalLink,
  Play,
  Briefcase,
  Monitor,
  Filter,
  Check,
  ArrowRight,
  Star,
  Clock,
  Sparkles
} from 'lucide-react'
import showcaseData from '@/data/showcase.json'

type FilterType = 'all' | 'portfolio' | 'demo'
type IndustryType = string

interface ShowcaseItem {
  id: string
  name: { en: string; ko: string }
  type: 'portfolio' | 'demo'
  industry: string
  industryLabel: { en: string; ko: string }
  url?: string
  demoUrl?: string
  thumbnail: string
  description: { en: string; ko: string }
  features: string[]
  techStack?: string[]
  templateId?: string
  completedAt?: string
  caseStudy?: {
    duration: string
    highlights: string[]
  }
  featured?: boolean
}

export default function ShowcasePage() {
  const [typeFilter, setTypeFilter] = useState<FilterType>('all')
  const [industryFilter, setIndustryFilter] = useState<IndustryType>('all')
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null)

  // Combine portfolio and demos
  const allItems: ShowcaseItem[] = [
    ...showcaseData.portfolio.map(item => ({ ...item, type: 'portfolio' as const })),
    ...showcaseData.demos.map(item => ({ ...item, type: 'demo' as const }))
  ]

  // Filter items
  const filteredItems = allItems.filter(item => {
    const typeMatch = typeFilter === 'all' || item.type === typeFilter
    const industryMatch = industryFilter === 'all' || item.industry === industryFilter
    return typeMatch && industryMatch
  })

  const getFeatureLabel = (feature: string) => {
    const labels = showcaseData.featureLabels as Record<string, { en: string; ko: string }>
    return labels[feature]?.ko || feature
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              쇼케이스
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              실제 운영 중인 포트폴리오와 체험 가능한 데모를 확인하세요
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Briefcase className="w-4 h-4" />
                <span>{showcaseData.portfolio.length}개 포트폴리오</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Monitor className="w-4 h-4" />
                <span>{showcaseData.demos.length}개 데모</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { value: 'all', label: '전체' },
                  { value: 'portfolio', label: '포트폴리오' },
                  { value: 'demo', label: '데모' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setTypeFilter(option.value as FilterType)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      typeFilter === option.value
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Industry Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {showcaseData.industries.map(industry => (
                <button
                  key={industry.id}
                  onClick={() => !industry.comingSoon && setIndustryFilter(industry.id)}
                  disabled={industry.comingSoon}
                  className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-all ${
                    industryFilter === industry.id
                      ? 'bg-blue-600 text-white'
                      : industry.comingSoon
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {industry.label.ko}
                  {industry.comingSoon && ' (준비중)'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">해당 필터에 맞는 항목이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.name.ko}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <span className="text-4xl font-bold text-gray-300">
                          {item.name.ko.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        item.type === 'portfolio'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.type === 'portfolio' ? '포트폴리오' : '데모'}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {item.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          추천
                        </span>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      {item.type === 'portfolio' && item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          사이트 방문
                        </a>
                      )}
                      {item.type === 'demo' && item.demoUrl && (
                        <Link
                          href={item.demoUrl}
                          className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors"
                        >
                          <Play className="w-4 h-4" />
                          데모 체험
                        </Link>
                      )}
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
                      >
                        상세 보기
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.name.ko}</h3>
                        <p className="text-sm text-gray-500">{item.industryLabel.ko}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {item.description.ko}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.features.slice(0, 4).map(feature => (
                        <span
                          key={feature}
                          className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                        >
                          {getFeatureLabel(feature)}
                        </span>
                      ))}
                      {item.features.length > 4 && (
                        <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                          +{item.features.length - 4}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2">
                      {item.type === 'portfolio' && item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          사이트 방문
                        </a>
                      ) : item.demoUrl ? (
                        <Link
                          href={item.demoUrl}
                          className="flex-1 text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          데모 체험
                        </Link>
                      ) : null}

                      {item.templateId && (
                        <Link
                          href={`/start?templateId=${item.templateId}`}
                          className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          시작하기
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            나만의 사이트를 만들어보세요
          </h2>
          <p className="text-gray-600 mb-8">
            원하는 템플릿을 선택하고, 5분 만에 프로토타입을 받아보세요
          </p>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            템플릿 둘러보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedItem(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedItem.name.ko}</h3>
                <p className="text-sm text-gray-500">{selectedItem.industryLabel.ko}</p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-6">
                {selectedItem.thumbnail ? (
                  <Image
                    src={selectedItem.thumbnail}
                    alt={selectedItem.name.ko}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <span className="text-6xl font-bold text-gray-300">
                      {selectedItem.name.ko.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{selectedItem.description.ko}</p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">주요 기능</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.features.map(feature => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      {getFeatureLabel(feature)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech Stack (Portfolio only) */}
              {selectedItem.techStack && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">기술 스택</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.techStack.map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Case Study (Portfolio only) */}
              {selectedItem.caseStudy && (
                <div className="mb-6 p-4 bg-green-50 rounded-xl">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    케이스 스터디
                  </h4>
                  <p className="text-sm text-green-700 mb-2">
                    개발 기간: {selectedItem.caseStudy.duration}
                  </p>
                  <ul className="space-y-1">
                    {selectedItem.caseStudy.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-green-700 flex items-start gap-2">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTAs */}
              <div className="flex items-center gap-3">
                {selectedItem.type === 'portfolio' && selectedItem.url && (
                  <a
                    href={selectedItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    사이트 방문
                  </a>
                )}
                {selectedItem.type === 'demo' && selectedItem.demoUrl && (
                  <Link
                    href={selectedItem.demoUrl}
                    className="flex-1 text-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    데모 체험
                  </Link>
                )}
                {selectedItem.templateId && (
                  <Link
                    href={`/start?templateId=${selectedItem.templateId}`}
                    className="flex-1 text-center px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    이 템플릿으로 시작
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
