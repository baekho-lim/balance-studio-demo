'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import LanguageSelector from '@/components/ui/LanguageSelector'

const navigation = [
  { name: 'Works', href: '#works' },
  { name: 'Story', href: '/story', isLink: true },
  { name: 'Catalog', href: '/catalog', isLink: true },
  { name: 'Archive', href: '/archive', isLink: true },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? 'bg-pastel-cream/90 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className={`font-serif text-xl tracking-wide hover:opacity-70 transition-all ${
              isScrolled ? 'text-primary' : 'text-white'
            }`}
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
                    isScrolled ? 'text-primary' : 'text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-sm tracking-widest uppercase hover:text-pastel-sage transition-all ${
                    isScrolled ? 'text-primary' : 'text-white'
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
            className={`md:hidden p-2 ${isScrolled ? 'text-primary' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-pastel-cream/95 backdrop-blur-sm">
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
