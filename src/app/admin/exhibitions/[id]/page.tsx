'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import exhibitionsData from '@/data/exhibitions.json'
import { Exhibition } from '@/types'

const exhibitions = exhibitionsData as Exhibition[]

export default function ExhibitionEditPage() {
  const params = useParams()
  const exhibitionId = params.id as string
  const exhibition = exhibitions.find((e) => e.id === exhibitionId)
  const [copied, setCopied] = useState(false)

  if (!exhibition) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-serif mb-4">Exhibition not found</h1>
        <Link href="/admin/exhibitions" className="text-primary hover:underline">
          Back to Exhibitions
        </Link>
      </div>
    )
  }

  const jsonSnippet = JSON.stringify(exhibition, null, 2)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/exhibitions"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif">{exhibition.title}</h1>
          {exhibition.titleKr && (
            <p className="text-secondary">{exhibition.titleKr}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Exhibition Details */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="font-semibold mb-4">Basic Information</h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-secondary">ID</dt>
                <dd className="font-mono text-sm">{exhibition.id}</dd>
              </div>
              <div>
                <dt className="text-sm text-secondary">Type</dt>
                <dd className="capitalize">{exhibition.type}</dd>
              </div>
              <div>
                <dt className="text-sm text-secondary">Status</dt>
                <dd className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    exhibition.status === 'current' ? 'bg-green-500' :
                    exhibition.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-400'
                  }`}></span>
                  <span className="capitalize">{exhibition.status}</span>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-secondary">Venue</dt>
                <dd>{exhibition.venue || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm text-secondary">Location</dt>
                <dd>{exhibition.city}, {exhibition.country}</dd>
              </div>
              <div>
                <dt className="text-sm text-secondary">Dates</dt>
                <dd>{exhibition.startDate} ~ {exhibition.endDate || 'Ongoing'}</dd>
              </div>
            </dl>
          </div>

          {/* External Links */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="font-semibold mb-4">External Links (SEO Trust Signals)</h2>
            <div className="space-y-3">
              {exhibition.externalUrl && (
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Official Exhibition Page</p>
                    <p className="text-xs text-secondary truncate max-w-xs">{exhibition.externalUrl}</p>
                  </div>
                  <a
                    href={exhibition.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-green-600" />
                  </a>
                </div>
              )}
              {exhibition.links?.gallery && (
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Gallery Website</p>
                    <p className="text-xs text-secondary truncate max-w-xs">{exhibition.links.gallery}</p>
                  </div>
                  <a
                    href={exhibition.links.gallery}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                  </a>
                </div>
              )}
              {!exhibition.externalUrl && !exhibition.links?.gallery && (
                <p className="text-sm text-gray-400 p-3 bg-gray-50 rounded-lg">
                  No external links configured. Add links to improve SEO trust signals.
                </p>
              )}
            </div>
          </div>

          {/* Organizers */}
          {exhibition.organizers && exhibition.organizers.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="font-semibold mb-4">Organizers</h2>
              <div className="space-y-3">
                {exhibition.organizers.map((org, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{org.name}</p>
                      {org.nameKr && <p className="text-sm text-secondary">{org.nameKr}</p>}
                      <p className="text-xs text-pastel-sage capitalize">{org.role}</p>
                    </div>
                    {org.url && (
                      <a
                        href={org.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-secondary" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* JSON Preview */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">JSON Data</h2>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto text-xs max-h-[600px]">
            {jsonSnippet}
          </pre>
          <p className="text-xs text-secondary mt-4">
            To edit this exhibition, modify the JSON in <code className="bg-gray-100 px-1 rounded">src/data/exhibitions.json</code> and commit the changes.
          </p>
        </div>
      </div>
    </div>
  )
}
