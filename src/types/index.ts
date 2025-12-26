// 챕터 타입
export type ChapterSlug =
  | 'secret-garden'
  | 'effortless-spring'
  | 'desert-stories'
  | 'waters-of-time';

// 챕터 정보
export interface Chapter {
  id: ChapterSlug;
  title: string;
  titleKr: string;
  question: string;
  questionKr: string;
  description: string;
  descriptionKr: string;
  coverImage: string;
  color: string;
}

// 개별 작품
export interface Artwork {
  id: string;
  title: string;
  titleKr?: string;
  year: number;
  chapter: ChapterSlug;
  medium: string;
  mediumKr?: string;
  dimensions?: string;
  question?: string;
  questionKr?: string;
  questionVi?: string;
  questionMs?: string;
  questionId?: string;
  description?: string;
  descriptionKr?: string;
  images: {
    thumbnail: string;
    full: string;
    alt: string;
  };
  order: number;  // 개발용 내부 순서
  exhibitionNumber?: string | null;  // 큐레이터 지정 전시/판매 번호 (추후 입력)
  imageWidth?: number;
  imageHeight?: number;
  sizeCategory?: 'small' | 'medium' | 'large';
  orientation?: 'portrait' | 'landscape' | 'square';  // 자동 계산
  hasArtistNote?: boolean;  // artwork-notes.json에 원본 노트 있음을 표시
}

// 작가 정보
export interface Artist {
  name: string;
  nameKr: string;
  education: {
    degree: string;
    institution: string;
    year: number | string;
  }[];
  statement: {
    kr: string;
    en: string;
  };
  bio: {
    kr: string;
    en: string;
  };
  profileImage: string;
  contact: {
    email?: string;
    instagram?: string;
    website?: string;
  };
}

// 지원 언어 코드
export type LocaleCode =
  | 'en' | 'ko' | 'vi' | 'ja'
  | 'zh-CN' | 'zh-TW'
  | 'de' | 'fr' | 'es' | 'it' | 'pt'
  | 'ar' | 'ru' | 'id' | 'ms' | 'th';

// 다국어 텍스트 타입 (필수: en, ko / 선택: 나머지)
export interface MultilingualText {
  en: string;
  ko: string;
  vi?: string;
  ja?: string;
  'zh-CN'?: string;
  'zh-TW'?: string;
  de?: string;
  fr?: string;
  es?: string;
  it?: string;
  pt?: string;
  ar?: string;
  ru?: string;
  id?: string;
  ms?: string;
  th?: string;
}

// 전시 상태
export type ExhibitionStatus = 'upcoming' | 'current' | 'past';

// 전시 정보 (확장)
export interface Exhibition {
  id: string;                      // "tomura-2024-solo"
  title: string;                   // 영문 제목
  titleKr?: string;                // 한글 제목
  type: 'solo' | 'group';          // 전시 유형
  venue: string;                   // 영문 장소명
  venueKr?: string;                // 한글 장소명
  city: string;                    // 도시
  country: string;                 // 국가 (영문)
  countryCode: string;             // ISO 국가 코드 (VN, KR, US 등)
  location?: string;               // 기존 호환용 (deprecated)
  startDate: string;               // YYYY-MM-DD
  endDate?: string;                // YYYY-MM-DD
  status: ExhibitionStatus;        // 전시 상태
  description?: string | MultilingualText;  // 다국어 설명
  descriptionKr?: string;          // 기존 호환용
  artworks?: string[];             // 전시 작품 ID 배열
  pressRelease?: string;           // 관련 뉴스 ID
  images?: {
    cover?: string;                // 대표 이미지
    installation?: string[];       // 설치 전경 이미지들
  };
  curatorNote?: {
    en: string;
    kr: string;
  };
  chapters?: ChapterSlug[];        // 관련 챕터 (기존 호환)
  featured: boolean;               // 메인 노출 여부
}

// 뉴스/보도자료 유형
export type NewsType = 'press-release' | 'interview' | 'review' | 'feature';

// 뉴스/보도자료
export interface NewsArticle {
  id: string;                      // "tomura-opening-2024"
  type: NewsType;                  // 기사 유형
  title: MultilingualText;         // 다국어 제목
  slug: string;                    // URL-friendly ID
  publishDate: string;             // YYYY-MM-DD
  exhibition?: string;             // 관련 전시 ID
  content: MultilingualText;       // 다국어 본문 (Markdown)
  excerpt: {                       // 요약 (필수: en, ko)
    en: string;
    ko: string;
  };
  author?: string;                 // 작성자/기자명
  source?: string;                 // 외부 미디어 출처명
  sourceUrl?: string;              // 원문 링크
  images?: {
    hero?: string;                 // 대표 이미지
    gallery?: string[];            // 본문 이미지들
  };
  tags: string[];                  // 태그 배열
  featured: boolean;               // 메인 노출 여부
}

// 파트너십 문의 유형
export type PartnershipType =
  | 'gallery-exhibition'           // 갤러리 전시 제안
  | 'art-fair'                     // 아트페어 참여
  | 'commission'                   // 커미션 작품
  | 'collaboration'                // 협업 프로젝트
  | 'acquisition'                  // 작품 구매/소장
  | 'media-inquiry';               // 미디어/인터뷰 문의

// 파트너십 문의 데이터
export interface PartnershipInquiry {
  type: PartnershipType;
  name: string;
  organization?: string;
  email: string;
  country: string;
  countryCode?: string;
  message: string;
  preferredLanguage: LocaleCode;
  timestamp?: string;
}

// 작품 노트 (원천 데이터)
export interface ArtworkNote {
  artworkId: string;  // artworks.json의 id와 매칭
  year: number;
  artistNote: {
    en: string;
    kr: string;
  };
  viewerQuestions: {
    en: string[];
    kr: string[];
  };
  themes: string[];  // 테마 태그
  sourceDate: string;  // 작성 날짜
}

// 사이트 설정 (Hero 이미지, 카탈로그 커버 등)
export interface SiteSettings {
  homeHero: {
    artworkId: string;
    imagePath: string;
    tagline: {
      en: string;
      kr: string;
    };
  };
  catalogCover: {
    artworkId: string;
    imagePath: string;
  };
  meta: {
    lastUpdated: string;
    version: string;
  };
}
