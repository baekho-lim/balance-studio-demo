'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Artwork } from '@/types'
import { useLanguage } from '@/i18n'

interface StoryViewProps {
  artworks: Artwork[]
  onClose?: () => void
}

export default function StoryView({ artworks, onClose }: StoryViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { secondaryLanguage, t } = useLanguage()

  const currentArtwork = artworks[currentIndex]
  const totalArtworks = artworks.length

  // Get secondary language question based on selected language
  const secondaryQuestion = useMemo(() => {
    switch (secondaryLanguage) {
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
  }, [currentArtwork, secondaryLanguage])

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
      className="fixed inset-0 bg-pastel-cream z-50 flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
        <div className="text-xs text-secondary tracking-widest uppercase">
          {currentIndex + 1} / {totalArtworks}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
            aria-label="Close story view"
          >
            <X size={24} />
          </button>
        )}
      </div>

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 py-16 cursor-pointer"
        onClick={handleClick}
      >
        {/* Artwork Image - Large */}
        <div
          className={`relative w-full max-w-4xl flex-1 max-h-[55vh] transition-opacity duration-700 ease-in-out ${
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

        {/* Text Content - Right Aligned */}
        <div
          className={`mt-8 w-full max-w-2xl text-right transition-opacity duration-700 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Artwork Title - Small */}
          <h2 className="text-xs text-secondary mb-4 tracking-wide uppercase">
            {currentArtwork.title}
          </h2>

          {/* English Question */}
          <p className="font-serif text-lg md:text-xl lg:text-2xl text-primary/80 leading-relaxed mb-3">
            &ldquo;{currentArtwork.question}&rdquo;
          </p>

          {/* Secondary Language Question */}
          {secondaryQuestion && (
            <p className="font-serif text-base md:text-lg lg:text-xl text-secondary leading-relaxed">
              &ldquo;{secondaryQuestion}&rdquo;
            </p>
          )}
        </div>

        {/* Click hint */}
        <p className="mt-8 text-xs text-secondary/50 animate-pulse">
          {currentIndex < totalArtworks - 1
            ? t.storyView.tapToNavigate
            : t.storyView.endOfStory}
        </p>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8">
        <button
          onClick={(e) => {
            e.stopPropagation()
            goToPrevious()
          }}
          disabled={currentIndex === 0}
          className={`p-3 rounded-full transition-all ${
            currentIndex === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-primary hover:bg-white/50'
          }`}
          aria-label="Previous artwork"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            goToNext()
          }}
          disabled={currentIndex === totalArtworks - 1}
          className={`p-3 rounded-full transition-all ${
            currentIndex === totalArtworks - 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-primary hover:bg-white/50'
          }`}
          aria-label="Next artwork"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  )
}
