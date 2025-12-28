# Artist Portfolio 모듈화 로드맵

> 작성일: 2025-12-26
> 목표: 단일 아티스트 포트폴리오 → SaaS 솔루션 전환

---

## 1. 현재 아키텍처 분석

### 1.1 프로젝트 구조
```
/src
├── app/                 # Next.js App Router
│   ├── admin/          # 어드민 시스템 (7개 페이지)
│   ├── api/            # API 라우트 (5개)
│   └── [pages]/        # 프론트엔드 페이지
├── components/          # React 컴포넌트 (30+개)
├── data/               # JSON 데이터 (12개 파일)
├── types/              # TypeScript 타입 정의
├── lib/                # 유틸리티 함수
└── i18n/               # 국제화 시스템
```

### 1.2 모듈화 점수: 7.5/10

| 영역 | 점수 | 설명 |
|------|------|------|
| 데이터 관리 | ★★★★★ | JSON 기반, 타입 안전 |
| 타입 시스템 | ★★★★★ | Zod + TypeScript |
| SEO 컴포넌트 | ★★★★★ | 재사용성 높음 |
| i18n 시스템 | ★★★★☆ | 15개 언어, 레거시 혼용 |
| 어드민 시스템 | ★★☆☆☆ | 도메인 강결합 |
| API 라우트 | ★★★☆☆ | 파일 기반 저장소 |

---

## 2. 핵심 문제점

### 2.1 하드코딩된 영역

```typescript
// Header.tsx - 네비게이션 상수
const mainNavigation = [
  { name: 'Works', href: '/#works' },
  { name: 'Exhibitions', href: '/exhibitions' },
  // ... 하드코딩됨
]

// Admin Layout - 사이드바 메뉴 상수
const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  // ... 하드코딩됨
]
```

### 2.2 파일 기반 저장소 한계

```typescript
// API에서 JSON 직접 수정
import fs from 'fs/promises'
const data = await fs.readFile(path, 'utf-8')
await fs.writeFile(path, JSON.stringify(updated, null, 2))
```

**문제점**:
- 동시 수정 시 데이터 손실 가능
- 트랜잭션 지원 없음
- 검색/필터링 성능 제한

### 2.3 클라이언트 측 인증

```typescript
// 환경변수가 클라이언트에 노출됨
const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
```

**문제점**:
- 브라우저 개발자 도구에서 비밀번호 확인 가능
- 세션 관리 미흡

---

## 3. 실행 계획

### Phase 1: 설정 중앙화 (1-2주)

#### 목표
네비게이션, 메뉴 등 하드코딩된 설정을 config.json으로 이동

#### 작업 항목

| 작업 | 파일 | 예상 시간 |
|------|------|----------|
| config.json에 navigation 추가 | /src/data/config.json | 1h |
| Header.tsx 수정 | /src/components/layout/Header.tsx | 2h |
| Admin Layout 수정 | /src/app/admin/layout.tsx | 2h |
| Footer.tsx 수정 | /src/components/layout/Footer.tsx | 1h |

#### config.json 확장 예시
```json
{
  "navigation": {
    "main": [
      { "name": "Works", "href": "/#works", "nameKr": "작품" },
      { "name": "Exhibitions", "href": "/exhibitions", "nameKr": "전시" }
    ],
    "admin": [
      { "name": "Dashboard", "href": "/admin", "icon": "LayoutDashboard" }
    ]
  }
}
```

### Phase 2: API 개선 (2-3주)

#### 목표
API 라우트에 타입 검증 추가, 에러 핸들링 강화

#### 작업 항목

| 작업 | 파일 | 예상 시간 |
|------|------|----------|
| Zod 스키마 생성 | /src/lib/api-schemas.ts | 3h |
| exhibitions API 개선 | /src/app/api/exhibitions/route.ts | 2h |
| news API 개선 | /src/app/api/news/route.ts | 2h |
| faq API 개선 | /src/app/api/faq/route.ts | 1h |
| 에러 응답 표준화 | /src/lib/api-utils.ts | 2h |

### Phase 3: 인증 시스템 개선 (1주)

#### 목표
서버 사이드 세션 기반 인증으로 전환

#### 옵션 비교

| 방법 | 복잡도 | 보안 | 권장 |
|------|--------|------|------|
| JWT + httpOnly Cookie | 중 | 높음 | ✅ |
| NextAuth.js | 높음 | 매우 높음 | 대규모 시 |
| 현재 유지 | 낮음 | 낮음 | ❌ |

### Phase 4: Database 마이그레이션 (3-4주)

#### 목표
JSON 파일 → 데이터베이스 전환

#### 권장 스택
- **Supabase** (PostgreSQL + 실시간 + 인증)
- 또는 **PlanetScale** (MySQL, 서버리스)

#### 마이그레이션 순서
1. exhibitions → DB 테이블
2. news → DB 테이블
3. faq → DB 테이블
4. artworks → DB 테이블 (대용량)

### Phase 5: 패키지화 (2-3개월)

#### 목표
Monorepo로 재구성, 재사용 가능한 패키지 추출

#### Monorepo 구조
```
packages/
├── @artist-portfolio/core      # 타입, 스키마, 설정
├── @artist-portfolio/ui        # 공용 컴포넌트
├── @artist-portfolio/api       # API 유틸리티
├── @artist-portfolio/admin     # 어드민 시스템
└── @artist-portfolio/templates # 템플릿

apps/
├── limhyejung.com             # 현재 프로젝트
└── demo-site                  # 데모/문서
```

---

## 4. 패키지별 내용

### @artist-portfolio/core

```typescript
// 타입 정의
export interface Artwork { ... }
export interface Artist { ... }
export interface Exhibition { ... }

// Zod 스키마
export const artworkSchema = z.object({ ... })

// 설정 로더
export function loadConfig(path: string): Config
```

### @artist-portfolio/ui

```typescript
// 공용 컴포넌트
export { LanguageSelector } from './LanguageSelector'
export { ScrollIndicator } from './ScrollIndicator'
export { ArtworkCard } from './ArtworkCard'
export { LightboxModal } from './LightboxModal'

// SEO 컴포넌트
export { JsonLd } from './seo/JsonLd'
export { PersonJsonLd } from './seo/PersonJsonLd'
```

### @artist-portfolio/admin

```typescript
// CRUD 제네릭 템플릿
export { DataTable } from './DataTable'
export { FormBuilder } from './FormBuilder'
export { ImageGridSelector } from './ImageGridSelector'

// 인증
export { AuthProvider } from './AuthProvider'
export { withAuth } from './withAuth'
```

---

## 5. SaaS 모델 구상

### 5.1 가격 정책 (예시)

| 플랜 | 가격 | 기능 |
|------|------|------|
| Free | $0 | 1 아티스트, 기본 템플릿 |
| Pro | $19/월 | 5 아티스트, 커스텀 도메인 |
| Business | $49/월 | 무제한, 화이트라벨, API |

### 5.2 필수 기능

- [ ] 다중 테넌트 지원
- [ ] 결제 시스템 (Stripe)
- [ ] 사용량 추적
- [ ] 화이트라벨 옵션
- [ ] API 제공

---

## 6. 체크리스트

### 즉시 실행 (이번 주)
- [ ] config.json에 navigation 추가
- [ ] Header.tsx config에서 읽도록 수정
- [ ] Admin layout config에서 읽도록 수정

### 단기 (1개월)
- [ ] API Zod 검증 추가
- [ ] 서버 사이드 인증 구현
- [ ] 에러 핸들링 표준화

### 중기 (3개월)
- [ ] Supabase 마이그레이션
- [ ] Monorepo 구성
- [ ] 패키지 추출

### 장기 (6개월)
- [ ] SaaS 런칭
- [ ] 다중 테넌트
- [ ] 결제 시스템

---

## 7. 참고 자료

- [CLAUDE.md](/CLAUDE.md) - 프로젝트 컨벤션
- [CLAUDE.local.md](/CLAUDE.local.md) - 작업 히스토리
- [phase4-seo-aeo-llm-implementation.md](/docs/phase4-seo-aeo-llm-implementation.md) - SEO 구현
- [phase9-admin-system-enhancement.md](/docs/phase9-admin-system-enhancement.md) - 어드민 확장
