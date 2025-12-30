/**
 * @cgos/core - Commerce Growth OS Core Package
 * Single Source of Truth for types, utilities, and constants
 */
interface MultilingualText {
    en: string;
    ko: string;
    vi?: string;
}
type IndustryType = 'artist' | 'pilates' | 'petcare' | 'ecommerce' | 'restaurant' | 'education' | 'medical' | 'realestate' | 'legal';
interface SiteConfig {
    id: string;
    name: MultilingualText;
    industry: IndustryType;
    domain?: string;
    theme: ThemeConfig;
    features: string[];
    seo: SEOConfig;
    createdAt: Date;
    updatedAt: Date;
}
interface ThemeConfig {
    preset: 'minimal' | 'bold' | 'elegant' | 'wellness';
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
    };
    typography: {
        headingFont: string;
        bodyFont: string;
    };
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
}
interface SEOConfig {
    title: MultilingualText;
    description: MultilingualText;
    keywords: string[];
    ogImage?: string;
    schema?: Record<string, unknown>;
}
interface BookingSlot {
    id: string;
    startTime: Date;
    endTime: Date;
    available: boolean;
    capacity?: number;
    booked?: number;
}
interface Booking {
    id: string;
    customerId: string;
    serviceId: string;
    slot: BookingSlot;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    notes?: string;
    createdAt: Date;
}
type RFMScore = 'champions' | 'loyal' | 'potential' | 'new' | 'at_risk' | 'dormant';
interface Customer {
    id: string;
    name: string;
    email: string;
    phone?: string;
    rfmScore?: RFMScore;
    tags: string[];
    totalOrders: number;
    totalSpent: number;
    lastOrderAt?: Date;
    createdAt: Date;
}
interface BlogPost {
    id: string;
    slug: string;
    title: MultilingualText;
    content: MultilingualText;
    excerpt?: MultilingualText;
    featuredImage?: string;
    author?: string;
    tags: string[];
    status: 'draft' | 'scheduled' | 'published';
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Format currency
 */
declare function formatCurrency(amount: number, currency?: string): string;
/**
 * Format date
 */
declare function formatDate(date: Date | string, locale?: string): string;
/**
 * Format relative time
 */
declare function formatRelativeTime(date: Date | string, locale?: string): string;
/**
 * Generate slug from text
 */
declare function generateSlug(text: string): string;
/**
 * Truncate text
 */
declare function truncateText(text: string, maxLength: number): string;
/**
 * Get text by locale
 */
declare function getLocalizedText(text: MultilingualText | string, locale?: 'en' | 'ko' | 'vi'): string;
declare const INDUSTRIES: Record<IndustryType, {
    label: MultilingualText;
    icon: string;
}>;
declare const RFM_LABELS: Record<RFMScore, {
    label: MultilingualText;
    color: string;
}>;
declare const THEME_PRESETS: {
    minimal: {
        colors: {
            primary: string;
            secondary: string;
            accent: string;
            background: string;
            text: string;
        };
    };
    bold: {
        colors: {
            primary: string;
            secondary: string;
            accent: string;
            background: string;
            text: string;
        };
    };
    elegant: {
        colors: {
            primary: string;
            secondary: string;
            accent: string;
            background: string;
            text: string;
        };
    };
    wellness: {
        colors: {
            primary: string;
            secondary: string;
            accent: string;
            background: string;
            text: string;
        };
    };
};

export { type BlogPost, type Booking, type BookingSlot, type Customer, INDUSTRIES, type IndustryType, type MultilingualText, type RFMScore, RFM_LABELS, type SEOConfig, type SiteConfig, THEME_PRESETS, type ThemeConfig, formatCurrency, formatDate, formatRelativeTime, generateSlug, getLocalizedText, truncateText };
