'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/i18n'
import { LANGUAGES, SUPPORTED_LANGUAGES, type LanguageCode } from '@/i18n/types'

/**
 * Language Selector for Content Language
 *
 * - UI is always English (buttons, menus, labels)
 * - This selector changes the CONTENT language only
 * - Default: English (for global accessibility)
 * - Shows all 11 supported languages
 */
export default function LanguageSelector() {
  const { contentLanguage, setContentLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Load saved preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferredContentLanguage')
      if (saved && SUPPORTED_LANGUAGES.includes(saved as LanguageCode)) {
        setContentLanguage(saved as LanguageCode)
      }
    }
  }, [setContentLanguage])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm tracking-wide hover:bg-white/50 rounded-md transition-colors"
        aria-label="Select content language"
      >
        <Globe size={16} />
        <span className="hidden sm:inline">
          {LANGUAGES[contentLanguage].nativeName}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[200px] z-50 max-h-[400px] overflow-y-auto">
          <div className="px-3 py-2 text-xs text-secondary uppercase tracking-wider border-b border-gray-100">
            Content Language
          </div>
          {SUPPORTED_LANGUAGES.map((langCode) => (
            <button
              key={langCode}
              onClick={() => {
                setContentLanguage(langCode)
                setIsOpen(false)
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-pastel-sage/20 transition-colors flex items-center justify-between ${
                contentLanguage === langCode ? 'bg-pastel-sage/10 font-medium' : ''
              }`}
            >
              <span>{LANGUAGES[langCode].nativeName}</span>
              <span className="text-secondary text-xs">
                {LANGUAGES[langCode].name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
