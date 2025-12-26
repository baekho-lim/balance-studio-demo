# Check Translations Skill

Analyze translation coverage across all content files and generate a status report.

## Purpose
Scan all data files to identify translation gaps and update the translation status documentation.

## Data Files to Check

1. `src/data/faq.json` - FAQ questions and answers
2. `src/data/news.json` - News articles and press releases
3. `src/data/catalog.json` - Catalog curator statement and foreword
4. `src/data/exhibitions.json` - Exhibition descriptions
5. `src/data/artist.json` - Artist biography and statement
6. `src/data/artworks.json` - Artwork questions (questionKr, questionVi, etc.)
7. `src/data/chapters.json` - Chapter/series descriptions

## Supported Languages

Check for these 11 language codes:
- **P0**: `en`, `ko`, `vi`
- **P1**: `ja`, `zh-CN`, `ms`, `id`
- **P2**: `de`, `fr`, `es`
- **P3**: `ar`

## Check Process

### Step 1: Read All Data Files
```
Read each JSON file listed above
```

### Step 2: Analyze Each Multilingual Field
For each content type, check if translations exist:
- FAQ: question.{lang}, answer.{lang}
- News: title.{lang}, excerpt.{lang}, content.{lang}
- Catalog: subtitle.{lang}, curatorStatement.{lang}, foreword.{lang}
- Exhibitions: title.{lang}, description.{lang}, curatorNote.{lang}
- Artist: biography.{lang}, statement.{lang}, philosophy.{lang}
- Artworks: question{Lang} suffix format (questionKr, questionVi, etc.)
- Chapters: name.{lang}, description.{lang}

### Step 3: Calculate Coverage
For each content type and language:
- Count total translatable items
- Count items with translation present
- Calculate percentage: (translated / total) * 100

### Step 4: Generate Report

Output format:
```markdown
## Translation Coverage Report
Generated: [DATE]

### Summary
| Language | Overall Coverage |
|----------|-----------------|
| en | 100% |
| ko | 100% (source) |
| vi | XX% |
| ... | ... |

### By Content Type
[Detailed tables for each content type]

### Missing Translations
[List specific items that need translation]

### Recommendations
1. Priority translations needed: [list]
2. Quick wins (small items): [list]
```

### Step 5: Update Documentation
Update `docs/TRANSLATION-STATUS.md` with the new data.

## Output Instructions

1. Scan all data files
2. Generate comprehensive coverage report
3. Identify specific missing translations
4. Update TRANSLATION-STATUS.md with current data
5. Provide actionable recommendations

## Example Usage

```
User: /check-translations
Assistant: [Scans all data files, generates coverage report, updates documentation]

Translation Coverage Report
===========================

Summary:
- English: 100% complete
- Korean: 100% (source language)
- Vietnamese: 45% complete
- Japanese: 0% - NEEDS TRANSLATION
- Chinese: 0% - NEEDS TRANSLATION
...

Missing Translations (Priority):
1. FAQ Japanese (8 items)
2. Exhibition Japanese (2 items)
3. Catalog Vietnamese (3 fields)
...

Recommendations:
- Start with Japanese FAQ for quick wins
- Catalog translation needed for all P1 languages
```

## Notes

- Korean (ko) is the source language - always 100%
- English (en) should always be complete as fallback
- Focus recommendations on P1 languages (ja, zh-CN) for NYC gallery target
- Track artworks separately due to different field naming convention
