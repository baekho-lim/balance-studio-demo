/**
 * Zod schemas for entity validation
 * Note: Type exports are in /types - use schemas for runtime validation
 */

import { z } from 'zod'

// Locale codes
export const localeCodeSchema = z.enum([
  'en', 'ko', 'vi', 'ja', 'zh-CN', 'ms', 'id', 'de', 'fr', 'es', 'ar'
])

// Multilingual text
export const multilingualTextSchema = z.object({
  en: z.string(),
  ko: z.string(),
  vi: z.string().optional(),
  ja: z.string().optional(),
  'zh-CN': z.string().optional(),
  ms: z.string().optional(),
  id: z.string().optional(),
  de: z.string().optional(),
  fr: z.string().optional(),
  es: z.string().optional(),
  ar: z.string().optional(),
})

// Entity types
export const entityTypeSchema = z.enum([
  'Person',
  'LocalBusiness',
  'Product',
  'Service',
  'Event',
  'Article',
  'Organization',
  'Place'
])

// Entity status
export const entityStatusSchema = z.enum([
  'draft', 'review', 'scheduled', 'published', 'archived'
])

// Image set
export const imageSetSchema = z.object({
  thumbnail: z.string().optional(),
  full: z.string().optional(),
  hero: z.string().optional(),
  og: z.string().optional(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
})

// Base entity schema
export const baseEntitySchema = z.object({
  id: z.string(),
  type: entityTypeSchema,
  slug: z.string(),
  name: multilingualTextSchema,
  description: multilingualTextSchema.optional(),
  images: imageSetSchema.optional(),
  status: entityStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().optional(),
  order: z.number().optional(),
  featured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
})

// Person entity schema
export const personEntitySchema = baseEntitySchema.extend({
  type: z.literal('Person'),
  birthYear: z.number().optional(),
  nationality: z.string().optional(),
  birthPlace: z.string().optional(),
  title: multilingualTextSchema.optional(),
  credentials: z.array(z.string()).optional(),
  specialties: z.array(z.string()).optional(),
  contact: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    website: z.string().url().optional(),
  }).optional(),
  social: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
  }).optional(),
  externalIds: z.object({
    wikidata: z.string().optional(),
    viaf: z.string().optional(),
    ulan: z.string().optional(),
    isni: z.string().optional(),
  }).optional(),
})

// Local business schema
export const localBusinessEntitySchema = baseEntitySchema.extend({
  type: z.literal('LocalBusiness'),
  businessType: z.enum([
    'Restaurant', 'HealthAndBeautyBusiness', 'Store', 'ProfessionalService', 'LodgingBusiness'
  ]),
  address: z.object({
    street: z.string().optional(),
    city: z.string(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string(),
    countryCode: z.string(),
  }),
  geo: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
  openingHours: z.array(z.object({
    dayOfWeek: z.array(z.string()),
    opens: z.string(),
    closes: z.string(),
  })).optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  priceRange: z.enum(['$', '$$', '$$$', '$$$$']).optional(),
})

// Event entity schema
export const eventEntitySchema = baseEntitySchema.extend({
  type: z.literal('Event'),
  eventType: z.enum(['Exhibition', 'Workshop', 'Performance', 'ClassSession', 'Opening']),
  startDate: z.string(),
  endDate: z.string().optional(),
  venue: z.string().optional(),
  venueAddress: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  countryCode: z.string().optional(),
  admission: z.enum(['free', 'paid']).optional(),
  admissionFee: z.string().optional(),
})

// Article entity schema
export const articleEntitySchema = baseEntitySchema.extend({
  type: z.literal('Article'),
  articleType: z.enum(['BlogPost', 'NewsArticle', 'PressRelease', 'Interview', 'Review']),
  content: multilingualTextSchema,
  excerpt: multilingualTextSchema.optional(),
  author: z.string().optional(),
  publishDate: z.string(),
  category: z.string().optional(),
  readTime: z.number().optional(),
})
