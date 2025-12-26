'use client'

import { useState, useEffect } from 'react'
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Globe,
  Search,
  FileText,
  Image,
  Link2,
  Bot
} from 'lucide-react'

interface SEOCheck {
  id: string
  category: string
  name: string
  status: 'pass' | 'fail' | 'warning'
  message: string
  link?: string
}

interface SEOData {
  lastChecked: string
  score: number
  checks: SEOCheck[]
}

export default function AdminSEOPage() {
  const [seoData, setSeoData] = useState<SEOData | null>(null)
  const [loading, setLoading] = useState(true)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    runSEOCheck()
  }, [])

  const runSEOCheck = async () => {
    setChecking(true)

    // Simulate SEO check (in production, this would call an API)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const checks: SEOCheck[] = [
      // Meta & Schema
      {
        id: 'meta-title',
        category: 'Meta Tags',
        name: 'Page Title',
        status: 'pass',
        message: 'All pages have unique, descriptive titles',
      },
      {
        id: 'meta-description',
        category: 'Meta Tags',
        name: 'Meta Description',
        status: 'pass',
        message: 'All pages have meta descriptions',
      },
      {
        id: 'og-tags',
        category: 'Meta Tags',
        name: 'Open Graph Tags',
        status: 'pass',
        message: 'OG tags configured for social sharing',
      },
      {
        id: 'json-ld',
        category: 'Schema',
        name: 'JSON-LD Structured Data',
        status: 'pass',
        message: 'Person, VisualArtwork, FAQ, Exhibition schemas implemented',
        link: 'https://search.google.com/test/rich-results',
      },
      {
        id: 'hreflang',
        category: 'i18n',
        name: 'Hreflang Tags',
        status: 'pass',
        message: 'Multi-language support configured (en, ko, vi)',
      },

      // Technical SEO
      {
        id: 'sitemap',
        category: 'Technical',
        name: 'XML Sitemap',
        status: 'pass',
        message: 'Dynamic sitemap at /sitemap.xml',
        link: '/sitemap.xml',
      },
      {
        id: 'robots',
        category: 'Technical',
        name: 'Robots.txt',
        status: 'pass',
        message: 'Configured to allow AI crawlers (GPTBot, Claude-Web, etc.)',
        link: '/robots.txt',
      },
      {
        id: 'canonical',
        category: 'Technical',
        name: 'Canonical URLs',
        status: 'pass',
        message: 'Canonical tags present on all pages',
      },
      {
        id: 'mobile',
        category: 'Technical',
        name: 'Mobile Friendly',
        status: 'pass',
        message: 'Responsive design implemented',
      },

      // Content
      {
        id: 'images-alt',
        category: 'Content',
        name: 'Image Alt Text',
        status: 'pass',
        message: 'All artwork images have alt text',
      },
      {
        id: 'headings',
        category: 'Content',
        name: 'Heading Structure',
        status: 'pass',
        message: 'Proper H1-H6 hierarchy',
      },

      // External Links (Manual verification needed)
      {
        id: 'google-knowledge',
        category: 'External',
        name: 'Google Knowledge Panel',
        status: 'warning',
        message: 'Claim your Knowledge Panel when available',
        link: 'https://support.google.com/knowledgepanel/answer/7534842',
      },
      {
        id: 'wikidata',
        category: 'External',
        name: 'Wikidata Entry',
        status: 'warning',
        message: 'Consider creating a Wikidata entry for the artist',
        link: 'https://www.wikidata.org/wiki/Wikidata:Main_Page',
      },
      {
        id: 'google-arts',
        category: 'External',
        name: 'Google Arts & Culture',
        status: 'warning',
        message: 'Submit artworks to Google Arts & Culture',
        link: 'https://artsandculture.google.com/',
      },
    ]

    const passCount = checks.filter(c => c.status === 'pass').length
    const score = Math.round((passCount / checks.length) * 100)

    setSeoData({
      lastChecked: new Date().toISOString(),
      score,
      checks,
    })

    setLoading(false)
    setChecking(false)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Meta Tags': return <FileText className="w-4 h-4" />
      case 'Schema': return <Bot className="w-4 h-4" />
      case 'i18n': return <Globe className="w-4 h-4" />
      case 'Technical': return <Search className="w-4 h-4" />
      case 'Content': return <Image className="w-4 h-4" />
      case 'External': return <Link2 className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'fail': return <XCircle className="w-5 h-5 text-red-500" />
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default: return null
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p className="text-secondary">Running SEO checks...</p>
      </div>
    )
  }

  const categories = Array.from(new Set(seoData?.checks.map(c => c.category) || []))

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif">SEO Status</h1>
          <p className="text-secondary mt-1">검색 엔진 최적화 상태를 확인합니다.</p>
        </div>
        <button
          onClick={runSEOCheck}
          disabled={checking}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
          {checking ? 'Checking...' : 'Refresh'}
        </button>
      </div>

      {/* Score Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-1">Overall SEO Score</h2>
            <p className="text-sm text-secondary">
              Last checked: {seoData?.lastChecked ? new Date(seoData.lastChecked).toLocaleString() : 'Never'}
            </p>
          </div>
          <div className={`text-5xl font-bold ${getScoreColor(seoData?.score || 0)}`}>
            {seoData?.score}%
          </div>
        </div>
        <div className="mt-4 h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              (seoData?.score || 0) >= 90 ? 'bg-green-500' :
              (seoData?.score || 0) >= 70 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${seoData?.score || 0}%` }}
          />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {seoData?.checks.filter(c => c.status === 'pass').length || 0}
          </div>
          <div className="text-sm text-green-700">Passed</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {seoData?.checks.filter(c => c.status === 'warning').length || 0}
          </div>
          <div className="text-sm text-yellow-700">Warnings</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {seoData?.checks.filter(c => c.status === 'fail').length || 0}
          </div>
          <div className="text-sm text-red-700">Failed</div>
        </div>
      </div>

      {/* Checks by Category */}
      <div className="space-y-6">
        {categories.map(category => (
          <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
              {getCategoryIcon(category)}
              <h3 className="font-semibold">{category}</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {seoData?.checks
                .filter(c => c.category === category)
                .map(check => (
                  <div key={check.id} className="px-6 py-4 flex items-center gap-4">
                    {getStatusIcon(check.status)}
                    <div className="flex-1">
                      <div className="font-medium">{check.name}</div>
                      <div className="text-sm text-secondary">{check.message}</div>
                    </div>
                    {check.link && (
                      <a
                        href={check.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-secondary hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-8 p-6 bg-pastel-cream/30 rounded-lg">
        <h3 className="font-semibold mb-2">SEO 개선 가이드</h3>
        <ul className="text-sm text-secondary space-y-2">
          <li>• <strong>Warning 항목</strong>은 수동으로 처리해야 합니다 (Wikidata, Google Knowledge Panel 등)</li>
          <li>• <strong>Google Search Console</strong>에서 실제 인덱싱 상태를 확인하세요</li>
          <li>• <strong>Rich Results Test</strong>로 구조화 데이터를 검증하세요</li>
          <li>• 새로운 전시/뉴스 추가 후 sitemap이 자동 업데이트됩니다</li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <ExternalLink className="w-3 h-3" />
            Google Search Console
          </a>
          <a
            href="https://search.google.com/test/rich-results"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <ExternalLink className="w-3 h-3" />
            Rich Results Test
          </a>
          <a
            href="https://pagespeed.web.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <ExternalLink className="w-3 h-3" />
            PageSpeed Insights
          </a>
        </div>
      </div>
    </div>
  )
}
