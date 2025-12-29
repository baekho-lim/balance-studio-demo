'use client'

import { BookOpen, Quote, AlertCircle } from 'lucide-react'

interface Props {
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
  colors: { primary: string; accent: string }
}

export default function FitDogScience({ science, colors }: Props) {
  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium mb-2" style={{ color: colors.primary }}>
            과학적 근거
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {science.headline.ko}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* References */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className="font-semibold text-gray-900">참고 자료</h3>
            </div>
            <div className="space-y-4">
              {science.references.map((ref) => (
                <div key={ref.id} className="border-l-2 pl-4" style={{ borderColor: colors.primary }}>
                  <p className="text-sm text-gray-700">{ref.title.ko}</p>
                  <p className="text-xs text-gray-400 mt-1">{ref.source}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vet Quote */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <Quote className="w-8 h-8 flex-shrink-0" style={{ color: colors.primary }} />
              <div>
                <p className="text-gray-700 italic leading-relaxed mb-4">
                  &ldquo;{science.vetQuote.text.ko}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: colors.primary }}
                  >
                    V
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{science.vetQuote.author}</p>
                    <p className="text-xs text-gray-500">{science.vetQuote.credentials.ko}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 flex items-start gap-3 p-4 bg-yellow-50 rounded-xl">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800">중요 안내</p>
            <p className="text-sm text-yellow-700 mt-1">
              {science.disclaimer.ko}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
