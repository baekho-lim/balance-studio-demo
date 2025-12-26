export default function JsonLd() {
  const siteUrl = 'https://limhyejung.com'

  // Enhanced Person Schema for Entity Disambiguation
  const artistSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#artist`,
    name: 'Lim Hyejung',
    alternateName: [
      '임혜정',
      'Hyejung Lim',
      '林慧貞',
      'リム・ヘジョン',
      'Lim Hye-jung',
    ],
    givenName: 'Hyejung',
    familyName: 'Lim',
    birthDate: '1981',
    birthPlace: {
      '@type': 'Country',
      name: 'South Korea',
    },
    nationality: {
      '@type': 'Country',
      name: 'South Korea',
    },
    url: siteUrl,
    image: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/artist/hj lim black.png`,
      caption: 'Portrait of artist Lim Hyejung',
    },
    sameAs: [
      'https://www.instagram.com/limhyejung_artworks',
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
    name: 'Lim Hyejung Portfolio',
    url: siteUrl,
    description: 'Official artist portfolio of Lim Hyejung - Where nature and emotions are reconstructed into a new world through the philosophy of "Utopia = Reality"',
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
    name: 'Lim Hyejung',
    alternateName: '임혜정 포트폴리오',
    url: siteUrl,
    description: 'Official website and portfolio of contemporary Korean artist Lim Hyejung (임혜정, b. 1981)',
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
    </>
  )
}
