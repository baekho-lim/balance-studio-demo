'use client'

import { ChevronDown } from 'lucide-react'

export default function ScrollIndicator() {
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
      aria-label="Scroll down"
    >
      <span className="text-xs tracking-widest uppercase">Scroll</span>
      <ChevronDown className="animate-scrollDown" size={24} />
    </button>
  )
}
