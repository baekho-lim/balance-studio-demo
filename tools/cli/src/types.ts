/**
 * CLI Types
 */

export type BusinessType =
  | 'pilates'      // 필라테스/웰니스
  | 'restaurant'   // 외식업
  | 'ecommerce'    // 이커머스
  | 'artist'       // 아티스트/포트폴리오
  | 'government'   // 관공서
  | 'education'    // 교육기관

export type ThemePreset =
  | 'minimal'
  | 'bold'
  | 'elegant'
  | 'wellness'

export type Feature =
  | 'blog'         // 블로그/CMS
  | 'booking'      // 예약 시스템
  | 'ecommerce'    // 상품/장바구니
  | 'multilingual' // 다국어 지원
  | 'analytics'    // 분석 대시보드
  | 'newsletter'   // 뉴스레터

export interface ProjectConfig {
  name: string
  displayName: string
  businessType: BusinessType
  theme: ThemePreset
  features: Feature[]
  database: 'json' | 'postgresql'
  auth: boolean
  languages: string[]
}

export interface BusinessTypeInfo {
  name: string
  description: string
  icon: string
  defaultTheme: ThemePreset
  recommendedFeatures: Feature[]
  schemas: string[]  // Schema.org types
}

export const BUSINESS_TYPES: Record<BusinessType, BusinessTypeInfo> = {
  pilates: {
    name: 'Pilates / Wellness',
    description: '필라테스 스튜디오, 요가 센터, 웰니스 비즈니스',
    icon: '🧘‍♀️',
    defaultTheme: 'wellness',
    recommendedFeatures: ['booking', 'blog', 'newsletter'],
    schemas: ['HealthAndBeautyBusiness', 'Course', 'Person'],
  },
  restaurant: {
    name: 'Restaurant / Cafe',
    description: '레스토랑, 카페, 외식업',
    icon: '🍽️',
    defaultTheme: 'elegant',
    recommendedFeatures: ['booking', 'multilingual'],
    schemas: ['Restaurant', 'Menu', 'MenuItem', 'Review'],
  },
  ecommerce: {
    name: 'E-commerce / Shop',
    description: '온라인 쇼핑몰, 상품 판매',
    icon: '🛒',
    defaultTheme: 'minimal',
    recommendedFeatures: ['ecommerce', 'analytics', 'newsletter'],
    schemas: ['Store', 'Product', 'Offer', 'Review'],
  },
  artist: {
    name: 'Artist / Portfolio',
    description: '아티스트, 사진작가, 디자이너 포트폴리오',
    icon: '🎨',
    defaultTheme: 'elegant',
    recommendedFeatures: ['blog', 'multilingual'],
    schemas: ['Person', 'VisualArtwork', 'ExhibitionEvent'],
  },
  government: {
    name: 'Government / Organization',
    description: '관공서, 공공기관, 비영리단체',
    icon: '🏛️',
    defaultTheme: 'minimal',
    recommendedFeatures: ['blog', 'multilingual', 'analytics'],
    schemas: ['GovernmentOrganization', 'Event', 'FAQPage'],
  },
  education: {
    name: 'Education / Academy',
    description: '학원, 교육기관, 온라인 강의',
    icon: '📚',
    defaultTheme: 'bold',
    recommendedFeatures: ['booking', 'blog', 'newsletter'],
    schemas: ['EducationalOrganization', 'Course', 'Event'],
  },
}

export const THEME_PRESETS: Record<ThemePreset, { name: string; description: string }> = {
  minimal: {
    name: 'Minimal',
    description: '깔끔하고 미니멀한 디자인',
  },
  bold: {
    name: 'Bold',
    description: '강렬하고 대담한 컬러와 타이포',
  },
  elegant: {
    name: 'Elegant',
    description: '고급스럽고 세련된 스타일',
  },
  wellness: {
    name: 'Wellness',
    description: '차분하고 편안한 웰니스 테마',
  },
}

export const FEATURES: Record<Feature, { name: string; description: string }> = {
  blog: {
    name: 'Blog / CMS',
    description: '블로그, 뉴스, 콘텐츠 관리',
  },
  booking: {
    name: 'Booking System',
    description: '예약, 스케줄 관리',
  },
  ecommerce: {
    name: 'E-commerce',
    description: '상품, 장바구니, 결제',
  },
  multilingual: {
    name: 'Multi-language',
    description: '다국어 지원 (i18n)',
  },
  analytics: {
    name: 'Analytics Dashboard',
    description: '방문자 분석, 리포트',
  },
  newsletter: {
    name: 'Newsletter',
    description: '이메일 구독, 뉴스레터',
  },
}

export const LANGUAGES = [
  { code: 'ko', name: '한국어' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'zh', name: '中文' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'th', name: 'ไทย' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
]
