const fs = require('fs');
const path = require('path');

const artworksPath = path.join(__dirname, '../src/data/artworks.json');
const imagesDir = path.join(__dirname, '../public/images/works');

console.log('=== Artwork Data Validation ===\n');

// Load data
let artworks;
try {
  artworks = JSON.parse(fs.readFileSync(artworksPath, 'utf8'));
  console.log(`✓ Loaded ${artworks.length} artworks\n`);
} catch (err) {
  console.error('✗ Failed to load artworks.json:', err.message);
  process.exit(1);
}

let errors = [];
let warnings = [];

// Required fields
const requiredFields = ['id', 'title', 'year', 'chapter', 'medium', 'images', 'order'];
const validChapters = ['secret-garden', 'effortless-spring', 'desert-stories', 'waters-of-time'];

artworks.forEach((artwork, index) => {
  const prefix = `Artwork ${index + 1} (${artwork.id || 'NO ID'})`;

  // Check required fields
  requiredFields.forEach(field => {
    if (!artwork[field]) {
      errors.push(`${prefix}: Missing required field '${field}'`);
    }
  });

  // Validate year
  if (artwork.year && typeof artwork.year !== 'number') {
    errors.push(`${prefix}: 'year' should be a number, got ${typeof artwork.year}`);
  }

  // Validate chapter
  if (artwork.chapter && !validChapters.includes(artwork.chapter)) {
    errors.push(`${prefix}: Invalid chapter '${artwork.chapter}'`);
  }

  // Check images object
  if (artwork.images) {
    if (!artwork.images.thumbnail) {
      errors.push(`${prefix}: Missing images.thumbnail`);
    } else {
      const thumbnailPath = path.join(__dirname, '../public', artwork.images.thumbnail);
      if (!fs.existsSync(thumbnailPath)) {
        errors.push(`${prefix}: Thumbnail file not found: ${artwork.images.thumbnail}`);
      }
    }

    if (!artwork.images.full) {
      errors.push(`${prefix}: Missing images.full`);
    }

    if (!artwork.images.alt) {
      warnings.push(`${prefix}: Missing images.alt (accessibility concern)`);
    }
  }

  // Check optional but recommended fields
  if (!artwork.dimensions) {
    warnings.push(`${prefix}: Missing dimensions`);
  }

  if (!artwork.question) {
    warnings.push(`${prefix}: Missing question`);
  }

  if (!artwork.questionKr) {
    warnings.push(`${prefix}: Missing Korean question`);
  }

  if (!artwork.imageWidth || !artwork.imageHeight) {
    warnings.push(`${prefix}: Missing image dimensions (imageWidth/imageHeight)`);
  }

  if (!artwork.sizeCategory) {
    warnings.push(`${prefix}: Missing sizeCategory`);
  }
});

// Check for duplicate IDs
const ids = artworks.map(a => a.id);
const duplicateIds = ids.filter((id, i) => ids.indexOf(id) !== i);
if (duplicateIds.length > 0) {
  errors.push(`Duplicate IDs found: ${[...new Set(duplicateIds)].join(', ')}`);
}

// Check chapter order continuity
const chapterGroups = {};
artworks.forEach(artwork => {
  if (!chapterGroups[artwork.chapter]) {
    chapterGroups[artwork.chapter] = [];
  }
  chapterGroups[artwork.chapter].push(artwork.order);
});

Object.entries(chapterGroups).forEach(([chapter, orders]) => {
  orders.sort((a, b) => a - b);
  for (let i = 0; i < orders.length; i++) {
    if (orders[i] !== i + 1) {
      warnings.push(`Chapter '${chapter}': Order gap detected. Expected ${i + 1}, found ${orders[i]}`);
      break;
    }
  }
});

// Report results
console.log('=== ERRORS ===');
if (errors.length === 0) {
  console.log('✓ No errors found\n');
} else {
  errors.forEach(err => console.log(`✗ ${err}`));
  console.log(`\nTotal: ${errors.length} errors\n`);
}

console.log('=== WARNINGS ===');
if (warnings.length === 0) {
  console.log('✓ No warnings\n');
} else {
  warnings.forEach(warn => console.log(`⚠ ${warn}`));
  console.log(`\nTotal: ${warnings.length} warnings\n`);
}

// Summary
console.log('=== SUMMARY ===');
console.log(`Total artworks: ${artworks.length}`);
console.log(`Chapters: ${Object.keys(chapterGroups).length}`);
Object.entries(chapterGroups).forEach(([chapter, orders]) => {
  console.log(`  - ${chapter}: ${orders.length} works`);
});

if (errors.length > 0) {
  process.exit(1);
}
