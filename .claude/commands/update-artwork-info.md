# Update Artwork Information

작품 정보를 일괄 업데이트합니다.

## 사용 시나리오

1. **물리적 크기 업데이트**
   - 사용자가 엑셀/JSON으로 실제 크기 정보 제공
   - scripts/update-sizes.js 수정 후 실행

2. **연도 일괄 변경**
   ```javascript
   // artworks.json 내 모든 연도를 특정 값으로 변경
   const artworks = require('./src/data/artworks.json');
   artworks.forEach(a => a.year = 2025);
   fs.writeFileSync('./src/data/artworks.json', JSON.stringify(artworks, null, 2));
   ```

3. **미디엄 업데이트**
   - 모든 작품의 재료/기법 정보 수정

## 데이터 매핑 전략

작품 번호(파일명 기준)와 작품 ID를 매핑:

```javascript
const idToNumber = {
  'sg-001': 1,  // 1번 파일 = sg-001
  'sg-002': 2,
  // ...
};

const numberToData = {
  1: { size: "60.5 x 91 cm", medium: "Mixed media on canvas", year: 2025 },
  // ...
};
```

## 실행 절차

1. **스크립트 작성**
   ```bash
   vi scripts/update-{field}.js
   ```

2. **테스트 실행**
   ```bash
   node scripts/update-{field}.js
   ```

3. **결과 확인**
   ```bash
   git diff src/data/artworks.json
   ```

4. **검증**
   ```bash
   node scripts/validate-artworks.js
   npm run build
   ```

5. **커밋**
   ```bash
   git add src/data/artworks.json scripts/update-{field}.js
   git commit -m "Update {field} for all artworks"
   ```

## 주의사항

- 스크립트 실행 전 백업 권장
- 매핑 정확성 이중 확인
- 실행 후 검증 필수
