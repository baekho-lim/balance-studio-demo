'use client'

interface CommerceChartProps {
  labels: string[]
  data: number[]
  title?: string
  height?: number
  color?: string
  showGrid?: boolean
}

export default function CommerceChart({
  labels,
  data,
  title,
  height = 200,
  color = '#2563EB',
  showGrid = true
}: CommerceChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <p className="text-gray-500 text-center py-12">데이터가 없습니다</p>
      </div>
    )
  }

  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const range = maxValue - minValue || 1

  const formatValue = (val: number): string => {
    if (val >= 100000000) {
      return `${(val / 100000000).toFixed(1)}억`
    }
    if (val >= 10000000) {
      return `${(val / 10000000).toFixed(0)}천만`
    }
    if (val >= 10000) {
      return `${(val / 10000).toFixed(0)}만`
    }
    return val.toLocaleString()
  }

  const getY = (value: number): number => {
    const padding = 20
    const availableHeight = height - padding * 2
    const normalized = (value - minValue) / range
    return height - padding - normalized * availableHeight
  }

  const pathD = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = getY(value)
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  const areaD = `${pathD} L 100 ${height - 20} L 0 ${height - 20} Z`

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      {title && (
        <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      )}

      <div className="relative" style={{ height }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-400 py-5">
          <span>{formatValue(maxValue)}</span>
          <span>{formatValue((maxValue + minValue) / 2)}</span>
          <span>{formatValue(minValue)}</span>
        </div>

        {/* Chart area */}
        <div className="ml-14 h-full relative">
          <svg
            viewBox={`0 0 100 ${height}`}
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            {/* Grid lines */}
            {showGrid && (
              <g className="text-gray-100">
                {[0, 25, 50, 75, 100].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={20 + (y / 100) * (height - 40)}
                    x2="100"
                    y2={20 + (y / 100) * (height - 40)}
                    stroke="currentColor"
                    strokeDasharray="2 2"
                  />
                ))}
              </g>
            )}

            {/* Area fill */}
            <path
              d={areaD}
              fill={`url(#gradient-${color.replace('#', '')})`}
              opacity="0.1"
            />

            {/* Line */}
            <path
              d={pathD}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* Data points */}
            {data.map((value, index) => {
              const x = (index / (data.length - 1)) * 100
              const y = getY(value)
              return (
                <g key={index}>
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="white"
                    stroke={color}
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    className="opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  />
                  <title>{`${labels[index]}: ${formatValue(value)}`}</title>
                </g>
              )
            })}

            {/* Gradient definition */}
            <defs>
              <linearGradient
                id={`gradient-${color.replace('#', '')}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 -mb-5">
            {labels.filter((_, i) => i % Math.ceil(labels.length / 6) === 0 || i === labels.length - 1).map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
