'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Star,
  Users,
  DollarSign,
  CheckCircle,
  Menu,
  X
} from 'lucide-react'

interface SiteConfig {
  id: string
  slug: string
  template: string
  name: { en: string; ko: string }
  tagline: { en: string; ko: string }
  description: { en: string; ko: string }
  telephone: string
  telephoneDisplay: string
  email: string
  address: {
    display: { en: string; ko: string }
  }
  navigation: Array<{ name: { en: string; ko: string }; href: string }>
  colors: { primary: string; secondary: string; accent: string }
}

interface Service {
  name: { en: string; ko: string }
  description: { en: string; ko: string }
}

interface TeamMember {
  name: string
  role: { en: string; ko: string }
  bio: { en: string; ko: string }
}

interface PricingPlan {
  name: { en: string; ko: string }
  price: string
  features: string[]
}

export default function ClientSitePage() {
  const params = useParams()
  const slug = params.slug as string

  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [team, setTeam] = useState<TeamMember[]>([])
  const [pricing, setPricing] = useState<PricingPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    loadSiteData()
  }, [slug])

  const loadSiteData = async () => {
    try {
      setIsLoading(true)

      // Fetch config
      const configRes = await fetch(`/api/client-data?slug=${slug}&file=config`)
      if (!configRes.ok) throw new Error('Site not found')
      const configData = await configRes.json()
      setConfig(configData)

      // Fetch services
      const servicesRes = await fetch(`/api/client-data?slug=${slug}&file=services`)
      if (servicesRes.ok) {
        const servicesData = await servicesRes.json()
        setServices(servicesData)
      }

      // Fetch team
      const teamRes = await fetch(`/api/client-data?slug=${slug}&file=team`)
      if (teamRes.ok) {
        const teamData = await teamRes.json()
        setTeam(teamData)
      }

      // Fetch pricing
      const pricingRes = await fetch(`/api/client-data?slug=${slug}&file=pricing`)
      if (pricingRes.ok) {
        const pricingData = await pricingRes.json()
        setPricing(pricingData)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load site')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">사이트를 찾을 수 없습니다</h1>
          <p className="text-gray-500 mb-8">{error || 'Site not found'}</p>
          <Link href="/admin/inquiries" className="text-blue-600 hover:underline">
            어드민으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const primaryColor = config.colors.primary
  const secondaryColor = config.colors.secondary

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={`/clients/${slug}`} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              >
                {config.name.ko.charAt(0)}
              </div>
              <span className="font-semibold text-gray-900">{config.name.ko}</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {config.navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  {item.name.ko}
                </a>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-100">
              {config.navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name.ko}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="pt-32 pb-20 px-4"
        style={{ background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10)` }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {config.name.ko}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {config.tagline.ko}
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto mb-8">
            {config.description.ko}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-full transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
            >
              문의하기
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              서비스 보기
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {services.length > 0 && (
        <section id="services" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">서비스</h2>
              <p className="text-gray-500">우리가 제공하는 서비스를 확인하세요</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${primaryColor}15` }}
                  >
                    <Star className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name.ko}</h3>
                  <p className="text-gray-500 text-sm">{service.description.ko}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {team.length > 0 && (
        <section id="team" className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">팀 소개</h2>
              <p className="text-gray-500">전문가들이 함께합니다</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20)` }}
                  >
                    <Users className="w-8 h-8" style={{ color: primaryColor }} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm font-medium mb-2" style={{ color: primaryColor }}>{member.role.ko}</p>
                  <p className="text-gray-500 text-sm">{member.bio.ko}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {pricing.length > 0 && (
        <section id="pricing" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">가격</h2>
              <p className="text-gray-500">합리적인 가격으로 최고의 서비스를 경험하세요</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricing.map((plan, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name.ko}</h3>
                    <div className="flex items-center justify-center gap-1">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <span className="text-2xl font-bold" style={{ color: primaryColor }}>{plan.price}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: primaryColor }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full py-3 rounded-xl text-white font-medium transition-all hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                  >
                    선택하기
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">문의하기</h2>
          <p className="text-gray-400 mb-8">궁금한 점이 있으시면 언제든지 연락주세요</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {config.telephone && (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
                  <Phone className="w-5 h-5" />
                </div>
                <p className="text-sm text-gray-400">전화</p>
                <a href={`tel:${config.telephone}`} className="hover:text-white transition-colors">
                  {config.telephoneDisplay || config.telephone}
                </a>
              </div>
            )}
            {config.email && (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
                  <Mail className="w-5 h-5" />
                </div>
                <p className="text-sm text-gray-400">이메일</p>
                <a href={`mailto:${config.email}`} className="hover:text-white transition-colors">
                  {config.email}
                </a>
              </div>
            )}
            {config.address?.display?.ko && (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="text-sm text-gray-400">주소</p>
                <p>{config.address.display.ko}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {config.name.ko}. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Powered by{' '}
            <Link href="/" className="text-gray-400 hover:text-white">
              Lim Agency
            </Link>
          </p>
        </div>
      </footer>

      {/* Preview Banner */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto bg-yellow-500 text-yellow-900 px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 z-50">
        <Clock className="w-4 h-4" />
        미리보기 모드 - 이 사이트는 아직 게시되지 않았습니다
      </div>
    </div>
  )
}
