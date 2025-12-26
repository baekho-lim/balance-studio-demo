/**
 * 갤러리/아티스트 설정 중앙화
 * 모든 하드코딩된 값을 config.json에서 로드
 */

import configData from '@/data/config.json';
import { LocaleCode, MultilingualText } from '@/types';

// Config 타입 정의
export interface GalleryConfig {
  gallery: {
    id: string;
    name: MultilingualText;
    domain: string;
    tagline: MultilingualText;
    description: MultilingualText;
  };
  artist: {
    name: MultilingualText;
    nameWithBirth: MultilingualText;
    birthYear: number;
    nationality: string;
    birthPlace: string;
  };
  contact: {
    email: string;
    instagram: {
      handle: string;
      url: string;
    };
    website: string;
  };
  branding: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    fonts: {
      serif: string;
      sans: string;
    };
  };
  locales: {
    default: LocaleCode;
    supported: LocaleCode[];
    priority: {
      P0: LocaleCode[];
      P1: LocaleCode[];
      P2: LocaleCode[];
    };
  };
  seo: {
    siteName: string;
    titleTemplate: string;
    defaultImage: string;
  };
  meta: {
    version: string;
    lastUpdated: string;
  };
}

// 타입 캐스팅하여 export
export const config = configData as GalleryConfig;

// 편의 함수들
export function getArtistName(locale: LocaleCode = 'en'): string {
  return config.artist.name[locale] || config.artist.name.en;
}

export function getGalleryName(locale: LocaleCode = 'en'): string {
  return config.gallery.name[locale] || config.gallery.name.en;
}

export function getTagline(locale: LocaleCode = 'en'): string {
  return config.gallery.tagline[locale] || config.gallery.tagline.en;
}

export function getDomain(): string {
  return config.gallery.domain;
}

export function getFullUrl(path: string = ''): string {
  return `https://${config.gallery.domain}${path}`;
}

export function getContactEmail(): string {
  return config.contact.email;
}

export function getInstagramHandle(): string {
  return config.contact.instagram.handle;
}

export function getInstagramUrl(): string {
  return config.contact.instagram.url;
}

export function getSupportedLocales(): LocaleCode[] {
  return config.locales.supported;
}

export function getDefaultLocale(): LocaleCode {
  return config.locales.default;
}

// SEO 헬퍼
export function getSeoTitle(pageTitle?: string): string {
  if (!pageTitle) return config.seo.siteName;
  return config.seo.titleTemplate.replace('%s', pageTitle);
}

export default config;
