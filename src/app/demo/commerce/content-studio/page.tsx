'use client'

import { useState } from 'react'
import {
  Sparkles,
  Search,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Minus,
  Save,
  Clock,
  Send,
  RefreshCw,
  FileText,
  Users,
  AlertTriangle,
  X,
  CheckCircle2,
  Plus,
  Palette,
  Shirt,
  Sofa
} from 'lucide-react'
import MarkdownEditor from '@/components/admin/MarkdownEditor'
import mockData from '@/data/demo/commerce-mock-data.json'

interface ContentForm {
  title: { en: string; ko: string }
  content: { en: string; ko: string }
  seoTitle: string
  seoDescription: string
  seoKeywords: string
}

interface ContentPlanItem {
  id: string
  title: string
  keyword: string
  persona: string
  type: 'blog' | 'product' | 'guide'
  status: 'draft' | 'pending' | 'approved' | 'published'
  estimatedViews: number
  createdAt: Date
}

interface ApprovalEntry {
  id: string
  title: string
  type: string
  timestamp: Date
}

type Persona = 'beauty' | 'fashion' | 'furniture'

const initialForm: ContentForm = {
  title: { en: '', ko: '' },
  content: { en: '', ko: '' },
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
}

const personaConfig: Record<Persona, { name: string; icon: React.ReactNode; color: string; bgColor: string; keywords: string[] }> = {
  beauty: {
    name: '뷰티/화장품',
    icon: <Palette className="w-5 h-5" />,
    color: '#EC4899',
    bgColor: '#FCE7F3',
    keywords: ['스킨케어 루틴', '안티에이징 세럼', '수분 크림 추천', '선크림 비교', '클렌징 오일']
  },
  fashion: {
    name: '패션/의류',
    icon: <Shirt className="w-5 h-5" />,
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
    keywords: ['겨울 코트 스타일링', '데일리 룩', '오피스 캐주얼', '컬러 매칭 가이드', '트렌드 아이템']
  },
  furniture: {
    name: '고가 가구',
    icon: <Sofa className="w-5 h-5" />,
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    keywords: ['북유럽 인테리어', '프리미엄 소파 선택', '원목 테이블 관리', '조명 인테리어', '홈 오피스 가구']
  }
}

const contentTypes = [
  { value: 'blog', label: '블로그 포스트', description: 'SEO 최적화된 블로그 글' },
  { value: 'product', label: '상품 설명', description: '전환율 높은 상품 설명' },
  { value: 'guide', label: '가이드', description: '구매 가이드/비교 콘텐츠' },
]

export default function ContentStudioPage() {
  const [form, setForm] = useState<ContentForm>(initialForm)
  const [activeLang, setActiveLang] = useState<'ko' | 'en'>('ko')
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null)
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)
  const [selectedContentType, setSelectedContentType] = useState<'blog' | 'product' | 'guide'>('blog')
  const [customKeyword, setCustomKeyword] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [seoScore, setSeoScore] = useState(0)
  const [contentPlan, setContentPlan] = useState<ContentPlanItem[]>([])
  const [drafts, setDrafts] = useState<ContentPlanItem[]>([])
  const [approvalList, setApprovalList] = useState<ApprovalEntry[]>([])
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [activeView, setActiveView] = useState<'editor' | 'plan'>('plan')

  const { contentKeywords } = mockData

  // Get keywords based on persona or use default
  const displayKeywords = selectedPersona
    ? personaConfig[selectedPersona].keywords.map(kw => ({
        keyword: kw,
        volume: Math.floor(Math.random() * 50000) + 5000,
        difficulty: Math.floor(Math.random() * 60) + 20,
        trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
      }))
    : contentKeywords

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

  // Generate mock content based on keyword and persona
  const getMockContent = (keyword: string, persona: Persona | null) => {
    const personaName = persona ? personaConfig[persona].name : '일반'
    return `# ${keyword}: 완벽 가이드

${personaName} 카테고리에서 "${keyword}"는 매우 중요한 주제입니다. 이 가이드에서는 전문가의 시각으로 ${keyword}에 대해 상세히 알아보겠습니다.

## 1. ${keyword}이란?

${keyword}은(는) 많은 고객들이 관심을 가지고 있는 핵심 키워드입니다. 특히 ${personaName} 분야에서 높은 검색량을 보이고 있습니다.

## 2. 추천 제품

저희 스토어에서 ${keyword} 관련 인기 제품을 소개합니다:

- **베스트셀러 A** - 높은 고객 만족도
- **프리미엄 B** - 전문가 추천
- **가성비 C** - 입문자 추천

## 3. 전문가 팁

${keyword} 선택 시 다음 사항을 고려하세요:

1. 본인의 니즈에 맞는 제품 선택
2. 리뷰와 평점 확인
3. 가격 대비 품질 비교

---

*글로우 스토어에서 더 많은 ${keyword} 관련 제품을 만나보세요.*
`
  }

  const handleGenerate = async () => {
    const keyword = customKeyword || selectedKeyword
    if (!keyword) return

    setIsGenerating(true)

    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    const content = getMockContent(keyword, selectedPersona)

    setForm(prev => ({
      ...prev,
      title: { ...prev.title, ko: `${keyword} 완벽 가이드 - 전문가 추천` },
      content: { ...prev.content, ko: content },
      seoTitle: `${keyword} | 글로우 스토어`,
      seoDescription: `${keyword}에 대한 전문 가이드입니다. 글로우 스토어의 추천 제품과 함께 알아보세요.`,
      seoKeywords: keyword,
    }))

    setSeoScore(78)
    setIsGenerating(false)
    setActiveView('editor')
  }

  // Generate Content Plan
  const handleGeneratePlan = async () => {
    if (!selectedPersona) return

    setIsGeneratingPlan(true)

    await new Promise(resolve => setTimeout(resolve, 1500))

    const keywords = personaConfig[selectedPersona].keywords
    const newPlan: ContentPlanItem[] = keywords.map((kw, index) => ({
      id: `plan-${Date.now()}-${index}`,
      title: `${kw} 완벽 가이드`,
      keyword: kw,
      persona: personaConfig[selectedPersona].name,
      type: ['blog', 'product', 'guide'][index % 3] as 'blog' | 'product' | 'guide',
      status: 'draft',
      estimatedViews: Math.floor(Math.random() * 5000) + 1000,
      createdAt: new Date()
    }))

    setContentPlan(newPlan)
    setIsGeneratingPlan(false)
  }

  // Create draft from plan item
  const handleCreateDraft = (item: ContentPlanItem) => {
    setDrafts(prev => [...prev, { ...item, status: 'draft' }])
    setContentPlan(prev => prev.filter(p => p.id !== item.id))

    setToastMessage(`"${item.title}" 초안이 생성되었습니다`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // Request approval - HITL
  const handleRequestApproval = (item: ContentPlanItem) => {
    const newEntry: ApprovalEntry = {
      id: item.id,
      title: item.title,
      type: item.type,
      timestamp: new Date()
    }

    setApprovalList(prev => [newEntry, ...prev])
    setDrafts(prev => prev.map(d =>
      d.id === item.id ? { ...d, status: 'pending' } : d
    ))

    setToastMessage(`"${item.title}" 승인 요청됨`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const dismissApproval = (id: string) => {
    setApprovalList(prev => prev.filter(entry => entry.id !== id))
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

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-600',
      pending: 'bg-amber-100 text-amber-700',
      approved: 'bg-blue-100 text-blue-700',
      published: 'bg-green-100 text-green-700',
    }
    const labels: Record<string, string> = {
      draft: '초안',
      pending: '승인 대기',
      approved: '승인됨',
      published: '발행됨',
    }
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  return (
    <div className="p-8">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="font-medium text-green-800">{toastMessage}</p>
            <button
              onClick={() => setShowToast(false)}
              className="text-green-400 hover:text-green-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Prototype Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          <strong>⚠️ Prototype:</strong> 이 페이지는 프로토타입입니다.
          실제 AI 콘텐츠 생성 및 발행 기능은 구현되어 있지 않습니다. 모든 결과는 mock 데이터입니다.
        </p>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">콘텐츠 스튜디오</h1>
          <p className="text-gray-600">AI로 SEO 최적화된 콘텐츠를 생성하세요</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('plan')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors ${
              activeView === 'plan'
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            콘텐츠 플랜
          </button>
          <button
            onClick={() => setActiveView('editor')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors ${
              activeView === 'editor'
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            에디터
          </button>
        </div>
      </div>

      {/* Content Plan View */}
      {activeView === 'plan' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Persona & Keyword Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Persona Selection */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-900">페르소나 선택</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {(Object.keys(personaConfig) as Persona[]).map((persona) => {
                  const config = personaConfig[persona]
                  return (
                    <button
                      key={persona}
                      onClick={() => {
                        setSelectedPersona(persona)
                        setSelectedKeyword(null)
                      }}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedPersona === persona
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 mx-auto"
                        style={{ backgroundColor: config.bgColor, color: config.color }}
                      >
                        {config.icon}
                      </div>
                      <p className="font-medium text-gray-900 text-center">{config.name}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Keyword Input */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-900">키워드 입력</h2>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={customKeyword}
                  onChange={(e) => setCustomKeyword(e.target.value)}
                  placeholder="직접 키워드 입력..."
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={selectedContentType}
                  onChange={(e) => setSelectedContentType(e.target.value as 'blog' | 'product' | 'guide')}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {contentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Suggested Keywords */}
              {selectedPersona && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">추천 키워드:</p>
                  <div className="flex flex-wrap gap-2">
                    {displayKeywords.map((kw) => (
                      <button
                        key={kw.keyword}
                        onClick={() => {
                          setSelectedKeyword(kw.keyword)
                          setCustomKeyword(kw.keyword)
                        }}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                          selectedKeyword === kw.keyword
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {kw.keyword}
                        {getTrendIcon(kw.trend)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Generate Plan Button */}
            <button
              onClick={handleGeneratePlan}
              disabled={!selectedPersona || isGeneratingPlan}
              className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPlan ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  콘텐츠 플랜 생성 중...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  콘텐츠 플랜 생성
                </>
              )}
            </button>

            {/* Content Plan List */}
            {contentPlan.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">생성된 콘텐츠 플랜</h3>
                <div className="space-y-3">
                  {contentPlan.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{item.keyword}</span>
                          <span className="text-xs px-1.5 py-0.5 bg-gray-200 rounded">{item.type}</span>
                          <span className="text-xs text-gray-500">예상 조회수: {item.estimatedViews.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCreateDraft(item)}
                          className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          초안 생성
                        </button>
                        <button
                          onClick={() => handleRequestApproval(item)}
                          className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                          승인 요청
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Drafts List */}
            {drafts.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">저장된 초안</h3>
                <div className="space-y-3">
                  {drafts.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">{item.title}</p>
                          {getStatusBadge(item.status)}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{item.keyword} · {item.type}</p>
                      </div>
                      {item.status === 'draft' && (
                        <button
                          onClick={() => handleRequestApproval(item)}
                          className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                          승인 요청
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Approval Queue */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-semibold text-gray-900">승인 대기</h2>
              {approvalList.length > 0 && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                  {approvalList.length}
                </span>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 min-h-[300px]">
              {approvalList.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <CheckCircle2 className="w-12 h-12 text-gray-200 mb-3" />
                  <p className="text-sm text-gray-500">
                    대기 중인 승인 요청이 없습니다
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    콘텐츠 플랜에서 승인 요청을 하면 여기에 표시됩니다
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {approvalList.map((entry) => (
                    <div
                      key={`${entry.id}-${entry.timestamp.getTime()}`}
                      className="p-3 bg-amber-50 border border-amber-100 rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{entry.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500 capitalize">{entry.type}</span>
                            <span className="text-xs text-amber-600">
                              {entry.timestamp.toLocaleTimeString('ko-KR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => dismissApproval(entry.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
                        <Clock className="w-3 h-3" />
                        <span>편집장 승인 대기 중</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* HITL Info */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>HITL Demo:</strong> 프로덕션 환경에서는 모든 콘텐츠가 편집장 승인 후 발행됩니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Editor View */}
      {activeView === 'editor' && (
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
                  value={customKeyword}
                  onChange={(e) => setCustomKeyword(e.target.value)}
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
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {displayKeywords.map((kw) => (
                    <button
                      key={kw.keyword}
                      onClick={() => {
                        setSelectedKeyword(kw.keyword)
                        setCustomKeyword(kw.keyword)
                      }}
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
                disabled={(!selectedKeyword && !customKeyword) || isGenerating}
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
            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  if (form.title.ko) {
                    const newDraft: ContentPlanItem = {
                      id: `draft-${Date.now()}`,
                      title: form.title.ko,
                      keyword: form.seoKeywords || selectedKeyword || customKeyword || '',
                      persona: selectedPersona ? personaConfig[selectedPersona].name : '일반',
                      type: selectedContentType,
                      status: 'draft',
                      estimatedViews: Math.floor(Math.random() * 5000) + 1000,
                      createdAt: new Date()
                    }
                    setDrafts(prev => [...prev, newDraft])
                    setToastMessage('초안이 저장되었습니다')
                    setShowToast(true)
                    setTimeout(() => setShowToast(false), 3000)
                  }
                }}
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
                승인 요청
              </button>
            </div>

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
      )}

      {/* Approval Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowPublishModal(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">승인 요청</h3>
                <p className="text-sm text-gray-500">콘텐츠 발행을 위한 승인을 요청합니다</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              프로덕션 환경에서는 편집장 승인 후 콘텐츠가 발행됩니다.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPublishModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={() => {
                  if (form.title.ko) {
                    const newEntry: ApprovalEntry = {
                      id: `approval-${Date.now()}`,
                      title: form.title.ko,
                      type: selectedContentType,
                      timestamp: new Date()
                    }
                    setApprovalList(prev => [newEntry, ...prev])
                    setToastMessage('승인 요청되었습니다')
                    setShowToast(true)
                    setTimeout(() => setShowToast(false), 3000)
                  }
                  setShowPublishModal(false)
                }}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                승인 요청
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
