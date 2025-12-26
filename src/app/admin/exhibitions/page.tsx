import Link from 'next/link'
import { Plus, ExternalLink, Calendar, MapPin } from 'lucide-react'
import exhibitionsData from '@/data/exhibitions.json'
import { Exhibition } from '@/types'

const exhibitions = exhibitionsData as Exhibition[]

export default function AdminExhibitionsPage() {
  const sortedExhibitions = [...exhibitions].sort((a, b) => {
    if (a.status === 'current' && b.status !== 'current') return -1
    if (b.status === 'current' && a.status !== 'current') return 1
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif">Exhibitions</h1>
        <Link
          href="/admin/exhibitions/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Exhibition
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-secondary">Exhibition</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-secondary">Type</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-secondary">Venue</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-secondary">Date</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-secondary">Links</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedExhibitions.map((exhibition) => (
              <tr key={exhibition.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {exhibition.status === 'current' && (
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                    <div>
                      <p className="font-medium">{exhibition.title}</p>
                      {exhibition.titleKr && (
                        <p className="text-sm text-secondary">{exhibition.titleKr}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    exhibition.type === 'solo'
                      ? 'bg-pastel-sage/30 text-primary'
                      : 'bg-pastel-lavender/30 text-primary'
                  }`}>
                    {exhibition.type === 'solo' ? 'Solo' : 'Group'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span>{exhibition.venue || '-'}</span>
                  </div>
                  <p className="text-xs text-secondary">
                    {exhibition.city}{exhibition.country && `, ${exhibition.country}`}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <span>{exhibition.startDate}</span>
                  </div>
                  {exhibition.endDate && (
                    <p className="text-xs text-secondary">~ {exhibition.endDate}</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  {(exhibition.externalUrl || exhibition.links?.official) ? (
                    <a
                      href={exhibition.externalUrl || exhibition.links?.official}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-pastel-sage hover:text-primary"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Official
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">No links</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/exhibitions/${exhibition.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-6 bg-pastel-cream/30 rounded-lg">
        <h3 className="font-semibold mb-2">전시 관리 안내</h3>
        <p className="text-sm text-secondary mb-4">
          위의 "Add Exhibition" 버튼 또는 각 전시의 "Edit" 버튼을 클릭하여 수정할 수 있습니다.
          변경사항은 JSON 파일에 저장되며, Git 커밋 후 배포됩니다.
        </p>
        <div className="text-sm text-secondary space-y-2">
          <p><strong>SEO 신뢰도 향상 팁:</strong></p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li>갤러리 공식 웹사이트 URL 추가</li>
            <li>전시 공식 페이지 링크 추가</li>
            <li>주최/협력 기관의 인스타그램 링크 추가</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
