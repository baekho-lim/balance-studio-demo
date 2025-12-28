/**
 * Date formatting utilities
 */

import type { LocaleCode } from '../types/locale'

// Locale to Intl locale mapping
const INTL_LOCALES: Record<LocaleCode, string> = {
  en: 'en-US',
  ko: 'ko-KR',
  vi: 'vi-VN',
  ja: 'ja-JP',
  'zh-CN': 'zh-CN',
  ms: 'ms-MY',
  id: 'id-ID',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
  ar: 'ar-SA'
}

/**
 * Format date for display
 */
export function formatDate(
  date: string | Date,
  locale: LocaleCode = 'en',
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const intlLocale = INTL_LOCALES[locale] || 'en-US'

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  }

  return new Intl.DateTimeFormat(intlLocale, defaultOptions).format(dateObj)
}

/**
 * Format date as short format (e.g., "Jan 15, 2024")
 */
export function formatDateShort(
  date: string | Date,
  locale: LocaleCode = 'en'
): string {
  return formatDate(date, locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Format date as ISO date string (YYYY-MM-DD)
 */
export function toISODateString(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toISOString().split('T')[0]
}

/**
 * Format time for display
 */
export function formatTime(
  time: string,
  locale: LocaleCode = 'en',
  options?: Intl.DateTimeFormatOptions
): string {
  // Parse time string (HH:mm or HH:mm:ss)
  const [hours, minutes] = time.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)

  const intlLocale = INTL_LOCALES[locale] || 'en-US'

  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: locale === 'en' || locale === 'ko',
    ...options
  }

  return new Intl.DateTimeFormat(intlLocale, defaultOptions).format(date)
}

/**
 * Get relative time string (e.g., "2 days ago")
 */
export function formatRelativeTime(
  date: string | Date,
  locale: LocaleCode = 'en'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - dateObj.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  const intlLocale = INTL_LOCALES[locale] || 'en-US'
  const rtf = new Intl.RelativeTimeFormat(intlLocale, { numeric: 'auto' })

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      return rtf.format(-diffMinutes, 'minute')
    }
    return rtf.format(-diffHours, 'hour')
  } else if (diffDays < 7) {
    return rtf.format(-diffDays, 'day')
  } else if (diffDays < 30) {
    return rtf.format(-Math.floor(diffDays / 7), 'week')
  } else if (diffDays < 365) {
    return rtf.format(-Math.floor(diffDays / 30), 'month')
  } else {
    return rtf.format(-Math.floor(diffDays / 365), 'year')
  }
}

/**
 * Check if date is in the past
 */
export function isPast(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.getTime() < Date.now()
}

/**
 * Check if date is in the future
 */
export function isFuture(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.getTime() > Date.now()
}

/**
 * Check if date is today
 */
export function isToday(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  return dateObj.toDateString() === today.toDateString()
}

/**
 * Get date range string (e.g., "Jan 15 - Feb 20, 2024")
 */
export function formatDateRange(
  startDate: string | Date,
  endDate: string | Date,
  locale: LocaleCode = 'en'
): string {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate

  const sameYear = start.getFullYear() === end.getFullYear()
  const sameMonth = sameYear && start.getMonth() === end.getMonth()

  if (sameMonth) {
    // Same month: "Jan 15-20, 2024"
    return `${formatDate(start, locale, { month: 'short', day: 'numeric' }).replace(/,.*/, '')}-${end.getDate()}, ${end.getFullYear()}`
  } else if (sameYear) {
    // Same year: "Jan 15 - Feb 20, 2024"
    return `${formatDate(start, locale, { month: 'short', day: 'numeric' }).replace(/,.*/, '')} - ${formatDate(end, locale, { month: 'short', day: 'numeric', year: 'numeric' })}`
  } else {
    // Different years: "Dec 15, 2023 - Jan 20, 2024"
    return `${formatDateShort(start, locale)} - ${formatDateShort(end, locale)}`
  }
}
