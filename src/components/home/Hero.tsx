'use client'

import Image from 'next/image'
import ScrollIndicator from '@/components/ui/ScrollIndicator'

interface HeroProps {
  backgroundImage: string
  artistName: string
  tagline: string
}

export default function Hero({
  backgroundImage,
  artistName,
  tagline,
}: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image - Full Screen */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Featured artwork"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      {/* Content - Centered */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Artist Name */}
        <h1
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl
                     text-white tracking-wide opacity-0 animate-fadeIn"
        >
          {artistName}
        </h1>

        {/* Decorative Line */}
        <div
          className="w-24 h-px bg-white/60 my-8
                     opacity-0 animate-fadeIn animation-delay-200"
        />

        {/* Tagline */}
        <p
          className="font-sans text-lg sm:text-xl md:text-2xl
                     text-white/90 tracking-widest uppercase
                     opacity-0 animate-fadeIn animation-delay-400"
        >
          {tagline}
        </p>

        {/* Korean Subtitle (optional) */}
        <p
          className="mt-4 text-sm text-white/70 tracking-wider
                     opacity-0 animate-fadeIn animation-delay-600"
        >
          자연과 감정이 재구성된 세계
        </p>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  )
}
