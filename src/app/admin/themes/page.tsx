'use client'

import { useState, useEffect } from 'react'
import { Check, Palette, Eye, ExternalLink } from 'lucide-react'
import { themes, getThemeList } from '@/lib/themes'
import type { ThemePreset, ThemeConfig } from '@/lib/themes'

const THEME_STORAGE_KEY = 'limhyejung-theme-preset'

export default function AdminThemesPage() {
  const [currentPreset, setCurrentPreset] = useState<ThemePreset>('elegant')
  const [previewTheme, setPreviewTheme] = useState<ThemeConfig | null>(null)

  useEffect(() => {
    // Load saved preset
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    if (saved && saved in themes) {
      setCurrentPreset(saved as ThemePreset)
    }
  }, [])

  const themeList = getThemeList()

  const handleSelectTheme = (preset: ThemePreset) => {
    setCurrentPreset(preset)
    localStorage.setItem(THEME_STORAGE_KEY, preset)

    // Apply theme CSS variables
    const theme = themes[preset]
    applyThemeVars(theme)
  }

  const applyThemeVars = (theme: ThemeConfig) => {
    const root = document.documentElement

    // Colors
    root.style.setProperty('--color-primary', theme.colors.primary)
    root.style.setProperty('--color-primary-light', theme.colors.primaryLight)
    root.style.setProperty('--color-primary-dark', theme.colors.primaryDark)
    root.style.setProperty('--color-secondary', theme.colors.secondary)
    root.style.setProperty('--color-background', theme.colors.background)
    root.style.setProperty('--color-background-alt', theme.colors.backgroundAlt)
    root.style.setProperty('--color-text', theme.colors.text)
    root.style.setProperty('--color-text-muted', theme.colors.textMuted)
    root.style.setProperty('--color-border', theme.colors.border)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Palette className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">테마 설정</h1>
        </div>
        <p className="text-gray-500">
          웹사이트 전체 디자인 테마를 선택합니다. 변경 사항은 즉시 적용됩니다.
        </p>
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {themeList.map((themeInfo) => {
          const theme = themes[themeInfo.id as ThemePreset]
          const isActive = currentPreset === themeInfo.id
          const isPreview = previewTheme?.id === themeInfo.id

          return (
            <div
              key={themeInfo.id}
              className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                isActive
                  ? 'border-blue-500 shadow-lg'
                  : isPreview
                  ? 'border-blue-300 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => handleSelectTheme(themeInfo.id as ThemePreset)}
              onMouseEnter={() => setPreviewTheme(theme)}
              onMouseLeave={() => setPreviewTheme(null)}
            >
              {/* Theme Preview */}
              <div
                className="h-40 relative"
                style={{ backgroundColor: theme.colors.background }}
              >
                {/* Header Preview */}
                <div
                  className="absolute top-0 left-0 right-0 h-10 flex items-center px-4"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  <div
                    className="text-sm font-medium"
                    style={{ color: theme.colors.textInverted }}
                  >
                    {theme.name}
                  </div>
                </div>

                {/* Content Preview */}
                <div className="absolute top-12 left-4 right-4">
                  {/* Title */}
                  <div
                    className="h-4 w-32 rounded mb-3"
                    style={{
                      backgroundColor: theme.colors.text,
                      opacity: 0.8,
                    }}
                  />
                  {/* Text lines */}
                  <div className="space-y-2">
                    <div
                      className="h-2 w-full rounded"
                      style={{
                        backgroundColor: theme.colors.textMuted,
                        opacity: 0.5,
                      }}
                    />
                    <div
                      className="h-2 w-3/4 rounded"
                      style={{
                        backgroundColor: theme.colors.textMuted,
                        opacity: 0.5,
                      }}
                    />
                  </div>
                  {/* Button */}
                  <div
                    className="mt-4 h-8 w-24 rounded flex items-center justify-center"
                    style={{ backgroundColor: theme.colors.accent }}
                  >
                    <div
                      className="h-2 w-12 rounded"
                      style={{ backgroundColor: theme.colors.textInverted }}
                    />
                  </div>
                </div>

                {/* Active Badge */}
                {isActive && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Theme Info */}
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {theme.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {theme.description}
                </p>

                {/* Color Palette */}
                <div className="flex gap-1">
                  <div
                    className="w-6 h-6 rounded-full border border-gray-200"
                    style={{ backgroundColor: theme.colors.primary }}
                    title="Primary"
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-gray-200"
                    style={{ backgroundColor: theme.colors.secondary }}
                    title="Secondary"
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-gray-200"
                    style={{ backgroundColor: theme.colors.accent }}
                    title="Accent"
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-gray-200"
                    style={{ backgroundColor: theme.colors.background }}
                    title="Background"
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-gray-200"
                    style={{ backgroundColor: theme.colors.text }}
                    title="Text"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Current Theme Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">현재 테마: {themes[currentPreset].name}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Colors */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Colors</h3>
            <div className="space-y-2">
              {Object.entries(themes[currentPreset].colors).slice(0, 6).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded border border-gray-200"
                    style={{ backgroundColor: value }}
                  />
                  <span className="text-sm text-gray-600">{key}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Typography</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Heading: {themes[currentPreset].fonts.heading.split(',')[0]}</p>
              <p>Body: {themes[currentPreset].fonts.body.split(',')[0]}</p>
            </div>
          </div>

          {/* Layout */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Layout</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Header: {themes[currentPreset].layout.headerStyle}</p>
              <p>Footer: {themes[currentPreset].layout.footerStyle}</p>
              <p>Max Width: {themes[currentPreset].layout.maxWidth}</p>
            </div>
          </div>

          {/* Components */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Components</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Button Radius: {themes[currentPreset].components.button.borderRadius}</p>
              <p>Card Radius: {themes[currentPreset].components.card.borderRadius}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <a
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <Eye className="w-4 h-4" />
            사이트에서 테마 확인하기
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
        <p className="font-medium mb-1">테마 시스템 안내</p>
        <p>
          선택한 테마는 브라우저에 저장되며, 다음 방문 시 자동으로 적용됩니다.
          향후 버전에서는 테마 커스터마이징 기능이 추가될 예정입니다.
        </p>
      </div>
    </div>
  )
}
