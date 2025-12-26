'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import { ArrowLeft, Printer, Download } from 'lucide-react'
import artworksData from '@/data/artworks.json'
import catalogData from '@/data/catalog.json'
import type { Artwork } from '@/types'
import AuthGuard from '@/components/admin/AuthGuard'
import PrintWatermark from '@/components/print/PrintWatermark'
import PrintSpecsGuide from '@/components/print/PrintSpecsGuide'

const artworks = artworksData as Artwork[]

// Get diptych works from artworks.json
const diptychWorks = artworks.filter(w => w.id === 'es-001' || w.id === 'es-002')
  .sort((a, b) => a.id.localeCompare(b.id))

type Language = 'en' | 'kr'

export default function DiptychPostcardPage() {
  const [lang, setLang] = useState<Language>('en')
  const [printMode, setPrintMode] = useState<'front' | 'both'>('front')
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0)

  useEffect(() => {
    let count = 0
    const promises = diptychWorks.map((work) => {
      return new Promise<void>((resolve) => {
        const img = new window.Image()
        img.onload = () => {
          count++
          setLoadedCount(count)
          resolve()
        }
        img.onerror = () => {
          count++
          setLoadedCount(count)
          resolve()
        }
        img.src = work.images.full
      })
    })

    Promise.all(promises).then(() => {
      setImagesLoaded(true)
    })
  }, [])

  const handlePrint = () => {
    if (!imagesLoaded) {
      alert('이미지 로딩 중입니다. 잠시 기다려주세요.')
      return
    }
    window.print()
  }

  const handleDownloadBoth = async () => {
    for (const work of diptychWorks) {
      try {
        const response = await fetch(work.images.full)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${work.id}_${work.title.replace(/\s+/g, '_')}.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        await new Promise(resolve => setTimeout(resolve, 300))
      } catch (error) {
        console.error(`Download failed for ${work.id}:`, error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 print:bg-white print:min-h-0">
      {/* Print CSS */}
      <style jsx global>{`
        @media print {
          @page {
            size: 12in 4in;
            margin: 0;
          }

          body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          /* Hide all screen-only elements */
          .print\\:hidden,
          button[title="Logout"],
          [class*="print:hidden"],
          /* Hide Next.js dev indicators and browser UI */
          [data-nextjs-dialog],
          [data-nextjs-dialog-overlay],
          nextjs-portal,
          #__next-build-indicator,
          #__next-prerender-indicator,
          [class*="nextjs-"],
          [id*="__next"] > div:first-child:empty,
          /* Hide any fixed positioned elements at top-left */
          .fixed.top-4.left-4,
          .fixed.top-4.right-4,
          /* Hide watermarks for authenticated users */
          .print-watermark,
          .print-watermark-footer,
          /* Hide any other possible indicators */
          [style*="position: fixed"],
          [style*="position:fixed"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
          }

          /* Force hide everything except postcard content */
          body > *:not(main) {
            display: none !important;
          }

          .postcard-wrapper {
            page-break-inside: avoid;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Only add page break after front if both mode */
          .postcard-wrapper:first-of-type {
            page-break-after: always;
          }

          /* No page break after last element */
          .postcard-wrapper:last-of-type {
            page-break-after: avoid;
          }

          .print-container {
            width: 12in !important;
            height: 4in !important;
            margin: 0 !important;
            padding: 0 !important;
            display: flex !important;
          }

          .print-image-wrapper {
            width: 6in !important;
            height: 4in !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            flex-shrink: 0;
          }

          .print-image-wrapper > div {
            width: 100% !important;
            height: 100% !important;
          }

          .print-image-wrapper img {
            object-fit: cover !important;
          }

          .print-back {
            width: 12in !important;
            height: 4in !important;
            margin: 0 !important;
            padding: 0.3in !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>

      {/* Watermark for non-authenticated print attempts */}
      <PrintWatermark />

      {/* Controls - Hidden on print */}
      <div className="fixed top-4 right-4 z-50 print:hidden flex gap-4">
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

        {/* Print Mode Toggle */}
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-1 flex">
          <button
            onClick={() => setPrintMode('front')}
            className={`px-3 py-2 rounded-full text-xs transition-all ${
              printMode === 'front' ? 'bg-primary text-white' : 'text-primary hover:bg-gray-100'
            }`}
            title="앞면만 인쇄 (이미지만)"
          >
            앞면
          </button>
          <button
            onClick={() => setPrintMode('both')}
            className={`px-3 py-2 rounded-full text-xs transition-all ${
              printMode === 'both' ? 'bg-primary text-white' : 'text-primary hover:bg-gray-100'
            }`}
            title="인쇄소용: 앞면 → 뒷면"
          >
            앞+뒤
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed top-4 left-4 z-50 print:hidden flex gap-3">
        <Link
          href="/postcards"
          className="bg-white/90 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <AuthGuard
          fallback={
            <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-2 px-4 text-xs text-gray-600">
              🔒 PDF download requires password
            </div>
          }
        >
          <button
            onClick={handlePrint}
            disabled={!imagesLoaded}
            className={`px-6 py-2 rounded-full text-sm transition-all shadow-lg flex items-center gap-2 ${
              imagesLoaded
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
          >
            <Printer size={16} />
            {imagesLoaded ? 'Print 4×12"' : `Loading... ${loadedCount}/2`}
          </button>
        </AuthGuard>
        <AuthGuard fallback={null}>
          <button
            onClick={handleDownloadBoth}
            disabled={!imagesLoaded}
            className={`px-4 py-2 rounded-full text-sm transition-all shadow-lg flex items-center gap-2 ${
              imagesLoaded
                ? 'bg-white/90 backdrop-blur-sm text-primary hover:bg-gray-100'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            title="Download both images for print"
          >
            <Download size={16} />
            Download
          </button>
        </AuthGuard>
        <PrintSpecsGuide type="diptych" />
      </div>

      {/* Page Info - Hidden on print */}
      <div className="pt-20 pb-8 text-center print:hidden">
        <h1 className="font-serif text-2xl mb-2">Diptych Postcard</h1>
        <p className="text-secondary text-sm">4&quot; × 12&quot; - Print Ready</p>
        <p className="text-xs text-gray-500 mt-2">
          {lang === 'en'
            ? 'A diptych is a conversation between two moments'
            : '이면화는 두 순간의 대화입니다'}
        </p>
      </div>

      {/* Content Container */}
      <div className="flex flex-col items-center gap-12 px-4 print:gap-0 print:px-0">

        {/* Front Side - Diptych Images */}
        <div className="postcard-wrapper">
          <div
            className="print-container bg-white shadow-2xl print:shadow-none"
            style={{
              width: '12in',
              height: '4in',
              display: 'flex',
            }}
          >
            {/* Left Image - es-001 (붙여서 출력) */}
            <div
              className="print-image-wrapper relative"
              style={{ width: '6in', height: '4in' }}
            >
              <Image
                src={diptychWorks[0]?.images.full || ''}
                alt={diptychWorks[0]?.title || ''}
                fill
                priority
                quality={100}
                unoptimized
                className="object-cover"
                sizes="6in"
              />
            </div>

            {/* Right Image - es-002 (붙여서 출력) */}
            <div
              className="print-image-wrapper relative"
              style={{ width: '6in', height: '4in' }}
            >
              <Image
                src={diptychWorks[1]?.images.full || ''}
                alt={diptychWorks[1]?.title || ''}
                fill
                priority
                quality={100}
                unoptimized
                className="object-cover"
                sizes="6in"
              />
            </div>
          </div>
          <p className="text-center text-xs text-secondary mt-2 print:hidden">
            Front - Diptych (es-001 + es-002)
          </p>
        </div>

        {/* Back Side - Artwork Info (only when printMode is 'both') */}
        {printMode === 'both' && (
          <div className="postcard-wrapper">
            <div
              className="print-back bg-white shadow-2xl print:shadow-none"
              style={{
                width: '12in',
                height: '4in',
                padding: '0.3in',
                boxSizing: 'border-box',
              }}
            >
              <div className="h-full flex flex-col">
                {/* Header - Diptych Title */}
                <div className="text-center mb-3">
                  <p className="text-xs text-secondary italic">
                    {lang === 'en'
                      ? 'A diptych is a conversation between two moments—what passes between them is the art itself.'
                      : '이면화는 두 순간의 대화입니다. 그 사이를 흐르는 것이 예술입니다.'}
                  </p>
                </div>

                {/* Two Panels Info Side by Side */}
                <div className="flex-1 flex">
                  {/* Left Panel Info - es-001 */}
                  <div className="flex-1 pr-4 border-r border-gray-200 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg mb-1">
                        {diptychWorks[0]?.title || 'Effortlessly chirping birds (L)'}
                      </h3>
                      <p className="text-xs text-secondary mb-3">
                        {diptychWorks[0]?.year || 2025} · {diptychWorks[0]?.medium || 'Mixed media on canvas'} · {diptychWorks[0]?.dimensions || '60.5 x 91 cm'}
                      </p>

                      <div className="border-l-2 border-primary/30 pl-3">
                        <p className="text-sm italic text-primary/80 leading-relaxed">
                          {lang === 'en'
                            ? diptychWorks[0]?.question
                            : diptychWorks[0]?.questionKr}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel Info - es-002 */}
                  <div className="flex-1 pl-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg mb-1">
                        {diptychWorks[1]?.title || 'Effortlessly chirping birds (R)'}
                      </h3>
                      <p className="text-xs text-secondary mb-3">
                        {diptychWorks[1]?.year || 2025} · {diptychWorks[1]?.medium || 'Mixed media on canvas'} · {diptychWorks[1]?.dimensions || '60.5 x 91 cm'}
                      </p>

                      <div className="border-l-2 border-primary/30 pl-3">
                        <p className="text-sm italic text-primary/80 leading-relaxed">
                          {lang === 'en'
                            ? diptychWorks[1]?.question
                            : diptychWorks[1]?.questionKr}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer - Artist Info & QR */}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-serif text-sm">{catalogData.artist.name}</p>
                      <p className="text-xs text-secondary">{catalogData.artist.nameKr}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-white p-1 rounded">
                        <QRCodeSVG
                          value="https://www.limhyejung.com/"
                          size={50}
                          level="M"
                          includeMargin={false}
                        />
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-secondary">{catalogData.contact.website}</p>
                      <p className="text-xs text-secondary">{catalogData.contact.instagram}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-secondary mt-2 print:hidden">
              Back - Artwork Information
            </p>
          </div>
        )}
      </div>

      {/* Print Instructions - Hidden on print */}
      <div className="mt-8 text-center text-sm text-gray-500 print:hidden pb-12">
        <p>Chrome 브라우저에서 인쇄를 권장합니다</p>
        <p className="mt-1">
          인쇄 설정: 용지 크기 12×4인치, 여백 없음, 배경 그래픽 활성화
        </p>
      </div>
    </div>
  )
}
