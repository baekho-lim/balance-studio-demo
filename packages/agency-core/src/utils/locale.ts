/**
 * Locale utility functions
 */

import type { MultilingualText, LocaleCode, LocalePriority } from '../types/locale'

// Default locale priorities
const LOCALE_PRIORITIES: Record<LocalePriority, LocaleCode[]> = {
  P0: ['en', 'ko', 'vi'],
  P1: ['ja', 'zh-CN', 'ms', 'id'],
  P2: ['de', 'fr', 'es'],
  P3: ['ar']
}

/**
 * Get text for a specific locale with fallback
 */
export function getText(
  text: MultilingualText | string | undefined,
  locale: LocaleCode,
  fallbackLocale: LocaleCode = 'en'
): string {
  if (!text) return ''
  if (typeof text === 'string') return text

  const value = text[locale]
  if (value) return value

  // Fallback chain: requested locale -> fallback locale -> en -> first available
  const fallbackValue = text[fallbackLocale]
  if (fallbackValue) return fallbackValue

  const enValue = text.en
  if (enValue) return enValue

  // Return first available value
  const firstValue = Object.values(text).find(v => v)
  return firstValue || ''
}

/**
 * Get locale priority tier
 */
export function getLocalePriority(locale: LocaleCode): LocalePriority {
  for (const [priority, locales] of Object.entries(LOCALE_PRIORITIES)) {
    if (locales.includes(locale)) {
      return priority as LocalePriority
    }
  }
  return 'P3' // Default to lowest priority
}

/**
 * Get all locales for a priority tier
 */
export function getLocalesByPriority(priority: LocalePriority): LocaleCode[] {
  return LOCALE_PRIORITIES[priority] || []
}

/**
 * Get all supported locales
 */
export function getAllLocales(): LocaleCode[] {
  return Object.values(LOCALE_PRIORITIES).flat()
}

/**
 * Check if a locale is supported
 */
export function isLocaleSupported(locale: string): locale is LocaleCode {
  return getAllLocales().includes(locale as LocaleCode)
}

/**
 * Get locale display name
 */
export function getLocaleDisplayName(locale: LocaleCode): string {
  const names: Record<LocaleCode, string> = {
    en: 'English',
    ko: '한국어',
    vi: 'Tiếng Việt',
    ja: '日本語',
    'zh-CN': '简体中文',
    ms: 'Bahasa Melayu',
    id: 'Bahasa Indonesia',
    de: 'Deutsch',
    fr: 'Français',
    es: 'Español',
    ar: 'العربية'
  }
  return names[locale] || locale
}

/**
 * Create a multilingual text object with default values
 */
export function createMultilingualText(
  en: string,
  ko?: string,
  others?: Partial<Omit<MultilingualText, 'en' | 'ko'>>
): MultilingualText {
  return {
    en,
    ko: ko || en,
    ...others
  }
}

/**
 * Merge multilingual text objects
 */
export function mergeMultilingualText(
  base: MultilingualText,
  override: Partial<MultilingualText>
): MultilingualText {
  return {
    ...base,
    ...override
  }
}

/**
 * Check if multilingual text has all required fields
 */
export function isCompleteMultilingualText(text: unknown): text is MultilingualText {
  if (!text || typeof text !== 'object') return false
  const obj = text as Record<string, unknown>
  return typeof obj.en === 'string' && typeof obj.ko === 'string'
}
