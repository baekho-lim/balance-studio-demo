#!/usr/bin/env node

/**
 * 다국어 번역 품질 검증 및 분석
 * - 번역의 길이 불일치 분석
 * - 누락된 번역 확인
 * - 번역 품질 제안
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

const loadJSON = (filename) => {
  try {
    const filePath = path.join(dataDir, filename);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`❌ ${filename} 로드 실패:`, error.message);
    return null;
  }
};

const analyzeTranslations = () => {
  const artworks = loadJSON('artworks.json');

  console.log('\n🌍 다국어 번역 분석\n');
  console.log('═'.repeat(70));

  const issues = [];

  artworks.forEach((artwork) => {
    const languages = {
      '영어': artwork.question,
      '한국어': artwork.questionKr,
      '베트남어': artwork.questionVi,
      '말레이어': artwork.questionMs,
      '인도네시아어': artwork.questionId,
    };

    const lengths = Object.entries(languages).map(([lang, text]) => ({
      lang,
      length: text ? text.length : 0,
      text: text ? text.substring(0, 50) + '...' : 'N/A',
    }));

    // 평균 길이 계산
    const validLengths = lengths.filter((l) => l.length > 0).map((l) => l.length);
    const avgLength = validLengths.reduce((a, b) => a + b, 0) / validLengths.length;

    // 길이 불일치 검사 (50% 이상 차이)
    const mismatch = lengths.filter((l) => {
      if (l.length === 0) return false;
      const deviation = Math.abs(l.length - avgLength);
      return deviation > avgLength * 0.5;
    });

    if (mismatch.length > 0 || validLengths.length < 5) {
      const issue = {
        id: artwork.id,
        title: artwork.title,
        languages,
        avgLength: Math.round(avgLength),
        completeness: ((validLengths.length / 5) * 100).toFixed(0) + '%',
      };

      if (mismatch.length > 0) {
        issue.mismatch = mismatch.map((l) => ({
          lang: l.lang,
          length: l.length,
          deviation: Math.round(Math.abs(l.length - avgLength)),
        }));
      }

      issues.push(issue);
    }
  });

  // 결과 출력
  console.log(`\n🔍 다국어 번역 완성도: ${((artworks.length - issues.length) / artworks.length * 100).toFixed(1)}%\n`);

  if (issues.length === 0) {
    console.log('✅ 모든 번역이 양호합니다!\n');
    return;
  }

  issues.forEach((issue, idx) => {
    console.log(`${idx + 1}. [${issue.id}] ${issue.title}`);
    console.log(`   완성도: ${issue.completeness} | 평균 길이: ${issue.avgLength}자`);
    const langLengths = Object.entries(issue.languages).map(([lang, obj]) => `${obj.lang}(${obj.length})`).join(' | ');
    console.log(`   언어별 길이:  ${langLengths}`);

    if (issue.mismatch) {
      console.log(`   ⚠️  불일치: ${issue.mismatch.map((m) => `${m.lang}(${m.deviation}자 차이)`).join(', ')}`);
    }
    console.log('');
  });

  console.log('═'.repeat(70));
  console.log(
    '\n💡 제안: 번역의 길이 불일치는 정상입니다 (언어 특성상 다름).\n'
  );
  console.log('   단, 50% 이상 차이나는 경우는 누락되거나 과도하게 짧은 번역입니다.\n'
  );
};

analyzeTranslations();
