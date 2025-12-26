import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery | Lim Hyejung',
  description: 'Browse the complete collection of artworks by Lim Hyejung. Oil paintings and mixed media works exploring nature, identity, and the philosophy of Utopia = Reality.',
  keywords: ['Lim Hyejung gallery', 'Korean art gallery', 'oil paintings', 'contemporary art collection', 'artwork portfolio'],
  openGraph: {
    title: 'Gallery | Lim Hyejung - Complete Artwork Collection',
    description: 'Explore the complete collection of oil paintings and mixed media works by Korean contemporary artist Lim Hyejung.',
    type: 'website',
    images: [{ url: '/images/og-gallery.webp', width: 1200, height: 630, alt: 'Lim Hyejung Art Gallery' }],
  },
  alternates: {
    canonical: 'https://limhyejung.com/gallery',
    languages: {
      'en': 'https://limhyejung.com/gallery',
      'ko': 'https://limhyejung.com/gallery',
    },
  },
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
