# Validate Artwork Data

작품 데이터의 무결성을 검증합니다.

## Validation Steps

1. **JSON 구문 검사**
   ```bash
   node -e "require('./src/data/artworks.json')"
   ```

2. **필수 필드 확인**
   모든 작품에 다음 필드가 있는지 확인:
   - id (unique)
   - title
   - year (number)
   - chapter (valid slug)
   - medium
   - dimensions
   - images.thumbnail (파일 존재)
   - images.full (파일 존재)
   - order

3. **이미지 파일 존재 확인**
   ```bash
   # 모든 이미지 경로가 실제 파일과 매칭되는지 확인
   node scripts/validate-images.js
   ```

4. **중복 ID 검사**
   ```bash
   node -e "
     const data = require('./src/data/artworks.json');
     const ids = data.map(a => a.id);
     const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
     if (duplicates.length) console.error('Duplicates:', duplicates);
     else console.log('No duplicates found');
   "
   ```

5. **챕터별 순서 검증**
   각 챕터 내 order 값이 연속적인지 확인

## Common Issues

- 이미지 파일명 오타
- year 필드가 문자열로 저장됨
- dimensions 형식 불일치
- 누락된 한국어 텍스트
