import { z } from 'zod';

/**
 * Locale and internationalization types
 * Supports 11 languages with priority tiers
 */
type LocaleCode = 'en' | 'ko' | 'vi' | 'ja' | 'zh-CN' | 'ms' | 'id' | 'de' | 'fr' | 'es' | 'ar';
type LocalePriority = 'P0' | 'P1' | 'P2' | 'P3';
interface MultilingualText {
    en: string;
    ko: string;
    vi?: string;
    ja?: string;
    'zh-CN'?: string;
    ms?: string;
    id?: string;
    de?: string;
    fr?: string;
    es?: string;
    ar?: string;
}
interface LocaleConfig {
    default: LocaleCode;
    supported: LocaleCode[];
    priority: Record<LocalePriority, LocaleCode[]>;
    uiLanguage: LocaleCode;
}
interface TranslationKeys {
    [namespace: string]: {
        [key: string]: MultilingualText | string;
    };
}
type LocaleValue<T extends MultilingualText> = T[LocaleCode];

/**
 * Entity System - Core abstraction for all content types
 * Supports multiple industries: Artist, Restaurant, Pilates, E-commerce, Government
 */

type EntityType = 'Person' | 'LocalBusiness' | 'Product' | 'Service' | 'Event' | 'Article' | 'Organization' | 'Place';
type EntityStatus = 'draft' | 'review' | 'scheduled' | 'published' | 'archived';
interface ImageSet {
    thumbnail?: string;
    full?: string;
    hero?: string;
    og?: string;
    alt?: string;
    width?: number;
    height?: number;
}
interface BaseEntity {
    id: string;
    type: EntityType;
    slug: string;
    name: MultilingualText;
    description?: MultilingualText;
    images?: ImageSet;
    status: EntityStatus;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    order?: number;
    featured?: boolean;
    tags?: string[];
}
interface PersonEntity extends BaseEntity {
    type: 'Person';
    birthYear?: number;
    nationality?: string;
    birthPlace?: string;
    title?: MultilingualText;
    credentials?: string[];
    specialties?: string[];
    contact?: {
        email?: string;
        phone?: string;
        website?: string;
    };
    social?: {
        instagram?: string;
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        youtube?: string;
    };
    externalIds?: {
        wikidata?: string;
        viaf?: string;
        ulan?: string;
        isni?: string;
    };
    affiliations?: Array<{
        name: string;
        nameKr?: string;
        url?: string;
        type: 'alumniOf' | 'representedBy' | 'memberOf' | 'worksFor';
    }>;
}
interface LocalBusinessEntity extends BaseEntity {
    type: 'LocalBusiness';
    businessType: 'Restaurant' | 'HealthAndBeautyBusiness' | 'Store' | 'ProfessionalService' | 'LodgingBusiness';
    address: {
        street?: string;
        city: string;
        state?: string;
        postalCode?: string;
        country: string;
        countryCode: string;
    };
    geo?: {
        lat: number;
        lng: number;
    };
    openingHours?: Array<{
        dayOfWeek: string[];
        opens: string;
        closes: string;
    }>;
    closedDays?: string[];
    phone?: string;
    email?: string;
    website?: string;
    priceRange?: '$' | '$$' | '$$$' | '$$$$';
    platforms?: {
        googlePlaceId?: string;
        naverPlaceId?: string;
        kakaoPlaceId?: string;
    };
    rating?: {
        value: number;
        count: number;
        source?: string;
    };
}
interface ProductEntity extends BaseEntity {
    type: 'Product';
    productType: 'Artwork' | 'PhysicalProduct' | 'DigitalProduct' | 'MenuItem';
    price?: {
        amount: number;
        currency: string;
        priceType?: 'fixed' | 'variable' | 'inquiry';
    };
    dimensions?: {
        width?: number;
        height?: number;
        depth?: number;
        unit: 'cm' | 'in' | 'mm';
    };
    materials?: string[];
    category?: string;
    sku?: string;
    availability?: 'InStock' | 'OutOfStock' | 'PreOrder' | 'SoldOut';
    year?: number;
}
interface ServiceEntity extends BaseEntity {
    type: 'Service';
    serviceType: 'Course' | 'Treatment' | 'Consultation' | 'Membership';
    duration?: number;
    price?: {
        amount: number;
        currency: string;
        per?: 'session' | 'month' | 'package';
    };
    capacity?: number;
    level?: 'beginner' | 'intermediate' | 'advanced' | 'all';
    instructor?: string;
    schedule?: Array<{
        dayOfWeek: string;
        startTime: string;
        endTime: string;
    }>;
    requirements?: string[];
}
interface EventEntity extends BaseEntity {
    type: 'Event';
    eventType: 'Exhibition' | 'Workshop' | 'Performance' | 'ClassSession' | 'Opening';
    startDate: string;
    endDate?: string;
    venue?: string;
    venueAddress?: string;
    city?: string;
    country?: string;
    countryCode?: string;
    organizers?: Array<{
        name: string;
        role: 'host' | 'co-host' | 'sponsor' | 'partner';
        url?: string;
    }>;
    admission?: 'free' | 'paid';
    admissionFee?: string;
    registrationUrl?: string;
    relatedEntities?: string[];
}
interface ArticleEntity extends BaseEntity {
    type: 'Article';
    articleType: 'BlogPost' | 'NewsArticle' | 'PressRelease' | 'Interview' | 'Review';
    content: MultilingualText;
    excerpt?: MultilingualText;
    author?: string;
    publishDate: string;
    category?: string;
    readTime?: number;
    source?: string;
    sourceUrl?: string;
    relatedEntities?: string[];
}
interface OrganizationEntity extends BaseEntity {
    type: 'Organization';
    orgType: 'GovernmentOrganization' | 'EducationalOrganization' | 'Corporation' | 'NonProfit';
    address?: {
        street?: string;
        city: string;
        state?: string;
        country: string;
    };
    contact?: {
        phone?: string;
        email?: string;
        website?: string;
    };
    services?: string[];
}
interface PlaceEntity extends BaseEntity {
    type: 'Place';
    placeType: 'Venue' | 'TouristAttraction' | 'CivicStructure';
    address: {
        street?: string;
        city: string;
        state?: string;
        country: string;
        countryCode?: string;
    };
    geo?: {
        lat: number;
        lng: number;
    };
    amenities?: string[];
}
type Entity = PersonEntity | LocalBusinessEntity | ProductEntity | ServiceEntity | EventEntity | ArticleEntity | OrganizationEntity | PlaceEntity;
declare function isPersonEntity(entity: Entity): entity is PersonEntity;
declare function isLocalBusinessEntity(entity: Entity): entity is LocalBusinessEntity;
declare function isProductEntity(entity: Entity): entity is ProductEntity;
declare function isServiceEntity(entity: Entity): entity is ServiceEntity;
declare function isEventEntity(entity: Entity): entity is EventEntity;
declare function isArticleEntity(entity: Entity): entity is ArticleEntity;

/**
 * SEO/AEO/GEO types
 * Schema.org structured data and LLM optimization
 */

type SchemaType = 'Person' | 'Restaurant' | 'HealthAndBeautyBusiness' | 'Store' | 'ProfessionalService' | 'Product' | 'VisualArtwork' | 'MenuItem' | 'Offer' | 'Course' | 'Service' | 'Event' | 'ExhibitionEvent' | 'BusinessEvent' | 'Article' | 'NewsArticle' | 'BlogPosting' | 'Organization' | 'GovernmentOrganization' | 'EducationalOrganization' | 'WebSite' | 'ArtGallery' | 'FAQPage' | 'BreadcrumbList' | 'ImageObject' | 'Place' | 'LocalBusiness';
declare const entityToSchemaMap: Record<EntityType, SchemaType[]>;
interface SEOConfig {
    title?: string | MultilingualText;
    description?: string | MultilingualText;
    keywords?: string[];
    ogImage?: string;
    ogType?: 'website' | 'article' | 'profile' | 'product';
    canonical?: string;
    noindex?: boolean;
    nofollow?: boolean;
    alternates?: Record<LocaleCode, string>;
}
interface JsonLdBase {
    '@context': 'https://schema.org';
    '@type': SchemaType | SchemaType[];
    '@id'?: string;
    name?: string;
    description?: string;
    url?: string;
    image?: string | string[] | ImageObject;
    sameAs?: string[];
}
interface ImageObject {
    '@type': 'ImageObject';
    url: string;
    width?: number;
    height?: number;
    caption?: string;
}
interface PersonJsonLd extends JsonLdBase {
    '@type': 'Person';
    givenName?: string;
    familyName?: string;
    birthDate?: string;
    nationality?: string | {
        '@type': 'Country';
        name: string;
    };
    jobTitle?: string;
    alumniOf?: Array<{
        '@type': 'EducationalOrganization';
        name: string;
        url?: string;
    }>;
    affiliation?: Array<{
        '@type': 'Organization';
        name: string;
        url?: string;
    }>;
    knowsAbout?: string[];
}
interface LocalBusinessJsonLd extends JsonLdBase {
    '@type': 'LocalBusiness' | 'Restaurant' | 'HealthAndBeautyBusiness' | 'Store';
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
    telephone?: string;
    email?: string;
    openingHoursSpecification?: Array<{
        '@type': 'OpeningHoursSpecification';
        dayOfWeek: string | string[];
        opens: string;
        closes: string;
    }>;
    priceRange?: string;
    aggregateRating?: {
        '@type': 'AggregateRating';
        ratingValue: number;
        reviewCount: number;
        bestRating?: number;
        worstRating?: number;
    };
    hasMenu?: string;
}
interface ProductJsonLd extends JsonLdBase {
    '@type': 'Product' | 'VisualArtwork';
    brand?: {
        '@type': 'Brand';
        name: string;
    };
    offers?: {
        '@type': 'Offer';
        price?: number;
        priceCurrency?: string;
        availability?: string;
        url?: string;
    };
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
    dateCreated?: string;
    creator?: {
        '@type': 'Person';
        name: string;
        url?: string;
    };
}
interface EventJsonLd extends JsonLdBase {
    '@type': 'Event' | 'ExhibitionEvent' | 'BusinessEvent';
    startDate: string;
    endDate?: string;
    location?: {
        '@type': 'Place';
        name: string;
        address?: {
            '@type': 'PostalAddress';
            addressLocality?: string;
            addressCountry?: string;
        };
    };
    organizer?: {
        '@type': 'Organization' | 'Person';
        name: string;
        url?: string;
    };
    offers?: {
        '@type': 'Offer';
        price?: number | string;
        priceCurrency?: string;
        availability?: string;
        url?: string;
    };
    performer?: {
        '@type': 'Person';
        name: string;
    };
}
interface ArticleJsonLd extends JsonLdBase {
    '@type': 'Article' | 'NewsArticle' | 'BlogPosting';
    headline: string;
    datePublished: string;
    dateModified?: string;
    author?: {
        '@type': 'Person';
        name: string;
        url?: string;
    };
    publisher?: {
        '@type': 'Organization';
        name: string;
        logo?: ImageObject;
    };
    mainEntityOfPage?: string;
    articleBody?: string;
    wordCount?: number;
}
interface FAQJsonLd {
    '@context': 'https://schema.org';
    '@type': 'FAQPage';
    mainEntity: Array<{
        '@type': 'Question';
        name: string;
        acceptedAnswer: {
            '@type': 'Answer';
            text: string;
        };
    }>;
}
interface BreadcrumbJsonLd {
    '@context': 'https://schema.org';
    '@type': 'BreadcrumbList';
    itemListElement: Array<{
        '@type': 'ListItem';
        position: number;
        name: string;
        item: string;
    }>;
}
interface LLMContext {
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
}
interface RobotsConfig {
    userAgents: Array<{
        agent: string;
        allow?: string[];
        disallow?: string[];
        crawlDelay?: number;
    }>;
    sitemaps: string[];
}

/**
 * Theme System types
 * Full theme file structure for complete design replacement
 */
type ThemeId = string;
type HeaderStyle = 'fixed' | 'sticky' | 'static' | 'transparent';
type FooterStyle = 'minimal' | 'standard' | 'mega';
type ButtonStyle = 'rounded' | 'square' | 'pill';
type CardStyle = 'flat' | 'elevated' | 'bordered' | 'glass';
type InputStyle = 'outlined' | 'filled' | 'underlined';
interface ColorPalette {
    primary: string;
    primaryLight?: string;
    primaryDark?: string;
    secondary: string;
    secondaryLight?: string;
    secondaryDark?: string;
    accent: string;
    background: string;
    backgroundAlt?: string;
    surface: string;
    text: string;
    textMuted: string;
    textInverse?: string;
    border: string;
    success?: string;
    warning?: string;
    error?: string;
    info?: string;
}
interface Typography {
    fontFamily: {
        heading: string;
        body: string;
        mono?: string;
    };
    fontSize: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
        '5xl'?: string;
    };
    fontWeight: {
        light?: number;
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
    };
    lineHeight: {
        tight: number;
        normal: number;
        relaxed: number;
    };
    letterSpacing?: {
        tight?: string;
        normal?: string;
        wide?: string;
    };
}
interface SpacingScale {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    8: string;
    10: string;
    12: string;
    16: string;
    20: string;
    24?: string;
}
interface BorderRadius {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    full: string;
}
interface Shadows {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
}
interface Breakpoints {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
}
interface LayoutConfig {
    headerStyle: HeaderStyle;
    headerHeight: string;
    footerStyle: FooterStyle;
    sidebarWidth?: string;
    sidebarPosition?: 'left' | 'right';
    maxWidth: string;
    containerPadding: string;
    sectionSpacing: string;
}
interface ComponentVariants {
    button: {
        style: ButtonStyle;
        sizes: {
            sm: {
                height: string;
                padding: string;
                fontSize: string;
            };
            md: {
                height: string;
                padding: string;
                fontSize: string;
            };
            lg: {
                height: string;
                padding: string;
                fontSize: string;
            };
        };
    };
    card: {
        style: CardStyle;
        padding: string;
        borderRadius: string;
    };
    input: {
        style: InputStyle;
        height: string;
        borderRadius: string;
    };
    badge: {
        borderRadius: string;
        padding: string;
    };
}
interface AnimationConfig {
    duration: {
        fast: string;
        normal: string;
        slow: string;
    };
    easing: {
        default: string;
        in: string;
        out: string;
        inOut: string;
    };
    transitions: {
        default: string;
        colors: string;
        transform: string;
        opacity: string;
    };
}
interface ThemeConfig {
    id: ThemeId;
    name: string;
    description?: string;
    version?: string;
    author?: string;
    colors: ColorPalette;
    typography: Typography;
    spacing: SpacingScale;
    borderRadius: BorderRadius;
    shadows: Shadows;
    breakpoints: Breakpoints;
    layout: LayoutConfig;
    components: ComponentVariants;
    animation: AnimationConfig;
    industry?: {
        type: 'artist' | 'restaurant' | 'pilates' | 'ecommerce' | 'government' | 'education';
        customTokens?: Record<string, unknown>;
    };
}
interface ThemePreset {
    id: string;
    name: string;
    description: string;
    preview?: string;
    config: ThemeConfig;
}
declare const THEME_PRESETS: readonly ["minimal", "bold", "elegant", "modern", "classic"];
type ThemePresetId = typeof THEME_PRESETS[number];

/**
 * Blog/CMS types
 * Enterprise-level content management
 */

type BlogStatus = 'draft' | 'review' | 'scheduled' | 'published' | 'archived';
type Visibility = 'public' | 'private' | 'password-protected' | 'members-only';
type AuthorRole = 'admin' | 'editor' | 'author' | 'contributor' | 'viewer';
interface Author {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: MultilingualText;
    role: AuthorRole;
    social?: {
        twitter?: string;
        linkedin?: string;
        website?: string;
    };
}
interface Category {
    id: string;
    slug: string;
    name: MultilingualText;
    description?: MultilingualText;
    parentId?: string;
    order?: number;
    image?: string;
}
interface Tag {
    id: string;
    slug: string;
    name: MultilingualText;
    count?: number;
}
interface BlogPost {
    id: string;
    slug: string;
    title: MultilingualText;
    content: MultilingualText;
    excerpt?: MultilingualText;
    category?: string;
    categories?: string[];
    tags?: string[];
    author: string;
    coAuthors?: string[];
    status: BlogStatus;
    visibility: Visibility;
    password?: string;
    publishDate?: string;
    scheduledDate?: string;
    seo?: {
        title?: string;
        description?: string;
        keywords?: string[];
        ogImage?: string;
        canonicalUrl?: string;
        noIndex?: boolean;
    };
    images?: ImageSet;
    featuredImage?: string;
    viewCount?: number;
    readTime?: number;
    likeCount?: number;
    commentsEnabled?: boolean;
    commentCount?: number;
    sentToNewsletter?: boolean;
    newsletterSentDate?: string;
    createdAt: string;
    updatedAt: string;
    featured?: boolean;
    pinned?: boolean;
    order?: number;
}
interface Comment {
    id: string;
    postId: string;
    parentId?: string;
    author: {
        name: string;
        email: string;
        website?: string;
        avatar?: string;
        isRegistered?: boolean;
        userId?: string;
    };
    content: string;
    status: 'pending' | 'approved' | 'spam' | 'trash';
    createdAt: string;
    updatedAt?: string;
    likes?: number;
    replies?: Comment[];
}
interface NewsletterSubscriber {
    id: string;
    email: string;
    name?: string;
    status: 'pending' | 'confirmed' | 'unsubscribed';
    subscribedAt: string;
    confirmedAt?: string;
    unsubscribedAt?: string;
    tags?: string[];
    preferences?: {
        frequency?: 'daily' | 'weekly' | 'monthly';
        categories?: string[];
    };
}
interface NewsletterCampaign {
    id: string;
    subject: MultilingualText;
    content: MultilingualText;
    status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'cancelled';
    scheduledDate?: string;
    sentDate?: string;
    recipientCount?: number;
    openCount?: number;
    clickCount?: number;
    posts?: string[];
}
interface AnalyticsDataPoint {
    date: string;
    views: number;
    uniqueVisitors: number;
    avgTimeOnPage?: number;
    bounceRate?: number;
}
interface PostAnalytics {
    postId: string;
    totalViews: number;
    uniqueViews: number;
    avgReadTime: number;
    completionRate: number;
    referrers: Array<{
        source: string;
        count: number;
    }>;
    countries: Array<{
        country: string;
        count: number;
    }>;
    daily: AnalyticsDataPoint[];
}
interface BlogConfig {
    postsPerPage: number;
    enableComments: boolean;
    moderateComments: boolean;
    enableNewsletter: boolean;
    enableRss: boolean;
    rssTitle?: string;
    defaultCategory?: string;
    featuredPostsCount: number;
    relatedPostsCount: number;
    showReadTime: boolean;
    showViewCount: boolean;
    showAuthor: boolean;
    dateFormat: string;
}

/**
 * Business-specific types
 * Industry templates: Pilates/Health, Restaurant, E-commerce
 */

type ClassLevel = 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
type ClassType = 'pilates-mat' | 'pilates-reformer' | 'yoga' | 'barre' | 'strength' | 'cardio' | 'stretching' | 'meditation' | 'personal-training';
interface InstructorCertification {
    name: string;
    issuingOrg: string;
    issueDate?: string;
    expiryDate?: string;
    verified?: boolean;
}
interface Instructor extends PersonEntity {
    specialties: ClassType[];
    certifications: InstructorCertification[];
    experience: number;
    languages?: string[];
    availability?: {
        [day: string]: {
            start: string;
            end: string;
        }[];
    };
    rating?: {
        value: number;
        count: number;
    };
    classes?: string[];
}
interface FitnessClass extends Omit<ServiceEntity, 'level'> {
    classType: ClassType;
    classLevel: ClassLevel;
    instructor: string;
    location: string;
    equipment?: string[];
    benefits?: MultilingualText;
    targetAreas?: string[];
    intensity: 1 | 2 | 3 | 4 | 5;
    recurring?: {
        pattern: 'weekly' | 'biweekly' | 'monthly';
        dayOfWeek: string;
        startTime: string;
        endTime: string;
    };
    singleSession?: {
        date: string;
        startTime: string;
        endTime: string;
    };
    maxCapacity: number;
    currentEnrollment?: number;
    waitlistEnabled?: boolean;
    cancellationPolicy?: string;
}
interface ClassSchedule {
    date: string;
    classes: Array<{
        classId: string;
        className: MultilingualText;
        classType: ClassType;
        level: ClassLevel;
        startTime: string;
        endTime: string;
        instructor: {
            id: string;
            name: string;
            image?: string;
        };
        location: string;
        spotsRemaining: number;
        status: 'available' | 'almost-full' | 'full' | 'cancelled';
    }>;
}
interface MembershipPlan {
    id: string;
    name: MultilingualText;
    description?: MultilingualText;
    type: 'unlimited' | 'limited' | 'package' | 'drop-in';
    duration: {
        value: number;
        unit: 'day' | 'week' | 'month' | 'year';
    };
    price: {
        amount: number;
        currency: string;
        originalAmount?: number;
    };
    features: MultilingualText[];
    classLimit?: number;
    classTypes?: ClassType[];
    popular?: boolean;
    order: number;
}
interface Booking {
    id: string;
    userId: string;
    classId: string;
    classDate: string;
    status: 'confirmed' | 'waitlisted' | 'cancelled' | 'completed' | 'no-show';
    bookedAt: string;
    cancelledAt?: string;
    checkInAt?: string;
}
type CuisineType = 'korean' | 'japanese' | 'chinese' | 'italian' | 'french' | 'american' | 'mexican' | 'thai' | 'vietnamese' | 'indian' | 'fusion' | 'other';
type DietaryInfo = 'vegetarian' | 'vegan' | 'gluten-free' | 'halal' | 'kosher' | 'dairy-free' | 'nut-free';
type SpicinessLevel = 0 | 1 | 2 | 3 | 4 | 5;
interface MenuCategory {
    id: string;
    name: MultilingualText;
    description?: MultilingualText;
    order: number;
    image?: string;
    available: boolean;
    timeRestriction?: {
        startTime: string;
        endTime: string;
    };
}
interface MenuItem {
    id: string;
    name: MultilingualText;
    description?: MultilingualText;
    category: string;
    price: {
        amount: number;
        currency: string;
    };
    images?: ImageSet;
    dietary?: DietaryInfo[];
    spiciness?: SpicinessLevel;
    calories?: number;
    allergens?: string[];
    options?: Array<{
        name: MultilingualText;
        choices: Array<{
            name: MultilingualText;
            priceModifier?: number;
        }>;
        required?: boolean;
        multiSelect?: boolean;
    }>;
    popular?: boolean;
    chefRecommended?: boolean;
    available: boolean;
    order: number;
}
interface RestaurantReservation {
    id: string;
    name: string;
    phone: string;
    email?: string;
    date: string;
    time: string;
    partySize: number;
    status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no-show';
    specialRequests?: string;
    tablePreference?: string;
    occasion?: string;
    createdAt: string;
}
interface ProductVariant {
    id: string;
    name: string;
    sku: string;
    price: {
        amount: number;
        currency: string;
        compareAtPrice?: number;
    };
    options: Record<string, string>;
    inventory: {
        quantity: number;
        policy: 'deny' | 'continue' | 'preorder';
    };
    weight?: number;
    dimensions?: {
        length: number;
        width: number;
        height: number;
        unit: 'cm' | 'in';
    };
    image?: string;
    available: boolean;
}
interface ProductOption {
    name: string;
    values: string[];
}
interface EcommerceProduct {
    id: string;
    slug: string;
    name: MultilingualText;
    description: MultilingualText;
    shortDescription?: MultilingualText;
    category: string;
    categories?: string[];
    tags?: string[];
    brand?: string;
    vendor?: string;
    images: ImageSet & {
        gallery?: string[];
    };
    options: ProductOption[];
    variants: ProductVariant[];
    defaultVariant: string;
    reviews?: {
        average: number;
        count: number;
    };
    seo?: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
    status: 'draft' | 'active' | 'archived';
    featured?: boolean;
    createdAt: string;
    updatedAt: string;
}
interface CartItem {
    productId: string;
    variantId: string;
    quantity: number;
    price: number;
    name: string;
    image?: string;
}
interface Order {
    id: string;
    orderNumber: string;
    customer: {
        name: string;
        email: string;
        phone?: string;
    };
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    currency: string;
    status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
    shippingAddress: {
        street: string;
        city: string;
        state?: string;
        postalCode: string;
        country: string;
    };
    billingAddress?: {
        street: string;
        city: string;
        state?: string;
        postalCode: string;
        country: string;
    };
    paymentMethod: string;
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    trackingNumber?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Zod schemas for entity validation
 * Note: Type exports are in /types - use schemas for runtime validation
 */

declare const localeCodeSchema: z.ZodEnum<{
    en: "en";
    ko: "ko";
    vi: "vi";
    ja: "ja";
    "zh-CN": "zh-CN";
    ms: "ms";
    id: "id";
    de: "de";
    fr: "fr";
    es: "es";
    ar: "ar";
}>;
declare const multilingualTextSchema: z.ZodObject<{
    en: z.ZodString;
    ko: z.ZodString;
    vi: z.ZodOptional<z.ZodString>;
    ja: z.ZodOptional<z.ZodString>;
    'zh-CN': z.ZodOptional<z.ZodString>;
    ms: z.ZodOptional<z.ZodString>;
    id: z.ZodOptional<z.ZodString>;
    de: z.ZodOptional<z.ZodString>;
    fr: z.ZodOptional<z.ZodString>;
    es: z.ZodOptional<z.ZodString>;
    ar: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const entityTypeSchema: z.ZodEnum<{
    Person: "Person";
    LocalBusiness: "LocalBusiness";
    Product: "Product";
    Service: "Service";
    Event: "Event";
    Article: "Article";
    Organization: "Organization";
    Place: "Place";
}>;
declare const entityStatusSchema: z.ZodEnum<{
    draft: "draft";
    review: "review";
    scheduled: "scheduled";
    published: "published";
    archived: "archived";
}>;
declare const imageSetSchema: z.ZodObject<{
    thumbnail: z.ZodOptional<z.ZodString>;
    full: z.ZodOptional<z.ZodString>;
    hero: z.ZodOptional<z.ZodString>;
    og: z.ZodOptional<z.ZodString>;
    alt: z.ZodOptional<z.ZodString>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const baseEntitySchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<{
        Person: "Person";
        LocalBusiness: "LocalBusiness";
        Product: "Product";
        Service: "Service";
        Event: "Event";
        Article: "Article";
        Organization: "Organization";
        Place: "Place";
    }>;
    slug: z.ZodString;
    name: z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    description: z.ZodOptional<z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    images: z.ZodOptional<z.ZodObject<{
        thumbnail: z.ZodOptional<z.ZodString>;
        full: z.ZodOptional<z.ZodString>;
        hero: z.ZodOptional<z.ZodString>;
        og: z.ZodOptional<z.ZodString>;
        alt: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    status: z.ZodEnum<{
        draft: "draft";
        review: "review";
        scheduled: "scheduled";
        published: "published";
        archived: "archived";
    }>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    publishedAt: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodNumber>;
    featured: z.ZodOptional<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
declare const personEntitySchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    name: z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    description: z.ZodOptional<z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    images: z.ZodOptional<z.ZodObject<{
        thumbnail: z.ZodOptional<z.ZodString>;
        full: z.ZodOptional<z.ZodString>;
        hero: z.ZodOptional<z.ZodString>;
        og: z.ZodOptional<z.ZodString>;
        alt: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    status: z.ZodEnum<{
        draft: "draft";
        review: "review";
        scheduled: "scheduled";
        published: "published";
        archived: "archived";
    }>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    publishedAt: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodNumber>;
    featured: z.ZodOptional<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    type: z.ZodLiteral<"Person">;
    birthYear: z.ZodOptional<z.ZodNumber>;
    nationality: z.ZodOptional<z.ZodString>;
    birthPlace: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    credentials: z.ZodOptional<z.ZodArray<z.ZodString>>;
    specialties: z.ZodOptional<z.ZodArray<z.ZodString>>;
    contact: z.ZodOptional<z.ZodObject<{
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    social: z.ZodOptional<z.ZodObject<{
        instagram: z.ZodOptional<z.ZodString>;
        facebook: z.ZodOptional<z.ZodString>;
        twitter: z.ZodOptional<z.ZodString>;
        linkedin: z.ZodOptional<z.ZodString>;
        youtube: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    externalIds: z.ZodOptional<z.ZodObject<{
        wikidata: z.ZodOptional<z.ZodString>;
        viaf: z.ZodOptional<z.ZodString>;
        ulan: z.ZodOptional<z.ZodString>;
        isni: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const localBusinessEntitySchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    name: z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    description: z.ZodOptional<z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    images: z.ZodOptional<z.ZodObject<{
        thumbnail: z.ZodOptional<z.ZodString>;
        full: z.ZodOptional<z.ZodString>;
        hero: z.ZodOptional<z.ZodString>;
        og: z.ZodOptional<z.ZodString>;
        alt: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    status: z.ZodEnum<{
        draft: "draft";
        review: "review";
        scheduled: "scheduled";
        published: "published";
        archived: "archived";
    }>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    publishedAt: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodNumber>;
    featured: z.ZodOptional<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    type: z.ZodLiteral<"LocalBusiness">;
    businessType: z.ZodEnum<{
        Restaurant: "Restaurant";
        HealthAndBeautyBusiness: "HealthAndBeautyBusiness";
        Store: "Store";
        ProfessionalService: "ProfessionalService";
        LodgingBusiness: "LodgingBusiness";
    }>;
    address: z.ZodObject<{
        street: z.ZodOptional<z.ZodString>;
        city: z.ZodString;
        state: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        country: z.ZodString;
        countryCode: z.ZodString;
    }, z.core.$strip>;
    geo: z.ZodOptional<z.ZodObject<{
        lat: z.ZodNumber;
        lng: z.ZodNumber;
    }, z.core.$strip>>;
    openingHours: z.ZodOptional<z.ZodArray<z.ZodObject<{
        dayOfWeek: z.ZodArray<z.ZodString>;
        opens: z.ZodString;
        closes: z.ZodString;
    }, z.core.$strip>>>;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    priceRange: z.ZodOptional<z.ZodEnum<{
        $: "$";
        $$: "$$";
        $$$: "$$$";
        $$$$: "$$$$";
    }>>;
}, z.core.$strip>;
declare const eventEntitySchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    name: z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    description: z.ZodOptional<z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    images: z.ZodOptional<z.ZodObject<{
        thumbnail: z.ZodOptional<z.ZodString>;
        full: z.ZodOptional<z.ZodString>;
        hero: z.ZodOptional<z.ZodString>;
        og: z.ZodOptional<z.ZodString>;
        alt: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    status: z.ZodEnum<{
        draft: "draft";
        review: "review";
        scheduled: "scheduled";
        published: "published";
        archived: "archived";
    }>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    publishedAt: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodNumber>;
    featured: z.ZodOptional<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    type: z.ZodLiteral<"Event">;
    eventType: z.ZodEnum<{
        Exhibition: "Exhibition";
        Workshop: "Workshop";
        Performance: "Performance";
        ClassSession: "ClassSession";
        Opening: "Opening";
    }>;
    startDate: z.ZodString;
    endDate: z.ZodOptional<z.ZodString>;
    venue: z.ZodOptional<z.ZodString>;
    venueAddress: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    countryCode: z.ZodOptional<z.ZodString>;
    admission: z.ZodOptional<z.ZodEnum<{
        free: "free";
        paid: "paid";
    }>>;
    admissionFee: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const articleEntitySchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    name: z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    description: z.ZodOptional<z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    images: z.ZodOptional<z.ZodObject<{
        thumbnail: z.ZodOptional<z.ZodString>;
        full: z.ZodOptional<z.ZodString>;
        hero: z.ZodOptional<z.ZodString>;
        og: z.ZodOptional<z.ZodString>;
        alt: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    status: z.ZodEnum<{
        draft: "draft";
        review: "review";
        scheduled: "scheduled";
        published: "published";
        archived: "archived";
    }>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    publishedAt: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodNumber>;
    featured: z.ZodOptional<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    type: z.ZodLiteral<"Article">;
    articleType: z.ZodEnum<{
        BlogPost: "BlogPost";
        NewsArticle: "NewsArticle";
        PressRelease: "PressRelease";
        Interview: "Interview";
        Review: "Review";
    }>;
    content: z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    excerpt: z.ZodOptional<z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    author: z.ZodOptional<z.ZodString>;
    publishDate: z.ZodString;
    category: z.ZodOptional<z.ZodString>;
    readTime: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;

/**
 * Zod schemas for blog/CMS validation
 * Note: Type exports are in /types/blog.ts - use schemas for runtime validation
 */

declare const blogStatusSchema: z.ZodEnum<{
    draft: "draft";
    review: "review";
    scheduled: "scheduled";
    published: "published";
    archived: "archived";
}>;
declare const visibilitySchema: z.ZodEnum<{
    public: "public";
    private: "private";
    "password-protected": "password-protected";
    "members-only": "members-only";
}>;
declare const authorRoleSchema: z.ZodEnum<{
    admin: "admin";
    editor: "editor";
    author: "author";
    contributor: "contributor";
    viewer: "viewer";
}>;
declare const authorSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    role: z.ZodEnum<{
        admin: "admin";
        editor: "editor";
        author: "author";
        contributor: "contributor";
        viewer: "viewer";
    }>;
    social: z.ZodOptional<z.ZodObject<{
        twitter: z.ZodOptional<z.ZodString>;
        linkedin: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const categorySchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    name: z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    description: z.ZodOptional<z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    parentId: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodNumber>;
    image: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const tagSchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    name: z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    count: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const blogSeoSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString>>;
    ogImage: z.ZodOptional<z.ZodString>;
    canonicalUrl: z.ZodOptional<z.ZodString>;
    noIndex: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
declare const blogPostSchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    title: z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    content: z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    excerpt: z.ZodOptional<z.ZodObject<{
        en: z.ZodString;
        ko: z.ZodString;
        vi: z.ZodOptional<z.ZodString>;
        ja: z.ZodOptional<z.ZodString>;
        'zh-CN': z.ZodOptional<z.ZodString>;
        ms: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        de: z.ZodOptional<z.ZodString>;
        fr: z.ZodOptional<z.ZodString>;
        es: z.ZodOptional<z.ZodString>;
        ar: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    category: z.ZodOptional<z.ZodString>;
    categories: z.ZodOptional<z.ZodArray<z.ZodString>>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    author: z.ZodString;
    coAuthors: z.ZodOptional<z.ZodArray<z.ZodString>>;
    status: z.ZodEnum<{
        draft: "draft";
        review: "review";
        scheduled: "scheduled";
        published: "published";
        archived: "archived";
    }>;
    visibility: z.ZodEnum<{
        public: "public";
        private: "private";
        "password-protected": "password-protected";
        "members-only": "members-only";
    }>;
    password: z.ZodOptional<z.ZodString>;
    publishDate: z.ZodOptional<z.ZodString>;
    scheduledDate: z.ZodOptional<z.ZodString>;
    seo: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        keywords: z.ZodOptional<z.ZodArray<z.ZodString>>;
        ogImage: z.ZodOptional<z.ZodString>;
        canonicalUrl: z.ZodOptional<z.ZodString>;
        noIndex: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
    images: z.ZodOptional<z.ZodObject<{
        thumbnail: z.ZodOptional<z.ZodString>;
        full: z.ZodOptional<z.ZodString>;
        hero: z.ZodOptional<z.ZodString>;
        og: z.ZodOptional<z.ZodString>;
        alt: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    featuredImage: z.ZodOptional<z.ZodString>;
    viewCount: z.ZodOptional<z.ZodNumber>;
    readTime: z.ZodOptional<z.ZodNumber>;
    likeCount: z.ZodOptional<z.ZodNumber>;
    commentsEnabled: z.ZodOptional<z.ZodBoolean>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    sentToNewsletter: z.ZodOptional<z.ZodBoolean>;
    newsletterSentDate: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    featured: z.ZodOptional<z.ZodBoolean>;
    pinned: z.ZodOptional<z.ZodBoolean>;
    order: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const commentStatusSchema: z.ZodEnum<{
    pending: "pending";
    approved: "approved";
    spam: "spam";
    trash: "trash";
}>;
declare const commentSchema: z.ZodObject<{
    id: z.ZodString;
    postId: z.ZodString;
    parentId: z.ZodOptional<z.ZodString>;
    author: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        website: z.ZodOptional<z.ZodString>;
        avatar: z.ZodOptional<z.ZodString>;
        isRegistered: z.ZodOptional<z.ZodBoolean>;
        userId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    content: z.ZodString;
    status: z.ZodEnum<{
        pending: "pending";
        approved: "approved";
        spam: "spam";
        trash: "trash";
    }>;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodString>;
    likes: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const subscriberStatusSchema: z.ZodEnum<{
    pending: "pending";
    confirmed: "confirmed";
    unsubscribed: "unsubscribed";
}>;
declare const newsletterSubscriberSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<{
        pending: "pending";
        confirmed: "confirmed";
        unsubscribed: "unsubscribed";
    }>;
    subscribedAt: z.ZodString;
    confirmedAt: z.ZodOptional<z.ZodString>;
    unsubscribedAt: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    preferences: z.ZodOptional<z.ZodObject<{
        frequency: z.ZodOptional<z.ZodEnum<{
            daily: "daily";
            weekly: "weekly";
            monthly: "monthly";
        }>>;
        categories: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const blogConfigSchema: z.ZodObject<{
    postsPerPage: z.ZodDefault<z.ZodNumber>;
    enableComments: z.ZodDefault<z.ZodBoolean>;
    moderateComments: z.ZodDefault<z.ZodBoolean>;
    enableNewsletter: z.ZodDefault<z.ZodBoolean>;
    enableRss: z.ZodDefault<z.ZodBoolean>;
    rssTitle: z.ZodOptional<z.ZodString>;
    defaultCategory: z.ZodOptional<z.ZodString>;
    featuredPostsCount: z.ZodDefault<z.ZodNumber>;
    relatedPostsCount: z.ZodDefault<z.ZodNumber>;
    showReadTime: z.ZodDefault<z.ZodBoolean>;
    showViewCount: z.ZodDefault<z.ZodBoolean>;
    showAuthor: z.ZodDefault<z.ZodBoolean>;
    dateFormat: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;

/**
 * Locale utility functions
 */

/**
 * Get text for a specific locale with fallback
 */
declare function getText(text: MultilingualText | string | undefined, locale: LocaleCode, fallbackLocale?: LocaleCode): string;
/**
 * Get locale priority tier
 */
declare function getLocalePriority(locale: LocaleCode): LocalePriority;
/**
 * Get all locales for a priority tier
 */
declare function getLocalesByPriority(priority: LocalePriority): LocaleCode[];
/**
 * Get all supported locales
 */
declare function getAllLocales(): LocaleCode[];
/**
 * Check if a locale is supported
 */
declare function isLocaleSupported(locale: string): locale is LocaleCode;
/**
 * Get locale display name
 */
declare function getLocaleDisplayName(locale: LocaleCode): string;
/**
 * Create a multilingual text object with default values
 */
declare function createMultilingualText(en: string, ko?: string, others?: Partial<Omit<MultilingualText, 'en' | 'ko'>>): MultilingualText;
/**
 * Merge multilingual text objects
 */
declare function mergeMultilingualText(base: MultilingualText, override: Partial<MultilingualText>): MultilingualText;
/**
 * Check if multilingual text has all required fields
 */
declare function isCompleteMultilingualText(text: unknown): text is MultilingualText;

/**
 * Slug generation utilities
 */
/**
 * Convert text to URL-friendly slug
 */
declare function slugify(text: string): string;
/**
 * Generate unique slug by appending number if needed
 */
declare function generateUniqueSlug(baseSlug: string, existingSlugs: string[]): string;
/**
 * Validate slug format
 */
declare function isValidSlug(slug: string): boolean;
/**
 * Extract ID from slug if it contains one
 * e.g., "my-article-123" -> "123"
 */
declare function extractIdFromSlug(slug: string): string | null;
/**
 * Create slug from title and date
 * e.g., "My Article" + "2024-01-15" -> "my-article-2024-01-15"
 */
declare function createDatedSlug(title: string, date: string | Date): string;

/**
 * Date formatting utilities
 */

/**
 * Format date for display
 */
declare function formatDate(date: string | Date, locale?: LocaleCode, options?: Intl.DateTimeFormatOptions): string;
/**
 * Format date as short format (e.g., "Jan 15, 2024")
 */
declare function formatDateShort(date: string | Date, locale?: LocaleCode): string;
/**
 * Format date as ISO date string (YYYY-MM-DD)
 */
declare function toISODateString(date: string | Date): string;
/**
 * Format time for display
 */
declare function formatTime(time: string, locale?: LocaleCode, options?: Intl.DateTimeFormatOptions): string;
/**
 * Get relative time string (e.g., "2 days ago")
 */
declare function formatRelativeTime(date: string | Date, locale?: LocaleCode): string;
/**
 * Check if date is in the past
 */
declare function isPast(date: string | Date): boolean;
/**
 * Check if date is in the future
 */
declare function isFuture(date: string | Date): boolean;
/**
 * Check if date is today
 */
declare function isToday(date: string | Date): boolean;
/**
 * Get date range string (e.g., "Jan 15 - Feb 20, 2024")
 */
declare function formatDateRange(startDate: string | Date, endDate: string | Date, locale?: LocaleCode): string;

export { type AnalyticsDataPoint, type AnimationConfig, type ArticleEntity, type ArticleJsonLd, type Author, type AuthorRole, type BaseEntity, type BlogConfig, type BlogPost, type BlogStatus, type Booking, type BorderRadius, type BreadcrumbJsonLd, type Breakpoints, type ButtonStyle, type CardStyle, type CartItem, type Category, type ClassLevel, type ClassSchedule, type ClassType, type ColorPalette, type Comment, type ComponentVariants, type CuisineType, type DietaryInfo, type EcommerceProduct, type Entity, type EntityStatus, type EntityType, type EventEntity, type EventJsonLd, type FAQJsonLd, type FitnessClass, type FooterStyle, type HeaderStyle, type ImageObject, type ImageSet, type InputStyle, type Instructor, type InstructorCertification, type JsonLdBase, type LLMContext, type LayoutConfig, type LocalBusinessEntity, type LocalBusinessJsonLd, type LocaleCode, type LocaleConfig, type LocalePriority, type LocaleValue, type MembershipPlan, type MenuCategory, type MenuItem, type MultilingualText, type NewsletterCampaign, type NewsletterSubscriber, type Order, type OrganizationEntity, type PersonEntity, type PersonJsonLd, type PlaceEntity, type PostAnalytics, type ProductEntity, type ProductJsonLd, type ProductOption, type ProductVariant, type RestaurantReservation, type RobotsConfig, type SEOConfig, type SchemaType, type ServiceEntity, type Shadows, type SpacingScale, type SpicinessLevel, THEME_PRESETS, type Tag, type ThemeConfig, type ThemeId, type ThemePreset, type ThemePresetId, type TranslationKeys, type Typography, type Visibility, articleEntitySchema, authorRoleSchema, authorSchema, baseEntitySchema, blogConfigSchema, blogPostSchema, blogSeoSchema, blogStatusSchema, categorySchema, commentSchema, commentStatusSchema, createDatedSlug, createMultilingualText, entityStatusSchema, entityToSchemaMap, entityTypeSchema, eventEntitySchema, extractIdFromSlug, formatDate, formatDateRange, formatDateShort, formatRelativeTime, formatTime, generateUniqueSlug, getAllLocales, getLocaleDisplayName, getLocalePriority, getLocalesByPriority, getText, imageSetSchema, isArticleEntity, isCompleteMultilingualText, isEventEntity, isFuture, isLocalBusinessEntity, isLocaleSupported, isPast, isPersonEntity, isProductEntity, isServiceEntity, isToday, isValidSlug, localBusinessEntitySchema, localeCodeSchema, mergeMultilingualText, multilingualTextSchema, newsletterSubscriberSchema, personEntitySchema, slugify, subscriberStatusSchema, tagSchema, toISODateString, visibilitySchema };
