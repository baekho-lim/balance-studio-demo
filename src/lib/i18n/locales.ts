import { LocaleCode } from '@/types';

// 지원 언어 정의
export interface LocaleInfo {
  code: LocaleCode;
  name: string;           // 영어 명칭
  nativeName: string;     // 해당 언어로 표기
  region: string;         // 지역
  priority: 0 | 1 | 2 | 3; // 우선순위 (0: 최고)
  rtl?: boolean;          // Right-to-left 언어
}

export const LOCALES: LocaleInfo[] = [
  // Priority 0 - 핵심 언어
  { code: 'en', name: 'English', nativeName: 'English', region: 'Global', priority: 0 },
  { code: 'ko', name: 'Korean', nativeName: '한국어', region: 'Korea', priority: 0 },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', region: 'Vietnam', priority: 0 },

  // Priority 1 - 아시아 주요 시장
  { code: 'ja', name: 'Japanese', nativeName: '日本語', region: 'Japan', priority: 1 },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文', region: 'China', priority: 1 },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', region: 'Taiwan/HK', priority: 1 },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', region: 'Indonesia', priority: 1 },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', region: 'Malaysia', priority: 1 },

  // Priority 2 - 유럽/글로벌 시장
  { code: 'de', name: 'German', nativeName: 'Deutsch', region: 'Germany', priority: 2 },
  { code: 'fr', name: 'French', nativeName: 'Français', region: 'France', priority: 2 },
  { code: 'es', name: 'Spanish', nativeName: 'Español', region: 'Spain/LatAm', priority: 2 },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', region: 'Italy', priority: 2 },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', region: 'Portugal/Brazil', priority: 2 },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', region: 'Thailand', priority: 2 },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', region: 'Middle East', priority: 2, rtl: true },

  // Priority 3 - 추가 시장
  { code: 'ru', name: 'Russian', nativeName: 'Русский', region: 'Russia', priority: 3 },
];

// 우선순위별 언어 코드 배열
export const LOCALE_CODES = LOCALES.map(l => l.code);
export const P0_LOCALES = LOCALES.filter(l => l.priority === 0).map(l => l.code);
export const P1_LOCALES = LOCALES.filter(l => l.priority <= 1).map(l => l.code);

// 언어 코드로 LocaleInfo 찾기
export function getLocaleInfo(code: LocaleCode): LocaleInfo | undefined {
  return LOCALES.find(l => l.code === code);
}

// 국가 목록 (파트너십 폼용)
export const COUNTRIES = [
  { code: 'KR', name: 'South Korea', nameKr: '대한민국' },
  { code: 'US', name: 'United States', nameKr: '미국' },
  { code: 'VN', name: 'Vietnam', nameKr: '베트남' },
  { code: 'JP', name: 'Japan', nameKr: '일본' },
  { code: 'CN', name: 'China', nameKr: '중국' },
  { code: 'TW', name: 'Taiwan', nameKr: '대만' },
  { code: 'HK', name: 'Hong Kong', nameKr: '홍콩' },
  { code: 'SG', name: 'Singapore', nameKr: '싱가포르' },
  { code: 'TH', name: 'Thailand', nameKr: '태국' },
  { code: 'ID', name: 'Indonesia', nameKr: '인도네시아' },
  { code: 'MY', name: 'Malaysia', nameKr: '말레이시아' },
  { code: 'PH', name: 'Philippines', nameKr: '필리핀' },
  { code: 'GB', name: 'United Kingdom', nameKr: '영국' },
  { code: 'DE', name: 'Germany', nameKr: '독일' },
  { code: 'FR', name: 'France', nameKr: '프랑스' },
  { code: 'IT', name: 'Italy', nameKr: '이탈리아' },
  { code: 'ES', name: 'Spain', nameKr: '스페인' },
  { code: 'NL', name: 'Netherlands', nameKr: '네덜란드' },
  { code: 'BE', name: 'Belgium', nameKr: '벨기에' },
  { code: 'CH', name: 'Switzerland', nameKr: '스위스' },
  { code: 'AT', name: 'Austria', nameKr: '오스트리아' },
  { code: 'AU', name: 'Australia', nameKr: '호주' },
  { code: 'NZ', name: 'New Zealand', nameKr: '뉴질랜드' },
  { code: 'CA', name: 'Canada', nameKr: '캐나다' },
  { code: 'BR', name: 'Brazil', nameKr: '브라질' },
  { code: 'MX', name: 'Mexico', nameKr: '멕시코' },
  { code: 'AE', name: 'United Arab Emirates', nameKr: '아랍에미리트' },
  { code: 'SA', name: 'Saudi Arabia', nameKr: '사우디아라비아' },
  { code: 'RU', name: 'Russia', nameKr: '러시아' },
  { code: 'OTHER', name: 'Other', nameKr: '기타' },
].sort((a, b) => a.name.localeCompare(b.name));
