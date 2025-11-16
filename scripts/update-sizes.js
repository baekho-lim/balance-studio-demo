const fs = require('fs');
const path = require('path');

// Mapping from artwork number to physical dimensions
const sizeData = {
  1: { size: "60.5 x 91 cm", medium: "Mixed media on canvas", year: 2025 },
  2: { size: "60.5 x 91 cm", medium: "Mixed media on canvas", year: 2025 },
  3: { size: "60.5 x 91 cm", medium: "Mixed media on canvas", year: 2025 },
  4: { size: "60.5 x 91 cm", medium: "Mixed media on canvas", year: 2025 },
  5: { size: "34.8 x 27.3 cm", medium: "Mixed media on canvas", year: 2025 },
  6: { size: "34.8 x 27.3 cm", medium: "Mixed media on canvas", year: 2025 },
  7: { size: "34.8 x 27.3 cm", medium: "Mixed media on canvas", year: 2025 },
  8: { size: "34.8 x 27.3 cm", medium: "Mixed media on canvas", year: 2025 },
  9: { size: "34.8 x 27.3 cm", medium: "Mixed media on canvas", year: 2025 },
  10: { size: "34.8 x 27.3 cm", medium: "Mixed media on canvas", year: 2025 },
  11: { size: "34.8 x 27.3 cm", medium: "Mixed media on canvas", year: 2025 },
  12: { size: "34.8 x 27.3 cm", medium: "Mixed media on canvas", year: 2025 },
  13: { size: "65.1 x 136.5 cm", medium: "Mixed media on canvas", year: 2025 },
  14: { size: "65.1 x 136.5 cm", medium: "Mixed media on canvas", year: 2025 },
  15: { size: "65.1 x 136.5 cm", medium: "Mixed media on canvas", year: 2025 },
  16: { size: "34.8 x 27.3 cm", medium: "Mixed media on canvas", year: 2024 },
  17: { size: "34.8 x 27.3 cm", medium: "Mixed media on canvas", year: 2024 },
  18: { size: "34.8 x 27.3 cm", medium: "Mixed media on canvas", year: 2024 },
  19: { size: "91 x 60.5 cm", medium: "Mixed media on canvas", year: 2025 },
  20: { size: "91 x 60.5 cm", medium: "Mixed media on canvas", year: 2025 },
  21: { size: "80.3 x 65.1 cm", medium: "Mixed media on canvas", year: 2025 }
};

// Mapping from artwork ID to number (based on image file numbers)
const idToNumber = {
  'sg-001': 1,  // 1. I am only passing though the woods
  'sg-002': 2,  // 2. Look at me or Wait for the daffodils
  'sg-003': 8,  // 8. Those ladybugs
  'sg-004': 9,  // 9. Those silkworms
  'sg-005': 10, // 10. Those mantises
  'sg-006': 11, // 11. Those snails
  'sg-007': 12, // 12. Those bees
  'sg-008': 20, // 20. The attraction of emotion
  'es-001': 3,  // 3. Effortlessly chirping birds L
  'es-002': 4,  // 4. Effortlessly chirping birds R
  'es-003': 5,  // 5. Take a break
  'es-004': 6,  // 6. Brighten someone
  'es-005': 7,  // 7. Recall a happy memory
  'ds-001': 13, // 13. You are going to grow up
  'ds-002': 14, // 14. I am going to have to grow old
  'ds-003': 15, // 15. And then I will die
  'ds-004': 19, // 19. They live like nothing happened
  'wt-001': 16, // 16. On your heart
  'wt-002': 17, // 17. Take one tiny step
  'wt-003': 18, // 18. Go there
  'wt-004': 21  // 21. Just that we grow
};

const artworksPath = path.join(__dirname, '../src/data/artworks.json');
const artworks = JSON.parse(fs.readFileSync(artworksPath, 'utf8'));

artworks.forEach(artwork => {
  const num = idToNumber[artwork.id];
  if (num && sizeData[num]) {
    artwork.dimensions = sizeData[num].size;
    artwork.medium = sizeData[num].medium;
    artwork.year = sizeData[num].year;
  }
});

fs.writeFileSync(artworksPath, JSON.stringify(artworks, null, 2));
console.log('Updated artworks.json with physical dimensions');
