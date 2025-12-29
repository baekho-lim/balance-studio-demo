'use client'

import { DollarSign, ShoppingCart, Users, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CommerceKpiCard, CommerceChart, CommerceTable } from '@/components/templates/commerce'
import mockData from '@/data/demo/commerce-mock-data.json'

export default function DashboardPage() {
  const { kpis, revenueChart, topProducts, recentOrders } = mockData

  const formatCurrency = (value: number) => {
    if (value >= 100000000) {
      return `${(value / 100000000).toFixed(1)}억원`
    }
    if (value >= 10000) {
      return `${Math.round(value / 10000)}만원`
    }
    return `${value.toLocaleString()}원`
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      delivered: 'bg-green-100 text-green-700',
      shipping: 'bg-blue-100 text-blue-700',
      processing: 'bg-amber-100 text-amber-700',
      cancelled: 'bg-red-100 text-red-700',
    }
    const labels: Record<string, string> = {
      delivered: '배송완료',
      shipping: '배송중',
      processing: '처리중',
      cancelled: '취소',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
        {labels[status] || status}
      </span>
    )
  }

  const productColumns = [
    { key: 'name', label: '상품명' },
    {
      key: 'sales',
      label: '판매량',
      sortable: true,
      render: (item: typeof topProducts[0]) => `${item.sales.toLocaleString()}개`,
    },
    {
      key: 'revenue',
      label: '매출',
      sortable: true,
      render: (item: typeof topProducts[0]) => formatCurrency(item.revenue),
    },
    {
      key: 'growth',
      label: '성장률',
      sortable: true,
      render: (item: typeof topProducts[0]) => (
        <span className={item.growth >= 0 ? 'text-green-600' : 'text-red-600'}>
          {item.growth >= 0 ? '+' : ''}{item.growth}%
        </span>
      ),
    },
  ]

  const orderColumns = [
    { key: 'id', label: '주문번호', className: 'font-mono text-xs' },
    { key: 'customer', label: '고객' },
    {
      key: 'amount',
      label: '금액',
      render: (item: typeof recentOrders[0]) => `${item.amount.toLocaleString()}원`,
    },
    {
      key: 'status',
      label: '상태',
      render: (item: typeof recentOrders[0]) => getStatusBadge(item.status),
    },
    { key: 'date', label: '날짜' },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">대시보드</h1>
        <p className="text-gray-600">스토어 성과를 한눈에 확인하세요</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CommerceKpiCard
          title="총 매출"
          value={kpis.revenue.value}
          prefix="₩"
          change={kpis.revenue.change}
          period={kpis.revenue.period}
          icon={<DollarSign className="w-5 h-5" />}
        />
        <CommerceKpiCard
          title="주문 수"
          value={kpis.orders.value}
          suffix="건"
          change={kpis.orders.change}
          period={kpis.orders.period}
          icon={<ShoppingCart className="w-5 h-5" />}
        />
        <CommerceKpiCard
          title="고객 수"
          value={kpis.customers.value}
          suffix="명"
          change={kpis.customers.change}
          period={kpis.customers.period}
          icon={<Users className="w-5 h-5" />}
        />
        <CommerceKpiCard
          title="평균 주문 금액"
          value={kpis.aov.value}
          prefix="₩"
          change={kpis.aov.change}
          period={kpis.aov.period}
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      {/* Revenue Chart */}
      <div className="mb-8">
        <CommerceChart
          title="월별 매출 추이"
          labels={revenueChart.labels}
          data={revenueChart.data}
          height={250}
        />
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">인기 상품</h2>
            <Link
              href="#"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              전체보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <CommerceTable
            columns={productColumns}
            data={topProducts}
          />
        </div>

        {/* Recent Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">최근 주문</h2>
            <Link
              href="#"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              전체보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <CommerceTable
            columns={orderColumns}
            data={recentOrders}
          />
        </div>
      </div>
    </div>
  )
}
