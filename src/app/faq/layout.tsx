import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ | Lim Hyejung',
  description: 'Frequently asked questions about Lim Hyejung\'s artworks, exhibitions, purchase inquiries, and partnership opportunities.',
  keywords: ['Lim Hyejung FAQ', 'art inquiry', 'artwork purchase', 'exhibition information', 'artist collaboration'],
  openGraph: {
    title: 'FAQ | Lim Hyejung - Frequently Asked Questions',
    description: 'Find answers about exhibitions, artwork purchases, collaborations, and more.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://limhyejung.com/faq',
    languages: {
      'en': 'https://limhyejung.com/faq',
      'ko': 'https://limhyejung.com/faq',
    },
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
