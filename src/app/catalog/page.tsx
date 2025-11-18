'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import { ArrowLeft } from 'lucide-react'
import catalogData from '@/data/catalog.json'

type Language = 'en' | 'kr'

interface CatalogWork {
  id: string
  title: string
  year: number
  medium: string
  dimensions: string
  imageWidth: number
  imageHeight: number
  curator_text: {
    en: string
    kr: string
  }
  question: {
    en: string
    kr: string
  }
}

// Map artwork IDs to image files
const imageMap: Record<string, string> = {
  'sg-001': '/images/works/1. I am only passing though the woods..jpg',
  'sg-002': '/images/works/2. Look at me or Wait for the daffodiles..JPG',
  'sg-008': '/images/works/20.The attraction of emotion.jpeg',
  'es-001': '/images/works/3. Effortlessly chirping birds._L.JPG',
  'ds-001': '/images/works/13. You are going to grow up..JPG',
  'ds-002': '/images/works/14. I am going to have to grow old..JPG',
  'ds-003': '/images/works/15. And then I will die..JPG',
  'ds-004': '/images/works/19.they live like nothing....jpeg',
  'wt-004': '/images/works/21.Just that we grow.jpeg',
}

export default function CatalogPage() {
  const [lang, setLang] = useState<Language>('en')

  return (
    <div className="min-h-screen bg-white">
      {/* Print-Optimized CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page {
              size: A4;
              margin: 2cm;
            }

            .page-break-after {
              page-break-after: always;
              break-after: page;
            }

            h2, h3, h4 {
              page-break-after: avoid;
              break-after: avoid;
            }

            img {
              page-break-inside: avoid;
              break-inside: avoid;
            }

            body {
              font-size: 11pt;
              line-height: 1.5;
            }

            h2 {
              font-size: 18pt;
            }

            h3 {
              font-size: 16pt;
            }

            * {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              color-adjust: exact;
            }

            section {
              min-height: auto;
            }
          }
        `
      }} />

      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50 print:hidden">
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-1 flex">
          <button
            onClick={() => setLang('en')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              lang === 'en' ? 'bg-primary text-white' : 'text-primary hover:bg-gray-100'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('kr')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              lang === 'kr' ? 'bg-primary text-white' : 'text-primary hover:bg-gray-100'
            }`}
          >
            KR
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed top-4 left-4 z-50 print:hidden flex gap-3">
        <Link
          href="/"
          className="bg-white/90 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Home
        </Link>
        <button
          onClick={() => window.print()}
          className="bg-primary text-white px-6 py-2 rounded-full text-sm hover:bg-primary/90 transition-all shadow-lg"
        >
          Print / PDF
        </button>
      </div>

      {/* Cover Page */}
      <section className="h-screen relative page-break-after">
        {/* Background Artwork */}
        <div className="absolute inset-0">
          <Image
            src="/images/works/1. I am only passing though the woods..jpg"
            alt="Cover artwork"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Cover Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-8">
          <div className="text-center max-w-2xl">
            <h1 className="font-serif text-5xl md:text-6xl mb-4 tracking-wide text-white">
              {catalogData.title}
            </h1>
            <p className="text-xl text-white/80 mb-12">
              {catalogData.subtitle}
            </p>

            <div className="w-24 h-px bg-white/50 mx-auto mb-12" />

            <p className="font-serif text-2xl mb-2 text-white">
              {catalogData.artist.name}
            </p>
            <p className="text-lg text-white/80 mb-1">
              {catalogData.artist.nameKr}
            </p>
            <p className="text-sm text-white/60">
              {catalogData.artist.birth}
            </p>
          </div>
        </div>
      </section>

      {/* Exhibition Statement Page */}
      <section className="min-h-screen flex flex-col items-center justify-center p-8 md:p-16 page-break-after">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl mb-8 text-center">
            {lang === 'en' ? 'Exhibition Statement' : '전시 서문'}
          </h2>

          <div className="prose prose-lg max-w-none">
            <div className="text-base leading-relaxed whitespace-pre-line">
              {lang === 'en' ? catalogData.exhibitionStatement.en : catalogData.exhibitionStatement.kr}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works */}
      {catalogData.selectedWorks.map((work, index) => {
        // Calculate aspect ratio and determine orientation
        const aspectRatio = work.imageWidth / work.imageHeight
        const isPortrait = aspectRatio < 1

        return (
          <section key={work.id} className="min-h-screen p-8 md:p-16 page-break-after">
            <div className="max-w-6xl mx-auto">
              {isPortrait ? (
                /* Portrait Layout: Side-by-side (Image Left, Text Right) */
                <>
                  <div className="grid md:grid-cols-[60%_40%] gap-8 items-start">
                    {/* Artwork Image */}
                    <div className="relative w-full" style={{ aspectRatio: aspectRatio }}>
                      <Image
                        src={imageMap[work.id] || '/images/placeholder.jpg'}
                        alt={work.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                    </div>

                    {/* Artwork Info */}
                    <div className="flex flex-col justify-center">
                      <div className="mb-6">
                        <h3 className="font-serif text-2xl mb-2">
                          {work.title}
                        </h3>
                        <p className="text-secondary mb-2">
                          {work.year} · {work.medium}
                        </p>
                        <p className="text-sm text-secondary/70">
                          {work.dimensions}
                        </p>
                      </div>

                      <div>
                        <p className="text-base leading-relaxed mb-6">
                          {lang === 'en' ? work.curator_text.en : work.curator_text.kr}
                        </p>
                        <div className="border-l-2 border-primary/30 pl-4">
                          <p className="italic text-primary/80 text-sm">
                            {lang === 'en' ? work.question.en : work.question.kr}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-8 text-sm text-secondary/50">
                    {index + 1} / {catalogData.selectedWorks.length}
                  </div>
                </>
              ) : (
                /* Landscape Layout: Stacked (Image Top, Text Bottom in 2 Columns) */
                <>
                  {/* Artwork Image */}
                  <div className="relative w-full mb-8" style={{ aspectRatio: aspectRatio }}>
                    <Image
                      src={imageMap[work.id] || '/images/placeholder.jpg'}
                      alt={work.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 80vw"
                    />
                  </div>

                  {/* Artwork Info */}
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="font-serif text-2xl mb-2">
                        {work.title}
                      </h3>
                      <p className="text-secondary mb-4">
                        {work.year} · {work.medium}
                      </p>
                      <p className="text-sm text-secondary/70">
                        {work.dimensions}
                      </p>
                    </div>

                    <div>
                      <p className="text-lg leading-relaxed mb-6">
                        {lang === 'en' ? work.curator_text.en : work.curator_text.kr}
                      </p>
                      <div className="border-l-2 border-primary/30 pl-4">
                        <p className="italic text-primary/80">
                          {lang === 'en' ? work.question.en : work.question.kr}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-8 text-sm text-secondary/50">
                    {index + 1} / {catalogData.selectedWorks.length}
                  </div>
                </>
              )}
            </div>
          </section>
        )
      })}

      {/* Artist CV Page */}
      <section className="min-h-screen flex flex-col items-center justify-center p-8 md:p-16 page-break-after">
        <div className="max-w-2xl w-full">
          <h2 className="font-serif text-3xl mb-12 text-center">
            {lang === 'en' ? 'Artist' : '작가'}
          </h2>

          {/* Artist Profile Photo */}
          <div className="flex justify-center mb-12">
            <div className="relative w-48 h-48 rounded-full overflow-hidden bg-gray-100">
              <Image
                src="/images/artist/hj lim black.png"
                alt="Lim Hyejung"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-center">
              <h3 className="font-serif text-2xl mb-2">
                {catalogData.artist.name}
              </h3>
              <p className="text-lg text-secondary mb-1">
                {catalogData.artist.nameKr}
              </p>
              <p className="text-sm text-secondary/70">
                {catalogData.artist.birth}
              </p>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-widest text-secondary mb-4">
                {lang === 'en' ? 'Education' : '학력'}
              </h4>
              {catalogData.artist.education.map((edu, i) => (
                <div key={i} className="mb-2">
                  <p className="font-medium">{edu.degree}</p>
                  <p className="text-secondary">
                    {lang === 'en' ? edu.institution : edu.institutionKr}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-widest text-secondary mb-4">
                {lang === 'en' ? 'Contact' : '연락처'}
              </h4>
              <p className="mb-1">{catalogData.contact.email}</p>
              <p className="mb-6">{catalogData.contact.instagram}</p>

              {/* QR Code for Artist Website */}
              <div className="mt-6 text-center">
                <p className="text-sm uppercase tracking-widest text-secondary mb-4">
                  {lang === 'en' ? 'Visit Artist Website' : '작가 홈페이지'}
                </p>
                <div className="flex justify-center mb-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <QRCodeSVG
                      value="https://www.limhyejung.com/"
                      size={120}
                      level="M"
                      includeMargin={false}
                    />
                  </div>
                </div>
                <p className="text-sm text-primary">
                  https://www.limhyejung.com/
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Info Page */}
      <section className="min-h-screen flex flex-col items-center justify-center p-8 md:p-16">
        <div className="max-w-3xl w-full text-center">
          <h2 className="font-serif text-3xl mb-2">
            {catalogData.gallery.name}
          </h2>
          <p className="text-lg text-secondary mb-2">
            {catalogData.gallery.nameKr}
          </p>
          <p className="text-sm italic text-primary/70 mb-8">
            {catalogData.gallery.fullName}
          </p>

          <div className="w-16 h-px bg-primary/30 mx-auto mb-8" />

          <p className="text-lg leading-relaxed mb-8">
            {lang === 'en' ? catalogData.gallery.description : catalogData.gallery.descriptionKr}
          </p>

          <p className="text-sm text-secondary/70 mb-4">
            {catalogData.gallery.features}
          </p>

          <div className="mt-12">
            <p className="text-sm uppercase tracking-widest text-secondary mb-2">
              {lang === 'en' ? 'Address' : '주소'}
            </p>
            <p className="text-primary">
              {lang === 'en' ? catalogData.gallery.address.en : catalogData.gallery.address.kr}
            </p>
          </div>

          <div className="mt-8">
            <p className="text-sm text-secondary">
              {catalogData.contact.gallery_email}
            </p>
          </div>

          {/* QR Code for Gallery Website */}
          <div className="mt-12">
            <p className="text-sm uppercase tracking-widest text-secondary mb-4">
              {lang === 'en' ? 'Visit Gallery' : '갤러리 방문'}
            </p>
            <div className="flex justify-center mb-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <QRCodeSVG
                  value="https://www.ahlfah.com/"
                  size={150}
                  level="M"
                  includeMargin={false}
                />
              </div>
            </div>
            <a
              href="https://www.ahlfah.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              www.ahlfah.com
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
