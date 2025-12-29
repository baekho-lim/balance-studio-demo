import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { CommerceSidebar, CommerceJsonLd } from '@/components/templates/commerce'
import commerceConfig from '@/data/demo/commerce-config.json'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: {
    default: 'Commerce Growth OS | 커머스 그로스 OS',
    template: '%s | Commerce Growth OS',
  },
  description: commerceConfig.description.ko,
  keywords: commerceConfig.seo.keywords,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Commerce Growth OS',
    title: 'Commerce Growth OS | 통합 커머스 인텔리전스 플랫폼',
    description: commerceConfig.description.ko,
  },
}

export default function CommerceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.variable} ${poppins.variable} font-sans`}>
      <CommerceJsonLd />
      <CommerceSidebar
        navigation={commerceConfig.navigation}
        storeName="글로우 뷰티"
      />
      <main className="ml-60 min-h-screen bg-gray-50">
        {children}
      </main>
    </div>
  )
}
