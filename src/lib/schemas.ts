import { z } from 'zod';

// Chapter slug enum
export const ChapterSlugSchema = z.enum([
  'secret-garden',
  'effortless-spring',
  'desert-stories',
  'waters-of-time',
]);

// Chapter schema
export const ChapterSchema = z.object({
  id: ChapterSlugSchema,
  title: z.string().min(1),
  titleKr: z.string().min(1),
  question: z.string(),
  questionKr: z.string(),
  description: z.string(),
  descriptionKr: z.string(),
  coverImage: z.string(),
  color: z.string(),
});

// Artwork schema
export const ArtworkSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  titleKr: z.string().optional(),
  year: z.number().int().min(1900).max(2100),
  chapter: ChapterSlugSchema,
  medium: z.string().min(1),
  mediumKr: z.string().optional(),
  dimensions: z.string().optional(),
  question: z.string().optional(),
  questionKr: z.string().optional(),
  questionVi: z.string().optional(),
  questionMs: z.string().optional(),
  questionId: z.string().optional(),
  description: z.string().optional(),
  descriptionKr: z.string().optional(),
  images: z.object({
    thumbnail: z.string().min(1),
    full: z.string().min(1),
    alt: z.string().min(1),
  }),
  order: z.number().int().min(0),
  exhibitionNumber: z.string().nullable().optional(),
  imageWidth: z.number().positive().optional(),
  imageHeight: z.number().positive().optional(),
  sizeCategory: z.enum(['small', 'medium', 'large']).optional(),
  orientation: z.enum(['portrait', 'landscape', 'square']).optional(),
  hasArtistNote: z.boolean().optional(),
});

// Artist schema
export const ArtistSchema = z.object({
  name: z.string().min(1),
  nameKr: z.string().min(1),
  education: z.array(
    z.object({
      degree: z.string(),
      institution: z.string(),
      year: z.union([z.number(), z.string()]),
    })
  ),
  statement: z.object({
    kr: z.string(),
    en: z.string(),
  }),
  bio: z.object({
    kr: z.string(),
    en: z.string(),
  }),
  profileImage: z.string(),
  contact: z.object({
    email: z.string().email().optional(),
    instagram: z.string().optional(),
    website: z.string().optional(),
  }),
});

// Exhibition schema
export const ExhibitionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  venue: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  type: z.enum(['solo', 'group']),
  description: z.string().optional(),
});

// Site settings schema
export const SiteSettingsSchema = z.object({
  homeHero: z.object({
    artworkId: z.string(),
    imagePath: z.string(),
    tagline: z.object({
      en: z.string(),
      kr: z.string(),
    }),
  }),
  catalogCover: z.object({
    artworkId: z.string(),
    imagePath: z.string(),
  }),
  meta: z.object({
    lastUpdated: z.string(),
    version: z.string(),
  }),
});

// Array schemas for collections
export const ArtworksArraySchema = z.array(ArtworkSchema);
export const ChaptersArraySchema = z.array(ChapterSchema);
export const ExhibitionsArraySchema = z.array(ExhibitionSchema);

// Type exports (inferred from schemas)
export type ChapterSlug = z.infer<typeof ChapterSlugSchema>;
export type Chapter = z.infer<typeof ChapterSchema>;
export type Artwork = z.infer<typeof ArtworkSchema>;
export type Artist = z.infer<typeof ArtistSchema>;
export type Exhibition = z.infer<typeof ExhibitionSchema>;
export type SiteSettings = z.infer<typeof SiteSettingsSchema>;
