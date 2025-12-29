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
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
      description: 'Demo version'
    },
    featureList: [
      'E-commerce Platform Integration',
      'Customer Data Platform (CDP)',
      'CRM & Segmentation',
      'Ad Campaign Management',
      'Content Studio with AI',
      'SEO/AEO Optimization'
    ],
    softwareRequirements: 'Modern web browser',
    author: {
      '@type': 'Organization',
      name: 'Agency Platform'
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What e-commerce platforms does Commerce Growth OS support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Commerce Growth OS supports major e-commerce platforms including Shopify, Cafe24, WooCommerce, Imweb, Naver Smartstore, and Coupang.'
        }
      },
      {
        '@type': 'Question',
        name: 'What advertising platforms can I connect?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can connect Meta Ads (Facebook/Instagram), Google Ads, TikTok Ads, Naver Ads, and Kakao Moment for unified ad campaign management.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does Commerce Growth OS include AI features?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the Content Studio includes AI-powered content generation, SEO optimization suggestions, and keyword analysis tools.'
        }
      }
    ]
  }

  return (
    <>
      <Script
        id="commerce-software-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <Script
        id="commerce-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
