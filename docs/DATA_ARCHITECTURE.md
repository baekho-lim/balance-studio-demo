# 데이터 아키텍처 문서

## 개요

이 프로젝트는 **원천 데이터**와 **맥락별 큐레이션**을 분리하는 2계층 데이터 구조를 사용합니다.

## 계층 구조

```
계층 1: 원천 데이터 (Source of Truth)
├─ artworks.json          # 작품 기술 정보 (메타데이터, 이미지, 크기)
└─ artwork-notes.json     # 작가 노트 & 질문 저장소 ⭐ NEW

계층 2: 맥락별 큐레이션 (Context-Specific)
├─ catalog.json           # 카탈로그용 선별 & 큐레이터 텍스트
├─ story.json             # 스토리 앨범용 서사 (미래)
└─ exhibition-*.json      # 특정 전시용 (미래)
```

## 파일별 역할

### 1. `artworks.json` - 작품 마스터 데이터베이스

**목적**: 모든 작품의 기술적 메타데이터 저장

**내용**:
- ID, 제목, 연도, 챕터
- 물리적 크기, 재료
- 이미지 경로 및 픽셀 크기
- 기본 질문 1개 (display용)

**특징**:
- 모든 작품의 유일한 진실의 원천
- 이미지 파일과 1:1 매칭
- 웹사이트 전체에서 참조됨

### 2. `artwork-notes.json` - 작가 노트 저장소 ⭐ NEW (2024.11.18)

**목적**: 작가의 원본 작품 해설과 관람자 질문 보존

**구조**:
```json
{
  "notes": [
    {
      "artworkId": "breathing-2024",  // artworks.json의 id 매칭
      "year": 2024,
      "artistNote": {
        "en": "작가의 영문 해설...",
        "kr": "작가의 한글 해설..."
      },
      "viewerQuestions": {
        "en": ["질문1", "질문2"],
        "kr": ["질문1", "질문2"]
      },
      "themes": ["breathing", "rest", "hydrangea"],
      "sourceDate": "2024-11-18"
    }
  ]
}
```

**특징**:
- 작가의 원본 목소리 그대로 보존
- 수정하지 않고 참조만 함
- 여러 관람자 질문 저장 가능
- 테마 태그로 검색 가능

**사용 예시**:
- 카탈로그 제작 시 원본 노트 참고
- 스토리 앨범 제작 시 서사적으로 재해석
- 전시별로 다른 톤으로 재작성

### 3. `catalog.json` - 카탈로그 큐레이션

**목적**: 카탈로그 출판물을 위한 선별 및 재해석

**특징**:
- 선별된 작품만 포함
- 철학적, 사색적 톤의 큐레이터 텍스트
- artwork-notes.json의 내용을 카탈로그 맥락에 맞게 재작성
- 관람자 질문 중 1개 선별

**차이점**:
- `artwork-notes.json`: 작가의 목소리 (원본)
- `catalog.json`: 큐레이터의 목소리 (재해석)

### 4. `chapters.json` - 챕터 정보

**목적**: 작품 시리즈/챕터의 메타데이터

**내용**:
- 챕터 ID, 제목, 설명
- 커버 이미지, 대표 색상
- 챕터별 핵심 질문

## 데이터 흐름

### 작품 추가 시

1. **이미지 준비**
   ```bash
   /public/images/works/2024/breathing.jpg  # 이미지 업로드
   ```

2. **artworks.json 업데이트**
   ```json
   {
     "id": "breathing-2024",
     "title": "Breathing",
     "images": { "full": "/images/works/2024/breathing.jpg" },
     "hasArtistNote": true  // 노트 있음 표시
   }
   ```

3. **artwork-notes.json 추가**
   ```json
   {
     "artworkId": "breathing-2024",
     "artistNote": { "en": "...", "kr": "..." },
     "viewerQuestions": { "en": [...], "kr": [...] }
   }
   ```

4. **카탈로그 제작 시** (선택적)
   ```json
   // catalog.json에 추가
   {
     "id": "breathing-2024",
     "curator_text": {
       "en": "artwork-notes를 바탕으로 재해석한 텍스트",
       "kr": "카탈로그 톤에 맞게 다시 작성"
     }
   }
   ```

## 설계 원칙

### 1. 원천 데이터 보존
- 작가의 원본 노트는 절대 수정하지 않음
- `artwork-notes.json`은 읽기 전용 "재료 창고"
- 모든 큐레이션의 기초 자료

### 2. 맥락별 재해석
- 같은 작품도 맥락에 따라 다르게 해석
- 카탈로그: 철학적, 사색적
- 스토리: 서사적, 감성적
- 전시: 전시 주제에 맞춤

### 3. 데이터 중복 제거
- 원본은 한 곳에만 저장
- 다른 파일들은 ID로 참조
- 유지보수 용이

### 4. 검색 가능성
- 테마 태그로 유사 작품 그룹핑
- 특정 주제로 작품 찾기 가능
- 미래 AI 큐레이션 준비

## TypeScript 타입

### Artwork 인터페이스
```typescript
export interface Artwork {
  id: string;
  title: string;
  // ... 기타 필드
  hasArtistNote?: boolean;  // artwork-notes.json 참조 여부
}
```

### ArtworkNote 인터페이스
```typescript
export interface ArtworkNote {
  artworkId: string;
  year: number;
  artistNote: {
    en: string;
    kr: string;
  };
  viewerQuestions: {
    en: string[];
    kr: string[];
  };
  themes: string[];
  sourceDate: string;
}
```

## 미래 확장

### 유틸리티 함수 (예정)
```typescript
// /src/utils/artwork-notes.ts
export function getArtistNote(artworkId: string): ArtworkNote
export function getNotesByTheme(theme: string): ArtworkNote[]
export function getSourceMaterial(artworkId: string): {
  artwork: Artwork;
  note: ArtworkNote;
}
```

### 추가 큐레이션 파일
- `story.json`: 스토리 앨범용 서사적 큐레이션
- `exhibition-2024-fall.json`: 특정 전시용
- `education.json`: 교육 자료용

## 폴더 구조

```
/src/data/
├── artworks.json          # 작품 마스터 DB
├── artwork-notes.json     # 작가 노트 저장소 ⭐ NEW
├── chapters.json          # 챕터 정보
├── catalog.json           # 카탈로그 큐레이션
├── artist.json            # 작가 정보
└── exhibitions.json       # 전시 이력

/public/images/works/
├── 2024/                  # 2024년 작품 이미지 ⭐ NEW
│   ├── breathing.jpg
│   └── spend-sometime.jpg
└── [기타 작품들]
```

## 2024년 작품 (현재)

### 추가된 작품
1. **Breathing** (breathing-2024)
   - 크기: 60.5 x 91 cm
   - 테마: breathing, rest, hydrangea, inner-garden
   - 작가 노트 ✓

2. **Spend sometime** (spend-sometime-2024)
   - 크기: 53.0 x 41.0 cm
   - 테마: solitude, deer, forest, moonlight
   - 작가 노트 ✓

### 챕터 배정
- 임시: `waters-of-time` 챕터
- 향후 재분류 가능

## 주의사항

1. **artwork-notes.json 수정 금지**
   - 원본 데이터는 보존용
   - 새로운 해석이 필요하면 catalog.json 등에서 작성

2. **ID 일관성 유지**
   - artworks.json의 id와 artwork-notes.json의 artworkId 일치 필수
   - 검증 스크립트로 확인 (향후 추가 예정)

3. **이미지 경로**
   - 2024년 이후 작품: `/images/works/YYYY/filename.jpg`
   - 기존 작품: 기존 경로 유지 (점진적 이동 가능)

---

**Last Updated**: 2024.11.18
**Version**: 1.0.0
