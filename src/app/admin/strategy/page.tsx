'use client'

import { useState } from 'react'
import {
  Target,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Globe,
  Search,
  Bot,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react'

// 10년 로드맵 데이터
const roadmapData = [
  {
    period: '2024-2025',
    title: '동남아 시장 진출',
    location: '베트남 호치민',
    status: 'current',
    milestones: [
      { name: 'Tomura Gallery 솔로전 개최', done: true },
      { name: 'Vietnam Art Fair 2024 참가', done: true },
      { name: 'Vietnam Art Fair 2025 참가', done: false },
      { name: '베트남 컬렉터 네트워크 구축', done: false },
    ]
  },
  {
    period: '2025-2027',
    title: '아시아 주요 도시 확장',
    location: '도쿄, 싱가포르, 홍콩',
    status: 'upcoming',
    milestones: [
      { name: '일본 갤러리 파트너십', done: false },
      { name: '싱가포르 아트페어 진출', done: false },
      { name: '홍콩 Art Basel 사이드 이벤트', done: false },
    ]
  },
  {
    period: '2027-2030',
    title: '유럽 진출',
    location: '런던, 파리, 베를린',
    status: 'future',
    milestones: [
      { name: '유럽 갤러리 대표 작가', done: false },
      { name: 'Frieze London 참가', done: false },
      { name: 'FIAC Paris 참가', done: false },
    ]
  },
  {
    period: '2030-2034',
    title: '미국 진출',
    location: '뉴욕 (Gagosian/Pace/Zwirner)',
    status: 'future',
    milestones: [
      { name: '미국 메가 갤러리 계약', done: false },
      { name: 'Art Basel Miami 참가', done: false },
      { name: '뉴욕 솔로전 개최', done: false },
    ]
  },
]

// SEO/AEO/LLM 점수 데이터
const strategyScores = {
  seo: { score: 87, target: 88, change: '+9', color: 'green' },
  aeo: { score: 89, target: 82, change: '+21', color: 'green' },
  llm: { score: 91, target: 87, change: '+36', color: 'green' },
}

// Phase 히스토리 데이터
const phaseHistory = [
  {
    phase: 'Phase 1',
    title: 'SEO/AEO/LLM 최적화',
    date: '2025-12-26',
    status: 'completed',
    items: [
      'JsonLd.tsx 확장',
      'hreflang/canonical 추가',
      'robots.txt AI 크롤러 허용',
    ]
  },
  {
    phase: 'Phase 2',
    title: '글로벌 아트 마켓 진출',
    date: '2025-12-26',
    status: 'completed',
    items: [
      '전시 시스템 (/exhibitions)',
      '뉴스 시스템 (/news)',
      '파트너십 페이지 (/partnership)',
      'i18n 16개 언어 지원',
    ]
  },
  {
    phase: 'Phase 3',
    title: 'FAQ + Admin 시스템',
    date: '2025-12-26',
    status: 'completed',
    items: [
      'FAQ 페이지 (/faq)',
      'Admin 시스템 비밀번호 보호',
      'Exhibition 타입 확장',
    ]
  },
  {
    phase: 'Phase 4',
    title: 'LLM Citation 최적화',
    date: '2025-12-26',
    status: 'completed',
    items: [
      'artist.json externalIds, affiliations 추가',
      'JsonLd.tsx sameAs 동적 생성',
      'About 페이지 Semantic Chunking',
      'PersonJsonLd.tsx 컴포넌트 생성',
      'llm-context.json, wikidata-ready.json 생성',
    ]
  },
  {
    phase: 'Phase 9',
    title: '어드민 시스템 확장',
    date: '2025-12-26',
    status: 'completed',
    items: [
      'FAQ 어드민 페이지 (/admin/faq)',
      'SEO Status 대시보드 (/admin/seo)',
      'Cloudinary MCP 서버 설정',
      'Cloudinary 환경 변수 추가',
    ]
  },
  {
    phase: 'Phase 10',
    title: '미디어 라이브러리',
    date: '예정',
    status: 'pending',
    items: [
      '/admin/media 페이지 생성',
      '이미지 목록 표시 및 필터링',
      'Cloudinary 연동',
      '드래그 앤 드롭 업로드',
    ]
  },
]

// 대기 중인 수동 작업
const pendingManualTasks = [
  { task: 'Wikidata 엔트리 생성', priority: 'P1', effect: '외부 Entity +30' },
  { task: 'Google Knowledge Panel Claim', priority: 'P1', effect: '지식 패널 +20' },
  { task: '소셜 미디어 프로필 최적화', priority: 'P2', effect: 'sameAs 강화' },
  { task: 'Getty ULAN 신청', priority: 'P3', effect: '미술가 권위 DB' },
]

export default function AdminStrategyPage() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>('Phase 9')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-blue-500'
      case 'upcoming': return 'bg-yellow-500'
      case 'future': return 'bg-gray-300'
      case 'completed': return 'bg-green-500'
      case 'pending': return 'bg-gray-400'
      default: return 'bg-gray-300'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'current': return <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">현재 진행</span>
      case 'upcoming': return <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded">다음 단계</span>
      case 'future': return <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">장기 목표</span>
      case 'completed': return <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">완료</span>
      case 'pending': return <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">대기</span>
      default: return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif">Strategy Dashboard</h1>
        <p className="text-secondary mt-1">10년 로드맵 및 SEO/AEO/LLM 전략 현황</p>
      </div>

      {/* SEO/AEO/LLM Score Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold">SEO 점수</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-blue-600">{strategyScores.seo.score}</span>
            <span className="text-sm text-secondary">/ 100</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">{strategyScores.seo.change}</span>
            <span className="text-xs text-secondary">목표: {strategyScores.seo.target}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold">AEO 점수</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-purple-600">{strategyScores.aeo.score}</span>
            <span className="text-sm text-secondary">/ 100</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">{strategyScores.aeo.change}</span>
            <span className="text-xs text-secondary">목표: {strategyScores.aeo.target} ✓</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">LLM Citation</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-green-600">{strategyScores.llm.score}</span>
            <span className="text-sm text-secondary">/ 100</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">{strategyScores.llm.change}</span>
            <span className="text-xs text-secondary">목표: {strategyScores.llm.target} ✓</span>
          </div>
        </div>
      </div>

      {/* 10-Year Roadmap */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Target className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">10년 로드맵 (2024-2034)</h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-6">
            {roadmapData.map((item, idx) => (
              <div key={idx} className="relative pl-12">
                {/* Timeline dot */}
                <div className={`absolute left-2.5 w-3 h-3 rounded-full ${getStatusColor(item.status)} ring-4 ring-white`} />

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-secondary">{item.period}</span>
                      <h3 className="font-semibold">{item.title}</h3>
                      {getStatusBadge(item.status)}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-secondary">
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {item.milestones.map((milestone, mIdx) => (
                      <div key={mIdx} className="flex items-center gap-2 text-sm">
                        {milestone.done ? (
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                        <span className={milestone.done ? 'text-primary' : 'text-secondary'}>
                          {milestone.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phase History & Pending Tasks */}
      <div className="grid grid-cols-2 gap-6">
        {/* Phase History */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Phase 히스토리</h2>
          </div>

          <div className="space-y-2">
            {phaseHistory.map((phase) => (
              <div key={phase.phase} className="border border-gray-100 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedPhase(expandedPhase === phase.phase ? null : phase.phase)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(phase.status)}`} />
                    <span className="font-medium">{phase.phase}</span>
                    <span className="text-sm text-secondary">{phase.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(phase.status)}
                    {expandedPhase === phase.phase ? (
                      <ChevronUp className="w-4 h-4 text-secondary" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-secondary" />
                    )}
                  </div>
                </button>

                {expandedPhase === phase.phase && (
                  <div className="px-4 pb-3 border-t border-gray-100 bg-gray-50">
                    <div className="pt-3 space-y-1">
                      <div className="text-xs text-secondary mb-2">{phase.date}</div>
                      {phase.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          {phase.status === 'completed' ? (
                            <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          )}
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pending Manual Tasks */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">대기 중인 수동 작업</h2>
          </div>

          <div className="space-y-3">
            {pendingManualTasks.map((task, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 text-xs rounded font-medium ${
                    task.priority === 'P1' ? 'bg-red-100 text-red-700' :
                    task.priority === 'P2' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {task.priority}
                  </span>
                  <span className="font-medium">{task.task}</span>
                </div>
                <span className="text-sm text-secondary">{task.effect}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>참고:</strong> 위 작업들은 코드로 자동화할 수 없으며, 각 플랫폼에서 직접 수행해야 합니다.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="https://www.wikidata.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <ExternalLink className="w-3 h-3" />
              Wikidata
            </a>
            <a
              href="https://support.google.com/knowledgepanel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <ExternalLink className="w-3 h-3" />
              Knowledge Panel
            </a>
          </div>
        </div>
      </div>

      {/* Documentation Links */}
      <div className="bg-pastel-cream/30 rounded-lg p-6">
        <h3 className="font-semibold mb-3">관련 문서</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-medium mb-1">SEO 스코어카드</div>
            <code className="text-xs text-secondary">/docs/seo-scorecard.md</code>
          </div>
          <div>
            <div className="font-medium mb-1">Phase 9 상세</div>
            <code className="text-xs text-secondary">/docs/phase9-admin-system-enhancement.md</code>
          </div>
          <div>
            <div className="font-medium mb-1">Wikidata 가이드</div>
            <code className="text-xs text-secondary">/docs/wikidata-submission-guide.md</code>
          </div>
        </div>
      </div>
    </div>
  )
}
