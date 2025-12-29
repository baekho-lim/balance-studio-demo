'use client'

import { useState } from 'react'
import { Sparkles, Search, TrendingUp, ArrowUp, ArrowDown, Minus, Save, Clock, Send, RefreshCw } from 'lucide-react'
import MarkdownEditor from '@/components/admin/MarkdownEditor'
import { CommerceModal } from '@/components/templates/commerce'
import mockData from '@/data/demo/commerce-mock-data.json'

interface ContentForm {
  title: { en: string; ko: string }
  content: { en: string; ko: string }
  seoTitle: string
  seoDescription: string
  seoKeywords: string
}

const initialForm: ContentForm = {
  title: { en: '', ko: '' },
  content: { en: '', ko: '' },
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
}

const mockGeneratedContent = `# 겨울 스킨케어 루틴: 건조한 피부를 촉촉하게

겨울이 다가오면서 피부 관리가 더욱 중요해집니다. 건조한 공기와 난방으로 인해 피부가 쉽게 건조해지고 트러블이 생길 수 있기 때문입니다.

## 1. 클렌징은 순하게

겨울철에는 자극이 강한 클렌저 대신 **순한 클렌징 폼**을 사용하세요. 피부의 천연 유분을 지나치게 제거하지 않으면서도 깨끗하게 세안할 수 있습니다.

## 2. 토너로 수분 첫 단계

세안 직후 **하이드레이팅 토너**를 사용하면 피부에 수분을 빠르게 공급할 수 있습니다. 화장솜보다는 손으로 가볍게 패팅하는 것이 효과적입니다.

## 3. 세럼으로 집중 케어

**안티에이징 세럼**이나 **비타민 세럼**을 사용하여 피부 깊숙이 영양을 공급하세요. 특히 눈가와 입가 등 건조해지기 쉬운 부위에 집중적으로 발라주세요.

## 4. 크림으로 수분 잠그기

마지막으로 **보습 크림**으로 수분을 잠가주세요. 겨울에는 조금 더 리치한 텍스처의 크림을 선택하는 것이 좋습니다.

---

*글로우 뷰티에서 추천하는 겨울 스킨케어 제품을 만나보세요.*
`

export default function ContentStudioPage() {
  const [form, setForm] = useState<ContentForm>(initialForm)
  const [activeLang, setActiveLang] = useState<'ko' | 'en'>('ko')
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [seoScore, setSeoScore] = useState(0)

  const { contentKeywords } = mockData

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-4 h-4 text-green-500" />
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 40) return 'text-green-600 bg-green-100'
    if (difficulty < 60) return 'text-amber-600 bg-amber-100'
    return 'text-red-600 bg-red-100'
  }

  const handleGenerate = async () => {
    if (!selectedKeyword) return

    setIsGenerating(true)

    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    setForm(prev => ({
      ...prev,
      title: { ...prev.title, ko: `${selectedKeyword} 가이드 - 전문가 추천` },
      content: { ...prev.content, ko: mockGeneratedContent },
      seoTitle: `${selectedKeyword} | 글로우 뷰티`,
      seoDescription: `${selectedKeyword}에 대한 전문 가이드입니다. 글로우 뷰티의 추천 제품과 함께 알아보세요.`,
      seoKeywords: selectedKeyword,
    }))

    setSeoScore(78)
    setIsGenerating(false)
  }

  const calculateSeoScore = () => {
    let score = 0
    if (form.title.ko) score += 20
    if (form.content.ko && form.content.ko.length > 500) score += 30
    if (form.seoTitle) score += 15
    if (form.seoDescription) score += 15
    if (form.seoKeywords) score += 20
    return Math.min(score, 100)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">콘텐츠 스튜디오</h1>
          <p className="text-gray-600">AI로 SEO 최적화된 콘텐츠를 생성하세요</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {}}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            초안 저장
          </button>
          <button
            onClick={() => setShowPublishModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            발행하기
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Keyword Research Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-8">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-gray-400" />
              <h2 className="font-semibold text-gray-900">키워드 리서치</h2>
            </div>

            {/* Keyword Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="키워드 검색..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Trending Keywords */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                트렌딩 키워드
              </h3>
              <div className="space-y-2">
                {contentKeywords.map((kw) => (
                  <button
                    key={kw.keyword}
                    onClick={() => setSelectedKeyword(kw.keyword)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedKeyword === kw.keyword
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900 text-sm">{kw.keyword}</span>
                      {getTrendIcon(kw.trend)}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-500">
                        검색량: {kw.volume.toLocaleString()}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded ${getDifficultyColor(kw.difficulty)}`}>
                        난이도: {kw.difficulty}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!selectedKeyword || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  생성 중...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  AI 콘텐츠 생성
                </>
              )}
            </button>

            {/* SEO Score */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">SEO 점수</h3>
              <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`absolute left-0 top-0 h-full rounded-full transition-all ${
                    seoScore >= 80 ? 'bg-green-500' : seoScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${seoScore || calculateSeoScore()}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>개선 필요</span>
                <span className="font-semibold text-gray-900">{seoScore || calculateSeoScore()}/100</span>
                <span>최적화됨</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Language Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveLang('ko')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeLang === 'ko'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              한국어
            </button>
            <button
              onClick={() => setActiveLang('en')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeLang === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              English
            </button>
          </div>

          {/* Title */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              value={form.title[activeLang]}
              onChange={(e) => setForm(prev => ({
                ...prev,
                title: { ...prev.title, [activeLang]: e.target.value }
              }))}
              placeholder="콘텐츠 제목을 입력하세요"
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              본문
            </label>
            <MarkdownEditor
              value={form.content[activeLang]}
              onChange={(value) => setForm(prev => ({
                ...prev,
                content: { ...prev.content, [activeLang]: value }
              }))}
              placeholder="마크다운으로 콘텐츠를 작성하세요..."
              minHeight="400px"
            />
          </div>

          {/* SEO Fields */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">SEO 설정</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SEO 제목
                </label>
                <input
                  type="text"
                  value={form.seoTitle}
                  onChange={(e) => setForm(prev => ({ ...prev, seoTitle: e.target.value }))}
                  placeholder="검색 결과에 표시될 제목"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">권장: 50-60자</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  메타 설명
                </label>
                <textarea
                  value={form.seoDescription}
                  onChange={(e) => setForm(prev => ({ ...prev, seoDescription: e.target.value }))}
                  placeholder="검색 결과에 표시될 설명"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">권장: 150-160자</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  키워드
                </label>
                <input
                  type="text"
                  value={form.seoKeywords}
                  onChange={(e) => setForm(prev => ({ ...prev, seoKeywords: e.target.value }))}
                  placeholder="키워드1, 키워드2, 키워드3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publish Modal */}
      <CommerceModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        type="approval"
        title="콘텐츠 발행"
        message="콘텐츠를 발행합니다. 프로덕션 환경에서는 편집장 승인 후 발행됩니다."
      />
    </div>
  )
}
