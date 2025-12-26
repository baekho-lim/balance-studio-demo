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
        <h3 className="font-semibold mb-2">How to Add/Edit Exhibitions</h3>
        <p className="text-sm text-secondary mb-4">
          Exhibition data is stored in <code className="bg-white px-1 rounded">src/data/exhibitions.json</code>.
          Changes require a Git commit to update the live site.
        </p>
        <ol className="text-sm text-secondary space-y-2 list-decimal list-inside">
          <li>Edit the JSON file with new exhibition data</li>
          <li>Include external links (gallery URL, Instagram) for SEO trust signals</li>
          <li>Commit and push to deploy changes</li>
        </ol>
      </div>
    </div>
  )
}
