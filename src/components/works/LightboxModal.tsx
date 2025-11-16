'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { X, ChevronDown } from 'lucide-react'
import type { Artwork } from '@/types'

interface LightboxModalProps {
  artwork: Artwork
  onClose: () => void
}

export default function LightboxModal({
  artwork,
  onClose,
}: LightboxModalProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [swipeOffset, setSwipeOffset] = useState(0)
  const modalRef = useRef<HTMLDivElement>(null)

  // Minimum swipe distance to trigger close (in pixels)
  const minSwipeDistance = 100

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  // Touch handlers for swipe down to close
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return
    const currentTouch = e.targetTouches[0].clientY
    const diff = currentTouch - touchStart
    // Only allow downward swipe
    if (diff > 0) {
      setSwipeOffset(diff)
      setTouchEnd(currentTouch)
    }
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setSwipeOffset(0)
      return
    }
    const distance = touchEnd - touchStart
    if (distance > minSwipeDistance) {
      onClose()
    } else {
      setSwipeOffset(0)
    }
    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Swipe indicator for mobile */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/50 md:hidden flex flex-col items-center">
        <ChevronDown size={24} className="animate-bounce" />
        <span className="text-xs">Swipe down to close</span>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
        aria-label="Close"
      >
        <X size={32} />
      </button>

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="w-full max-w-7xl max-h-full overflow-y-auto bg-pastel-cream transition-transform duration-200"
        style={{ transform: `translateY(${swipeOffset}px)`, opacity: 1 - swipeOffset / 500 }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square lg:aspect-auto lg:min-h-[600px]">
            <Image
              src={artwork.images.full}
              alt={artwork.images.alt}
              fill
              className="object-contain bg-white"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Details */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-2">
              {artwork.title}
            </h2>

            {artwork.titleKr && (
              <p className="text-lg text-secondary mb-6">{artwork.titleKr}</p>
            )}

            <div className="space-y-4 text-sm text-secondary">
              <p>
                <span className="font-medium text-primary">Year:</span>{' '}
                {artwork.year}
              </p>
              <p>
                <span className="font-medium text-primary">Medium:</span>{' '}
                {artwork.medium}
              </p>
              {artwork.dimensions && (
                <p>
                  <span className="font-medium text-primary">Dimensions:</span>{' '}
                  {artwork.dimensions}
                </p>
              )}
            </div>

            {/* Question */}
            {artwork.question && (
              <blockquote className="mt-8 pl-4 border-l-2 border-pastel-sage">
                <p className="italic text-primary/80">
                  &ldquo;{artwork.question}&rdquo;
                </p>
                {artwork.questionKr && (
                  <p className="mt-2 text-sm text-secondary">
                    {artwork.questionKr}
                  </p>
                )}
              </blockquote>
            )}

            {/* Description */}
            {artwork.description && (
              <div className="mt-8 space-y-3">
                <p className="leading-relaxed text-primary/80">
                  {artwork.description}
                </p>
                {artwork.descriptionKr && (
                  <p className="text-sm leading-relaxed text-secondary">
                    {artwork.descriptionKr}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
