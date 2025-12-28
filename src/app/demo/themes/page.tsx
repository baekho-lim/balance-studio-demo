'use client'

import Link from 'next/link'
import { useState } from 'react'

// Import from @agency/themes
import {
  defaultTheme,
  createTheme,
} from '../../../../packages/agency-themes/src'

import type { ThemeConfig } from '../../../../packages/agency-core/src/types/theme'

// Sample themes
const themes: Record<string, ThemeConfig> = {
  default: defaultTheme,
  pilates: createTheme({
    id: 'pilates',
    name: 'Zen Pilates',
    colors: {
      primary: '#6B8E7B',
      secondary: '#E8DED1',
      accent: '#D4A574',
      background: '#FAFAF8',
      surface: '#FFFFFF',
      text: '#2D3436',
      textMuted: '#636E72',
      border: '#E0E0E0',
      success: '#27AE60',
      warning: '#F39C12',
      error: '#E74C3C',
    },
    typography: {
      fontFamily: {
        heading: 'Cormorant Garamond, serif',
        body: 'Nunito Sans, sans-serif',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
    },
  }),
  restaurant: createTheme({
    id: 'restaurant',
    name: 'Bistro Elegance',
    colors: {
      primary: '#8B4513',
      secondary: '#F5E6D3',
      accent: '#D4AF37',
      background: '#FFFEF7',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textMuted: '#666666',
      border: '#E8E0D5',
      success: '#2E7D32',
      warning: '#ED6C02',
      error: '#D32F2F',
    },
    typography: {
      fontFamily: {
        heading: 'Playfair Display, serif',
        body: 'Lato, sans-serif',
      },
    },
  }),
  ecommerce: createTheme({
    id: 'ecommerce',
    name: 'Modern Shop',
    colors: {
      primary: '#1A1A2E',
      secondary: '#16213E',
      accent: '#E94560',
      background: '#F8F9FA',
      surface: '#FFFFFF',
      text: '#212529',
      textMuted: '#6C757D',
      border: '#DEE2E6',
      success: '#198754',
      warning: '#FFC107',
      error: '#DC3545',
    },
    typography: {
      fontFamily: {
        heading: 'Poppins, sans-serif',
        body: 'Inter, sans-serif',
      },
    },
  }),
}

export default function ThemesDemoPage() {
  const [activeTheme, setActiveTheme] = useState<string>('default')

  const theme = themes[activeTheme]

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/demo" className="text-blue-600 hover:underline mb-4 inline-block">
          ← 데모 목록으로
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          @agency/themes 데모
        </h1>
        <p className="text-gray-600 mb-8">
          테마 시스템, 컬러 팔레트, 타이포그래피를 확인하세요.
        </p>

        {/* Theme Selector */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.entries(themes).map(([key, t]) => (
            <button
              key={key}
              onClick={() => setActiveTheme(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTheme === key
                  ? 'ring-2 ring-offset-2 ring-blue-500'
                  : 'hover:shadow-md'
              }`}
              style={{
                backgroundColor: t.colors.primary,
                color: '#FFFFFF',
              }}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Color Palette */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">컬러 팔레트</h2>
            <p className="text-sm text-gray-500 mb-4">{theme.name} 테마의 색상</p>

            <div className="grid grid-cols-2 gap-3">
              {Object.entries(theme.colors).map(([name, color]) => (
                <div key={name} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg shadow-inner border"
                    style={{ backgroundColor: color }}
                  />
                  <div>
                    <div className="text-sm font-medium">{name}</div>
                    <div className="text-xs text-gray-500">{color}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">타이포그래피</h2>
            <p className="text-sm text-gray-500 mb-4">폰트 패밀리 및 사이즈</p>

            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Heading Font</div>
                <div
                  className="text-2xl"
                  style={{ fontFamily: theme.typography.fontFamily.heading }}
                >
                  The Quick Brown Fox
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Body Font</div>
                <div
                  className="text-base"
                  style={{ fontFamily: theme.typography.fontFamily.body }}
                >
                  The quick brown fox jumps over the lazy dog. 다람쥐 헌 쳇바퀴에 타고파.
                </div>
              </div>
              {theme.typography.fontFamily.mono && (
                <div>
                  <div className="text-xs text-gray-500 mb-1">Mono Font</div>
                  <div
                    className="text-sm"
                    style={{ fontFamily: theme.typography.fontFamily.mono }}
                  >
                    const theme = createTheme({`{}`})
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* UI Preview */}
          <div
            className="rounded-lg shadow p-6 md:col-span-2"
            style={{ backgroundColor: theme.colors.background }}
          >
            <h2 className="text-xl font-semibold mb-4" style={{ color: theme.colors.text }}>
              UI 미리보기
            </h2>

            <div
              className="rounded-lg p-6"
              style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderWidth: 1 }}
            >
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: theme.typography.fontFamily.heading, color: theme.colors.text }}
              >
                {theme.name} 테마 미리보기
              </h3>
              <p
                className="mb-4"
                style={{ fontFamily: theme.typography.fontFamily.body, color: theme.colors.textMuted }}
              >
                이것은 {theme.name} 테마의 UI 미리보기입니다. 버튼, 텍스트, 배경색 등을 확인할 수 있습니다.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{ backgroundColor: theme.colors.primary, color: '#FFFFFF' }}
                >
                  Primary Button
                </button>
                <button
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{ backgroundColor: theme.colors.secondary, color: theme.colors.text }}
                >
                  Secondary Button
                </button>
                <button
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{ backgroundColor: theme.colors.accent, color: '#FFFFFF' }}
                >
                  Accent Button
                </button>
              </div>

              <div className="mt-4 flex gap-3">
                <span
                  className="px-3 py-1 rounded text-sm"
                  style={{ backgroundColor: theme.colors.success, color: '#FFFFFF' }}
                >
                  Success
                </span>
                <span
                  className="px-3 py-1 rounded text-sm"
                  style={{ backgroundColor: theme.colors.warning, color: '#FFFFFF' }}
                >
                  Warning
                </span>
                <span
                  className="px-3 py-1 rounded text-sm"
                  style={{ backgroundColor: theme.colors.error, color: '#FFFFFF' }}
                >
                  Error
                </span>
              </div>
            </div>
          </div>

          {/* Theme Config JSON */}
          <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">테마 설정 (JSON)</h2>
            <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto max-h-80">
              {JSON.stringify(theme, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </main>
  )
}
