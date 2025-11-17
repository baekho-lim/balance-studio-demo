# 프로젝트 작업 히스토리 및 회고

**프로젝트**: Lim Hyejung Artist Portfolio Website
**기간**: 2024년 11월
**기술 스택**: Next.js 14, TypeScript, Tailwind CSS, Vercel

---

## 작업 순서 (Chronological)

### Phase 1: 초기 설정 및 기본 구조
1. Next.js 14 프로젝트 생성
2. TypeScript 설정
3. Tailwind CSS 구성
4. 기본 컴포넌트 구조 설계
5. JSON 기반 데이터 관리 시스템 구축

### Phase 2: 핵심 기능 개발
1. **Hero 섹션** - 전체 화면 배경 이미지
2. **작품 갤러리** - 챕터별 그룹핑
3. **작품 카드** - 호버 효과 및 메타데이터 표시
4. **라이트박스 모달** - 작품 상세 보기
5. **작가 소개** - 프로필 및 Artist Statement
6. **연락처 섹션** - 이메일, 인스타그램 링크

### Phase 3: UI/UX 개선
1. **Hero 이미지 변경**: "Just that we grow" 작품으로 교체
2. **프로필 사진 크롭 수정**: `object-top` 추가로 얼굴 위치 조정
3. **연도 정보 수정**: 모든 작품 2023 → 2025로 업데이트

### Phase 4: 다중 뷰 모드 구현
1. **Grid 뷰**: 균일한 4:5 비율 그리드
2. **Proportional 뷰**: 실제 이미지 비율 유지 (masonry 레이아웃)
3. **Large 뷰**: 작품 크기별 차등 표시
4. **ViewModeSelector** 컴포넌트 생성
5. 이미지 픽셀 크기 추출 (macOS `sips` 명령 사용)
6. `sizeCategory` 계산 (small/medium/large)

### Phase 5: 작품 메타데이터 완성
1. 물리적 크기 정보 수집 (cm 단위)
2. `update-sizes.js` 스크립트 작성
3. 21개 작품 dimensions, medium, year 일괄 업데이트
4. JSON 데이터 검증

### Phase 6: 문서화 및 자동화
1. **CLAUDE.md** 생성 - AI 어시스턴트 컨텍스트
2. **커스텀 슬래시 커맨드** 5개 작성
   - `/add-artwork` - 작품 추가
   - `/deploy` - 배포 프로세스
   - `/validate-data` - 데이터 검증
   - `/update-artwork-info` - 정보 일괄 업데이트
   - `/troubleshoot` - 문제 해결
3. **문서 폴더** 구성
   - Quick Start Guide
   - Data Structure
   - Image Processing
   - Deployment Checklist
   - Project Template
   - Efficiency Guide
4. **검증 스크립트** 작성 (`validate-artworks.js`)

### Phase 7: 배포 설정
1. GitHub 저장소 연결
2. Personal Access Token 설정
3. Vercel CLI 설치 및 로그인
4. 프로젝트 Vercel 연결
5. 자동 배포 파이프라인 구축

---

## 주요 문제 및 해결

### 1. 이미지 크기 추출 실패
**문제**: `image-size` npm 패키지가 Node.js v24와 호환되지 않음
```
TypeError: Cannot read properties of undefined
```
**해결**: macOS 네이티브 `sips` 명령 사용
```bash
sips -g pixelWidth -g pixelHeight "image.jpg"
```

### 2. GitHub 푸시 인증 실패
**문제**: Password authentication 지원 중단
```
fatal: could not read Password for 'https://...'
```
**해결**: Personal Access Token을 URL에 포함
```bash
git remote set-url origin https://user:TOKEN@github.com/repo.git
```

### 3. 프로필 사진 머리 잘림
**문제**: `object-cover`가 이미지 중앙을 기준으로 크롭
**해결**: `object-top` 클래스 추가
```tsx
<Image className="object-cover object-top" />
```

### 4. Vercel 자동 배포 미작동
**문제**: Git 푸시 후 배포 트리거 안됨
**해결**:
- Vercel CLI로 프로젝트 직접 연결
- Production Branch를 `main`으로 설정
- GitHub 저장소 연결 확인

### 5. 프로젝트명 대문자 오류
**문제**: Vercel 프로젝트명에 대문자 사용 불가
```
Error: Project names must be lowercase
```
**해결**: 소문자 프로젝트명 지정 (`limhyejung`)

---

## 회고 (Retrospective)

### 잘된 점 (What Went Well)

1. **TypeScript 도입**
   - 컴파일 타임 타입 체크로 런타임 오류 최소화
   - IDE 자동완성으로 개발 속도 향상
   - 데이터 구조 명확화

2. **JSON 기반 데이터 관리**
   - 코드와 콘텐츠 분리
   - 비개발자도 수정 가능
   - Git으로 버전 관리 용이

3. **스크립트 자동화**
   - 반복 작업 시간 절약
   - 일관성 보장
   - 휴먼 에러 감소

4. **문서화**
   - 지식 전수 용이
   - 재사용 가능한 템플릿
   - 문제 해결 가이드

### 개선할 점 (What Could Be Improved)

1. **사전 데이터 수집 부족**
   - 개발 중 메타데이터 변경 다수 발생
   - 이미지 파일명 불일치
   - 연도, 크기 정보 누락

2. **초기 설계 미흡**
   - 뷰 모드 기능 나중에 추가
   - 이미지 크기 정보 뒤늦게 필요
   - 데이터 스키마 여러 번 수정

3. **배포 설정 지연**
   - CI/CD 파이프라인 늦게 구축
   - 인증 문제로 시간 소모
   - 자동 배포 확인 어려움

4. **이미지 최적화 부재**
   - 원본 이미지 그대로 사용 (102MB+)
   - WebP 변환 미적용
   - 썸네일 별도 생성 안함

### 다음에 적용할 사항 (Action Items)

1. **프로젝트 시작 전 완료할 것**
   - [ ] 모든 이미지 수집 및 파일명 정규화
   - [ ] 완전한 메타데이터 스프레드시트 작성
   - [ ] 디자인 프로토타입 승인
   - [ ] CI/CD 파이프라인 설정

2. **데이터 구조 우선 설계**
   - [ ] TypeScript 인터페이스 먼저 정의
   - [ ] JSON 스키마 확정
   - [ ] 검증 스크립트 초기에 작성

3. **이미지 최적화 파이프라인**
   - [ ] 자동 WebP 변환
   - [ ] 다중 크기 생성 (thumbnail, medium, large)
   - [ ] CDN 활용

4. **테스트 자동화**
   - [ ] 데이터 검증 CI에 통합
   - [ ] 빌드 테스트 자동화
   - [ ] 시각적 회귀 테스트

---

## 프로젝트 통계

- **총 작품 수**: 21개
- **챕터 수**: 4개 (Secret Garden, Effortless Spring, Desert Stories, Waters of Time)
- **생성된 문서**: 13개
- **자동화 스크립트**: 3개
- **Git 커밋**: 8+ 회
- **배포 플랫폼**: Vercel
- **프로덕션 URL**: https://limhyejung-buzbomqxr-bh-lims-projects.vercel.app

---

## 핵심 교훈

> **"데이터 우선 접근법이 UI 변경에 대한 유연성을 제공한다"**

개발 중 UI 요구사항이 여러 번 변경되었지만, JSON 기반 데이터 구조 덕분에 데이터는 그대로 유지하면서 프레젠테이션 레이어만 수정할 수 있었습니다.

> **"자동화는 처음에는 시간이 걸리지만, 반복 작업에서 수십 배의 시간을 절약한다"**

이미지 크기 추출, 데이터 검증, 일괄 업데이트 스크립트가 수동 작업 대비 엄청난 시간 절약을 제공했습니다.

> **"문서화는 미래의 자신에게 주는 선물이다"**

CLAUDE.md, 슬래시 커맨드, 트러블슈팅 가이드가 있어서 반복되는 질문이나 문제 해결 시간이 크게 단축되었습니다.

---

*작성일: 2024년 11월*
*작성자: Claude Code with Human Collaboration*
