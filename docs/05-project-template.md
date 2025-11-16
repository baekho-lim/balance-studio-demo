# Artist Portfolio Project Template

새 아티스트 포트폴리오 프로젝트를 시작할 때 참고하는 완전한 가이드입니다.

---

## Phase 1: 사전 준비 (개발 전)

### 필수 자료 수집

#### 작품 자료
- [ ] 모든 작품 고해상도 이미지
- [ ] 작품별 메타데이터 스프레드시트:
  - 제목 (영문/한글)
  - 제작 연도
  - 물리적 크기 (cm)
  - 재료/기법
  - 작품 설명 또는 관련 질문
- [ ] 챕터/시리즈 구분 및 순서

#### 작가 자료
- [ ] 프로필 사진 (얼굴이 잘 보이는 것)
- [ ] 작가 소개문 (한/영)
- [ ] 학력 및 경력
- [ ] 연락처 (이메일, 인스타그램 등)

#### 기술 환경
- [ ] 도메인 결정
- [ ] 호스팅 플랫폼 (Vercel 권장)
- [ ] Git 저장소 생성
- [ ] CI/CD 파이프라인 설정

---

## Phase 2: 프로젝트 초기화

```bash
# 1. Next.js 프로젝트 생성
npx create-next-app@latest artist-portfolio --typescript --tailwind --app

# 2. 프로젝트 구조 생성
mkdir -p src/{data,types,components/{home,works,layout}}
mkdir -p public/images/{works,profile}
mkdir -p scripts docs
mkdir -p .claude/commands
```

### 기본 타입 정의
```typescript
// src/types/index.ts
export type ChapterSlug = 'chapter-1' | 'chapter-2' | ...;

export interface Artwork { /* ... */ }
export interface Chapter { /* ... */ }
export interface Artist { /* ... */ }
```

### JSON 데이터 구조
```
src/data/
├── artworks.json     # 작품 데이터
├── chapters.json     # 챕터 정보
└── artist.json       # 작가 정보
```

---

## Phase 3: 이미지 처리

### Step 1: 파일명 정규화
```bash
# 일관된 명명 규칙으로 변경
# {번호}.{작품명}.{확장자}
```

### Step 2: 메타데이터 추출
```bash
# 픽셀 크기 추출
node scripts/extract-dimensions.js
```

### Step 3: JSON 생성
```bash
# 스프레드시트 → JSON 변환
node scripts/generate-artworks-json.js
```

### Step 4: 검증
```bash
node scripts/validate-artworks.js
```

---

## Phase 4: 컴포넌트 개발

### 개발 순서 (권장)
1. **Layout** (Header, Footer)
2. **Hero Section** (메인 비주얼)
3. **Artwork Card** (기본 그리드)
4. **Chapter Section** (작품 그룹핑)
5. **Lightbox Modal** (상세 보기)
6. **View Mode Selector** (다양한 뷰)
7. **About Section** (작가 소개)
8. **Contact Section** (연락처)

### 핵심 컴포넌트 체크리스트
- [ ] 반응형 디자인 (mobile-first)
- [ ] 접근성 (ARIA, alt text)
- [ ] 성능 최적화 (lazy loading)
- [ ] 한/영 병기 지원

---

## Phase 5: 기능 구현

### 필수 기능
- [ ] 작품 갤러리 (그리드 뷰)
- [ ] 작품 상세 보기 (라이트박스)
- [ ] 챕터별 그룹핑
- [ ] 작가 소개 페이지
- [ ] 연락처 섹션
- [ ] 반응형 네비게이션

### 추가 기능 (선택)
- [ ] 다양한 뷰 모드 (Grid/Proportional/Large)
- [ ] 이미지 줌
- [ ] 슬라이드쇼
- [ ] 검색/필터
- [ ] 다국어 전환 버튼

---

## Phase 6: 테스트 & 최적화

### 테스트 체크리스트
- [ ] 모든 페이지 로딩
- [ ] 이미지 표시 확인
- [ ] 모바일 테스트 (실제 디바이스)
- [ ] 크로스 브라우저 테스트
- [ ] 접근성 테스트
- [ ] 성능 테스트 (Lighthouse)

### 최적화
- [ ] 이미지 최적화 (WebP, 압축)
- [ ] 코드 분할 (dynamic imports)
- [ ] 캐싱 전략
- [ ] SEO 메타태그

---

## Phase 7: 배포

### 배포 프로세스
1. 최종 빌드 테스트
2. Git 커밋 & 푸시
3. Vercel 자동 배포
4. 프로덕션 확인
5. 도메인 연결

### 배포 후
- [ ] 모니터링 설정
- [ ] 에러 추적
- [ ] 백업 계획
- [ ] 유지보수 문서화

---

## 문서화

### 필수 문서
- [ ] CLAUDE.md (AI 어시스턴트 컨텍스트)
- [ ] README.md (프로젝트 개요)
- [ ] 개발 가이드
- [ ] 데이터 구조 문서
- [ ] 배포 체크리스트

### 자동화 스크립트
- [ ] 이미지 크기 추출
- [ ] 데이터 검증
- [ ] JSON 생성/업데이트
- [ ] 배포 스크립트

---

## 예상 소요 시간

| 단계 | 소요 시간 |
|------|-----------|
| 사전 준비 | 1-2일 |
| 프로젝트 초기화 | 0.5일 |
| 이미지 처리 | 0.5-1일 |
| 컴포넌트 개발 | 3-5일 |
| 기능 구현 | 2-3일 |
| 테스트 & 최적화 | 1-2일 |
| 배포 | 0.5일 |
| **총계** | **8-14일** |

---

## 참고 자료

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
