'use client'

import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

interface Props {
  personalization: {
    headline: { en: string; ko: string }
    subheadline: { en: string; ko: string }
    sampleScore: {
      current: number
      previousWeek: number
      trend: string
    }
    alerts: Array<{
      type: string
      message: { en: string; ko: string }
    }>
  }
  colors: { primary: string; accent: string }
}

export default function FitDogPersonalization({ personalization, colors }: Props) {
  const score = personalization.sampleScore
  const scoreDiff = score.current - score.previousWeek
  const isImproving = scoreDiff > 0

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium mb-2" style={{ color: colors.primary }}>
            지속적인 관리
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {personalization.headline.ko}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {personalization.subheadline.ko}
          </p>
        </div>

        {/* Sample Dashboard UI */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div
              className="px-6 py-4 text-white"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}dd)` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">코코의 건강 리포트</p>
                  <p className="text-xs text-white/60">오늘 오전 9:30 업데이트</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/60">이번 주</p>
                  <p className="text-2xl font-bold">{score.current}점</p>
                </div>
              </div>
            </div>

            {/* Score Visualization */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900">변 건강 점수</h3>
                  <p className="text-sm text-gray-500">7점 만점</p>
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${isImproving ? 'text-green-600' : 'text-red-500'}`}>
                  <TrendingUp className={`w-4 h-4 ${!isImproving && 'rotate-180'}`} />
                  {isImproving ? '+' : ''}{scoreDiff}점 (지난 주 대비)
                </div>
              </div>

              {/* Score Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>묽음 (1)</span>
                  <span>이상적 (4-5)</span>
                  <span>딱딱함 (7)</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/7 bg-red-200" />
                    <div className="w-1/7 bg-yellow-200" />
                    <div className="w-1/7 bg-green-200" />
                    <div className="w-1/7 bg-green-300" />
                    <div className="w-1/7 bg-green-200" />
                    <div className="w-1/7 bg-yellow-200" />
                    <div className="w-1/7 bg-red-200" />
                  </div>
                  <div
                    className="absolute top-0 bottom-0 w-4 -ml-2 bg-white rounded-full shadow-md border-2"
                    style={{
                      left: `${(score.current / 7) * 100}%`,
                      borderColor: colors.primary,
                    }}
                  />
                </div>
              </div>

              {/* Alerts */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">이번 주 알림</h4>
                {personalization.alerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      alert.type === 'positive'
                        ? 'bg-green-50'
                        : alert.type === 'warning'
                        ? 'bg-yellow-50'
                        : 'bg-blue-50'
                    }`}
                  >
                    {alert.type === 'positive' ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : alert.type === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    )}
                    <p className={`text-sm ${
                      alert.type === 'positive'
                        ? 'text-green-700'
                        : alert.type === 'warning'
                        ? 'text-yellow-700'
                        : 'text-blue-700'
                    }`}>
                      {alert.message.ko}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recommendation */}
              <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: `${colors.primary}10` }}>
                <p className="text-sm font-medium" style={{ color: colors.primary }}>
                  이번 주 추천 조정
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  장 건강 토핑 유지, 피부 토핑은 다음 주부터 줄여도 됩니다.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            * 실제 앱 화면의 예시입니다
          </p>
        </div>
      </div>
    </section>
  )
}
