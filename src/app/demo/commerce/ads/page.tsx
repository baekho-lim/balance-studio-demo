'use client'

import { useState } from 'react'
import { Plus, TrendingUp, DollarSign, MousePointer, Target, Pause, Play, ExternalLink } from 'lucide-react'
import { CommerceTable, CommerceModal, CommerceKpiCard } from '@/components/templates/commerce'
import mockData from '@/data/demo/commerce-mock-data.json'

type Campaign = typeof mockData.adCampaigns[0]

const platformLogos: Record<string, { name: string; color: string; bgColor: string }> = {
  meta: { name: 'Meta', color: '#1877F2', bgColor: '#E7F3FF' },
  google: { name: 'Google', color: '#4285F4', bgColor: '#E8F0FE' },
  tiktok: { name: 'TikTok', color: '#000000', bgColor: '#F0F0F0' },
  naver: { name: 'Naver', color: '#03C75A', bgColor: '#E6F9EE' },
}

export default function AdsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)

  const { adCampaigns } = mockData

  const totalSpent = adCampaigns.reduce((sum, c) => sum + c.spent, 0)
  const totalConversions = adCampaigns.reduce((sum, c) => sum + c.conversions, 0)
  const avgRoas = adCampaigns.reduce((sum, c) => sum + c.roas, 0) / adCampaigns.length
  const totalClicks = adCampaigns.reduce((sum, c) => sum + c.clicks, 0)

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(1)}천만원`
    }
    if (value >= 10000) {
      return `${Math.round(value / 10000)}만원`
    }
    return `${value.toLocaleString()}원`
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
      active: { bg: 'bg-green-100', text: 'text-green-700', icon: <Play className="w-3 h-3" /> },
      paused: { bg: 'bg-amber-100', text: 'text-amber-700', icon: <Pause className="w-3 h-3" /> },
      ended: { bg: 'bg-gray-100', text: 'text-gray-700', icon: null },
    }
    const style = styles[status] || styles.ended
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
        {style.icon}
        {status === 'active' ? '진행중' : status === 'paused' ? '일시정지' : '종료'}
      </span>
    )
  }

  const columns = [
    {
      key: 'name',
      label: '캠페인',
      render: (item: Campaign) => {
        const platform = platformLogos[item.platform]
        return (
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: platform.bgColor, color: platform.color }}
            >
              {platform.name[0]}
            </div>
            <div>
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-500">{platform.name}</p>
            </div>
          </div>
        )
      },
    },
    {
      key: 'status',
      label: '상태',
      render: (item: Campaign) => getStatusBadge(item.status),
    },
    {
      key: 'spent',
      label: '지출',
      sortable: true,
      render: (item: Campaign) => (
        <div>
          <p className="font-medium">{formatCurrency(item.spent)}</p>
          <p className="text-xs text-gray-500">
            / {formatCurrency(item.budget)}
          </p>
        </div>
      ),
    },
    {
      key: 'roas',
      label: 'ROAS',
      sortable: true,
      render: (item: Campaign) => (
        <span className={item.roas >= 3 ? 'text-green-600 font-semibold' : item.roas >= 2 ? 'text-amber-600' : 'text-red-600'}>
          {item.roas.toFixed(1)}x
        </span>
      ),
    },
    {
      key: 'conversions',
      label: '전환',
      sortable: true,
      render: (item: Campaign) => `${item.conversions.toLocaleString()}건`,
    },
    {
      key: 'cpa',
      label: 'CPA',
      sortable: true,
      render: (item: Campaign) => formatCurrency(item.cpa),
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">광고 관리</h1>
          <p className="text-gray-600">모든 광고 플랫폼의 캠페인을 통합 관리하세요</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          새 캠페인
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CommerceKpiCard
          title="총 광고비"
          value={totalSpent}
          prefix="₩"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <CommerceKpiCard
          title="총 전환"
          value={totalConversions}
          suffix="건"
          icon={<Target className="w-5 h-5" />}
        />
        <CommerceKpiCard
          title="평균 ROAS"
          value={avgRoas.toFixed(1)}
          suffix="x"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <CommerceKpiCard
          title="총 클릭"
          value={totalClicks}
          suffix="회"
          icon={<MousePointer className="w-5 h-5" />}
        />
      </div>

      {/* Connected Platforms */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">연결된 플랫폼</h2>
        <div className="flex gap-4">
          {Object.entries(platformLogos).map(([key, platform]) => {
            const hasActiveCampaigns = adCampaigns.some(c => c.platform === key)
            return (
              <div
                key={key}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                  hasActiveCampaigns
                    ? 'bg-white border-gray-200'
                    : 'bg-gray-50 border-dashed border-gray-300'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: platform.bgColor, color: platform.color }}
                >
                  {platform.name[0]}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{platform.name}</p>
                  <p className="text-xs text-gray-500">
                    {hasActiveCampaigns ? '연결됨' : '미연결'}
                  </p>
                </div>
                {hasActiveCampaigns && (
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-2" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Campaigns Table */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">캠페인 목록</h2>
        <CommerceTable
          columns={columns}
          data={adCampaigns}
          onRowClick={(campaign) => setSelectedCampaign(campaign)}
        />
      </div>

      {/* Budget Allocation */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">플랫폼별 예산 배분</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="space-y-4">
            {Object.entries(platformLogos).map(([key, platform]) => {
              const platformCampaigns = adCampaigns.filter(c => c.platform === key)
              const totalBudget = platformCampaigns.reduce((sum, c) => sum + c.budget, 0)
              const totalAllBudget = adCampaigns.reduce((sum, c) => sum + c.budget, 0)
              const percentage = totalAllBudget > 0 ? (totalBudget / totalAllBudget) * 100 : 0

              return (
                <div key={key} className="flex items-center gap-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: platform.bgColor, color: platform.color }}
                  >
                    {platform.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{platform.name}</span>
                      <span className="text-sm text-gray-500">{formatCurrency(totalBudget)}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: platform.color,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Create Campaign Modal */}
      <CommerceModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        type="approval"
        title="새 캠페인 생성"
        message="새 광고 캠페인을 생성합니다. 프로덕션 환경에서는 광고 플랫폼 계정 연동 및 예산 승인이 필요합니다."
      />
    </div>
  )
}
