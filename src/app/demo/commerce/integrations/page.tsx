'use client'

import { useState } from 'react'
import { Check, Clock, X, ExternalLink, RefreshCw, Settings } from 'lucide-react'
import { CommerceModal } from '@/components/templates/commerce'
import mockData from '@/data/demo/commerce-mock-data.json'

type Integration = typeof mockData.integrations[0]

const categoryLabels: Record<string, { name: string; description: string }> = {
  ecommerce: { name: '이커머스 플랫폼', description: '판매 데이터 및 고객 정보 동기화' },
  marketing: { name: '마케팅 플랫폼', description: '광고 캠페인 및 성과 데이터 연동' },
  crm: { name: 'CRM', description: '고객 관계 관리 도구 연동' },
  payment: { name: '결제', description: '결제 및 매출 데이터 동기화' },
}

const platformDetails: Record<string, { logo: string; color: string; bgColor: string }> = {
  shopify: { logo: 'S', color: '#96BF48', bgColor: '#F4FBE8' },
  cafe24: { logo: 'C24', color: '#FF6B00', bgColor: '#FFF4EC' },
  meta: { logo: 'M', color: '#1877F2', bgColor: '#E7F3FF' },
  google: { logo: 'G', color: '#4285F4', bgColor: '#E8F0FE' },
  tiktok: { logo: 'T', color: '#000000', bgColor: '#F0F0F0' },
  naver: { logo: 'N', color: '#03C75A', bgColor: '#E6F9EE' },
  kakao: { logo: 'K', color: '#FEE500', bgColor: '#FFFCE6' },
  hubspot: { logo: 'H', color: '#FF7A59', bgColor: '#FFF2EF' },
  stripe: { logo: 'S', color: '#635BFF', bgColor: '#F0EFFF' },
  toss: { logo: 'T', color: '#0064FF', bgColor: '#E6F0FF' },
}

export default function IntegrationsPage() {
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  const { integrations } = mockData

  const groupedIntegrations = integrations.reduce((acc, integration) => {
    if (!acc[integration.category]) {
      acc[integration.category] = []
    }
    acc[integration.category].push(integration)
    return acc
  }, {} as Record<string, Integration[]>)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <Check className="w-3 h-3" />
            연결됨
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            <Clock className="w-3 h-3" />
            대기중
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            <X className="w-3 h-3" />
            미연결
          </span>
        )
    }
  }

  const formatLastSync = (lastSync: string | null) => {
    if (!lastSync) return '동기화 안됨'
    const date = new Date(lastSync)
    return `${date.toLocaleDateString('ko-KR')} ${date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}`
  }

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration)
    setShowConnectModal(true)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">연동 관리</h1>
        <p className="text-gray-600">외부 플랫폼을 연결하여 데이터를 통합하세요</p>
      </div>

      {/* Integration Categories */}
      <div className="space-y-8">
        {Object.entries(groupedIntegrations).map(([category, items]) => (
          <div key={category}>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {categoryLabels[category]?.name || category}
              </h2>
              <p className="text-sm text-gray-500">
                {categoryLabels[category]?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((integration) => {
                const details = platformDetails[integration.id] || { logo: integration.name[0], color: '#6B7280', bgColor: '#F3F4F6' }

                return (
                  <div
                    key={integration.id}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold"
                          style={{ backgroundColor: details.bgColor, color: details.color }}
                        >
                          {details.logo}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                          {getStatusBadge(integration.status)}
                        </div>
                      </div>
                      {integration.status === 'connected' && (
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Settings className="w-4 h-4 text-gray-400" />
                        </button>
                      )}
                    </div>

                    {integration.status === 'connected' && (
                      <div className="mb-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">마지막 동기화</span>
                          <span className="text-gray-900">{formatLastSync(integration.lastSync)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">동기화된 데이터</span>
                          <span className="text-gray-900">{integration.dataCount.toLocaleString()}건</span>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {integration.status === 'connected' ? (
                        <>
                          <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            <RefreshCw className="w-4 h-4" />
                            동기화
                          </button>
                          <button className="flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </>
                      ) : integration.status === 'pending' ? (
                        <button
                          className="flex-1 px-3 py-2 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium"
                          disabled
                        >
                          연결 대기중...
                        </button>
                      ) : (
                        <button
                          onClick={() => handleConnect(integration)}
                          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          연결하기
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Connection Stats */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h3 className="font-semibold mb-4">연동 현황</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-blue-100 text-sm mb-1">연결됨</p>
            <p className="text-3xl font-bold">
              {integrations.filter(i => i.status === 'connected').length}
            </p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">대기중</p>
            <p className="text-3xl font-bold">
              {integrations.filter(i => i.status === 'pending').length}
            </p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">미연결</p>
            <p className="text-3xl font-bold">
              {integrations.filter(i => i.status === 'not_connected').length}
            </p>
          </div>
        </div>
      </div>

      {/* Connect Modal */}
      <CommerceModal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        type="approval"
        title={`${selectedIntegration?.name} 연결`}
        message={`${selectedIntegration?.name}에 연결합니다. 프로덕션 환경에서는 OAuth 인증 또는 API 키가 필요합니다.`}
      />
    </div>
  )
}
