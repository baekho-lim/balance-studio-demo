import { MetadataRoute } from 'next';
import { Exhibition, NewsArticle } from '@/types';
import exhibitionsData from '@/data/exhibitions.json';
import newsData from '@/data/news.json';
import { getFullUrl } from '@/lib/config';

const baseUrl = getFullUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const exhibitions = exhibitionsData as Exhibition[];
  const articles = newsData as NewsArticle[];

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/exhibitions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/story`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/works`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/partnership`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/postcards`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Exhibition pages
  const exhibitionPages: MetadataRoute.Sitemap = exhibitions.map(exhibition => ({
    url: `${baseUrl}/exhibitions/${exhibition.id}`,
    lastModified: new Date(exhibition.startDate),
    changeFrequency: 'monthly' as const,
    priority: exhibition.featured ? 0.8 : 0.6,
  }));

  // News article pages
  const newsPages: MetadataRoute.Sitemap = articles.map(article => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(article.publishDate),
    changeFrequency: 'monthly' as const,
    priority: article.featured ? 0.8 : 0.6,
  }));

  return [...staticPages, ...exhibitionPages, ...newsPages];
}
