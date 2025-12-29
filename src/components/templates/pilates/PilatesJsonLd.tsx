'use client'

import { JsonLdScript } from '@agency/seo'
import type { LocalBusinessEntity } from '@agency/core'
import { generateHealthBusinessJsonLd } from '@agency/seo'
import studioConfig from '@/data/demo/pilates-config.json'

/**
 * Convert pilates config to LocalBusinessEntity format
 * This adapter bridges the simple JSON config with @agency/core types
 */
function configToLocalBusinessEntity(): LocalBusinessEntity {
  return {
    id: 'balance-studio',
    type: 'LocalBusiness',
    slug: 'balance-studio',
    name: studioConfig.name,
    description: studioConfig.description,
    businessType: 'HealthAndBeautyBusiness',
    address: {
      street: studioConfig.address.streetAddress,
      city: studioConfig.address.addressLocality,
      state: studioConfig.address.addressRegion,
      postalCode: studioConfig.address.postalCode,
      country: 'South Korea',
      countryCode: studioConfig.address.addressCountry,
    },
    geo: {
      lat: studioConfig.geo.latitude,
      lng: studioConfig.geo.longitude,
    },
    openingHours: studioConfig.openingHours,
    phone: studioConfig.telephone,
    email: studioConfig.email,
    website: studioConfig.url,
    priceRange: '$$',
    status: 'published',
    createdAt: '2024-01-01',
    updatedAt: new Date().toISOString().split('T')[0],
  }
}

/**
 * Studio-level JSON-LD for HealthAndBeautyBusiness
 * Used in layout for site-wide schema
 */
export function PilatesStudioJsonLd() {
  const business = configToLocalBusinessEntity()
  const siteUrl = studioConfig.url || 'https://balancestudio.kr'

  const jsonLd = generateHealthBusinessJsonLd(business, { siteUrl })

  return <JsonLdScript data={jsonLd as unknown as Record<string, unknown>} id="pilates-studio-jsonld" />
}

/**
 * Breadcrumb JSON-LD for navigation
 */
interface BreadcrumbItem {
  name: string
  url: string
}

export function PilatesBreadcrumbJsonLd({
  items,
  siteUrl = 'https://balancestudio.kr'
}: {
  items: BreadcrumbItem[]
  siteUrl?: string
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  }

  return <JsonLdScript data={jsonLd} id="pilates-breadcrumb-jsonld" />
}

/**
 * FAQ JSON-LD for rich snippets
 */
interface FAQItem {
  question: string
  answer: string
}

export function PilatesFAQJsonLd({ faqs }: { faqs: FAQItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return <JsonLdScript data={jsonLd} id="pilates-faq-jsonld" />
}

/**
 * Course/Class JSON-LD for fitness classes
 */
interface CourseJsonLdProps {
  id: string
  name: string
  description: string
  level: string
  duration: number // minutes
  instructor?: string
}

export function PilatesCourseJsonLd({
  id,
  name,
  description,
  level,
  duration,
  instructor
}: CourseJsonLdProps) {
  const siteUrl = studioConfig.url || 'https://balancestudio.kr'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${siteUrl}/classes/${id}`,
    name,
    description,
    provider: {
      '@type': 'HealthAndBeautyBusiness',
      name: studioConfig.name.en,
      sameAs: siteUrl,
    },
    educationalLevel: level.charAt(0).toUpperCase() + level.slice(1),
    timeRequired: `PT${duration}M`,
    ...(instructor && {
      instructor: {
        '@type': 'Person',
        name: instructor,
      },
    }),
  }

  return <JsonLdScript data={jsonLd} id={`pilates-course-${id}-jsonld`} />
}

/**
 * Instructor/Person JSON-LD
 */
interface InstructorJsonLdProps {
  id: string
  name: string
  jobTitle: string
  specialties: string[]
  certifications?: string[]
  image?: string
}

export function PilatesInstructorJsonLd({
  id,
  name,
  jobTitle,
  specialties,
  certifications,
  image,
}: InstructorJsonLdProps) {
  const siteUrl = studioConfig.url || 'https://balancestudio.kr'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/instructors/${id}`,
    name,
    jobTitle,
    worksFor: {
      '@type': 'HealthAndBeautyBusiness',
      name: studioConfig.name.en,
    },
    knowsAbout: specialties,
    ...(certifications && certifications.length > 0 && {
      hasCredential: certifications.map(cert => ({
        '@type': 'EducationalOccupationalCredential',
        name: cert,
      })),
    }),
    ...(image && { image: `${siteUrl}${image}` }),
  }

  return <JsonLdScript data={jsonLd} id={`pilates-instructor-${id}-jsonld`} />
}

export default PilatesStudioJsonLd
