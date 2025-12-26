# Translation Status Tracker

> **Last Updated**: 2025-12-26
> **Source Language**: Korean (ko)
> **Architecture**: English UI + Multilingual Content

## Overview

This document tracks the translation status of all content across the website.
- **UI text** is always in English (menus, buttons, labels)
- **Content** is multilingual (exhibitions, artist notes, catalog, FAQ, news)

### Supported Languages (11)

| Priority | Code | Language | Native Name | RTL | Status |
|----------|------|----------|-------------|-----|--------|
| P0 | en | English | English | No | ✅ Complete |
| P0 | ko | Korean | 한국어 | No | ✅ Source |
| P0 | vi | Vietnamese | Tiếng Việt | No | ⚠️ Partial |
| P1 | ja | Japanese | 日本語 | No | ❌ Pending |
| P1 | zh-CN | Chinese (Simplified) | 简体中文 | No | ❌ Pending |
| P1 | ms | Malay | Bahasa Melayu | No | ⚠️ Partial |
| P1 | id | Indonesian | Bahasa Indonesia | No | ⚠️ Partial |
| P2 | de | German | Deutsch | No | ❌ Pending |
| P2 | fr | French | Français | No | ❌ Pending |
| P2 | es | Spanish | Español | No | ❌ Pending |
| P3 | ar | Arabic | العربية | Yes | ❌ Pending |

---

## Translation Status by Content Type

### Legend
- ✅ Complete (100%)
- ⚠️ Partial (1-99%)
- ❌ Missing (0%)
- 📝 Source language

### 1. FAQ (`src/data/faq.json`)

| Language | Status | Questions Translated | Notes |
|----------|--------|---------------------|-------|
| ko | 📝 | 8/8 | Source |
| en | ✅ | 8/8 | Complete |
| vi | ✅ | 8/8 | Complete |
| ja | ❌ | 0/8 | - |
| zh-CN | ❌ | 0/8 | - |
| ms | ❌ | 0/8 | - |
| id | ❌ | 0/8 | - |
| de | ❌ | 0/8 | - |
| fr | ❌ | 0/8 | - |
| es | ❌ | 0/8 | - |
| ar | ❌ | 0/8 | - |

### 2. News/Press (`src/data/news.json`)

| Language | Status | Articles Translated | Notes |
|----------|--------|---------------------|-------|
| ko | 📝 | 3/3 | Source |
| en | ✅ | 3/3 | Complete |
| vi | ✅ | 3/3 | Complete |
| ja | ❌ | 0/3 | - |
| zh-CN | ❌ | 0/3 | - |
| ms | ❌ | 0/3 | - |
| id | ❌ | 0/3 | - |
| de | ❌ | 0/3 | - |
| fr | ❌ | 0/3 | - |
| es | ❌ | 0/3 | - |
| ar | ❌ | 0/3 | - |

### 3. Catalog (`src/data/catalog.json`)

| Language | Status | Fields Translated | Notes |
|----------|--------|-------------------|-------|
| ko | 📝 | All | Source |
| en | ✅ | All | Complete |
| vi | ❌ | 0 | - |
| ja | ❌ | 0 | - |
| zh-CN | ❌ | 0 | - |
| ms | ❌ | 0 | - |
| id | ❌ | 0 | - |
| de | ❌ | 0 | - |
| fr | ❌ | 0 | - |
| es | ❌ | 0 | - |
| ar | ❌ | 0 | - |

### 4. Exhibitions (`src/data/exhibitions.json`)

| Language | Status | Exhibitions Translated | Notes |
|----------|--------|------------------------|-------|
| ko | 📝 | 2/2 | Source |
| en | ✅ | 2/2 | Complete |
| vi | ✅ | 2/2 | Complete |
| ja | ❌ | 0/2 | - |
| zh-CN | ❌ | 0/2 | - |
| ms | ❌ | 0/2 | - |
| id | ❌ | 0/2 | - |
| de | ❌ | 0/2 | - |
| fr | ❌ | 0/2 | - |
| es | ❌ | 0/2 | - |
| ar | ❌ | 0/2 | - |

### 5. Artist Statement (`src/data/artist.json`)

| Language | Status | Sections Translated | Notes |
|----------|--------|---------------------|-------|
| ko | 📝 | All | Source |
| en | ✅ | All | Complete |
| vi | ❌ | 0 | - |
| ja | ❌ | 0 | - |
| zh-CN | ❌ | 0 | - |
| ms | ❌ | 0 | - |
| id | ❌ | 0 | - |
| de | ❌ | 0 | - |
| fr | ❌ | 0 | - |
| es | ❌ | 0 | - |
| ar | ❌ | 0 | - |

### 6. Artworks (`src/data/artworks.json`)

| Language | Status | Artworks Translated | Notes |
|----------|--------|---------------------|-------|
| ko | 📝 | 21/21 | Source (question field) |
| en | ✅ | 21/21 | Complete |
| vi | ⚠️ | 21/21 | questionVi field |
| ja | ❌ | 0/21 | - |
| zh-CN | ❌ | 0/21 | - |
| ms | ⚠️ | 21/21 | questionMs field |
| id | ⚠️ | 21/21 | questionId field |
| de | ❌ | 0/21 | - |
| fr | ❌ | 0/21 | - |
| es | ❌ | 0/21 | - |
| ar | ❌ | 0/21 | - |

### 7. Chapters (`src/data/chapters.json`)

| Language | Status | Chapters Translated | Notes |
|----------|--------|---------------------|-------|
| ko | 📝 | 4/4 | Source |
| en | ✅ | 4/4 | Complete |
| vi | ❌ | 0/4 | - |
| ja | ❌ | 0/4 | - |
| zh-CN | ❌ | 0/4 | - |
| ms | ❌ | 0/4 | - |
| id | ❌ | 0/4 | - |
| de | ❌ | 0/4 | - |
| fr | ❌ | 0/4 | - |
| es | ❌ | 0/4 | - |
| ar | ❌ | 0/4 | - |

---

## Translation Priority

### Phase 1: NYC Gallery Target (P1 Languages)
**Priority**: Japanese (ja) and Chinese Simplified (zh-CN)
- High value for NYC gallery Asian collector market
- Focus on: FAQ, Exhibition, Artist Statement, Catalog

### Phase 2: European Market (P2 Languages)
**Priority**: German (de), French (fr), Spanish (es)
- European collector market expansion
- Focus on: FAQ, Exhibition descriptions

### Phase 3: Global Expansion (P3 Languages)
**Priority**: Arabic (ar)
- Gulf region collector market
- RTL layout support required

### Phase 4: Complete Partial Translations
**Languages**: Vietnamese (vi), Malay (ms), Indonesian (id)
- Complete missing content sections
- Catalog, Artist Statement, Chapters

---

## How to Add Translations

### Using Translation Skills

Each content type has a dedicated Claude Code skill with expert personas:

| Content Type | Skill Name | Persona |
|-------------|------------|---------|
| Catalog | `/translate-catalog` | Native curator |
| News/Press | `/translate-news` | Cultural arts journalist |
| FAQ | `/translate-faq` | Online curator |
| Exhibition | `/translate-exhibition` | Gallery director |
| Artist Statement | `/translate-artist` | Art critic |

### Translation Guidelines

1. **Source Language**: Korean (ko) is the authoritative source
2. **Cultural Adaptation**: Translate meaning, not words literally
3. **Art Terminology**: Use correct art world vocabulary for each language
4. **Local Context**: Add relevant cultural references when appropriate
5. **Collector Perspective**: Consider the target market's preferences

### After Adding Translations

1. Update the status tables above
2. Run `/check-translations` to verify coverage
3. Test the language selector on the live site
4. Commit changes with descriptive message

---

## Fallback Behavior

When a translation is missing:
```
Selected Language → English Fallback → Empty String
```

Example:
```typescript
const getText = (text: MultiLingualText): string => {
  return text[contentLanguage] || text.en || ''
}
```

---

## Notes

- UI is always in English (navigation, buttons, labels)
- Only content (descriptions, statements, articles) is multilingual
- Arabic (ar) requires RTL layout support
- All translations should be reviewed by native speakers
