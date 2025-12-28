'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Instagram, Youtube, MessageCircle } from 'lucide-react'

const quickLinks = [
  { name: 'Classes', href: '/demo/pilates/schedule' },
  { name: 'Instructors', href: '/demo/pilates/instructors' },
  { name: 'Pricing', href: '/demo/pilates/pricing' },
  { name: 'FAQ', href: '/demo/pilates#faq' },
]

const classTypes = [
  { name: 'Mat Pilates', href: '/demo/pilates/schedule' },
  { name: 'Reformer', href: '/demo/pilates/schedule' },
  { name: 'Yoga Flow', href: '/demo/pilates/schedule' },
  { name: 'Private Sessions', href: '/demo/pilates/pricing' },
]

export default function PilatesFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <Link href="/demo/pilates" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-bold">B</span>
              </div>
              <span className="text-xl font-bold">Balance Studio</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Find your balance, transform your body. Expert-led Pilates and wellness classes for all levels.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  123 Gangnam-daero, Gangnam-gu<br />Seoul, South Korea 06100
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a href="tel:02-1234-5678" className="text-gray-300 hover:text-white">
                  02-1234-5678
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a href="mailto:hello@balancestudio.kr" className="text-gray-300 hover:text-white">
                  hello@balancestudio.kr
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Mon - Sat: 7:00 AM - 9:00 PM<br />
                  Sunday: Closed
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Classes */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Classes</h3>
            <ul className="space-y-3">
              {classTypes.map((cls) => (
                <li key={cls.name}>
                  <Link
                    href={cls.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {cls.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Subscribe
              </button>
            </form>

            {/* Social Links */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">Follow us</p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://pf.kakao.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 Balance Studio. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/demo/pilates" className="hover:text-white">Privacy Policy</Link>
              <Link href="/demo/pilates" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="bg-blue-600 py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-blue-100">
            This is a demo template.
            <Link href="/demo" className="underline ml-2 text-white">
              Back to Demo Hub
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
