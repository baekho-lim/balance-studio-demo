import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NewsArticle } from '@/types';
import newsData from '@/data/news.json';
import { formatDate, getNewsTypeLabel, getLocalizedText } from '@/lib/i18n';

const articles = newsData as NewsArticle[];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found | Lim Hyejung',
    };
  }

  const title = getLocalizedText(article.title, 'en');

  return {
    title: `${title} | News | Lim Hyejung`,
    description: article.excerpt.en,
    alternates: {
      canonical: `https://limhyejung.com/news/${slug}`,
    },
    openGraph: {
      title,
      description: article.excerpt.en,
      type: 'article',
      publishedTime: article.publishDate,
      authors: article.author ? [article.author] : undefined,
      images: article.images?.hero ? [
        {
          url: `https://limhyejung.com${article.images.hero}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ] : undefined,
    },
  };
}

export async function generateStaticParams() {
  return articles.map(article => ({
    slug: article.slug,
  }));
}

// Simple Markdown to HTML converter for basic formatting
function renderMarkdown(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-serif text-stone-900 mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-serif text-stone-900 mt-10 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-serif text-stone-900 mb-6">$1</h1>')
    // Bold
    .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold">$1</strong>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-sage-700 hover:text-sage-800 underline">$1</a>')
    // Lists
    .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
    // Paragraphs (lines that don't start with special chars)
    .replace(/^(?!<[hlu])(.*$)/gim, (match) => {
      if (match.trim() === '') return '';
      if (match.startsWith('<')) return match;
      return `<p class="text-stone-600 leading-relaxed mb-4">${match}</p>`;
    })
    // Wrap list items in ul
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc list-inside mb-4 space-y-1">$&</ul>');
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    notFound();
  }

  const title = article.title;
  const content = article.content;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Image */}
      {article.images?.hero && (
        <div className="relative h-[40vh] min-h-[350px] bg-stone-900">
          <Image
            src={article.images.hero}
            alt={getLocalizedText(title, 'en')}
            fill
            priority
            className="object-cover opacity-80"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-stone-500">
            <li>
              <Link href="/" className="hover:text-sage-700">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/news" className="hover:text-sage-700">News</Link>
            </li>
            <li>/</li>
            <li className="text-stone-900 truncate max-w-[200px]">
              {getLocalizedText(title, 'en')}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-medium bg-sage-100 text-sage-800 rounded-full">
              {getNewsTypeLabel(article.type, 'en')}
            </span>
            <span className="text-sm text-stone-500">
              {formatDate(article.publishDate, 'en', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-3">
            {getLocalizedText(title, 'en')}
          </h1>
          {title.ko && title.ko !== title.en && (
            <p className="text-xl text-stone-500 font-serif" lang="ko">
              {title.ko}
            </p>
          )}
          {article.author && (
            <p className="mt-4 text-sm text-stone-600">
              By {article.author}
            </p>
          )}
          {article.source && (
            <p className="mt-2 text-sm text-stone-500">
              Source: {article.sourceUrl ? (
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage-700 hover:text-sage-800 underline"
                >
                  {article.source}
                </a>
              ) : article.source}
            </p>
          )}
        </header>

        {/* English Content */}
        <article className="prose prose-stone max-w-none mb-12">
          <div
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content.en) }}
          />
        </article>

        {/* Korean Content (if different) */}
        {content.ko && content.ko !== content.en && (
          <article className="border-t border-stone-200 pt-10 prose prose-stone max-w-none mb-12" lang="ko">
            <h2 className="text-xl font-serif text-stone-900 mb-6">한국어 버전</h2>
            <div
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content.ko) }}
            />
          </article>
        )}

        {/* Vietnamese Content (if available) */}
        {content.vi && (
          <article className="border-t border-stone-200 pt-10 prose prose-stone max-w-none mb-12" lang="vi">
            <h2 className="text-xl font-serif text-stone-900 mb-6">Tiếng Việt</h2>
            <div
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content.vi) }}
            />
          </article>
        )}

        {/* Related Links */}
        {article.links && (
          <div className="border-t border-stone-200 pt-8 mb-8">
            <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-4">
              Related Links
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {article.links.exhibition && (
                <a
                  href={article.links.exhibition.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 bg-sage-50 hover:bg-sage-100 rounded-lg transition-colors group"
                >
                  <svg className="w-5 h-5 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                  <span className="text-stone-700 group-hover:text-sage-800">{article.links.exhibition.name}</span>
                  <svg className="w-4 h-4 ml-auto text-stone-400 group-hover:text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {article.links.artfair && (
                <a
                  href={article.links.artfair.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 bg-sage-50 hover:bg-sage-100 rounded-lg transition-colors group"
                >
                  <svg className="w-5 h-5 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  </svg>
                  <span className="text-stone-700 group-hover:text-sage-800">{article.links.artfair.name}</span>
                  <svg className="w-4 h-4 ml-auto text-stone-400 group-hover:text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {article.links.gallery && (
                <a
                  href={article.links.gallery.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 bg-sage-50 hover:bg-sage-100 rounded-lg transition-colors group"
                >
                  <svg className="w-5 h-5 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                  <span className="text-stone-700 group-hover:text-sage-800">{article.links.gallery.name}</span>
                  <svg className="w-4 h-4 ml-auto text-stone-400 group-hover:text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {article.links.venue && (
                <a
                  href={article.links.venue.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 bg-sage-50 hover:bg-sage-100 rounded-lg transition-colors group"
                >
                  <svg className="w-5 h-5 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="text-stone-700 group-hover:text-sage-800">{article.links.venue.name}</span>
                  <svg className="w-4 h-4 ml-auto text-stone-400 group-hover:text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {article.links.artfairMain && (
                <a
                  href={article.links.artfairMain.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors group"
                >
                  <svg className="w-5 h-5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  <span className="text-stone-600 group-hover:text-stone-800">{article.links.artfairMain.name}</span>
                </a>
              )}
            </div>
            {/* Social Links */}
            {article.links.social && (
              <div className="flex gap-3 mt-4">
                {article.links.social.viaInstagram && (
                  <a
                    href={article.links.social.viaInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
                    aria-label="VIA Art Fair Instagram"
                  >
                    <svg className="w-5 h-5 text-stone-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
                {article.links.social.viaFacebook && (
                  <a
                    href={article.links.social.viaFacebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
                    aria-label="VIA Art Fair Facebook"
                  >
                    <svg className="w-5 h-5 text-stone-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                {article.links.social.galleryInstagram && (
                  <a
                    href={article.links.social.galleryInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
                    aria-label="Gallery Instagram"
                  >
                    <svg className="w-5 h-5 text-stone-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="border-t border-stone-200 pt-8 mb-8">
            <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-3">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-stone-100 text-stone-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="border-t border-stone-200 pt-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sage-700 hover:text-sage-800 font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All News
          </Link>
        </div>
      </div>
    </div>
  );
}
