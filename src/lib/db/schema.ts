/**
 * Drizzle ORM Schema
 * Database schema for the agency platform
 */

import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  primaryKey,
  pgEnum,
} from 'drizzle-orm/pg-core'
import type { AdapterAccountType } from 'next-auth/adapters'

// ============================================
// ENUMS
// ============================================

export const userRoleEnum = pgEnum('user_role', ['admin', 'editor', 'author', 'viewer'])
export const entityStatusEnum = pgEnum('entity_status', ['draft', 'review', 'published', 'archived'])
export const blogStatusEnum = pgEnum('blog_status', ['draft', 'review', 'scheduled', 'published', 'archived'])

// ============================================
// AUTH TABLES (NextAuth.js)
// ============================================

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  role: userRoleEnum('role').default('viewer').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
})

export const accounts = pgTable(
  'accounts',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
)

export const sessions = pgTable('sessions', {
  sessionToken: text('session_token').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable(
  'verification_tokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
)

// ============================================
// CONTENT TABLES
// ============================================

// Authors (extends users for content creation)
export const authors = pgTable('authors', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  avatar: text('avatar'),
  bio: jsonb('bio'), // MultilingualText
  role: userRoleEnum('role').default('author').notNull(),
  social: jsonb('social'), // { twitter?, linkedin?, website? }
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
})

// Categories
export const categories = pgTable('categories', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text('slug').unique().notNull(),
  name: jsonb('name').notNull(), // MultilingualText
  description: jsonb('description'), // MultilingualText
  parentId: text('parent_id'), // Self-reference, managed at application level
  order: integer('order').default(0),
  image: text('image'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
})

// Tags
export const tags = pgTable('tags', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text('slug').unique().notNull(),
  name: jsonb('name').notNull(), // MultilingualText
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
})

// Blog Posts
export const blogPosts = pgTable('blog_posts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text('slug').unique().notNull(),
  title: jsonb('title').notNull(), // MultilingualText
  content: jsonb('content').notNull(), // MultilingualText (Markdown)
  excerpt: jsonb('excerpt'), // MultilingualText

  // Organization
  categoryId: text('category_id').references(() => categories.id),

  // Authorship
  authorId: text('author_id')
    .notNull()
    .references(() => authors.id),

  // Publishing
  status: blogStatusEnum('status').default('draft').notNull(),
  publishedAt: timestamp('published_at', { mode: 'date' }),
  scheduledAt: timestamp('scheduled_at', { mode: 'date' }),

  // SEO
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  seoKeywords: jsonb('seo_keywords'), // string[]
  ogImage: text('og_image'),

  // Media
  featuredImage: text('featured_image'),
  images: jsonb('images'), // ImageSet

  // Analytics
  viewCount: integer('view_count').default(0),
  readTime: integer('read_time'), // in minutes
  likeCount: integer('like_count').default(0),

  // Engagement
  commentsEnabled: boolean('comments_enabled').default(true),
  commentCount: integer('comment_count').default(0),

  // Flags
  featured: boolean('featured').default(false),
  pinned: boolean('pinned').default(false),

  // Timestamps
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
})

// Blog Post Tags (many-to-many)
export const blogPostTags = pgTable(
  'blog_post_tags',
  {
    postId: text('post_id')
      .notNull()
      .references(() => blogPosts.id, { onDelete: 'cascade' }),
    tagId: text('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
  },
  (t) => [primaryKey({ columns: [t.postId, t.tagId] })]
)

// Comment status enum
export const commentStatusEnum = pgEnum('comment_status', ['pending', 'approved', 'spam', 'trash'])

// Comments
export const comments = pgTable('comments', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  postId: text('post_id')
    .notNull()
    .references(() => blogPosts.id, { onDelete: 'cascade' }),
  parentId: text('parent_id'), // Self-reference for replies, managed at application level

  // Author info (can be guest or registered user)
  authorName: text('author_name').notNull(),
  authorEmail: text('author_email').notNull(),
  authorWebsite: text('author_website'),
  authorAvatar: text('author_avatar'),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),

  content: text('content').notNull(),
  status: commentStatusEnum('status')
    .default('pending')
    .notNull(),

  likes: integer('likes').default(0),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
})

// Subscriber status enum
export const subscriberStatusEnum = pgEnum('subscriber_status', ['pending', 'confirmed', 'unsubscribed'])

// Newsletter Subscribers
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text('email').unique().notNull(),
  name: text('name'),
  status: subscriberStatusEnum('status')
    .default('pending')
    .notNull(),

  subscribedAt: timestamp('subscribed_at', { mode: 'date' }).defaultNow().notNull(),
  confirmedAt: timestamp('confirmed_at', { mode: 'date' }),
  unsubscribedAt: timestamp('unsubscribed_at', { mode: 'date' }),

  tags: jsonb('tags'), // string[]
  preferences: jsonb('preferences'), // { frequency?, categories? }
})

// ============================================
// EXHIBITIONS (Migrated from JSON)
// ============================================

export const exhibitions = pgTable('exhibitions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text('slug').unique().notNull(),
  title: jsonb('title').notNull(), // MultilingualText
  description: jsonb('description'), // MultilingualText

  type: text('type').notNull(), // 'solo' | 'group'
  status: text('status').notNull(), // 'current' | 'upcoming' | 'past'
  featured: boolean('featured').default(false),

  startDate: text('start_date').notNull(),
  endDate: text('end_date').notNull(),

  venue: jsonb('venue').notNull(), // { name, address, city, country, coordinates? }

  images: jsonb('images'), // { main, gallery[] }
  artworkIds: jsonb('artwork_ids'), // string[]

  externalUrl: text('external_url'),
  organizer: jsonb('organizer'), // { name, url?, sameAs? }

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
})

// ============================================
// NEWS (Migrated from JSON)
// ============================================

export const news = pgTable('news', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text('slug').unique().notNull(),
  title: jsonb('title').notNull(), // MultilingualText
  content: jsonb('content').notNull(), // MultilingualText
  excerpt: jsonb('excerpt'), // MultilingualText

  type: text('type').notNull(), // 'press-release' | 'news' | 'announcement'

  publishDate: text('publish_date').notNull(),

  image: text('image'),
  tags: jsonb('tags'), // string[]
  relatedExhibitionId: text('related_exhibition_id')
    .references(() => exhibitions.id),

  externalLinks: jsonb('external_links'), // { label, url, type }[]

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
})

// ============================================
// FAQ (Migrated from JSON)
// ============================================

export const faqs = pgTable('faqs', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  question: jsonb('question').notNull(), // MultilingualText
  answer: jsonb('answer').notNull(), // MultilingualText
  category: text('category'),
  order: integer('order').default(0),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
})

// ============================================
// TYPE EXPORTS
// ============================================

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Author = typeof authors.$inferSelect
export type NewAuthor = typeof authors.$inferInsert

export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert

export type Tag = typeof tags.$inferSelect
export type NewTag = typeof tags.$inferInsert

export type BlogPost = typeof blogPosts.$inferSelect
export type NewBlogPost = typeof blogPosts.$inferInsert

export type Comment = typeof comments.$inferSelect
export type NewComment = typeof comments.$inferInsert

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect
export type NewNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert

export type Exhibition = typeof exhibitions.$inferSelect
export type NewExhibition = typeof exhibitions.$inferInsert

export type News = typeof news.$inferSelect
export type NewNews = typeof news.$inferInsert

export type FAQ = typeof faqs.$inferSelect
export type NewFAQ = typeof faqs.$inferInsert
