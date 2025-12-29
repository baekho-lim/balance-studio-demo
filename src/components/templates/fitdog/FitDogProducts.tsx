'use client'

import { useState } from 'react'
import {
  Scale,
  Heart,
  TrendingDown,
  Zap,
  Leaf,
  Sparkles,
  Bone,
  Eye,
  Shield,
  Star,
  Smile,
  Moon,
} from 'lucide-react'

interface Base {
  id: string
  name: { en: string; ko: string }
  description: { en: string; ko: string }
  icon: string
  color: string
  displayOrder: number
}

interface Topping {
  id: string
  name: { en: string; ko: string }
  description: { en: string; ko: string }
  whenToIncrease: { en: string; ko: string }
  whenToDecrease: { en: string; ko: string }
  icon: string
  displayOrder: number
}

interface Props {
  products: {
    bases: Base[]
    toppings: Topping[]
  }
  colors: { primary: string; accent: string }
}

const getIcon = (iconName: string, className: string, color: string) => {
  const iconProps = { className, style: { color } }
  switch (iconName) {
    case 'Scale': return <Scale {...iconProps} />
    case 'Heart': return <Heart {...iconProps} />
    case 'TrendingDown': return <TrendingDown {...iconProps} />
    case 'Zap': return <Zap {...iconProps} />
    case 'Leaf': return <Leaf {...iconProps} />
    case 'Sparkles': return <Sparkles {...iconProps} />
    case 'Bone': return <Bone {...iconProps} />
    case 'Eye': return <Eye {...iconProps} />
    case 'Shield': return <Shield {...iconProps} />
    case 'Star': return <Star {...iconProps} />
    case 'Smile': return <Smile {...iconProps} />
    case 'Moon': return <Moon {...iconProps} />
    default: return <Scale {...iconProps} />
  }
}

export default function FitDogProducts({ products, colors }: Props) {
  const [activeTab, setActiveTab] = useState<'bases' | 'toppings'>('bases')
  const [selectedTopping, setSelectedTopping] = useState<string | null>(null)

  return (
    <section id="products" className="py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium mb-2" style={{ color: colors.primary }}>
            맞춤 구성
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            베이스 4종 + 토핑 10종
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            AI가 분석한 건강 데이터를 바탕으로 최적의 조합을 추천해드려요.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('bases')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'bases'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              베이스 (4종)
            </button>
            <button
              onClick={() => setActiveTab('toppings')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'toppings'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              토핑 (10종)
            </button>
          </div>
        </div>

        {/* Bases Grid */}
        {activeTab === 'bases' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.bases
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((base) => {
                return (
                  <div
                    key={base.id}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${base.color}20` }}
                    >
                      {getIcon(base.icon, "w-6 h-6", base.color)}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{base.name.ko}</h3>
                    <p className="text-sm text-gray-500">{base.description.ko}</p>
                  </div>
                )
              })}
          </div>
        )}

        {/* Toppings Grid */}
        {activeTab === 'toppings' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {products.toppings
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((topping) => {
                const isSelected = selectedTopping === topping.id
                return (
                  <button
                    key={topping.id}
                    onClick={() => setSelectedTopping(isSelected ? null : topping.id)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-teal-50 border-teal-300 shadow-sm'
                        : 'bg-white border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                        isSelected ? 'bg-teal-100' : 'bg-gray-100'
                      }`}
                    >
                      {getIcon(topping.icon, "w-5 h-5", isSelected ? colors.primary : '#6B7280')}
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm">{topping.name.ko}</h4>
                    <p className="text-xs text-gray-500 mt-1">{topping.description.ko}</p>
                  </button>
                )
              })}
          </div>
        )}

        {/* Selected Topping Detail */}
        {activeTab === 'toppings' && selectedTopping && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            {(() => {
              const topping = products.toppings.find((t) => t.id === selectedTopping)
              if (!topping) return null
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">🔼 이럴 때 추천</p>
                    <p className="text-sm text-gray-700">{topping.whenToIncrease.ko}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">🔽 이럴 땐 줄여요</p>
                    <p className="text-sm text-gray-700">{topping.whenToDecrease.ko}</p>
                  </div>
                </div>
              )
            })()}
          </div>
        )}

        <p className="text-center text-sm text-gray-400 mt-8">
          * 직접 선택하실 필요 없어요. AI가 최적의 조합을 추천해드립니다.
        </p>
      </div>
    </section>
  )
}
