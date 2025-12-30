import React from 'react'
import { formatCurrency } from '@cgos/core'

export interface KpiCardProps {
  title: string
  value: number | string
  change?: number
  changeLabel?: string
  format?: 'number' | 'currency' | 'percent'
  icon?: React.ReactNode
  className?: string
}

export function KpiCard({
  title,
  value,
  change,
  changeLabel,
  format = 'number',
  icon,
  className = '',
}: KpiCardProps) {
  const formatValue = (val: number | string) => {
    if (typeof val === 'string') return val
    switch (format) {
      case 'currency':
        return formatCurrency(val)
      case 'percent':
        return `${val}%`
      default:
        return val.toLocaleString()
    }
  }

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{formatValue(value)}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`text-sm font-medium ${
                  change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {change >= 0 ? '+' : ''}
                {change}%
              </span>
              {changeLabel && (
                <span className="text-xs text-gray-500">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

export default KpiCard
