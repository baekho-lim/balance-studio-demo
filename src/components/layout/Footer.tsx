import Link from 'next/link'
import { Instagram, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-pastel-cream border-t border-primary/10">
      <div className="container-wide py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Artist Name */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-lg">Lim Hyejung</h3>
            <p className="text-sm text-secondary mt-1">임혜정</p>
          </div>

          {/* Contact Links */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:hello@limhyejung.com"
              className="flex items-center gap-2 text-sm hover:text-pastel-sage transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
              <span className="hidden sm:inline">hello@limhyejung.com</span>
            </a>
            <a
              href="https://instagram.com/limhyejung_art"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-pastel-sage transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
              <span className="hidden sm:inline">@limhyejung_art</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-primary/10 text-center">
          <p className="text-xs text-secondary">
            &copy; {new Date().getFullYear()} Lim Hyejung. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
