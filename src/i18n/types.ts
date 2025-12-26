// Extensible language system - add new languages here
// P0: Core markets | P1: Asian expansion | P2: European/NYC gallery | P3: Middle East
export const SUPPORTED_LANGUAGES = [
  'en', 'ko', 'vi',           // P0: Core
  'ja', 'zh-CN', 'ms', 'id',  // P1: Asian expansion
  'de', 'fr', 'es', 'ar'      // P2/P3: European + Middle East
] as const
export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]

export interface LanguageInfo {
  code: LanguageCode
  name: string
  nativeName: string
  rtl?: boolean  // Right-to-left for Arabic
}

export const LANGUAGES: Record<LanguageCode, LanguageInfo> = {
  // P0: Core markets
  en: { code: 'en', name: 'English', nativeName: 'English' },
  ko: { code: 'ko', name: 'Korean', nativeName: '한국어' },
  vi: { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  // P1: Asian expansion (NYC gallery target)
  ja: { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  'zh-CN': { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文' },
  ms: { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
  id: { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  // P2: European markets (NYC gallery)
  de: { code: 'de', name: 'German', nativeName: 'Deutsch' },
  fr: { code: 'fr', name: 'French', nativeName: 'Français' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español' },
  // P3: Middle East expansion
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
}

// Secondary languages (excluding English which is always primary)
export const SECONDARY_LANGUAGES = SUPPORTED_LANGUAGES.filter(
  (lang) => lang !== 'en'
) as Exclude<LanguageCode, 'en'>[]

// Type for multilingual text content (11 languages)
export interface MultiLingualText {
  en: string
  // P0: Core
  ko?: string
  vi?: string
  // P1: Asian
  ja?: string
  'zh-CN'?: string
  ms?: string
  id?: string
  // P2: European
  de?: string
  fr?: string
  es?: string
  // P3: Middle East
  ar?: string
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
