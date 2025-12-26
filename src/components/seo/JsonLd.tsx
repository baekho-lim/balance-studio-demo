import exhibitionsData from '@/data/exhibitions.json'
import newsData from '@/data/news.json'
import { Exhibition, NewsArticle } from '@/types'
import { config, getFullUrl, getArtistName, getInstagramUrl } from '@/lib/config'

const exhibitions = exhibitionsData as Exhibition[]
const articles = newsData as NewsArticle[]

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
    ],
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

  // FAQPage Schema - 6 Languages for LLM Citation Optimization
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteUrl}/#faq`,
    mainEntity: [
      // English FAQ
      {
        '@type': 'Question',
        name: 'Who is Lim Hyejung?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lim Hyejung (임혜정, b. 1981) is a contemporary Korean artist known for exploring inner worlds through nature reconstructed by imagination. She studied Fine Arts at Seoul National University of Science and Technology and is recognized for her artistic philosophy "Utopia = Reality," where ideals and reality blur into living, evolving artworks.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is "Utopia = Reality" in Lim Hyejung\'s art?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '"Utopia = Reality" is Lim Hyejung\'s core artistic philosophy. It represents the point where ideals and reality blur, where imagined gardens and lived experience become indistinguishable. Her works exist as living worlds that are continuously refined rather than fixed forms, embodying complex emotions such as oppression, melancholy, and healing.',
        },
      },
      {
        '@type': 'Question',
        name: 'What medium does Lim Hyejung work in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lim Hyejung works primarily in mixed media on canvas, creating imaginative landscapes that feature organic forms flowing freely across her canvases. Her visual language develops from personal experience, transforming and reinterpreting the world rather than reproducing reality.',
        },
      },
      // Korean FAQ
      {
        '@type': 'Question',
        name: '임혜정 작가는 누구인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '임혜정(b. 1981)은 상상력으로 재구성된 자연을 통해 내면의 세계를 탐구하는 한국의 현대 미술 작가입니다. 서울과학기술대학교 미술학과를 졸업했으며, "유토피아는 곧 현실이다(Utopia = Reality)"라는 예술 철학으로 알려져 있습니다. 이상과 현실의 경계가 흐려지는 지점에서 작품은 고정된 형태가 아닌 살아 있는 세계로 존재합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '"유토피아 = 리얼리티"는 무슨 의미인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '"유토피아 = 리얼리티"는 임혜정 작가의 핵심 예술 철학입니다. 이상과 현실의 경계가 흐려지는 지점을 의미하며, 상상의 정원과 실제 경험이 구별되지 않는 곳입니다. 작품은 억압, 우울, 치유와 같은 복합적 정서를 담으며 끊임없이 다듬어지고 변화하는 살아 있는 세계로 존재합니다.',
        },
      },
      // Vietnamese FAQ
      {
        '@type': 'Question',
        name: 'Họa sĩ Lim Hyejung là ai?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lim Hyejung (임혜정, sinh năm 1981) là một nghệ sĩ đương đại Hàn Quốc, nổi tiếng với việc khám phá thế giới nội tâm thông qua thiên nhiên được tái tạo bằng trí tưởng tượng. Cô tốt nghiệp Khoa Mỹ thuật tại Đại học Khoa học và Công nghệ Seoul và được biết đến với triết lý nghệ thuật "Utopia = Reality" (Không tưởng = Hiện thực).',
        },
      },
      // Japanese FAQ
      {
        '@type': 'Question',
        name: 'リム・ヘジョンとは誰ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'リム・ヘジョン（임혜정、1981年生まれ）は、想像力で再構成された自然を通じて内面世界を探求する韓国の現代アーティストです。ソウル科学技術大学美術学科を卒業し、「ユートピア＝リアリティ」という芸術哲学で知られています。彼女の作品は、理想と現実の境界が曖昧になる生きた世界として存在します。',
        },
      },
      // Indonesian FAQ
      {
        '@type': 'Question',
        name: 'Siapa Lim Hyejung?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lim Hyejung (임혜정, lahir 1981) adalah seniman kontemporer Korea yang dikenal karena mengeksplorasi dunia batin melalui alam yang direkonstruksi oleh imajinasi. Dia lulus dari Departemen Seni Rupa di Universitas Sains dan Teknologi Seoul dan dikenal dengan filosofi seninya "Utopia = Reality" di mana ideal dan realitas menyatu.',
        },
      },
      // Malay FAQ
      {
        '@type': 'Question',
        name: 'Siapakah Lim Hyejung?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lim Hyejung (임혜정, lahir 1981) ialah seorang artis kontemporari Korea yang terkenal kerana meneroka dunia dalaman melalui alam semula jadi yang dibina semula oleh imaginasi. Beliau lulusan Jabatan Seni Halus di Universiti Sains dan Teknologi Seoul dan dikenali dengan falsafah seni "Utopia = Reality" di mana cita-cita dan realiti bergabung.',
        },
      },
    ],
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
