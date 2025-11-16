# Deploy to Production

프로덕션 환경에 배포합니다.

## Pre-deployment Checklist

1. **코드 품질 확인**
   ```bash
   npm run build
   ```
   - 타입 에러 없음 확인
   - 빌드 성공 확인

2. **변경사항 검토**
   ```bash
   git status
   git diff
   ```

3. **민감 정보 확인**
   - `.env` 파일이 커밋되지 않았는지 확인
   - API 키, 비밀번호 등 노출 없음 확인

## Deployment

1. **스테이징**
   ```bash
   git add .
   ```

2. **커밋**
   ```bash
   git commit -m "커밋 메시지

   🤖 Generated with [Claude Code](https://claude.com/claude-code)

   Co-Authored-By: Claude <noreply@anthropic.com>"
   ```

3. **푸시**
   ```bash
   git push origin main
   ```

4. **Vercel 확인**
   - Vercel 대시보드에서 빌드 상태 확인
   - 배포 완료 후 프로덕션 URL 테스트

## Post-deployment

- 모든 페이지 로딩 확인
- 이미지 표시 확인
- 모바일 반응형 확인
- 라이트박스 동작 확인
