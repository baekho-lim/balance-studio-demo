import { PersonEntity, LocalBusinessEntity, EventEntity, ArticleEntity, LocaleCode, ProductEntity, EntityType } from '@agency/core';
import * as React from 'react';

/**
 * Person JSON-LD generator
 * For artists, instructors, chefs, staff
 */

interface PersonJsonLdOptions {
    siteUrl: string;
    locale?: string;
    includeAlternateNames?: boolean;
}
interface PersonJsonLdOutput {
    '@context': 'https://schema.org';
    '@type': 'Person';
    '@id': string;
    name: string;
    alternateName?: string[];
    givenName?: string;
    familyName?: string;
    birthDate?: string;
    birthPlace?: {
        '@type': 'Place';
        name: string;
    };
    nationality?: {
        '@type': 'Country';
        name: string;
    };
    url?: string;
    image?: {
        '@type': 'ImageObject';
        url: string;
        caption?: string;
    };
    sameAs?: string[];
    jobTitle?: string;
    description?: string;
    alumniOf?: Array<{
        '@type': 'CollegeOrUniversity' | 'EducationalOrganization';
        name: string;
        sameAs?: string;
    }>;
    affiliation?: Array<{
        '@type': 'Organization';
        name: string;
        url?: string;
    }>;
    knowsAbout?: string[];
    hasOccupation?: {
        '@type': 'Occupation';
        name: string;
        occupationalCategory?: string;
    };
}
/**
 * Generate Person JSON-LD schema
 */
declare function generatePersonJsonLd(person: PersonEntity, options: PersonJsonLdOptions): PersonJsonLdOutput;
/**
 * Generate Person JSON-LD for an artist specifically
 */
declare function generateArtistJsonLd(person: PersonEntity, options: PersonJsonLdOptions & {
    artworks?: Array<{
        name: string;
        year?: number;
    }>;
    exhibitions?: Array<{
        name: string;
        venue: string;
    }>;
}): PersonJsonLdOutput;
/**
 * Generate Person JSON-LD for a fitness instructor
 */
declare function generateInstructorJsonLd(person: PersonEntity, options: PersonJsonLdOptions & {
    certifications?: string[];
    classTypes?: string[];
}): PersonJsonLdOutput;

/**
 * Local Business JSON-LD generator
 * For restaurants, pilates studios, stores, etc.
 */

interface LocalBusinessJsonLdOptions {
    siteUrl: string;
    locale?: string;
}
interface LocalBusinessJsonLdOutput {
    '@context': 'https://schema.org';
    '@type': string;
    '@id': string;
    name: string;
    description?: string;
    url?: string;
    telephone?: string;
    email?: string;
    address: {
        '@type': 'PostalAddress';
        streetAddress?: string;
        addressLocality: string;
        addressRegion?: string;
        postalCode?: string;
        addressCountry: string;
    };
    geo?: {
        '@type': 'GeoCoordinates';
        latitude: number;
        longitude: number;
    };
    openingHoursSpecification?: Array<{
        '@type': 'OpeningHoursSpecification';
        dayOfWeek: string | string[];
        opens: string;
        closes: string;
    }>;
    priceRange?: string;
    image?: string;
    sameAs?: string[];
    aggregateRating?: {
        '@type': 'AggregateRating';
        ratingValue: number;
        reviewCount: number;
        bestRating?: number;
        worstRating?: number;
    };
    hasMenu?: string;
    servesCuisine?: string[];
    acceptsReservations?: boolean;
}
/**
 * Generate Local Business JSON-LD schema
 */
declare function generateLocalBusinessJsonLd(business: LocalBusinessEntity, options: LocalBusinessJsonLdOptions): LocalBusinessJsonLdOutput;
/**
 * Generate Restaurant JSON-LD
 */
declare function generateRestaurantJsonLd(business: LocalBusinessEntity, options: LocalBusinessJsonLdOptions & {
    cuisineTypes?: string[];
    menuUrl?: string;
    acceptsReservations?: boolean;
}): LocalBusinessJsonLdOutput;
/**
 * Generate Health & Beauty Business JSON-LD (Pilates, Gym, Spa)
 */
declare function generateHealthBusinessJsonLd(business: LocalBusinessEntity, options: LocalBusinessJsonLdOptions & {
    services?: string[];
    specialties?: string[];
}): LocalBusinessJsonLdOutput;
/**
 * Generate Store JSON-LD
 */
declare function generateStoreJsonLd(business: LocalBusinessEntity, options: LocalBusinessJsonLdOptions & {
    paymentAccepted?: string[];
    currenciesAccepted?: string[];
}): LocalBusinessJsonLdOutput;

/**
 * Event JSON-LD generator
 * For exhibitions, workshops, classes, etc.
 */

interface EventJsonLdOptions {
    siteUrl: string;
    locale?: string;
}
interface EventJsonLdOutput {
    '@context': 'https://schema.org';
    '@type': string;
    '@id': string;
    name: string;
    alternateName?: string;
    description?: string;
    startDate: string;
    endDate?: string;
    eventStatus?: string;
    eventAttendanceMode?: string;
    location?: {
        '@type': 'Place';
        name: string;
        address?: {
            '@type': 'PostalAddress';
            streetAddress?: string;
            addressLocality?: string;
            addressCountry?: string;
        };
    };
    performer?: {
        '@type': 'Person' | 'Organization';
        '@id'?: string;
        name: string;
    };
    organizer?: {
        '@type': 'Organization' | 'Person';
        name: string;
        url?: string;
        sameAs?: string[];
    };
    image?: string;
    url?: string;
    sameAs?: string[];
    isAccessibleForFree?: boolean;
    offers?: {
        '@type': 'Offer';
        price?: number | string;
        priceCurrency?: string;
        availability?: string;
        url?: string;
    };
    inLanguage?: string[];
}
/**
 * Generate Event JSON-LD schema
 */
declare function generateEventJsonLd(event: EventEntity, options: EventJsonLdOptions): EventJsonLdOutput;
/**
 * Generate Exhibition Event JSON-LD
 */
declare function generateExhibitionJsonLd(event: EventEntity, options: EventJsonLdOptions & {
    artistId?: string;
    artistName?: string;
    galleryUrl?: string;
    officialUrl?: string;
}): EventJsonLdOutput;
/**
 * Generate Class/Workshop Event JSON-LD (for fitness studios)
 */
declare function generateClassEventJsonLd(event: EventEntity, options: EventJsonLdOptions & {
    instructorId?: string;
    instructorName?: string;
    classType?: string;
    level?: string;
    duration?: number;
    capacity?: number;
    registrationUrl?: string;
}): EventJsonLdOutput;

/**
 * Article JSON-LD generator
 * For blog posts, news, press releases
 */

interface ArticleJsonLdOptions {
    siteUrl: string;
    locale?: string;
    publisherName?: string;
    publisherLogo?: string;
}
interface ArticleJsonLdOutput {
    '@context': 'https://schema.org';
    '@type': string;
    '@id': string;
    headline: string;
    alternativeHeadline?: string;
    description?: string;
    datePublished: string;
    dateModified?: string;
    author?: {
        '@type': 'Person' | 'Organization';
        '@id'?: string;
        name: string;
        url?: string;
    };
    publisher?: {
        '@type': 'Organization';
        name: string;
        url?: string;
        logo?: {
            '@type': 'ImageObject';
            url: string;
        };
    };
    mainEntityOfPage?: {
        '@type': 'WebPage';
        '@id': string;
    };
    image?: string | string[];
    url?: string;
    articleSection?: string;
    keywords?: string;
    inLanguage?: string[];
    wordCount?: number;
    articleBody?: string;
}
/**
 * Generate Article JSON-LD schema
 */
declare function generateArticleJsonLd(article: ArticleEntity, options: ArticleJsonLdOptions): ArticleJsonLdOutput;
/**
 * Generate Blog Post JSON-LD
 */
declare function generateBlogPostJsonLd(article: ArticleEntity, options: ArticleJsonLdOptions & {
    authorUrl?: string;
    categoryName?: string;
}): ArticleJsonLdOutput;
/**
 * Generate News Article JSON-LD
 */
declare function generateNewsArticleJsonLd(article: ArticleEntity, options: ArticleJsonLdOptions & {
    sourceName?: string;
    sourceUrl?: string;
}): ArticleJsonLdOutput;
/**
 * Generate Press Release JSON-LD
 */
declare function generatePressReleaseJsonLd(article: ArticleEntity, options: ArticleJsonLdOptions & {
    organizationName?: string;
}): ArticleJsonLdOutput;

/**
 * FAQ JSON-LD generator
 */

interface FAQItem {
    id: string;
    question: Record<string, string>;
    answer: Record<string, string>;
    order?: number;
}
interface FAQJsonLdOptions {
    siteUrl: string;
    locales?: LocaleCode[];
}
interface FAQJsonLdOutput {
    '@context': 'https://schema.org';
    '@type': 'FAQPage';
    '@id'?: string;
    mainEntity: Array<{
        '@type': 'Question';
        name: string;
        acceptedAnswer: {
            '@type': 'Answer';
            text: string;
            inLanguage?: string;
        };
    }>;
}
/**
 * Generate FAQ JSON-LD schema
 */
declare function generateFAQJsonLd(faqs: FAQItem[], options: FAQJsonLdOptions): FAQJsonLdOutput;
/**
 * Generate FAQ JSON-LD for a single locale
 */
declare function generateFAQJsonLdForLocale(faqs: FAQItem[], locale: LocaleCode, options: Omit<FAQJsonLdOptions, 'locales'>): FAQJsonLdOutput;
/**
 * Generate FAQ JSON-LD for multiple pages
 * Useful when FAQs are split across different pages/categories
 */
declare function generateCategorizedFAQJsonLd(categories: Array<{
    name: string;
    faqs: FAQItem[];
}>, options: FAQJsonLdOptions): FAQJsonLdOutput;

/**
 * Product JSON-LD generator
 * For artworks, merchandise, menu items, etc.
 */

interface ProductJsonLdOptions {
    siteUrl: string;
    locale?: string;
    sellerName?: string;
    sellerUrl?: string;
}
interface ProductJsonLdOutput {
    '@context': 'https://schema.org';
    '@type': string;
    '@id': string;
    name: string;
    alternateName?: string;
    description?: string;
    image?: string | string[];
    url?: string;
    brand?: {
        '@type': 'Brand';
        name: string;
    };
    offers?: {
        '@type': 'Offer';
        price?: number | string;
        priceCurrency?: string;
        availability?: string;
        url?: string;
        seller?: {
            '@type': 'Organization';
            name: string;
            url?: string;
        };
        priceValidUntil?: string;
    };
    sku?: string;
    material?: string | string[];
    width?: {
        '@type': 'QuantitativeValue';
        value: number;
        unitCode: string;
    };
    height?: {
        '@type': 'QuantitativeValue';
        value: number;
        unitCode: string;
    };
    depth?: {
        '@type': 'QuantitativeValue';
        value: number;
        unitCode: string;
    };
    aggregateRating?: {
        '@type': 'AggregateRating';
        ratingValue: number;
        reviewCount: number;
        bestRating?: number;
        worstRating?: number;
    };
    dateCreated?: string;
    creator?: {
        '@type': 'Person';
        '@id'?: string;
        name: string;
        url?: string;
    };
    artMedium?: string;
    artform?: string;
    artworkSurface?: string;
    category?: string;
    color?: string;
    size?: string;
}
/**
 * Generate Product JSON-LD schema
 */
declare function generateProductJsonLd(product: ProductEntity, options: ProductJsonLdOptions): ProductJsonLdOutput;
/**
 * Generate Visual Artwork JSON-LD
 */
declare function generateArtworkJsonLd(product: ProductEntity, options: ProductJsonLdOptions & {
    artistId?: string;
    artistName?: string;
    artistUrl?: string;
    artMedium?: string;
    artform?: string;
    artworkSurface?: string;
}): ProductJsonLdOutput;
/**
 * Generate Menu Item JSON-LD (for restaurants)
 */
declare function generateMenuItemJsonLd(product: ProductEntity, options: ProductJsonLdOptions & {
    menuUrl?: string;
    nutrition?: {
        calories?: number;
        servingSize?: string;
    };
}): ProductJsonLdOutput;

/**
 * Website and Breadcrumb JSON-LD generators
 */
interface WebsiteJsonLdOptions {
    siteUrl: string;
    siteName: string;
    alternateName?: string;
    description?: string;
    languages?: string[];
    publisherId?: string;
    publisherName?: string;
}
interface WebsiteJsonLdOutput {
    '@context': 'https://schema.org';
    '@type': 'WebSite';
    '@id': string;
    name: string;
    alternateName?: string;
    url: string;
    description?: string;
    inLanguage?: string[];
    publisher?: {
        '@type': 'Person' | 'Organization';
        '@id'?: string;
        name?: string;
    };
    potentialAction?: {
        '@type': 'SearchAction';
        target: {
            '@type': 'EntryPoint';
            urlTemplate: string;
        };
        'query-input': string;
    };
}
interface BreadcrumbItem {
    name: string;
    url: string;
}
interface BreadcrumbJsonLdOutput {
    '@context': 'https://schema.org';
    '@type': 'BreadcrumbList';
    itemListElement: Array<{
        '@type': 'ListItem';
        position: number;
        name: string;
        item: string;
    }>;
}
/**
 * Generate WebSite JSON-LD schema
 */
declare function generateWebsiteJsonLd(options: WebsiteJsonLdOptions): WebsiteJsonLdOutput;
/**
 * Generate WebSite JSON-LD with search action
 */
declare function generateWebsiteWithSearchJsonLd(options: WebsiteJsonLdOptions & {
    searchPath?: string;
    searchParam?: string;
}): WebsiteJsonLdOutput;
/**
 * Generate Breadcrumb JSON-LD schema
 */
declare function generateBreadcrumbJsonLd(items: BreadcrumbItem[], siteUrl: string): BreadcrumbJsonLdOutput;
/**
 * Generate common breadcrumb patterns
 */
declare function generateHomeBreadcrumb(siteUrl: string, siteName: string): BreadcrumbJsonLdOutput;
declare function generatePageBreadcrumb(siteUrl: string, siteName: string, pageName: string, pageUrl: string): BreadcrumbJsonLdOutput;
declare function generateDetailBreadcrumb(siteUrl: string, siteName: string, sectionName: string, sectionUrl: string, itemName: string, itemUrl: string): BreadcrumbJsonLdOutput;
/**
 * Generate Art Gallery JSON-LD
 */
declare function generateArtGalleryJsonLd(options: {
    siteUrl: string;
    galleryName: string;
    description?: string;
    founderId?: string;
    languages?: string[];
    image?: string;
}): {
    '@context': 'https://schema.org';
    '@type': 'ArtGallery';
    '@id': string;
    name: string;
    url: string;
    description?: string;
    image?: string;
    founder?: {
        '@type': 'Person';
        '@id': string;
    };
    inLanguage?: string[];
};

/**
 * React component for rendering JSON-LD scripts
 */

interface JsonLdScriptProps {
    data: Record<string, unknown>;
    id?: string;
}
/**
 * Render a single JSON-LD script tag
 */
declare function JsonLdScript({ data, id }: JsonLdScriptProps): React.ReactElement;
interface JsonLdScriptsProps {
    schemas: Array<Record<string, unknown>>;
    prefix?: string;
}
/**
 * Render multiple JSON-LD script tags
 */
declare function JsonLdScripts({ schemas, prefix }: JsonLdScriptsProps): React.ReactElement;
interface JsonLdContainerProps {
    children: React.ReactNode;
}
/**
 * Container for JSON-LD scripts (for organization)
 */
declare function JsonLdContainer({ children }: JsonLdContainerProps): React.ReactElement;

/**
 * React component for generating meta tags
 */

interface MetaTagsProps {
    title: string;
    description?: string;
    keywords?: string[];
    canonicalUrl?: string;
    ogType?: 'website' | 'article' | 'profile' | 'product';
    ogImage?: string;
    ogImageWidth?: number;
    ogImageHeight?: number;
    twitterCard?: 'summary' | 'summary_large_image';
    twitterSite?: string;
    twitterCreator?: string;
    locale?: string;
    alternateLocales?: Array<{
        locale: string;
        url: string;
    }>;
    noindex?: boolean;
    nofollow?: boolean;
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
}
/**
 * Generate meta tags for SEO
 * Note: For Next.js, prefer using the Metadata API instead
 * This component is for custom meta tag scenarios
 */
declare function MetaTags({ title, description, keywords, canonicalUrl, ogType, ogImage, ogImageWidth, ogImageHeight, twitterCard, twitterSite, twitterCreator, locale, alternateLocales, noindex, nofollow, author, publishedTime, modifiedTime, section, tags }: MetaTagsProps): React.ReactElement;
/**
 * Generate hreflang link tags
 */
declare function HrefLangLinks({ currentLocale, locales, getUrl }: {
    currentLocale: string;
    locales: string[];
    getUrl: (locale: string) => string;
}): React.ReactElement;

/**
 * LLM Context generator for AEO (Answer Engine Optimization)
 * Generates structured context for AI crawlers
 */

interface LLMContextOptions {
    entityType: EntityType;
    entityName: string;
    primaryFacts: string[];
    expertise?: string[];
    uniqueValue?: string;
    location?: {
        city: string;
        country: string;
    };
    contactInfo?: {
        email?: string;
        phone?: string;
        website?: string;
    };
    externalAuthority?: {
        wikidata?: string;
        socialProfiles?: string[];
        pressLinks?: string[];
        industryLinks?: string[];
    };
}
interface LLMContextOutput {
    '@context': 'https://limhyejung.com/llm-context';
    '@version': '1.0';
    entityType: EntityType;
    entityName: string;
    primaryFacts: string[];
    expertise?: string[];
    uniqueValue?: string;
    location?: {
        city: string;
        country: string;
    };
    contactInfo?: {
        email?: string;
        phone?: string;
        website?: string;
    };
    externalAuthority?: {
        wikidata?: string;
        socialProfiles?: string[];
        pressLinks?: string[];
        industryLinks?: string[];
    };
    lastUpdated: string;
    instruction: string;
}
/**
 * Generate LLM context JSON for AI crawlers
 */
declare function generateLLMContext(options: LLMContextOptions): LLMContextOutput;
/**
 * Generate LLM context for an artist
 */
declare function generateArtistLLMContext(options: {
    name: string;
    birthYear: number;
    nationality: string;
    birthPlace?: string;
    education?: string;
    artStyles?: string[];
    philosophy?: string;
    knownFor?: string[];
    website: string;
    externalAuthority?: LLMContextOptions['externalAuthority'];
}): LLMContextOutput;
/**
 * Generate LLM context for a local business
 */
declare function generateBusinessLLMContext(options: {
    name: string;
    businessType: string;
    city: string;
    country: string;
    specialties?: string[];
    uniqueValue?: string;
    website?: string;
    phone?: string;
    externalAuthority?: LLMContextOptions['externalAuthority'];
}): LLMContextOutput;
/**
 * Serialize LLM context to JSON string for file output
 */
declare function serializeLLMContext(context: LLMContextOutput): string;

/**
 * Robots.txt generator
 */
interface RobotsUserAgent {
    userAgent: string;
    allow?: string[];
    disallow?: string[];
    crawlDelay?: number;
}
interface RobotsConfig {
    userAgents: RobotsUserAgent[];
    sitemaps?: string[];
    host?: string;
}
/**
 * Default robots.txt configuration for agency sites
 * Allows all crawlers including AI bots
 */
declare const defaultRobotsConfig: RobotsConfig;
/**
 * Generate robots.txt content from config
 */
declare function generateRobotsTxt(config: RobotsConfig): string;
/**
 * Generate robots.txt with full URLs for sitemaps
 */
declare function generateRobotsTxtWithHost(config: RobotsConfig, siteUrl: string): string;
/**
 * Merge robots configs (later configs override earlier)
 */
declare function mergeRobotsConfigs(...configs: Partial<RobotsConfig>[]): RobotsConfig;

/**
 * Sitemap generator utilities
 */
interface SitemapUrl {
    loc: string;
    lastmod?: string;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
    alternates?: Array<{
        hreflang: string;
        href: string;
    }>;
    images?: Array<{
        loc: string;
        caption?: string;
        title?: string;
    }>;
}
interface SitemapConfig {
    urls: SitemapUrl[];
    defaultChangefreq?: SitemapUrl['changefreq'];
    defaultPriority?: number;
}
/**
 * Generate XML sitemap content
 */
declare function generateSitemapXml(config: SitemapConfig): string;
/**
 * Generate sitemap index for multiple sitemaps
 */
declare function generateSitemapIndex(sitemaps: Array<{
    loc: string;
    lastmod?: string;
}>): string;
/**
 * Create sitemap URL entry with locale alternates
 */
declare function createMultilingualUrl(basePath: string, siteUrl: string, locales: string[], options?: {
    lastmod?: string;
    changefreq?: SitemapUrl['changefreq'];
    priority?: number;
    images?: SitemapUrl['images'];
}): SitemapUrl;
/**
 * Priority mapping for common page types
 */
declare const PAGE_PRIORITIES: Record<string, number>;
/**
 * Get priority based on page type or path
 */
declare function getPriority(pageType: string): number;

export { type ArticleJsonLdOptions, type ArticleJsonLdOutput, type BreadcrumbItem, type BreadcrumbJsonLdOutput, type EventJsonLdOptions, type EventJsonLdOutput, type FAQItem, type FAQJsonLdOptions, type FAQJsonLdOutput, HrefLangLinks, JsonLdContainer, type JsonLdContainerProps, JsonLdScript, type JsonLdScriptProps, JsonLdScripts, type JsonLdScriptsProps, type LLMContextOptions, type LLMContextOutput, type LocalBusinessJsonLdOptions, type LocalBusinessJsonLdOutput, MetaTags, type MetaTagsProps, PAGE_PRIORITIES, type PersonJsonLdOptions, type PersonJsonLdOutput, type ProductJsonLdOptions, type ProductJsonLdOutput, type RobotsConfig, type RobotsUserAgent, type SitemapConfig, type SitemapUrl, type WebsiteJsonLdOptions, type WebsiteJsonLdOutput, createMultilingualUrl, defaultRobotsConfig, generateArtGalleryJsonLd, generateArticleJsonLd, generateArtistJsonLd, generateArtistLLMContext, generateArtworkJsonLd, generateBlogPostJsonLd, generateBreadcrumbJsonLd, generateBusinessLLMContext, generateCategorizedFAQJsonLd, generateClassEventJsonLd, generateDetailBreadcrumb, generateEventJsonLd, generateExhibitionJsonLd, generateFAQJsonLd, generateFAQJsonLdForLocale, generateHealthBusinessJsonLd, generateHomeBreadcrumb, generateInstructorJsonLd, generateLLMContext, generateLocalBusinessJsonLd, generateMenuItemJsonLd, generateNewsArticleJsonLd, generatePageBreadcrumb, generatePersonJsonLd, generatePressReleaseJsonLd, generateProductJsonLd, generateRestaurantJsonLd, generateRobotsTxt, generateRobotsTxtWithHost, generateSitemapIndex, generateSitemapXml, generateStoreJsonLd, generateWebsiteJsonLd, generateWebsiteWithSearchJsonLd, getPriority, mergeRobotsConfigs, serializeLLMContext };
