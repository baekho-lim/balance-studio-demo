import { Instagram, ArrowUpRight } from 'lucide-react'
import type { Artist } from '@/types'

interface ContactSectionProps {
  contact: Artist['contact']
}

export default function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section className="py-24 md:py-32 bg-pastel-green/20">
      <div className="container-wide text-center">
        <h2 className="font-serif text-3xl md:text-4xl mb-4">Get in Touch</h2>
        <p className="text-secondary mb-12">연락처</p>

        <div className="flex justify-center items-center">
          {/* Instagram */}
          {contact.instagram && (
            <a
              href={`https://instagram.com/${contact.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg hover:text-pastel-sage transition-colors group"
            >
              <Instagram size={20} />
              <span>{contact.instagram}</span>
              <ArrowUpRight
                size={16}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
