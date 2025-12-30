import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Eye,
  Rocket,
  Check,
  FileText,
  Globe,
  Sparkles,
  Wrench,
  Search,
  Bot,
  MapPin,
  ImageIcon
} from 'lucide-react'
import templatesData from '@/data/templates.json'

interface TemplateDetailPageProps {
  params: { id: string }
}

// Type definitions
interface MultilingualText {
  en: string
  ko: string
}

interface TemplateOption {
  name: MultilingualText
  price: string
}

interface PricingTier {
  price: string
  features: MultilingualText[]
}

interface Template {
  id: string
  name: MultilingualText
  shortDescription: MultilingualText
  description: MultilingualText
  thumbnail: string
  demoUrl: string
  status: 'available' | 'coming_soon'
  category: string
  features: MultilingualText[]
  pages: string[]
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  options?: TemplateOption[]
  pricing?: {
    starter: PricingTier
    growth: PricingTier
    pro: PricingTier
  }
}

export async function generateStaticParams() {
  return (templatesData as Template[]).map((template) => ({
    id: template.id,
  }))
}

export async function generateMetadata({ params }: TemplateDetailPageProps) {
  const template = (templatesData as Template[]).find((t) => t.id === params.id)
  if (!template) return { title: 'Template Not Found' }

  return {
    title: `${template.name.ko} | 템플릿 상세`,
    description: template.description.ko,
  }
}

export default function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  const template = (templatesData as Template[]).find((t) => t.id === params.id)

  if (!template) {
    notFound()
  }

  const isAvailable = template.status === 'available'

  // Category label mapping
  const categoryLabels: Record<string, string> = {
    'health-wellness': '헬스/웰니스',
    'pet-services': '반려동물 서비스',
    'food-beverage': '외식업',
    'education': '교육',
    'retail': '이커머스',
    'creative': '크리에이티브',
  }

  // Page name mapping
  const pageLabels: Record<string, string> = {
    home: '홈',
    schedule: '일정',
    instructors: '강사',
    pricing: '가격',
    contact: '문의',
    landing: '랜딩',
    menu: '메뉴',
    about: '소개',
    gallery: '갤러리',
    reservation: '예약',
    courses: '강좌',
    teachers: '강사',
    enrollment: '등록',
    faq: 'FAQ',
    products: '상품',
    categories: '카테고리',
    cart: '장바구니',
    checkout: '결제',
    account: '계정',
    portfolio: '포트폴리오',
    services: '서비스',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${template.colors.primary}20`,
                    color: template.colors.primary,
                  }}
                >
                  {categoryLabels[template.category] || template.category}
                </span>
                {!isAvailable && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    Coming Soon
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {template.name.ko}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {template.shortDescription.ko}
              </p>
              <p className="text-gray-500 mb-8 leading-relaxed">
                {template.description.ko}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                {isAvailable ? (
                  <>
                    <Link
                      href={template.demoUrl}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                      미리보기
                    </Link>
                    <Link
                      href={`/start?templateId=${template.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg font-medium transition-colors"
                      style={{ backgroundColor: template.colors.primary }}
                    >
                      <Rocket className="w-5 h-5" />
                      이 템플릿으로 시작하기
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/inquiry"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    출시 알림 받기
                  </Link>
                )}
              </div>
            </div>

            {/* Right: Thumbnail */}
            <div className="relative">
              <div
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-gray-200"
                style={{
                  background: `linear-gradient(135deg, ${template.colors.primary}10, ${template.colors.secondary}10)`,
                }}
              >
                {template.thumbnail ? (
                  <Image
                    src={template.thumbnail}
                    alt={template.name.ko}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">Preview Image</p>
                    </div>
                  </div>
                )}
              </div>
              {/* Color Swatches */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                <div
                  className="w-8 h-8 rounded-full border-2 border-white shadow"
                  style={{ backgroundColor: template.colors.primary }}
                  title="Primary"
                />
                <div
                  className="w-8 h-8 rounded-full border-2 border-white shadow"
                  style={{ backgroundColor: template.colors.secondary }}
                  title="Secondary"
                />
                <div
                  className="w-8 h-8 rounded-full border-2 border-white shadow"
                  style={{ backgroundColor: template.colors.accent }}
                  title="Accent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Included Features Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">포함 범위</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pages */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${template.colors.primary}15` }}
                >
                  <FileText className="w-5 h-5" style={{ color: template.colors.primary }} />
                </div>
                <h3 className="font-semibold text-gray-900">페이지 구성</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {template.pages.map((page) => (
                  <span
                    key={page}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm"
                  >
                    {pageLabels[page] || page}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${template.colors.primary}15` }}
                >
                  <Check className="w-5 h-5" style={{ color: template.colors.primary }} />
                </div>
                <h3 className="font-semibold text-gray-900">주요 기능</h3>
              </div>
              <ul className="space-y-2">
                {template.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature.ko}
                  </li>
                ))}
              </ul>
            </div>

            {/* SEO/GEO/AEO */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${template.colors.primary}15` }}
                >
                  <Search className="w-5 h-5" style={{ color: template.colors.primary }} />
                </div>
                <h3 className="font-semibold text-gray-900">SEO/GEO/AEO 최적화</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <Search className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">SEO</p>
                    <p className="text-sm text-gray-500">구글/네이버 검색 최적화</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">GEO</p>
                    <p className="text-sm text-gray-500">지역 검색 최적화</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Bot className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">AEO</p>
                    <p className="text-sm text-gray-500">AI 검색 최적화</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Options Section */}
      {template.options && (
        <section className="py-12 md:py-16 bg-white border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">추가 옵션</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {template.options.map((option, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {idx === 0 && <Globe className="w-5 h-5 text-blue-500" />}
                    {idx === 1 && <FileText className="w-5 h-5 text-green-500" />}
                    {idx === 2 && <Sparkles className="w-5 h-5 text-purple-500" />}
                    {idx === 3 && <Wrench className="w-5 h-5 text-orange-500" />}
                    <span className="font-medium text-gray-900">{option.name.ko}</span>
                  </div>
                  <p className="text-lg font-semibold" style={{ color: template.colors.primary }}>
                    {option.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {template.pricing && (
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">가격 패키지</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Starter */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Starter</h3>
                <p
                  className="text-3xl font-bold mb-6"
                  style={{ color: template.colors.primary }}
                >
                  {template.pricing.starter.price}
                </p>
                <ul className="space-y-3">
                  {template.pricing.starter.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature.ko}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Growth - Recommended */}
              <div
                className="rounded-xl p-6 border-2 relative"
                style={{ borderColor: template.colors.primary }}
              >
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-white text-xs font-medium rounded-full"
                  style={{ backgroundColor: template.colors.primary }}
                >
                  추천
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth</h3>
                <p
                  className="text-3xl font-bold mb-6"
                  style={{ color: template.colors.primary }}
                >
                  {template.pricing.growth.price}
                </p>
                <ul className="space-y-3">
                  {template.pricing.growth.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature.ko}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro</h3>
                <p
                  className="text-3xl font-bold mb-6"
                  style={{ color: template.colors.primary }}
                >
                  {template.pricing.pro.price}
                </p>
                <ul className="space-y-3">
                  {template.pricing.pro.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature.ko}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Screenshots/Cases Section */}
      <section className="py-12 md:py-16 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">사례 / 스크린샷</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-video rounded-xl border border-gray-200 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${template.colors.primary}05, ${template.colors.secondary}05)`,
                }}
              >
                <div className="text-center">
                  <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">스크린샷 {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-12 md:py-16"
        style={{
          background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {template.name.ko}로 시작하세요
          </h2>
          <p className="text-white/80 mb-8">
            빠르게 전문적인 웹사이트를 구축하고 비즈니스를 성장시키세요.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {isAvailable ? (
              <>
                <Link
                  href={template.demoUrl}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors backdrop-blur"
                >
                  <Eye className="w-5 h-5" />
                  미리보기
                </Link>
                <Link
                  href={`/start?templateId=${template.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <Rocket className="w-5 h-5" />
                  이 템플릿으로 시작하기
                </Link>
              </>
            ) : (
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                출시 알림 받기
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
