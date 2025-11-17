import Link from 'next/link'
import { Instagram, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-pastel-cream border-t border-primary/10">
      <div className="container-wide py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
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
                <Link href="/catalog" className="text-sm text-secondary hover:text-primary transition-colors">
                  Catalog
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
