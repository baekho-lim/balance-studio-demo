import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Exhibition } from '@/types';
import exhibitionsData from '@/data/exhibitions.json';
import { formatExhibitionDates, getLocalizedText, getExhibitionStatusLabel } from '@/lib/i18n';

const exhibitions = exhibitionsData as Exhibition[];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exhibition = exhibitions.find(e => e.id === slug);

  if (!exhibition) {
    return {
      title: 'Exhibition Not Found | Lim Hyejung',
    };
  }

  const description = typeof exhibition.description === 'object'
    ? getLocalizedText(exhibition.description, 'en')
    : exhibition.description || `${exhibition.type === 'solo' ? 'Solo' : 'Group'} exhibition at ${exhibition.venue}`;

  return {
    title: `${exhibition.title} | Exhibitions | Lim Hyejung`,
    description,
    alternates: {
      canonical: `https://limhyejung.com/exhibitions/${slug}`,
    },
    openGraph: {
      title: exhibition.title,
      description,
      type: 'article',
      images: exhibition.images?.cover ? [
        {
          url: `https://limhyejung.com${exhibition.images.cover}`,
          width: 1200,
          height: 630,
          alt: exhibition.title,
        },
      ] : undefined,
    },
  };
}

export async function generateStaticParams() {
  return exhibitions.map(exhibition => ({
    slug: exhibition.id,
  }));
}

export default async function ExhibitionDetailPage({ params }: Props) {
  const { slug } = await params;
  const exhibition = exhibitions.find(e => e.id === slug);

  if (!exhibition) {
    notFound();
  }

  const description = typeof exhibition.description === 'object'
    ? exhibition.description
    : { en: exhibition.description || '', ko: exhibition.descriptionKr || '' };

  const statusLabel = getExhibitionStatusLabel(exhibition.status, 'en');

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Image */}
      {exhibition.images?.cover && (
        <div className="relative h-[50vh] min-h-[400px] bg-stone-900">
          <Image
            src={exhibition.images.cover}
            alt={exhibition.title}
            fill
            priority
            className="object-cover opacity-80"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-stone-500">
            <li>
              <Link href="/" className="hover:text-sage-700">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/exhibitions" className="hover:text-sage-700">Exhibitions</Link>
            </li>
            <li>/</li>
            <li className="text-stone-900">{exhibition.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              exhibition.status === 'current'
                ? 'bg-green-100 text-green-800'
                : exhibition.status === 'upcoming'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-stone-200 text-stone-600'
            }`}>
              {statusLabel}
            </span>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              exhibition.type === 'solo'
                ? 'bg-sage-100 text-sage-800'
                : 'bg-stone-200 text-stone-600'
            }`}>
              {exhibition.type === 'solo' ? 'Solo Exhibition' : 'Group Exhibition'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif text-stone-900 mb-2">
            {exhibition.title}
          </h1>
          {exhibition.titleKr && (
            <p className="text-xl text-stone-500 font-serif">{exhibition.titleKr}</p>
          )}
        </header>

        {/* Details Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Venue */}
          <div>
            <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-2">
              Venue
            </h3>
            <p className="text-lg text-stone-900">{exhibition.venue || 'TBA'}</p>
            {exhibition.venueKr && (
              <p className="text-sm text-stone-500">{exhibition.venueKr}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-2">
              Location
            </h3>
            {exhibition.city && exhibition.country ? (
              <p className="text-lg text-stone-900">
                {exhibition.city}, {exhibition.country}
              </p>
            ) : (
              <p className="text-lg text-stone-500">TBA</p>
            )}
          </div>

          {/* Dates */}
          <div>
            <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-2">
              Dates
            </h3>
            <p className="text-lg text-stone-900">
              {formatExhibitionDates(exhibition.startDate, exhibition.endDate, 'en')}
            </p>
          </div>
        </div>

        {/* Description */}
        <section className="prose prose-stone max-w-none mb-12">
          <h2 className="text-2xl font-serif text-stone-900 mb-4">About the Exhibition</h2>
          {description.en && (
            <p className="text-stone-600 text-lg leading-relaxed mb-4">
              {description.en}
            </p>
          )}
          {description.ko && (
            <p className="text-stone-500 leading-relaxed" lang="ko">
              {description.ko}
            </p>
          )}
        </section>

        {/* Curator Note */}
        {exhibition.curatorNote && (
          <section className="bg-white border border-stone-200 rounded-lg p-8 mb-12">
            <h2 className="text-xl font-serif text-stone-900 mb-4">Curator&apos;s Note</h2>
            <blockquote className="text-stone-600 italic leading-relaxed">
              <p className="mb-4">{exhibition.curatorNote.en}</p>
              {exhibition.curatorNote.kr && (
                <p className="text-stone-500" lang="ko">{exhibition.curatorNote.kr}</p>
              )}
            </blockquote>
          </section>
        )}

        {/* Installation Images */}
        {exhibition.images?.installation && exhibition.images.installation.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-6">Installation Views</h2>
            <div className="grid gap-4">
              {exhibition.images.installation.map((img, index) => (
                <div key={index} className="relative aspect-[16/9] overflow-hidden rounded-lg">
                  <Image
                    src={img}
                    alt={`${exhibition.title} - Installation view ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1200px) 100vw, 800px"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Back Link */}
        <div className="border-t border-stone-200 pt-8">
          <Link
            href="/exhibitions"
            className="inline-flex items-center gap-2 text-sage-700 hover:text-sage-800 font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Exhibitions
          </Link>
        </div>
      </div>
    </div>
  );
}
