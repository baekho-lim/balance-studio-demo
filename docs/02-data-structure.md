# Data Structure Guide

## 개요

모든 데이터는 `/src/data/` 폴더의 JSON 파일에 저장됩니다.
TypeScript 타입은 `/src/types/index.ts`에 정의되어 있습니다.

## Artwork (작품)

```typescript
interface Artwork {
  id: string;                    // 고유 식별자 (예: "sg-001")
  title: string;                 // 작품 제목
  titleKr?: string;              // 한국어 제목 (선택)
  year: number;                  // 제작 연도
  chapter: ChapterSlug;          // 소속 챕터
  medium: string;                // 재료/기법
  mediumKr?: string;             // 한국어 재료명
  dimensions?: string;           // 물리적 크기 (예: "60.5 x 91 cm")
  question?: string;             // 작품 관련 질문
  questionKr?: string;           // 한국어 질문
  description?: string;          // 작품 설명
  descriptionKr?: string;        // 한국어 설명
  images: {
    thumbnail: string;           // 썸네일 이미지 경로
    full: string;                // 원본 이미지 경로
    alt: string;                 // 대체 텍스트
  };
  order: number;                 // 챕터 내 순서
  imageWidth?: number;           // 픽셀 너비
  imageHeight?: number;          // 픽셀 높이
  sizeCategory?: 'small' | 'medium' | 'large'; // 크기 분류
}
```

### ID 네이밍 규칙
- 형식: `{chapter-prefix}-{3자리 숫자}`
- 챕터 접두사:
  - `sg` = Secret Garden
  - `es` = Effortless Spring
  - `ds` = Desert Stories
  - `wt` = Waters of Time

### Size Category 기준
- **small**: 총 픽셀 수 < 500만
- **medium**: 500만 ≤ 총 픽셀 수 < 1000만
- **large**: 총 픽셀 수 ≥ 1000만

## Chapter (챕터)

```typescript
interface Chapter {
  id: ChapterSlug;               // 챕터 slug
  title: string;                 // 영문 제목
  titleKr: string;               // 한국어 제목
  question: string;              // 챕터 대표 질문
  questionKr: string;            // 한국어 질문
  description: string;           // 영문 설명
  descriptionKr: string;         // 한국어 설명
  coverImage: string;            // 대표 이미지
  color: string;                 // 테마 색상
}
```

## Artist (작가)

```typescript
interface Artist {
  name: string;                  // 영문 이름
  nameKr: string;                // 한국어 이름
  education: {
    degree: string;
    institution: string;
    year: number | string;
  }[];
  statement: {
    kr: string;                  // 한국어 작가 소개
    en: string;                  // 영문 작가 소개
  };
  bio: {
    kr: string;
    en: string;
  };
  profileImage: string;          // 프로필 사진 경로
  contact: {
    email: string;
    instagram?: string;
    website?: string;
  };
}
```

## 데이터 검증

```bash
# 전체 검증
node scripts/validate-artworks.js

# JSON 구문 검사
node -e "require('./src/data/artworks.json')"

# TypeScript 타입 검사
npm run build
```

## 모범 사례

1. **일관성 유지**: 모든 작품에 동일한 필드 구조 사용
2. **한국어 병기**: 모든 텍스트에 `Kr` 버전 제공
3. **이미지 경로**: `/public` 기준 절대 경로 사용
4. **순서 연속성**: 각 챕터 내 order는 1부터 연속
5. **백업**: 변경 전 JSON 파일 백업 권장
