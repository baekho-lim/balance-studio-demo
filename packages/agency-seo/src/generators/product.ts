/**
 * Product JSON-LD generator
 * For artworks, merchandise, menu items, etc.
 */

import type { ProductEntity } from '@agency/core'

export interface ProductJsonLdOptions {
  siteUrl: string
  locale?: string
  sellerName?: string
  sellerUrl?: string
}

export interface ProductJsonLdOutput {
  '@context': 'https://schema.org'
  '@type': string
  '@id': string
  name: string
  alternateName?: string
  description?: string
  image?: string | string[]
  url?: string
  brand?: {
    '@type': 'Brand'
    name: string
  }
  offers?: {
    '@type': 'Offer'
    price?: number | string
    priceCurrency?: string
    availability?: string
    url?: string
    seller?: {
      '@type': 'Organization'
      name: string
      url?: string
    }
    priceValidUntil?: string
  }
  sku?: string
  material?: string | string[]
  width?: {
    '@type': 'QuantitativeValue'
    value: number
    unitCode: string
  }
  height?: {
    '@type': 'QuantitativeValue'
    value: number
    unitCode: string
  }
  depth?: {
    '@type': 'QuantitativeValue'
    value: number
    unitCode: string
  }
  aggregateRating?: {
    '@type': 'AggregateRating'
    ratingValue: number
    reviewCount: number
    bestRating?: number
    worstRating?: number
  }
  // Artwork-specific
  dateCreated?: string
  creator?: {
    '@type': 'Person'
    '@id'?: string
    name: string
    url?: string
  }
  artMedium?: string
  artform?: string
  artworkSurface?: string
  // E-commerce specific
  category?: string
  color?: string
  size?: string
}

/**
 * Map availability to Schema.org status
 */
function getAvailability(availability?: ProductEntity['availability']): string {
  switch (availability) {
    case 'InStock':
      return 'https://schema.org/InStock'
    case 'OutOfStock':
      return 'https://schema.org/OutOfStock'
    case 'PreOrder':
      return 'https://schema.org/PreOrder'
    case 'SoldOut':
      return 'https://schema.org/SoldOut'
    default:
      return 'https://schema.org/InStock'
  }
}

/**
 * Map unit to Schema.org unit code
 */
function getUnitCode(unit: 'cm' | 'in' | 'mm'): string {
  switch (unit) {
    case 'cm':
      return 'CMT'
    case 'in':
      return 'INH'
    case 'mm':
      return 'MMT'
    default:
      return 'CMT'
  }
}

/**
 * Generate Product JSON-LD schema
 */
export function generateProductJsonLd(
  product: ProductEntity,
  options: ProductJsonLdOptions
): ProductJsonLdOutput {
  const { siteUrl, sellerName, sellerUrl } = options

  const result: ProductJsonLdOutput = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${siteUrl}/products/${product.slug}`,
    name: product.name.en,
    alternateName: product.name.ko !== product.name.en ? product.name.ko : undefined,
    description: product.description?.en,
    url: `${siteUrl}/products/${product.slug}`,
    sku: product.sku
  }

  // Add image
  if (product.images?.full) {
    result.image = `${siteUrl}${product.images.full}`
  }

  // Add price/offer
  if (product.price) {
    result.offers = {
      '@type': 'Offer',
      price: product.price.priceType === 'inquiry' ? 'Contact for pricing' : product.price.amount,
      priceCurrency: product.price.currency,
      availability: getAvailability(product.availability),
      url: `${siteUrl}/products/${product.slug}`
    }

    if (sellerName) {
      result.offers.seller = {
        '@type': 'Organization',
        name: sellerName,
        url: sellerUrl || siteUrl
      }
    }
  }

  // Add dimensions
  if (product.dimensions) {
    const unitCode = getUnitCode(product.dimensions.unit)

    if (product.dimensions.width) {
      result.width = {
        '@type': 'QuantitativeValue',
        value: product.dimensions.width,
        unitCode
      }
    }

    if (product.dimensions.height) {
      result.height = {
        '@type': 'QuantitativeValue',
        value: product.dimensions.height,
        unitCode
      }
    }

    if (product.dimensions.depth) {
      result.depth = {
        '@type': 'QuantitativeValue',
        value: product.dimensions.depth,
        unitCode
      }
    }
  }

  // Add materials
  if (product.materials && product.materials.length > 0) {
    result.material = product.materials.length === 1 ? product.materials[0] : product.materials
  }

  // Add category
  if (product.category) {
    result.category = product.category
  }

  return result
}

/**
 * Generate Visual Artwork JSON-LD
 */
export function generateArtworkJsonLd(
  product: ProductEntity,
  options: ProductJsonLdOptions & {
    artistId?: string
    artistName?: string
    artistUrl?: string
    artMedium?: string
    artform?: string
    artworkSurface?: string
  }
): ProductJsonLdOutput {
  const {
    siteUrl,
    artistId,
    artistName,
    artistUrl,
    artMedium,
    artform = 'Painting',
    artworkSurface
  } = options

  const baseJsonLd = generateProductJsonLd(product, options)

  const result: ProductJsonLdOutput = {
    ...baseJsonLd,
    '@type': 'VisualArtwork',
    artMedium: artMedium || product.materials?.join(', '),
    artform,
    artworkSurface
  }

  // Add year created
  if (product.year) {
    result.dateCreated = String(product.year)
  }

  // Add artist/creator
  if (artistName) {
    result.creator = {
      '@type': 'Person',
      name: artistName,
      url: artistUrl || siteUrl
    }
    if (artistId) {
      result.creator['@id'] = `${siteUrl}/#person-${artistId}`
    }
  }

  return result
}

/**
 * Generate Menu Item JSON-LD (for restaurants)
 */
export function generateMenuItemJsonLd(
  product: ProductEntity,
  options: ProductJsonLdOptions & {
    menuUrl?: string
    nutrition?: {
      calories?: number
      servingSize?: string
    }
  }
): ProductJsonLdOutput {
  const baseJsonLd = generateProductJsonLd(product, options)

  return {
    ...baseJsonLd,
    '@type': 'MenuItem'
  }
}
