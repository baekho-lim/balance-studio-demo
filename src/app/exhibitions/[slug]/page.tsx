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
            {exhibition.links?.gallery ? (
              <a
                href={exhibition.links.gallery}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-sage-700 hover:text-sage-800 hover:underline"
              >
                {exhibition.venue || 'TBA'}
              </a>
            ) : (
              <p className="text-lg text-stone-900">{exhibition.venue || 'TBA'}</p>
            )}
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

        {/* Organizers */}
        {exhibition.organizers && exhibition.organizers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-6">Organizers & Partners</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {exhibition.organizers.map((org, index) => (
                <div key={index} className="bg-white border border-stone-200 rounded-lg p-5">
                  <p className="text-xs uppercase tracking-wide text-stone-400 mb-1">
                    {org.role === 'host' ? 'Host' : org.role === 'co-host' ? 'Co-Host' : org.role === 'sponsor' ? 'Sponsor' : 'Partner'}
                  </p>
                  {org.url ? (
                    <a
                      href={org.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-sage-700 hover:text-sage-800 hover:underline"
                    >
                      {org.name}
                    </a>
                  ) : (
                    <p className="text-lg font-medium text-stone-900">{org.name}</p>
                  )}
                  {org.nameKr && (
                    <p className="text-sm text-stone-500">{org.nameKr}</p>
                  )}
                  {/* Social Links */}
                  <div className="flex gap-3 mt-3">
                    {org.instagram && (
                      <a
                        href={org.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-400 hover:text-pink-500 transition-colors"
                        aria-label={`${org.name} Instagram`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    )}
                    {org.facebook && (
                      <a
                        href={org.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-400 hover:text-blue-600 transition-colors"
                        aria-label={`${org.name} Facebook`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* External Links */}
        {(exhibition.links?.official || exhibition.links?.artfair || exhibition.externalUrl) && (
          <section className="bg-sage-50 border border-sage-200 rounded-lg p-6 mb-12">
            <h2 className="text-xl font-serif text-stone-900 mb-4">External Links</h2>
            <div className="flex flex-wrap gap-3">
              {(exhibition.links?.official || exhibition.externalUrl) && (
                <a
                  href={exhibition.links?.official || exhibition.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-sage-300 rounded-lg text-sage-700 hover:bg-sage-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Official Exhibition Page
                </a>
              )}
              {exhibition.links?.artfair && (
                <a
                  href={exhibition.links.artfair}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-sage-300 rounded-lg text-sage-700 hover:bg-sage-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Art Fair Website
                </a>
              )}
              {exhibition.links?.artfairInstagram && (
                <a
                  href={exhibition.links.artfairInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-sage-300 rounded-lg text-stone-600 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              )}
              {exhibition.links?.artfairFacebook && (
                <a
                  href={exhibition.links.artfairFacebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-sage-300 rounded-lg text-stone-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              )}
            </div>
          </section>
        )}

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
