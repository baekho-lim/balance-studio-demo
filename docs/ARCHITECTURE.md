# 프로젝트 아키텍처 문서

> **프로젝트**: Lim Hyejung Artist Portfolio
> **기술 스택**: Next.js 14, TypeScript, Tailwind CSS
> **최종 업데이트**: 2025-12-26

---

## 1. 기술 스택 개요

| 카테고리 | 기술 | 버전/상세 |
|---------|------|----------|
| Framework | Next.js | 14 (App Router) |
| Language | TypeScript | Strict Mode |
| Styling | Tailwind CSS | 3.x |
| Testing | Playwright | Visual Regression |
| Deployment | Vercel | Auto-deploy on push |
| Data | JSON Files | `/src/data/` |
| Images | Local + Cloudinary | 하이브리드 |
| SEO | Schema.org JsonLd | Person, FAQPage, Event |

---

## 2. 디렉토리 구조

```
/src
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 홈페이지
│   ├── about/                    # 작가 소개
│   ├── works/                    # 작품 갤러리
│   ├── exhibitions/              # 전시 목록
│   ├── exhibitions/[slug]/       # 전시 상세
│   ├── news/                     # 뉴스 목록
│   ├── news/[slug]/              # 뉴스 상세
│   ├── faq/                      # FAQ
│   ├── partnership/              # 파트너십 문의
│   ├── gallery/                  # 갤러리 페이지
│   ├── story/                    # 스토리 페이지
│   ├── catalog/                  # PDF 카탈로그
│   ├── admin/                    # 어드민 CMS
│   │   ├── page.tsx              # 대시보드
│   │   ├── exhibitions/          # 전시 관리
│   │   ├── news/                 # 뉴스 관리
│   │   ├── faq/                  # FAQ 관리
│   │   ├── seo/                  # SEO 상태
│   │   ├── strategy/             # 전략 대시보드
│   │   └── media/                # 미디어 라이브러리
│   └── api/                      # API Routes
│       ├── exhibitions/
│       ├── news/
│       ├── faq/
│       └── generate-pdf/
│
├── components/
│   ├── home/                     # 홈 페이지 컴포넌트
│   │   ├── Hero.tsx
│   │   ├── ArtistIntro.tsx
│   │   ├── ChapterTeaser.tsx
│   │   └── ContactSection.tsx
│   ├── layout/                   # 레이아웃
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── LayoutWrapper.tsx
│   ├── works/                    # 작품 관련
│   │   ├── ArtworkCard.tsx
│   │   ├── LightboxModal.tsx
│   │   └── ViewModeSelector.tsx
│   ├── seo/                      # SEO 컴포넌트
│   │   ├── JsonLd.tsx
│   │   └── PersonJsonLd.tsx
│   ├── print/                    # 인쇄/PDF
│   │   ├── CatalogPrintStyles.tsx
│   │   ├── PostcardPrintStyles.tsx
│   │   └── PrintSpecsGuide.tsx
│   └── ui/                       # UI 공통
│       ├── LanguageSelector.tsx
│       └── ScrollIndicator.tsx
│
├── data/                         # JSON 데이터
│   ├── artist.json               # 작가 정보
│   ├── artworks.json             # 작품 메타데이터
│   ├── chapters.json             # 챕터/시리즈
│   ├── exhibitions.json          # 전시 정보
│   ├── news.json                 # 뉴스/보도자료
│   ├── faq.json                  # FAQ
│   ├── catalog.json              # 카탈로그 데이터
│   ├── config.json               # 사이트 설정
│   └── ...
│
├── types/
│   └── index.ts                  # TypeScript 타입 정의
│
└── lib/                          # 유틸리티 (필요시)
    └── i18n.ts                   # 다국어 유틸
```

---

## 3. 핵심 데이터 모델

### 3.1 Artist (작가)
```typescript
interface Artist {
  name: string;
  nameKr: string;
  birthYear?: number;
  nationality?: string;
  education: Education[];
  externalIds?: {
    instagram?: string;
    wikidata?: string;    // "Q137589862"
    viaf?: string;
    ulan?: string;
  };
  affiliations?: Affiliation[];
  statement: { kr: string; en: string };
  bio: { kr: string; en: string };
  profileImage: string;
  contact: { email?: string; instagram?: string };
}
```

### 3.2 Artwork (작품)
```typescript
interface Artwork {
  id: string;             // "sg-001"
  title: string;
  titleKr?: string;
  year: number;
  chapter: ChapterSlug;
  medium: string;
  dimensions?: string;
  images: {
    thumbnail: string;
    full: string;
    alt: string;
  };
  imageWidth?: number;
  imageHeight?: number;
  orientation?: 'portrait' | 'landscape' | 'square';
}
```

### 3.3 Exhibition (전시)
```typescript
interface Exhibition {
  id: string;
  title: string;
  type: 'solo' | 'group';
  venue: string;
  city: string;
  country: string;
  countryCode: string;
  startDate: string;      // "YYYY-MM-DD"
  endDate?: string;
  status: 'upcoming' | 'current' | 'past';
  links?: ExhibitionLinks;
  organizers?: ExhibitionOrganizer[];
  featured: boolean;
}
```

### 3.4 NewsArticle (뉴스)
```typescript
interface NewsArticle {
  id: string;
  type: 'press-release' | 'interview' | 'review';
  title: MultilingualText;
  slug: string;
  publishDate: string;
  content: MultilingualText;  // Markdown
  exhibition?: string;        // 관련 전시 ID
  featured: boolean;
}
```

---

## 4. 다국어 지원

### 지원 언어 (16개)
```typescript
type LocaleCode =
  | 'en' | 'ko' | 'vi' | 'ja'
  | 'zh-CN' | 'zh-TW'
  | 'de' | 'fr' | 'es' | 'it' | 'pt'
  | 'ar' | 'ru' | 'id' | 'ms' | 'th';
```

### 다국어 텍스트 구조
```typescript
interface MultilingualText {
  en: string;           // 필수
  ko: string;           // 필수
  vi?: string;          // 선택
  ja?: string;          // 선택
  // ...
}
```

---

## 5. SEO/AEO/LLM 최적화 구조

### 5.1 Schema.org JsonLd
| 타입 | 위치 | 용도 |
|-----|------|------|
| Person | /about | 작가 Entity |
| VisualArtwork | /works | 작품 정보 |
| FAQPage | /faq | FAQ 스키마 |
| ExhibitionEvent | /exhibitions | 전시 정보 |
| NewsArticle | /news | 보도자료 |

### 5.2 외부 Entity 연결
```
limhyejung.com
     ↓ sameAs
├── Wikidata (Q137589862)
├── Instagram (@limhyejung_artworks)
├── SeoulTech (alumniOf)
└── TomuraLee Gallery (representedBy)
```

### 5.3 AI 크롤러 지원
- `/public/llm-context.json` - 구조화된 작가 데이터
- `/robots.txt` - AI 크롤러 허용 (GPTBot, Claude-Web 등)

---

## 6. 어드민 시스템

### 6.1 인증
- 단순 비밀번호 기반 (환경변수)
- sessionStorage로 세션 유지

### 6.2 어드민 페이지
| 경로 | 기능 |
|-----|------|
| /admin | 대시보드 |
| /admin/exhibitions | 전시 CRUD |
| /admin/news | 뉴스 CRUD |
| /admin/faq | FAQ CRUD |
| /admin/seo | SEO 상태 모니터링 |
| /admin/strategy | 10년 로드맵, 점수 추적 |
| /admin/media | 미디어 라이브러리 |

### 6.3 API 엔드포인트
| 경로 | 메소드 | 기능 |
|-----|--------|------|
| /api/exhibitions | GET/POST/PUT/DELETE | 전시 CRUD |
| /api/news | GET/POST/PUT/DELETE | 뉴스 CRUD |
| /api/faq | GET/POST/PUT/DELETE | FAQ CRUD |

---

## 7. 이미지 처리

### 7.1 저장 위치
```
/public/images/
├── works/           # 작품 이미지
│   └── 2024/        # 년도별 정리
├── artist/          # 작가 사진
├── chapters/        # 챕터 커버
└── hero/            # 히어로 이미지
```

### 7.2 Next.js Image 최적화
- `<Image>` 컴포넌트 사용
- `fill` + `object-cover` 패턴
- `sizes` prop으로 반응형

### 7.3 Cloudinary 연동 (Phase 10b)
- Cloud Name: `dyoq0aake`
- 드래그앤드롭 업로드 예정

---

## 8. 배포

### Vercel 자동 배포
```bash
git push origin main  # → Vercel 자동 빌드/배포
```

### 환경변수
| 변수 | 용도 |
|-----|------|
| NEXT_PUBLIC_ADMIN_PASSWORD | 어드민 비밀번호 |
| CLOUDINARY_CLOUD_NAME | Cloudinary |
| CLOUDINARY_API_KEY | Cloudinary |
| CLOUDINARY_API_SECRET | Cloudinary |

---

## 9. 테스팅

### Playwright Visual Regression
```bash
npm run test:visual          # 테스트 실행
npm run test:visual:update   # 스냅샷 업데이트
npm run test:visual:ui       # UI 모드
```

### 테스트 대상
- 카탈로그 PDF 렌더링
- 이미지 가시성 확인
- 레이아웃 검증

---

## 10. 알려진 이슈 및 해결책

| 이슈 | 해결책 |
|-----|--------|
| Webpack 캐시 오류 | `rm -rf .next && npm run dev` |
| 이미지 경로 오류 | 파일명 공백/특수문자 제거 |
| Git 인증 실패 | PAT 토큰 URL 포함 |
| HMR 미반영 | 서버 재시작 |

---

*문서 버전: 1.0 | 마지막 업데이트: 2025-12-26*
