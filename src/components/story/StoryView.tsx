'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Artwork } from '@/types'
import { useLanguage } from '@/i18n'

// UI text is always English
const UI_TEXT = {
  tapToNavigate: 'Tap left or right to navigate',
  endOfStory: 'End of story',
}

interface StoryViewProps {
  artworks: Artwork[]
  onClose?: () => void
}

export default function StoryView({ artworks, onClose }: StoryViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { contentLanguage } = useLanguage()

  const currentArtwork = artworks[currentIndex]
  const totalArtworks = artworks.length

  // Get content language question based on selected language
  const contentQuestion = useMemo(() => {
    switch (contentLanguage) {
      case 'en':
        return null // Will show English as primary
      case 'ko':
        return currentArtwork.questionKr
      case 'vi':
        return currentArtwork.questionVi
      case 'ms':
        return currentArtwork.questionMs
      case 'id':
        return currentArtwork.questionId
      default:
        return currentArtwork.questionKr
    }
  }, [currentArtwork, contentLanguage])

  const goToNext = useCallback(() => {
    if (currentIndex < totalArtworks - 1 && !isTransitioning) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1)
        setIsTransitioning(false)
      }, 800)
    }
  }, [currentIndex, totalArtworks, isTransitioning])

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1)
        setIsTransitioning(false)
      }, 800)
    }
  }, [currentIndex, isTransitioning])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        goToNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrevious()
      } else if (e.key === 'Escape' && onClose) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrevious, onClose])

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrevious()
      }
    }
    setTouchStart(null)
  }

  // Click position handler
  const handleClick = (e: React.MouseEvent) => {
    const clickX = e.clientX
    const screenWidth = window.innerWidth
    const midPoint = screenWidth / 2

    if (clickX > midPoint) {
      goToNext()
    } else {
      goToPrevious()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-pastel-cream z-40 flex flex-col pt-20"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Story Header - below nav header */}
      <div className="w-full px-4 py-2 flex justify-between items-center">
        <div className="text-xs text-secondary tracking-widest uppercase">
          {currentIndex + 1} / {totalArtworks}
        </div>
        {onClose && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="p-2 hover:bg-white/50 rounded-full transition-colors z-50"
            aria-label="Close story view"
          >
            <X size={24} className="md:w-6 md:h-6 w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-4 md:py-8 cursor-pointer overflow-hidden"
        onClick={handleClick}
      >
        {/* Artwork Image - Responsive */}
        <div
          className={`relative w-full max-w-4xl flex-1 max-h-[45vh] md:max-h-[50vh] lg:max-h-[55vh] transition-opacity duration-700 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Image
            src={currentArtwork.images.full}
            alt={currentArtwork.images.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        </div>

        {/* Text Content - Responsive alignment */}
        <div
          className={`mt-4 md:mt-8 w-full max-w-2xl text-center md:text-right px-2 transition-opacity duration-700 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Artwork Title - Small */}
          <h2 className="text-xs text-secondary mb-2 md:mb-4 tracking-wide uppercase">
            {currentArtwork.title}
          </h2>

          {/* English Question */}
          <p className="font-serif text-base md:text-xl lg:text-2xl text-primary/80 leading-relaxed mb-2 md:mb-3">
            &ldquo;{currentArtwork.question}&rdquo;
          </p>

          {/* Content Language Question (if different from English) */}
          {contentQuestion && (
            <p className="font-serif text-sm md:text-lg lg:text-xl text-secondary leading-relaxed">
              &ldquo;{contentQuestion}&rdquo;
            </p>
          )}
        </div>

        {/* Click hint - UI always English */}
        <p className="mt-4 md:mt-8 text-xs text-secondary/50 animate-pulse">
          {currentIndex < totalArtworks - 1
            ? UI_TEXT.tapToNavigate
            : UI_TEXT.endOfStory}
        </p>
      </div>

      {/* Navigation Arrows - Responsive */}
      <div className="pb-4 md:pb-8 flex justify-center gap-6 md:gap-8">
        <button
          onClick={(e) => {
            e.stopPropagation()
            goToPrevious()
          }}
          disabled={currentIndex === 0}
          className={`p-2 md:p-3 rounded-full transition-all ${
            currentIndex === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-primary hover:bg-white/50 active:bg-white/70'
          }`}
          aria-label="Previous artwork"
        >
          <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            goToNext()
          }}
          disabled={currentIndex === totalArtworks - 1}
          className={`p-2 md:p-3 rounded-full transition-all ${
            currentIndex === totalArtworks - 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-primary hover:bg-white/50 active:bg-white/70'
          }`}
          aria-label="Next artwork"
        >
          <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
        </button>
      </div>
    </div>
  )
}
