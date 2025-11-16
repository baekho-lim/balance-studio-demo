# Image Processing Guide

## 이미지 준비

### 파일명 규칙
```
{번호}. {작품명}.{확장자}
예: 1. I am only passing though the woods..jpg
```

**주의사항:**
- 파일명에 특수문자 사용 최소화
- 확장자 통일 권장 (jpg/JPG/jpeg 혼용 방지)
- 공백은 허용되나 URL 인코딩 주의

### 권장 사양
- **형식**: JPG, JPEG, PNG, WebP
- **해상도**: 최소 2000px (긴 변 기준)
- **색상 프로파일**: sRGB
- **용량**: 최적화된 상태로 2-5MB

## 이미지 크기 추출

### macOS (sips 사용)
```bash
# 단일 파일
sips -g pixelWidth -g pixelHeight "/path/to/image.jpg"

# 모든 작품 이미지
for f in public/images/works/*; do
  echo "=== $f ==="
  sips -g pixelWidth -g pixelHeight "$f"
done
```

### Node.js 스크립트
```javascript
// scripts/extract-dimensions.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const imagesDir = './public/images/works';
const files = fs.readdirSync(imagesDir);

files.forEach(file => {
  if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
    const filePath = path.join(imagesDir, file);
    const output = execSync(`sips -g pixelWidth -g pixelHeight "${filePath}"`).toString();

    const width = output.match(/pixelWidth: (\d+)/)?.[1];
    const height = output.match(/pixelHeight: (\d+)/)?.[1];

    console.log(`${file}: ${width}x${height}`);
  }
});
```

## Size Category 계산

```javascript
function getSizeCategory(width, height) {
  const totalPixels = width * height;

  if (totalPixels > 10000000) return 'large';    // 1000만+
  if (totalPixels > 5000000) return 'medium';    // 500만+
  return 'small';
}
```

## Next.js 이미지 최적화

### Image 컴포넌트 사용
```tsx
import Image from 'next/image'

<Image
  src="/images/works/artwork.jpg"
  alt="작품 설명"
  fill                              // 부모 컨테이너에 맞춤
  className="object-cover"          // 비율 유지하며 채움
  sizes="(max-width: 768px) 100vw, 50vw"  // 반응형 크기
  priority                          // LCP 이미지용
/>
```

### 일반적인 이슈

1. **이미지가 표시되지 않음**
   - 파일 경로 확인 (대소문자 구분)
   - public 폴더 기준 절대 경로 사용

2. **이미지 비율 왜곡**
   - `object-fit: cover` 또는 `contain` 사용
   - aspect-ratio CSS 속성 활용

3. **프로필 사진 크롭**
   - `object-position: top` 추가
   - 얼굴 위치에 따라 조정

## 이미지 최적화 체크리스트

- [ ] 파일명 정규화 완료
- [ ] 모든 이미지 픽셀 크기 추출
- [ ] JSON 데이터에 imageWidth/imageHeight 추가
- [ ] sizeCategory 계산 및 추가
- [ ] Next.js Image 컴포넌트 사용
- [ ] alt 텍스트 작성 (접근성)
- [ ] sizes 속성으로 반응형 최적화
