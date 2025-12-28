/**
 * Person JSON-LD generator
 * For artists, instructors, chefs, staff
 */

import type { PersonEntity } from '@agency/core'

export interface PersonJsonLdOptions {
  siteUrl: string
  locale?: string
  includeAlternateNames?: boolean
}

export interface PersonJsonLdOutput {
  '@context': 'https://schema.org'
  '@type': 'Person'
  '@id': string
  name: string
  alternateName?: string[]
  givenName?: string
  familyName?: string
  birthDate?: string
  birthPlace?: {
    '@type': 'Place'
    name: string
  }
  nationality?: {
    '@type': 'Country'
    name: string
  }
  url?: string
  image?: {
    '@type': 'ImageObject'
    url: string
    caption?: string
  }
  sameAs?: string[]
  jobTitle?: string
  description?: string
  alumniOf?: Array<{
    '@type': 'CollegeOrUniversity' | 'EducationalOrganization'
    name: string
    sameAs?: string
  }>
  affiliation?: Array<{
    '@type': 'Organization'
    name: string
    url?: string
  }>
  knowsAbout?: string[]
  hasOccupation?: {
    '@type': 'Occupation'
    name: string
    occupationalCategory?: string
  }
}

/**
 * Generate Person JSON-LD schema
 */
export function generatePersonJsonLd(
  person: PersonEntity,
  options: PersonJsonLdOptions
): PersonJsonLdOutput {
  const { siteUrl, includeAlternateNames = true } = options

  // Build sameAs array from social links and external IDs
  const sameAs: string[] = []

  if (person.social) {
    if (person.social.instagram) sameAs.push(person.social.instagram)
    if (person.social.facebook) sameAs.push(person.social.facebook)
    if (person.social.twitter) sameAs.push(person.social.twitter)
    if (person.social.linkedin) sameAs.push(person.social.linkedin)
    if (person.social.youtube) sameAs.push(person.social.youtube)
  }

  if (person.externalIds) {
    if (person.externalIds.wikidata) {
      sameAs.push(`https://www.wikidata.org/wiki/${person.externalIds.wikidata}`)
    }
    if (person.externalIds.viaf) {
      sameAs.push(`https://viaf.org/viaf/${person.externalIds.viaf}`)
    }
    if (person.externalIds.ulan) {
      sameAs.push(`https://vocab.getty.edu/ulan/${person.externalIds.ulan}`)
    }
    if (person.externalIds.isni) {
      sameAs.push(`https://isni.org/isni/${person.externalIds.isni}`)
    }
  }

  // Add affiliation URLs
  if (person.affiliations) {
    person.affiliations.forEach(aff => {
      if (aff.url) sameAs.push(aff.url)
    })
  }

  // Build alternate names
  const alternateNames: string[] = []
  if (includeAlternateNames) {
    if (person.name.ko !== person.name.en) {
      alternateNames.push(person.name.ko)
    }
    // Add other language versions
    const otherNames = [
      person.name.vi,
      person.name.ja,
      person.name['zh-CN']
    ].filter(Boolean) as string[]
    alternateNames.push(...otherNames)
  }

  // Build alumni array from affiliations
  const alumniOf = person.affiliations
    ?.filter(aff => aff.type === 'alumniOf')
    .map(aff => ({
      '@type': 'CollegeOrUniversity' as const,
      name: aff.name,
      sameAs: aff.url
    }))

  // Build affiliation array (non-alumni)
  const affiliation = person.affiliations
    ?.filter(aff => aff.type !== 'alumniOf')
    .map(aff => ({
      '@type': 'Organization' as const,
      name: aff.name,
      url: aff.url
    }))

  const result: PersonJsonLdOutput = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person-${person.id}`,
    name: person.name.en,
    url: person.contact?.website || siteUrl,
    description: person.description?.en
  }

  if (alternateNames.length > 0) {
    result.alternateName = alternateNames
  }

  if (person.birthYear) {
    result.birthDate = String(person.birthYear)
  }

  if (person.birthPlace) {
    result.birthPlace = {
      '@type': 'Place',
      name: person.birthPlace
    }
  }

  if (person.nationality) {
    result.nationality = {
      '@type': 'Country',
      name: person.nationality
    }
  }

  if (person.images?.full) {
    result.image = {
      '@type': 'ImageObject',
      url: `${siteUrl}${person.images.full}`,
      caption: `Portrait of ${person.name.en}`
    }
  }

  if (sameAs.length > 0) {
    result.sameAs = sameAs
  }

  if (person.title?.en) {
    result.jobTitle = person.title.en
    result.hasOccupation = {
      '@type': 'Occupation',
      name: person.title.en
    }
  }

  if (alumniOf && alumniOf.length > 0) {
    result.alumniOf = alumniOf
  }

  if (affiliation && affiliation.length > 0) {
    result.affiliation = affiliation
  }

  if (person.specialties && person.specialties.length > 0) {
    result.knowsAbout = person.specialties
  }

  return result
}

/**
 * Generate Person JSON-LD for an artist specifically
 */
export function generateArtistJsonLd(
  person: PersonEntity,
  options: PersonJsonLdOptions & {
    artworks?: Array<{ name: string; year?: number }>
    exhibitions?: Array<{ name: string; venue: string }>
  }
): PersonJsonLdOutput {
  const baseJsonLd = generatePersonJsonLd(person, options)

  // Add artist-specific fields
  return {
    ...baseJsonLd,
    jobTitle: 'Visual Artist',
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Visual Artist',
      occupationalCategory: '27-1013' // Fine Artists, Including Painters
    },
    knowsAbout: [
      ...(baseJsonLd.knowsAbout || []),
      'Contemporary Art',
      'Visual Arts'
    ]
  }
}

/**
 * Generate Person JSON-LD for a fitness instructor
 */
export function generateInstructorJsonLd(
  person: PersonEntity,
  options: PersonJsonLdOptions & {
    certifications?: string[]
    classTypes?: string[]
  }
): PersonJsonLdOutput {
  const { certifications = [], classTypes = [] } = options
  const baseJsonLd = generatePersonJsonLd(person, options)

  return {
    ...baseJsonLd,
    jobTitle: person.title?.en || 'Fitness Instructor',
    hasOccupation: {
      '@type': 'Occupation',
      name: person.title?.en || 'Fitness Instructor',
      occupationalCategory: '39-9031' // Fitness Trainers and Aerobics Instructors
    },
    knowsAbout: [
      ...(baseJsonLd.knowsAbout || []),
      ...classTypes,
      ...certifications,
      'Fitness Training',
      'Health & Wellness'
    ]
  }
}
