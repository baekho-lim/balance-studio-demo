'use client'

import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'

type SortDirection = 'asc' | 'desc' | null

interface Column<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  render?: (item: T) => React.ReactNode
  className?: string
}

interface CommerceTableProps<T> {
  columns: Column<T>[]
  data: T[]
  sortKey?: string
  sortDirection?: SortDirection
  onSort?: (key: string) => void
  onRowClick?: (item: T) => void
  emptyMessage?: string
  loading?: boolean
}

export default function CommerceTable<T extends Record<string, unknown>>({
  columns,
  data,
  sortKey,
  sortDirection,
  onSort,
  onRowClick,
  emptyMessage = '데이터가 없습니다',
  loading = false
}: CommerceTableProps<T>) {
  const getSortIcon = (key: string) => {
    if (sortKey !== key) {
      return <ChevronsUpDown className="w-4 h-4 text-gray-300" />
    }
    if (sortDirection === 'asc') {
      return <ChevronUp className="w-4 h-4 text-blue-600" />
    }
    return <ChevronDown className="w-4 h-4 text-blue-600" />
  }

  const getCellValue = (item: T, key: string): React.ReactNode => {
    const keys = key.split('.')
    let value: unknown = item
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k]
    }
    return value as React.ReactNode
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="animate-pulse p-4 space-y-4">
          <div className="h-10 bg-gray-100 rounded" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-50 rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100 select-none' : ''
                  } ${column.className || ''}`}
                  onClick={() => column.sortable && onSort?.(String(column.key))}
                >
                  <div className="flex items-center gap-1">
                    {column.label}
                    {column.sortable && getSortIcon(String(column.key))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    onRowClick
                      ? 'cursor-pointer hover:bg-blue-50 transition-colors'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={`px-4 py-3 text-sm text-gray-900 ${column.className || ''}`}
                    >
                      {column.render
                        ? column.render(item)
                        : getCellValue(item, String(column.key))}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
