/**
 * Entity System - Core abstraction for all content types
 * Supports multiple industries: Artist, Restaurant, Pilates, E-commerce, Government
 */

import type { MultilingualText } from './locale'

// Entity type - determines Schema.org type mapping
export type EntityType =
  | 'Person'           // Artists, instructors, chefs, staff
  | 'LocalBusiness'    // Restaurants, shops, studios
  | 'Product'          // Products, artworks for sale
  | 'Service'          // Classes, treatments, services
  | 'Event'            // Exhibitions, events, classes
  | 'Article'          // Blog posts, news, press releases
  | 'Organization'     // Government, institutions, companies
  | 'Place'            // Venues, locations

// Entity status for workflow
export type EntityStatus = 'draft' | 'review' | 'scheduled' | 'published' | 'archived'

// Image set for consistent image handling
export interface ImageSet {
  thumbnail?: string
  full?: string
  hero?: string
  og?: string
  alt?: string
  width?: number
  height?: number
}

// Base entity that all content types extend
export interface BaseEntity {
  id: string
  type: EntityType
  slug: string
  name: MultilingualText
  description?: MultilingualText
  images?: ImageSet
  status: EntityStatus
  createdAt: string
  updatedAt: string
  publishedAt?: string
  order?: number
  featured?: boolean
  tags?: string[]
}

// Person entity (artist, instructor, chef, staff)
export interface PersonEntity extends BaseEntity {
  type: 'Person'
  birthYear?: number
  nationality?: string
  birthPlace?: string
  title?: MultilingualText        // Job title / role
  credentials?: string[]          // Certifications, degrees
  specialties?: string[]          // Areas of expertise
  contact?: {
    email?: string
    phone?: string
    website?: string
  }
  social?: {
    instagram?: string
    facebook?: string
    twitter?: string
    linkedin?: string
    youtube?: string
  }
  externalIds?: {
    wikidata?: string
    viaf?: string
    ulan?: string
    isni?: string
  }
  affiliations?: Array<{
    name: string
    nameKr?: string
    url?: string
    type: 'alumniOf' | 'representedBy' | 'memberOf' | 'worksFor'
  }>
}

// Local business entity (restaurant, studio, shop)
export interface LocalBusinessEntity extends BaseEntity {
  type: 'LocalBusiness'
  businessType: 'Restaurant' | 'HealthAndBeautyBusiness' | 'Store' | 'ProfessionalService' | 'LodgingBusiness'
  address: {
    street?: string
    city: string
    state?: string
    postalCode?: string
    country: string
    countryCode: string
  }
  geo?: {
    lat: number
    lng: number
  }
  openingHours?: Array<{
    dayOfWeek: string[]
    opens: string
    closes: string
  }>
  closedDays?: string[]
  phone?: string
  email?: string
  website?: string
  priceRange?: '$' | '$$' | '$$$' | '$$$$'
  platforms?: {
    googlePlaceId?: string
    naverPlaceId?: string
    kakaoPlaceId?: string
  }
  rating?: {
    value: number
    count: number
    source?: string
  }
}

// Product entity (artwork, merchandise, menu item)
export interface ProductEntity extends BaseEntity {
  type: 'Product'
  productType: 'Artwork' | 'PhysicalProduct' | 'DigitalProduct' | 'MenuItem'
  price?: {
    amount: number
    currency: string
    priceType?: 'fixed' | 'variable' | 'inquiry'
  }
  dimensions?: {
    width?: number
    height?: number
    depth?: number
    unit: 'cm' | 'in' | 'mm'
  }
  materials?: string[]
  category?: string
  sku?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder' | 'SoldOut'
  year?: number
}

// Service entity (class, treatment, consultation)
export interface ServiceEntity extends BaseEntity {
  type: 'Service'
  serviceType: 'Course' | 'Treatment' | 'Consultation' | 'Membership'
  duration?: number              // minutes
  price?: {
    amount: number
    currency: string
    per?: 'session' | 'month' | 'package'
  }
  capacity?: number              // max participants
  level?: 'beginner' | 'intermediate' | 'advanced' | 'all'
  instructor?: string            // Person entity ID
  schedule?: Array<{
    dayOfWeek: string
    startTime: string
    endTime: string
  }>
  requirements?: string[]
}

// Event entity (exhibition, class instance, workshop)
export interface EventEntity extends BaseEntity {
  type: 'Event'
  eventType: 'Exhibition' | 'Workshop' | 'Performance' | 'ClassSession' | 'Opening'
  startDate: string
  endDate?: string
  venue?: string
  venueAddress?: string
  city?: string
  country?: string
  countryCode?: string
  organizers?: Array<{
    name: string
    role: 'host' | 'co-host' | 'sponsor' | 'partner'
    url?: string
  }>
  admission?: 'free' | 'paid'
  admissionFee?: string
  registrationUrl?: string
  relatedEntities?: string[]     // Related Person, Product IDs
}

// Article entity (blog post, news, press release)
export interface ArticleEntity extends BaseEntity {
  type: 'Article'
  articleType: 'BlogPost' | 'NewsArticle' | 'PressRelease' | 'Interview' | 'Review'
  content: MultilingualText
  excerpt?: MultilingualText
  author?: string                // Person entity ID
  publishDate: string
  category?: string
  readTime?: number              // minutes
  source?: string                // External media source
  sourceUrl?: string
  relatedEntities?: string[]
}

// Organization entity (government, institution, company)
export interface OrganizationEntity extends BaseEntity {
  type: 'Organization'
  orgType: 'GovernmentOrganization' | 'EducationalOrganization' | 'Corporation' | 'NonProfit'
  address?: {
    street?: string
    city: string
    state?: string
    country: string
  }
  contact?: {
    phone?: string
    email?: string
    website?: string
  }
  services?: string[]
}

// Place entity (venue, location)
export interface PlaceEntity extends BaseEntity {
  type: 'Place'
  placeType: 'Venue' | 'TouristAttraction' | 'CivicStructure'
  address: {
    street?: string
    city: string
    state?: string
    country: string
    countryCode?: string
  }
  geo?: {
    lat: number
    lng: number
  }
  amenities?: string[]
}

// Union type of all entities
export type Entity =
  | PersonEntity
  | LocalBusinessEntity
  | ProductEntity
  | ServiceEntity
  | EventEntity
  | ArticleEntity
  | OrganizationEntity
  | PlaceEntity

// Type guard helpers
export function isPersonEntity(entity: Entity): entity is PersonEntity {
  return entity.type === 'Person'
}

export function isLocalBusinessEntity(entity: Entity): entity is LocalBusinessEntity {
  return entity.type === 'LocalBusiness'
}

export function isProductEntity(entity: Entity): entity is ProductEntity {
  return entity.type === 'Product'
}

export function isServiceEntity(entity: Entity): entity is ServiceEntity {
  return entity.type === 'Service'
}

export function isEventEntity(entity: Entity): entity is EventEntity {
  return entity.type === 'Event'
}

export function isArticleEntity(entity: Entity): entity is ArticleEntity {
  return entity.type === 'Article'
}
