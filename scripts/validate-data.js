#!/usr/bin/env node

/**
 * 고급 데이터 검증 스크립트
 * - 데이터 무결성 심층 검증
 * - 상호 참조 검증
 * - 이미지 파일 존재 여부 확인
 * - SEO 메타데이터 검증
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
const publicDir = path.join(__dirname, '../public');

const loadJSON = (filename) => {
  try {
    const filePath = path.join(dataDir, filename);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`❌ ${filename} 로드 실패:`, error.message);
    return null;
  }
};

// 이미지 파일 존재 여부 확인
const checkImageFiles = (artworks) => {
  const issues = [];
  const checkedPaths = new Set();

  artworks.forEach((artwork) => {
    if (!artwork.images) return;

    ['thumbnail', 'full'].forEach((imageType) => {
      const imagePath = artwork.images[imageType];
      if (!imagePath) return;

      if (!checkedPaths.has(imagePath)) {
        checkedPaths.add(imagePath);
        const fullPath = path.join(publicDir, imagePath);
        if (!fs.existsSync(fullPath)) {
          issues.push({
            type: 'missing-file',
            artwork: artwork.id,
            field: `images.${imageType}`,
            path: imagePath,
          });
        }
      }
    });
  });

  return issues;
};

// 깊이 있는 필드 검증
const validateFieldDepth = (artworks) => {
  const issues = [];

  artworks.forEach((artwork) => {
    // 1. 텍스트 필드 길이 검증
    const textFields = {
      title: { min: 3, max: 100 },
      medium: { min: 5, max: 100 },
      dimensions: { min: 5, max: 30 },
      question: { min: 10, max: 200 },
    };

    for (const [field, constraints] of Object.entries(textFields)) {
      const value = artwork[field];
      if (value) {
        if (value.length < constraints.min) {
          issues.push({
            type: 'text-too-short',
            artwork: artwork.id,
            field,
            length: value.length,
            min: constraints.min,
          });
        }
        if (value.length > constraints.max) {
          issues.push({
            type: 'text-too-long',
            artwork: artwork.id,
            field,
            length: value.length,
            max: constraints.max,
          });
        }
      }
    }

    // 2. 다국어 필드 길이 불일치 검증 (너무 짧거나 긺)
    const questionLangs = ['question', 'questionKr', 'questionVi', 'questionMs', 'questionId'];
    const lengths = questionLangs
      .filter((lang) => artwork[lang])
      .map((lang) => artwork[lang].length);

    if (lengths.length > 0) {
      const avgLength = Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
      lengths.forEach((len, idx) => {
        const deviation = Math.abs(len - avgLength);
        if (deviation > avgLength * 0.5) {
          // 평균에서 50% 이상 차이
          issues.push({
            type: 'multilingual-length-mismatch',
            artwork: artwork.id,
            language: questionLangs[idx],
            length: len,
            averageLength: avgLength,
          });
        }
      });
    }

    // 3. 이미지 해상도 검증
    if (artwork.imageWidth && artwork.imageHeight) {
      const aspectRatio = artwork.imageWidth / artwork.imageHeight;
      if (aspectRatio < 0.3 || aspectRatio > 3) {
        issues.push({
          type: 'unusual-aspect-ratio',
          artwork: artwork.id,
          ratio: aspectRatio.toFixed(2),
          dimensions: `${artwork.imageWidth}x${artwork.imageHeight}`,
        });
      }
    }

    // 4. Order 필드 유일성 검증 (챕터별)
    if (!artwork.order) {
      issues.push({
        type: 'missing-order',
        artwork: artwork.id,
      });
    }
  });

  return issues;
};

// 데이터 일관성 검증
const validateConsistency = (artworks, chapters, exhibitions) => {
  const issues = [];
  const orderMap = {}; // 챕터별 order 추적

  // 챕터별 order 순서 검증
  artworks.forEach((artwork) => {
    const chapter = artwork.chapter;
    if (!orderMap[chapter]) {
      orderMap[chapter] = [];
    }
    orderMap[chapter].push(artwork.order);
  });

  for (const [chapter, orders] of Object.entries(orderMap)) {
    const sorted = [...orders].sort((a, b) => a - b);
    const expected = Array.from({ length: orders.length }, (_, i) => i + 1);

    if (JSON.stringify(sorted) !== JSON.stringify(expected)) {
      issues.push({
        type: 'non-sequential-order',
        chapter,
        found: sorted,
        expected,
      });
    }
  }

  // 중복된 id 검증
  const ids = artworks.map((a) => a.id);
  const duplicates = ids.filter((id, idx) => ids.indexOf(id) !== idx);
  if (duplicates.length > 0) {
    issues.push({
      type: 'duplicate-ids',
      ids: [...new Set(duplicates)],
    });
  }

  // 참조 검증
  const validChapterIds = chapters.map((c) => c.id);
  artworks.forEach((artwork) => {
    if (!validChapterIds.includes(artwork.chapter)) {
      issues.push({
        type: 'invalid-chapter-reference',
        artwork: artwork.id,
        chapter: artwork.chapter,
      });
    }
  });

  return issues;
};

// 데이터 완전성 검증
const validateCompleteness = (artworks, artist) => {
  const issues = [];

  // 작가 정보 검증
  if (!artist) {
    issues.push({
      type: 'missing-artist-data',
    });
  } else {
    const artistRequired = ['name', 'nameKr', 'bio', 'contact'];
    artistRequired.forEach((field) => {
      if (!artist[field]) {
        issues.push({
          type: 'missing-artist-field',
          field,
        });
      }
    });
  }

  // 모든 작품에 필수 메타데이터가 있는지 확인
  const requiredFields = [
    'id',
    'title',
    'year',
    'chapter',
    'medium',
    'dimensions',
    'order',
    'images',
    'question',
    'questionKr',
    'imageWidth',
    'imageHeight',
    'sizeCategory',
  ];

  artworks.forEach((artwork) => {
    const missing = requiredFields.filter((field) => {
      if (field === 'images') {
        return !artwork[field] || !artwork[field].thumbnail || !artwork[field].full;
      }
      return !artwork[field];
    });

    if (missing.length > 0) {
      issues.push({
        type: 'incomplete-artwork',
        artwork: artwork.id,
        missingFields: missing,
      });
    }
  });

  return issues;
};

// SEO 메타데이터 검증
const validateSEO = (artworks, chapters) => {
  const issues = [];

  // 작품 SEO
  artworks.forEach((artwork) => {
    if (!artwork.images || !artwork.images.alt || artwork.images.alt.length < 5) {
      issues.push({
        type: 'weak-image-alt',
        artwork: artwork.id,
      });
    }
  });

  // 챕터 SEO
  chapters.forEach((chapter) => {
    if (!chapter.description || chapter.description.length < 20) {
      issues.push({
        type: 'weak-chapter-description',
        chapter: chapter.id,
      });
    }
  });

  return issues;
};

// 보고서 생성
const generateReport = () => {
  console.log('\n\n🔬 고급 데이터 검증 실행\n');
  console.log('═'.repeat(60));

  const artworks = loadJSON('artworks.json');
  const chapters = loadJSON('chapters.json');
  const exhibitions = loadJSON('exhibitions.json');
  const artist = loadJSON('artist.json');

  if (!artworks || !chapters) {
    console.error('❌ 필수 데이터를 로드할 수 없습니다.');
    process.exit(1);
  }

  let totalIssues = 0;

  // 1. 이미지 파일 검증
  console.log('\n📸 이미지 파일 검증:');
  const imageIssues = checkImageFiles(artworks);
  if (imageIssues.length === 0) {
    console.log('✅ 모든 이미지 파일 존재함');
  } else {
    console.log(`⚠️  문제: ${imageIssues.length}개`);
    imageIssues.slice(0, 5).forEach((issue) => {
      console.log(`   - [${issue.artwork}] ${issue.path} (없음)`);
    });
    if (imageIssues.length > 5) {
      console.log(`   ... 외 ${imageIssues.length - 5}개`);
    }
    totalIssues += imageIssues.length;
  }

  // 2. 필드 깊이 검증
  console.log('\n📏 필드 깊이 검증:');
  const depthIssues = validateFieldDepth(artworks);
  if (depthIssues.length === 0) {
    console.log('✅ 모든 필드가 적절한 길이를 유지중');
  } else {
    console.log(`⚠️  문제: ${depthIssues.length}개`);
    const grouped = {};
    depthIssues.forEach((issue) => {
      if (!grouped[issue.type]) grouped[issue.type] = [];
      grouped[issue.type].push(issue);
    });
    for (const [type, issues] of Object.entries(grouped)) {
      console.log(`   - ${type}: ${issues.length}개`);
    }
    totalIssues += depthIssues.length;
  }

  // 3. 데이터 일관성 검증
  console.log('\n🔗 데이터 일관성 검증:');
  const consistencyIssues = validateConsistency(artworks, chapters, exhibitions);
  if (consistencyIssues.length === 0) {
    console.log('✅ 모든 데이터 일관성 유지중');
  } else {
    console.log(`⚠️  문제: ${consistencyIssues.length}개`);
    consistencyIssues.forEach((issue) => {
      console.log(`   - ${issue.type}`);
      if (issue.chapter) console.log(`      챕터: ${issue.chapter}`);
      if (issue.found) console.log(`      발견된 order: [${issue.found.join(', ')}]`);
    });
    totalIssues += consistencyIssues.length;
  }

  // 4. 데이터 완전성 검증
  console.log('\n✔️  데이터 완전성 검증:');
  const completenessIssues = validateCompleteness(artworks, artist);
  if (completenessIssues.length === 0) {
    console.log('✅ 모든 필수 데이터 완성됨');
  } else {
    console.log(`⚠️  문제: ${completenessIssues.length}개`);
    completenessIssues.slice(0, 3).forEach((issue) => {
      console.log(`   - ${issue.type}`);
      if (issue.missingFields) {
        console.log(`      누락된 필드: ${issue.missingFields.join(', ')}`);
      }
    });
    if (completenessIssues.length > 3) {
      console.log(`   ... 외 ${completenessIssues.length - 3}개`);
    }
    totalIssues += completenessIssues.length;
  }

  // 5. SEO 메타데이터 검증
  console.log('\n🔍 SEO 메타데이터 검증:');
  const seoIssues = validateSEO(artworks, chapters);
  if (seoIssues.length === 0) {
    console.log('✅ SEO 메타데이터 완성됨');
  } else {
    console.log(`⚠️  제안: ${seoIssues.length}개`);
    const grouped = {};
    seoIssues.forEach((issue) => {
      if (!grouped[issue.type]) grouped[issue.type] = 0;
      grouped[issue.type]++;
    });
    for (const [type, count] of Object.entries(grouped)) {
      console.log(`   - ${type}: ${count}개`);
    }
  }

  // 최종 요약
  console.log('\n' + '═'.repeat(60));
  if (totalIssues === 0) {
    console.log('✨ 모든 데이터가 완벽합니다!\n');
    return true;
  } else {
    console.log(`\n⚠️  총 ${totalIssues}개의 문제가 발견되었습니다.\n`);
    return false;
  }
};

generateReport();
