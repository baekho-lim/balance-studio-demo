// 레거시 UI 번역 시스템
export * from './types'
export * from './context'
export { translations } from './translations'

// 통합 i18n 시스템 (데이터 + UI)
// 새 코드에서는 @/lib/i18n 에서 직접 import 권장
export {
  getLocalizedText,
  getLocalizedField,
  getText,
  getLocaleInfo,
  formatDate,
  formatExhibitionDates,
  getExhibitionStatusLabel,
  getNewsTypeLabel,
  getPartnershipTypeLabel,
  DEFAULT_LOCALE,
  FALLBACK_LOCALE,
  FALLBACK_CHAIN,
  LOCALES,
  LOCALE_CODES,
  P0_LOCALES,
  P1_LOCALES,
  COUNTRIES,
} from '@/lib/i18n'
