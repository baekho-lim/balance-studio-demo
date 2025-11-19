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
    email: string;
    instagram?: string;
    website?: string;
  };
}

// 전시 정보 (옵션)
export interface Exhibition {
  id: string;
  title: string;
  venue: string;
  location: string;
  startDate: string;
  endDate?: string;
  type: 'solo' | 'group';
  description?: string;
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
