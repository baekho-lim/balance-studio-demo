'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Users,
  FileText,
  Calendar,
  Clock,
  DollarSign,
  Sparkles,
  Eye,
  CheckCircle,
  XCircle,
  RefreshCw,
  ExternalLink
} from 'lucide-react'
import templatesData from '@/data/templates.json'

interface Inquiry {
  id: string
  status: 'pending' | 'reviewing' | 'generating' | 'completed' | 'rejected'
  customer: {
    name: string
    email: string
    phone: string
    company: string
  }
  template: string
  businessInfo: {
    type: string
    location: string
    targetCustomer: string
  }
  planDocument: string
  additionalNotes: string
  budget: string
  timeline: string
  generatedSite?: {
    id: string
    url: string
    createdAt: string
  }
  createdAt: string
  updatedAt: string
}

const statusConfig = {
  pending: { label: '대기', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  reviewing: { label: '검토중', color: 'bg-blue-100 text-blue-800', icon: Eye },
  generating: { label: '생성중', color: 'bg-purple-100 text-purple-800', icon: RefreshCw },
  completed: { label: '완료', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  rejected: { label: '거절', color: 'bg-red-100 text-red-800', icon: XCircle },
}

const budgetLabels: Record<string, string> = {
  '500-1000': '50-100만원',
  '1000-2000': '100-200만원',
  '2000-5000': '200-500만원',
  '5000+': '500만원 이상',
}

const timelineLabels: Record<string, string> = {
  '1week': '1주 이내',
  '2weeks': '2주 이내',
  '1month': '1개월 이내',
  'flexible': '협의 가능',
}

const templateMap = templatesData.reduce((acc, t) => {
  acc[t.id] = { name: t.name.ko, demoUrl: t.demoUrl }
  return acc
}, {} as Record<string, { name: string; demoUrl: string }>)

export default function InquiryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [inquiry, setInquiry] = useState<Inquiry | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const id = params.id as string

  useEffect(() => {
    fetchInquiry()
  }, [id])

  const fetchInquiry = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/inquiries')
      if (!response.ok) throw new Error('Failed to fetch')
      const data: Inquiry[] = await response.json()
      const found = data.find(inq => inq.id === id)
      if (!found) throw new Error('Inquiry not found')
      setInquiry(found)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (status: Inquiry['status']) => {
    if (!inquiry) return
    try {
      setIsUpdating(true)
      const response = await fetch('/api/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: inquiry.id, status }),
      })
      if (!response.ok) throw new Error('Failed to update status')
      const updated = await response.json()
      setInquiry(updated)
    } catch (err) {
      alert('상태 업데이트 실패')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleGenerateSite = async () => {
    if (!inquiry) return
    if (!confirm('사이트를 생성하시겠습니까? 이 작업은 시간이 걸릴 수 있습니다.')) return

    try {
      setIsUpdating(true)
      // First update status to generating
      await updateStatus('generating')

      // Then call the generate API (to be implemented in 8C)
      const response = await fetch('/api/generate-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryId: inquiry.id,
          template: inquiry.template,
          businessInfo: inquiry.businessInfo,
          planDocument: inquiry.planDocument,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate site')
      }

      const result = await response.json()

      // Update inquiry with generated site info
      await fetch('/api/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: inquiry.id,
          status: 'completed',
          generatedSite: result.generatedSite,
        }),
      })

      fetchInquiry()
      alert('사이트 생성 완료!')
    } catch (err) {
      alert('사이트 생성 실패: ' + (err instanceof Error ? err.message : 'Unknown error'))
      updateStatus('reviewing')
    } finally {
      setIsUpdating(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !inquiry) {
    return (
      <div>
        <Link href="/admin/inquiries" className="inline-flex items-center gap-2 text-secondary hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" />
          목록으로
        </Link>
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error || 'Inquiry not found'}
        </div>
      </div>
    )
  }

  const StatusIcon = statusConfig[inquiry.status].icon
  const template = templateMap[inquiry.template]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/inquiries" className="p-2 text-secondary hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-serif">{inquiry.customer.company}</h1>
            <p className="text-secondary">{inquiry.customer.name}님의 문의</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full ${statusConfig[inquiry.status].color}`}>
            <StatusIcon className="w-4 h-4" />
            {statusConfig[inquiry.status].label}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Customer & Business Info */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              고객 정보
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-gray-400" />
                <span>{inquiry.customer.company}</span>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-400" />
                <span>{inquiry.customer.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href={`mailto:${inquiry.customer.email}`} className="text-primary hover:underline">
                  {inquiry.customer.email}
                </a>
              </div>
              {inquiry.customer.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a href={`tel:${inquiry.customer.phone}`} className="text-primary hover:underline">
                    {inquiry.customer.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Business Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" />
              사업 정보
            </h2>
            <div className="space-y-3">
              {inquiry.businessInfo.type && (
                <div>
                  <p className="text-sm text-gray-500">업종</p>
                  <p className="font-medium">{inquiry.businessInfo.type}</p>
                </div>
              )}
              {inquiry.businessInfo.location && (
                <div>
                  <p className="text-sm text-gray-500">위치</p>
                  <p className="font-medium flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {inquiry.businessInfo.location}
                  </p>
                </div>
              )}
              {inquiry.businessInfo.targetCustomer && (
                <div>
                  <p className="text-sm text-gray-500">타겟 고객</p>
                  <p className="font-medium flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {inquiry.businessInfo.targetCustomer}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Template & Requirements */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-lg mb-4">요청 사항</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">선택 템플릿</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{template?.name || inquiry.template}</p>
                  {template?.demoUrl && (
                    <Link
                      href={template.demoUrl}
                      target="_blank"
                      className="text-primary hover:underline inline-flex items-center gap-1 text-sm"
                    >
                      <ExternalLink className="w-3 h-3" />
                      데모
                    </Link>
                  )}
                </div>
              </div>
              {inquiry.budget && (
                <div>
                  <p className="text-sm text-gray-500">예산</p>
                  <p className="font-medium flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {budgetLabels[inquiry.budget] || inquiry.budget}
                  </p>
                </div>
              )}
              {inquiry.timeline && (
                <div>
                  <p className="text-sm text-gray-500">일정</p>
                  <p className="font-medium flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {timelineLabels[inquiry.timeline] || inquiry.timeline}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Timestamps */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              접수 정보
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">접수일</span>
                <span>{formatDate(inquiry.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">최종 수정</span>
                <span>{formatDate(inquiry.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Generated Site Info */}
          {inquiry.generatedSite && (
            <div className="bg-green-50 rounded-lg border border-green-200 p-6">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                생성된 사이트
              </h2>
              <div className="space-y-3">
                <Link
                  href={inquiry.generatedSite.url}
                  target="_blank"
                  className="block w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  미리보기 열기
                </Link>
                <p className="text-sm text-green-700 text-center">
                  생성일: {formatDate(inquiry.generatedSite.createdAt)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Plan Document */}
        <div className="lg:col-span-2 space-y-6">
          {/* Plan Document */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              기획서
            </h2>
            {inquiry.planDocument ? (
              <div className="prose prose-sm max-w-none">
                <pre className="bg-gray-50 p-6 rounded-xl overflow-x-auto whitespace-pre-wrap font-mono text-sm text-gray-700 max-h-[600px] overflow-y-auto">
                  {inquiry.planDocument}
                </pre>
              </div>
            ) : (
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">기획서가 첨부되지 않았습니다</p>
              </div>
            )}
          </div>

          {/* Additional Notes */}
          {inquiry.additionalNotes && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="font-semibold text-lg mb-4">추가 요청사항</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{inquiry.additionalNotes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-lg mb-4">액션</h2>
            <div className="flex flex-wrap gap-3">
              {inquiry.status === 'pending' && (
                <>
                  <button
                    onClick={() => updateStatus('reviewing')}
                    disabled={isUpdating}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                  >
                    <Eye className="w-4 h-4" />
                    검토 시작
                  </button>
                  <button
                    onClick={() => updateStatus('rejected')}
                    disabled={isUpdating}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" />
                    거절
                  </button>
                </>
              )}
              {inquiry.status === 'reviewing' && (
                <>
                  <button
                    onClick={handleGenerateSite}
                    disabled={isUpdating}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {isUpdating ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    사이트 생성
                  </button>
                  <button
                    onClick={() => updateStatus('rejected')}
                    disabled={isUpdating}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" />
                    거절
                  </button>
                </>
              )}
              {inquiry.status === 'generating' && (
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  사이트 생성 중...
                </div>
              )}
              {inquiry.status === 'completed' && inquiry.generatedSite && (
                <Link
                  href={inquiry.generatedSite.url}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  생성된 사이트 보기
                </Link>
              )}
              {inquiry.status === 'rejected' && (
                <button
                  onClick={() => updateStatus('pending')}
                  disabled={isUpdating}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  상태 초기화
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
