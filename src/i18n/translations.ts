/**
 * UI Translations
 *
 * NOTE: This file is kept for backward compatibility and potential future use.
 * Currently, UI is ALWAYS in English (following MOMA/Gagosian pattern).
 * Only CONTENT (exhibition descriptions, artist notes, etc.) is multilingual.
 *
 * The English translations serve as the single source of truth for all UI text.
 */

import type { UITranslations, LanguageCode } from './types'

// English UI translations - the ONLY ones actually used
export const UI_TEXT: UITranslations = {
  navigation: {
    works: 'Works',
    story: 'Story',
    archive: 'Archive',
    about: 'About',
    contact: 'Contact',
  },
  sections: {
    aboutTitle: 'About the Artist',
    worksTitle: 'Selected Works',
    contactTitle: 'Contact',
  },
  artworkCard: {
    viewDetails: 'View Details',
    dimensions: 'Dimensions',
    medium: 'Medium',
    year: 'Year',
  },
  storyView: {
    tapToNavigate: 'Tap left or right to navigate',
    endOfStory: 'End of story',
    close: 'Close story view',
    previous: 'Previous artwork',
    next: 'Next artwork',
  },
  contact: {
    emailLabel: 'Email',
    instagramLabel: 'Instagram',
    getInTouch: 'Get in Touch',
  },
  viewModes: {
    grid: 'Grid',
    proportional: 'Proportional',
    large: 'Large',
  },
  languageSelector: {
    selectLanguage: 'Content Language',
    primaryLanguage: 'Primary Language',
    secondaryLanguage: 'Content Language',
  },
}

// Legacy export for backward compatibility
// All languages fall back to English UI
const createEnglishFallback = (): UITranslations => UI_TEXT

export const translations: Record<LanguageCode, UITranslations> = {
  // All languages use English UI
  en: UI_TEXT,
  ko: createEnglishFallback(),
  vi: createEnglishFallback(),
  ja: createEnglishFallback(),
  'zh-CN': createEnglishFallback(),
  ms: createEnglishFallback(),
  id: createEnglishFallback(),
  de: createEnglishFallback(),
  fr: createEnglishFallback(),
  es: createEnglishFallback(),
  ar: createEnglishFallback(),
}
