/**
 * Sitemap generator utilities
 */

export interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  alternates?: Array<{
    hreflang: string
    href: string
  }>
  images?: Array<{
    loc: string
    caption?: string
    title?: string
  }>
}

export interface SitemapConfig {
  urls: SitemapUrl[]
  defaultChangefreq?: SitemapUrl['changefreq']
  defaultPriority?: number
}

/**
 * Generate XML sitemap content
 */
export function generateSitemapXml(config: SitemapConfig): string {
  const { urls, defaultChangefreq = 'weekly', defaultPriority = 0.5 } = config

  const urlElements = urls.map(url => {
    const elements: string[] = [`    <loc>${escapeXml(url.loc)}</loc>`]

    if (url.lastmod) {
      elements.push(`    <lastmod>${url.lastmod}</lastmod>`)
    }

    elements.push(`    <changefreq>${url.changefreq || defaultChangefreq}</changefreq>`)
    elements.push(`    <priority>${url.priority ?? defaultPriority}</priority>`)

    // Add xhtml:link alternates for multilingual
    if (url.alternates && url.alternates.length > 0) {
      for (const alt of url.alternates) {
        elements.push(
          `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${escapeXml(alt.href)}" />`
        )
      }
    }

    // Add image:image elements
    if (url.images && url.images.length > 0) {
      for (const img of url.images) {
        elements.push('    <image:image>')
        elements.push(`      <image:loc>${escapeXml(img.loc)}</image:loc>`)
        if (img.caption) {
          elements.push(`      <image:caption>${escapeXml(img.caption)}</image:caption>`)
        }
        if (img.title) {
          elements.push(`      <image:title>${escapeXml(img.title)}</image:title>`)
        }
        elements.push('    </image:image>')
      }
    }

    return `  <url>\n${elements.join('\n')}\n  </url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlElements.join('\n')}
</urlset>`
}

/**
 * Escape special XML characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Generate sitemap index for multiple sitemaps
 */
export function generateSitemapIndex(
  sitemaps: Array<{ loc: string; lastmod?: string }>
): string {
  const sitemapElements = sitemaps.map(sitemap => {
    const elements = [`    <loc>${escapeXml(sitemap.loc)}</loc>`]
    if (sitemap.lastmod) {
      elements.push(`    <lastmod>${sitemap.lastmod}</lastmod>`)
    }
    return `  <sitemap>\n${elements.join('\n')}\n  </sitemap>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements.join('\n')}
</sitemapindex>`
}

/**
 * Create sitemap URL entry with locale alternates
 */
export function createMultilingualUrl(
  basePath: string,
  siteUrl: string,
  locales: string[],
  options?: {
    lastmod?: string
    changefreq?: SitemapUrl['changefreq']
    priority?: number
    images?: SitemapUrl['images']
  }
): SitemapUrl {
  const fullUrl = `${siteUrl}${basePath}`

  return {
    loc: fullUrl,
    lastmod: options?.lastmod,
    changefreq: options?.changefreq,
    priority: options?.priority,
    alternates: locales.map(locale => ({
      hreflang: locale,
      href: `${siteUrl}${basePath}?lang=${locale}`
    })),
    images: options?.images
  }
}

/**
 * Priority mapping for common page types
 */
export const PAGE_PRIORITIES: Record<string, number> = {
  home: 1.0,
  about: 0.8,
  services: 0.8,
  products: 0.8,
  blog: 0.7,
  'blog-post': 0.6,
  contact: 0.6,
  faq: 0.5,
  legal: 0.3
}

/**
 * Get priority based on page type or path
 */
export function getPriority(pageType: string): number {
  return PAGE_PRIORITIES[pageType] ?? 0.5
}
