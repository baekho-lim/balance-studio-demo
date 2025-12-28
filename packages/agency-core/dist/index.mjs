// src/types/entity.ts
function isPersonEntity(entity) {
  return entity.type === "Person";
}
function isLocalBusinessEntity(entity) {
  return entity.type === "LocalBusiness";
}
function isProductEntity(entity) {
  return entity.type === "Product";
}
function isServiceEntity(entity) {
  return entity.type === "Service";
}
function isEventEntity(entity) {
  return entity.type === "Event";
}
function isArticleEntity(entity) {
  return entity.type === "Article";
}

// src/types/seo.ts
var entityToSchemaMap = {
  Person: ["Person"],
  LocalBusiness: ["LocalBusiness", "Restaurant", "HealthAndBeautyBusiness", "Store"],
  Product: ["Product", "VisualArtwork", "MenuItem"],
  Service: ["Service", "Course"],
  Event: ["Event", "ExhibitionEvent", "BusinessEvent"],
  Article: ["Article", "NewsArticle", "BlogPosting"],
  Organization: ["Organization", "GovernmentOrganization", "EducationalOrganization"],
  Place: ["Place"]
};

// src/types/theme.ts
var THEME_PRESETS = [
  "minimal",
  "bold",
  "elegant",
  "modern",
  "classic"
];

// src/schemas/entity.schema.ts
import { z } from "zod";
var localeCodeSchema = z.enum([
  "en",
  "ko",
  "vi",
  "ja",
  "zh-CN",
  "ms",
  "id",
  "de",
  "fr",
  "es",
  "ar"
]);
var multilingualTextSchema = z.object({
  en: z.string(),
  ko: z.string(),
  vi: z.string().optional(),
  ja: z.string().optional(),
  "zh-CN": z.string().optional(),
  ms: z.string().optional(),
  id: z.string().optional(),
  de: z.string().optional(),
  fr: z.string().optional(),
  es: z.string().optional(),
  ar: z.string().optional()
});
var entityTypeSchema = z.enum([
  "Person",
  "LocalBusiness",
  "Product",
  "Service",
  "Event",
  "Article",
  "Organization",
  "Place"
]);
var entityStatusSchema = z.enum([
  "draft",
  "review",
  "scheduled",
  "published",
  "archived"
]);
var imageSetSchema = z.object({
  thumbnail: z.string().optional(),
  full: z.string().optional(),
  hero: z.string().optional(),
  og: z.string().optional(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional()
});
var baseEntitySchema = z.object({
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
  tags: z.array(z.string()).optional()
});
var personEntitySchema = baseEntitySchema.extend({
  type: z.literal("Person"),
  birthYear: z.number().optional(),
  nationality: z.string().optional(),
  birthPlace: z.string().optional(),
  title: multilingualTextSchema.optional(),
  credentials: z.array(z.string()).optional(),
  specialties: z.array(z.string()).optional(),
  contact: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    website: z.string().url().optional()
  }).optional(),
  social: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional()
  }).optional(),
  externalIds: z.object({
    wikidata: z.string().optional(),
    viaf: z.string().optional(),
    ulan: z.string().optional(),
    isni: z.string().optional()
  }).optional()
});
var localBusinessEntitySchema = baseEntitySchema.extend({
  type: z.literal("LocalBusiness"),
  businessType: z.enum([
    "Restaurant",
    "HealthAndBeautyBusiness",
    "Store",
    "ProfessionalService",
    "LodgingBusiness"
  ]),
  address: z.object({
    street: z.string().optional(),
    city: z.string(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string(),
    countryCode: z.string()
  }),
  geo: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional(),
  openingHours: z.array(z.object({
    dayOfWeek: z.array(z.string()),
    opens: z.string(),
    closes: z.string()
  })).optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  priceRange: z.enum(["$", "$$", "$$$", "$$$$"]).optional()
});
var eventEntitySchema = baseEntitySchema.extend({
  type: z.literal("Event"),
  eventType: z.enum(["Exhibition", "Workshop", "Performance", "ClassSession", "Opening"]),
  startDate: z.string(),
  endDate: z.string().optional(),
  venue: z.string().optional(),
  venueAddress: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  countryCode: z.string().optional(),
  admission: z.enum(["free", "paid"]).optional(),
  admissionFee: z.string().optional()
});
var articleEntitySchema = baseEntitySchema.extend({
  type: z.literal("Article"),
  articleType: z.enum(["BlogPost", "NewsArticle", "PressRelease", "Interview", "Review"]),
  content: multilingualTextSchema,
  excerpt: multilingualTextSchema.optional(),
  author: z.string().optional(),
  publishDate: z.string(),
  category: z.string().optional(),
  readTime: z.number().optional()
});

// src/schemas/blog.schema.ts
import { z as z2 } from "zod";
var blogStatusSchema = z2.enum([
  "draft",
  "review",
  "scheduled",
  "published",
  "archived"
]);
var visibilitySchema = z2.enum([
  "public",
  "private",
  "password-protected",
  "members-only"
]);
var authorRoleSchema = z2.enum([
  "admin",
  "editor",
  "author",
  "contributor",
  "viewer"
]);
var authorSchema = z2.object({
  id: z2.string(),
  name: z2.string(),
  email: z2.string().email(),
  avatar: z2.string().optional(),
  bio: multilingualTextSchema.optional(),
  role: authorRoleSchema,
  social: z2.object({
    twitter: z2.string().optional(),
    linkedin: z2.string().optional(),
    website: z2.string().url().optional()
  }).optional()
});
var categorySchema = z2.object({
  id: z2.string(),
  slug: z2.string(),
  name: multilingualTextSchema,
  description: multilingualTextSchema.optional(),
  parentId: z2.string().optional(),
  order: z2.number().optional(),
  image: z2.string().optional()
});
var tagSchema = z2.object({
  id: z2.string(),
  slug: z2.string(),
  name: multilingualTextSchema,
  count: z2.number().optional()
});
var blogSeoSchema = z2.object({
  title: z2.string().optional(),
  description: z2.string().optional(),
  keywords: z2.array(z2.string()).optional(),
  ogImage: z2.string().optional(),
  canonicalUrl: z2.string().url().optional(),
  noIndex: z2.boolean().optional()
});
var blogPostSchema = z2.object({
  id: z2.string(),
  slug: z2.string(),
  title: multilingualTextSchema,
  content: multilingualTextSchema,
  excerpt: multilingualTextSchema.optional(),
  // Organization
  category: z2.string().optional(),
  categories: z2.array(z2.string()).optional(),
  tags: z2.array(z2.string()).optional(),
  // Authorship
  author: z2.string(),
  coAuthors: z2.array(z2.string()).optional(),
  // Publishing
  status: blogStatusSchema,
  visibility: visibilitySchema,
  password: z2.string().optional(),
  publishDate: z2.string().optional(),
  scheduledDate: z2.string().optional(),
  // SEO
  seo: blogSeoSchema.optional(),
  // Media
  images: imageSetSchema.optional(),
  featuredImage: z2.string().optional(),
  // Analytics
  viewCount: z2.number().optional(),
  readTime: z2.number().optional(),
  likeCount: z2.number().optional(),
  // Engagement
  commentsEnabled: z2.boolean().optional(),
  commentCount: z2.number().optional(),
  // Newsletter
  sentToNewsletter: z2.boolean().optional(),
  newsletterSentDate: z2.string().optional(),
  // Metadata
  createdAt: z2.string(),
  updatedAt: z2.string(),
  featured: z2.boolean().optional(),
  pinned: z2.boolean().optional(),
  order: z2.number().optional()
});
var commentStatusSchema = z2.enum([
  "pending",
  "approved",
  "spam",
  "trash"
]);
var commentSchema = z2.object({
  id: z2.string(),
  postId: z2.string(),
  parentId: z2.string().optional(),
  author: z2.object({
    name: z2.string(),
    email: z2.string().email(),
    website: z2.string().url().optional(),
    avatar: z2.string().optional(),
    isRegistered: z2.boolean().optional(),
    userId: z2.string().optional()
  }),
  content: z2.string(),
  status: commentStatusSchema,
  createdAt: z2.string(),
  updatedAt: z2.string().optional(),
  likes: z2.number().optional()
});
var subscriberStatusSchema = z2.enum([
  "pending",
  "confirmed",
  "unsubscribed"
]);
var newsletterSubscriberSchema = z2.object({
  id: z2.string(),
  email: z2.string().email(),
  name: z2.string().optional(),
  status: subscriberStatusSchema,
  subscribedAt: z2.string(),
  confirmedAt: z2.string().optional(),
  unsubscribedAt: z2.string().optional(),
  tags: z2.array(z2.string()).optional(),
  preferences: z2.object({
    frequency: z2.enum(["daily", "weekly", "monthly"]).optional(),
    categories: z2.array(z2.string()).optional()
  }).optional()
});
var blogConfigSchema = z2.object({
  postsPerPage: z2.number().default(10),
  enableComments: z2.boolean().default(true),
  moderateComments: z2.boolean().default(true),
  enableNewsletter: z2.boolean().default(false),
  enableRss: z2.boolean().default(true),
  rssTitle: z2.string().optional(),
  defaultCategory: z2.string().optional(),
  featuredPostsCount: z2.number().default(3),
  relatedPostsCount: z2.number().default(4),
  showReadTime: z2.boolean().default(true),
  showViewCount: z2.boolean().default(false),
  showAuthor: z2.boolean().default(true),
  dateFormat: z2.string().default("MMMM dd, yyyy")
});

// src/utils/locale.ts
var LOCALE_PRIORITIES = {
  P0: ["en", "ko", "vi"],
  P1: ["ja", "zh-CN", "ms", "id"],
  P2: ["de", "fr", "es"],
  P3: ["ar"]
};
function getText(text, locale, fallbackLocale = "en") {
  if (!text) return "";
  if (typeof text === "string") return text;
  const value = text[locale];
  if (value) return value;
  const fallbackValue = text[fallbackLocale];
  if (fallbackValue) return fallbackValue;
  const enValue = text.en;
  if (enValue) return enValue;
  const firstValue = Object.values(text).find((v) => v);
  return firstValue || "";
}
function getLocalePriority(locale) {
  for (const [priority, locales] of Object.entries(LOCALE_PRIORITIES)) {
    if (locales.includes(locale)) {
      return priority;
    }
  }
  return "P3";
}
function getLocalesByPriority(priority) {
  return LOCALE_PRIORITIES[priority] || [];
}
function getAllLocales() {
  return Object.values(LOCALE_PRIORITIES).flat();
}
function isLocaleSupported(locale) {
  return getAllLocales().includes(locale);
}
function getLocaleDisplayName(locale) {
  const names = {
    en: "English",
    ko: "\uD55C\uAD6D\uC5B4",
    vi: "Ti\u1EBFng Vi\u1EC7t",
    ja: "\u65E5\u672C\u8A9E",
    "zh-CN": "\u7B80\u4F53\u4E2D\u6587",
    ms: "Bahasa Melayu",
    id: "Bahasa Indonesia",
    de: "Deutsch",
    fr: "Fran\xE7ais",
    es: "Espa\xF1ol",
    ar: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  };
  return names[locale] || locale;
}
function createMultilingualText(en, ko, others) {
  return {
    en,
    ko: ko || en,
    ...others
  };
}
function mergeMultilingualText(base, override) {
  return {
    ...base,
    ...override
  };
}
function isCompleteMultilingualText(text) {
  if (!text || typeof text !== "object") return false;
  const obj = text;
  return typeof obj.en === "string" && typeof obj.ko === "string";
}

// src/utils/slug.ts
function slugify(text) {
  return text.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").replace(/-+/g, "-");
}
function generateUniqueSlug(baseSlug, existingSlugs) {
  const slug = slugify(baseSlug);
  if (!existingSlugs.includes(slug)) {
    return slug;
  }
  let counter = 1;
  let uniqueSlug = `${slug}-${counter}`;
  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${slug}-${counter}`;
  }
  return uniqueSlug;
}
function isValidSlug(slug) {
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugPattern.test(slug);
}
function extractIdFromSlug(slug) {
  const match = slug.match(/-(\d+)$/);
  return match ? match[1] : null;
}
function createDatedSlug(title, date) {
  const dateStr = typeof date === "string" ? date.split("T")[0] : date.toISOString().split("T")[0];
  return `${slugify(title)}-${dateStr}`;
}

// src/utils/date.ts
var INTL_LOCALES = {
  en: "en-US",
  ko: "ko-KR",
  vi: "vi-VN",
  ja: "ja-JP",
  "zh-CN": "zh-CN",
  ms: "ms-MY",
  id: "id-ID",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES",
  ar: "ar-SA"
};
function formatDate(date, locale = "en", options) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const intlLocale = INTL_LOCALES[locale] || "en-US";
  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options
  };
  return new Intl.DateTimeFormat(intlLocale, defaultOptions).format(dateObj);
}
function formatDateShort(date, locale = "en") {
  return formatDate(date, locale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function toISODateString(date) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toISOString().split("T")[0];
}
function formatTime(time, locale = "en", options) {
  const [hours, minutes] = time.split(":").map(Number);
  const date = /* @__PURE__ */ new Date();
  date.setHours(hours, minutes, 0, 0);
  const intlLocale = INTL_LOCALES[locale] || "en-US";
  const defaultOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: locale === "en" || locale === "ko",
    ...options
  };
  return new Intl.DateTimeFormat(intlLocale, defaultOptions).format(date);
}
function formatRelativeTime(date, locale = "en") {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = /* @__PURE__ */ new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24));
  const intlLocale = INTL_LOCALES[locale] || "en-US";
  const rtf = new Intl.RelativeTimeFormat(intlLocale, { numeric: "auto" });
  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1e3 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1e3 * 60));
      return rtf.format(-diffMinutes, "minute");
    }
    return rtf.format(-diffHours, "hour");
  } else if (diffDays < 7) {
    return rtf.format(-diffDays, "day");
  } else if (diffDays < 30) {
    return rtf.format(-Math.floor(diffDays / 7), "week");
  } else if (diffDays < 365) {
    return rtf.format(-Math.floor(diffDays / 30), "month");
  } else {
    return rtf.format(-Math.floor(diffDays / 365), "year");
  }
}
function isPast(date) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.getTime() < Date.now();
}
function isFuture(date) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.getTime() > Date.now();
}
function isToday(date) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const today = /* @__PURE__ */ new Date();
  return dateObj.toDateString() === today.toDateString();
}
function formatDateRange(startDate, endDate, locale = "en") {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;
  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();
  if (sameMonth) {
    return `${formatDate(start, locale, { month: "short", day: "numeric" }).replace(/,.*/, "")}-${end.getDate()}, ${end.getFullYear()}`;
  } else if (sameYear) {
    return `${formatDate(start, locale, { month: "short", day: "numeric" }).replace(/,.*/, "")} - ${formatDate(end, locale, { month: "short", day: "numeric", year: "numeric" })}`;
  } else {
    return `${formatDateShort(start, locale)} - ${formatDateShort(end, locale)}`;
  }
}
export {
  THEME_PRESETS,
  articleEntitySchema,
  authorRoleSchema,
  authorSchema,
  baseEntitySchema,
  blogConfigSchema,
  blogPostSchema,
  blogSeoSchema,
  blogStatusSchema,
  categorySchema,
  commentSchema,
  commentStatusSchema,
  createDatedSlug,
  createMultilingualText,
  entityStatusSchema,
  entityToSchemaMap,
  entityTypeSchema,
  eventEntitySchema,
  extractIdFromSlug,
  formatDate,
  formatDateRange,
  formatDateShort,
  formatRelativeTime,
  formatTime,
  generateUniqueSlug,
  getAllLocales,
  getLocaleDisplayName,
  getLocalePriority,
  getLocalesByPriority,
  getText,
  imageSetSchema,
  isArticleEntity,
  isCompleteMultilingualText,
  isEventEntity,
  isFuture,
  isLocalBusinessEntity,
  isLocaleSupported,
  isPast,
  isPersonEntity,
  isProductEntity,
  isServiceEntity,
  isToday,
  isValidSlug,
  localBusinessEntitySchema,
  localeCodeSchema,
  mergeMultilingualText,
  multilingualTextSchema,
  newsletterSubscriberSchema,
  personEntitySchema,
  slugify,
  subscriberStatusSchema,
  tagSchema,
  toISODateString,
  visibilitySchema
};
