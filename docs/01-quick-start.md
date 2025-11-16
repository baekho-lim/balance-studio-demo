# Quick Start Guide

## 환경 설정

### 필수 요구사항
- Node.js 18+ (권장: 20.x)
- npm 또는 yarn
- Git

### 초기 설정
```bash
# 1. 저장소 클론
git clone https://github.com/username/artist-portfolio.git
cd artist-portfolio

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 확인
open http://localhost:3000
```

## 프로젝트 구조

```
/src
  /app           → 페이지 라우팅
  /components    → React 컴포넌트
  /data          → JSON 데이터 (작품, 챕터, 작가)
  /types         → TypeScript 타입 정의

/public
  /images        → 정적 이미지 파일

/scripts         → 데이터 처리 스크립트
/docs            → 프로젝트 문서
```

## 주요 파일

| 파일 | 설명 |
|------|------|
| `src/app/page.tsx` | 메인 홈페이지 |
| `src/data/artworks.json` | 작품 데이터 |
| `src/types/index.ts` | 타입 정의 |
| `CLAUDE.md` | AI 어시스턴트 컨텍스트 |

## 일반적인 작업

### 작품 데이터 수정
1. `src/data/artworks.json` 편집
2. 저장 후 브라우저 자동 새로고침 확인
3. 빌드 테스트: `npm run build`

### 스타일 변경
- Tailwind CSS 클래스 사용
- `tailwind.config.ts`에서 커스텀 색상 정의

### 배포
```bash
git add .
git commit -m "변경사항 설명"
git push origin main
# Vercel 자동 배포
```

## 다음 단계
- [데이터 구조 이해하기](./02-data-structure.md)
- [이미지 처리 가이드](./03-image-processing.md)
- [배포 체크리스트](./04-deployment-checklist.md)
