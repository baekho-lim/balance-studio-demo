import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partnership | Lim Hyejung',
  description: 'Collaborate with Lim Hyejung. Inquiries welcome for gallery exhibitions, art fairs, commissions, collaborations, acquisitions, and media features.',
  keywords: ['Lim Hyejung partnership', 'art collaboration', 'gallery exhibition', 'art commission', 'artwork acquisition', 'artist representation'],
  openGraph: {
    title: 'Partnership | Work With Lim Hyejung',
    description: 'Interested in exhibitions, collaborations, or acquiring artworks? We welcome inquiries from galleries, curators, collectors, and media worldwide.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://limhyejung.com/partnership',
    languages: {
      'en': 'https://limhyejung.com/partnership',
      'ko': 'https://limhyejung.com/partnership',
    },
  },
}

export default function PartnershipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
