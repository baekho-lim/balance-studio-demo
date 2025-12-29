'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FAQ {
  id: string
  question: { en: string; ko: string }
  answer: { en: string; ko: string }
  category: string
  displayOrder: number
}

interface Props {
  faq: FAQ[]
  colors: { primary: string; accent: string }
}

export default function FitDogFAQ({ faq, colors }: Props) {
  const [openId, setOpenId] = useState<string | null>(null)

  const sortedFaq = faq.sort((a, b) => a.displayOrder - b.displayOrder)

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faq" className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5" style={{ color: colors.primary }} />
            <p className="text-sm font-medium" style={{ color: colors.primary }}>
              자주 묻는 질문
            </p>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            궁금하신 점이 있으신가요?
          </h2>
        </div>

        <div className="space-y-3">
          {sortedFaq.map((item) => {
            const isOpen = openId === item.id
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-gray-900 pr-4">
                    {item.question.ko}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.answer.ko}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm mb-4">
            더 궁금한 점이 있으신가요?
          </p>
          <a
            href="mailto:hello@fitdog.kr"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: colors.primary }}
          >
            이메일로 문의하기
          </a>
        </div>
      </div>
    </section>
  )
}
