/**
 * Article JSON-LD generator
 * For blog posts, news, press releases
 */

import type { ArticleEntity } from '@agency/core'

export interface ArticleJsonLdOptions {
  siteUrl: string
  locale?: string
  publisherName?: string
  publisherLogo?: string
}

export interface ArticleJsonLdOutput {
  '@context': 'https://schema.org'
  '@type': string
  '@id': string
  headline: string
  alternativeHeadline?: string
  description?: string
  datePublished: string
  dateModified?: string
  author?: {
    '@type': 'Person' | 'Organization'
    '@id'?: string
    name: string
    url?: string
  }
  publisher?: {
    '@type': 'Organization'
    name: string
    url?: string
    logo?: {
      '@type': 'ImageObject'
      url: string
    }
  }
  mainEntityOfPage?: {
    '@type': 'WebPage'
    '@id': string
  }
  image?: string | string[]
  url?: string
  articleSection?: string
  keywords?: string
  inLanguage?: string[]
  wordCount?: number
  articleBody?: string
}

/**
 * Map article type to Schema.org type
 */
function getArticleType(type: ArticleEntity['articleType']): string {
  switch (type) {
    case 'NewsArticle':
    case 'PressRelease':
      return 'NewsArticle'
    case 'BlogPost':
      return 'BlogPosting'
    case 'Interview':
      return 'Article'
    case 'Review':
      return 'Review'
    default:
      return 'Article'
  }
}

/**
 * Get article section from type
 */
function getArticleSection(type: ArticleEntity['articleType']): string {
  switch (type) {
    case 'PressRelease':
      return 'Press Release'
    case 'Interview':
      return 'Interview'
    case 'Review':
      return 'Review'
    case 'BlogPost':
      return 'Blog'
    default:
      return 'Feature'
  }
}

/**
 * Generate Article JSON-LD schema
 */
export function generateArticleJsonLd(
  article: ArticleEntity,
  options: ArticleJsonLdOptions
): ArticleJsonLdOutput {
  const { siteUrl, publisherName, publisherLogo } = options

  const result: ArticleJsonLdOutput = {
    '@context': 'https://schema.org',
    '@type': getArticleType(article.articleType),
    '@id': `${siteUrl}/articles/${article.slug}`,
    headline: article.name.en,
    alternativeHeadline: article.name.ko !== article.name.en ? article.name.ko : undefined,
    description: article.excerpt?.en || article.description?.en,
    datePublished: article.publishDate,
    dateModified: article.updatedAt,
    url: `${siteUrl}/articles/${article.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/articles/${article.slug}`
    },
    articleSection: getArticleSection(article.articleType),
    keywords: article.tags?.join(', '),
    inLanguage: ['en', 'ko'],
    wordCount: article.readTime ? article.readTime * 200 : undefined // Estimate word count from read time
  }

  // Add author
  if (article.author) {
    result.author = {
      '@type': 'Person',
      '@id': `${siteUrl}/#person-${article.author}`,
      name: article.author
    }
  }

  // Add publisher
  if (publisherName) {
    result.publisher = {
      '@type': 'Organization',
      name: publisherName,
      url: siteUrl
    }
    if (publisherLogo) {
      result.publisher.logo = {
        '@type': 'ImageObject',
        url: `${siteUrl}${publisherLogo}`
      }
    }
  }

  // Add image
  if (article.images?.hero) {
    result.image = `${siteUrl}${article.images.hero}`
  }

  return result
}

/**
 * Generate Blog Post JSON-LD
 */
export function generateBlogPostJsonLd(
  article: ArticleEntity,
  options: ArticleJsonLdOptions & {
    authorUrl?: string
    categoryName?: string
  }
): ArticleJsonLdOutput {
  const { authorUrl, categoryName } = options
  const baseJsonLd = generateArticleJsonLd(article, options)

  const result: ArticleJsonLdOutput = {
    ...baseJsonLd,
    '@type': 'BlogPosting',
    articleSection: categoryName || baseJsonLd.articleSection
  }

  if (authorUrl && result.author) {
    result.author.url = authorUrl
  }

  return result
}

/**
 * Generate News Article JSON-LD
 */
export function generateNewsArticleJsonLd(
  article: ArticleEntity,
  options: ArticleJsonLdOptions & {
    sourceName?: string
    sourceUrl?: string
  }
): ArticleJsonLdOutput {
  const { siteUrl, sourceName, sourceUrl } = options
  const baseJsonLd = generateArticleJsonLd(article, options)

  const result: ArticleJsonLdOutput = {
    ...baseJsonLd,
    '@type': 'NewsArticle'
  }

  // If external source, update publisher
  if (sourceName && sourceUrl) {
    result.publisher = {
      '@type': 'Organization',
      name: sourceName,
      url: sourceUrl
    }
  }

  return result
}

/**
 * Generate Press Release JSON-LD
 */
export function generatePressReleaseJsonLd(
  article: ArticleEntity,
  options: ArticleJsonLdOptions & {
    organizationName?: string
  }
): ArticleJsonLdOutput {
  const { organizationName, siteUrl, publisherName } = options
  const baseJsonLd = generateArticleJsonLd(article, options)

  return {
    ...baseJsonLd,
    '@type': 'NewsArticle',
    articleSection: 'Press Release',
    publisher: {
      '@type': 'Organization',
      name: organizationName || publisherName || 'Organization',
      url: siteUrl
    }
  }
}
