'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Sparkles, Zap } from 'lucide-react'

// Classic Components
import FitDogHero from '@/components/templates/fitdog/FitDogHero'
import FitDogPainPoints from '@/components/templates/fitdog/FitDogPainPoints'
import FitDogSolution from '@/components/templates/fitdog/FitDogSolution'
import FitDogHowItWorks from '@/components/templates/fitdog/FitDogHowItWorks'
import FitDogPersonalization from '@/components/templates/fitdog/FitDogPersonalization'
import FitDogScience from '@/components/templates/fitdog/FitDogScience'
import FitDogProducts from '@/components/templates/fitdog/FitDogProducts'
import FitDogPricing from '@/components/templates/fitdog/FitDogPricing'
import FitDogTestimonials from '@/components/templates/fitdog/FitDogTestimonials'
import FitDogFAQ from '@/components/templates/fitdog/FitDogFAQ'
import FitDogFinalCTA from '@/components/templates/fitdog/FitDogFinalCTA'

// Enhanced Components
import FitDogHeroEnhanced from '@/components/templates/fitdog/FitDogHeroEnhanced'
import FitDogPainPointsEnhanced from '@/components/templates/fitdog/FitDogPainPointsEnhanced'
import FitDogSolutionEnhanced from '@/components/templates/fitdog/FitDogSolutionEnhanced'
import FitDogHowItWorksEnhanced from '@/components/templates/fitdog/FitDogHowItWorksEnhanced'

interface FitDogConfig {
  name: { en: string; ko: string }
  tagline: { en: string; ko: string }
  description: { en: string; ko: string }
  colors: { primary: string; accent: string }
  preRegistration: {
    goal: number
    current: number
    benefits: string[]
    betaLimit: number
  }
  hero: {
    headline: { en: string; ko: string }
    subheadline: { en: string; ko: string }
    badges: Array<{ id: string; label: { en: string; ko: string }; icon: string }>
  }
  painPoints: Array<{
    id: string
    title: { en: string; ko: string }
    description: { en: string; ko: string }
    icon: string
  }>
  solution: {
    headline: { en: string; ko: string }
    points: Array<{
      id: string
      title: { en: string; ko: string }
      description: { en: string; ko: string }
      icon: string
    }>
  }
  howItWorks: {
    headline: { en: string; ko: string }
    steps: Array<{
      step: number
      title: { en: string; ko: string }
      description: { en: string; ko: string }
      icon: string
    }>
  }
  personalization: {
    headline: { en: string; ko: string }
    subheadline: { en: string; ko: string }
    sampleScore: {
      current: number
      previousWeek: number
      trend: string
    }
    alerts: Array<{
      type: string
      message: { en: string; ko: string }
    }>
  }
  science: {
    headline: { en: string; ko: string }
    references: Array<{
      id: string
      title: { en: string; ko: string }
      source: string
    }>
    vetQuote: {
      text: { en: string; ko: string }
      author: string
      credentials: { en: string; ko: string }
    }
    disclaimer: { en: string; ko: string }
  }
}

interface Products {
  bases: Array<{
    id: string
    name: { en: string; ko: string }
    description: { en: string; ko: string }
    icon: string
    color: string
    displayOrder: number
  }>
  toppings: Array<{
    id: string
    name: { en: string; ko: string }
    description: { en: string; ko: string }
    whenToIncrease: { en: string; ko: string }
    whenToDecrease: { en: string; ko: string }
    icon: string
    displayOrder: number
  }>
}

interface Pricing {
  currency: string
  monthly: {
    basePrice: number
    description: { en: string; ko: string }
  }
  includes: Array<{
    id: string
    title: { en: string; ko: string }
    description: { en: string; ko: string }
    icon: string
  }>
  sizeVariations: Array<{
    size: string
    label: { en: string; ko: string }
    priceRange: { min: number; max: number }
  }>
  preRegistrationBenefits: Array<{
    id: string
    title: { en: string; ko: string }
    description: { en: string; ko: string }
    value: string
    icon: string
    limited?: boolean
    remaining?: number
  }>
  guarantee: {
    title: { en: string; ko: string }
    description: { en: string; ko: string }
    icon: string
  }
}

interface Testimonial {
  id: string
  type: string
  dogName: string
  dogBreed: { en: string; ko: string }
  dogAge: string
  ownerName: string
  problem: { en: string; ko: string }
  result: { en: string; ko: string }
  quote: { en: string; ko: string }
  rating: number
  displayOrder: number
}

interface FAQ {
  id: string
  question: { en: string; ko: string }
  answer: { en: string; ko: string }
  category: string
  displayOrder: number
}

// Version Toggle Component
function VersionToggle({
  version,
  onChange,
  primaryColor,
}: {
  version: 'classic' | 'enhanced'
  onChange: (v: 'classic' | 'enhanced') => void
  primaryColor: string
}) {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white rounded-full shadow-lg border border-gray-200 p-1 flex items-center gap-1">
        <button
          onClick={() => onChange('classic')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            version === 'classic'
              ? 'bg-gray-900 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Zap className="w-4 h-4" />
          Classic
        </button>
        <button
          onClick={() => onChange('enhanced')}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
          style={{
            backgroundColor: version === 'enhanced' ? primaryColor : 'transparent',
            color: version === 'enhanced' ? 'white' : '#4B5563',
          }}
        >
          <Sparkles className="w-4 h-4" />
          Enhanced
        </button>
      </div>
    </div>
  )
}

// Main Page Content
function FitDogPageContent() {
  const searchParams = useSearchParams()
  const [config, setConfig] = useState<FitDogConfig | null>(null)
  const [products, setProducts] = useState<Products | null>(null)
  const [pricing, setPricing] = useState<Pricing | null>(null)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [faq, setFaq] = useState<FAQ[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Get initial version from URL param or default to 'enhanced'
  const urlVersion = searchParams.get('v') as 'classic' | 'enhanced' | null
  const [version, setVersion] = useState<'classic' | 'enhanced'>(urlVersion || 'enhanced')

  useEffect(() => {
    Promise.all([
      fetch('/api/demo-data?template=fitdog&file=config').then(res => res.json()),
      fetch('/api/demo-data?template=fitdog&file=products').then(res => res.json()),
      fetch('/api/demo-data?template=fitdog&file=pricing').then(res => res.json()),
      fetch('/api/demo-data?template=fitdog&file=testimonials').then(res => res.json()),
      fetch('/api/demo-data?template=fitdog&file=faq').then(res => res.json()),
    ])
      .then(([configData, productsData, pricingData, testimonialsData, faqData]) => {
        setConfig(configData)
        setProducts(productsData)
        setPricing(pricingData)
        setTestimonials(testimonialsData)
        setFaq(faqData)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Failed to load FitDog data:', err)
        setIsLoading(false)
      })
  }, [])

  // Update URL when version changes
  const handleVersionChange = (newVersion: 'classic' | 'enhanced') => {
    setVersion(newVersion)
    const url = new URL(window.location.href)
    url.searchParams.set('v', newVersion)
    window.history.replaceState({}, '', url.toString())
  }

  if (isLoading || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-14">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">로딩 중...</p>
        </div>
      </div>
    )
  }

  const isEnhanced = version === 'enhanced'

  return (
    <div className={isEnhanced ? '' : 'pt-14'}>
      {/* Version Toggle */}
      <VersionToggle
        version={version}
        onChange={handleVersionChange}
        primaryColor={config.colors.primary}
      />

      {/* S1: Hero with Registration Form */}
      {isEnhanced ? (
        <FitDogHeroEnhanced config={config} />
      ) : (
        <FitDogHero config={config} />
      )}

      {/* S2: Pain Points / Empathy */}
      {isEnhanced ? (
        <FitDogPainPointsEnhanced painPoints={config.painPoints} colors={config.colors} />
      ) : (
        <FitDogPainPoints painPoints={config.painPoints} colors={config.colors} />
      )}

      {/* S3: Solution Promise */}
      {isEnhanced ? (
        <FitDogSolutionEnhanced solution={config.solution} colors={config.colors} />
      ) : (
        <FitDogSolution solution={config.solution} colors={config.colors} />
      )}

      {/* S4: How It Works */}
      {isEnhanced ? (
        <FitDogHowItWorksEnhanced howItWorks={config.howItWorks} colors={config.colors} />
      ) : (
        <FitDogHowItWorks howItWorks={config.howItWorks} colors={config.colors} />
      )}

      {/* S5: Personalization Engine */}
      <FitDogPersonalization personalization={config.personalization} colors={config.colors} />

      {/* S6: Science & Safety */}
      <FitDogScience science={config.science} colors={config.colors} />

      {/* S7: Products (Base + Topping) */}
      {products && <FitDogProducts products={products} colors={config.colors} />}

      {/* S8: Pricing */}
      {pricing && <FitDogPricing pricing={pricing} colors={config.colors} />}

      {/* S9: Testimonials */}
      {testimonials.length > 0 && <FitDogTestimonials testimonials={testimonials} colors={config.colors} />}

      {/* S10: FAQ */}
      {faq.length > 0 && <FitDogFAQ faq={faq} colors={config.colors} />}

      {/* S11: Final CTA */}
      <FitDogFinalCTA config={config} />
    </div>
  )
}

// Wrap with Suspense for useSearchParams
export default function FitDogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-14">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">로딩 중...</p>
          </div>
        </div>
      }
    >
      <FitDogPageContent />
    </Suspense>
  )
}
