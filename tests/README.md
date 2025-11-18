# Visual Regression Testing

Playwright 기반 시각적 회귀 테스트로 카탈로그 PDF 이미지 렌더링 버그를 자동으로 검증합니다.

## 🎯 목적

**"9페이지, 12페이지에 이미지 안보여"** 같은 반복적인 버그를 방지합니다.

이 테스트는 다음을 자동으로 검증합니다:
- ✅ 9/17 페이지: Triptych overview (3개 이미지)
- ✅ 12/17 페이지: Diptych overview (2개 이미지)
- ✅ 이미지 가시성 (visibility)
- ✅ 종횡비 유지 (aspect ratio preservation)
- ✅ 시각적 스냅샷 비교

## 🚀 사용법

### 테스트 실행

```bash
# 일반 테스트 실행
npm run test:visual

# 스냅샷 업데이트 (의도적으로 레이아웃 변경 시)
npm run test:visual:update

# UI 모드로 실행 (디버깅)
npm run test:visual:ui

# HTML 리포트 보기
npm run test:visual:report
```

### 워크플로우

#### 1. 코드 변경 후 테스트 실행

```bash
npm run test:visual
```

#### 2. 테스트 결과 확인

**✅ 모두 통과** → 이미지 렌더링 문제 없음, 안전하게 커밋 가능

**❌ 실패**:
- 의도한 변경인가? → `npm run test:visual:update` 실행 후 스냅샷 커밋
- 의도하지 않은 변경인가? → 코드 수정 필요

## 📊 테스트 항목

### Catalog PDF Visual Regression

1. **Triptych Overview (9/17 페이지)**
   - 3개 이미지 렌더링 확인
   - 각 이미지 종횡비 검증
   - 페이지 스냅샷 비교

2. **Diptych Overview (12/17 페이지)**
   - 2개 이미지 렌더링 확인
   - 각 이미지 종횡비 검증
   - 페이지 스냅샷 비교

3. **전체 페이지 구조**
   - 총 페이지 수 확인 (22 페이지)

4. **Print 모드**
   - 화면 전용 요소 숨김 확인

### Image Rendering Smoke Tests

5. **커버 페이지**
   - 배경 이미지 로드 확인

6. **아티스트 프로필**
   - 프로필 사진 로드 확인

## 🔍 스냅샷 관리

### 스냅샷 위치

```
tests/visual/catalog-pdf.spec.ts-snapshots/
├── diptych-overview-chromium-darwin.png
└── triptych-overview-chromium-darwin.png
```

### 스냅샷 업데이트 시점

다음 경우에 스냅샷을 업데이트해야 합니다:

1. **의도적인 디자인 변경**
   - 타이포그래피 크기 조정
   - 간격(gap) 변경
   - 레이아웃 개선

2. **새로운 작품 추가**
   - catalog.json 업데이트 시

3. **이미지 교체**
   - 작품 이미지 파일 변경 시

### 스냅샷 업데이트 방법

```bash
# 1. 변경 사항 확인
npm run test:visual

# 2. 스냅샷 업데이트
npm run test:visual:update

# 3. Git에 스냅샷 커밋
git add tests/visual/catalog-pdf.spec.ts-snapshots/
git commit -m "Update visual regression snapshots: [변경 이유]"
```

## 🐛 디버깅

### 테스트 실패 시

1. **HTML 리포트 확인**
   ```bash
   npm run test:visual:report
   ```
   브라우저에서 실패한 테스트의 스크린샷 확인

2. **UI 모드로 실행**
   ```bash
   npm run test:visual:ui
   ```
   단계별로 테스트 실행하며 디버깅

3. **실패 스크린샷 확인**
   ```
   test-results/visual-catalog-pdf-*/test-failed-*.png
   ```

### 일반적인 문제

#### 이미지가 안 보이는 경우

**원인**: Next.js Image의 `fill` prop은 명시적 부모 차원 필요

**해결**:
```tsx
// ❌ 잘못됨
<div className="relative w-full h-full">
  <Image fill ... />
</div>

// ✅ 올바름
<div className="relative w-full" style={{ aspectRatio: work.imageWidth / work.imageHeight }}>
  <Image fill ... />
</div>
```

#### 종횡비가 깨지는 경우

**원인**: `flex-1`이 프린트 모드에서 높이를 제공하지 않음

**해결**:
```tsx
// ❌ 잘못됨
<div className="flex-1">
  <Image fill ... />
</div>

// ✅ 올바름
<div style={{ minHeight: '500px', aspectRatio: ... }}>
  <Image fill ... />
</div>
```

## 🎓 학습 자료

이 테스트 시스템이 해결한 실제 버그와 분석은 다음 문서를 참고하세요:

- **근본 원인 분석**: 5 Whys 방법론 적용
- **아키텍처 결정**: Container Dependency Pattern
- **변증법적 해결**: flex-1 vs fixed height 모순

더 자세한 내용은 프로젝트 루트의 분석 문서를 참고하세요.

## 📈 성과

**Before**: 수동 검증, 반복적인 이미지 렌더링 버그

**After**:
- ✅ 6개 테스트 자동 실행
- ✅ ~6초 내 완료
- ✅ 시각적 변경 자동 감지
- ✅ CI/CD 통합 준비 완료

---

**Made with Playwright** | Catalog: Utopia = Reality
