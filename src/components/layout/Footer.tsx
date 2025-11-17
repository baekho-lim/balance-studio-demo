'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Instagram, Mail, Download } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

export default function Footer() {
  const qrRef = useRef<HTMLDivElement>(null)

  const downloadQRCode = () => {
    if (!qrRef.current) return

    const svg = qrRef.current.querySelector('svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL('image/png')

      const downloadLink = document.createElement('a')
      downloadLink.download = 'limhyejung-website-qr.png'
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }

  return (
    <footer className="bg-pastel-cream border-t border-primary/10">
      <div className="container-wide py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Artist Info */}
          <div>
            <h3 className="font-serif text-lg mb-2">Lim Hyejung</h3>
            <p className="text-sm text-secondary mb-4">임혜정</p>
            <p className="text-xs text-secondary/70 leading-relaxed">
              Contemporary artist exploring the threshold between imagination and reality
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-secondary hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#works" className="text-sm text-secondary hover:text-primary transition-colors">
                  Works
                </Link>
              </li>
              <li>
                <Link href="/story" className="text-sm text-secondary hover:text-primary transition-colors">
                  Story
                </Link>
              </li>
              <li>
                <Link href="/archive" className="text-sm text-secondary hover:text-primary transition-colors">
                  Archive
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-sm text-secondary hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm text-secondary hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-sm text-secondary hover:text-primary transition-colors">
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/postcards" className="text-sm text-secondary hover:text-primary transition-colors">
                  Postcards
                </Link>
              </li>
            </ul>
          </div>

          {/* Gallery Views */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-widest mb-4">Gallery Views</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/view/grid" className="text-sm text-secondary hover:text-primary transition-colors">
                  Grid View
                </Link>
              </li>
              <li>
                <Link href="/view/proportional" className="text-sm text-secondary hover:text-primary transition-colors">
                  Proportional View
                </Link>
              </li>
              <li>
                <Link href="/view/large" className="text-sm text-secondary hover:text-primary transition-colors">
                  Large View
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@limhyejung.com"
                  className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
                >
                  <Mail size={16} />
                  hello@limhyejung.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/limhyejung_artworks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
                >
                  <Instagram size={16} />
                  @limhyejung_artworks
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-widest mb-4">Resources</h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-secondary mb-2">Website</p>
                <a
                  href="https://www.limhyejung.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  www.limhyejung.com
                </a>
              </div>

              <div>
                <p className="text-xs text-secondary mb-2">QR Code</p>
                <div ref={qrRef} className="bg-white p-2 rounded inline-block">
                  <QRCodeSVG
                    value="https://www.limhyejung.com/"
                    size={80}
                    level="M"
                    includeMargin={false}
                  />
                </div>
              </div>

              <button
                onClick={downloadQRCode}
                className="flex items-center gap-2 text-xs text-primary hover:text-primary/70 transition-colors"
              >
                <Download size={14} />
                Download QR Code
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-primary/10 text-center">
          <p className="text-xs text-secondary">
            &copy; {new Date().getFullYear()} Lim Hyejung. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
