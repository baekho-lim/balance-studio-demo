'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Eye, Trash2, Calendar, Building, FileText, Clock, RefreshCw, Sparkles } from 'lucide-react'
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
  completed: { label: '완료', color: 'bg-green-100 text-green-800', icon: Sparkles },
  rejected: { label: '거절', color: 'bg-red-100 text-red-800', icon: Trash2 },
}

const templateMap = templatesData.reduce((acc, t) => {
  acc[t.id] = t.name.ko
  return acc
}, {} as Record<string, string>)

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/inquiries')
      if (!response.ok) throw new Error('Failed to fetch inquiries')
      const data = await response.json()
      setInquiries(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (id: string, status: Inquiry['status']) => {
    try {
      const response = await fetch('/api/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      if (!response.ok) throw new Error('Failed to update status')
      fetchInquiries()
    } catch (err) {
      alert('상태 업데이트 실패: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  const deleteInquiry = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    try {
      const response = await fetch(`/api/inquiries?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete')
      fetchInquiries()
    } catch (err) {
      alert('삭제 실패: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  const filteredInquiries = selectedStatus === 'all'
    ? inquiries
    : inquiries.filter(inq => inq.status === selectedStatus)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        Error: {error}
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif">고객 문의 관리</h1>
        <div className="flex items-center gap-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">전체 ({inquiries.length})</option>
            <option value="pending">대기 ({inquiries.filter(i => i.status === 'pending').length})</option>
            <option value="reviewing">검토중 ({inquiries.filter(i => i.status === 'reviewing').length})</option>
            <option value="generating">생성중 ({inquiries.filter(i => i.status === 'generating').length})</option>
            <option value="completed">완료 ({inquiries.filter(i => i.status === 'completed').length})</option>
            <option value="rejected">거절 ({inquiries.filter(i => i.status === 'rejected').length})</option>
          </select>
          <button
            onClick={fetchInquiries}
            className="p-2 text-secondary hover:text-primary transition-colors"
            title="새로고침"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {filteredInquiries.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">문의가 없습니다</h3>
          <p className="text-gray-500 mb-6">
            고객이 템플릿을 선택하고 문의를 제출하면 여기에 표시됩니다.
          </p>
          <Link
            href="/templates"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            템플릿 갤러리 보기
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-secondary">상태</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-secondary">접수일</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-secondary">고객명</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-secondary">템플릿</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-secondary">업종</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-secondary">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInquiries.map((inquiry) => {
                const StatusIcon = statusConfig[inquiry.status].icon
                return (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${statusConfig[inquiry.status].color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[inquiry.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {formatDate(inquiry.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{inquiry.customer.name}</p>
                        <p className="text-sm text-gray-500">{inquiry.customer.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">
                        {templateMap[inquiry.template] || inquiry.template}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Building className="w-4 h-4" />
                        {inquiry.businessInfo.type || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/inquiries/${inquiry.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          상세
                        </Link>
                        {inquiry.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(inquiry.id, 'reviewing')}
                              className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors"
                            >
                              검토 시작
                            </button>
                          </>
                        )}
                        {inquiry.status === 'reviewing' && (
                          <button
                            onClick={() => updateStatus(inquiry.id, 'generating')}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg transition-colors"
                          >
                            <Sparkles className="w-4 h-4" />
                            사이트 생성
                          </button>
                        )}
                        {inquiry.status === 'completed' && inquiry.generatedSite && (
                          <Link
                            href={inquiry.generatedSite.url}
                            target="_blank"
                            className="px-3 py-1.5 text-sm bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors"
                          >
                            미리보기
                          </Link>
                        )}
                        <button
                          onClick={() => deleteInquiry(inquiry.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 통계 카드 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = inquiries.filter(i => i.status === key).length
          const Icon = config.icon
          return (
            <div
              key={key}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${config.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm text-gray-500">{config.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 안내 */}
      <div className="mt-8 p-6 bg-pastel-cream/30 rounded-lg">
        <h3 className="font-semibold mb-2">문의 처리 안내</h3>
        <div className="text-sm text-secondary space-y-2">
          <p><strong>워크플로우:</strong></p>
          <ol className="list-decimal list-inside ml-2 space-y-1">
            <li><strong>대기</strong>: 새로 접수된 문의</li>
            <li><strong>검토 시작</strong>: 기획서 검토 및 고객 연락</li>
            <li><strong>사이트 생성</strong>: 템플릿 기반 자동 사이트 생성</li>
            <li><strong>완료</strong>: 미리보기 URL로 고객에게 공유</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
