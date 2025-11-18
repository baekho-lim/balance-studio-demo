# 카탈로그 인쇄 가이드
# Catalog Print Guide

## 📐 인쇄 사양 / Print Specifications

### 최종 결정 포맷 / Final Format
- **Trim Size**: 8.5" × 8.5" (216mm × 216mm) - 정사각형 / Square
- **Bleed**: 0.125" (3mm) 사방 / all sides
- **Document Size**: 8.75" × 8.75" (222mm × 222mm)
- **Safe Zone**: 0.25" (6mm) 내부 여백 / inner margin
- **Resolution**: 300 DPI
- **Color Mode**: RGB (웹) → CMYK (인쇄소 제공)
- **Paper**:
  - Cover: 300gsm coated
  - Inner pages: 150-170gsm coated
- **Binding**: Perfect Binding (무선제본)

---

## 🖨️ PDF 출력 방법 / How to Export PDF

### Step 1: 카탈로그 페이지 열기
1. 개발 서버 실행: `npm run dev`
2. 브라우저에서 `http://localhost:3000/catalog` 접속
3. 언어 선택 (EN 또는 KR)

### Step 2: 브라우저 PDF 출력
1. 우측 상단 **"Print / PDF"** 버튼 클릭 (또는 `Cmd+P` / `Ctrl+P`)
2. 프린터 설정:
   - **Destination**: "Save as PDF" 선택
   - **Paper Size**: "Custom" → `8.75 x 8.75 inches` 입력
   - **Margins**: None (여백 없음)
   - **Scale**: 100% (기본값)
   - **Options**:
     - ✅ Background graphics (배경 그래픽 포함)
     - ✅ Print headers and footers (비활성화 권장)
3. **Save** 클릭

### 브라우저별 권장 설정

#### Chrome (권장)
```
Destination: Save as PDF
Paper size: Custom (8.75 x 8.75 in)
Margins: None
Scale: Default (100%)
☑ Background graphics
☐ Headers and footers
```

#### Safari
```
File → Export as PDF
Paper Size: Custom (8.75 x 8.75 in)
☑ Print backgrounds
Scale: 100%
```

#### Firefox
```
File → Print
Destination: Save to PDF
Paper Size: Custom (22.2 x 22.2 cm)
Margins: None
☑ Print backgrounds
```

---

## 🎨 색상 변환 (RGB → CMYK)

### 자동 변환 (인쇄소 제공)
대부분의 전문 인쇄소는 RGB PDF를 받아서 자동으로 CMYK 변환합니다.
- Blurb, Mixam, PrintNinja 모두 자동 변환 지원
- 색상 프로파일: Coated FOGRA39 (유럽 표준)

### 수동 변환 (선택사항)
Adobe Acrobat Pro가 있는 경우:

1. **색상 변환**:
   - Tools → Print Production → Convert Colors
   - Document Colors: RGB → CMYK
   - Color Profile: Coated FOGRA39 (ISO 12647-2:2004)
   - 변환 옵션: Embed profile

2. **Preflight 검증**:
   - Tools → Print Production → Preflight
   - Profile: PDF/X-1a:2001 (권장)
   - 문제 발견 시 자동 수정 옵션 사용

3. **Crop Marks 추가** (선택):
   - Tools → Print Production → Add Printer Marks
   - Crop marks, Registration marks 선택
   - 이미 CSS에서 추가되어 있음 (`marks: crop cross`)

---

## 📋 체크리스트 / Checklist

### PDF 출력 전
- [ ] 개발 서버에서 모든 이미지 정상 로딩 확인
- [ ] 언어 선택 (EN 또는 KR)
- [ ] 모든 페이지 스크롤하며 레이아웃 확인
- [ ] 텍스트 오타 최종 검토

### PDF 출력 후
- [ ] PDF 열어서 전체 페이지 확인
- [ ] 이미지 해상도 확인 (확대했을 때 선명한지)
- [ ] 텍스트 가독성 확인
- [ ] 페이지 순서 확인
- [ ] 크롭 마크 표시 확인

### 인쇄소 제출 전
- [ ] 파일명: `Catalog_LimHyejung_2024_EN_v1.pdf` (버전 관리)
- [ ] 파일 크기 확인 (보통 20-50MB)
- [ ] 색상 모드 확인 (RGB는 OK, 인쇄소에서 변환)
- [ ] 폰트 임베딩 확인 (자동으로 됨)

---

## 🏭 인쇄소 선택 가이드

### 1단계: 샘플 인쇄 (1-2부)
**목적**: 실물 크기, 색상, 종이 질감 확인

#### Blurb (북미/유럽 배송)
- **가격**: ~$25/권 + 배송비
- **장점**: 빠른 배송, 고품질, 온라인 주문 쉬움
- **주문**: blurb.com → Trade Books → 8x8 Square
- **납기**: 3-7일

#### 국내 소량 인쇄
- **가격**: ₩15,000-30,000/권
- **장점**: 빠른 수령, 직접 확인 가능
- **업체**:
  - 프린팅코리아 (printingkorea.com)
  - 굿프린팅 (goodprinting.com)
  - 그라픽스퀘어 (graphicsquare.co.kr)

### 2단계: 본 인쇄 (50-100부)

#### Mixam (유럽, 한국 배송 가능)
- **가격**: 50부 약 $750 ($15/권)
- **장점**: 중간 수량에 최적, 품질 우수
- **주문**: mixam.com → Art Catalogues
- **납기**: 10-15일

#### PrintNinja (북미, 아시아 배송)
- **가격**: 100부 약 $1,200 ($12/권)
- **장점**: 대량 주문 시 가격 경쟁력
- **주문**: printninja.com → Art Books
- **납기**: 15-20일

#### 국내 대량 인쇄
- **가격**: 100부 ₩1,000,000-1,500,000 (₩10,000-15,000/권)
- **장점**: 빠른 납기, 직접 검수
- **추천 업체**:
  - 북극곰 (polarbearpress.co.kr)
  - 한솔제책 (hansol-book.com)
  - 예림인쇄 (yerim.co.kr)

---

## 📊 현재 카탈로그 구성

### 페이지 구성 (총 ~18-20페이지)
1. **Cover Page** - 표지
2. **Exhibition Statement** - 전시 서문
3. **Breathing** (2024) - Landscape layout
4. **Spend sometime** (2024) - Portrait 58/42 layout
5. **I am only passing though the woods** - Portrait 58/42
6. **Look at me or Wait for the daffodiles** - Portrait 58/42
7. **The attraction of emotion** - Portrait 58/42
8. **Effortlessly chirping birds (L/R)** - Diptych layout
9. **Take a break** - Portrait 58/42
10. **Those ladybugs** - Portrait 58/42
11. **Those mantises** - Portrait 58/42
12. **Temporal Triptych** (3 works) - Triptych layout
13. **They live like nothing** - Portrait 58/42
14. **Just that we grow** - Portrait 58/42
15. **Artist CV** - 작가 약력 + QR code
16. **Gallery Info** - 갤러리 정보 + QR code

### 레이아웃 패턴
- **Portrait (60%)**: 이미지 좌측 58%, 텍스트 우측 42%
- **Landscape (30%)**: 이미지 상단, 2단 텍스트 하단
- **Diptych (5%)**: 2개 이미지 나란히, 2단 텍스트
- **Triptych (5%)**: 3개 이미지 나란히, 3단 텍스트

---

## 🔍 품질 확인 사항

### 이미지 품질
모든 이미지가 300 DPI 이상인지 확인:
- Breathing: 3840 × 2512px → 300 DPI ✓
- Spend sometime: 2368 × 3188px → 300 DPI ✓
- 기타 작품들: 모두 300 DPI 이상 ✓

### 텍스트 가독성
- 본문: 10pt (인쇄 최소 권장 크기)
- 제목: 16pt
- 작품명: 14pt
- 주석: 9pt

### 색상
- RGB 색상 공간 (웹 표준)
- 인쇄소에서 CMYK 변환
- 색상 shift 예상: 화면보다 약간 어둡게 인쇄됨
- 샘플 인쇄로 확인 권장

---

## 🚀 빠른 실행 가이드

### 오늘 바로 PDF 만들기
```bash
# 1. 개발 서버 실행
npm run dev

# 2. 브라우저에서 열기
open http://localhost:3000/catalog

# 3. 언어 선택 → Print/PDF 버튼 클릭

# 4. 설정:
- Paper: Custom 8.75 x 8.75 in
- Margins: None
- Background graphics: ON

# 5. Save as PDF
```

### 내일 샘플 주문하기
1. 오늘 만든 PDF를 Blurb.com에 업로드
2. Trade Books → 8x8 Square 선택
3. PDF Upload → Review → Order
4. 3-7일 후 샘플 수령
5. 실물 확인 후 본 인쇄 진행

---

## 📞 문제 해결 / Troubleshooting

### PDF에 이미지가 안 보여요
- Chrome 설정에서 "Background graphics" 체크 확인
- 개발 서버가 실행 중인지 확인
- 이미지 경로가 올바른지 확인 (`/public/images/works/...`)

### 페이지 크기가 맞지 않아요
- Custom paper size 입력: `8.75 x 8.75 inches`
- Margins를 "None"으로 설정
- Scale 100% 확인

### 색상이 이상해요
- "Background graphics" 또는 "Print backgrounds" 옵션 활성화
- CSS의 `print-color-adjust: exact` 설정 확인
- 다른 브라우저로 시도 (Chrome 권장)

### 텍스트가 잘려요
- 안전 영역(Safe Zone) 내에 모든 텍스트 배치됨
- Bleed 영역(0.125in) 고려
- 실제 인쇄는 8.5" × 8.5"로 재단됨

### 크롭 마크가 안 보여요
- CSS `marks: crop cross` 설정됨
- 브라우저 PDF는 크롭 마크를 지원하지 않을 수 있음
- Adobe Acrobat Pro로 추가하거나
- 인쇄소에서 자동으로 추가해줌

---

## 📅 권장 타임라인

### 1주차: PDF 생성 및 검토
- [x] CSS 최적화 완료
- [ ] 브라우저 PDF 출력 테스트
- [ ] 작가 초안 검토
- [ ] 텍스트 최종 수정

### 2주차: 샘플 인쇄
- [ ] Blurb 샘플 1-2부 주문
- [ ] 실물 확인 및 피드백
- [ ] 색상, 종이, 바인딩 검토

### 3주차: 최종 수정
- [ ] 샘플 피드백 반영
- [ ] 최종 PDF 생성
- [ ] RGB → CMYK 변환 (선택)
- [ ] Preflight 검증

### 4주차: 본 인쇄
- [ ] 인쇄소 선택 (수량/예산 고려)
- [ ] 최종 PDF 제출
- [ ] 디지털 프루프 승인
- [ ] 본 주문 및 결제

---

## 💡 프로 팁

1. **샘플은 필수**: 화면과 인쇄물의 색상은 다릅니다. 꼭 샘플로 확인하세요.

2. **버전 관리**: 파일명에 날짜와 버전을 포함하세요.
   - `Catalog_LimHyejung_2024_EN_v1_20241118.pdf`

3. **백업**: 최종 PDF는 여러 곳에 백업하세요 (클라우드, 외장 하드).

4. **색상 프루프**: 가능하면 인쇄소에 색상 프루프를 요청하세요.

5. **여유 주문**: 본 인쇄 시 예비용으로 5-10% 더 주문하세요.

6. **ISBN**: 판매 계획이 있다면 ISBN 발급을 고려하세요.

---

## 📚 참고 자료

### 인쇄 용어
- **Bleed**: 재단 시 여백을 위한 여분의 인쇄 영역
- **Trim Size**: 최종 재단 후 크기
- **Safe Zone**: 중요한 내용이 들어가야 하는 안전 영역
- **CMYK**: Cyan, Magenta, Yellow, Black - 인쇄 색상 모드
- **RGB**: Red, Green, Blue - 디지털/화면 색상 모드
- **DPI**: Dots Per Inch - 해상도 (300 DPI = 고품질)
- **Perfect Binding**: 무선제본 (책등이 있는 제본)

### 유용한 링크
- [Blurb 제작 가이드](https://www.blurb.com/trade-books)
- [Mixam 사양 가이드](https://mixam.com/specifications)
- [PDF/X-1a 표준](https://www.prepressure.com/pdf/basics/pdfx-1a)

---

**Last Updated**: 2024.11.18
**Version**: 1.0
**Format**: Square 8.5" × 8.5"
**Status**: Ready for PDF export testing
