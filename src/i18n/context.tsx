'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type { LanguageCode } from './types'
import { translations } from './translations'

interface LanguageContextType {
  // Primary language is always English
  primaryLanguage: 'en'
  // Secondary language can be any supported language except English
  secondaryLanguage: Exclude<LanguageCode, 'en'>
  setSecondaryLanguage: (lang: Exclude<LanguageCode, 'en'>) => void
  // Get translation for UI text
  t: (typeof translations)['en']
  // Get secondary translation
  tSecondary: (typeof translations)[Exclude<LanguageCode, 'en'>]
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

interface LanguageProviderProps {
  children: ReactNode
  defaultSecondaryLanguage?: Exclude<LanguageCode, 'en'>
}

export function LanguageProvider({
  children,
  defaultSecondaryLanguage = 'ko',
}: LanguageProviderProps) {
  const [secondaryLanguage, setSecondaryLanguageState] =
    useState<Exclude<LanguageCode, 'en'>>(defaultSecondaryLanguage)

  const setSecondaryLanguage = useCallback(
    (lang: Exclude<LanguageCode, 'en'>) => {
      setSecondaryLanguageState(lang)
      // Persist to localStorage for user preference
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferredSecondaryLanguage', lang)
      }
    },
    []
  )

  const value: LanguageContextType = {
    primaryLanguage: 'en',
    secondaryLanguage,
    setSecondaryLanguage,
    t: translations.en,
    tSecondary: translations[secondaryLanguage],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Helper hook to get multilingual text
export function useMultiLingualText() {
  const { secondaryLanguage } = useLanguage()

  const getText = useCallback(
    (
      texts: {
        en: string
        ko?: string
        vi?: string
        ja?: string
        'zh-CN'?: string
        ms?: string
        id?: string
      },
      type: 'primary' | 'secondary' = 'primary'
    ): string => {
      if (type === 'primary') {
        return texts.en
      }
      return texts[secondaryLanguage as keyof typeof texts] || texts.en
    },
    [secondaryLanguage]
  )

  return { getText, secondaryLanguage }
}
