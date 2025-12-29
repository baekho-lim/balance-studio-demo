import Script from 'next/script'

interface CommerceJsonLdProps {
  name?: string
  description?: string
  url?: string
}

export default function CommerceJsonLd({
  name = 'Commerce Growth OS',
  description = 'All-in-one platform for e-commerce growth. Connect your store, understand your customers, and scale your business with AI-powered insights.',
  url = 'https://limhyejung.com/demo/commerce'
}: CommerceJsonLdProps) {
  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}/#organization`,
    name: 'Commerce Growth OS',
    alternateName: '커머스 그로스 OS',
    url,
    logo: `${url}/logo.png`,
    description,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Korean', 'English']
    }
  }

  // SoftwareApplication Schema
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${url}/#software`,
    name,
    description,
    url,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'E-commerce Management',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
      description: 'Demo version',
      availability: 'https://schema.org/InStock'
    },
    featureList: [
      'E-commerce Platform Integration (Shopify, Cafe24, Coupang)',
      'Customer Data Platform (CDP) with RFM Segmentation',
      'CRM Campaign Builder with 4-step Wizard',
      'Multi-channel Ad Campaign Management (Meta, Google, Naver)',
      'AI-powered Content Studio',
      'SEO/AEO Optimization Tools'
    ],
    softwareRequirements: 'Modern web browser (Chrome, Firefox, Safari, Edge)',
    author: {
      '@type': 'Organization',
      name: 'Agency Platform'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '124',
      bestRating: '5',
      worstRating: '1'
    }
  }

  // WebSite Schema with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    name: 'Commerce Growth OS',
    alternateName: '커머스 그로스 OS',
    url,
    description,
    inLanguage: ['ko-KR', 'en-US'],
    publisher: {
      '@id': `${url}/#organization`
    }
  }

  // FAQ Schema (Bilingual)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}/#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What e-commerce platforms does Commerce Growth OS support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Commerce Growth OS supports major e-commerce platforms including Shopify, Cafe24, WooCommerce, Imweb, Naver Smartstore, and Coupang.',
          inLanguage: 'en-US'
        }
      },
      {
        '@type': 'Question',
        name: 'Commerce Growth OS가 지원하는 이커머스 플랫폼은?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Commerce Growth OS는 Shopify, Cafe24, WooCommerce, 아임웹, 네이버 스마트스토어, 쿠팡 등 주요 이커머스 플랫폼을 지원합니다.',
          inLanguage: 'ko-KR'
        }
      },
      {
        '@type': 'Question',
        name: 'What advertising platforms can I connect?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can connect Meta Ads (Facebook/Instagram), Google Ads, TikTok Ads, Naver Ads, and Kakao Moment for unified ad campaign management.',
          inLanguage: 'en-US'
        }
      },
      {
        '@type': 'Question',
        name: '어떤 광고 플랫폼을 연결할 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Meta Ads(Facebook/Instagram), Google Ads, TikTok Ads, 네이버 광고, 카카오모먼트를 연결하여 통합 광고 캠페인 관리가 가능합니다.',
          inLanguage: 'ko-KR'
        }
      },
      {
        '@type': 'Question',
        name: 'Does Commerce Growth OS include AI features?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the Content Studio includes AI-powered content generation, SEO optimization suggestions, and keyword analysis tools for Beauty, Fashion, and High-ticket Furniture personas.',
          inLanguage: 'en-US'
        }
      },
      {
        '@type': 'Question',
        name: 'AI 기능이 포함되어 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 콘텐츠 스튜디오에서 AI 기반 콘텐츠 생성, SEO 최적화 추천, 키워드 분석 도구를 제공합니다. 뷰티, 패션, 고가 가구 페르소나별 맞춤 콘텐츠 생성이 가능합니다.',
          inLanguage: 'ko-KR'
        }
      }
    ]
  }

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Demo',
        item: 'https://limhyejung.com/demo'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Commerce Growth OS',
        item: url
      }
    ]
  }

  return (
    <>
      <Script
        id="commerce-organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="commerce-software-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <Script
        id="commerce-website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="commerce-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="commerce-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
