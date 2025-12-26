'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import catalogData from '@/data/catalog.json'
import siteSettings from '@/data/site-settings.json'
import CatalogPrintStyles from '@/components/print/CatalogPrintStyles'
import PrintWatermark from '@/components/print/PrintWatermark'
import PrintBaseStyles from '@/components/print/PrintBaseStyles'
import ArtistProfileImage from '@/components/artist/ArtistProfileImage'
import AuthGuard from '@/components/admin/AuthGuard'
import PrintSpecsGuide from '@/components/print/PrintSpecsGuide'
import { Download } from 'lucide-react'
import type { SiteSettings } from '@/types'

const settings = siteSettings as SiteSettings

type Language = 'en' | 'kr'
type TextMode = 'poetic' | 'curator'

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
  curator_worldview: {
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
  'breathing-2024': '/images/works/2024/breathing.jpg',
  'spend-sometime-2024': '/images/works/2024/spend-sometime.jpg',
  'sg-001': '/images/works/1. I am only passing though the woods..jpg',
  'sg-002': '/images/works/2. Look at me or Wait for the daffodiles..JPG',
  'sg-008': '/images/works/20.The attraction of emotion.jpeg',
  'es-001': '/images/works/3. Effortlessly chirping birds._L.JPG',
  'es-002': '/images/works/4. Effortlessly chirping birds._R.JPG',
  'es-003': '/images/works/5. Take a break.JPG',
  'sg-003': '/images/works/8. Those ladybugs..JPG',
  'sg-005': '/images/works/10. THose mantises..jpg',
  'ds-001': '/images/works/13. You are going to grow up..JPG',
  'ds-002': '/images/works/14. I am going to have to grow old..JPG',
  'ds-003': '/images/works/15. And then I will die..JPG',
  'ds-004': '/images/works/19.they live like nothing....jpeg',
  'wt-004': '/images/works/21.Just that we grow.jpeg',
}

export default function CatalogPage() {
  const [lang, setLang] = useState<Language>('en')
  const [textMode, setTextMode] = useState<TextMode>('poetic')

  // Helper function to get curator text based on language and text mode
  const getCuratorText = (work: CatalogWork) => {
    if (textMode === 'poetic') {
      return lang === 'en' ? work.curator_text.en : work.curator_text.kr
    } else {
      return lang === 'en' ? work.curator_worldview.en : work.curator_worldview.kr
    }
  }

  // Calculate page numbers for all works
  const pageNumbersMap = useMemo(() => {
    const map = new Map<string, number>()
    let pageCounter = 1

    catalogData.selectedWorks.forEach((work) => {
      const isDiptychFirst = work.id === 'es-001'
      const isTriptychFirst = work.id === 'ds-001'
      const isDiptychOther = work.id === 'es-002'
      const isTriptychOther = ['ds-002', 'ds-003'].includes(work.id)

      if (isDiptychOther || isTriptychOther) {
        // Skip, will be handled with first
        return
      }

      if (isDiptychFirst) {
        map.set('diptych-overview', pageCounter++)
        map.set('es-001', pageCounter++)
        map.set('es-002', pageCounter++)
      } else if (isTriptychFirst) {
        map.set('triptych-overview', pageCounter++)
        map.set('ds-001', pageCounter++)
        map.set('ds-002', pageCounter++)
        map.set('ds-003', pageCounter++)
      } else {
        map.set(work.id, pageCounter++)
      }
    })

    return { map, totalPages: pageCounter - 1 }
  }, [])

  const handleDownloadAllImages = async () => {
    const imageEntries = Object.entries(imageMap)
    for (const [id, imagePath] of imageEntries) {
      try {
        const response = await fetch(imagePath)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        const filename = imagePath.split('/').pop() || `${id}.jpg`
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        await new Promise(resolve => setTimeout(resolve, 300))
      } catch (error) {
        console.error(`Download failed for ${id}:`, error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 공통 인쇄 CSS - 모듈화된 컴포넌트 */}
      <PrintBaseStyles />
      {/* Print-Optimized CSS - Now extracted to reusable component */}
      <CatalogPrintStyles />
      {/* Watermark for non-authenticated print attempts */}
      <PrintWatermark />

      {/* Top Right Controls: Language, Text Mode, Print */}
      <div className="fixed top-4 right-4 z-50 print:hidden flex flex-col gap-2 items-end">
        {/* Language Toggle */}
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

        {/* Text Mode Toggle - Always visible */}
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-1 flex">
          <button
            onClick={() => setTextMode('poetic')}
            className={`px-3 py-1.5 rounded-full text-xs transition-all ${
              textMode === 'poetic' ? 'bg-primary text-white' : 'text-primary hover:bg-gray-100'
            }`}
          >
            {lang === 'en' ? 'Poetic' : '에디터 버전'}
          </button>
          <button
            onClick={() => setTextMode('curator')}
            className={`px-3 py-1.5 rounded-full text-xs transition-all ${
              textMode === 'curator' ? 'bg-primary text-white' : 'text-primary hover:bg-gray-100'
            }`}
          >
            {lang === 'en' ? 'Worldview' : '큐레이터 버전'}
          </button>
        </div>

        {/* Print Button */}
        <AuthGuard
          fallback={
            <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-2 px-4 text-xs text-gray-600">
              🔒 PDF download requires password
            </div>
          }
        >
          <button
            onClick={() => window.print()}
            className="bg-primary text-white px-6 py-2 rounded-full text-sm hover:bg-primary/90 transition-all shadow-lg"
          >
            Print / PDF
          </button>
        </AuthGuard>

        {/* Download Images Button */}
        <AuthGuard fallback={null}>
          <button
            onClick={handleDownloadAllImages}
            className="bg-white/90 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2"
            title="Download all artwork images"
          >
            <Download size={16} />
            Download Images
          </button>
        </AuthGuard>

        {/* Print Specs Guide */}
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-3 py-2">
          <PrintSpecsGuide type="catalog" />
        </div>
      </div>

      {/* Cover Page */}
      <section className="h-screen relative page-break-after cover-page">
        {/* Background Artwork - Full Bleed */}
        <div className="absolute inset-0">
          <Image
            src={settings.catalogCover.imagePath}
            alt="Cover artwork"
            fill
            className="object-cover"
            priority
            quality={100}
            unoptimized
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Cover Content - Minimal */}
        <div className="relative h-full flex flex-col items-center justify-center p-12">
          <Link href="/" className="text-center max-w-2xl cursor-pointer hover:opacity-90 transition-opacity print:pointer-events-none">
            <h1 className="font-serif text-5xl md:text-6xl mb-3 tracking-wide text-white drop-shadow-lg">
              {catalogData.title}
            </h1>
            <p className="text-lg text-white/90 mb-8 drop-shadow-md">
              {lang === 'en' ? catalogData.subtitle.en : catalogData.subtitle.kr}
            </p>

            <div className="w-20 h-px bg-white/60 mx-auto mb-8" />

            <p className="font-serif text-xl mb-1 text-white drop-shadow-md">
              {catalogData.artist.name}
            </p>
            <p className="text-base text-white/85 drop-shadow-md">
              {catalogData.artist.nameKr}
            </p>
          </Link>
        </div>
      </section>

      {/* Exhibition Statement Page (Curator Jiyeon Park v1.1) */}
      <section className="min-h-screen flex flex-col items-center justify-start p-8 md:p-16 page-break-after">
        <div className="max-w-3xl mb-16">
          <h2 className="font-serif text-3xl mb-8 text-center">
            {lang === 'en' ? 'Exhibition Statement' : '전시 서문'}
          </h2>

          <div className="prose prose-lg max-w-none">
            <div className="text-base leading-relaxed whitespace-pre-line">
              {lang === 'en' ? catalogData.curatorStatement.en : catalogData.curatorStatement.kr}
            </div>
          </div>

          {/* Curator */}
          <div className="text-right mt-8">
            <p className="text-sm italic text-secondary/70">
              {lang === 'en' ? '— Jiyeon Park, Curator' : '— 큐레이터 박지연'}
            </p>
          </div>
        </div>
      </section>

      {/* Catalog Introduction Page */}
      <section className="min-h-screen flex flex-col items-center justify-start p-8 md:p-16 page-break-after">
        <div className="max-w-3xl mb-16">
          <h2 className="font-serif text-3xl mb-8 text-center">
            {lang === 'en' ? catalogData.catalogIntroduction.title.en : catalogData.catalogIntroduction.title.kr}
          </h2>

          <div className="prose prose-lg max-w-none">
            <div className="text-base leading-relaxed whitespace-pre-line">
              {lang === 'en' ? catalogData.catalogIntroduction.en : catalogData.catalogIntroduction.kr}
            </div>
          </div>

          {/* Author Name */}
          <div className="text-right mt-8">
            <p className="text-sm italic text-secondary/70">
              {lang === 'en' ? '— Baekho Lim, Editor' : '— 편집자 임백호'}
            </p>
          </div>
        </div>
      </section>

      {/* Selected Works */}
      {catalogData.selectedWorks.map((work, index) => {
        // Diptych works (Effortlessly chirping birds)
        const diptychIds = ['es-001', 'es-002']
        const isDiptych = diptychIds.includes(work.id)
        const isFirstOfDiptych = work.id === 'es-001'
        const isOtherDiptychPart = isDiptych && !isFirstOfDiptych

        // Triptych works (temporal series)
        const triptychIds = ['ds-001', 'ds-002', 'ds-003']
        const isTriptych = triptychIds.includes(work.id)
        const isFirstOfTriptych = work.id === 'ds-001'
        const isOtherTriptychPart = isTriptych && !isFirstOfTriptych

        // Skip rendering for second parts as they'll be shown with first
        if (isOtherDiptychPart || isOtherTriptychPart) return null

        // Calculate aspect ratio and determine orientation
        const aspectRatio = work.imageWidth / work.imageHeight
        const isPortrait = aspectRatio < 1

        // Get diptych works if this is the first one
        const diptychWorks = isFirstOfDiptych
          ? catalogData.selectedWorks.filter(w => diptychIds.includes(w.id))
          : null

        // Get triptych works if this is the first one
        const triptychWorks = isFirstOfTriptych
          ? catalogData.selectedWorks.filter(w => triptychIds.includes(w.id))
          : null

        // For triptych, render overview + individual pages
        if (triptychWorks && isFirstOfTriptych) {
          return (
            <React.Fragment key={`triptych-${work.id}`}>
              {/* Triptych Overview Page */}
              <section className="min-h-screen p-8 md:p-16 page-break-after overview-page">
                <div className="w-full h-full flex flex-col">
                  {/* Title - Enhanced hierarchy */}
                  <h2 className="font-serif text-2xl mb-8 text-center font-medium">
                    {lang === 'en' ? 'Temporal Triptych' : '시간 3부작'}
                  </h2>

                  {/* Three images in a row - Better breathing room */}
                  <div className="grid grid-cols-3 gap-4 mb-6" style={{ minHeight: '500px' }}>
                    {triptychWorks.map((tWork) => (
                      <div key={tWork.id} className="relative w-full" style={{ aspectRatio: tWork.imageWidth / tWork.imageHeight }}>
                        <Image
                          src={imageMap[tWork.id] || '/images/placeholder.jpg'}
                          alt={tWork.title}
                          fill
                          priority
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          quality={100}
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>

                  {/* Individual work info - Improved readability */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {triptychWorks.map((tWork) => (
                      <div key={`info-${tWork.id}`} className="text-center text-sm text-secondary/80">
                        <p className="font-medium mb-1">{tWork.title}</p>
                        <p className="text-xs text-secondary/60">{tWork.year}</p>
                        <p className="text-xs text-secondary/60">{tWork.dimensions}</p>
                      </div>
                    ))}
                  </div>

                  {/* Brief description - Enhanced prominence */}
                  <div className="text-center px-8 max-w-3xl mx-auto">
                    <p className="text-base leading-relaxed">
                      {lang === 'en'
                        ? 'A temporal trilogy capturing the arc of existence: growth, aging, and mortality. These three panels explore how all stages of life coexist within us, each informing and enriching the others. The following pages present each panel individually.'
                        : '존재의 궤적을 담은 시간 3부작: 성장, 노화, 죽음. 세 개의 패널은 삶의 모든 단계가 우리 안에서 어떻게 공존하며, 서로를 알리고 풍요롭게 하는지 탐구한다. 다음 페이지에서 각 패널을 개별적으로 살펴본다.'
                      }
                    </p>
                  </div>

                  <div className="absolute bottom-8 left-0 right-0 text-center text-sm text-secondary/50">
                    {pageNumbersMap.map.get('triptych-overview')} / {pageNumbersMap.totalPages}
                  </div>
                </div>
              </section>

              {/* Individual Pages for Each Triptych Work */}
              {triptychWorks.map((tWork, tIdx) => {
                const tAspectRatio = tWork.imageWidth / tWork.imageHeight

                return (
                  <section key={`triptych-detail-${tWork.id}`} className="min-h-screen p-8 md:p-16 page-break-after">
                    <div className="max-w-6xl mx-auto">
                      {/* Portrait Layout: Image Left (60%), Text Right (40%) */}
                      <div className="grid md:grid-cols-[60%_40%] gap-8 items-start">
                        {/* Artwork Image */}
                        <div className="relative w-full" style={{ aspectRatio: tAspectRatio }}>
                          <Image
                            src={imageMap[tWork.id] || '/images/placeholder.jpg'}
                            alt={tWork.title}
                            fill
                            priority
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 60vw"
                            quality={100}
                            unoptimized
                          />
                        </div>

                        {/* Artwork Info */}
                        <div className="flex flex-col justify-center">
                          <div className="mb-6">
                            <div className="text-xs text-secondary/50 mb-2">
                              {lang === 'en' ? `Temporal Triptych ${tIdx + 1}/3` : `시간 3부작 ${tIdx + 1}/3`}
                            </div>
                            <h3 className="font-serif text-2xl mb-2">
                              {tWork.title}
                            </h3>
                            <p className="text-secondary mb-2">
                              {tWork.year} · {tWork.medium}
                            </p>
                            <p className="text-sm text-secondary/70">
                              {tWork.dimensions}
                            </p>
                          </div>

                          <div>
                            <p className="text-base leading-relaxed mb-6">
                              {getCuratorText(tWork)}
                            </p>
                            <div className="border-l-2 border-primary/30 pl-4">
                              <p className="italic text-primary/80 text-sm">
                                {lang === 'en' ? tWork.question.en : tWork.question.kr}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-8 left-0 right-0 text-center text-sm text-secondary/50">
                        {pageNumbersMap.map.get(tWork.id)} / {pageNumbersMap.totalPages}
                      </div>
                    </div>
                  </section>
                )
              })}
            </React.Fragment>
          )
        }

        // For diptych, render overview + individual pages
        if (diptychWorks && isFirstOfDiptych) {
          return (
            <React.Fragment key={`diptych-${work.id}`}>
              {/* Diptych Overview Page */}
              <section className="min-h-screen p-8 md:p-16 page-break-after overview-page">
                <div className="w-full h-full flex flex-col">
                  {/* Title - Enhanced hierarchy */}
                  <h2 className="font-serif text-2xl mb-8 text-center font-medium">
                    {diptychWorks[0].title.replace(/\s*\([LR]\)$/, '')}
                  </h2>

                  {/* Two images side-by-side - Better breathing room */}
                  <div className="grid grid-cols-2 gap-4 mb-6" style={{ minHeight: '500px' }}>
                    {diptychWorks.map((dWork) => {
                      const dAspectRatio = dWork.imageWidth / dWork.imageHeight
                      return (
                        <div key={dWork.id} className="relative w-full" style={{ aspectRatio: dAspectRatio }}>
                          <Image
                            src={imageMap[dWork.id] || '/images/placeholder.jpg'}
                            alt={dWork.title}
                            fill
                            priority
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={100}
                            unoptimized
                          />
                        </div>
                      )
                    })}
                  </div>

                  {/* Individual work info - Improved readability */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {diptychWorks.map((dWork) => (
                      <div key={`info-${dWork.id}`} className="text-center text-sm text-secondary/80">
                        <p className="font-medium mb-1">{dWork.title}</p>
                        <p className="text-xs text-secondary/60">{dWork.year}</p>
                        <p className="text-xs text-secondary/60">{dWork.dimensions}</p>
                      </div>
                    ))}
                  </div>

                  {/* Brief description - Enhanced prominence */}
                  <div className="text-center px-8 max-w-3xl mx-auto">
                    <p className="text-base leading-relaxed">
                      {lang === 'en'
                        ? 'Two moments in expression: the gathering before sound, and the release into song. This diptych explores how authentic communication flows not from effort, but from presence.'
                        : '표현의 두 순간: 소리 전의 모임, 그리고 노래로의 방출. 이 이면화는 진정한 소통이 노력이 아닌 현존에서 어떻게 흐르는지 탐구한다.'
                      }
                    </p>
                  </div>

                  <div className="absolute bottom-8 left-0 right-0 text-center text-sm text-secondary/50">
                    {pageNumbersMap.map.get('diptych-overview')} / {pageNumbersMap.totalPages}
                  </div>
                </div>
              </section>

              {/* Individual Pages for Each Diptych Work */}
              {diptychWorks.map((dWork, dIdx) => {
                const dAspectRatio = dWork.imageWidth / dWork.imageHeight

                return (
                  <section key={`diptych-detail-${dWork.id}`} className="min-h-screen p-8 md:p-16 page-break-after">
                    <div className="max-w-6xl mx-auto">
                      {/* Artwork Image */}
                      <div className="relative w-full mb-6" style={{ aspectRatio: dAspectRatio }}>
                        <Image
                          src={imageMap[dWork.id] || '/images/placeholder.jpg'}
                          alt={dWork.title}
                          fill
                          priority
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 80vw"
                          quality={100}
                          unoptimized
                        />
                      </div>

                      {/* Metadata - Compact */}
                      <div className="mb-4">
                        <div className="text-xs text-secondary/50 mb-2">
                          {lang === 'en' ? `Diptych ${dIdx + 1}/2` : `이면화 ${dIdx + 1}/2`}
                        </div>
                        <h3 className="font-serif text-2xl mb-2">
                          {dWork.title}
                        </h3>
                        <p className="text-secondary text-sm">
                          {dWork.year} · {dWork.medium} · {dWork.dimensions}
                        </p>
                      </div>

                      {/* Curator Text - 2 Columns */}
                      <div className="landscape-text-columns mb-4">
                        <p className="text-base leading-relaxed">
                          {getCuratorText(dWork)}
                        </p>
                      </div>

                      {/* Question - Full Width */}
                      <div className="border-l-2 border-primary/30 pl-4">
                        <p className="italic text-primary/80 text-sm">
                          {lang === 'en' ? dWork.question.en : dWork.question.kr}
                        </p>
                      </div>

                      <div className="absolute bottom-8 left-0 right-0 text-center text-sm text-secondary/50">
                        {pageNumbersMap.map.get(dWork.id)} / {pageNumbersMap.totalPages}
                      </div>
                    </div>
                  </section>
                )
              })}
            </React.Fragment>
          )
        }

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
                        priority
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        quality={100}
                        unoptimized
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
                          {getCuratorText(work)}
                        </p>
                        <div className="border-l-2 border-primary/30 pl-4">
                          <p className="italic text-primary/80 text-sm">
                            {lang === 'en' ? work.question.en : work.question.kr}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-0 right-0 text-center text-sm text-secondary/50">
                    {pageNumbersMap.map.get(work.id)} / {pageNumbersMap.totalPages}
                  </div>
                </>
              ) : (
                /* Landscape Layout: Image Top, 2-Column Text Below */
                <>
                  {/* Artwork Image */}
                  <div className="relative w-full mb-6" style={{ aspectRatio: aspectRatio }}>
                    <Image
                      src={imageMap[work.id] || '/images/placeholder.jpg'}
                      alt={work.title}
                      fill
                      priority
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 80vw"
                      quality={100}
                      unoptimized
                    />
                  </div>

                  {/* Metadata - Compact */}
                  <div className="mb-4">
                    <h3 className="font-serif text-2xl mb-2">
                      {work.title}
                    </h3>
                    <p className="text-secondary text-sm">
                      {work.year} · {work.medium} · {work.dimensions}
                    </p>
                  </div>

                  {/* Curator Text - 2 Columns */}
                  <div className="landscape-text-columns mb-4">
                    <p className="text-base leading-relaxed">
                      {getCuratorText(work)}
                    </p>
                  </div>

                  {/* Question - Full Width */}
                  <div className="border-l-2 border-primary/30 pl-4">
                    <p className="italic text-primary/80 text-sm">
                      {lang === 'en' ? work.question.en : work.question.kr}
                    </p>
                  </div>

                  <div className="absolute bottom-8 left-0 right-0 text-center text-sm text-secondary/50">
                    {pageNumbersMap.map.get(work.id)} / {pageNumbersMap.totalPages}
                  </div>
                </>
              )}
            </div>
          </section>
        )
      })}

      {/* Artist CV Page */}
      <section className="min-h-screen flex flex-col items-center justify-start p-8 md:p-16 page-break-after">
        <div className="max-w-2xl w-full mb-16">
          <h2 className="font-serif text-3xl mb-12 text-center">
            Artist
          </h2>

          {/* Artist Profile Photo */}
          <div className="flex justify-center mb-12">
            <ArtistProfileImage size="medium" />
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
              <p className="mb-1">{catalogData.contact.gallery_email}</p>
              <p className="mb-6">{catalogData.contact.instagram}</p>

              {/* QR Code for Artist Website */}
              <div className="mt-6">
                <p className="text-sm uppercase tracking-widest text-secondary mb-4">
                  {lang === 'en' ? 'Visit Artist Website' : '작가 홈페이지'}
                </p>
                <div className="mb-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm inline-block">
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
      <section className="min-h-screen flex flex-col items-center justify-start p-8 md:p-16">
        <div className="max-w-3xl w-full text-center mb-16">
          <h2 className="font-serif text-3xl mb-2">
            {catalogData.gallery.name}
          </h2>
          <p className="text-lg text-secondary mb-2">
            {catalogData.gallery.nameKr}
          </p>
          <p className="text-sm italic text-primary/70 mb-2">
            {catalogData.gallery.fullName}
          </p>
          <p className="text-sm text-secondary/60 mb-8">
            {lang === 'en' ? 'Jinsol Park, Director' : '박진솔 관장'}
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
                  size={120}
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
