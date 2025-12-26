import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Providers from '@/components/providers/Providers'
import JsonLd from '@/components/seo/JsonLd'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const siteUrl = 'https://limhyejung.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Lim Hyejung | Utopia = Reality',
  description: 'Official portfolio of Lim Hyejung (임혜정, b. 1981) - Contemporary Korean artist exploring inner worlds through nature reconstructed by imagination. Known for the artistic philosophy "Utopia = Reality".',
  keywords: ['artist', 'contemporary art', 'painting', 'Lim Hyejung', '임혜정', 'Korean artist', 'oil painting', 'mixed media', 'Utopia Reality', '한국 현대미술', 'visual artist'],
  authors: [{ name: 'Lim Hyejung', url: siteUrl }],
  creator: 'Lim Hyejung',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  // Canonical URL and hreflang for multilingual SEO
  alternates: {
    canonical: siteUrl,
    languages: {
      'en': siteUrl,
      'ko': siteUrl,
      'vi': siteUrl,
      'ja': siteUrl,
      'id': siteUrl,
      'ms': siteUrl,
      'x-default': siteUrl,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'vi_VN', 'ja_JP', 'id_ID', 'ms_MY'],
    url: siteUrl,
    siteName: 'Lim Hyejung',
    title: 'Lim Hyejung | Utopia = Reality',
    description: 'Official portfolio of Lim Hyejung (임혜정, b. 1981) - Contemporary Korean artist exploring inner worlds through nature reconstructed by imagination.',
    images: [
      {
        url: `${siteUrl}/images/works/21.Just that we grow.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Just that we grow - Artwork by Lim Hyejung',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lim Hyejung | Utopia = Reality',
    description: 'Official portfolio of Lim Hyejung (임혜정) - Contemporary Korean artist known for "Utopia = Reality" philosophy',
    images: [`${siteUrl}/images/works/21.Just that we grow.jpeg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <JsonLd />
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
