/**
 * FAQ JSON-LD generator
 */

import type { LocaleCode } from '@agency/core'

export interface FAQItem {
  id: string
  question: Record<string, string>
  answer: Record<string, string>
  order?: number
}

export interface FAQJsonLdOptions {
  siteUrl: string
  locales?: LocaleCode[]
}

export interface FAQJsonLdOutput {
  '@context': 'https://schema.org'
  '@type': 'FAQPage'
  '@id'?: string
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
      inLanguage?: string
    }
  }>
}

/**
 * Map locale code to language tag
 */
function getLanguageTag(locale: LocaleCode): string {
  const languageTags: Record<LocaleCode, string> = {
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
  return languageTags[locale] || locale
}

/**
 * Generate FAQ JSON-LD schema
 */
export function generateFAQJsonLd(
  faqs: FAQItem[],
  options: FAQJsonLdOptions
): FAQJsonLdOutput {
  const { siteUrl, locales = ['en', 'ko'] } = options

  // Sort FAQs by order if available
  const sortedFaqs = [...faqs].sort((a, b) => (a.order || 0) - (b.order || 0))

  // Generate FAQ entries for all specified locales
  const mainEntity = sortedFaqs.flatMap(faq =>
    locales
      .filter(lang => faq.question[lang] && faq.answer[lang])
      .map(lang => ({
        '@type': 'Question' as const,
        name: faq.question[lang],
        acceptedAnswer: {
          '@type': 'Answer' as const,
          text: faq.answer[lang],
          inLanguage: getLanguageTag(lang as LocaleCode)
        }
      }))
  )

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteUrl}/#faq`,
    mainEntity
  }
}

/**
 * Generate FAQ JSON-LD for a single locale
 */
export function generateFAQJsonLdForLocale(
  faqs: FAQItem[],
  locale: LocaleCode,
  options: Omit<FAQJsonLdOptions, 'locales'>
): FAQJsonLdOutput {
  return generateFAQJsonLd(faqs, {
    ...options,
    locales: [locale]
  })
}

/**
 * Generate FAQ JSON-LD for multiple pages
 * Useful when FAQs are split across different pages/categories
 */
export function generateCategorizedFAQJsonLd(
  categories: Array<{
    name: string
    faqs: FAQItem[]
  }>,
  options: FAQJsonLdOptions
): FAQJsonLdOutput {
  const allFaqs = categories.flatMap(cat => cat.faqs)
  return generateFAQJsonLd(allFaqs, options)
}
