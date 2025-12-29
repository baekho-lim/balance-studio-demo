'use client'

import { useState } from 'react'
import { Target, Plus, Users, Mail, ChevronRight, Sparkles } from 'lucide-react'
import { CommerceModal } from '@/components/templates/commerce'
import mockData from '@/data/demo/commerce-mock-data.json'

export default function CRMPage() {
  const [showCampaignModal, setShowCampaignModal] = useState(false)
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)

  const { segments } = mockData

  const campaignTemplates = [
    {
      id: 'welcome',
      name: '웰컴 시리즈',
      description: '신규 고객 환영 이메일 자동화',
      icon: <Sparkles className="w-5 h-5" />,
      targetSegment: 'new',
    },
    {
      id: 'winback',
      name: '재방문 유도',
      description: '휴면 고객 재활성화 캠페인',
      icon: <Users className="w-5 h-5" />,
      targetSegment: 'dormant',
    },
    {
      id: 'vip',
      name: 'VIP 감사',
      description: 'VIP 고객 전용 혜택 안내',
      icon: <Target className="w-5 h-5" />,
      targetSegment: 'vip',
    },
  ]

  const segmentRules = [
    { field: '총 구매액', operator: '이상', value: '100만원' },
    { field: '마지막 주문', operator: '이내', value: '30일' },
    { field: '주문 횟수', operator: '이상', value: '3회' },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">CRM</h1>
          <p className="text-gray-600">고객 세그먼트를 관리하고 캠페인을 실행하세요</p>
        </div>
        <button
          onClick={() => setShowCampaignModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          새 캠페인
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Segments */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">고객 세그먼트</h2>
          <div className="grid grid-cols-2 gap-4">
            {segments.map((segment) => (
              <button
                key={segment.id}
                onClick={() => setSelectedSegment(segment.id)}
                className={`p-5 bg-white rounded-xl border-2 text-left transition-all hover:shadow-md ${
                  selectedSegment === segment.id
                    ? 'border-blue-500 ring-2 ring-blue-100'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${segment.color}20` }}
                  >
                    <Users className="w-5 h-5" style={{ color: segment.color }} />
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{segment.name.ko}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {segment.count.toLocaleString()}
                  <span className="text-sm font-normal text-gray-500 ml-1">명</span>
                </p>
                <p className="text-xs text-gray-500">
                  조건: {segment.criteria}
                </p>
              </button>
            ))}
          </div>

          {/* Segment Builder Preview */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">세그먼트 빌더</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="space-y-4">
                {segmentRules.map((rule, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {index > 0 && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        AND
                      </span>
                    )}
                    <div className="flex-1 flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white">
                        <option>{rule.field}</option>
                      </select>
                      <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white">
                        <option>{rule.operator}</option>
                      </select>
                      <input
                        type="text"
                        defaultValue={rule.value}
                        className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm flex-1"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1">
                  <Plus className="w-4 h-4" />
                  조건 추가
                </button>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">
                    예상 고객: <strong className="text-gray-900">2,847명</strong>
                  </span>
                  <button
                    onClick={() => setShowCampaignModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                  >
                    세그먼트 저장
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Templates */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">캠페인 템플릿</h2>
          <div className="space-y-4">
            {campaignTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => setShowCampaignModal(true)}
                className="w-full p-4 bg-white rounded-xl border border-gray-200 text-left hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    {template.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-500">{template.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-colors" />
                </div>
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5" />
              <h3 className="font-semibold">이번 달 캠페인 성과</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-100">발송</span>
                <span className="font-semibold">12,453건</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">오픈율</span>
                <span className="font-semibold">24.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">클릭율</span>
                <span className="font-semibold">8.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">전환</span>
                <span className="font-semibold">342건</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Modal */}
      <CommerceModal
        isOpen={showCampaignModal}
        onClose={() => setShowCampaignModal(false)}
        type="approval"
        title="캠페인 생성"
        message="새 마케팅 캠페인을 생성합니다. 프로덕션 환경에서는 발송 전 승인이 필요합니다."
      />
    </div>
  )
}
