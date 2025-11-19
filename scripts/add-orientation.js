const fs = require('fs');
const path = require('path');

// Calculate orientation based on dimensions
function calculateOrientation(width, height) {
  if (!width || !height) return 'square';

  const ratio = width / height;

  if (ratio > 1.1) return 'landscape';
  if (ratio < 0.9) return 'portrait';
  return 'square';
}

// Read artworks.json
const artworksPath = path.join(__dirname, '../src/data/artworks.json');
const artworks = JSON.parse(fs.readFileSync(artworksPath, 'utf8'));

// Update each artwork
artworks.forEach(artwork => {
  // Add exhibitionNumber field (null by default, curator will fill later)
  if (!artwork.hasOwnProperty('exhibitionNumber')) {
    artwork.exhibitionNumber = null;
  }

  // Calculate and add orientation
  if (!artwork.hasOwnProperty('orientation')) {
    artwork.orientation = calculateOrientation(artwork.imageWidth, artwork.imageHeight);
  }
});

// Write back to file
fs.writeFileSync(artworksPath, JSON.stringify(artworks, null, 2));

console.log('✅ Updated artworks.json with:');
console.log('   - exhibitionNumber field (null)');
console.log('   - orientation field (auto-calculated)');
console.log('');
console.log('Orientation breakdown:');
const orientationCounts = artworks.reduce((acc, artwork) => {
  acc[artwork.orientation] = (acc[artwork.orientation] || 0) + 1;
  return acc;
}, {});
console.log(`   Portrait: ${orientationCounts.portrait || 0}`);
console.log(`   Landscape: ${orientationCounts.landscape || 0}`);
console.log(`   Square: ${orientationCounts.square || 0}`);
