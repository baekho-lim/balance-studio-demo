/**
 * Event JSON-LD generator
 * For exhibitions, workshops, classes, etc.
 */

import type { EventEntity } from '@agency/core'

export interface EventJsonLdOptions {
  siteUrl: string
  locale?: string
}

export interface EventJsonLdOutput {
  '@context': 'https://schema.org'
  '@type': string
  '@id': string
  name: string
  alternateName?: string
  description?: string
  startDate: string
  endDate?: string
  eventStatus?: string
  eventAttendanceMode?: string
  location?: {
    '@type': 'Place'
    name: string
    address?: {
      '@type': 'PostalAddress'
      streetAddress?: string
      addressLocality?: string
      addressCountry?: string
    }
  }
  performer?: {
    '@type': 'Person' | 'Organization'
    '@id'?: string
    name: string
  }
  organizer?: {
    '@type': 'Organization' | 'Person'
    name: string
    url?: string
    sameAs?: string[]
  }
  image?: string
  url?: string
  sameAs?: string[]
  isAccessibleForFree?: boolean
  offers?: {
    '@type': 'Offer'
    price?: number | string
    priceCurrency?: string
    availability?: string
    url?: string
  }
  inLanguage?: string[]
}

/**
 * Map event status to Schema.org status
 */
function getEventStatus(status: EventEntity['status']): string {
  switch (status) {
    case 'published':
      return 'https://schema.org/EventScheduled'
    case 'archived':
      return 'https://schema.org/EventPostponed'
    default:
      return 'https://schema.org/EventScheduled'
  }
}

/**
 * Generate Event JSON-LD schema
 */
export function generateEventJsonLd(
  event: EventEntity,
  options: EventJsonLdOptions
): EventJsonLdOutput {
  const { siteUrl } = options

  const result: EventJsonLdOutput = {
    '@context': 'https://schema.org',
    '@type': event.eventType === 'Exhibition' ? 'ExhibitionEvent' : 'Event',
    '@id': `${siteUrl}/events/${event.slug}`,
    name: event.name.en,
    alternateName: event.name.ko !== event.name.en ? event.name.ko : undefined,
    description: event.description?.en,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: getEventStatus(event.status),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: `${siteUrl}/events/${event.slug}`,
    inLanguage: ['en', 'ko']
  }

  // Add location
  if (event.venue) {
    result.location = {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.venueAddress,
        addressLocality: event.city,
        addressCountry: event.country
      }
    }
  }

  // Add organizer from organizers array
  if (event.organizers && event.organizers.length > 0) {
    const mainOrganizer = event.organizers.find(org => org.role === 'host') || event.organizers[0]
    result.organizer = {
      '@type': 'Organization',
      name: mainOrganizer.name,
      url: mainOrganizer.url
    }
  }

  // Add image
  if (event.images?.hero) {
    result.image = `${siteUrl}${event.images.hero}`
  }

  // Add admission info
  if (event.admission) {
    result.isAccessibleForFree = event.admission === 'free'
    if (event.admission === 'paid' && event.admissionFee) {
      result.offers = {
        '@type': 'Offer',
        price: event.admissionFee,
        availability: 'https://schema.org/InStock'
      }
    }
  }

  return result
}

/**
 * Generate Exhibition Event JSON-LD
 */
export function generateExhibitionJsonLd(
  event: EventEntity,
  options: EventJsonLdOptions & {
    artistId?: string
    artistName?: string
    galleryUrl?: string
    officialUrl?: string
  }
): EventJsonLdOutput {
  const { siteUrl, artistId, artistName, galleryUrl, officialUrl } = options
  const baseJsonLd = generateEventJsonLd(event, options)

  const result: EventJsonLdOutput = {
    ...baseJsonLd,
    '@type': 'ExhibitionEvent'
  }

  // Add performer (artist)
  if (artistId && artistName) {
    result.performer = {
      '@type': 'Person',
      '@id': `${siteUrl}/#person-${artistId}`,
      name: artistName
    }
  }

  // Add sameAs for official links
  const sameAs: string[] = []
  if (officialUrl) sameAs.push(officialUrl)
  if (galleryUrl) sameAs.push(galleryUrl)
  if (sameAs.length > 0) {
    result.sameAs = sameAs
  }

  return result
}

/**
 * Generate Class/Workshop Event JSON-LD (for fitness studios)
 */
export function generateClassEventJsonLd(
  event: EventEntity,
  options: EventJsonLdOptions & {
    instructorId?: string
    instructorName?: string
    classType?: string
    level?: string
    duration?: number
    capacity?: number
    registrationUrl?: string
  }
): EventJsonLdOutput {
  const {
    siteUrl,
    instructorId,
    instructorName,
    registrationUrl
  } = options

  const baseJsonLd = generateEventJsonLd(event, options)

  const result: EventJsonLdOutput = {
    ...baseJsonLd,
    '@type': event.eventType === 'Workshop' ? 'EducationEvent' : 'Event'
  }

  // Add instructor as performer
  if (instructorId && instructorName) {
    result.performer = {
      '@type': 'Person',
      '@id': `${siteUrl}/#person-${instructorId}`,
      name: instructorName
    }
  }

  // Add registration URL to offers
  if (registrationUrl) {
    result.offers = {
      '@type': 'Offer',
      url: registrationUrl,
      availability: 'https://schema.org/InStock'
    }
  }

  return result
}
