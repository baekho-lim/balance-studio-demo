# Add New Artwork

새로운 작품을 데이터베이스에 추가합니다.

## Steps

1. **이미지 파일 확인**
   - `/public/images/works/` 폴더에 이미지가 있는지 확인
   - 파일명 형식: `{번호}.{작품명}.{확장자}`

2. **이미지 크기 추출**
   ```bash
   sips -g pixelWidth -g pixelHeight /public/images/works/{filename}
   ```

3. **artworks.json 업데이트**
   - 새 작품 객체 추가
   - 필수 필드:
     - id, title, year, chapter, medium, dimensions
     - images (thumbnail, full, alt)
     - order, imageWidth, imageHeight, sizeCategory
   - 선택 필드: question, questionKr, description

4. **타입 검증**
   ```bash
   npm run build
   ```

5. **로컬 테스트**
   - 브라우저에서 작품 표시 확인
   - 모든 뷰 모드에서 정상 동작 확인

## Template
```json
{
  "id": "{chapter-prefix}-{number}",
  "title": "",
  "year": 2025,
  "chapter": "secret-garden|effortless-spring|desert-stories|waters-of-time",
  "medium": "Mixed media on canvas",
  "dimensions": "W x H cm",
  "question": "",
  "questionKr": "",
  "images": {
    "thumbnail": "/images/works/{filename}",
    "full": "/images/works/{filename}",
    "alt": ""
  },
  "order": 1,
  "imageWidth": 0,
  "imageHeight": 0,
  "sizeCategory": "small|medium|large"
}
```
