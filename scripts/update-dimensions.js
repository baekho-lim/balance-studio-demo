const fs = require('fs');
const path = require('path');

// Dimensions extracted from sips command
const dimensionMap = {
  '1. I am only passing though the woods..jpg': { w: 4446, h: 2914 },
  '2. Look at me or Wait for the daffodiles..JPG': { w: 3084, h: 3569 },
  '3. Effortlessly chirping birds._L.JPG': { w: 4390, h: 2927 },
  '4. Effortlessly chirping birds._R.JPG': { w: 4390, h: 2927 },
  '5. Take a break.JPG': { w: 1563, h: 1997 },
  '6. Brighten someone..JPG': { w: 1563, h: 1997 },
  '7. Recall a happy memory.JPG': { w: 1563, h: 1997 },
  '8. Those ladybugs..JPG': { w: 1563, h: 1997 },
  '9. Those silkworms..jpg': { w: 1563, h: 1997 },
  '10. THose mantises..jpg': { w: 1563, h: 1997 },
  '11. Those snails..JPG': { w: 1563, h: 1997 },
  '12. Those bees. .JPG': { w: 1563, h: 1997 },
  '13. You are going to grow up..JPG': { w: 2328, h: 3335 },
  '14. I am going to have to grow old..JPG': { w: 2328, h: 3335 },
  '15. And then I will die..JPG': { w: 2328, h: 3335 },
  '16. On your heart..JPG': { w: 1563, h: 1997 },
  '17. Take one tiny step..jpg': { w: 2757, h: 3489 },
  '18. Go there..jpg': { w: 2779, h: 3530 },
  '19.they live like nothing....jpeg': { w: 5417, h: 3601 },
  '20.The attraction of emotion.jpeg': { w: 3285, h: 5091 },
  '21.Just that we grow.jpeg': { w: 3829, h: 4849 }
};

const artworksPath = path.join(__dirname, '../src/data/artworks.json');
const artworks = JSON.parse(fs.readFileSync(artworksPath, 'utf8'));

artworks.forEach(artwork => {
  const filename = path.basename(artwork.images.full);
  const dims = dimensionMap[filename];

  if (dims) {
    artwork.imageWidth = dims.w;
    artwork.imageHeight = dims.h;
    // Calculate size category based on total pixels
    const totalPixels = dims.w * dims.h;
    if (totalPixels > 10000000) {
      artwork.sizeCategory = 'large';
    } else if (totalPixels > 5000000) {
      artwork.sizeCategory = 'medium';
    } else {
      artwork.sizeCategory = 'small';
    }
  }
});

fs.writeFileSync(artworksPath, JSON.stringify(artworks, null, 2));
console.log('Updated artworks.json with dimensions');
