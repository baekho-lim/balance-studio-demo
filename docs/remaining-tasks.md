# 남아있는 태스크 목록

> **마지막 업데이트**: 2025-12-26
> **목적**: 미완료 작업 추적 및 관리

---

## 1. 즉시 실행 가능 (Phase 10b)

### Cloudinary 연동
| 작업 | 상태 | 설명 |
|-----|------|------|
| Claude 재부팅 | ⏳ 대기 | MCP 서버 활성화 필요 |
| next-cloudinary 설치 | [ ] 예정 | `npm install next-cloudinary` |
| 드래그앤드롭 업로드 | [ ] 예정 | CldUploadWidget 사용 |
| Cloudinary 폴더 관리 | [ ] 예정 | works/, artist/ 등 |
| 삭제 기능 | [ ] 예정 | API 연동 |

### Cloudinary 설정 (완료됨)
- **Cloud Name**: `dyoq0aake`
- **API Key**: `598656428549298`
- **MCP 서버**: `~/.claude.json`에 설정 완료

---

## 2. 수동 작업 (사용자 직접 수행)

### 완료됨
| 우선순위 | 작업 | 상태 |
|---------|------|------|
| ~~P1~~ | ~~Wikidata 엔트리 생성~~ | ✅ **완료** (Q137589862) |

### 미완료
| 우선순위 | 작업 | 예상 효과 | 방법 |
|---------|------|----------|------|
| **P1** | Google Knowledge Panel Claim | 지식 패널 +20 | Search Console |
| P2 | 소셜 미디어 프로필 최적화 | sameAs 강화 | Facebook 등 |
| P3 | Getty ULAN 신청 (선택) | 미술가 권위 DB | Getty 웹사이트 |

### Google Knowledge Panel Claim 방법
1. https://search.google.com/search-console 접속
2. limhyejung.com 소유권 확인
3. "지식 패널 클레임" 요청
4. 본인 확인 절차 진행

---

## 3. 월간 점검 작업

### SEO 검증 도구
| 도구 | URL | 상태 |
|-----|-----|------|
| Schema.org Validator | [링크](https://validator.schema.org/#url=https://limhyejung.com/about) | [ ] 미테스트 |
| Google Rich Results | [링크](https://search.google.com/test/rich-results?url=https://limhyejung.com/about) | [ ] 미테스트 |
| PageSpeed Insights | [링크](https://pagespeed.web.dev/analysis?url=https://limhyejung.com) | [ ] 미테스트 |
| hreflang 검증 | [링크](https://technicalseo.com/tools/hreflang/) | [ ] 미테스트 |

---

## 4. LLM Citation 테스트 (배포 1-2주 후)

> AI 인덱싱에는 수일~수주가 소요됩니다.

| 테스트 쿼리 | 플랫폼 | 상태 |
|-----------|--------|------|
| "임혜정 작가" | ChatGPT | [ ] 미테스트 |
| "Lim Hyejung artist" | Perplexity | [ ] 미테스트 |
| "Who is Lim Hyejung" | Gemini | [ ] 미테스트 |
| "임혜정 작가에 대해 알려줘" | Claude | [ ] 미테스트 |

### 점수 기준
- ✓ = 출처 인용 (3점)
- △ = 언급 (1점)
- ✗ = 미발견 (0점)

---

## 5. 장기 계획: 모듈화 솔루션 (ArtistFolio)

> 상세: `/docs/MODULARIZATION-PLAN.md` 참고

### 구현 로드맵
| Phase | 작업 | 예상 기간 |
|-------|------|----------|
| A | 코어 추출 (@artistfolio/core) | 2주 |
| B | 데이터 추상화 (@artistfolio/adapters) | 2주 |
| C | UI 라이브러리 (@artistfolio/ui) | 3주 |
| D | CLI & 템플릿 | 2주 |
| E | 문서화 & 런칭 | 1주 |

---

## 6. 현재 점수 현황

| 지표 | 점수 | 목표 | 상태 |
|-----|------|------|------|
| SEO 종합 | 87/100 | 88 | 🟡 거의 달성 |
| AEO 종합 | 89/100 | 82 | 🟢 초과 달성 |
| LLM Citation | 91/100 | 87 | 🟢 초과 달성 |

---

## 7. 완료된 Phase 히스토리

| Phase | 내용 | 커밋 | 날짜 |
|-------|------|------|------|
| Phase 4 | SEO/AEO/LLM 최적화 | 34b5222 | 2025-12-26 |
| Phase 9 | 어드민 시스템 확장 | 0811d65 | 2025-12-26 |
| Phase 10a | Media Library UI | 79a7407 | 2025-12-26 |
| - | Strategy Dashboard | 0bad859 | 2025-12-26 |
| - | Troubleshooting 시스템 | 55983ff | 2025-12-26 |

---

## 8. 참고 문서

| 문서 | 경로 | 용도 |
|-----|------|------|
| 세션 요약 | `/docs/SESSION-SUMMARY.md` | 오늘 작업 내역 |
| 아키텍처 | `/docs/ARCHITECTURE.md` | 기술 구조 |
| 모듈화 기획 | `/docs/MODULARIZATION-PLAN.md` | 솔루션화 계획 |
| SEO 스코어카드 | `/docs/seo-scorecard.md` | 점수 추적 |
| Wikidata 가이드 | `/docs/wikidata-submission-guide.md` | Wikidata 관리 |

---

## 9. 재부팅 후 프롬프트 (Phase 10b)

```
Phase 10b 이어서 진행해.

현재 상태:
- Phase 10a 완료: /admin/media 페이지 생성 (커밋 79a7407)
- Cloudinary MCP 서버 설정됨 (~/.claude.json)
- Cloudinary 환경변수 설정됨 (.env.local)

Phase 10b 작업:
1. next-cloudinary 패키지 설치
2. /admin/media 페이지에 드래그 앤 드롭 업로드 기능 추가
3. Cloudinary 폴더 관리
4. 업로드된 이미지 URL 자동 변환
5. 삭제 기능

Cloudinary 정보:
- Cloud Name: dyoq0aake
- API Key: 598656428549298

완료 후 빌드 확인하고 커밋/푸시해.
```

---

*마지막 업데이트: 2025-12-26*
