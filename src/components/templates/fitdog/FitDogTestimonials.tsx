'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

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

interface Props {
  testimonials: Testimonial[]
  colors: { primary: string; accent: string }
}

export default function FitDogTestimonials({ testimonials, colors }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const sortedTestimonials = testimonials.sort((a, b) => a.displayOrder - b.displayOrder)

  const goTo = (index: number) => {
    if (index < 0) {
      setCurrentIndex(sortedTestimonials.length - 1)
    } else if (index >= sortedTestimonials.length) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(index)
    }
  }

  const current = sortedTestimonials[currentIndex]

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium mb-2" style={{ color: colors.primary }}>
            베타 테스터 후기
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            보호자님들의 이야기
          </h2>
          <p className="text-gray-500">
            * 베타 테스트 시나리오 기반 예시입니다
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
            {/* Quote Icon */}
            <Quote className="w-10 h-10 mb-6" style={{ color: `${colors.primary}30` }} />

            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
              &ldquo;{current.quote.ko}&rdquo;
            </p>

            {/* Problem & Result */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-red-50">
                <p className="text-xs font-medium text-red-500 mb-1">🔴 문제</p>
                <p className="text-sm text-red-700">{current.problem.ko}</p>
              </div>
              <div className="p-4 rounded-xl bg-green-50">
                <p className="text-xs font-medium text-green-500 mb-1">🟢 결과</p>
                <p className="text-sm text-green-700">{current.result.ko}</p>
              </div>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
              >
                🐕
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {current.dogName} ({current.dogBreed.ko}, {current.dogAge})
                </p>
                <p className="text-sm text-gray-500">보호자 {current.ownerName}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => goTo(currentIndex - 1)}
              className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {sortedTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'bg-teal-500 w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(currentIndex + 1)}
              className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Beta CTA */}
        <div className="mt-12 text-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl"
            style={{ backgroundColor: `${colors.accent}10` }}
          >
            <span className="text-2xl">🔥</span>
            <div className="text-left">
              <p className="font-semibold" style={{ color: colors.accent }}>
                베타 테스터 모집 중
              </p>
              <p className="text-sm text-gray-600">
                선착순 50명 - 토핑 1종 3개월 무료
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
