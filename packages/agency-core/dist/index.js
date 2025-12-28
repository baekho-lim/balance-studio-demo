"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  THEME_PRESETS: () => THEME_PRESETS,
  articleEntitySchema: () => articleEntitySchema,
  authorRoleSchema: () => authorRoleSchema,
  authorSchema: () => authorSchema,
  baseEntitySchema: () => baseEntitySchema,
  blogConfigSchema: () => blogConfigSchema,
  blogPostSchema: () => blogPostSchema,
  blogSeoSchema: () => blogSeoSchema,
  blogStatusSchema: () => blogStatusSchema,
  categorySchema: () => categorySchema,
  commentSchema: () => commentSchema,
  commentStatusSchema: () => commentStatusSchema,
  createDatedSlug: () => createDatedSlug,
  createMultilingualText: () => createMultilingualText,
  entityStatusSchema: () => entityStatusSchema,
  entityToSchemaMap: () => entityToSchemaMap,
  entityTypeSchema: () => entityTypeSchema,
  eventEntitySchema: () => eventEntitySchema,
  extractIdFromSlug: () => extractIdFromSlug,
  formatDate: () => formatDate,
  formatDateRange: () => formatDateRange,
  formatDateShort: () => formatDateShort,
  formatRelativeTime: () => formatRelativeTime,
  formatTime: () => formatTime,
  generateUniqueSlug: () => generateUniqueSlug,
  getAllLocales: () => getAllLocales,
  getLocaleDisplayName: () => getLocaleDisplayName,
  getLocalePriority: () => getLocalePriority,
  getLocalesByPriority: () => getLocalesByPriority,
  getText: () => getText,
  imageSetSchema: () => imageSetSchema,
  isArticleEntity: () => isArticleEntity,
  isCompleteMultilingualText: () => isCompleteMultilingualText,
  isEventEntity: () => isEventEntity,
  isFuture: () => isFuture,
  isLocalBusinessEntity: () => isLocalBusinessEntity,
  isLocaleSupported: () => isLocaleSupported,
  isPast: () => isPast,
  isPersonEntity: () => isPersonEntity,
  isProductEntity: () => isProductEntity,
  isServiceEntity: () => isServiceEntity,
  isToday: () => isToday,
  isValidSlug: () => isValidSlug,
  localBusinessEntitySchema: () => localBusinessEntitySchema,
  localeCodeSchema: () => localeCodeSchema,
  mergeMultilingualText: () => mergeMultilingualText,
  multilingualTextSchema: () => multilingualTextSchema,
  newsletterSubscriberSchema: () => newsletterSubscriberSchema,
  personEntitySchema: () => personEntitySchema,
  slugify: () => slugify,
  subscriberStatusSchema: () => subscriberStatusSchema,
  tagSchema: () => tagSchema,
  toISODateString: () => toISODateString,
  visibilitySchema: () => visibilitySchema
});
module.exports = __toCommonJS(index_exports);

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
var import_zod = require("zod");
var localeCodeSchema = import_zod.z.enum([
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
var multilingualTextSchema = import_zod.z.object({
  en: import_zod.z.string(),
  ko: import_zod.z.string(),
  vi: import_zod.z.string().optional(),
  ja: import_zod.z.string().optional(),
  "zh-CN": import_zod.z.string().optional(),
  ms: import_zod.z.string().optional(),
  id: import_zod.z.string().optional(),
  de: import_zod.z.string().optional(),
  fr: import_zod.z.string().optional(),
  es: import_zod.z.string().optional(),
  ar: import_zod.z.string().optional()
});
var entityTypeSchema = import_zod.z.enum([
  "Person",
  "LocalBusiness",
  "Product",
  "Service",
  "Event",
  "Article",
  "Organization",
  "Place"
]);
var entityStatusSchema = import_zod.z.enum([
  "draft",
  "review",
  "scheduled",
  "published",
  "archived"
]);
var imageSetSchema = import_zod.z.object({
  thumbnail: import_zod.z.string().optional(),
  full: import_zod.z.string().optional(),
  hero: import_zod.z.string().optional(),
  og: import_zod.z.string().optional(),
  alt: import_zod.z.string().optional(),
  width: import_zod.z.number().optional(),
  height: import_zod.z.number().optional()
});
var baseEntitySchema = import_zod.z.object({
  id: import_zod.z.string(),
  type: entityTypeSchema,
  slug: import_zod.z.string(),
  name: multilingualTextSchema,
  description: multilingualTextSchema.optional(),
  images: imageSetSchema.optional(),
  status: entityStatusSchema,
  createdAt: import_zod.z.string(),
  updatedAt: import_zod.z.string(),
  publishedAt: import_zod.z.string().optional(),
  order: import_zod.z.number().optional(),
  featured: import_zod.z.boolean().optional(),
  tags: import_zod.z.array(import_zod.z.string()).optional()
});
var personEntitySchema = baseEntitySchema.extend({
  type: import_zod.z.literal("Person"),
  birthYear: import_zod.z.number().optional(),
  nationality: import_zod.z.string().optional(),
  birthPlace: import_zod.z.string().optional(),
  title: multilingualTextSchema.optional(),
  credentials: import_zod.z.array(import_zod.z.string()).optional(),
  specialties: import_zod.z.array(import_zod.z.string()).optional(),
  contact: import_zod.z.object({
    email: import_zod.z.string().email().optional(),
    phone: import_zod.z.string().optional(),
    website: import_zod.z.string().url().optional()
  }).optional(),
  social: import_zod.z.object({
    instagram: import_zod.z.string().optional(),
    facebook: import_zod.z.string().optional(),
    twitter: import_zod.z.string().optional(),
    linkedin: import_zod.z.string().optional(),
    youtube: import_zod.z.string().optional()
  }).optional(),
  externalIds: import_zod.z.object({
    wikidata: import_zod.z.string().optional(),
    viaf: import_zod.z.string().optional(),
    ulan: import_zod.z.string().optional(),
    isni: import_zod.z.string().optional()
  }).optional()
});
var localBusinessEntitySchema = baseEntitySchema.extend({
  type: import_zod.z.literal("LocalBusiness"),
  businessType: import_zod.z.enum([
    "Restaurant",
    "HealthAndBeautyBusiness",
    "Store",
    "ProfessionalService",
    "LodgingBusiness"
  ]),
  address: import_zod.z.object({
    street: import_zod.z.string().optional(),
    city: import_zod.z.string(),
    state: import_zod.z.string().optional(),
    postalCode: import_zod.z.string().optional(),
    country: import_zod.z.string(),
    countryCode: import_zod.z.string()
  }),
  geo: import_zod.z.object({
    lat: import_zod.z.number(),
    lng: import_zod.z.number()
  }).optional(),
  openingHours: import_zod.z.array(import_zod.z.object({
    dayOfWeek: import_zod.z.array(import_zod.z.string()),
    opens: import_zod.z.string(),
    closes: import_zod.z.string()
  })).optional(),
  phone: import_zod.z.string().optional(),
  email: import_zod.z.string().email().optional(),
  website: import_zod.z.string().url().optional(),
  priceRange: import_zod.z.enum(["$", "$$", "$$$", "$$$$"]).optional()
});
var eventEntitySchema = baseEntitySchema.extend({
  type: import_zod.z.literal("Event"),
  eventType: import_zod.z.enum(["Exhibition", "Workshop", "Performance", "ClassSession", "Opening"]),
  startDate: import_zod.z.string(),
  endDate: import_zod.z.string().optional(),
  venue: import_zod.z.string().optional(),
  venueAddress: import_zod.z.string().optional(),
  city: import_zod.z.string().optional(),
  country: import_zod.z.string().optional(),
  countryCode: import_zod.z.string().optional(),
  admission: import_zod.z.enum(["free", "paid"]).optional(),
  admissionFee: import_zod.z.string().optional()
});
var articleEntitySchema = baseEntitySchema.extend({
  type: import_zod.z.literal("Article"),
  articleType: import_zod.z.enum(["BlogPost", "NewsArticle", "PressRelease", "Interview", "Review"]),
  content: multilingualTextSchema,
  excerpt: multilingualTextSchema.optional(),
  author: import_zod.z.string().optional(),
  publishDate: import_zod.z.string(),
  category: import_zod.z.string().optional(),
  readTime: import_zod.z.number().optional()
});

// src/schemas/blog.schema.ts
var import_zod2 = require("zod");
var blogStatusSchema = import_zod2.z.enum([
  "draft",
  "review",
  "scheduled",
  "published",
  "archived"
]);
var visibilitySchema = import_zod2.z.enum([
  "public",
  "private",
  "password-protected",
  "members-only"
]);
var authorRoleSchema = import_zod2.z.enum([
  "admin",
  "editor",
  "author",
  "contributor",
  "viewer"
]);
var authorSchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  name: import_zod2.z.string(),
  email: import_zod2.z.string().email(),
  avatar: import_zod2.z.string().optional(),
  bio: multilingualTextSchema.optional(),
  role: authorRoleSchema,
  social: import_zod2.z.object({
    twitter: import_zod2.z.string().optional(),
    linkedin: import_zod2.z.string().optional(),
    website: import_zod2.z.string().url().optional()
  }).optional()
});
var categorySchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  slug: import_zod2.z.string(),
  name: multilingualTextSchema,
  description: multilingualTextSchema.optional(),
  parentId: import_zod2.z.string().optional(),
  order: import_zod2.z.number().optional(),
  image: import_zod2.z.string().optional()
});
var tagSchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  slug: import_zod2.z.string(),
  name: multilingualTextSchema,
  count: import_zod2.z.number().optional()
});
var blogSeoSchema = import_zod2.z.object({
  title: import_zod2.z.string().optional(),
  description: import_zod2.z.string().optional(),
  keywords: import_zod2.z.array(import_zod2.z.string()).optional(),
  ogImage: import_zod2.z.string().optional(),
  canonicalUrl: import_zod2.z.string().url().optional(),
  noIndex: import_zod2.z.boolean().optional()
});
var blogPostSchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  slug: import_zod2.z.string(),
  title: multilingualTextSchema,
  content: multilingualTextSchema,
  excerpt: multilingualTextSchema.optional(),
  // Organization
  category: import_zod2.z.string().optional(),
  categories: import_zod2.z.array(import_zod2.z.string()).optional(),
  tags: import_zod2.z.array(import_zod2.z.string()).optional(),
  // Authorship
  author: import_zod2.z.string(),
  coAuthors: import_zod2.z.array(import_zod2.z.string()).optional(),
  // Publishing
  status: blogStatusSchema,
  visibility: visibilitySchema,
  password: import_zod2.z.string().optional(),
  publishDate: import_zod2.z.string().optional(),
  scheduledDate: import_zod2.z.string().optional(),
  // SEO
  seo: blogSeoSchema.optional(),
  // Media
  images: imageSetSchema.optional(),
  featuredImage: import_zod2.z.string().optional(),
  // Analytics
  viewCount: import_zod2.z.number().optional(),
  readTime: import_zod2.z.number().optional(),
  likeCount: import_zod2.z.number().optional(),
  // Engagement
  commentsEnabled: import_zod2.z.boolean().optional(),
  commentCount: import_zod2.z.number().optional(),
  // Newsletter
  sentToNewsletter: import_zod2.z.boolean().optional(),
  newsletterSentDate: import_zod2.z.string().optional(),
  // Metadata
  createdAt: import_zod2.z.string(),
  updatedAt: import_zod2.z.string(),
  featured: import_zod2.z.boolean().optional(),
  pinned: import_zod2.z.boolean().optional(),
  order: import_zod2.z.number().optional()
});
var commentStatusSchema = import_zod2.z.enum([
  "pending",
  "approved",
  "spam",
  "trash"
]);
var commentSchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  postId: import_zod2.z.string(),
  parentId: import_zod2.z.string().optional(),
  author: import_zod2.z.object({
    name: import_zod2.z.string(),
    email: import_zod2.z.string().email(),
    website: import_zod2.z.string().url().optional(),
    avatar: import_zod2.z.string().optional(),
    isRegistered: import_zod2.z.boolean().optional(),
    userId: import_zod2.z.string().optional()
  }),
  content: import_zod2.z.string(),
  status: commentStatusSchema,
  createdAt: import_zod2.z.string(),
  updatedAt: import_zod2.z.string().optional(),
  likes: import_zod2.z.number().optional()
});
var subscriberStatusSchema = import_zod2.z.enum([
  "pending",
  "confirmed",
  "unsubscribed"
]);
var newsletterSubscriberSchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  email: import_zod2.z.string().email(),
  name: import_zod2.z.string().optional(),
  status: subscriberStatusSchema,
  subscribedAt: import_zod2.z.string(),
  confirmedAt: import_zod2.z.string().optional(),
  unsubscribedAt: import_zod2.z.string().optional(),
  tags: import_zod2.z.array(import_zod2.z.string()).optional(),
  preferences: import_zod2.z.object({
    frequency: import_zod2.z.enum(["daily", "weekly", "monthly"]).optional(),
    categories: import_zod2.z.array(import_zod2.z.string()).optional()
  }).optional()
});
var blogConfigSchema = import_zod2.z.object({
  postsPerPage: import_zod2.z.number().default(10),
  enableComments: import_zod2.z.boolean().default(true),
  moderateComments: import_zod2.z.boolean().default(true),
  enableNewsletter: import_zod2.z.boolean().default(false),
  enableRss: import_zod2.z.boolean().default(true),
  rssTitle: import_zod2.z.string().optional(),
  defaultCategory: import_zod2.z.string().optional(),
  featuredPostsCount: import_zod2.z.number().default(3),
  relatedPostsCount: import_zod2.z.number().default(4),
  showReadTime: import_zod2.z.boolean().default(true),
  showViewCount: import_zod2.z.boolean().default(false),
  showAuthor: import_zod2.z.boolean().default(true),
  dateFormat: import_zod2.z.string().default("MMMM dd, yyyy")
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
