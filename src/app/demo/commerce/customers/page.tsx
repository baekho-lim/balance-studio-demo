'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  Download,
  Filter,
  X,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Clock,
  ShoppingBag,
  TrendingUp,
  Users,
  ArrowRight,
  Package
} from 'lucide-react'
import { CommerceTable, CommerceModal } from '@/components/templates/commerce'
import {
  getCustomers,
  getOrders,
  getProducts,
  getChannels,
  type Customer,
  type Order,
  type Product,
  type RFMScore
} from '@/lib/commerce'

// Filter options
const SEGMENT_OPTIONS: { value: RFMScore | 'all'; label: string; color: string }[] = [
  { value: 'all', label: '전체', color: '#6B7280' },
  { value: 'VIP', label: 'VIP', color: '#8B5CF6' },
  { value: 'Loyal', label: 'Loyal', color: '#3B82F6' },
  { value: 'Regular', label: 'Regular', color: '#10B981' },
  { value: 'AtRisk', label: '이탈 위험', color: '#F59E0B' },
  { value: 'Dormant', label: '휴면', color: '#EF4444' },
]

const RECENCY_OPTIONS = [
  { value: 'all', label: '전체 기간' },
  { value: '7', label: '최근 7일' },
  { value: '30', label: '최근 30일' },
  { value: '90', label: '최근 90일' },
  { value: '90+', label: '90일 이상' },
]

export default function CustomersPage() {
  const router = useRouter()
  const customers = getCustomers()
  const orders = getOrders()
  const products = getProducts()
  const channels = getChannels()

  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSegment, setSelectedSegment] = useState<RFMScore | 'all'>('all')
  const [selectedChannel, setSelectedChannel] = useState<string>('all')
  const [selectedRecency, setSelectedRecency] = useState<string>('all')

  // UI states
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showExportModal, setShowExportModal] = useState(false)

  // Get unique channels from customers
  const customerChannels = useMemo(() => {
    const channelSet = new Set(customers.map(c => c.preferredChannel))
    return Array.from(channelSet)
  }, [customers])

  // Filter customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      // Search filter
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())

      // Segment filter
      const matchesSegment =
        selectedSegment === 'all' || customer.rfm.score === selectedSegment

      // Channel filter
      const matchesChannel =
        selectedChannel === 'all' || customer.preferredChannel === selectedChannel

      // Recency filter
      let matchesRecency = true
      if (selectedRecency !== 'all') {
        const recency = customer.rfm.recency
        if (selectedRecency === '7') matchesRecency = recency <= 7
        else if (selectedRecency === '30') matchesRecency = recency <= 30
        else if (selectedRecency === '90') matchesRecency = recency <= 90
        else if (selectedRecency === '90+') matchesRecency = recency > 90
      }

      return matchesSearch && matchesSegment && matchesChannel && matchesRecency
    })
  }, [customers, searchTerm, selectedSegment, selectedChannel, selectedRecency])

  // Get segment counts
  const segmentCounts = useMemo(() => {
    const counts: Record<string, number> = { all: customers.length }
    SEGMENT_OPTIONS.forEach(opt => {
      if (opt.value !== 'all') {
        counts[opt.value] = customers.filter(c => c.rfm.score === opt.value).length
      }
    })
    return counts
  }, [customers])

  // Format currency
  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(1)}천만`
    }
    if (value >= 10000) {
      return `${Math.round(value / 10000)}만원`
    }
    return `${value.toLocaleString()}원`
  }

  // Get segment badge
  const getSegmentBadge = (score: RFMScore) => {
    const styles: Record<RFMScore, string> = {
      VIP: 'bg-purple-100 text-purple-700',
      Loyal: 'bg-blue-100 text-blue-700',
      Regular: 'bg-green-100 text-green-700',
      AtRisk: 'bg-amber-100 text-amber-700',
      Dormant: 'bg-red-100 text-red-700',
    }
    const labels: Record<RFMScore, string> = {
      VIP: 'VIP',
      Loyal: 'Loyal',
      Regular: 'Regular',
      AtRisk: '이탈 위험',
      Dormant: '휴면',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[score]}`}>
        {labels[score]}
      </span>
    )
  }

  // Get RFM display
  const getRFMDisplay = (customer: Customer) => {
    const { recency, frequency, monetary } = customer.rfm
    return (
      <div className="text-xs">
        <span className="text-gray-500">R:</span>
        <span className={`ml-1 ${recency <= 7 ? 'text-green-600' : recency <= 30 ? 'text-amber-600' : 'text-red-600'}`}>
          {recency}일
        </span>
        <span className="mx-1 text-gray-300">|</span>
        <span className="text-gray-500">F:</span>
        <span className="ml-1 text-gray-900">{frequency}회</span>
        <span className="mx-1 text-gray-300">|</span>
        <span className="text-gray-500">M:</span>
        <span className="ml-1 text-gray-900">{formatCurrency(monetary)}</span>
      </div>
    )
  }

  // Get customer orders
  const getCustomerOrders = (customerId: string): Order[] => {
    return orders.filter(o => o.customerId === customerId)
  }

  // Get cross-sell products for customer
  const getCrossSellProducts = (customer: Customer): Product[] => {
    // Simple logic: if customer bought toner, recommend serum and vice versa
    const customerOrders = getCustomerOrders(customer.id)
    const purchasedProductIds = new Set(
      customerOrders.flatMap(o => o.items.map(i => i.productId))
    )

    // Recommend products not purchased yet, sorted by totalSales
    return products
      .filter(p => !purchasedProductIds.has(p.id))
      .sort((a, b) => b.totalSales - a.totalSales)
      .slice(0, 3)
  }

  // Handle Start CRM action
  const handleStartCRM = (customer: Customer) => {
    router.push(`/demo/commerce/crm?customerId=${customer.id}`)
  }

  // Table columns
  const columns = [
    {
      key: 'name',
      label: '고객',
      render: (item: Customer) => (
        <div>
          <p className="font-medium text-gray-900">{item.name}</p>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      ),
    },
    {
      key: 'segment',
      label: '세그먼트',
      render: (item: Customer) => getSegmentBadge(item.rfm.score),
    },
    {
      key: 'rfm',
      label: 'RFM',
      render: (item: Customer) => getRFMDisplay(item),
    },
    {
      key: 'lastOrderDate',
      label: '마지막 주문',
      render: (item: Customer) => (
        <span className="text-sm text-gray-600">{item.lastOrderDate}</span>
      ),
    },
    {
      key: 'totalSpent',
      label: '총 구매액',
      sortable: true,
      render: (item: Customer) => (
        <span className="font-medium text-gray-900">{formatCurrency(item.totalSpent)}</span>
      ),
    },
    {
      key: 'totalOrders',
      label: '주문',
      sortable: true,
      render: (item: Customer) => `${item.totalOrders}건`,
    },
    {
      key: 'ltv',
      label: 'VIP Tier',
      render: (item: Customer) => {
        const tier = item.ltv >= 2000000 ? 'Gold' : item.ltv >= 500000 ? 'Silver' : 'Bronze'
        const colors = {
          Gold: 'bg-amber-100 text-amber-700',
          Silver: 'bg-gray-100 text-gray-700',
          Bronze: 'bg-orange-100 text-orange-700',
        }
        return (
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[tier]}`}>
            {tier}
          </span>
        )
      },
    },
    {
      key: 'action',
      label: '',
      render: (item: Customer) => (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleStartCRM(item)
          }}
          className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
        >
          Start CRM
          <ArrowRight className="w-3 h-3" />
        </button>
      ),
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">고객 관리</h1>
          <p className="text-gray-600">
            RFM 분석 기반 고객 세그먼트를 관리하고 CRM 액션을 실행하세요
          </p>
        </div>
        <button
          onClick={() => setShowExportModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          내보내기
        </button>
      </div>

      {/* Filters Row */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="이름 또는 이메일로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Segment Filter */}
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <select
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value as RFMScore | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              {SEGMENT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label} ({segmentCounts[opt.value] || 0})
                </option>
              ))}
            </select>
          </div>

          {/* Channel Filter */}
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-gray-400" />
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체 채널</option>
              {customerChannels.map(ch => (
                <option key={ch} value={ch}>{ch}</option>
              ))}
            </select>
          </div>

          {/* Recency Filter */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <select
              value={selectedRecency}
              onChange={(e) => setSelectedRecency(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              {RECENCY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Active Filters Count */}
          {(selectedSegment !== 'all' || selectedChannel !== 'all' || selectedRecency !== 'all') && (
            <button
              onClick={() => {
                setSelectedSegment('all')
                setSelectedChannel('all')
                setSelectedRecency('all')
              }}
              className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              필터 초기화
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            총 <span className="font-medium text-gray-900">{filteredCustomers.length}</span>명의 고객
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              VIP: {segmentCounts['VIP'] || 0}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              이탈 위험: {segmentCounts['AtRisk'] || 0}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              휴면: {segmentCounts['Dormant'] || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <CommerceTable
        columns={columns as unknown as { key: string; label: string; sortable?: boolean; render?: (item: Record<string, unknown>) => React.ReactNode }[]}
        data={filteredCustomers as unknown as Record<string, unknown>[]}
        onRowClick={(customer) => setSelectedCustomer(customer as unknown as Customer)}
        emptyMessage="조건에 맞는 고객이 없습니다"
      />

      {/* Customer Detail Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSelectedCustomer(null)}
          />
          <div className="relative w-[420px] bg-white h-full shadow-xl overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedCustomer.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    {getSegmentBadge(selectedCustomer.rfm.score)}
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      selectedCustomer.ltv >= 2000000 ? 'bg-amber-100 text-amber-700' :
                      selectedCustomer.ltv >= 500000 ? 'bg-gray-100 text-gray-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {selectedCustomer.ltv >= 2000000 ? 'Gold' : selectedCustomer.ltv >= 500000 ? 'Silver' : 'Bronze'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{selectedCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">가입일: {selectedCustomer.createdAt}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <ShoppingBag className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">선호 채널: {selectedCustomer.preferredChannel}</span>
                </div>
              </div>

              {/* RFM Stats */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  RFM 분석
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{selectedCustomer.rfm.recency}</p>
                    <p className="text-xs text-gray-500">Recency (일)</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{selectedCustomer.rfm.frequency}</p>
                    <p className="text-xs text-gray-500">Frequency (회)</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(selectedCustomer.rfm.monetary)}</p>
                    <p className="text-xs text-gray-500">Monetary</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">총 주문</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedCustomer.totalOrders}건
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">총 구매액</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(selectedCustomer.totalSpent)}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    <p className="text-xs text-blue-600 font-medium">예상 LTV</p>
                  </div>
                  <p className="text-xl font-bold text-blue-700">
                    {formatCurrency(selectedCustomer.ltv)}
                  </p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-600" />
                  최근 주문
                </h3>
                <div className="space-y-2">
                  {getCustomerOrders(selectedCustomer.id).slice(0, 3).length > 0 ? (
                    getCustomerOrders(selectedCustomer.id).slice(0, 3).map(order => (
                      <div key={order.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-900">{order.orderNumber}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'processing' ? 'bg-amber-100 text-amber-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">
                          {order.items.map(i => i.productName).join(', ')}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">{order.createdAt.split('T')[0]}</span>
                          <span className="font-medium text-gray-900">{formatCurrency(order.total)}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                      최근 주문 내역이 없습니다
                    </p>
                  )}
                </div>
              </div>

              {/* Cross-sell Recommendations */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  추천 크로스셀 상품
                </h3>
                <div className="space-y-2">
                  {getCrossSellProducts(selectedCustomer).map(product => (
                    <div key={product.id} className="bg-purple-50 rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.nameKr}</p>
                        <p className="text-xs text-purple-600">{product.categoryKr}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {selectedCustomer.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">태그</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomer.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedCustomer(null)
                    handleStartCRM(selectedCustomer)
                  }}
                  className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  CRM 액션 시작
                </button>
                <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  전체 주문 내역 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      <CommerceModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        type="approval"
        title="고객 데이터 내보내기"
        message="선택한 고객 데이터를 CSV 파일로 내보냅니다. 개인정보 보호 정책에 따라 관리자 승인이 필요합니다."
      />
    </div>
  )
}
