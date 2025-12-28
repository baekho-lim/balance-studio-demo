/**
 * Local Business JSON-LD generator
 * For restaurants, pilates studios, stores, etc.
 */

import type { LocalBusinessEntity } from '@agency/core'

export interface LocalBusinessJsonLdOptions {
  siteUrl: string
  locale?: string
}

export interface LocalBusinessJsonLdOutput {
  '@context': 'https://schema.org'
  '@type': string
  '@id': string
  name: string
  description?: string
  url?: string
  telephone?: string
  email?: string
  address: {
    '@type': 'PostalAddress'
    streetAddress?: string
    addressLocality: string
    addressRegion?: string
    postalCode?: string
    addressCountry: string
  }
  geo?: {
    '@type': 'GeoCoordinates'
    latitude: number
    longitude: number
  }
  openingHoursSpecification?: Array<{
    '@type': 'OpeningHoursSpecification'
    dayOfWeek: string | string[]
    opens: string
    closes: string
  }>
  priceRange?: string
  image?: string
  sameAs?: string[]
  aggregateRating?: {
    '@type': 'AggregateRating'
    ratingValue: number
    reviewCount: number
    bestRating?: number
    worstRating?: number
  }
  hasMenu?: string
  servesCuisine?: string[]
  acceptsReservations?: boolean
}

/**
 * Generate Local Business JSON-LD schema
 */
export function generateLocalBusinessJsonLd(
  business: LocalBusinessEntity,
  options: LocalBusinessJsonLdOptions
): LocalBusinessJsonLdOutput {
  const { siteUrl } = options

  const result: LocalBusinessJsonLdOutput = {
    '@context': 'https://schema.org',
    '@type': business.businessType,
    '@id': `${siteUrl}/#business-${business.id}`,
    name: business.name.en,
    description: business.description?.en,
    url: business.website || siteUrl,
    telephone: business.phone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country
    },
    priceRange: business.priceRange
  }

  if (business.geo) {
    result.geo = {
      '@type': 'GeoCoordinates',
      latitude: business.geo.lat,
      longitude: business.geo.lng
    }
  }

  if (business.openingHours && business.openingHours.length > 0) {
    result.openingHoursSpecification = business.openingHours.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes
    }))
  }

  if (business.images?.full) {
    result.image = `${siteUrl}${business.images.full}`
  }

  if (business.rating) {
    result.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: business.rating.value,
      reviewCount: business.rating.count,
      bestRating: 5,
      worstRating: 1
    }
  }

  return result
}

/**
 * Generate Restaurant JSON-LD
 */
export function generateRestaurantJsonLd(
  business: LocalBusinessEntity,
  options: LocalBusinessJsonLdOptions & {
    cuisineTypes?: string[]
    menuUrl?: string
    acceptsReservations?: boolean
  }
): LocalBusinessJsonLdOutput {
  const { cuisineTypes, menuUrl, acceptsReservations } = options
  const baseJsonLd = generateLocalBusinessJsonLd(business, options)

  return {
    ...baseJsonLd,
    '@type': 'Restaurant',
    servesCuisine: cuisineTypes,
    hasMenu: menuUrl,
    acceptsReservations
  }
}

/**
 * Generate Health & Beauty Business JSON-LD (Pilates, Gym, Spa)
 */
export function generateHealthBusinessJsonLd(
  business: LocalBusinessEntity,
  options: LocalBusinessJsonLdOptions & {
    services?: string[]
    specialties?: string[]
  }
): LocalBusinessJsonLdOutput {
  const baseJsonLd = generateLocalBusinessJsonLd(business, options)

  return {
    ...baseJsonLd,
    '@type': 'HealthAndBeautyBusiness'
  }
}

/**
 * Generate Store JSON-LD
 */
export function generateStoreJsonLd(
  business: LocalBusinessEntity,
  options: LocalBusinessJsonLdOptions & {
    paymentAccepted?: string[]
    currenciesAccepted?: string[]
  }
): LocalBusinessJsonLdOutput {
  const baseJsonLd = generateLocalBusinessJsonLd(business, options)

  return {
    ...baseJsonLd,
    '@type': 'Store'
  }
}
