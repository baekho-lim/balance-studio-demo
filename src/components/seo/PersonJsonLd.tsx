/**
 * PersonJsonLd - About 페이지 전용 강화된 Person 스키마
 * LLM Citation 최적화를 위한 상세 Entity 정보 제공
 */

import artistData from '@/data/artist.json'
import { Artist } from '@/types'
import { getFullUrl, getInstagramUrl } from '@/lib/config'

const artist = artistData as Artist

export default function PersonJsonLd() {
  const siteUrl = getFullUrl()
  const instagramUrl = getInstagramUrl()

  // sameAs 배열 동적 생성
  const sameAsUrls: string[] = [
    instagramUrl,
    // 소속 기관 URL
    ...(artist.affiliations?.map(aff => aff.url).filter((url): url is string => !!url) || []),
  ]

  // 외부 Entity ID 추가 (생성 후 활성화)
  if (artist.externalIds?.wikidata) {
    sameAsUrls.push(`https://www.wikidata.org/wiki/${artist.externalIds.wikidata}`)
  }
  if (artist.externalIds?.viaf) {
    sameAsUrls.push(`https://viaf.org/viaf/${artist.externalIds.viaf}`)
  }
  if (artist.externalIds?.ulan) {
    sameAsUrls.push(`https://vocab.getty.edu/ulan/${artist.externalIds.ulan}`)
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/about#artist`,

    // 기본 정보
    name: 'Lim Hyejung',
    alternateName: [
      '임혜정',
      'Hyejung Lim',
      '林慧貞',
      'リム・ヘジョン',
      'Lim Hye-jung',
      'Họa sĩ Lim Hyejung',
    ],
    givenName: 'Hyejung',
    familyName: 'Lim',
    additionalName: '혜정',

    // 출생 정보
    birthDate: '1981',
    birthPlace: {
      '@type': 'Place',
      name: 'Seoul, South Korea',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'KR',
      },
    },

    // 국적
    nationality: {
      '@type': 'Country',
      name: 'South Korea',
      sameAs: 'https://www.wikidata.org/wiki/Q884',
    },

    // 직업 정보
    jobTitle: 'Visual Artist',
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Visual Artist',
      occupationalCategory: '27-1013.00', // Fine Artists, Including Painters, Sculptors, and Illustrators
      description: 'Contemporary artist working in mixed media on canvas',
    },

    // 전문 분야
    knowsAbout: [
      'Contemporary Art',
      'Mixed Media Painting',
      'Oil Painting',
      'Nature Imagery',
      'Emotional Landscape',
      'Korean Contemporary Art',
      'Asian Contemporary Art',
      'Gold Leaf Technique',
      'Silver Leaf Technique',
    ],

    // 교육
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Seoul National University of Science and Technology',
      alternateName: ['서울과학기술대학교', 'SeoulTech'],
      department: 'Department of Fine Arts',
      sameAs: 'https://www.seoultech.ac.kr',
    },

    // 대표작 소속
    worksFor: artist.affiliations?.find(a => a.type === 'representedBy')
      ? {
          '@type': 'Organization',
          name: artist.affiliations.find(a => a.type === 'representedBy')?.name,
          url: artist.affiliations.find(a => a.type === 'representedBy')?.url,
        }
      : undefined,

    // 설명 (LLM 최적화 - 핵심 정보 포함)
    description: `Lim Hyejung (임혜정, b. 1981) is a contemporary Korean artist known for her artistic philosophy "Utopia = Reality." She explores inner worlds through nature reconstructed by imagination, using a proprietary medium that fuses Eastern and Western traditional materials. Her works function as living objects that transform with changing light and viewing angles, incorporating silver and gold leaf to embed the materiality of light onto the canvas surface. She graduated from Seoul National University of Science and Technology, Department of Fine Arts.`,

    // 외부 연결
    sameAs: sameAsUrls,

    // 웹사이트
    url: siteUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/about`,
    },

    // 이미지
    image: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/artist/hj lim black.png`,
      caption: 'Portrait of contemporary Korean artist Lim Hyejung',
      width: 800,
      height: 800,
    },

    // 언어
    knowsLanguage: [
      { '@type': 'Language', name: 'Korean', alternateName: 'ko' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  )
}
