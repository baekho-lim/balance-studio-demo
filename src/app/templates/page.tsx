'use client'

import Link from 'next/link'
import { ArrowRight, Eye, FileText, Sparkles, Check } from 'lucide-react'
import { SectionHeader, Button, Card, Badge } from '@agency/ui'
import templatesData from '@/data/templates.json'

const categoryLabels: Record<string, { en: string; ko: string }> = {
  'health-wellness': { en: 'Health & Wellness', ko: '건강/웰니스' },
  'food-beverage': { en: 'Food & Beverage', ko: '식음료' },
  'education': { en: 'Education', ko: '교육' },
  'retail': { en: 'Retail', ko: '소매' },
  'creative': { en: 'Creative', ko: '크리에이티브' },
}

export default function TemplatesPage() {
  const availableTemplates = templatesData.filter(t => t.status === 'available')
  const comingSoonTemplates = templatesData.filter(t => t.status === 'coming_soon')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              프리미엄 웹사이트 템플릿
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              당신의 비즈니스에 맞는<br />
              완벽한 템플릿을 선택하세요
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              SEO 최적화, 모바일 반응형, 빠른 로딩 속도.<br />
              전문가가 디자인한 템플릿으로 온라인 존재감을 높이세요.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/templates/guide" variant="secondary" size="lg">
                <FileText className="w-5 h-5 mr-2" />
                기획 가이드 보기
              </Button>
              <Button href="#templates" size="lg" className="bg-white/20 hover:bg-white/30">
                템플릿 둘러보기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: '🎨', title: '전문 디자인', desc: '트렌디하고 세련된 UI/UX' },
              { icon: '📱', title: '모바일 최적화', desc: '모든 디바이스에서 완벽' },
              { icon: '🔍', title: 'SEO 최적화', desc: 'Google 검색 상위 노출' },
              { icon: '⚡', title: '빠른 로딩', desc: '최신 기술로 초고속 성능' },
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Templates */}
      <section id="templates" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="바로 사용 가능한 템플릿"
            subtitle="지금 바로 데모를 체험하고 문의하세요"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableTemplates.map(template => (
              <Link key={template.id} href={`/templates/${template.id}`}>
                <Card padding="none" hover className="overflow-hidden cursor-pointer">
                  {/* Thumbnail */}
                  <div
                    className="aspect-[16/10] flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${template.colors.primary}20, ${template.colors.secondary}20)`
                    }}
                  >
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-bold"
                      style={{ background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})` }}
                    >
                      {template.name.ko.charAt(0)}
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="primary">
                        {categoryLabels[template.category]?.ko || template.category}
                      </Badge>
                      <Badge variant="success">사용 가능</Badge>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name.ko}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {template.shortDescription.ko}
                    </p>

                    {/* Features */}
                    <div className="space-y-1 mb-6">
                      {template.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500" />
                          {feature.ko}
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <span className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50">
                        <Eye className="w-4 h-4 mr-1" />
                        상세 보기
                      </span>
                      <span className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium">
                        <ArrowRight className="w-4 h-4 mr-1" />
                        선택하기
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Templates */}
      {comingSoonTemplates.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeader
              title="준비 중인 템플릿"
              subtitle="곧 출시됩니다. 미리 문의하시면 우선 알림을 받으실 수 있습니다."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {comingSoonTemplates.map(template => (
                <Link key={template.id} href={`/templates/${template.id}`}>
                  <Card padding="md" className="opacity-80 cursor-pointer hover:opacity-100 transition-opacity">
                    {/* Mini Thumbnail */}
                    <div
                      className="aspect-square rounded-xl mb-4 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${template.colors.primary}15, ${template.colors.secondary}15)`
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold"
                        style={{ background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})` }}
                      >
                        {template.name.ko.charAt(0)}
                      </div>
                    </div>

                    <Badge variant="warning" className="mb-2">Coming Soon</Badge>
                    <h3 className="font-bold text-gray-900 mb-1">{template.name.ko}</h3>
                    <p className="text-gray-500 text-xs line-clamp-2">
                      {template.shortDescription.ko}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            원하는 템플릿이 없으신가요?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            맞춤형 웹사이트 제작도 가능합니다.<br />
            기획서를 작성하시면 무료 상담을 도와드립니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/templates/guide" variant="gradient" size="lg">
              <FileText className="w-5 h-5 mr-2" />
              기획 가이드 보기
            </Button>
            <Button href="/inquiry" size="lg" className="bg-gray-700 hover:bg-gray-600">
              맞춤 문의하기
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
