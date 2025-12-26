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
