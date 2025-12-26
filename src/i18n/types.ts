// Extensible language system - add new languages here
// P0: Core markets | P1: Asian expansion (NYC gallery target)
export const SUPPORTED_LANGUAGES = ['en', 'ko', 'vi', 'ja', 'zh-CN', 'ms', 'id'] as const
export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]

export interface LanguageInfo {
  code: LanguageCode
  name: string
  nativeName: string
}

export const LANGUAGES: Record<LanguageCode, LanguageInfo> = {
  en: { code: 'en', name: 'English', nativeName: 'English' },
  ko: { code: 'ko', name: 'Korean', nativeName: '한국어' },
  vi: { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  ja: { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  'zh-CN': { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文' },
  ms: { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
  id: { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
}

// Secondary languages (excluding English which is always primary)
export const SECONDARY_LANGUAGES = SUPPORTED_LANGUAGES.filter(
  (lang) => lang !== 'en'
) as Exclude<LanguageCode, 'en'>[]

// Type for multilingual text content
export interface MultiLingualText {
  en: string
  ko?: string
  vi?: string
  ja?: string
  'zh-CN'?: string
  ms?: string
  id?: string
}

// UI text translations structure
export interface UITranslations {
  navigation: {
    works: string
    story: string
    archive: string
    about: string
    contact: string
  }
  sections: {
    aboutTitle: string
    worksTitle: string
    contactTitle: string
  }
  artworkCard: {
    viewDetails: string
    dimensions: string
    medium: string
    year: string
  }
  storyView: {
    tapToNavigate: string
    endOfStory: string
    close: string
    previous: string
    next: string
  }
  contact: {
    emailLabel: string
    instagramLabel: string
    getInTouch: string
  }
  viewModes: {
    grid: string
    proportional: string
    large: string
  }
  languageSelector: {
    selectLanguage: string
    primaryLanguage: string
    secondaryLanguage: string
  }
}
