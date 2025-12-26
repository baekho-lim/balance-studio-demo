import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NewsArticle } from '@/types';
import newsData from '@/data/news.json';
import { formatDate, getNewsTypeLabel, getLocalizedText } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'News & Press | Lim Hyejung',
  description: 'Latest news, press releases, and interviews about contemporary Korean artist Lim Hyejung and her exhibitions worldwide.',
  alternates: {
    canonical: 'https://limhyejung.com/news',
    languages: {
      'en': 'https://limhyejung.com/news',
      'ko': 'https://limhyejung.com/news',
      'vi': 'https://limhyejung.com/news',
      'ja': 'https://limhyejung.com/news',
      'x-default': 'https://limhyejung.com/news',
    },
  },
  openGraph: {
    title: 'News & Press | Lim Hyejung',
    description: 'Latest news, press releases, and interviews about contemporary Korean artist Lim Hyejung.',
    url: 'https://limhyejung.com/news',
    type: 'website',
  },
};

const articles = (newsData as NewsArticle[]).sort(
  (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
);

const featuredArticle = articles.find(a => a.featured);
const otherArticles = articles.filter(a => a.id !== featuredArticle?.id);

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group block bg-white border border-stone-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      {article.images?.hero && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={article.images.hero}
            alt={getLocalizedText(article.title, 'en')}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 text-xs font-medium bg-stone-100 text-stone-600 rounded">
            {getNewsTypeLabel(article.type, 'en')}
          </span>
          <span className="text-xs text-stone-400">
            {formatDate(article.publishDate, 'en', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>
        <h3 className="text-lg font-serif text-stone-900 mb-2 group-hover:text-sage-700 transition-colors line-clamp-2">
          {getLocalizedText(article.title, 'en')}
        </h3>
        <p className="text-sm text-stone-600 line-clamp-2">
          {article.excerpt.en}
        </p>
      </div>
    </Link>
  );
}

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <h1 className="text-4xl sm:text-5xl font-serif text-stone-900 mb-4">
            News & Press
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl">
            Press releases, interviews, and exhibition announcements featuring
            the work of Lim Hyejung.
          </p>
          <p className="text-base text-stone-500 mt-2">
            보도자료 및 인터뷰
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="mb-8">
            <span className="text-sm font-medium text-sage-700 uppercase tracking-wide">
              Featured
            </span>
          </div>
          <Link
            href={`/news/${featuredArticle.slug}`}
            className="group block bg-white border border-stone-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="grid md:grid-cols-2">
              {featuredArticle.images?.hero && (
                <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                  <Image
                    src={featuredArticle.images.hero}
                    alt={getLocalizedText(featuredArticle.title, 'en')}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-medium bg-sage-100 text-sage-800 rounded-full">
                    {getNewsTypeLabel(featuredArticle.type, 'en')}
                  </span>
                  <span className="text-sm text-stone-500">
                    {formatDate(featuredArticle.publishDate, 'en', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mb-4 group-hover:text-sage-700 transition-colors">
                  {getLocalizedText(featuredArticle.title, 'en')}
                </h2>
                <p className="text-stone-600 mb-6 line-clamp-3">
                  {featuredArticle.excerpt.en}
                </p>
                <span className="inline-flex items-center gap-2 text-sage-700 font-medium group-hover:gap-3 transition-all">
                  Read More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* All Articles */}
      {otherArticles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-serif text-stone-900 mb-8">All Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherArticles.map(article => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* No Articles Fallback */}
      {articles.length === 0 && (
        <section className="max-w-6xl mx-auto px-4 py-24 text-center">
          <p className="text-stone-600">No news articles available at this time.</p>
        </section>
      )}
    </div>
  );
}
