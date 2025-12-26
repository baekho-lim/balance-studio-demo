import {
  ArtworkSchema,
  ArtworksArraySchema,
  ArtistSchema,
  ChaptersArraySchema,
  SiteSettingsSchema,
  type Artwork,
  type Artist,
  type Chapter,
  type SiteSettings,
} from './schemas';

import artworksData from '@/data/artworks.json';
import artistData from '@/data/artist.json';
import chaptersData from '@/data/chapters.json';
import siteSettingsData from '@/data/site-settings.json';

// Validation results cache
let validationCache: {
  artworks?: Artwork[];
  artist?: Artist;
  chapters?: Chapter[];
  siteSettings?: SiteSettings;
} = {};

// Error logging helper
function logValidationError(dataType: string, error: unknown) {
  console.error(`[Data Validation Error] ${dataType}:`, error);
  if (process.env.NODE_ENV === 'development') {
    throw error;
  }
}

/**
 * Get validated artworks data
 */
export function getArtworks(): Artwork[] {
  if (validationCache.artworks) {
    return validationCache.artworks;
  }

  try {
    const validated = ArtworksArraySchema.parse(artworksData);
    validationCache.artworks = validated;
    return validated;
  } catch (error) {
    logValidationError('artworks.json', error);
    // Fallback to raw data in production (graceful degradation)
    return artworksData as Artwork[];
  }
}

/**
 * Get validated artist data
 */
export function getArtist(): Artist {
  if (validationCache.artist) {
    return validationCache.artist;
  }

  try {
    const validated = ArtistSchema.parse(artistData);
    validationCache.artist = validated;
    return validated;
  } catch (error) {
    logValidationError('artist.json', error);
    return artistData as Artist;
  }
}

/**
 * Get validated chapters data
 */
export function getChapters(): Chapter[] {
  if (validationCache.chapters) {
    return validationCache.chapters;
  }

  try {
    const validated = ChaptersArraySchema.parse(chaptersData);
    validationCache.chapters = validated;
    return validated;
  } catch (error) {
    logValidationError('chapters.json', error);
    return chaptersData as Chapter[];
  }
}

/**
 * Get validated site settings
 */
export function getSiteSettings(): SiteSettings {
  if (validationCache.siteSettings) {
    return validationCache.siteSettings;
  }

  try {
    const validated = SiteSettingsSchema.parse(siteSettingsData);
    validationCache.siteSettings = validated;
    return validated;
  } catch (error) {
    logValidationError('site-settings.json', error);
    return siteSettingsData as SiteSettings;
  }
}

/**
 * Get a single artwork by ID
 */
export function getArtworkById(id: string): Artwork | undefined {
  const artworks = getArtworks();
  return artworks.find((artwork) => artwork.id === id);
}

/**
 * Get artworks by chapter
 */
export function getArtworksByChapter(chapterId: string): Artwork[] {
  const artworks = getArtworks();
  return artworks.filter((artwork) => artwork.chapter === chapterId);
}

/**
 * Clear validation cache (useful for testing or hot reloading)
 */
export function clearValidationCache() {
  validationCache = {};
}

/**
 * Validate all data files (useful for build-time checks)
 * Returns true if all validations pass, throws on first error
 */
export function validateAllData(): boolean {
  ArtworksArraySchema.parse(artworksData);
  ArtistSchema.parse(artistData);
  ChaptersArraySchema.parse(chaptersData);
  SiteSettingsSchema.parse(siteSettingsData);
  return true;
}
