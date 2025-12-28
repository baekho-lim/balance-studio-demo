/**
 * Zod schemas for blog/CMS validation
 * Note: Type exports are in /types/blog.ts - use schemas for runtime validation
 */

import { z } from 'zod'
import { multilingualTextSchema, imageSetSchema } from './entity.schema'

// Blog post status
export const blogStatusSchema = z.enum([
  'draft', 'review', 'scheduled', 'published', 'archived'
])

// Visibility
export const visibilitySchema = z.enum([
  'public', 'private', 'password-protected', 'members-only'
])

// Author role
export const authorRoleSchema = z.enum([
  'admin', 'editor', 'author', 'contributor', 'viewer'
])

// Author schema
export const authorSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  bio: multilingualTextSchema.optional(),
  role: authorRoleSchema,
  social: z.object({
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    website: z.string().url().optional(),
  }).optional(),
})

// Category schema
export const categorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: multilingualTextSchema,
  description: multilingualTextSchema.optional(),
  parentId: z.string().optional(),
  order: z.number().optional(),
  image: z.string().optional(),
})

// Tag schema
export const tagSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: multilingualTextSchema,
  count: z.number().optional(),
})

// SEO config for blog post
export const blogSeoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),
  canonicalUrl: z.string().url().optional(),
  noIndex: z.boolean().optional(),
})

// Blog post schema
export const blogPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: multilingualTextSchema,
  content: multilingualTextSchema,
  excerpt: multilingualTextSchema.optional(),

  // Organization
  category: z.string().optional(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),

  // Authorship
  author: z.string(),
  coAuthors: z.array(z.string()).optional(),

  // Publishing
  status: blogStatusSchema,
  visibility: visibilitySchema,
  password: z.string().optional(),
  publishDate: z.string().optional(),
  scheduledDate: z.string().optional(),

  // SEO
  seo: blogSeoSchema.optional(),

  // Media
  images: imageSetSchema.optional(),
  featuredImage: z.string().optional(),

  // Analytics
  viewCount: z.number().optional(),
  readTime: z.number().optional(),
  likeCount: z.number().optional(),

  // Engagement
  commentsEnabled: z.boolean().optional(),
  commentCount: z.number().optional(),

  // Newsletter
  sentToNewsletter: z.boolean().optional(),
  newsletterSentDate: z.string().optional(),

  // Metadata
  createdAt: z.string(),
  updatedAt: z.string(),
  featured: z.boolean().optional(),
  pinned: z.boolean().optional(),
  order: z.number().optional(),
})

// Comment status
export const commentStatusSchema = z.enum([
  'pending', 'approved', 'spam', 'trash'
])

// Comment schema
export const commentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  parentId: z.string().optional(),
  author: z.object({
    name: z.string(),
    email: z.string().email(),
    website: z.string().url().optional(),
    avatar: z.string().optional(),
    isRegistered: z.boolean().optional(),
    userId: z.string().optional(),
  }),
  content: z.string(),
  status: commentStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  likes: z.number().optional(),
})

// Newsletter subscriber status
export const subscriberStatusSchema = z.enum([
  'pending', 'confirmed', 'unsubscribed'
])

// Newsletter subscriber schema
export const newsletterSubscriberSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  status: subscriberStatusSchema,
  subscribedAt: z.string(),
  confirmedAt: z.string().optional(),
  unsubscribedAt: z.string().optional(),
  tags: z.array(z.string()).optional(),
  preferences: z.object({
    frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
    categories: z.array(z.string()).optional(),
  }).optional(),
})

// Blog config schema
export const blogConfigSchema = z.object({
  postsPerPage: z.number().default(10),
  enableComments: z.boolean().default(true),
  moderateComments: z.boolean().default(true),
  enableNewsletter: z.boolean().default(false),
  enableRss: z.boolean().default(true),
  rssTitle: z.string().optional(),
  defaultCategory: z.string().optional(),
  featuredPostsCount: z.number().default(3),
  relatedPostsCount: z.number().default(4),
  showReadTime: z.boolean().default(true),
  showViewCount: z.boolean().default(false),
  showAuthor: z.boolean().default(true),
  dateFormat: z.string().default('MMMM dd, yyyy'),
})
