'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Pages that should NOT have Header/Footer
// - Print-only pages
// - Demo/template pages (each has its own layout)
const noLayoutPages = ['/postcards/diptych', '/demo']

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideLayout = noLayoutPages.some(page => pathname?.startsWith(page))

  if (hideLayout) {
    return <main>{children}</main>
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
