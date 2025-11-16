# Deployment Checklist

## Pre-Deployment (배포 전)

### 코드 품질
- [ ] `npm run build` 성공 (타입 에러 없음)
- [ ] 콘솔 에러/경고 없음
- [ ] 사용하지 않는 import 제거
- [ ] TODO 주석 해결

### 데이터 검증
- [ ] `node scripts/validate-artworks.js` 통과
- [ ] 모든 이미지 파일 존재 확인
- [ ] JSON 구문 오류 없음
- [ ] 중복 ID 없음

### 기능 테스트
- [ ] 모든 페이지 로딩 확인
- [ ] 이미지 표시 정상
- [ ] 라이트박스 동작
- [ ] 뷰 모드 전환 (Grid/Proportional/Large)
- [ ] 모바일 반응형 테스트
- [ ] 네비게이션 링크 동작

### 콘텐츠 검토
- [ ] 작품 정보 정확성 (연도, 크기, 미디엄)
- [ ] 맞춤법 검사 (한국어/영어)
- [ ] 연락처 정보 최신
- [ ] 작가 소개문 검토

### 보안
- [ ] `.env` 파일이 `.gitignore`에 포함
- [ ] API 키/비밀번호 노출 없음
- [ ] 민감한 파일 커밋 없음

## Deployment (배포)

### Git 작업
```bash
# 1. 상태 확인
git status
git diff

# 2. 스테이징
git add .

# 3. 커밋
git commit -m "배포: 변경사항 요약

상세 내용:
- 변경 1
- 변경 2

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# 4. 푸시
git push origin main
```

### Vercel 모니터링
- [ ] 빌드 시작 확인
- [ ] 빌드 로그 에러 없음
- [ ] 배포 완료 (✓ Ready)
- [ ] 프로덕션 URL 접속 가능

## Post-Deployment (배포 후)

### 기능 확인
- [ ] 홈페이지 로딩 속도 양호
- [ ] 모든 이미지 표시
- [ ] Hero 섹션 정상
- [ ] Works 섹션 (모든 챕터)
- [ ] About 섹션
- [ ] Contact 섹션
- [ ] 라이트박스 동작

### 성능 체크
- [ ] Lighthouse 점수 확인
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 90+
  - SEO: 90+
- [ ] 이미지 로딩 시간 적절
- [ ] 모바일 로딩 테스트

### 최종 검토
- [ ] 실제 디바이스 테스트 (iOS/Android)
- [ ] 다양한 브라우저 테스트 (Chrome, Safari, Firefox)
- [ ] 클라이언트에게 배포 알림
- [ ] 피드백 수집 준비

## 롤백 계획

문제 발생 시:
```bash
# 이전 커밋으로 복구
git revert HEAD
git push origin main

# 또는 특정 커밋으로
git reset --hard <commit-hash>
git push origin main --force  # 주의: force push
```

## 자동화 스크립트

```bash
# deploy.sh
#!/bin/bash

echo "=== Pre-deployment checks ==="
npm run build || exit 1
node scripts/validate-artworks.js || exit 1

echo "=== Deploying ==="
git add .
git commit -m "$1"
git push origin main

echo "=== Deployment initiated ==="
echo "Check Vercel dashboard for build status"
```
