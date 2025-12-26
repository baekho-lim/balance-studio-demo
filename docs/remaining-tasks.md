# 남아있는 태스크 목록

> **마지막 업데이트**: 2025-12-26
> **목적**: 미완료 작업 추적 및 관리

---

## 1. Git 미커밋 파일 (Phase 9 관련)

### 어드민 시스템 확장
| 파일 | 상태 | 설명 |
|-----|------|------|
| `src/app/admin/faq/page.tsx` | 신규 | FAQ 관리 어드민 페이지 |
| `src/app/admin/news/` | 신규 | 뉴스 관리 어드민 |
| `src/app/admin/seo/page.tsx` | 신규 | SEO 상태 대시보드 |
| `src/app/api/faq/route.ts` | 신규 | FAQ CRUD API |
| `src/app/api/news/` | 신규 | 뉴스 CRUD API |
| `src/app/admin/layout.tsx` | 수정 | 네비게이션 메뉴 추가 |
| `src/app/admin/exhibitions/[id]/edit/page.tsx` | 수정 | 전시 수정 페이지 |

### 기타 수정 파일
| 파일 | 상태 | 설명 |
|-----|------|------|
| `src/app/postcards/diptych/page.tsx` | 수정 | 엽서 딥틱 페이지 |
| `src/components/print/PostcardPrintStyles.tsx` | 수정 | 인쇄 스타일 |
| `src/components/story/StoryView.tsx` | 수정 | 스토리 뷰 컴포넌트 |

### 문서
| 파일 | 상태 | 설명 |
|-----|------|------|
| `docs/phase9-admin-system-enhancement.md` | 신규 | Phase 9 구현 보고서 |

### 기타
| 파일 | 상태 | 설명 |
|-----|------|------|
| `.playwright-mcp/` | 신규 | Playwright MCP 설정 (gitignore 권장) |

---

## 2. Phase 5 - 수동 작업 (사용자 직접 수행)

### 완료됨
| 우선순위 | 작업 | 예상 효과 | 상태 |
|---------|------|----------|------|
| ~~P1~~ | ~~Wikidata 엔트리 생성~~ | ~~외부 Entity +30~~ | ✅ **완료** |

- **Wikidata Q번호**: Q137589862
- **URL**: https://www.wikidata.org/wiki/Q137589862
- **추가된 Claims**: P31, P21, P106, P27, P569, P19, P69, P856, P2003

### 미완료
| 우선순위 | 작업 | 예상 효과 | 방법 |
|---------|------|----------|------|
| P1 | **Google Knowledge Panel Claim** | 지식 패널 +20 | Search Console에서 요청 |
| P2 | 소셜 미디어 프로필 최적화 | sameAs 강화 | Facebook 아티스트 페이지 등 |
| P3 | Getty ULAN 신청 | 미술가 권위 DB | https://www.getty.edu/research/tools/vocabularies/ulan/ |

### Google Knowledge Panel Claim 방법
1. https://search.google.com/search-console 접속
2. limhyejung.com 소유권 확인
3. "지식 패널 클레임" 요청
4. 본인 확인 절차 진행

---

## 3. 기술 검증 (월간 점검)

### SEO 검증 도구
| 도구 | URL | 상태 |
|-----|-----|------|
| Schema.org Validator | https://validator.schema.org/#url=https://limhyejung.com/about | [ ] 미테스트 |
| Google Rich Results Test | https://search.google.com/test/rich-results?url=https://limhyejung.com/about | [ ] 미테스트 |
| PageSpeed Insights | https://pagespeed.web.dev/analysis?url=https://limhyejung.com | [ ] 미테스트 |
| hreflang 검증 | https://technicalseo.com/tools/hreflang/ | [ ] 미테스트 |

---

## 4. LLM Citation 테스트 (배포 1-2주 후)

> AI 인덱싱에는 수일~수주가 소요됩니다. 배포 후 1-2주 뒤에 테스트하세요.

| 테스트 쿼리 | 플랫폼 | 상태 |
|-----------|--------|------|
| "임혜정 작가" | ChatGPT | [ ] 미테스트 |
| "Lim Hyejung artist" | Perplexity | [ ] 미테스트 |
| "Who is Lim Hyejung" | Gemini | [ ] 미테스트 |
| "임혜정 작가에 대해 알려줘" | Claude | [ ] 미테스트 |
| "Lim Hyejung artworks" | 전체 | [ ] 미테스트 |
| "Utopia Reality Korean artist" | 전체 | [ ] 미테스트 |

### 점수 기준
- ✓ = 출처 인용 (3점)
- △ = 언급 (1점)
- ✗ = 미발견 (0점)

---

## 5. Phase 10 예정 - 미디어 라이브러리

### 계획된 작업
| 작업 | 설명 | 상태 |
|-----|------|------|
| `/admin/media` 페이지 생성 | 미디어 관리 어드민 | [ ] 예정 |
| 현재 이미지 목록 표시 | 갤러리 그리드 형식 | [ ] 예정 |
| 폴더별 필터링 | works/, exhibitions/, artist/ | [ ] 예정 |
| Cloudinary 업로드 위젯 | 드래그앤드롭 업로드 | [ ] 예정 |
| 전시별 이미지 업로드 | 전시 연결 기능 | [ ] 예정 |

### Cloudinary 설정 (완료)
- **Cloud Name**: dyoq0aake
- **API Key**: 598656428549298
- **MCP 서버**: @cloudinary/mcp-server (설정 완료)

---

## 6. 점수 현황 (Phase 4 완료 기준)

| 지표 | 점수 | 목표 | 상태 |
|-----|------|------|------|
| SEO 종합 | 87/100 | 88 | 🟡 거의 달성 |
| AEO 종합 | 89/100 | 82 | 🟢 초과 달성 |
| LLM Citation | 91/100 | 87 | 🟢 초과 달성 |

### Wikidata 연동 후 예상
| 지표 | 현재 | 예상 | 변화 |
|-----|------|------|------|
| 외부 Entity 연결 | 55 | 85 | +30 |
| LLM Citation 종합 | 91 | 97 | +6 |

---

## 7. 커밋 예정 명령어

```bash
# Phase 9 어드민 시스템 커밋
git add src/app/admin/ src/app/api/faq/ src/app/api/news/ docs/phase9-admin-system-enhancement.md
git commit -m "feat: Add admin system expansion (Phase 9)

- FAQ admin page with CRUD operations
- SEO status dashboard
- News admin pages
- API endpoints for FAQ and News"

# 기타 수정 파일 커밋
git add src/app/postcards/ src/components/print/ src/components/story/
git commit -m "fix: Update postcard and story components"

# 푸시
git push origin main
```

---

## 8. 참고 문서

| 문서 | 경로 | 용도 |
|-----|------|------|
| SEO 스코어카드 | `/docs/seo-scorecard.md` | 점수 추적 |
| Phase 4 보고서 | `/docs/phase4-seo-aeo-llm-implementation.md` | LLM 최적화 |
| Wikidata 가이드 | `/docs/wikidata-submission-guide.md` | Wikidata 관리 |
| Phase 9 보고서 | `/docs/phase9-admin-system-enhancement.md` | 어드민 시스템 |

---

*마지막 업데이트: 2025-12-26*
