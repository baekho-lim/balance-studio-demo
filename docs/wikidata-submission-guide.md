# Wikidata 엔트리 생성 가이드

> **목적**: 임혜정 작가의 Wikidata 엔트리 생성을 통한 LLM Citation 점수 향상
> **예상 효과**: 외부 Entity 연결 점수 +30점

---

## 1. 준비 데이터

준비된 데이터 파일: `/public/wikidata-ready.json`

이 파일에는 Wikidata 형식에 맞춰 정리된 모든 정보가 포함되어 있습니다:
- 다국어 레이블 (영어, 한국어, 베트남어, 일본어, 중국어)
- Wikidata Property ID (P31, P106, P27 등)
- 참조 자료 URL

---

## 2. 제출 절차

### Step 1: Wikidata 계정 생성
1. https://www.wikidata.org 접속
2. 우측 상단 "Create account" 클릭
3. 계정 생성 (이메일 인증 필요)

### Step 2: 새 항목 생성
1. 좌측 메뉴 "Special pages" → "Create a new item"
2. 또는 직접 URL: https://www.wikidata.org/wiki/Special:NewItem

### Step 3: 기본 정보 입력
```
Language: English
Label: Lim Hyejung
Description: South Korean contemporary artist (born 1981)
Aliases: Hyejung Lim, Lim Hye-jung
```

### Step 4: 주요 속성(Claims) 추가

| 속성 | Property ID | 값 |
|-----|------------|-----|
| instance of | P31 | human (Q5) |
| sex or gender | P21 | female (Q6581072) |
| occupation | P106 | visual artist (Q3391743) |
| country of citizenship | P27 | South Korea (Q884) |
| date of birth | P569 | 1981 |
| place of birth | P19 | Seoul (Q8684) |
| educated at | P69 | Seoul National University of Science and Technology (Q7430088) |
| field of work | P101 | contemporary art (Q11629) |
| official website | P856 | https://limhyejung.com |
| Instagram username | P2003 | limhyejung_artworks |

### Step 5: 참조(References) 추가
각 claim에 참조 추가:
- Reference URL (P854): https://limhyejung.com/about
- Retrieved (P813): 오늘 날짜

---

## 3. 주목성(Notability) 근거

Wikidata는 Wikipedia보다 주목성 기준이 낮지만, 다음 근거를 준비해두세요:

1. **갤러리 대표 작가**
   - TomuraLee Gallery (베트남) 소속 작가
   - URL: https://tomuralee.vn

2. **아트페어 참가 이력**
   - VIA Art Fair 2024 참가
   - VIA Art Fair 2025 참가
   - VIA 2025 ENCORE 그룹전

3. **공식 웹사이트**
   - limhyejung.com (전문적인 포트폴리오 사이트)

---

## 4. 생성 후 작업

### artist.json 업데이트
Wikidata 엔트리 생성 후, Q번호를 받으면 다음 파일 업데이트:

```json
// src/data/artist.json
{
  "externalIds": {
    "instagram": "https://instagram.com/limhyejung_artworks",
    "wikidata": "Q123456789",  // 실제 Q번호로 교체
    "viaf": null,
    "ulan": null
  }
}
```

### 자동 연결 확인
- JsonLd.tsx의 sameAs 배열에 자동 추가됨
- PersonJsonLd.tsx에도 자동 반영

---

## 5. 추가 Entity 연결 (선택)

Wikidata 생성 후 연계 가능한 다른 Entity들:

### VIAF (Virtual International Authority File)
- 도서관 권위 파일
- Wikidata에서 자동 생성되기도 함
- https://viaf.org

### Getty ULAN (Union List of Artist Names)
- 미술가 전문 데이터베이스
- 신청 필요: https://www.getty.edu/research/tools/vocabularies/ulan/
- 갤러리 대표 작가 자격으로 신청 가능

### ISNI (International Standard Name Identifier)
- 국제 표준 이름 식별자
- Wikidata에서 자동 할당되기도 함

---

## 6. 예상 효과

| 지표 | 현재 | Wikidata 생성 후 |
|-----|------|----------------|
| 외부 Entity 연결 | 15/100 | 45/100 (+30) |
| LLM Citation 종합 | 68/100 | ~80/100 |

### LLM 인용 개선
- ChatGPT: Wikidata를 신뢰할 수 있는 출처로 참조
- Perplexity: 구조화된 데이터 우선 인용
- Gemini: Knowledge Graph 연결 강화

---

## 7. 참고 자료

- [Wikidata:Notability](https://www.wikidata.org/wiki/Wikidata:Notability)
- [Wikidata:Tours/Items](https://www.wikidata.org/wiki/Wikidata:Tours/Items)
- [Help:Items](https://www.wikidata.org/wiki/Help:Items)

---

*마지막 업데이트: 2025-12-26*
