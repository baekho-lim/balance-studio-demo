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
  order: number;
  imageWidth?: number;
  imageHeight?: number;
  sizeCategory?: 'small' | 'medium' | 'large';
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
