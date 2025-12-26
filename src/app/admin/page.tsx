import Link from 'next/link'
import { Calendar, HelpCircle, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react'
import exhibitionsData from '@/data/exhibitions.json'
import faqData from '@/data/faq.json'
import { Exhibition } from '@/types'

const exhibitions = exhibitionsData as Exhibition[]

export default function AdminDashboard() {
  const currentExhibitions = exhibitions.filter((e) => e.status === 'current')
  const pastExhibitions = exhibitions.filter((e) => e.status === 'past')
  const exhibitionsWithLinks = exhibitions.filter((e) => e.links?.official || e.externalUrl)

  return (
    <div>
      <h1 className="text-3xl font-serif mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-pastel-sage/30 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{exhibitions.length}</p>
              <p className="text-secondary text-sm">Total Exhibitions</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4 text-sm">
            <span className="text-green-600">{currentExhibitions.length} Current</span>
            <span className="text-gray-500">{pastExhibitions.length} Past</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-pastel-lavender/30 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{faqData.length}</p>
              <p className="text-secondary text-sm">FAQ Items</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-secondary">3 languages supported</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-pastel-cream/50 rounded-lg flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{exhibitionsWithLinks.length}</p>
              <p className="text-secondary text-sm">External Links</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-green-600">SEO Trust Signals Active</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          href="/admin/exhibitions"
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-primary/30 transition-colors group"
        >
          <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
            Manage Exhibitions
          </h3>
          <p className="text-secondary text-sm">
            Add, edit, or remove exhibition data and external links
          </p>
        </Link>

        <Link
          href="/admin/faq"
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-primary/30 transition-colors group"
        >
          <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
            Manage FAQ
          </h3>
          <p className="text-secondary text-sm">
            Update frequently asked questions and answers
          </p>
        </Link>
      </div>

      {/* Current Exhibition */}
      {currentExhibitions.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="font-semibold mb-4">Current Exhibition</h2>
          {currentExhibitions.map((exhibition) => (
            <div key={exhibition.id} className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium">{exhibition.title}</h3>
              <p className="text-secondary text-sm">{exhibition.titleKr}</p>
              <p className="text-sm mt-2">
                {exhibition.venue} · {exhibition.city}, {exhibition.country}
              </p>
              <p className="text-sm text-secondary">
                {exhibition.startDate} ~ {exhibition.endDate}
              </p>
              {exhibition.externalUrl && (
                <a
                  href={exhibition.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-pastel-sage hover:text-primary mt-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Official Page
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SEO Status */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="font-semibold mb-4">SEO Trust Signals</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm">FAQPage Schema Active (7 items)</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm">ExhibitionEvent Schema Active ({exhibitions.length} events)</span>
          </div>
          <div className="flex items-center gap-3">
            {exhibitionsWithLinks.length > 0 ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-500" />
            )}
            <span className="text-sm">
              External Authority Links ({exhibitionsWithLinks.length} exhibitions)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm">Person Schema with Entity Disambiguation</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <a
            href="https://search.google.com/test/rich-results"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-pastel-sage hover:text-primary"
          >
            Test with Google Rich Results →
          </a>
        </div>
      </div>
    </div>
  )
}
