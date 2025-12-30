/**
 * @cgos/core - Commerce Growth OS Core Package
 * Single Source of Truth for types, utilities, and constants
 */

// =============================================================================
// Types
// =============================================================================

// Multilingual text
export interface MultilingualText {
  en: string
  ko: string
  vi?: string
}

// Industry types
export type IndustryType =
  | 'artist'
  | 'pilates'
  | 'petcare'
  | 'ecommerce'
  | 'restaurant'
  | 'education'
  | 'medical'
  | 'realestate'
  | 'legal'

// Site configuration
export interface SiteConfig {
  id: string
  name: MultilingualText
  industry: IndustryType
  domain?: string
  theme: ThemeConfig
  features: string[]
  seo: SEOConfig
  createdAt: Date
  updatedAt: Date
}

// Theme configuration
export interface ThemeConfig {
  preset: 'minimal' | 'bold' | 'elegant' | 'wellness'
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  typography: {
    headingFont: string
    bodyFont: string
  }
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

// SEO configuration
export interface SEOConfig {
  title: MultilingualText
  description: MultilingualText
  keywords: string[]
  ogImage?: string
  schema?: Record<string, unknown>
}

// =============================================================================
// Business Domain Types
// =============================================================================

// Booking system
export interface BookingSlot {
  id: string
  startTime: Date
  endTime: Date
  available: boolean
  capacity?: number
  booked?: number
}

export interface Booking {
  id: string
  customerId: string
  serviceId: string
  slot: BookingSlot
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes?: string
  createdAt: Date
}

// CRM
export type RFMScore = 'champions' | 'loyal' | 'potential' | 'new' | 'at_risk' | 'dormant'

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  rfmScore?: RFMScore
  tags: string[]
  totalOrders: number
  totalSpent: number
  lastOrderAt?: Date
  createdAt: Date
}

// Content
export interface BlogPost {
  id: string
  slug: string
  title: MultilingualText
  content: MultilingualText
  excerpt?: MultilingualText
  featuredImage?: string
  author?: string
  tags: string[]
  status: 'draft' | 'scheduled' | 'published'
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

// =============================================================================
// Utilities
// =============================================================================

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: string = 'KRW'): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format date
 */
export function formatDate(date: Date | string, locale: string = 'ko-KR'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

/**
 * Format relative time
 */
export function formatRelativeTime(date: Date | string, locale: string = 'ko-KR'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (diffInSeconds < 60) return rtf.format(-diffInSeconds, 'seconds')
  if (diffInSeconds < 3600) return rtf.format(-Math.floor(diffInSeconds / 60), 'minutes')
  if (diffInSeconds < 86400) return rtf.format(-Math.floor(diffInSeconds / 3600), 'hours')
  if (diffInSeconds < 2592000) return rtf.format(-Math.floor(diffInSeconds / 86400), 'days')
  if (diffInSeconds < 31536000) return rtf.format(-Math.floor(diffInSeconds / 2592000), 'months')
  return rtf.format(-Math.floor(diffInSeconds / 31536000), 'years')
}

/**
 * Generate slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s가-힣-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Truncate text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

/**
 * Get text by locale
 */
export function getLocalizedText(
  text: MultilingualText | string,
  locale: 'en' | 'ko' | 'vi' = 'ko'
): string {
  if (typeof text === 'string') return text
  return text[locale] || text.ko || text.en || ''
}

// =============================================================================
// Constants
// =============================================================================

export const INDUSTRIES: Record<IndustryType, { label: MultilingualText; icon: string }> = {
  artist: { label: { en: 'Artist', ko: '아티스트' }, icon: 'palette' },
  pilates: { label: { en: 'Pilates/Yoga', ko: '필라테스/요가' }, icon: 'activity' },
  petcare: { label: { en: 'Pet Care', ko: '펫케어' }, icon: 'heart' },
  ecommerce: { label: { en: 'E-commerce', ko: '이커머스' }, icon: 'shopping-cart' },
  restaurant: { label: { en: 'Restaurant', ko: '레스토랑' }, icon: 'utensils' },
  education: { label: { en: 'Education', ko: '교육' }, icon: 'book-open' },
  medical: { label: { en: 'Medical', ko: '의료' }, icon: 'stethoscope' },
  realestate: { label: { en: 'Real Estate', ko: '부동산' }, icon: 'home' },
  legal: { label: { en: 'Legal', ko: '법률' }, icon: 'scale' },
}

export const RFM_LABELS: Record<RFMScore, { label: MultilingualText; color: string }> = {
  champions: { label: { en: 'Champions', ko: '챔피언' }, color: '#22C55E' },
  loyal: { label: { en: 'Loyal', ko: '충성' }, color: '#3B82F6' },
  potential: { label: { en: 'Potential', ko: '잠재' }, color: '#8B5CF6' },
  new: { label: { en: 'New', ko: '신규' }, color: '#06B6D4' },
  at_risk: { label: { en: 'At Risk', ko: '위험' }, color: '#F59E0B' },
  dormant: { label: { en: 'Dormant', ko: '휴면' }, color: '#EF4444' },
}

export const THEME_PRESETS = {
  minimal: {
    colors: {
      primary: '#1F2937',
      secondary: '#6B7280',
      accent: '#3B82F6',
      background: '#FFFFFF',
      text: '#111827',
    },
  },
  bold: {
    colors: {
      primary: '#7C3AED',
      secondary: '#A78BFA',
      accent: '#EC4899',
      background: '#0F172A',
      text: '#F8FAFC',
    },
  },
  elegant: {
    colors: {
      primary: '#78716C',
      secondary: '#A8A29E',
      accent: '#D4AF37',
      background: '#FAFAF9',
      text: '#292524',
    },
  },
  wellness: {
    colors: {
      primary: '#8B7355',
      secondary: '#A3BE8C',
      accent: '#B48EAD',
      background: '#ECEFF4',
      text: '#2E3440',
    },
  },
}
