import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Exhibition } from '@/types';
import exhibitionsData from '@/data/exhibitions.json';
import { formatExhibitionDates, getLocalizedText } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Exhibitions | Lim Hyejung',
  description: 'Solo and group exhibitions by contemporary Korean artist Lim Hyejung. View current, upcoming, and past exhibitions worldwide.',
  alternates: {
    canonical: 'https://limhyejung.com/exhibitions',
    languages: {
      'en': 'https://limhyejung.com/exhibitions',
      'ko': 'https://limhyejung.com/exhibitions',
      'vi': 'https://limhyejung.com/exhibitions',
      'ja': 'https://limhyejung.com/exhibitions',
      'x-default': 'https://limhyejung.com/exhibitions',
    },
  },
  openGraph: {
    title: 'Exhibitions | Lim Hyejung',
    description: 'Solo and group exhibitions by contemporary Korean artist Lim Hyejung.',
    url: 'https://limhyejung.com/exhibitions',
    type: 'website',
  },
};

const exhibitions = exhibitionsData as Exhibition[];

// 전시 상태별 분류
const currentExhibitions = exhibitions.filter(e => e.status === 'current' && e.featured);
const upcomingExhibitions = exhibitions.filter(e => e.status === 'upcoming');
const pastExhibitions = exhibitions.filter(e => e.status === 'past');

function ExhibitionCard({ exhibition }: { exhibition: Exhibition }) {
  const description = typeof exhibition.description === 'object'
    ? getLocalizedText(exhibition.description, 'en')
    : exhibition.description || '';

  return (
    <Link
      href={`/exhibitions/${exhibition.id}`}
      className="group block bg-white border border-stone-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      {exhibition.images?.cover && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={exhibition.images.cover}
            alt={exhibition.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              exhibition.type === 'solo'
                ? 'bg-sage-600 text-white'
                : 'bg-stone-600 text-white'
            }`}>
              {exhibition.type === 'solo' ? 'Solo Exhibition' : 'Group Exhibition'}
            </span>
          </div>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-serif text-stone-900 mb-1 group-hover:text-sage-700 transition-colors">
          {exhibition.title}
        </h3>
        {exhibition.titleKr && (
          <p className="text-sm text-stone-500 mb-3">{exhibition.titleKr}</p>
        )}
        <div className="text-sm text-stone-600 space-y-1">
          {exhibition.venue && (
            <p>{exhibition.venue}</p>
          )}
          {exhibition.city && exhibition.country && (
            <p>{exhibition.city}, {exhibition.country}</p>
          )}
          <p className="text-sage-700 font-medium">
            {formatExhibitionDates(exhibition.startDate, exhibition.endDate, 'en')}
          </p>
        </div>
        {description && (
          <p className="mt-4 text-sm text-stone-600 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function ExhibitionsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <h1 className="text-4xl sm:text-5xl font-serif text-stone-900 mb-4">
            Exhibitions
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl">
            Solo and group exhibitions by Lim Hyejung, showcasing artworks that explore
            inner worlds through nature reconstructed by imagination.
          </p>
          <p className="text-base text-stone-500 mt-2">
            임혜정 작가의 솔로전 및 그룹전
          </p>
        </div>
      </section>

      {/* Current Exhibitions */}
      {currentExhibitions.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <h2 className="text-2xl font-serif text-stone-900">Now Open</h2>
            <span className="text-sm text-stone-500">전시 중</span>
          </div>

          {/* Featured Current Exhibition */}
          {currentExhibitions.map(exhibition => (
            <Link
              key={exhibition.id}
              href={`/exhibitions/${exhibition.id}`}
              className="group block bg-white border border-stone-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow mb-8"
            >
              <div className="grid md:grid-cols-2">
                {exhibition.images?.cover && (
                  <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                    <Image
                      src={exhibition.images.cover}
                      alt={exhibition.title}
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 w-fit mb-4">
                    {exhibition.type === 'solo' ? 'Solo Exhibition' : 'Group Exhibition'}
                  </span>
                  <h3 className="text-3xl font-serif text-stone-900 mb-2 group-hover:text-sage-700 transition-colors">
                    {exhibition.title}
                  </h3>
                  {exhibition.titleKr && (
                    <p className="text-lg text-stone-500 mb-4">{exhibition.titleKr}</p>
                  )}
                  <div className="text-stone-600 space-y-2 mb-6">
                    {exhibition.venue && (
                      <p className="font-medium">{exhibition.venue}</p>
                    )}
                    {exhibition.city && exhibition.country && (
                      <p>{exhibition.city}, {exhibition.country}</p>
                    )}
                    <p className="text-sage-700 font-medium">
                      {formatExhibitionDates(exhibition.startDate, exhibition.endDate, 'en')}
                    </p>
                  </div>
                  {typeof exhibition.description === 'object' && (
                    <p className="text-stone-600 line-clamp-3">
                      {getLocalizedText(exhibition.description, 'en')}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-2 mt-6 text-sage-700 font-medium group-hover:gap-3 transition-all">
                    View Exhibition
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      )}

      {/* Upcoming Exhibitions */}
      {upcomingExhibitions.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-serif text-stone-900">Upcoming</h2>
            <span className="text-sm text-stone-500">예정</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingExhibitions.map(exhibition => (
              <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
            ))}
          </div>
        </section>
      )}

      {/* Past Exhibitions */}
      {pastExhibitions.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-serif text-stone-900">Past Exhibitions</h2>
            <span className="text-sm text-stone-500">지난 전시</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastExhibitions.map(exhibition => (
              <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
            ))}
          </div>
        </section>
      )}

      {/* No Exhibitions Fallback */}
      {exhibitions.length === 0 && (
        <section className="max-w-6xl mx-auto px-4 py-24 text-center">
          <p className="text-stone-600">No exhibitions to display at this time.</p>
        </section>
      )}
    </div>
  );
}
