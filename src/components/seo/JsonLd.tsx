import exhibitionsData from '@/data/exhibitions.json'
import newsData from '@/data/news.json'
import faqData from '@/data/faq.json'
import artistData from '@/data/artist.json'
import { Exhibition, NewsArticle, FAQItem, Artist } from '@/types'
import { config, getFullUrl, getArtistName, getInstagramUrl } from '@/lib/config'

const exhibitions = exhibitionsData as Exhibition[]
const articles = newsData as NewsArticle[]
const faqs = faqData as FAQItem[]
const artist = artistData as Artist

export default function JsonLd() {
  const siteUrl = getFullUrl()
  const artistNameEn = getArtistName('en')
  const artistNameKo = getArtistName('ko')
  const instagramUrl = getInstagramUrl()

  // Enhanced Person Schema for Entity Disambiguation
  const artistSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#artist`,
    name: artistNameEn,
    alternateName: [
      artistNameKo,
      'Hyejung Lim',
      '林慧貞',
      'リム・ヘジョン',
      'Lim Hye-jung',
    ],
    givenName: 'Hyejung',
    familyName: 'Lim',
    birthDate: String(config.artist.birthYear),
    birthPlace: {
      '@type': 'Place',
      name: config.artist.birthPlace,
    },
    nationality: {
      '@type': 'Country',
      name: config.artist.nationality === 'Korean' ? 'South Korea' : config.artist.nationality,
    },
    url: siteUrl,
    image: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/artist/hj lim black.png`,
      caption: `Portrait of artist ${artistNameEn}`,
    },
    sameAs: [
      instagramUrl,
      // 외부 Entity 연결 (affiliations에서 동적 로드)
      ...(artist.affiliations?.map(aff => aff.url).filter(Boolean) || []),
      // Wikidata (생성 후 추가)
      artist.externalIds?.wikidata ? `https://www.wikidata.org/wiki/${artist.externalIds.wikidata}` : null,
      // VIAF (생성 후 추가)
      artist.externalIds?.viaf ? `https://viaf.org/viaf/${artist.externalIds.viaf}` : null,
      // Getty ULAN (생성 후 추가)
      artist.externalIds?.ulan ? `https://vocab.getty.edu/ulan/${artist.externalIds.ulan}` : null,
    ].filter(Boolean),
    jobTitle: 'Visual Artist',
    description: 'Contemporary Korean artist (b. 1981) exploring inner worlds through nature reconstructed by imagination. Known for the artistic philosophy "Utopia = Reality" where ideals and reality blur into living, evolving works.',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Seoul National University of Science and Technology',
      department: 'Department of Fine Arts',
      sameAs: 'https://www.seoultech.ac.kr',
    },
    knowsAbout: [
      'Contemporary Art',
      'Oil Painting',
      'Mixed Media',
      'Nature Imagery',
      'Emotional Landscape',
      'Korean Contemporary Art',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Visual Artist',
      occupationalCategory: '27-1013',
    },
  }

  const artGallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ArtGallery',
    '@id': `${siteUrl}/#gallery`,
    name: `${artistNameEn} Portfolio`,
    url: siteUrl,
    description: `Official artist portfolio of ${artistNameEn} - ${config.gallery.description.en}`,
    image: `${siteUrl}/images/works/21.Just that we grow.jpeg`,
    founder: {
      '@type': 'Person',
      '@id': `${siteUrl}/#artist`,
    },
    inLanguage: ['en', 'ko', 'vi', 'ja', 'id', 'ms'],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: artistNameEn,
    alternateName: `${artistNameKo} 포트폴리오`,
    url: siteUrl,
    description: `Official website and portfolio of contemporary Korean artist ${artistNameEn} (${artistNameKo}, b. ${config.artist.birthYear})`,
    inLanguage: ['en', 'ko', 'vi', 'ja', 'id', 'ms'],
    publisher: {
      '@type': 'Person',
      '@id': `${siteUrl}/#artist`,
    },
  }

  // FAQPage Schema - 동적 생성 (faq.json에서 로드)
  // 지원 언어 목록
  const faqLanguages: Array<'en' | 'ko' | 'vi'> = ['en', 'ko', 'vi']

  // FAQ 스키마 동적 생성
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteUrl}/#faq`,
    mainEntity: faqs.flatMap(faq =>
      faqLanguages
        .filter(lang => faq.question[lang] && faq.answer[lang])
        .map(lang => ({
          '@type': 'Question',
          name: faq.question[lang],
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer[lang],
            inLanguage: lang === 'ko' ? 'ko-KR' : lang === 'vi' ? 'vi-VN' : 'en-US',
          },
        }))
    ),
  }

  // Sample CreativeWork Schema for Featured Artworks
  const featuredArtworkSchema = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    '@id': `${siteUrl}/works/featured`,
    name: 'Just that we grow',
    alternateName: '그냥 우리가 자란다는 것',
    creator: {
      '@type': 'Person',
      '@id': `${siteUrl}/#artist`,
    },
    dateCreated: '2025',
    artMedium: 'Mixed media on canvas',
    artform: 'Painting',
    image: `${siteUrl}/images/works/21.Just that we grow.jpeg`,
    description: 'A work exploring the intersection of growth, nature, and emotional transformation through the lens of "Utopia = Reality"',
    inLanguage: ['en', 'ko'],
    isPartOf: {
      '@type': 'Collection',
      name: 'Secret Garden',
      description: 'A series exploring hidden emotional landscapes',
    },
  }

  // ExhibitionEvent Schema for each exhibition (enhanced with organizers and sameAs)
  const exhibitionSchemas = exhibitions.map((exhibition) => {
    const description = typeof exhibition.description === 'object'
      ? exhibition.description.en
      : exhibition.description || ''

    // Build organizer schema from organizers array or fall back to venue
    const hostOrganizer = exhibition.organizers?.find(org => org.role === 'host')
    const organizerSchema = hostOrganizer ? {
      '@type': 'Organization',
      name: hostOrganizer.name,
      url: hostOrganizer.url,
      sameAs: hostOrganizer.instagram ? [hostOrganizer.instagram] : undefined,
    } : exhibition.venue ? {
      '@type': 'Organization',
      name: exhibition.venue,
      url: exhibition.links?.gallery,
      sameAs: exhibition.links?.galleryInstagram ? [exhibition.links.galleryInstagram] : undefined,
    } : undefined

    return {
      '@context': 'https://schema.org',
      '@type': 'ExhibitionEvent',
      '@id': `${siteUrl}/exhibitions/${exhibition.id}`,
      name: exhibition.title,
      alternateName: exhibition.titleKr,
      description,
      startDate: exhibition.startDate,
      endDate: exhibition.endDate || undefined,
      eventStatus: exhibition.status === 'current'
        ? 'https://schema.org/EventScheduled'
        : exhibition.status === 'past'
          ? 'https://schema.org/EventPostponed'
          : 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: exhibition.venue ? {
        '@type': 'Place',
        name: exhibition.venue,
        address: {
          '@type': 'PostalAddress',
          addressLocality: exhibition.city,
          addressCountry: exhibition.country,
        },
      } : undefined,
      performer: {
        '@type': 'Person',
        '@id': `${siteUrl}/#artist`,
        name: artistNameEn,
      },
      organizer: organizerSchema,
      image: exhibition.images?.cover ? `${siteUrl}${exhibition.images.cover}` : undefined,
      url: exhibition.externalUrl || `${siteUrl}/exhibitions/${exhibition.id}`,
      sameAs: exhibition.links?.official ? [exhibition.links.official] : undefined,
      isAccessibleForFree: exhibition.admission === 'free' ? true : undefined,
      inLanguage: ['en', 'ko', 'vi'],
    }
  })

  // NewsArticle Schema for each article
  const newsArticleSchemas = articles.map((article) => ({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${siteUrl}/news/${article.slug}`,
    headline: article.title.en,
    alternativeHeadline: article.title.ko,
    description: article.excerpt.en,
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    author: article.author ? {
      '@type': 'Person',
      name: article.author,
    } : {
      '@type': 'Person',
      '@id': `${siteUrl}/#artist`,
      name: artistNameEn,
    },
    publisher: {
      '@type': 'Organization',
      name: `${artistNameEn} Studio`,
      url: siteUrl,
    },
    image: article.images?.hero ? `${siteUrl}${article.images.hero}` : undefined,
    url: `${siteUrl}/news/${article.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/news/${article.slug}`,
    },
    articleSection: article.type === 'press-release' ? 'Press Release'
      : article.type === 'interview' ? 'Interview'
        : article.type === 'review' ? 'Art Review'
          : 'Feature',
    keywords: article.tags?.join(', '),
    inLanguage: ['en', 'ko', 'vi'],
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artistSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artGallerySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featuredArtworkSchema) }}
      />
      {/* Exhibition Event Schemas */}
      {exhibitionSchemas.map((schema, index) => (
        <script
          key={`exhibition-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {/* News Article Schemas */}
      {newsArticleSchemas.map((schema, index) => (
        <script
          key={`news-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
