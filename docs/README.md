# Artist Portfolio Documentation

아티스트 포트폴리오 웹사이트 개발 및 운영을 위한 완전한 문서 세트입니다.

## 문서 목차

### 시작하기
- [01-quick-start.md](./01-quick-start.md) - 빠른 시작 가이드

### 핵심 가이드
- [02-data-structure.md](./02-data-structure.md) - 데이터 구조 및 타입 정의
- [03-image-processing.md](./03-image-processing.md) - 이미지 처리 및 최적화

### 운영
- [04-deployment-checklist.md](./04-deployment-checklist.md) - 배포 전/중/후 체크리스트
- [05-project-template.md](./05-project-template.md) - 새 프로젝트를 위한 완전한 템플릿

## Claude Code 통합

### CLAUDE.md
프로젝트 루트의 `CLAUDE.md` 파일은 AI 어시스턴트에게 프로젝트 컨텍스트를 제공합니다:
- 기술 스택 및 구조
- 코딩 컨벤션
- 일반적인 작업 패턴
- 알려진 이슈와 해결책

### 커스텀 슬래시 커맨드

`.claude/commands/` 폴더에 정의된 명령어:

| 명령어 | 설명 |
|--------|------|
| `/add-artwork` | 새 작품 추가 가이드 |
| `/deploy` | 배포 프로세스 |
| `/validate-data` | 데이터 검증 절차 |
| `/update-artwork-info` | 작품 정보 일괄 업데이트 |
| `/troubleshoot` | 문제 해결 가이드 |

사용 예시:
```
Claude Code에서 "/add-artwork" 입력
→ 새 작품 추가에 필요한 단계별 가이드 제공
```

## 자동화 스크립트

`/scripts/` 폴더의 유틸리티:

```bash
# 데이터 검증
node scripts/validate-artworks.js

# 물리적 크기 업데이트
node scripts/update-sizes.js

# 이미지 크기 추출 (macOS)
for f in public/images/works/*; do
  sips -g pixelWidth -g pixelHeight "$f"
done
```

## 워크플로우

### 일상적인 업데이트
1. `src/data/artworks.json` 수정
2. `node scripts/validate-artworks.js` 실행
3. `npm run build` 확인
4. Git 커밋 & 푸시

### 대규모 변경
1. 백업 생성
2. 스크립트로 일괄 처리
3. 검증
4. 로컬 테스트
5. 배포

### 새 프로젝트 시작
1. [05-project-template.md](./05-project-template.md) 참조
2. Phase별 체크리스트 따르기
3. 이 문서 세트를 새 프로젝트에 복사

## Best Practices

1. **데이터 우선**: UI 개발 전 데이터 구조 완성
2. **검증 자동화**: 모든 변경 후 스크립트 실행
3. **문서화**: 변경사항 및 결정사항 기록
4. **백업**: 중요 변경 전 백업
5. **테스트**: 로컬 빌드 성공 후 배포

## 문서 업데이트

이 문서는 프로젝트와 함께 발전합니다:
- 새로운 패턴 발견 시 추가
- 문제 해결 후 Troubleshoot 업데이트
- 프로세스 개선 시 체크리스트 수정

---

*이 문서 세트는 Lim Hyejung 아티스트 포트폴리오 프로젝트 개발 경험을 바탕으로 작성되었습니다.*
