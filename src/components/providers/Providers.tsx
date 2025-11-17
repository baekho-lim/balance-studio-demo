'use client'

import { LanguageProvider } from '@/i18n'
import type { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return <LanguageProvider>{children}</LanguageProvider>
}
