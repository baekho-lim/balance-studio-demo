/**
 * Website and Breadcrumb JSON-LD generators
 */

export interface WebsiteJsonLdOptions {
  siteUrl: string
  siteName: string
  alternateName?: string
  description?: string
  languages?: string[]
  publisherId?: string
  publisherName?: string
}

export interface WebsiteJsonLdOutput {
  '@context': 'https://schema.org'
  '@type': 'WebSite'
  '@id': string
  name: string
  alternateName?: string
  url: string
  description?: string
  inLanguage?: string[]
  publisher?: {
    '@type': 'Person' | 'Organization'
    '@id'?: string
    name?: string
  }
  potentialAction?: {
    '@type': 'SearchAction'
    target: {
      '@type': 'EntryPoint'
      urlTemplate: string
    }
    'query-input': string
  }
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface BreadcrumbJsonLdOutput {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }>
}

/**
 * Generate WebSite JSON-LD schema
 */
export function generateWebsiteJsonLd(
  options: WebsiteJsonLdOptions
): WebsiteJsonLdOutput {
  const {
    siteUrl,
    siteName,
    alternateName,
    description,
    languages,
    publisherId,
    publisherName
  } = options

  const result: WebsiteJsonLdOutput = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: siteName,
    alternateName,
    url: siteUrl,
    description,
    inLanguage: languages
  }

  // Add publisher
  if (publisherId || publisherName) {
    result.publisher = {
      '@type': 'Person'
    }
    if (publisherId) {
      result.publisher['@id'] = `${siteUrl}/#${publisherId}`
    }
    if (publisherName) {
      result.publisher.name = publisherName
    }
  }

  return result
}

/**
 * Generate WebSite JSON-LD with search action
 */
export function generateWebsiteWithSearchJsonLd(
  options: WebsiteJsonLdOptions & {
    searchPath?: string
    searchParam?: string
  }
): WebsiteJsonLdOutput {
  const { searchPath = '/search', searchParam = 'q' } = options
  const baseJsonLd = generateWebsiteJsonLd(options)

  return {
    ...baseJsonLd,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${options.siteUrl}${searchPath}?${searchParam}={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }
}

/**
 * Generate Breadcrumb JSON-LD schema
 */
export function generateBreadcrumbJsonLd(
  items: BreadcrumbItem[],
  siteUrl: string
): BreadcrumbJsonLdOutput {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`
    }))
  }
}

/**
 * Generate common breadcrumb patterns
 */
export function generateHomeBreadcrumb(
  siteUrl: string,
  siteName: string
): BreadcrumbJsonLdOutput {
  return generateBreadcrumbJsonLd([
    { name: siteName, url: '/' }
  ], siteUrl)
}

export function generatePageBreadcrumb(
  siteUrl: string,
  siteName: string,
  pageName: string,
  pageUrl: string
): BreadcrumbJsonLdOutput {
  return generateBreadcrumbJsonLd([
    { name: siteName, url: '/' },
    { name: pageName, url: pageUrl }
  ], siteUrl)
}

export function generateDetailBreadcrumb(
  siteUrl: string,
  siteName: string,
  sectionName: string,
  sectionUrl: string,
  itemName: string,
  itemUrl: string
): BreadcrumbJsonLdOutput {
  return generateBreadcrumbJsonLd([
    { name: siteName, url: '/' },
    { name: sectionName, url: sectionUrl },
    { name: itemName, url: itemUrl }
  ], siteUrl)
}

/**
 * Generate Art Gallery JSON-LD
 */
export function generateArtGalleryJsonLd(options: {
  siteUrl: string
  galleryName: string
  description?: string
  founderId?: string
  languages?: string[]
  image?: string
}): {
  '@context': 'https://schema.org'
  '@type': 'ArtGallery'
  '@id': string
  name: string
  url: string
  description?: string
  image?: string
  founder?: { '@type': 'Person'; '@id': string }
  inLanguage?: string[]
} {
  const { siteUrl, galleryName, description, founderId, languages, image } = options

  const result: {
    '@context': 'https://schema.org'
    '@type': 'ArtGallery'
    '@id': string
    name: string
    url: string
    description?: string
    image?: string
    founder?: { '@type': 'Person'; '@id': string }
    inLanguage?: string[]
  } = {
    '@context': 'https://schema.org',
    '@type': 'ArtGallery',
    '@id': `${siteUrl}/#gallery`,
    name: galleryName,
    url: siteUrl,
    description,
    image: image ? `${siteUrl}${image}` : undefined,
    inLanguage: languages
  }

  if (founderId) {
    result.founder = {
      '@type': 'Person',
      '@id': `${siteUrl}/#${founderId}`
    }
  }

  return result
}
