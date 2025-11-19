'use client'

import Link from 'next/link'
import AuthGuard from '@/components/admin/AuthGuard'

/**
 * Admin Dashboard - Central hub for managing site content
 *
 * Password-protected admin panel for managing:
 * - Hero images (home + catalog)
 * - Postcards selection
 * - Future: Exhibitions, artworks, etc.
 */
export default function AdminDashboard() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-serif mb-2">Admin Dashboard</h1>
          <p className="text-secondary mb-12">사이트 콘텐츠 관리</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resources Management - Visual Selection */}
            <Link
              href="/admin/resources"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-3">🎨</div>
              <h2 className="text-xl font-medium mb-2">Resources</h2>
              <p className="text-sm text-secondary">
                Visual selection for hero & catalog images
              </p>
              <p className="text-xs text-secondary mt-2">
                히어로 및 카탈로그 이미지 시각적 선택
              </p>
            </Link>

            {/* Hero Image Management - Legacy */}
            <Link
              href="/admin/hero"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow opacity-50"
            >
              <div className="text-3xl mb-3">🖼️</div>
              <h2 className="text-xl font-medium mb-2">Hero Images (Legacy)</h2>
              <p className="text-sm text-secondary">
                Dropdown-based hero image management
              </p>
              <p className="text-xs text-secondary mt-2">
                드롭다운 방식 히어로 이미지 관리
              </p>
            </Link>

            {/* Postcard Management */}
            <Link
              href="/admin/postcards"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow opacity-50 cursor-not-allowed pointer-events-none"
            >
              <div className="text-3xl mb-3">📮</div>
              <h2 className="text-xl font-medium mb-2">Postcards</h2>
              <p className="text-sm text-secondary">
                Select and order artworks for postcards
              </p>
              <p className="text-xs text-secondary mt-2">
                포스트카드 작품 선택 및 순서 관리 (Coming Soon)
              </p>
            </Link>

            {/* Exhibition Archive (Future) */}
            <div className="bg-white p-6 rounded-lg shadow opacity-30 cursor-not-allowed">
              <div className="text-3xl mb-3">🎨</div>
              <h2 className="text-xl font-medium mb-2">Exhibitions</h2>
              <p className="text-sm text-secondary">
                Manage exhibition archives
              </p>
              <p className="text-xs text-secondary mt-2">
                전시 아카이브 관리 (Future)
              </p>
            </div>

            {/* Settings */}
            <div className="bg-white p-6 rounded-lg shadow opacity-30 cursor-not-allowed">
              <div className="text-3xl mb-3">⚙️</div>
              <h2 className="text-xl font-medium mb-2">Settings</h2>
              <p className="text-sm text-secondary">
                Site configuration and metadata
              </p>
              <p className="text-xs text-secondary mt-2">
                사이트 설정 및 메타데이터 (Future)
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <div className="flex gap-4">
              <Link
                href="/"
                className="text-sm text-primary hover:underline"
              >
                ← Back to Homepage
              </Link>
              <Link
                href="/catalog"
                className="text-sm text-primary hover:underline"
              >
                View Catalog
              </Link>
              <Link
                href="/postcards"
                className="text-sm text-primary hover:underline"
              >
                View Postcards
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
