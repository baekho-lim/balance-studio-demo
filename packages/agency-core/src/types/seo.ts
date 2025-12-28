/**
 * SEO/AEO/GEO types
 * Schema.org structured data and LLM optimization
 */

import type { MultilingualText, LocaleCode } from './locale'
import type { EntityType } from './entity'

// Schema.org type mapping per industry
export type SchemaType =
  // Person types
  | 'Person'
  // Business types
  | 'Restaurant'
  | 'HealthAndBeautyBusiness'
  | 'Store'
  | 'ProfessionalService'
  // Product types
  | 'Product'
  | 'VisualArtwork'
  | 'MenuItem'
  | 'Offer'
  // Service types
  | 'Course'
  | 'Service'
  // Event types
  | 'Event'
  | 'ExhibitionEvent'
  | 'BusinessEvent'
  // Content types
  | 'Article'
  | 'NewsArticle'
  | 'BlogPosting'
  // Organization types
  | 'Organization'
  | 'GovernmentOrganization'
  | 'EducationalOrganization'
  // Other
  | 'WebSite'
  | 'ArtGallery'
  | 'FAQPage'
  | 'BreadcrumbList'
  | 'ImageObject'
  | 'Place'
  | 'LocalBusiness'

// Entity to Schema.org mapping
export const entityToSchemaMap: Record<EntityType, SchemaType[]> = {
  Person: ['Person'],
  LocalBusiness: ['LocalBusiness', 'Restaurant', 'HealthAndBeautyBusiness', 'Store'],
  Product: ['Product', 'VisualArtwork', 'MenuItem'],
  Service: ['Service', 'Course'],
  Event: ['Event', 'ExhibitionEvent', 'BusinessEvent'],
  Article: ['Article', 'NewsArticle', 'BlogPosting'],
  Organization: ['Organization', 'GovernmentOrganization', 'EducationalOrganization'],
  Place: ['Place']
}

// SEO configuration per page/entity
export interface SEOConfig {
  title?: string | MultilingualText
  description?: string | MultilingualText
  keywords?: string[]
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile' | 'product'
  canonical?: string
  noindex?: boolean
  nofollow?: boolean
  alternates?: Record<LocaleCode, string>
}

// JSON-LD base structure
export interface JsonLdBase {
  '@context': 'https://schema.org'
  '@type': SchemaType | SchemaType[]
  '@id'?: string
  name?: string
  description?: string
  url?: string
  image?: string | string[] | ImageObject
  sameAs?: string[]
}

// Image object for structured data
export interface ImageObject {
  '@type': 'ImageObject'
  url: string
  width?: number
  height?: number
  caption?: string
}

// Person JSON-LD
export interface PersonJsonLd extends JsonLdBase {
  '@type': 'Person'
  givenName?: string
  familyName?: string
  birthDate?: string
  nationality?: string | { '@type': 'Country'; name: string }
  jobTitle?: string
  alumniOf?: Array<{
    '@type': 'EducationalOrganization'
    name: string
    url?: string
  }>
  affiliation?: Array<{
    '@type': 'Organization'
    name: string
    url?: string
  }>
  knowsAbout?: string[]
}

// Local Business JSON-LD
export interface LocalBusinessJsonLd extends JsonLdBase {
  '@type': 'LocalBusiness' | 'Restaurant' | 'HealthAndBeautyBusiness' | 'Store'
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
  telephone?: string
  email?: string
  openingHoursSpecification?: Array<{
    '@type': 'OpeningHoursSpecification'
    dayOfWeek: string | string[]
    opens: string
    closes: string
  }>
  priceRange?: string
  aggregateRating?: {
    '@type': 'AggregateRating'
    ratingValue: number
    reviewCount: number
    bestRating?: number
    worstRating?: number
  }
  hasMenu?: string  // For restaurants
}

// Product JSON-LD
export interface ProductJsonLd extends JsonLdBase {
  '@type': 'Product' | 'VisualArtwork'
  brand?: { '@type': 'Brand'; name: string }
  offers?: {
    '@type': 'Offer'
    price?: number
    priceCurrency?: string
    availability?: string
    url?: string
  }
  material?: string | string[]
  width?: { '@type': 'QuantitativeValue'; value: number; unitCode: string }
  height?: { '@type': 'QuantitativeValue'; value: number; unitCode: string }
  dateCreated?: string
  creator?: { '@type': 'Person'; name: string; url?: string }
}

// Event JSON-LD
export interface EventJsonLd extends JsonLdBase {
  '@type': 'Event' | 'ExhibitionEvent' | 'BusinessEvent'
  startDate: string
  endDate?: string
  location?: {
    '@type': 'Place'
    name: string
    address?: {
      '@type': 'PostalAddress'
      addressLocality?: string
      addressCountry?: string
    }
  }
  organizer?: {
    '@type': 'Organization' | 'Person'
    name: string
    url?: string
  }
  offers?: {
    '@type': 'Offer'
    price?: number | string
    priceCurrency?: string
    availability?: string
    url?: string
  }
  performer?: { '@type': 'Person'; name: string }
}

// Article JSON-LD
export interface ArticleJsonLd extends JsonLdBase {
  '@type': 'Article' | 'NewsArticle' | 'BlogPosting'
  headline: string
  datePublished: string
  dateModified?: string
  author?: {
    '@type': 'Person'
    name: string
    url?: string
  }
  publisher?: {
    '@type': 'Organization'
    name: string
    logo?: ImageObject
  }
  mainEntityOfPage?: string
  articleBody?: string
  wordCount?: number
}

// FAQ JSON-LD
export interface FAQJsonLd {
  '@context': 'https://schema.org'
  '@type': 'FAQPage'
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }>
}

// Breadcrumb JSON-LD
export interface BreadcrumbJsonLd {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }>
}

// LLM Context for AEO optimization
export interface LLMContext {
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
}

// Robots.txt configuration
export interface RobotsConfig {
  userAgents: Array<{
    agent: string
    allow?: string[]
    disallow?: string[]
    crawlDelay?: number
  }>
  sitemaps: string[]
}
