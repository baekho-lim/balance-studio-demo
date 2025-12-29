'use client'

import { useState } from 'react'
import {
  Check,
  Clock,
  X,
  ExternalLink,
  RefreshCw,
  Settings,
  AlertTriangle,
  AlertCircle,
  ShoppingBag,
  Megaphone,
  Eye
} from 'lucide-react'

type IntegrationStatus = 'connected' | 'disconnected' | 'needs_reauth'

interface Integration {
  id: string
  name: string
  category: 'ecommerce' | 'ads'
  status: IntegrationStatus
  lastSync: string | null
  dataCount: number
  scopes: string[]
}

const initialIntegrations: Integration[] = [
  // E-commerce
  {
    id: 'smartstore',
    name: '스마트스토어',
    category: 'ecommerce',
    status: 'connected',
    lastSync: '2024-12-29T10:30:00',
    dataCount: 1523,
    scopes: ['orders', 'products', 'reviews']
  },
  {
    id: 'cafe24',
    name: 'Cafe24',
    category: 'ecommerce',
    status: 'connected',
    lastSync: '2024-12-29T09:15:00',
    dataCount: 892,
    scopes: ['orders', 'products', 'reviews']
  },
  {
    id: 'shopify',
    name: 'Shopify',
    category: 'ecommerce',
    status: 'disconnected',
    lastSync: null,
    dataCount: 0,
    scopes: ['orders', 'products', 'reviews']
  },
  {
    id: 'coupang',
    name: '쿠팡 마켓플레이스',
    category: 'ecommerce',
    status: 'needs_reauth',
    lastSync: '2024-12-20T14:00:00',
    dataCount: 456,
    scopes: ['orders', 'products', 'reviews']
  },
  // Ads
  {
    id: 'meta',
    name: 'Meta Ads',
    category: 'ads',
    status: 'connected',
    lastSync: '2024-12-29T11:00:00',
    dataCount: 24,
    scopes: ['campaigns', 'ad_sets', 'ads', 'insights']
  },
  {
    id: 'google',
    name: 'Google Ads',
    category: 'ads',
    status: 'connected',
    lastSync: '2024-12-29T10:45:00',
    dataCount: 18,
    scopes: ['campaigns', 'ad_groups', 'ads', 'reports']
  },
]

const platformDetails: Record<string, { logo: string; color: string; bgColor: string }> = {
  smartstore: { logo: 'N', color: '#03C75A', bgColor: '#E6F9EE' },
  cafe24: { logo: 'C', color: '#FF6B00', bgColor: '#FFF4EC' },
  shopify: { logo: 'S', color: '#96BF48', bgColor: '#F4FBE8' },
  coupang: { logo: 'C', color: '#E31836', bgColor: '#FFEBEE' },
  meta: { logo: 'M', color: '#1877F2', bgColor: '#E7F3FF' },
  google: { logo: 'G', color: '#4285F4', bgColor: '#E8F0FE' },
}

const scopeLabels: Record<string, string> = {
  orders: '주문 데이터',
  products: '상품 데이터',
  reviews: '리뷰 데이터',
  campaigns: '캠페인',
  ad_sets: '광고 세트',
  ad_groups: '광고 그룹',
  ads: '광고',
  insights: '인사이트',
  reports: '리포트',
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'info'>('info')

  const ecommerceIntegrations = integrations.filter(i => i.category === 'ecommerce')
  const adsIntegrations = integrations.filter(i => i.category === 'ads')

  const getStatusBadge = (status: IntegrationStatus) => {
    switch (status) {
      case 'connected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <Check className="w-3 h-3" />
            연결됨
          </span>
        )
      case 'needs_reauth':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            <AlertCircle className="w-3 h-3" />
            재인증 필요
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

  // Handle Connect/Disconnect toggle
  const handleToggleConnection = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => {
      if (integration.id === integrationId) {
        const newStatus: IntegrationStatus =
          integration.status === 'connected' ? 'disconnected' :
          integration.status === 'disconnected' ? 'connected' :
          'connected' // needs_reauth -> connected

        const isConnecting = newStatus === 'connected'

        // Show toast
        setToastMessage(
          isConnecting
            ? `${integration.name} 연결됨`
            : `${integration.name} 연결 해제됨`
        )
        setToastType(isConnecting ? 'success' : 'info')
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)

        return {
          ...integration,
          status: newStatus,
          lastSync: isConnecting ? new Date().toISOString() : integration.lastSync,
          dataCount: isConnecting && integration.dataCount === 0 ? Math.floor(Math.random() * 500) + 100 : integration.dataCount
        }
      }
      return integration
    }))
  }

  const renderIntegrationCard = (integration: Integration) => {
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

        {/* READ Scopes */}
        <div className="mb-4">
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
            <Eye className="w-3 h-3" />
            <span>READ 권한 (v1)</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {integration.scopes.map(scope => (
              <span
                key={scope}
                className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
              >
                {scopeLabels[scope] || scope}
              </span>
            ))}
          </div>
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

        {integration.status === 'needs_reauth' && (
          <div className="mb-4 p-2 bg-amber-50 rounded-lg">
            <p className="text-xs text-amber-700">
              토큰이 만료되었습니다. 재연결이 필요합니다.
            </p>
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
              <button
                onClick={() => handleToggleConnection(integration.id)}
                className="px-3 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
              >
                연결 해제
              </button>
            </>
          ) : integration.status === 'needs_reauth' ? (
            <button
              onClick={() => handleToggleConnection(integration.id)}
              className="flex-1 px-3 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
            >
              재연결
            </button>
          ) : (
            <button
              onClick={() => handleToggleConnection(integration.id)}
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              연결하기
            </button>
          )}
        </div>
      </div>
    )
  }

  const connectedCount = integrations.filter(i => i.status === 'connected').length
  const needsReauthCount = integrations.filter(i => i.status === 'needs_reauth').length
  const disconnectedCount = integrations.filter(i => i.status === 'disconnected').length

  return (
    <div className="p-8">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
          <div className={`${toastType === 'success' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4 shadow-lg flex items-center gap-3`}>
            {toastType === 'success' ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Clock className="w-5 h-5 text-blue-600" />
            )}
            <p className={`font-medium ${toastType === 'success' ? 'text-green-800' : 'text-blue-800'}`}>
              {toastMessage}
            </p>
            <button
              onClick={() => setShowToast(false)}
              className={toastType === 'success' ? 'text-green-400 hover:text-green-600' : 'text-blue-400 hover:text-blue-600'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Prototype Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          <strong>⚠️ Prototype:</strong> 이 페이지는 프로토타입입니다.
          실제 OAuth 연동 및 데이터 동기화 기능은 구현되어 있지 않습니다. 버튼 클릭 시 로컬 상태만 변경됩니다.
        </p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">연동 관리</h1>
        <p className="text-gray-600">외부 플랫폼을 연결하여 데이터를 통합하세요</p>
      </div>

      {/* Connection Stats */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h3 className="font-semibold mb-4">연동 현황</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-blue-100 text-sm mb-1">연결됨</p>
            <p className="text-3xl font-bold">{connectedCount}</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">재인증 필요</p>
            <p className="text-3xl font-bold">{needsReauthCount}</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">미연결</p>
            <p className="text-3xl font-bold">{disconnectedCount}</p>
          </div>
        </div>
      </div>

      {/* E-commerce Integrations */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">이커머스 플랫폼</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">판매 데이터 및 고객 정보 동기화</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ecommerceIntegrations.map(renderIntegrationCard)}
        </div>
      </div>

      {/* Ads Integrations */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">광고 플랫폼</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">광고 캠페인 및 성과 데이터 연동</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {adsIntegrations.map(renderIntegrationCard)}
        </div>
      </div>

      {/* v1 Scope Info */}
      <div className="p-4 bg-blue-50 rounded-xl">
        <h4 className="font-medium text-blue-900 mb-2">v1 READ 권한 정보</h4>
        <p className="text-sm text-blue-700 mb-3">
          현재 버전에서는 읽기 전용(READ) 권한만 지원합니다. 쓰기(WRITE) 권한은 향후 버전에서 추가될 예정입니다.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/50 rounded-lg p-3">
            <p className="text-xs text-blue-600 font-medium mb-1">이커머스</p>
            <ul className="text-xs text-blue-800 space-y-0.5">
              <li>• 주문 데이터</li>
              <li>• 상품 데이터</li>
              <li>• 리뷰 데이터</li>
            </ul>
          </div>
          <div className="bg-white/50 rounded-lg p-3">
            <p className="text-xs text-blue-600 font-medium mb-1">광고</p>
            <ul className="text-xs text-blue-800 space-y-0.5">
              <li>• 캠페인</li>
              <li>• 광고 세트/그룹</li>
              <li>• 인사이트/리포트</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
