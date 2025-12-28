/**
 * Locale and internationalization types
 * Supports 11 languages with priority tiers
 */

// Supported locale codes
export type LocaleCode =
  | 'en' | 'ko' | 'vi'           // P0: Primary
  | 'ja' | 'zh-CN' | 'ms' | 'id' // P1: Secondary
  | 'de' | 'fr' | 'es'           // P2: European
  | 'ar'                          // P3: Expansion

// Locale priority tiers
export type LocalePriority = 'P0' | 'P1' | 'P2' | 'P3'

// Multilingual text (required: en, ko / optional: others)
export interface MultilingualText {
  en: string
  ko: string
  vi?: string
  ja?: string
  'zh-CN'?: string
  ms?: string
  id?: string
  de?: string
  fr?: string
  es?: string
  ar?: string
}

// Locale configuration
export interface LocaleConfig {
  default: LocaleCode
  supported: LocaleCode[]
  priority: Record<LocalePriority, LocaleCode[]>
  uiLanguage: LocaleCode
}

// Translation key structure
export interface TranslationKeys {
  [namespace: string]: {
    [key: string]: MultilingualText | string
  }
}

// Helper type to extract locale value
export type LocaleValue<T extends MultilingualText> = T[LocaleCode]
