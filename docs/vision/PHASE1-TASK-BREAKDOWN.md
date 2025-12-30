# Phase 1 상세 Task Breakdown

> **목표**: MVP 3개 템플릿 완성, 15개 고객사 확보
> **기간**: 6개월 (2025 Q1-Q2)
> **현재 상태**: 데모 3개 완료 (필라테스, 펫케어, 이커머스)

---

## 1. 인프라 정비 (Week 1-2)

### 1.1 Monorepo 전환 (Turborepo)

**목표**: 현재 Single Repo를 Monorepo로 전환하여 패키지 분리 준비

```
commerce-growth-os/
├── apps/
│   ├── platform/              # 현재 LimHyejung.com 코드
│   ├── docs/                  # 문서 사이트 (Nextra)
│   └── storybook/             # UI 컴포넌트 문서
├── packages/
│   ├── core/                  # @cgos/core
│   ├── ui/                    # @cgos/ui
│   ├── templates/             # @cgos/templates
│   └── config/                # 공유 설정
├── tools/
│   └── cli/                   # create-cgos-site
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

**Tasks**:
- [ ] Turborepo 초기화
- [ ] pnpm workspace 설정
- [ ] 기존 코드를 `apps/platform`으로 이동
- [ ] turbo.json 파이프라인 설정
- [ ] 빌드/테스트 검증

### 1.2 패키지 분리

**@cgos/core** (Week 1):
- [ ] 타입 정의 (`types/`)
- [ ] 유틸리티 함수 (`utils/`)
- [ ] i18n 설정 (`i18n/`)
- [ ] 공통 상수 (`constants/`)

**@cgos/ui** (Week 1-2):
- [ ] Atoms (Button, Input, Badge, Icon)
- [ ] Molecules (SearchBar, PriceCard, KpiCard)
- [ ] Organisms (Header, Footer, Sidebar, Modal)
- [ ] Storybook 설정

**@cgos/templates** (Week 2):
- [ ] 필라테스 템플릿 분리
- [ ] 펫케어(FitDog) 템플릿 분리
- [ ] 이커머스(Commerce) 템플릿 분리

---

## 2. 쇼케이스 통합 페이지 (Week 2-3)

### 2.1 데이터 구조

```typescript
// src/data/showcase.json
{
  "portfolio": [
    {
      "id": "limhyejung",
      "name": { "en": "Lim Hyejung", "ko": "임혜정" },
      "type": "portfolio",
      "industry": "artist",
      "url": "https://limhyejung.com",
      "thumbnail": "/images/showcase/limhyejung-thumb.jpg",
      "description": {
        "en": "Artist portfolio with gallery, exhibitions, multilingual support",
        "ko": "작품 갤러리, 전시 정보, 다국어 지원 아티스트 포트폴리오"
      },
      "features": ["gallery", "exhibitions", "multilingual", "seo"],
      "techStack": ["Next.js 14", "TypeScript", "Tailwind"],
      "completedAt": "2024-12-01",
      "caseStudy": {
        "duration": "4주",
        "highlights": ["SEO 최적화로 구글 1페이지 노출", "다국어 지원 (한/영/베트남어)"]
      }
    }
  ],
  "demos": [
    {
      "id": "pilates",
      "name": { "en": "Balance Studio", "ko": "밸런스 스튜디오" },
      "type": "demo",
      "industry": "pilates",
      "demoUrl": "/demo/pilates",
      "thumbnail": "/images/showcase/pilates-thumb.jpg",
      "description": {
        "en": "Pilates studio with booking, instructors, pricing",
        "ko": "예약, 강사 소개, 가격표를 갖춘 필라테스 스튜디오"
      },
      "features": ["booking", "instructors", "pricing", "seo"],
      "templateId": "pilates"
    },
    {
      "id": "fitdog",
      "name": { "en": "FitDog", "ko": "핏독" },
      "type": "demo",
      "industry": "petcare",
      "demoUrl": "/demo/fitdog",
      "thumbnail": "/images/showcase/fitdog-thumb.jpg",
      "description": {
        "en": "Pet care service with booking, pet profiles",
        "ko": "예약, 반려동물 프로필을 갖춘 펫케어 서비스"
      },
      "features": ["booking", "pet-profiles", "gallery", "seo"],
      "templateId": "petcare"
    },
    {
      "id": "commerce",
      "name": { "en": "Commerce Growth OS", "ko": "커머스 그로스 OS" },
      "type": "demo",
      "industry": "ecommerce",
      "demoUrl": "/demo/commerce",
      "thumbnail": "/images/showcase/commerce-thumb.jpg",
      "description": {
        "en": "E-commerce analytics platform with CRM, ads, content studio",
        "ko": "CRM, 광고, 콘텐츠 스튜디오를 갖춘 이커머스 분석 플랫폼"
      },
      "features": ["crm", "analytics", "ads", "content-studio", "seo"],
      "templateId": "ecommerce"
    }
  ]
}
```

### 2.2 페이지 구현

**라우트**: `/showcase`

**기능**:
- [ ] 필터 탭: [전체] [포트폴리오] [데모]
- [ ] 업종 필터: [전체] [아티스트] [필라테스] [펫케어] [이커머스]
- [ ] 카드 그리드 (반응형)
- [ ] 카드 클릭 → 상세 모달 또는 외부 링크
- [ ] "이 템플릿으로 시작하기" CTA → `/start?templateId=xxx`

---

## 3. 프로토타입 생성기 v0.1 (Week 3-4)

### 3.1 CLI 도구 기초

```bash
# 사용 예시
npx create-cgos-site my-studio

? 업종을 선택하세요: 필라테스/요가
? 비즈니스명: My Studio
? 기본 언어: 한국어
? 관리자 이메일: admin@mystudio.com

✓ 프로젝트 생성 중...
✓ 의존성 설치 중...
✓ 샘플 데이터 생성 중...

🎉 완료! 다음 명령어로 시작하세요:
   cd my-studio
   npm run dev
```

**Tasks**:
- [ ] CLI 패키지 구조 (`tools/cli/`)
- [ ] 대화형 프롬프트 (inquirer)
- [ ] 템플릿 복사 로직
- [ ] 설정 파일 생성 (`site.config.json`)
- [ ] 샘플 데이터 주입

### 3.2 자동 배포 (Week 4)

- [ ] Vercel CLI 연동
- [ ] 환경변수 자동 설정
- [ ] Preview URL 생성
- [ ] Slack/Email 알림

---

## 4. SEO/AEO 자동화 (Week 4-5)

### 4.1 Schema.org 자동 생성

업종별 스키마 매핑:
| 업종 | Schema Type |
|------|-------------|
| 필라테스 | HealthAndBeautyBusiness, Course |
| 펫케어 | LocalBusiness, Service |
| 이커머스 | Organization, Product, FAQPage |
| 레스토랑 | Restaurant, Menu |
| 아티스트 | Person, ArtGallery, VisualArtwork |

**Tasks**:
- [ ] 업종별 JSON-LD 템플릿
- [ ] 설정 기반 자동 생성
- [ ] Sitemap 자동 생성
- [ ] robots.txt 자동 생성

### 4.2 메타태그 자동화

- [ ] 페이지별 title/description 생성
- [ ] OpenGraph 태그
- [ ] Twitter Card
- [ ] Canonical URL

---

## 5. 관리자 CMS 고도화 (Week 5-6)

### 5.1 공통 관리자 기능

- [ ] 미디어 라이브러리 (Cloudinary 연동)
- [ ] 블로그/뉴스 CRUD
- [ ] FAQ 관리
- [ ] 연락처/문의 관리
- [ ] SEO 설정 UI

### 5.2 업종별 관리자 기능

**필라테스**:
- [ ] 클래스 스케줄 관리
- [ ] 강사 관리
- [ ] 가격표 관리
- [ ] 예약 조회

**펫케어**:
- [ ] 서비스 관리
- [ ] 펫 프로필 조회
- [ ] 예약 조회

**이커머스**:
- [ ] 고객 분석 대시보드
- [ ] CRM 캠페인
- [ ] 콘텐츠 발행

---

## 6. 첫 고객 확보 (Week 6+)

### 6.1 영업 도구

- [ ] 쇼케이스 페이지 완성
- [ ] 견적 요청 폼 (`/inquiry` 또는 `/start`)
- [ ] 프로토타입 5분 생성 데모
- [ ] 가격표 페이지

### 6.2 마케팅

- [ ] SEO 콘텐츠 (블로그)
- [ ] 소셜 미디어
- [ ] 네트워크 영업 (지인, 커뮤니티)

---

## 체크포인트

### Week 2 체크포인트
- [ ] Monorepo 전환 완료
- [ ] 패키지 분리 완료 (@cgos/core, @cgos/ui)
- [ ] 기존 기능 정상 동작 확인

### Week 4 체크포인트
- [ ] 쇼케이스 페이지 완료
- [ ] CLI v0.1 동작
- [ ] 프로토타입 10분 내 생성 가능

### Week 6 체크포인트
- [ ] SEO 자동화 완료
- [ ] 관리자 CMS 완성
- [ ] 첫 견적 요청 수신

---

## 성공 지표

| 지표 | 목표 |
|------|------|
| 프로토타입 생성 시간 | < 10분 (v0.1), < 5분 (v1.0) |
| 코드 재사용률 | > 70% |
| Lighthouse Score | > 90 |
| 첫 고객 계약 | Week 8 이내 |

---

*작성일: 2025-12-31*
*버전: 1.0*
