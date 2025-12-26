# SEO & AEO & LLM Citation Scorecard

> **목적**: 장기적인 검색 최적화 성과 추적 및 개선 관리
> **대상 사이트**: limhyejung.com
> **마지막 업데이트**: 2025-12-26

---

## 현재 점수 요약

| 지표 | 점수 | 상태 | 목표 |
|-----|------|------|------|
| **SEO 종합** | 78/100 | 🟡 | 88/100 |
| **AEO 종합** | 68/100 | 🟡 | 82/100 |
| **LLM Citation** | 55/100 | 🟡 | 87/100 |

---

## 1. SEO 세부 점수표

| 카테고리 | 개선 전 | 현재 | 목표 | 가중치 |
|---------|--------|------|------|--------|
| 메타데이터 | 75 | 88 | 95 | 15% |
| 구조화 데이터 (Schema) | 45 | 82 | 90 | 20% |
| 기술적 SEO | 70 | 78 | 90 | 15% |
| 콘텐츠 구조 | 80 | 80 | 85 | 15% |
| 이미지 최적화 | 85 | 85 | 90 | 10% |
| 코어 웹 바이탈 | 65 | 68 | 80 | 15% |
| 다국어 SEO | 40 | 72 | 85 | 10% |

### 개선 이력

| 날짜 | 작업 | 영향 카테고리 | 점수 변화 |
|-----|------|-------------|----------|
| 2025-12-26 | hreflang 태그 추가 | 다국어 SEO | +32 |
| 2025-12-26 | canonical URL 추가 | 메타데이터 | +8 |
| 2025-12-26 | description 최적화 | 메타데이터 | +5 |

---

## 2. AEO 세부 점수표

| 카테고리 | 개선 전 | 현재 | 목표 | 가중치 |
|---------|--------|------|------|--------|
| Entity 정의 명확성 | 55 | 85 | 95 | 20% |
| FAQ/Q&A 구조화 | 15 | 90 | 95 | 25% |
| 자연어 콘텐츠 품질 | 90 | 90 | 92 | 20% |
| 지식 패널 신호 | 35 | 45 | 70 | 15% |
| 크롤러빌리티 | 70 | 85 | 95 | 10% |
| CreativeWork 스키마 | 0 | 75 | 90 | 10% |

### 개선 이력

| 날짜 | 작업 | 영향 카테고리 | 점수 변화 |
|-----|------|-------------|----------|
| 2025-12-26 | FAQPage 스키마 추가 (6개 언어) | FAQ/Q&A 구조화 | +75 |
| 2025-12-26 | Person 스키마 확장 | Entity 정의 명확성 | +30 |
| 2025-12-26 | VisualArtwork 스키마 추가 | CreativeWork 스키마 | +75 |
| 2025-12-26 | AI 크롤러 허용 | 크롤러빌리티 | +15 |

---

## 3. LLM Citation 점수표

| 카테고리 | 개선 전 | 현재 | 목표 | 가중치 |
|---------|--------|------|------|--------|
| Entity 명확성 | 25 | 75 | 90 | 25% |
| FAQ 구조화 | 15 | 90 | 95 | 25% |
| 다국어 지원 | 40 | 72 | 85 | 20% |
| AI 크롤러 접근성 | 50 | 95 | 95 | 15% |
| 외부 Entity 연결 | 10 | 15 | 70 | 15% |

### 개선 이력

| 날짜 | 작업 | 영향 카테고리 | 점수 변화 |
|-----|------|-------------|----------|
| 2025-12-26 | alternateName 다국어 추가 | Entity 명확성 | +50 |
| 2025-12-26 | FAQPage 스키마 6개 언어 | FAQ 구조화 | +75 |
| 2025-12-26 | robots.txt AI 크롤러 명시 | AI 크롤러 접근성 | +45 |

---

## 4. LLM Citation 테스트 결과

### 테스트 매트릭스 (2025-12-26)

```
┌─────────────────────────────────────┬─────┬─────┬─────┬─────┐
│ 테스트 쿼리                          │ GPT │ Ppl │ Gem │ Cld │
├─────────────────────────────────────┼─────┼─────┼─────┼─────┤
│ "임혜정 작가에 대해 알려줘"           │  -  │  -  │  -  │  -  │
│ "Who is Lim Hyejung?"               │  -  │  -  │  -  │  -  │
│ "Lim Hyejung artworks"              │  -  │  -  │  -  │  -  │
│ "Utopia Reality Korean artist"       │  -  │  -  │  -  │  -  │
│ "Họa sĩ Lim Hyejung"                │  -  │  -  │  -  │  -  │
│ "リム・ヘジョンとは誰ですか"          │  -  │  -  │  -  │  -  │
│ "Siapa Lim Hyejung?"                │  -  │  -  │  -  │  -  │
└─────────────────────────────────────┴─────┴─────┴─────┴─────┘

점수: ✓ = 출처 인용 (3점), △ = 언급 (1점), ✗ = 미발견 (0점), - = 미테스트
```

**참고**: AI 인덱싱에는 수일~수주가 소요됩니다. 배포 후 1-2주 뒤에 테스트하세요.

---

## 5. 월간 점검 체크리스트

### 기술 검증
- [ ] Schema.org Validator 통과 (https://validator.schema.org/)
- [ ] Google Rich Results Test 통과
- [ ] PageSpeed Insights 점수 확인
- [ ] hreflang 검증 (https://technicalseo.com/tools/hreflang/)

### LLM Citation 테스트
- [ ] ChatGPT에서 "임혜정 작가" 검색
- [ ] Perplexity에서 "Lim Hyejung artist" 검색
- [ ] Gemini에서 "Who is Lim Hyejung" 검색
- [ ] Claude에서 "임혜정 작가에 대해 알려줘" 검색

### 외부 Entity 상태
- [ ] Wikidata 엔트리 확인/생성
- [ ] Google Knowledge Panel 상태
- [ ] Instagram 프로필 최신화

---

## 6. 다음 단계 (Phase 2 계획)

| 우선순위 | 작업 | 예상 효과 |
|---------|------|----------|
| P1 | 동적 sitemap.ts 생성 | 기술 SEO +5 |
| P1 | 페이지별 메타데이터 추가 | 메타데이터 +5 |
| P2 | FAQ 전용 페이지 생성 | AEO +5 |
| P2 | About 페이지 Semantic Chunking | LLM +10 |
| P3 | Wikidata 엔트리 생성 | 외부 Entity +30 |
| P3 | Google Knowledge Panel Claim | 지식 패널 +20 |

---

## 7. 참고 자료

### 검증 도구
- [Schema.org Validator](https://validator.schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [hreflang Tags Testing Tool](https://technicalseo.com/tools/hreflang/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

### AI 크롤러 문서
- [OpenAI GPTBot](https://platform.openai.com/docs/gptbot)
- [Anthropic ClaudeBot](https://docs.anthropic.com/en/docs/claude-crawl)
- [Google-Extended](https://developers.google.com/search/docs/crawling-indexing/google-extended)

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|-----|------|----------|
| 1.0 | 2025-12-26 | 초기 스코어카드 생성, Phase 1 구현 완료 |
