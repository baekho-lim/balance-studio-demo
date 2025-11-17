'use client'

import { useState } from 'react'
import Image from 'next/image'
import { QRCodeSVG } from 'qrcode.react'
import catalogData from '@/data/catalog.json'

type Language = 'en' | 'kr'

// Map artwork IDs to image files
const imageMap: Record<string, string> = {
  'sg-001': '/images/works/1. I am only passing though the woods..jpg',
  'sg-002': '/images/works/2. Look at me or Wait for the daffodiles..JPG',
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

      {/* Print Button */}
      <div className="fixed top-4 left-4 z-50 print:hidden">
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

      {/* Artist Statement Page */}
      <section className="min-h-screen flex flex-col items-center justify-center p-8 md:p-16 page-break-after">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl mb-8 text-center">
            {lang === 'en' ? 'Artist Statement' : '작가 노트'}
          </h2>

          <div className="prose prose-lg max-w-none">
            {lang === 'en' ? (
              <>
                <p className="text-lg leading-relaxed mb-6">
                  My work explores the threshold between imagination and reality, where nature becomes a mirror
                  for our inner landscapes. Through mixed media on canvas, I reconstruct natural forms—forests,
                  flowers, birds—not as they appear in the physical world, but as they exist in the realm of
                  memory and emotion.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  The title of this exhibition, <em>Utopia = Reality</em>, suggests that the ideal world we
                  seek is not somewhere distant, but woven into the fabric of our present experience. Each
                  painting invites the viewer to pause, to look deeper, to find in these reimagined landscapes
                  something of their own truth.
                </p>
                <p className="text-lg leading-relaxed">
                  I paint what I feel rather than what I see. In this process, the boundary between the real
                  and the imagined dissolves, revealing that perhaps they were never separate at all.
                </p>
              </>
            ) : (
              <>
                <p className="text-lg leading-relaxed mb-6">
                  나의 작업은 상상과 현실 사이의 경계를 탐구하며, 자연은 우리 내면 풍경의 거울이 됩니다.
                  캔버스 위의 혼합 매체를 통해, 나는 숲, 꽃, 새와 같은 자연의 형태를 물리적 세계에 존재하는
                  그대로가 아닌, 기억과 감정의 영역에 존재하는 대로 재구성합니다.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  이 전시의 제목인 <em>유토피아 = 현실</em>은 우리가 찾는 이상적인 세계가 어딘가 먼 곳이
                  아니라 현재 경험의 직물 속에 짜여 있음을 암시합니다. 각 그림은 관람자를 멈추게 하고,
                  더 깊이 바라보게 하며, 이 재상상된 풍경 속에서 자신만의 진실을 발견하도록 초대합니다.
                </p>
                <p className="text-lg leading-relaxed">
                  나는 보이는 것이 아닌 느끼는 것을 그립니다. 이 과정에서 현실과 상상의 경계는 녹아들며,
                  아마도 그것들은 처음부터 분리되지 않았음을 드러냅니다.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Selected Works */}
      {catalogData.selectedWorks.map((work, index) => (
        <section key={work.id} className="min-h-screen p-8 md:p-16 page-break-after">
          <div className="max-w-6xl mx-auto">
            {/* Artwork Image */}
            <div className="relative w-full aspect-[4/3] mb-8 bg-gray-50">
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
          </div>
        </section>
      ))}

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
