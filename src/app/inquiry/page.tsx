'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Send, FileText, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react'
import { SectionHeader, Button, Card, Badge } from '@agency/ui'
import templatesData from '@/data/templates.json'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  template: string
  businessType: string
  location: string
  targetCustomer: string
  planDocument: string
  additionalNotes: string
  budget: string
  timeline: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  template: '',
  businessType: '',
  location: '',
  targetCustomer: '',
  planDocument: '',
  additionalNotes: '',
  budget: '',
  timeline: '',
}

const budgetOptions = [
  { value: '', label: '선택해주세요' },
  { value: 'under-100', label: '100만원 미만' },
  { value: '100-300', label: '100-300만원' },
  { value: '300-500', label: '300-500만원' },
  { value: '500-1000', label: '500-1000만원' },
  { value: 'over-1000', label: '1000만원 이상' },
  { value: 'discuss', label: '협의 필요' },
]

const timelineOptions = [
  { value: '', label: '선택해주세요' },
  { value: 'urgent', label: '1주일 이내 (긴급)' },
  { value: '2weeks', label: '2주 이내' },
  { value: '1month', label: '1개월 이내' },
  { value: '2months', label: '2개월 이내' },
  { value: 'flexible', label: '여유 있음' },
]

export default function InquiryPage() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const templateId = searchParams.get('template')
    if (templateId) {
      setFormData(prev => ({ ...prev, template: templateId }))
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('문의 제출에 실패했습니다.')
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedTemplate = templatesData.find(t => t.id === formData.template)

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            문의가 접수되었습니다!
          </h1>
          <p className="text-gray-500 mb-8">
            빠른 시일 내에 담당자가 연락드리겠습니다.<br />
            보통 1-2 영업일 이내 회신드립니다.
          </p>
          <div className="flex flex-col gap-3">
            <Button href="/templates" variant="primary">
              다른 템플릿 둘러보기
            </Button>
            <Button href="/" variant="outline">
              홈으로 돌아가기
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 text-indigo-200 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            템플릿 목록으로
          </Link>
          <h1 className="text-3xl font-bold mb-2">홈페이지 제작 문의</h1>
          <p className="text-indigo-100">
            기획서를 첨부해주시면 더 정확한 견적과 빠른 초안을 받아보실 수 있습니다
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Template Selection */}
            <Card>
              <h2 className="text-lg font-bold text-gray-900 mb-4">1. 템플릿 선택</h2>
              <select
                name="template"
                value={formData.template}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">템플릿을 선택해주세요</option>
                {templatesData.filter(t => t.status === 'available').map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name.ko}
                  </option>
                ))}
                <option value="custom">맞춤 제작 (템플릿 없음)</option>
              </select>
              {selectedTemplate && (
                <div className="mt-4 p-4 bg-indigo-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="primary">{selectedTemplate.name.ko}</Badge>
                    <Link
                      href={selectedTemplate.demoUrl}
                      className="text-sm text-indigo-600 hover:underline"
                      target="_blank"
                    >
                      데모 보기 →
                    </Link>
                  </div>
                  <p className="text-sm text-gray-600">{selectedTemplate.shortDescription.ko}</p>
                </div>
              )}
            </Card>

            {/* Contact Info */}
            <Card>
              <h2 className="text-lg font-bold text-gray-900 mb-4">2. 연락처 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    전화번호
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="010-1234-5678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    회사/사업자명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="밸런스 필라테스"
                  />
                </div>
              </div>
            </Card>

            {/* Business Info */}
            <Card>
              <h2 className="text-lg font-bold text-gray-900 mb-4">3. 사업 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    업종
                  </label>
                  <input
                    type="text"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="필라테스 스튜디오"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    위치
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="서울시 강남구"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    타겟 고객
                  </label>
                  <input
                    type="text"
                    name="targetCustomer"
                    value={formData.targetCustomer}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="25-45세 여성, 직장인, 건강 관심 고객"
                  />
                </div>
              </div>
            </Card>

            {/* Plan Document */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">4. 기획서 (선택)</h2>
                <Link
                  href="/templates/guide"
                  className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
                >
                  <FileText className="w-4 h-4" />
                  기획 가이드 보기
                </Link>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                ChatGPT로 작성한 기획서를 붙여넣어주세요. 기획서가 있으면 더 정확한 견적을 받으실 수 있습니다.
              </p>
              <textarea
                name="planDocument"
                value={formData.planDocument}
                onChange={handleChange}
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                placeholder={`# 사업명 홈페이지 기획서

## 1. 사업 개요
...

## 2. 메인 페이지 구성
...

(마크다운 형식으로 붙여넣어주세요)`}
              />
            </Card>

            {/* Additional Options */}
            <Card>
              <h2 className="text-lg font-bold text-gray-900 mb-4">5. 추가 정보 (선택)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    예산 범위
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {budgetOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    희망 일정
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {timelineOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  추가 요청사항
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="기타 요청사항이나 궁금한 점을 자유롭게 작성해주세요"
                />
              </div>
            </Card>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="flex justify-end gap-4">
              <Button href="/templates" variant="outline">
                취소
              </Button>
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    제출 중...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    문의 제출하기
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
