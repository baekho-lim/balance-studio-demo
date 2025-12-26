'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import faqData from '@/data/faq.json'

interface FAQItem {
  id: string
  question: {
    ko: string
    en: string
    vi?: string
  }
  answer: {
    ko: string
    en: string
    vi?: string
  }
  order: number
  exhibitionLink?: string
}

const faqs = faqData as FAQItem[]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [language, setLanguage] = useState<'ko' | 'en'>('ko')

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order)

  return (
    <div className="pt-24 pb-16">
      <div className="container-wide max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-4">
          FAQ
        </h1>
        <p className="text-secondary text-center mb-8">
          자주 묻는 질문 · Frequently Asked Questions
        </p>

        {/* Language Toggle */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setLanguage('ko')}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              language === 'ko'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-secondary hover:bg-gray-200'
            }`}
          >
            한국어
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              language === 'en'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-secondary hover:bg-gray-200'
            }`}
          >
            English
          </button>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {sortedFaqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-primary/10 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-primary pr-4">
                  {faq.question[language]}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-secondary flex-shrink-0 transition-transform ${
                    openItems.includes(faq.id) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openItems.includes(faq.id) && (
                <div className="px-6 py-5 bg-pastel-cream/30 border-t border-primary/10">
                  <p className="text-primary/80 leading-relaxed whitespace-pre-line">
                    {faq.answer[language]}
                  </p>
                  {faq.exhibitionLink && (
                    <a
                      href={faq.exhibitionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-sm text-pastel-sage hover:text-primary transition-colors underline underline-offset-4"
                    >
                      {language === 'ko' ? '전시 상세정보 보기' : 'View Exhibition Details'} →
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center p-8 bg-pastel-lavender/20 rounded-lg">
          <h2 className="font-serif text-2xl mb-4">
            {language === 'ko' ? '더 궁금한 점이 있으신가요?' : 'Have more questions?'}
          </h2>
          <p className="text-secondary mb-6">
            {language === 'ko'
              ? '파트너십 페이지에서 직접 문의해 주세요.'
              : 'Contact us directly through our Partnership page.'}
          </p>
          <Link
            href="/partnership"
            className="inline-block px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
          >
            {language === 'ko' ? '문의하기' : 'Contact Us'}
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block text-sm tracking-widest uppercase hover:text-pastel-sage transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
