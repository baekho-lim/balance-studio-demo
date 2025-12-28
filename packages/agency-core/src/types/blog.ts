/**
 * Blog/CMS types
 * Enterprise-level content management
 */

import type { MultilingualText } from './locale'
import type { ImageSet } from './entity'

// Blog post status with workflow
export type BlogStatus = 'draft' | 'review' | 'scheduled' | 'published' | 'archived'

// Content visibility
export type Visibility = 'public' | 'private' | 'password-protected' | 'members-only'

// Author role (RBAC)
export type AuthorRole = 'admin' | 'editor' | 'author' | 'contributor' | 'viewer'

// Author information
export interface Author {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: MultilingualText
  role: AuthorRole
  social?: {
    twitter?: string
    linkedin?: string
    website?: string
  }
}

// Category for organizing posts
export interface Category {
  id: string
  slug: string
  name: MultilingualText
  description?: MultilingualText
  parentId?: string  // For hierarchical categories
  order?: number
  image?: string
}

// Tag for flexible labeling
export interface Tag {
  id: string
  slug: string
  name: MultilingualText
  count?: number  // Number of posts using this tag
}

// Blog post
export interface BlogPost {
  id: string
  slug: string
  title: MultilingualText
  content: MultilingualText  // Markdown
  excerpt?: MultilingualText

  // Organization
  category?: string         // Category ID
  categories?: string[]     // Multiple categories
  tags?: string[]           // Tag IDs

  // Authorship
  author: string            // Author ID
  coAuthors?: string[]      // Additional authors

  // Publishing
  status: BlogStatus
  visibility: Visibility
  password?: string         // For password-protected posts
  publishDate?: string      // ISO date
  scheduledDate?: string    // For scheduled publishing

  // SEO
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: string
    canonicalUrl?: string
    noIndex?: boolean
  }

  // Media
  images?: ImageSet
  featuredImage?: string

  // Analytics
  viewCount?: number
  readTime?: number         // minutes
  likeCount?: number

  // Engagement
  commentsEnabled?: boolean
  commentCount?: number

  // Newsletter
  sentToNewsletter?: boolean
  newsletterSentDate?: string

  // Metadata
  createdAt: string
  updatedAt: string
  featured?: boolean
  pinned?: boolean
  order?: number
}

// Comment
export interface Comment {
  id: string
  postId: string
  parentId?: string         // For nested comments
  author: {
    name: string
    email: string
    website?: string
    avatar?: string
    isRegistered?: boolean
    userId?: string
  }
  content: string
  status: 'pending' | 'approved' | 'spam' | 'trash'
  createdAt: string
  updatedAt?: string
  likes?: number
  replies?: Comment[]
}

// Newsletter subscriber
export interface NewsletterSubscriber {
  id: string
  email: string
  name?: string
  status: 'pending' | 'confirmed' | 'unsubscribed'
  subscribedAt: string
  confirmedAt?: string
  unsubscribedAt?: string
  tags?: string[]
  preferences?: {
    frequency?: 'daily' | 'weekly' | 'monthly'
    categories?: string[]
  }
}

// Newsletter campaign
export interface NewsletterCampaign {
  id: string
  subject: MultilingualText
  content: MultilingualText
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'cancelled'
  scheduledDate?: string
  sentDate?: string
  recipientCount?: number
  openCount?: number
  clickCount?: number
  posts?: string[]          // Related blog post IDs
}

// Analytics data point
export interface AnalyticsDataPoint {
  date: string
  views: number
  uniqueVisitors: number
  avgTimeOnPage?: number    // seconds
  bounceRate?: number       // percentage
}

// Post analytics
export interface PostAnalytics {
  postId: string
  totalViews: number
  uniqueViews: number
  avgReadTime: number
  completionRate: number    // % who read to end
  referrers: Array<{
    source: string
    count: number
  }>
  countries: Array<{
    country: string
    count: number
  }>
  daily: AnalyticsDataPoint[]
}

// Blog configuration
export interface BlogConfig {
  postsPerPage: number
  enableComments: boolean
  moderateComments: boolean
  enableNewsletter: boolean
  enableRss: boolean
  rssTitle?: string
  defaultCategory?: string
  featuredPostsCount: number
  relatedPostsCount: number
  showReadTime: boolean
  showViewCount: boolean
  showAuthor: boolean
  dateFormat: string
}
