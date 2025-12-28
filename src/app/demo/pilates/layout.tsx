import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { PilatesHeader, PilatesFooter } from '@/components/templates/pilates'

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
    default: 'Balance Studio | Pilates & Wellness',
    template: '%s | Balance Studio',
  },
  description: 'Find your balance, transform your body. Expert-led Pilates and wellness classes in Gangnam, Seoul.',
  keywords: ['pilates', 'wellness', 'yoga', 'fitness', 'gangnam', 'seoul', 'reformer', 'mat pilates'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Balance Studio',
    title: 'Balance Studio | Pilates & Wellness',
    description: 'Expert-led Pilates and wellness classes in Gangnam, Seoul.',
  },
}

export default function PilatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.variable} ${poppins.variable} font-sans`}>
      <PilatesHeader />
      <main>{children}</main>
      <PilatesFooter />
    </div>
  )
}
