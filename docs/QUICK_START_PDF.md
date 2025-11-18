# 🚀 카탈로그 PDF 빠른 시작 가이드

## 지금 바로 PDF 만들기 (5분)

### 1️⃣ 카탈로그 페이지 열기

개발 서버가 이미 실행 중입니다:
```
http://localhost:3000/catalog
```

브라우저에서 위 주소를 열어주세요.

### 2️⃣ 언어 선택

우측 상단에서 **EN** 또는 **KR** 선택

### 3️⃣ PDF 출력

**방법 1: 버튼 사용**
- 우측 상단 **"Print / PDF"** 버튼 클릭

**방법 2: 단축키**
- Mac: `Cmd + P`
- Windows: `Ctrl + P`

### 4️⃣ 프린터 설정 (중요!)

```
✅ Destination: Save as PDF
✅ Paper size: Custom → 8.75 x 8.75 inches 입력
✅ Margins: None
✅ Scale: 100%
✅ Background graphics: ON (반드시 체크!)
❌ Headers and footers: OFF
```

### 5️⃣ 저장

**Save** 버튼 클릭 → 파일명 입력:
```
Catalog_LimHyejung_2024_EN_v1.pdf
```

---

## ✅ 확인 사항

PDF를 열어서 다음을 확인하세요:

- [ ] 모든 이미지가 선명하게 보이는가?
- [ ] 텍스트가 잘 읽히는가?
- [ ] 페이지 순서가 올바른가?
- [ ] 색상이 제대로 나왔는가?
- [ ] 페이지 번호가 정확한가?

---

## 📐 현재 설정

**인쇄 포맷**: Square 8.5" × 8.5" (216mm × 216mm)
**레이아웃**: 4가지 자동 레이아웃
- Portrait 작품: 58/42 분할 (이미지 좌, 텍스트 우)
- Landscape 작품: 상하 배치 (이미지 상, 2단 텍스트 하)
- Diptych: 2개 이미지 나란히
- Triptych: 3개 이미지 나란히

**페이지 구성**: 약 18-20 페이지
1. 표지
2. 전시 서문
3. 작품 14점 (다양한 레이아웃)
4. 작가 약력 + QR code
5. 갤러리 정보 + QR code

---

## 🎯 다음 단계

### 옵션 A: 샘플 인쇄 주문 (권장)
실물로 확인하고 싶다면:
1. Blurb.com 접속
2. Trade Books → 8x8 Square 선택
3. 방금 만든 PDF 업로드
4. 1-2부 주문 (~$25/권 + 배송)
5. 3-7일 후 수령

### 옵션 B: 바로 본 인쇄
샘플 확인 없이 바로 인쇄하고 싶다면:
- **50부**: Mixam.com (~$750)
- **100부**: PrintNinja.com (~$1,200)
- **국내**: ₩10,000-15,000/권

---

## 🆘 문제 해결

**이미지가 안 보여요**
→ "Background graphics" 체크 확인

**페이지 크기가 이상해요**
→ Custom size: `8.75 x 8.75 inches` 정확히 입력

**색상이 이상해요**
→ Chrome 브라우저 사용 권장

**더 자세한 내용은?**
→ `/docs/PRINT_GUIDE.md` 참조

---

**준비 완료!**
이제 `http://localhost:3000/catalog`에서 PDF를 만들 수 있습니다.
