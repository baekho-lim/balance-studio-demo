#!/usr/bin/env node

/**
 * 데이터 전처리 스크립트
 * - 데이터 검증 및 정규화
 * - 누락된 필드 자동 채우기
 * - 참조 무결성 확인
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

// 데이터 로드
const loadJSON = (filename) => {
  try {
    const filePath = path.join(dataDir, filename);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`❌ ${filename} 로드 실패:`, error.message);
    return null;
  }
};

// 데이터 저장
const saveJSON = (filename, data) => {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✅ ${filename} 저장 완료`);
};

// 한국어 포함 필드 자동 생성 (필요시)
const fillKoreanFields = (artwork) => {
  // 모든 필드에 Kr 버전 존재 확인
  const krMappings = {
    title: 'title',
    medium: 'medium',
    dimensions: 'dimensions',
  };

  for (const [field, _] of Object.entries(krMappings)) {
    if (!artwork[`${field}Kr`]) {
      artwork[`${field}Kr`] = artwork[field];
    }
  }

  return artwork;
};

// 다국어 질문 검증
const validateMultilingualQuestions = (artwork) => {
  const languages = ['Kr', 'Vi', 'Ms', 'Id'];
  const missingLangs = [];

  for (const lang of languages) {
    const field = `question${lang}`;
    if (!artwork[field] || artwork[field].trim() === '') {
      missingLangs.push(lang);
    }
  }

  return {
    valid: missingLangs.length === 0,
    missing: missingLangs,
  };
};

// 이미지 필드 검증
const validateImages = (artwork) => {
  const requiredFields = ['thumbnail', 'full', 'alt'];
  const missing = [];

  if (!artwork.images) {
    return { valid: false, missing: requiredFields };
  }

  for (const field of requiredFields) {
    if (!artwork.images[field]) {
      missing.push(field);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
};

// 메타데이터 검증
const validateMetadata = (artwork) => {
  const required = ['id', 'title', 'year', 'chapter', 'medium', 'dimensions', 'order'];
  const missing = [];

  for (const field of required) {
    if (!artwork[field]) {
      missing.push(field);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
};

// 작품 데이터 정규화
const normalizeArtworks = (artworks, chapters) => {
  const validChapters = chapters.map((c) => c.id);
  const issues = [];
  const normalized = [];

  artworks.forEach((artwork, index) => {
    const errors = [];

    // 1. 필수 필드 검증
    const metaValidation = validateMetadata(artwork);
    if (!metaValidation.valid) {
      errors.push(`메타데이터 누락: ${metaValidation.missing.join(', ')}`);
    }

    // 2. 이미지 필드 검증
    const imgValidation = validateImages(artwork);
    if (!imgValidation.valid) {
      errors.push(`이미지 필드 누락: ${imgValidation.missing.join(', ')}`);
    }

    // 3. 다국어 질문 검증
    const langValidation = validateMultilingualQuestions(artwork);
    if (!langValidation.valid) {
      errors.push(`다국어 질문 누락: ${langValidation.missing.map((l) => `question${l}`).join(', ')}`);
    }

    // 4. 챕터 참조 검증
    if (!validChapters.includes(artwork.chapter)) {
      errors.push(`유효하지 않은 챕터: "${artwork.chapter}"`);
    }

    // 5. 크기 카테고리 검증
    if (!['small', 'medium', 'large'].includes(artwork.sizeCategory)) {
      errors.push(`유효하지 않은 sizeCategory: "${artwork.sizeCategory}"`);
    }

    // 6. 년도 검증
    if (artwork.year < 2020 || artwork.year > new Date().getFullYear()) {
      errors.push(`비정상적인 년도: ${artwork.year}`);
    }

    // 한국어 필드 자동 채우기
    fillKoreanFields(artwork);

    if (errors.length > 0) {
      issues.push({
        id: artwork.id,
        index,
        errors,
      });
    }

    normalized.push(artwork);
  });

  return { normalized, issues };
};

// 챕터 데이터 정규화
const normalizeChapters = (chapters) => {
  const requiredFields = ['id', 'title', 'titleKr', 'question', 'questionKr'];
  const issues = [];

  chapters.forEach((chapter, index) => {
    const errors = [];

    for (const field of requiredFields) {
      if (!chapter[field]) {
        errors.push(`필드 누락: ${field}`);
      }
    }

    if (errors.length > 0) {
      issues.push({
        id: chapter.id,
        index,
        errors,
      });
    }
  });

  return { normalized: chapters, issues };
};

// 전시 데이터 정규화 및 수정
const normalizeExhibitions = (exhibitions, validChapters) => {
  const normalized = exhibitions.map((ex) => {
    // chapters 배열 검증 및 수정
    if (ex.chapters && Array.isArray(ex.chapters)) {
      const validChapterIds = ex.chapters.filter((ch) => validChapters.includes(ch));
      const invalidChapters = ex.chapters.filter((ch) => !validChapters.includes(ch));

      if (invalidChapters.length > 0) {
        console.warn(`⚠️  전시 "${ex.title}"의 유효하지 않은 챕터 제거:`, invalidChapters);
      }

      ex.chapters = validChapterIds;
    } else {
      ex.chapters = validChapters; // 기본값으로 모든 챕터 할당
    }

    return ex;
  });

  return normalized;
};

// 메인 전처리 함수
const preprocess = () => {
  console.log('\n🔍 데이터 전처리 시작...\n');

  // 데이터 로드
  const artworks = loadJSON('artworks.json');
  const chapters = loadJSON('chapters.json');
  const artist = loadJSON('artist.json');
  const exhibitions = loadJSON('exhibitions.json');

  if (!artworks || !chapters) {
    console.error('❌ 필수 데이터 파일을 찾을 수 없습니다.');
    process.exit(1);
  }

  let allIssuesFound = false;

  // 1. 챕터 정규화
  console.log('📋 챕터 데이터 검증 중...');
  const { issues: chapterIssues } = normalizeChapters(chapters);
  if (chapterIssues.length > 0) {
    console.log(`⚠️  챕터 문제: ${chapterIssues.length}개`);
    chapterIssues.forEach((issue) => {
      console.log(`   - ${issue.id}: ${issue.errors.join('; ')}`);
    });
    allIssuesFound = true;
  } else {
    console.log('✅ 모든 챕터 데이터 유효함');
  }

  // 2. 작품 정규화
  console.log('\n🎨 작품 데이터 검증 중...');
  const { normalized: normalizedArtworks, issues: artworkIssues } = normalizeArtworks(artworks, chapters);
  if (artworkIssues.length > 0) {
    console.log(`⚠️  작품 문제: ${artworkIssues.length}개`);
    artworkIssues.forEach((issue) => {
      console.log(`   - [${issue.index}] ${issue.id}:`);
      issue.errors.forEach((err) => console.log(`      • ${err}`));
    });
    allIssuesFound = true;
  } else {
    console.log(`✅ 모든 ${artworks.length}개 작품 데이터 유효함`);
  }

  // 3. 전시 정규화 및 수정
  console.log('\n🏛️  전시 데이터 정규화 중...');
  const validChapterIds = chapters.map((c) => c.id);
  const normalizedExhibitions = normalizeExhibitions(exhibitions || [], validChapterIds);
  if (exhibitions) {
    const originalChapters = exhibitions[0]?.chapters || [];
    const fixedChapters = normalizedExhibitions[0]?.chapters || [];
    if (JSON.stringify(originalChapters) !== JSON.stringify(fixedChapters)) {
      console.log(`✅ 전시 챕터 참조 자동 수정됨`);
      console.log(`   - 원본: ${originalChapters.join(', ')}`);
      console.log(`   - 수정됨: ${fixedChapters.join(', ')}`);
    } else {
      console.log('✅ 전시 데이터 유효함');
    }
  }

  // 4. 데이터 통계
  console.log('\n📊 데이터 통계:');
  console.log(`   - 작품 수: ${normalizedArtworks.length}`);
  console.log(`   - 챕터 수: ${chapters.length}`);
  const chaptersWithWorks = chapters.filter((ch) =>
    normalizedArtworks.some((art) => art.chapter === ch.id)
  );
  console.log(`   - 작품이 있는 챕터: ${chaptersWithWorks.length}`);

  // 챕터별 작품 수
  console.log('\n📈 챕터별 작품 분포:');
  chapters.forEach((chapter) => {
    const count = normalizedArtworks.filter((art) => art.chapter === chapter.id).length;
    console.log(`   - ${chapter.title} (${chapter.id}): ${count}개`);
  });

  // 크기별 분포
  console.log('\n📏 크기별 분포:');
  ['small', 'medium', 'large'].forEach((size) => {
    const count = normalizedArtworks.filter((art) => art.sizeCategory === size).length;
    console.log(`   - ${size}: ${count}개`);
  });

  // 5. 정제된 데이터 저장
  if (artworkIssues.length === 0 && chapterIssues.length === 0) {
    console.log('\n💾 정제된 데이터 저장 중...');
    saveJSON('artworks.json', normalizedArtworks);
    saveJSON('chapters.json', chapters);
    if (normalizedExhibitions.length > 0) {
      saveJSON('exhibitions.json', normalizedExhibitions);
    }
    console.log('✨ 모든 데이터가 성공적으로 정제되고 저장되었습니다!\n');
    return true;
  } else {
    console.log('\n❌ 데이터 문제를 수정하세요.');
    if (allIssuesFound) {
      console.log('위 문제들이 자동으로 수정될 수 없습니다.\n');
    }
    return false;
  }
};

// 스크립트 실행
const success = preprocess();
process.exit(success ? 0 : 1);
