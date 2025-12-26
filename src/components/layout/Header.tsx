'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import LanguageSelector from '@/components/ui/LanguageSelector'

const navigation = [
  { name: 'Works', href: '/#works' },
  { name: 'Exhibitions', href: '/exhibitions', isLink: true },
  { name: 'News', href: '/news', isLink: true },
  { name: 'Story', href: '/story', isLink: true },
  { name: 'FAQ', href: '/faq', isLink: true },
  { name: 'Partnership', href: '/partnership', isLink: true },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 홈페이지가 아니거나 스크롤된 경우 어두운 글씨 사용
  const useDarkText = pathname !== '/' || isScrolled

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)

    // Check if it's a hash link (e.g., /#works, /#contact)
    if (href.startsWith('/#')) {
      const hash = href.substring(1) // Get #works from /#works
      if (pathname === '/') {
        // Already on homepage, just scroll
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // Navigate to homepage with hash
        router.push(href)
      }
    } else if (href.startsWith('#')) {
      // Legacy anchor link (shouldn't happen with new navigation)
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const goToHome = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      router.push('/')
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? 'bg-pastel-cream/90 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="container-wide" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={goToHome}
            className={`font-serif text-xl tracking-wide hover:opacity-70 transition-all ${
              useDarkText ? 'text-primary' : 'text-white'
            }`}
            aria-label="Go to homepage"
          >
            Lim Hyejung
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navigation.map((item) => (
              'isLink' in item && item.isLink ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm tracking-widest uppercase hover:text-pastel-sage transition-all ${
                    useDarkText ? 'text-primary' : 'text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-sm tracking-widest uppercase hover:text-pastel-sage transition-all ${
                    useDarkText ? 'text-primary' : 'text-white'
                  }`}
                >
                  {item.name}
                </button>
              )
            ))}
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ${useDarkText ? 'text-primary' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden bg-pastel-cream/95 backdrop-blur-sm"
          role="menu"
          aria-label="Mobile navigation menu"
        >
          <div className="container-wide py-8 space-y-6">
            {navigation.map((item) => (
              'isLink' in item && item.isLink ? (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg tracking-wide hover:text-pastel-sage transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block text-lg tracking-wide hover:text-pastel-sage transition-colors"
                >
                  {item.name}
                </button>
              )
            ))}
            <div className="pt-4 border-t border-gray-200">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
