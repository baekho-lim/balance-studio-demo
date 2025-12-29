'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ExternalLink, Trash2, Calendar, RefreshCw, Globe, FolderOpen } from 'lucide-react'

interface GeneratedSite {
  id: string
  slug: string
  inquiryId: string
  createdAt: string
  url: string
}

interface SiteConfig {
  name: { en: string; ko: string }
  template: string
  createdAt: string
}

interface SiteWithConfig extends GeneratedSite {
  config?: SiteConfig
}

export default function AdminSitesPage() {
  const [sites, setSites] = useState<SiteWithConfig[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSites()
  }, [])

  const fetchSites = async () => {
    try {
      setIsLoading(true)

      // Fetch sites registry
      const res = await fetch('/api/sites')
      if (!res.ok) throw new Error('Failed to fetch sites')
      const sitesData: GeneratedSite[] = await res.json()

      // Fetch config for each site
      const sitesWithConfig: SiteWithConfig[] = await Promise.all(
        sitesData.map(async (site) => {
          try {
            const configRes = await fetch(`/api/client-data?slug=${site.slug}&file=config`)
            if (configRes.ok) {
              const config = await configRes.json()
              return { ...site, config }
            }
          } catch {
            // Config fetch failed, continue without it
          }
          return site
        })
      )

      setSites(sitesWithConfig)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteSite = async (slug: string) => {
    if (!confirm('정말 이 사이트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return

    try {
      const res = await fetch(`/api/sites?slug=${slug}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete site')
      fetchSites()
    } catch (err) {
      alert('삭제 실패: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const templateLabels: Record<string, string> = {
    pilates: '필라테스/피트니스',
    restaurant: '레스토랑/카페',
    academy: '학원/교육',
    ecommerce: '쇼핑몰',
    portfolio: '포트폴리오',
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        Error: {error}
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif">생성된 사이트 관리</h1>
        <button
          onClick={fetchSites}
          className="p-2 text-secondary hover:text-primary transition-colors"
          title="새로고침"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {sites.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">생성된 사이트가 없습니다</h3>
          <p className="text-gray-500 mb-6">
            고객 문의에서 &quot;사이트 생성&quot; 버튼을 클릭하면 여기에 표시됩니다.
          </p>
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            문의 목록으로
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-secondary">사이트명</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-secondary">템플릿</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-secondary">생성일</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-secondary">URL</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-secondary">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sites.map((site) => (
                <tr key={site.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{site.config?.name?.ko || site.slug}</p>
                      <p className="text-sm text-gray-500">{site.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                      {templateLabels[site.config?.template || ''] || site.config?.template || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {formatDate(site.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {site.url}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={site.url}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        미리보기
                      </Link>
                      <Link
                        href={`/admin/inquiries/${site.inquiryId}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <FolderOpen className="w-4 h-4" />
                        문의
                      </Link>
                      <button
                        onClick={() => deleteSite(site.slug)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{sites.length}</p>
              <p className="text-sm text-gray-500">총 사이트</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">
                {sites.filter(s => {
                  const created = new Date(s.createdAt)
                  const now = new Date()
                  const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
                  return diffDays <= 7
                }).length}
              </p>
              <p className="text-sm text-gray-500">최근 7일</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">
                {new Set(sites.map(s => s.config?.template).filter(Boolean)).size}
              </p>
              <p className="text-sm text-gray-500">사용된 템플릿</p>
            </div>
          </div>
        </div>
      </div>

      {/* 안내 */}
      <div className="mt-8 p-6 bg-pastel-cream/30 rounded-lg">
        <h3 className="font-semibold mb-2">사이트 관리 안내</h3>
        <div className="text-sm text-secondary space-y-2">
          <p><strong>기능:</strong></p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li><strong>미리보기</strong>: 생성된 사이트를 새 탭에서 확인</li>
            <li><strong>문의</strong>: 해당 사이트의 원본 문의 내용 확인</li>
            <li><strong>삭제</strong>: 사이트 데이터 삭제 (복구 불가)</li>
          </ul>
          <p className="mt-4 text-gray-400">
            * 생성된 사이트는 아직 미리보기 모드입니다. 실제 배포를 위해서는 추가 설정이 필요합니다.
          </p>
        </div>
      </div>
    </div>
  )
}
