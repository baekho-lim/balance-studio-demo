'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/i18n'
import { LANGUAGES, SECONDARY_LANGUAGES, type LanguageCode } from '@/i18n/types'

export default function LanguageSelector() {
  const { secondaryLanguage, setSecondaryLanguage } = useLanguage()
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
      const saved = localStorage.getItem('preferredSecondaryLanguage')
      if (
        saved &&
        SECONDARY_LANGUAGES.includes(saved as Exclude<LanguageCode, 'en'>)
      ) {
        setSecondaryLanguage(saved as Exclude<LanguageCode, 'en'>)
      }
    }
  }, [setSecondaryLanguage])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm tracking-wide hover:bg-white/50 rounded-md transition-colors"
        aria-label="Select secondary language"
      >
        <Globe size={16} />
        <span className="hidden sm:inline">
          {LANGUAGES[secondaryLanguage].nativeName}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[180px] z-50">
          <div className="px-3 py-2 text-xs text-secondary uppercase tracking-wider border-b border-gray-100">
            Secondary Language
          </div>
          {SECONDARY_LANGUAGES.map((langCode) => (
            <button
              key={langCode}
              onClick={() => {
                setSecondaryLanguage(langCode)
                setIsOpen(false)
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-pastel-sage/20 transition-colors flex items-center justify-between ${
                secondaryLanguage === langCode ? 'bg-pastel-sage/10' : ''
              }`}
            >
              <span>{LANGUAGES[langCode].name}</span>
              <span className="text-secondary">
                {LANGUAGES[langCode].nativeName}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
