'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type { LanguageCode, MultiLingualText } from './types'

/**
 * English UI + Multilingual Content Architecture
 *
 * - UI is ALWAYS in English (menus, buttons, labels, section titles)
 * - Content language is user-selectable (exhibition descriptions, artist notes, etc.)
 * - This follows the MOMA/Gagosian pattern for global art galleries
 */

interface LanguageContextType {
  // Content language: user-selected for body text (default: English)
  contentLanguage: LanguageCode
  setContentLanguage: (lang: LanguageCode) => void
  // Legacy alias for backward compatibility
  secondaryLanguage: LanguageCode
  setSecondaryLanguage: (lang: LanguageCode) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

interface LanguageProviderProps {
  children: ReactNode
  defaultContentLanguage?: LanguageCode
}

export function LanguageProvider({
  children,
  defaultContentLanguage = 'en',
}: LanguageProviderProps) {
  const [contentLanguage, setContentLanguageState] =
    useState<LanguageCode>(defaultContentLanguage)

  const setContentLanguage = useCallback((lang: LanguageCode) => {
    setContentLanguageState(lang)
    // Persist to localStorage for user preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredContentLanguage', lang)
    }
  }, [])

  const value: LanguageContextType = {
    contentLanguage,
    setContentLanguage,
    // Legacy aliases for backward compatibility
    secondaryLanguage: contentLanguage,
    setSecondaryLanguage: setContentLanguage,
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

/**
 * Hook for components displaying multilingual CONTENT (not UI)
 *
 * Use this for:
 * - Exhibition descriptions
 * - Artist statements
 * - Artwork descriptions
 * - News article body text
 * - Catalog forewords
 *
 * NOT for:
 * - Menu items (always English)
 * - Button labels (always English)
 * - Section titles (always English)
 */
export function useContent() {
  const { contentLanguage } = useLanguage()

  const getText = useCallback(
    (text: MultiLingualText | string | undefined): string => {
      if (!text) return ''
      if (typeof text === 'string') return text
      // Return selected language or fall back to English
      return text[contentLanguage] || text.en || ''
    },
    [contentLanguage]
  )

  return { getText, locale: contentLanguage }
}

// Legacy alias for backward compatibility
export function useMultiLingualText() {
  const { contentLanguage } = useLanguage()

  const getText = useCallback(
    (
      texts: MultiLingualText,
      type: 'primary' | 'secondary' = 'primary'
    ): string => {
      if (type === 'primary') {
        return texts.en
      }
      return texts[contentLanguage] || texts.en
    },
    [contentLanguage]
  )

  return { getText, secondaryLanguage: contentLanguage }
}
