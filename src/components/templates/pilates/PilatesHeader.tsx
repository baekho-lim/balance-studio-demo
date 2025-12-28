'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/demo/pilates' },
  { name: 'Schedule', href: '/demo/pilates/schedule' },
  { name: 'Instructors', href: '/demo/pilates/instructors' },
  { name: 'Pricing', href: '/demo/pilates/pricing' },
  { name: 'Contact', href: '/demo/pilates#contact' },
]

export default function PilatesHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/demo/pilates" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Balance Studio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:02-1234-5678"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">02-1234-5678</span>
            </a>
            <Link
              href="/demo/pilates/schedule"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Book a Class
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 px-4">
                <Link
                  href="/demo/pilates/schedule"
                  className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book a Class
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
