import Link from 'next/link'
import { Plus, ExternalLink, Calendar, FileText, Star } from 'lucide-react'
import newsData from '@/data/news.json'
import { NewsArticle } from '@/types'

const news = newsData as NewsArticle[]

export default function AdminNewsPage() {
  const sortedNews = [...news].sort((a, b) => {
    // Featured first, then by date
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  })

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'press-release': return 'Press Release'
      case 'interview': return 'Interview'
      case 'review': return 'Review'
      case 'feature': return 'Feature'
      default: return type
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'press-release': return 'bg-pastel-sage/30 text-primary'
      case 'interview': return 'bg-pastel-lavender/30 text-primary'
      case 'review': return 'bg-pastel-cream/50 text-primary'
      case 'feature': return 'bg-pastel-pink/30 text-primary'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif">News & Press</h1>
        <Link
          href="/admin/news/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add News
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-secondary">Title</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-secondary">Type</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-secondary">Date</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-secondary">Exhibition</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedNews.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {article.featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                    <div>
                      <p className="font-medium">{article.title.en}</p>
                      {article.title.ko && (
                        <p className="text-sm text-secondary">{article.title.ko}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${getTypeColor(article.type)}`}>
                    {getTypeLabel(article.type)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <span>{article.publishDate}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {article.exhibition ? (
                    <Link
                      href={`/admin/exhibitions/${article.exhibition}`}
                      className="text-sm text-pastel-sage hover:text-primary flex items-center gap-1"
                    >
                      <FileText className="w-4 h-4" />
                      {article.exhibition}
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/news/${article.slug}`}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </Link>
                    <a
                      href={`/news/${article.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-secondary hover:text-primary flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-6 bg-pastel-cream/30 rounded-lg">
        <h3 className="font-semibold mb-2">뉴스/보도자료 관리 안내</h3>
        <p className="text-sm text-secondary mb-4">
          위의 "Add News" 버튼으로 새 뉴스를 추가하거나, 각 뉴스의 "Edit" 버튼을 클릭하여 수정할 수 있습니다.
          변경사항은 JSON 파일에 저장되며, Git 커밋 후 배포됩니다.
        </p>
        <div className="text-sm text-secondary space-y-2">
          <p><strong>뉴스 유형:</strong></p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li><strong>Press Release</strong>: 공식 보도자료</li>
            <li><strong>Interview</strong>: 작가 인터뷰</li>
            <li><strong>Review</strong>: 전시 리뷰</li>
            <li><strong>Feature</strong>: 특집 기사</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
