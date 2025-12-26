/**
 * Image Optimization Script
 *
 * Converts artwork images to WebP format with multiple sizes:
 * - thumbnail: 400px width
 * - medium: 1200px width
 * - full: 2400px width
 *
 * Usage: node scripts/optimize-images.js
 *
 * Note: This script is for reference/future use.
 * Next.js automatically optimizes images via its Image component.
 * Run this only if you need pre-generated WebP files for external use.
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('Sharp is not installed. To use this script:');
  console.log('  npm install sharp --save-dev');
  console.log('');
  console.log('Note: Next.js Image component already optimizes images automatically.');
  console.log('This script is only needed for pre-generating WebP files for external use.');
  process.exit(0);
}

const SIZES = {
  thumbnail: 400,
  medium: 1200,
  full: 2400
};

const INPUT_DIR = path.join(__dirname, '../public/images/works');
const OUTPUT_DIR = path.join(__dirname, '../public/images/works/optimized');

async function optimizeImages() {
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all image files
  const files = fs.readdirSync(INPUT_DIR).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) && !file.startsWith('.');
  });

  console.log(`Found ${files.length} images to optimize\n`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const baseName = path.basename(file, path.extname(file));

    // Skip if it's a directory
    if (fs.statSync(inputPath).isDirectory()) continue;

    const originalSize = fs.statSync(inputPath).size;
    totalOriginalSize += originalSize;

    console.log(`Processing: ${file} (${(originalSize / 1024 / 1024).toFixed(2)} MB)`);

    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      for (const [sizeName, width] of Object.entries(SIZES)) {
        // Skip if original is smaller than target width
        if (metadata.width && metadata.width < width) {
          console.log(`  Skipping ${sizeName}: original width (${metadata.width}px) < target (${width}px)`);
          continue;
        }

        const outputPath = path.join(OUTPUT_DIR, `${baseName}-${sizeName}.webp`);

        await sharp(inputPath)
          .resize(width, null, { withoutEnlargement: true })
          .webp({ quality: 85 })
          .toFile(outputPath);

        const optimizedSize = fs.statSync(outputPath).size;
        totalOptimizedSize += optimizedSize;

        console.log(`  ${sizeName}: ${(optimizedSize / 1024).toFixed(0)} KB`);
      }
    } catch (error) {
      console.error(`  Error processing ${file}:`, error.message);
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Original total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized total: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Reduction: ${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%`);
}

optimizeImages().catch(console.error);
