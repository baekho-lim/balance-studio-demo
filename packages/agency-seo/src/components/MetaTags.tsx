/**
 * React component for generating meta tags
 */

import * as React from 'react'

export interface MetaTagsProps {
  title: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
  ogType?: 'website' | 'article' | 'profile' | 'product'
  ogImage?: string
  ogImageWidth?: number
  ogImageHeight?: number
  twitterCard?: 'summary' | 'summary_large_image'
  twitterSite?: string
  twitterCreator?: string
  locale?: string
  alternateLocales?: Array<{ locale: string; url: string }>
  noindex?: boolean
  nofollow?: boolean
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

/**
 * Generate meta tags for SEO
 * Note: For Next.js, prefer using the Metadata API instead
 * This component is for custom meta tag scenarios
 */
export function MetaTags({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  twitterCard = 'summary_large_image',
  twitterSite,
  twitterCreator,
  locale,
  alternateLocales,
  noindex = false,
  nofollow = false,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags
}: MetaTagsProps): React.ReactElement {
  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow'
  ].join(', ')

  return (
    <>
      {/* Basic Meta */}
      {description && <meta name="description" content={description} />}
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content={robotsContent} />

      {/* Canonical & Alternates */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {alternateLocales && alternateLocales.map(alt => (
        <link
          key={alt.locale}
          rel="alternate"
          hrefLang={alt.locale}
          href={alt.url}
        />
      ))}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:width" content={String(ogImageWidth)} />
          <meta property="og:image:height" content={String(ogImageHeight)} />
        </>
      )}
      {locale && <meta property="og:locale" content={locale} />}

      {/* Article-specific Open Graph */}
      {ogType === 'article' && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
    </>
  )
}

/**
 * Generate hreflang link tags
 */
export function HrefLangLinks({
  currentLocale,
  locales,
  getUrl
}: {
  currentLocale: string
  locales: string[]
  getUrl: (locale: string) => string
}): React.ReactElement {
  return (
    <>
      {locales.map(locale => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={getUrl(locale)}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={getUrl('en')}
      />
    </>
  )
}
