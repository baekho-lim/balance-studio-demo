# Troubleshooting Guide

일반적인 문제와 해결책을 안내합니다.

## 이미지 관련

### 이미지가 표시되지 않음
**원인**: 파일 경로 불일치

```bash
# 1. 파일 존재 확인
ls -la public/images/works/ | grep "filename"

# 2. JSON 경로 확인
grep "filename" src/data/artworks.json

# 3. 대소문자 확인
# Mac은 대소문자 구분하지 않지만, Linux 서버는 구분
```

**해결**: 파일명과 JSON 경로 정확히 일치시키기

### 이미지 비율 왜곡
**원인**: aspect-ratio 미설정

```tsx
// 수정 전
<div className="h-64">
  <Image fill className="object-cover" />
</div>

// 수정 후
<div style={{ aspectRatio: `${width}/${height}` }}>
  <Image fill className="object-cover" />
</div>
```

### 프로필 사진 머리 잘림
**원인**: object-position 기본값

```tsx
// 수정
<Image className="object-cover object-top" />
```

## 빌드 에러

### TypeScript 타입 에러
```bash
# 에러 확인
npm run build 2>&1 | grep "error TS"

# 해결
# 1. 타입 정의 확인 (src/types/index.ts)
# 2. JSON 데이터가 타입과 일치하는지 확인
# 3. optional field에 ? 추가
```

### Module not found
```bash
# import 경로 확인
# @/ 는 src/ 를 가리킴
import Component from '@/components/Component'
```

## Git/배포

### 푸시 인증 실패
```bash
# Personal Access Token 사용
git remote set-url origin https://username:token@github.com/repo.git
```

### Vercel 빌드 실패
1. 로컬에서 `npm run build` 먼저 확인
2. Vercel 대시보드에서 로그 확인
3. 환경 변수 설정 확인

## 데이터 문제

### JSON 파싱 에러
```bash
# 구문 검사
node -e "JSON.parse(require('fs').readFileSync('./src/data/artworks.json'))"

# 일반적인 원인:
# - 쉼표 누락/과잉
# - 따옴표 불일치
# - 특수문자 이스케이프 누락
```

### 이미지 dimensions 누락
```bash
# 크기 추출 스크립트 재실행
node scripts/extract-dimensions.js
```

## 성능 이슈

### 이미지 로딩 느림
- `priority` prop 사용 (LCP 이미지용)
- `sizes` prop 최적화
- WebP 변환 고려

### 초기 로딩 지연
- 동적 import 사용
- 이미지 lazy loading
- 코드 분할

## 디버깅 명령어

```bash
# 프로젝트 상태 체크
npm run build
node scripts/validate-artworks.js
git status

# 이미지 파일 검사
ls -la public/images/works/ | wc -l
du -sh public/images/works/

# JSON 데이터 검사
node -e "console.log(require('./src/data/artworks.json').length)"
```
