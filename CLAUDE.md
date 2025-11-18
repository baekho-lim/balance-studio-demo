# Artist Portfolio Project - Claude Context

## Project Overview
Next.js 14 기반 아티스트 포트폴리오 웹사이트. 작품 갤러리, 작가 소개, 연락처를 포함한 단일 페이지 애플리케이션.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Testing**: Playwright (visual regression)
- **Deployment**: Vercel (auto-deploy on push)
- **Data**: JSON files (`/src/data/`)

### Deployment Rules
- **CRITICAL**: GitHub와 연동된 Vercel 프로젝트는 자동 배포 구조 사용
- **절대 금지**: 사용자 확인 없이 `vercel` CLI로 새 프로젝트 생성
- **올바른 배포 방법**: `git push`만 하면 자동 배포됨
- **수동 배포 필요 시**: 반드시 사용자에게 먼저 확인 받기

## Project Structure
```
/src
  /app              # Next.js App Router pages
  /components       # React components
    /home          # Hero, ContactSection
    /works         # ArtworkCard, LightboxModal, ViewModeSelector
    /layout        # Header, Footer
    /print         # CatalogPrintStyles (reusable)
  /data            # JSON data files
    artworks.json  # 작품 메타데이터 (단일 소스)
    catalog.json   # 카탈로그 데이터 (dual language)
    chapters.json  # 챕터/시리즈 정보
    artist.json    # 작가 프로필
  /types           # TypeScript interfaces
/public
  /images
    /works         # 작품 이미지 파일
/scripts           # 데이터 처리 스크립트
/tests             # Playwright 시각적 회귀 테스트
  /visual          # 카탈로그 PDF 렌더링 테스트
/docs              # 프로젝트 문서
```

## Key Conventions

### Data Management
- **Single Source of Truth**: `artworks.json`이 모든 작품 데이터의 유일한 소스
- **ID Pattern**: `{chapter-prefix}-{number}` (예: `sg-001`, `es-002`)
- **Image Paths**: `/images/works/{filename}` 형식의 절대 경로 사용

### TypeScript
- 모든 데이터에 명시적 타입 정의 (`/src/types/index.ts`)
- JSON import 시 `as Type` 캐스팅 사용
- Optional 필드는 `?` 표기

### Component Patterns
- `'use client'` 디렉티브로 클라이언트 컴포넌트 명시
- Props interface 별도 정의
- Tailwind 클래스는 조건부로 조합

### Image Handling
- Next.js `<Image>` 컴포넌트 사용 (최적화 자동)
- `fill` prop과 `object-cover` 조합
- `sizes` prop으로 반응형 이미지 최적화
- 프로필 사진: `object-top`으로 얼굴 위치 조정
- **⚠️ Critical**: `fill` prop 사용 시 명시적 부모 차원 필요
  ```tsx
  // ✅ Correct - explicit dimensions with aspectRatio
  <div className="relative w-full" style={{ aspectRatio: width / height }}>
    <Image fill priority className="object-contain" />
  </div>

  // ❌ Incorrect - no explicit height
  <div className="relative w-full h-full">
    <Image fill />
  </div>
  ```

## Common Tasks

### 작품 추가
1. 이미지를 `/public/images/works/`에 추가
2. `scripts/extract-dimensions.js` 실행하여 픽셀 크기 추출
3. `artworks.json`에 새 항목 추가
4. 타입 검증 확인

### 뷰 모드 수정
- `ViewModeSelector.tsx`: 모드 정의 및 UI
- `ArtworkCard.tsx`: 각 모드별 렌더링 로직
- `page.tsx`: 그리드 레이아웃 클래스

### 배포
```bash
git add .
git commit -m "message"
git push origin main  # Vercel 자동 배포 트리거
```

## Important Files
- `/src/app/page.tsx` - 메인 페이지, 상태 관리
- `/src/data/artworks.json` - 작품 데이터 (가장 자주 수정)
- `/src/types/index.ts` - 타입 정의
- `/scripts/update-sizes.js` - 물리적 크기 업데이트 스크립트

## Coding Guidelines
- 한국어/영어 병렬 지원 (모든 텍스트에 `Kr` suffix 버전)
- 반응형 우선: mobile -> tablet -> desktop
- 색상: pastel 계열 (sage, cream, green)
- 애니메이션: subtle한 hover 효과, 부드러운 전환

## Known Issues & Solutions
- **이미지 경로 오류**: 파일명의 공백, 특수문자 주의
- **Git 인증**: Personal Access Token 필요 시 URL에 포함
- **Node v24 호환성**: 일부 npm 패키지 이슈, native 명령 대안 사용

## Quick Commands
- `npm run dev` - 개발 서버
- `npm run build` - 프로덕션 빌드 (타입 체크 포함)
- `node scripts/update-sizes.js` - 작품 크기 데이터 업데이트

### Testing
- `npm run test:visual` - Playwright 시각적 회귀 테스트 실행
- `npm run test:visual:update` - 스냅샷 업데이트 (의도적 디자인 변경 시)
- `npm run test:visual:ui` - UI 모드로 테스트 (디버깅용)
- `npm run test:visual:report` - HTML 리포트 보기

## Catalog PDF Development

### Print CSS System
- **Location**: `/src/components/print/CatalogPrintStyles.tsx`
- **Purpose**: Reusable Print CSS module for 8.5" x 8.5" catalog PDFs
- **Key Features**:
  - Professional typography (10pt body, proper heading hierarchy)
  - Tailwind overrides for print (`!important` rules)
  - Page break control, bleed zones, crop marks
  - Next.js Image optimization support

### Visual Regression Testing
**Problem**: "9페이지, 12페이지에 이미지 안보여" 같은 반복 버그

**Solution**: Playwright 자동 테스트
- ✅ 9/17 페이지: Triptych overview (3 images)
- ✅ 12/17 페이지: Diptych overview (2 images)
- ✅ 이미지 가시성, 종횡비, 시각적 스냅샷 비교

**문서**: `/tests/README.md` 참고

### Common PDF Rendering Issues

#### Issue 1: Images Not Rendering
**Symptom**: Next.js Image with `fill` prop shows blank boxes in PDF

**Root Cause**: `fill` requires explicit parent dimensions
```tsx
// ❌ Problem: flex-1 doesn't provide height in print
<div className="flex-1">
  <Image fill />
</div>

// ✅ Solution: Hybrid minHeight + aspectRatio
<div style={{ minHeight: '500px', aspectRatio: width / height }}>
  <Image fill priority className="object-contain" />
</div>
```

#### Issue 2: Aspect Ratio Not Preserved
**Symptom**: Images stretched or squashed in overview pages

**Root Cause**: CSS `h-full` is relative, print needs absolute

**Solution**: Use CSS `aspectRatio` property based on image dimensions from `catalog.json`

#### Issue 3: Print Styles Not Applied
**Symptom**: Tailwind classes ignored in PDF

**Root Cause**: Print media query needs `!important` to override

**Solution**: Use `CatalogPrintStyles.tsx` with explicit `!important` overrides

### Testing Workflow
1. **코드 변경** (레이아웃, 이미지 등)
2. **자동 테스트 실행**: `npm run test:visual`
3. **결과 확인**:
   - ✅ 통과 → 안전하게 커밋
   - ❌ 실패 → HTML 리포트로 시각적 차이 확인
4. **의도한 변경인 경우**: `npm run test:visual:update`로 스냅샷 업데이트
