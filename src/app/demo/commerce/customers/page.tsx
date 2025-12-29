'use client'

import { useState } from 'react'
import { Search, Download, Filter, X, Mail, Phone, Calendar, DollarSign } from 'lucide-react'
import { CommerceTable, CommerceModal } from '@/components/templates/commerce'
import mockData from '@/data/demo/commerce-mock-data.json'

type Customer = typeof mockData.customers[0]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showExportModal, setShowExportModal] = useState(false)

  const { customers, segments } = mockData

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSegment = !selectedSegment || customer.segment.toLowerCase() === selectedSegment
    return matchesSearch && matchesSegment
  })

  const formatCurrency = (value: number) => {
    if (value >= 10000) {
      return `${Math.round(value / 10000)}만원`
    }
    return `${value.toLocaleString()}원`
  }

  const getSegmentBadge = (segment: string) => {
    const styles: Record<string, string> = {
      VIP: 'bg-purple-100 text-purple-700',
      Regular: 'bg-blue-100 text-blue-700',
      New: 'bg-green-100 text-green-700',
      Dormant: 'bg-red-100 text-red-700',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[segment] || 'bg-gray-100 text-gray-700'}`}>
        {segment}
      </span>
    )
  }

  const columns = [
    {
      key: 'name',
      label: '이름',
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
      render: (item: Customer) => getSegmentBadge(item.segment),
    },
    {
      key: 'totalOrders',
      label: '주문 수',
      sortable: true,
      render: (item: Customer) => `${item.totalOrders}건`,
    },
    {
      key: 'totalSpent',
      label: '총 구매액',
      sortable: true,
      render: (item: Customer) => formatCurrency(item.totalSpent),
    },
    {
      key: 'ltv',
      label: 'LTV',
      sortable: true,
      render: (item: Customer) => formatCurrency(item.ltv),
    },
    {
      key: 'lastOrder',
      label: '마지막 주문',
      render: (item: Customer) => item.lastOrder,
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">고객 관리</h1>
          <p className="text-gray-600">고객 데이터를 조회하고 분석하세요</p>
        </div>
        <button
          onClick={() => setShowExportModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          내보내기
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar - Segments */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              세그먼트
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedSegment(null)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  !selectedSegment
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>전체</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                  {customers.length}
                </span>
              </button>
              {segments.map((segment) => (
                <button
                  key={segment.id}
                  onClick={() => setSelectedSegment(segment.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedSegment === segment.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: segment.color }}
                    />
                    <span>{segment.name.ko}</span>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                    {segment.count.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="이름 또는 이메일로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Table */}
          <CommerceTable
            columns={columns}
            data={filteredCustomers}
            onRowClick={(customer) => setSelectedCustomer(customer)}
            emptyMessage="검색 결과가 없습니다"
          />
        </div>
      </div>

      {/* Customer Detail Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSelectedCustomer(null)}
          />
          <div className="relative w-96 bg-white h-full shadow-xl overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedCustomer.name}
                  </h2>
                  {getSegmentBadge(selectedCustomer.segment)}
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
                  <span className="text-gray-600">가입일: {selectedCustomer.joinDate}</span>
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

              {/* Actions */}
              <div className="space-y-2">
                <button className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  캠페인 보내기
                </button>
                <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  주문 내역 보기
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
