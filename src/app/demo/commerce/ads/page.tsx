'use client'

import { useState, useEffect } from 'react'
import {
  Plus,
  TrendingUp,
  DollarSign,
  MousePointer,
  Target,
  Pause,
  Play,
  ExternalLink,
  AlertTriangle,
  Clock,
  X,
  CheckCircle2,
  Sliders
} from 'lucide-react'
import { CommerceTable, CommerceKpiCard } from '@/components/templates/commerce'
import mockData from '@/data/demo/commerce-mock-data.json'

type Campaign = typeof mockData.adCampaigns[0]

interface BudgetAdjustment {
  id: string
  campaignId: string
  campaignName: string
  platform: string
  currentBudget: number
  newBudget: number
  projectedRevenue: number
  projectedRoas: number
  timestamp: Date
}

const platformLogos: Record<string, { name: string; color: string; bgColor: string }> = {
  meta: { name: 'Meta', color: '#1877F2', bgColor: '#E7F3FF' },
  google: { name: 'Google', color: '#4285F4', bgColor: '#E8F0FE' },
  tiktok: { name: 'TikTok', color: '#000000', bgColor: '#F0F0F0' },
  naver: { name: 'Naver', color: '#03C75A', bgColor: '#E6F9EE' },
}

export default function AdsPage() {
  const [campaigns, setCampaigns] = useState<(Campaign & { adjustedBudget?: number })[]>([])
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [showBudgetSlider, setShowBudgetSlider] = useState(false)
  const [budgetValue, setBudgetValue] = useState(0)
  const [approvalList, setApprovalList] = useState<BudgetAdjustment[]>([])
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    setCampaigns(mockData.adCampaigns)
  }, [])

  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0)
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0)
  const avgRoas = campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length : 0
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0)

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(1)}천만원`
    }
    if (value >= 10000) {
      return `${Math.round(value / 10000)}만원`
    }
    return `${value.toLocaleString()}원`
  }

  // Calculate projected revenue/ROAS based on budget change
  const calculateProjections = (campaign: Campaign, newBudget: number) => {
    const budgetRatio = newBudget / campaign.budget
    // Simple linear projection with diminishing returns
    const diminishingFactor = budgetRatio > 1 ? Math.sqrt(budgetRatio) : budgetRatio
    const projectedRevenue = campaign.spent * campaign.roas * diminishingFactor
    const projectedRoas = projectedRevenue / newBudget
    return { projectedRevenue, projectedRoas }
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

  // Handle opening budget slider
  const handleOpenBudgetSlider = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
    setBudgetValue(campaign.budget)
    setShowBudgetSlider(true)
  }

  // Handle Apply - HITL pattern
  const handleApplyBudget = () => {
    if (!selectedCampaign) return

    const { projectedRevenue, projectedRoas } = calculateProjections(selectedCampaign, budgetValue)

    const newAdjustment: BudgetAdjustment = {
      id: `adj-${Date.now()}`,
      campaignId: selectedCampaign.id,
      campaignName: selectedCampaign.name,
      platform: selectedCampaign.platform,
      currentBudget: selectedCampaign.budget,
      newBudget: budgetValue,
      projectedRevenue,
      projectedRoas,
      timestamp: new Date(),
    }

    setApprovalList(prev => [newAdjustment, ...prev])

    // Show toast
    setToastMessage(`"${selectedCampaign.name}" 예산 변경 승인 대기 중`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)

    setShowBudgetSlider(false)
    setSelectedCampaign(null)
  }

  // Dismiss approval entry
  const dismissApproval = (id: string) => {
    setApprovalList(prev => prev.filter(entry => entry.id !== id))
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
              style={{ backgroundColor: platform?.bgColor, color: platform?.color }}
            >
              {platform?.name[0]}
            </div>
            <div>
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-500">{platform?.name}</p>
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
    {
      key: 'actions',
      label: '액션',
      render: (item: Campaign) => (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleOpenBudgetSlider(item)
          }}
          className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
        >
          <Sliders className="w-3 h-3" />
          예산 조정
        </button>
      ),
    },
  ]

  return (
    <div className="p-8">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-lg flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-600" />
            <div>
              <p className="font-medium text-amber-800">Approval Pending</p>
              <p className="text-sm text-amber-600">{toastMessage}</p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="text-amber-400 hover:text-amber-600"
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
          실제 광고 플랫폼 연동 및 예산 변경 기능은 구현되어 있지 않습니다.
        </p>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">광고 관리</h1>
          <p className="text-gray-600">모든 광고 플랫폼의 캠페인을 통합 관리하세요</p>
        </div>
        <button
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Campaign List - 2/3 width */}
        <div className="lg:col-span-2">
          {/* Connected Platforms */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">연결된 플랫폼</h2>
            <div className="flex gap-4 flex-wrap">
              {Object.entries(platformLogos).map(([key, platform]) => {
                const hasActiveCampaigns = campaigns.some(c => c.platform === key)
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
              columns={columns as unknown as { key: string; label: string; sortable?: boolean; render?: (item: Record<string, unknown>) => React.ReactNode }[]}
              data={campaigns as unknown as Record<string, unknown>[]}
            />
          </div>
        </div>

        {/* Approval Pending List - 1/3 width */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-gray-900">승인 대기</h2>
            {approvalList.length > 0 && (
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                {approvalList.length}
              </span>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 min-h-[300px]">
            {approvalList.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-gray-200 mb-3" />
                <p className="text-sm text-gray-500">
                  대기 중인 승인 요청이 없습니다
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  예산 조정을 적용하면 여기에 표시됩니다
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {approvalList.map((entry) => {
                  const platform = platformLogos[entry.platform]
                  const budgetChange = ((entry.newBudget - entry.currentBudget) / entry.currentBudget) * 100
                  return (
                    <div
                      key={entry.id}
                      className="p-3 bg-amber-50 border border-amber-100 rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
                            style={{ backgroundColor: platform?.bgColor, color: platform?.color }}
                          >
                            {platform?.name[0]}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{entry.campaignName}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500">
                                {formatCurrency(entry.currentBudget)} → {formatCurrency(entry.newBudget)}
                              </span>
                              <span className={`text-xs font-medium ${budgetChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                ({budgetChange >= 0 ? '+' : ''}{budgetChange.toFixed(0)}%)
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => dismissApproval(entry.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mt-2 pt-2 border-t border-amber-100 grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-gray-500">예상 매출</p>
                          <p className="text-sm font-medium text-gray-900">{formatCurrency(entry.projectedRevenue)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">예상 ROAS</p>
                          <p className="text-sm font-medium text-green-600">{entry.projectedRoas.toFixed(1)}x</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
                        <Clock className="w-3 h-3" />
                        <span>관리자 승인 대기 중</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* HITL Info */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>HITL Demo:</strong> 프로덕션 환경에서는 모든 예산 변경이 관리자 승인 후 실행됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* Budget Adjustment Slider Modal */}
      {showBudgetSlider && selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowBudgetSlider(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">예산 조정</h3>
              <button
                onClick={() => setShowBudgetSlider(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Campaign Info */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{
                  backgroundColor: platformLogos[selectedCampaign.platform]?.bgColor,
                  color: platformLogos[selectedCampaign.platform]?.color
                }}
              >
                {platformLogos[selectedCampaign.platform]?.name[0]}
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedCampaign.name}</p>
                <p className="text-sm text-gray-500">현재 예산: {formatCurrency(selectedCampaign.budget)}</p>
              </div>
            </div>

            {/* Budget Slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">새 예산</label>
                <span className="text-lg font-bold text-blue-600">{formatCurrency(budgetValue)}</span>
              </div>
              <input
                type="range"
                min={Math.round(selectedCampaign.budget * 0.5)}
                max={Math.round(selectedCampaign.budget * 2)}
                step={10000}
                value={budgetValue}
                onChange={(e) => setBudgetValue(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{formatCurrency(Math.round(selectedCampaign.budget * 0.5))}</span>
                <span>{formatCurrency(Math.round(selectedCampaign.budget * 2))}</span>
              </div>
            </div>

            {/* Projected Metrics */}
            {(() => {
              const { projectedRevenue, projectedRoas } = calculateProjections(selectedCampaign, budgetValue)
              const budgetChange = ((budgetValue - selectedCampaign.budget) / selectedCampaign.budget) * 100
              return (
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-medium text-blue-900 mb-3">예상 성과</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-blue-600">예산 변화</p>
                      <p className={`text-lg font-bold ${budgetChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {budgetChange >= 0 ? '+' : ''}{budgetChange.toFixed(0)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-600">예상 매출</p>
                      <p className="text-lg font-bold text-gray-900">{formatCurrency(projectedRevenue)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-600">예상 ROAS</p>
                      <p className={`text-lg font-bold ${projectedRoas >= 3 ? 'text-green-600' : projectedRoas >= 2 ? 'text-amber-600' : 'text-red-600'}`}>
                        {projectedRoas.toFixed(1)}x
                      </p>
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowBudgetSlider(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleApplyBudget}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                적용
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2563EB;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2563EB;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}
