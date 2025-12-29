'use client'

import { useState } from 'react'
import {
  DollarSign,
  Percent,
  ShoppingCart,
  RefreshCw,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Target,
  Users,
  Megaphone,
  X,
  Clock,
  CheckCircle2,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CommerceKpiCard, CommerceChart } from '@/components/templates/commerce'
import {
  getKPISummary,
  getRecommendations,
  type Recommendation
} from '@/lib/commerce'

// Approval pending entry type
interface ApprovalEntry {
  id: string
  title: string
  type: string
  timestamp: Date
}

export default function DashboardPage() {
  const router = useRouter()
  const kpiSummary = getKPISummary()
  const allRecommendations = getRecommendations()

  // Get top 6 recommendations
  const priorityRecommendations = allRecommendations.slice(0, 6)

  // State for approval pending list and toast
  const [approvalList, setApprovalList] = useState<ApprovalEntry[]>([])
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Handle Apply action - HITL pattern
  const handleApply = (recommendation: Recommendation) => {
    // Add to approval list
    const newEntry: ApprovalEntry = {
      id: recommendation.id,
      title: recommendation.titleKr,
      type: recommendation.type,
      timestamp: new Date(),
    }
    setApprovalList(prev => [newEntry, ...prev])

    // Show toast
    setToastMessage(`"${recommendation.titleKr}" 승인 대기 중`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // Handle View action - route to appropriate page
  const handleView = (recommendation: Recommendation) => {
    const routeMap: Record<string, string> = {
      retention: '/demo/commerce/crm',
      reactivation: '/demo/commerce/customers',
      upsell: '/demo/commerce/crm',
      'cross-sell': '/demo/commerce/crm',
      acquisition: '/demo/commerce/ads',
    }

    const baseRoute = routeMap[recommendation.type] || '/demo/commerce/crm'
    router.push(`${baseRoute}?from=reco&id=${recommendation.id}`)
  }

  // Get icon for recommendation type
  const getRecoIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      retention: <Users className="w-4 h-4" />,
      reactivation: <RefreshCw className="w-4 h-4" />,
      upsell: <TrendingUp className="w-4 h-4" />,
      'cross-sell': <ShoppingCart className="w-4 h-4" />,
      acquisition: <Megaphone className="w-4 h-4" />,
    }
    return icons[type] || <Target className="w-4 h-4" />
  }

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-amber-100 text-amber-700',
      low: 'bg-gray-100 text-gray-600',
    }
    const labels: Record<string, string> = {
      high: '높음',
      medium: '보통',
      low: '낮음',
    }
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[priority]}`}>
        {labels[priority]}
      </span>
    )
  }

  // Format currency
  const formatCurrency = (value: number) => {
    if (value >= 100000000) {
      return `${(value / 100000000).toFixed(1)}억`
    }
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(1)}천만`
    }
    if (value >= 10000) {
      return `${Math.round(value / 10000)}만`
    }
    return value.toLocaleString()
  }

  // Dismiss approval entry
  const dismissApproval = (id: string) => {
    setApprovalList(prev => prev.filter(entry => entry.id !== id))
  }

  // Mock revenue chart data
  const revenueChartLabels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
  const revenueChartData = [85000000, 92000000, 88000000, 95000000, 102000000, 98000000, 110000000, 115000000, 108000000, 118000000, 122000000, 124500000]

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

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">대시보드</h1>
        <p className="text-gray-600">
          스토어 성과를 한눈에 확인하세요 · {kpiSummary.period.label} ({kpiSummary.period.start} ~ {kpiSummary.period.end})
        </p>
      </div>

      {/* KPI Cards - 5 Required Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <CommerceKpiCard
          title="총 매출"
          value={kpiSummary.totalRevenue}
          prefix="₩"
          change={kpiSummary.comparison.revenueChange}
          period="vs 지난달"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <CommerceKpiCard
          title="총 마진"
          value={kpiSummary.grossMargin}
          suffix="%"
          icon={<Percent className="w-5 h-5" />}
        />
        <CommerceKpiCard
          title="AOV"
          value={kpiSummary.AOV}
          prefix="₩"
          change={kpiSummary.comparison.aovChange}
          period="vs 지난달"
          icon={<ShoppingCart className="w-5 h-5" />}
        />
        <CommerceKpiCard
          title="재구매 매출"
          value={kpiSummary.repeatRevenuePct}
          suffix="%"
          icon={<RefreshCw className="w-5 h-5" />}
        />
        <CommerceKpiCard
          title="Blended ROAS"
          value={kpiSummary.blendedROAS}
          suffix="x"
          change={kpiSummary.comparison.roasChange}
          period="vs 지난달"
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      {/* Revenue Chart */}
      <div className="mb-8">
        <CommerceChart
          title="월별 매출 추이"
          labels={revenueChartLabels}
          data={revenueChartData}
          height={220}
        />
      </div>

      {/* Priority Recommendations + Approval List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Priority Recommendations - 2/3 width */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-900">오늘의 우선순위 추천</h2>
            </div>
            <Link
              href="/demo/commerce/crm"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              전체보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">유형</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">추천 액션</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">우선순위</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">예상 매출</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ROI</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">액션</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {priorityRecommendations.map((reco) => (
                  <tr key={reco.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                          {getRecoIcon(reco.type)}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">{reco.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{reco.titleKr}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{reco.descriptionKr}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {getPriorityBadge(reco.priority)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-900">
                        {reco.estimatedRevenue ? `₩${formatCurrency(reco.estimatedRevenue)}` : '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-green-600 font-medium">
                        {reco.estimatedROI ? `+${reco.estimatedROI}%` : '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleView(reco)}
                          className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          보기
                        </button>
                        <button
                          onClick={() => handleApply(reco)}
                          className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                          적용
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  추천 액션을 적용하면 여기에 표시됩니다
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {approvalList.map((entry) => (
                  <div
                    key={`${entry.id}-${entry.timestamp.getTime()}`}
                    className="p-3 bg-amber-50 border border-amber-100 rounded-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{entry.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500 capitalize">{entry.type}</span>
                          <span className="text-xs text-amber-600">
                            {entry.timestamp.toLocaleTimeString('ko-KR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => dismissApproval(entry.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
                      <Clock className="w-3 h-3" />
                      <span>관리자 승인 대기 중</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* HITL Info */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>HITL Demo:</strong> 프로덕션 환경에서는 모든 액션이 관리자 승인 후 실행됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions - Content Studio CTA */}
      <div className="mt-8">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">콘텐츠 플랜 생성</h3>
                <p className="text-white/80 text-sm">
                  AI가 페르소나별 SEO 최적화 콘텐츠를 추천합니다
                </p>
              </div>
            </div>
            <Link
              href="/demo/commerce/content-studio"
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-purple-600 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              콘텐츠 스튜디오
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
