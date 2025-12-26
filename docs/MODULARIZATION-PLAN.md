# 모듈화 솔루션 기획서: ArtistFolio

> **목표**: LimHyejung.com 프로젝트를 재사용 가능한 아티스트 포트폴리오 솔루션으로 발전
> **대상**: 비개발자 시각 예술가, 갤러리 협업 작가, 국제 아트페어 참여 작가
> **작성일**: 2025-12-26

---

## 1. 현재 상태 분석

### 1.1 강점 (솔루션화 가능)
| 기능 | 현재 구현 | 재사용 가치 |
|-----|----------|------------|
| SEO/AEO/LLM 최적화 | Schema.org JsonLd, Wikidata 연동 | ⭐⭐⭐⭐⭐ |
| 다국어 지원 | 16개 언어 | ⭐⭐⭐⭐⭐ |
| 어드민 CMS | 코딩 없이 콘텐츠 관리 | ⭐⭐⭐⭐ |
| 작품 갤러리 | 뷰 모드, 라이트박스 | ⭐⭐⭐⭐ |
| 전시/뉴스 시스템 | CRUD, 외부 링크 | ⭐⭐⭐⭐ |
| 파트너십 폼 | 다국어 문의 | ⭐⭐⭐ |

### 1.2 한계점 (개선 필요)
| 항목 | 현재 | 문제점 |
|-----|------|--------|
| 데이터 저장 | JSON 파일 | 실시간 CMS 불가 |
| 테넌시 | 단일 작가 | 다중 작가 미지원 |
| 이미지 | 로컬 저장 | CDN 필요 |
| 인증 | 단순 비밀번호 | 보안 취약 |
| 테마 | 하드코딩 | 커스터마이징 어려움 |

---

## 2. 솔루션 비전

### 제품명: ArtistFolio

### 슬로건
> "Your Art, Your Story, Discovered by the World"

### 핵심 가치 제안
1. **5분 만에 프로페셔널 포트폴리오** - CLI로 즉시 생성
2. **SEO/AI 최적화 내장** - ChatGPT, Gemini가 작가를 인용
3. **갤러리 비즈니스 지원** - 파트너십, 다국어 대응
4. **개발자 없이 운영** - 어드민 CMS 기본 제공

---

## 3. 모듈 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                    @artistfolio/cli                         │
│         npx artistfolio create / deploy / seo-check         │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                  @artistfolio/templates                     │
│              minimal / gallery / magazine                   │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                     @artistfolio/ui                         │
│    ArtworkGallery / ExhibitionList / AdminLayout / ...      │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                  @artistfolio/adapters                      │
│        JsonFile / Supabase / Contentful / Strapi            │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                    @artistfolio/core                        │
│      Types / SEO Utils / i18n / JsonLd / Validators         │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. 패키지 상세 설계

### 4.1 @artistfolio/core

```typescript
// 타입 정의
export interface ArtistConfig {
  id: string;
  name: string;
  nameLocalized: Record<LocaleCode, string>;
  birthYear?: number;
  nationality?: string;
  externalIds: ExternalIds;
  theme?: ThemeConfig;
}

export interface ArtworkConfig { ... }
export interface ExhibitionConfig { ... }

// SEO 유틸리티
export function generatePersonJsonLd(artist: ArtistConfig): JsonLd;
export function generateArtworkJsonLd(artwork: ArtworkConfig): JsonLd;
export function generateSitemap(config: SiteConfig): string;

// i18n 유틸리티
export function getLocalizedText<T extends MultilingualText>(
  text: T,
  locale: LocaleCode,
  fallback?: LocaleCode
): string;

export function detectBrowserLocale(): LocaleCode;
```

### 4.2 @artistfolio/adapters

```typescript
// 데이터 어댑터 인터페이스
export interface DataAdapter {
  // Artist
  getArtist(): Promise<ArtistConfig>;
  updateArtist(data: Partial<ArtistConfig>): Promise<void>;

  // Artworks
  getArtworks(): Promise<ArtworkConfig[]>;
  getArtwork(id: string): Promise<ArtworkConfig | null>;
  createArtwork(data: ArtworkConfig): Promise<string>;
  updateArtwork(id: string, data: Partial<ArtworkConfig>): Promise<void>;
  deleteArtwork(id: string): Promise<void>;

  // Exhibitions
  getExhibitions(): Promise<ExhibitionConfig[]>;
  // ...

  // News
  getNews(): Promise<NewsConfig[]>;
  // ...
}

// 구현체
export class JsonFileAdapter implements DataAdapter { ... }
export class SupabaseAdapter implements DataAdapter { ... }
export class ContentfulAdapter implements DataAdapter { ... }
export class StrapiAdapter implements DataAdapter { ... }
```

### 4.3 @artistfolio/ui

```typescript
// 작품 갤러리
export function ArtworkGallery({
  artworks: ArtworkConfig[];
  viewMode?: 'grid' | 'list' | 'masonry';
  onArtworkClick?: (artwork: ArtworkConfig) => void;
  theme?: ThemeConfig;
}): JSX.Element;

// 라이트박스
export function LightboxModal({
  artwork: ArtworkConfig;
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element;

// 전시 목록
export function ExhibitionList({
  exhibitions: ExhibitionConfig[];
  filter?: 'all' | 'current' | 'upcoming' | 'past';
}): JSX.Element;

// 어드민 레이아웃
export function AdminLayout({
  children: ReactNode;
  navigation?: NavItem[];
  authProvider?: AuthProvider;
}): JSX.Element;

// 어드민 테이블
export function AdminTable<T>({
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}): JSX.Element;
```

### 4.4 @artistfolio/templates

```
/templates
├── minimal/           # 미니멀 화이트 디자인
│   ├── pages/
│   ├── components/
│   └── styles/
│
├── gallery/           # 갤러리 스타일 (다크)
│   ├── pages/
│   ├── components/
│   └── styles/
│
├── magazine/          # 매거진 레이아웃
│   ├── pages/
│   ├── components/
│   └── styles/
│
└── base/              # 공통 베이스
    ├── _app.tsx
    ├── _document.tsx
    └── admin/
```

### 4.5 @artistfolio/cli

```bash
# 프로젝트 생성
npx artistfolio create my-portfolio
? Select template: (minimal / gallery / magazine)
? Select data adapter: (json / supabase / contentful)
? Artist name: Lim Hyejung
? Primary language: ko

# 작품 추가
npx artistfolio add artwork
? Title: New Artwork
? Year: 2024
? Image path: ./my-image.jpg

# SEO 검사
npx artistfolio seo-check
✓ Schema.org validation passed
✓ OpenGraph tags present
✓ Sitemap generated
✗ Wikidata not linked (optional)

# 배포
npx artistfolio deploy
? Deploy to: (vercel / netlify)
Deploying to Vercel...
✓ Deployed: https://my-portfolio.vercel.app
```

---

## 5. 테마 시스템

### 5.1 테마 설정 구조
```typescript
interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    container: string;
    section: string;
  };
  borderRadius: string;
}
```

### 5.2 기본 테마
```typescript
export const themes = {
  minimal: {
    colors: {
      primary: '#2F4F4F',
      background: '#FAFAFA',
      // ...
    }
  },
  gallery: {
    colors: {
      primary: '#C9A959',
      background: '#1A1A1A',
      // ...
    }
  },
  magazine: {
    colors: {
      primary: '#E63946',
      background: '#F1FAEE',
      // ...
    }
  }
};
```

---

## 6. 구현 로드맵

### Phase A: 코어 추출 (2주)
```
Week 1:
├── [ ] types/index.ts → @artistfolio/core/types
├── [ ] i18n 유틸리티 추출
└── [ ] SEO/JsonLd 유틸리티 추출

Week 2:
├── [ ] 단위 테스트 작성
├── [ ] npm 패키지 설정
└── [ ] README 문서화
```

### Phase B: 데이터 추상화 (2주)
```
Week 3:
├── [ ] DataAdapter 인터페이스 정의
├── [ ] JsonFileAdapter 구현
└── [ ] 기존 코드 리팩토링

Week 4:
├── [ ] SupabaseAdapter 구현
├── [ ] 마이그레이션 스크립트
└── [ ] 어댑터 테스트
```

### Phase C: UI 라이브러리 (3주)
```
Week 5:
├── [ ] Storybook 설정
├── [ ] ArtworkGallery 컴포넌트 분리
└── [ ] LightboxModal 컴포넌트 분리

Week 6:
├── [ ] ExhibitionList/Card 분리
├── [ ] ContactForm 분리
└── [ ] 테마 시스템 구현

Week 7:
├── [ ] AdminLayout 분리
├── [ ] AdminTable/Form 분리
└── [ ] 컴포넌트 문서화
```

### Phase D: CLI & 템플릿 (2주)
```
Week 8:
├── [ ] CLI 기본 구조
├── [ ] create 명령어
└── [ ] add artwork 명령어

Week 9:
├── [ ] seo-check 명령어
├── [ ] deploy 명령어
├── [ ] 3개 템플릿 완성
└── [ ] create-artistfolio 패키지
```

### Phase E: 문서화 & 런칭 (1주)
```
Week 10:
├── [ ] API 문서 (TypeDoc)
├── [ ] 튜토리얼 (Getting Started)
├── [ ] 예제 프로젝트
└── [ ] npm 배포
```

---

## 7. 비즈니스 모델 (선택적)

### 7.1 오픈소스 + 프리미엄
| 티어 | 가격 | 포함 내용 |
|-----|------|----------|
| Free | $0 | 코어 패키지, 1개 템플릿, JSON 어댑터 |
| Pro | $9/월 | 모든 템플릿, Supabase 어댑터, 우선 지원 |
| Agency | $49/월 | 다중 사이트, 화이트라벨, 커스텀 어댑터 |

### 7.2 수익 채널
- 프리미엄 템플릿 판매
- 호스팅 서비스 (관리형)
- 기업 라이선스
- 커스텀 개발

---

## 8. 경쟁 분석

| 서비스 | 장점 | 단점 | ArtistFolio 차별점 |
|-------|------|------|-------------------|
| Squarespace | 쉬운 사용 | SEO 제한적 | LLM 최적화 |
| Cargo | 아티스트 특화 | 비싸다 | 오픈소스 |
| Format | 포트폴리오 특화 | 커스텀 제한 | 개발자 친화 |
| WordPress | 유연함 | 복잡함 | 제로 설정 |

---

## 9. 기술 선택 이유

| 기술 | 선택 이유 |
|-----|----------|
| Next.js 14 | App Router, 서버 컴포넌트, 이미지 최적화 |
| TypeScript | 타입 안전성, IDE 지원 |
| Tailwind | 빠른 스타일링, 테마 시스템 |
| Supabase | 오픈소스, PostgreSQL, 실시간 |
| Vercel | Next.js 최적화, 자동 배포 |
| Cloudinary | 이미지 CDN, 변환 API |

---

## 10. 체크리스트

### 모듈화 전 준비
- [ ] 현재 코드베이스 정리
- [ ] 테스트 커버리지 확보
- [ ] 의존성 정리
- [ ] 문서화 기준 수립

### 패키지 출시 체크리스트
- [ ] package.json 메타데이터
- [ ] README.md
- [ ] CHANGELOG.md
- [ ] LICENSE (MIT)
- [ ] .npmignore
- [ ] 타입 정의 (.d.ts)
- [ ] ESM/CJS 듀얼 빌드

---

*문서 버전: 1.0 | 마지막 업데이트: 2025-12-26*
