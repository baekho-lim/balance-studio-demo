'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface CommerceKpiCardProps {
  title: string
  value: string | number
  prefix?: string
  suffix?: string
  change?: number
  period?: string
  icon?: React.ReactNode
  loading?: boolean
}

export default function CommerceKpiCard({
  title,
  value,
  prefix = '',
  suffix = '',
  change,
  period = 'vs last month',
  icon,
  loading = false
}: CommerceKpiCardProps) {
  const formatValue = (val: string | number): string => {
    if (typeof val === 'number') {
      if (val >= 100000000) {
        return `${(val / 100000000).toFixed(1)}억`
      }
      if (val >= 10000) {
        return `${(val / 10000).toFixed(0)}만`
      }
      return val.toLocaleString()
    }
    return val
  }

  const getTrendIcon = () => {
    if (change === undefined || change === 0) {
      return <Minus className="w-4 h-4 text-gray-400" />
    }
    if (change > 0) {
      return <TrendingUp className="w-4 h-4 text-green-500" />
    }
    return <TrendingDown className="w-4 h-4 text-red-500" />
  }

  const getTrendColor = () => {
    if (change === undefined || change === 0) return 'text-gray-500'
    return change > 0 ? 'text-green-600' : 'text-red-600'
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
        <div className="h-8 bg-gray-200 rounded w-32 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-20" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        {icon && (
          <span className="text-gray-400">
            {icon}
          </span>
        )}
      </div>

      <div className="mb-2">
        <span className="text-2xl font-bold text-gray-900">
          {prefix}{formatValue(value)}{suffix}
        </span>
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-1.5">
          {getTrendIcon()}
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
          <span className="text-xs text-gray-400">{period}</span>
        </div>
      )}
    </div>
  )
}
