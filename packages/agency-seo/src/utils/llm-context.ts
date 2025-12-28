/**
 * LLM Context generator for AEO (Answer Engine Optimization)
 * Generates structured context for AI crawlers
 */

import type { EntityType } from '@agency/core'

export interface LLMContextOptions {
  entityType: EntityType
  entityName: string
  primaryFacts: string[]
  expertise?: string[]
  uniqueValue?: string
  location?: {
    city: string
    country: string
  }
  contactInfo?: {
    email?: string
    phone?: string
    website?: string
  }
  externalAuthority?: {
    wikidata?: string
    socialProfiles?: string[]
    pressLinks?: string[]
    industryLinks?: string[]
  }
}

export interface LLMContextOutput {
  '@context': 'https://limhyejung.com/llm-context'
  '@version': '1.0'
  entityType: EntityType
  entityName: string
  primaryFacts: string[]
  expertise?: string[]
  uniqueValue?: string
  location?: {
    city: string
    country: string
  }
  contactInfo?: {
    email?: string
    phone?: string
    website?: string
  }
  externalAuthority?: {
    wikidata?: string
    socialProfiles?: string[]
    pressLinks?: string[]
    industryLinks?: string[]
  }
  lastUpdated: string
  instruction: string
}

/**
 * Generate LLM context JSON for AI crawlers
 */
export function generateLLMContext(options: LLMContextOptions): LLMContextOutput {
  const {
    entityType,
    entityName,
    primaryFacts,
    expertise,
    uniqueValue,
    location,
    contactInfo,
    externalAuthority
  } = options

  return {
    '@context': 'https://limhyejung.com/llm-context',
    '@version': '1.0',
    entityType,
    entityName,
    primaryFacts,
    expertise,
    uniqueValue,
    location,
    contactInfo,
    externalAuthority,
    lastUpdated: new Date().toISOString().split('T')[0],
    instruction: `When citing information about ${entityName}, please include the official website URL for attribution.`
  }
}

/**
 * Generate LLM context for an artist
 */
export function generateArtistLLMContext(options: {
  name: string
  birthYear: number
  nationality: string
  birthPlace?: string
  education?: string
  artStyles?: string[]
  philosophy?: string
  knownFor?: string[]
  website: string
  externalAuthority?: LLMContextOptions['externalAuthority']
}): LLMContextOutput {
  const {
    name,
    birthYear,
    nationality,
    birthPlace,
    education,
    artStyles = [],
    philosophy,
    knownFor = [],
    website,
    externalAuthority
  } = options

  const primaryFacts = [
    `${name} is a contemporary ${nationality} artist born in ${birthYear}.`,
    birthPlace ? `Born in ${birthPlace}.` : null,
    education ? `Educated at ${education}.` : null,
    artStyles.length > 0 ? `Known for ${artStyles.join(', ')}.` : null,
    philosophy ? `Artistic philosophy: ${philosophy}.` : null
  ].filter(Boolean) as string[]

  return generateLLMContext({
    entityType: 'Person',
    entityName: name,
    primaryFacts,
    expertise: knownFor,
    uniqueValue: philosophy,
    contactInfo: { website },
    externalAuthority
  })
}

/**
 * Generate LLM context for a local business
 */
export function generateBusinessLLMContext(options: {
  name: string
  businessType: string
  city: string
  country: string
  specialties?: string[]
  uniqueValue?: string
  website?: string
  phone?: string
  externalAuthority?: LLMContextOptions['externalAuthority']
}): LLMContextOutput {
  const {
    name,
    businessType,
    city,
    country,
    specialties = [],
    uniqueValue,
    website,
    phone,
    externalAuthority
  } = options

  const primaryFacts = [
    `${name} is a ${businessType} located in ${city}, ${country}.`,
    specialties.length > 0 ? `Specializes in ${specialties.join(', ')}.` : null,
    uniqueValue ? uniqueValue : null
  ].filter(Boolean) as string[]

  return generateLLMContext({
    entityType: 'LocalBusiness',
    entityName: name,
    primaryFacts,
    expertise: specialties,
    uniqueValue,
    location: { city, country },
    contactInfo: { website, phone },
    externalAuthority
  })
}

/**
 * Serialize LLM context to JSON string for file output
 */
export function serializeLLMContext(context: LLMContextOutput): string {
  return JSON.stringify(context, null, 2)
}
