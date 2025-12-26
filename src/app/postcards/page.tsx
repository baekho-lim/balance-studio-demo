'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import { ArrowLeft } from 'lucide-react'
import artworksData from '@/data/artworks.json'
import catalogData from '@/data/catalog.json'
import type { Artwork } from '@/types'
import AuthGuard from '@/components/admin/AuthGuard'
import PrintWatermark from '@/components/print/PrintWatermark'

const artworks = artworksData as Artwork[]

type Language = 'en' | 'kr'

export default function PostcardsPage() {
  const [lang, setLang] = useState<Language>('en')
  const [orientationFilter, setOrientationFilter] = useState<'all' | 'portrait' | 'landscape'>('all')
  const [printMode, setPrintMode] = useState<'front' | 'both'>('front')
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [totalImages, setTotalImages] = useState(0)

  // Preload images when filter changes
  React.useEffect(() => {
    const filteredWorks = artworks.filter((work) => {
      if (orientationFilter === 'all') return true
      const isPortrait = (work.imageHeight || 0) > (work.imageWidth || 0)
      if (orientationFilter === 'portrait') return isPortrait
      if (orientationFilter === 'landscape') return !isPortrait
      return true
    })

    setImagesLoaded(false)
    setLoadingProgress(0)
    setTotalImages(filteredWorks.length)

    let loadedCount = 0
    const imagePromises = filteredWorks.map((work) => {
      return new Promise<void>((resolve) => {
        const img = new window.Image()
        img.onload = () => {
          loadedCount++
          setLoadingProgress(loadedCount)
          resolve()
        }
        img.onerror = () => {
          loadedCount++
          setLoadingProgress(loadedCount)
          resolve()
        }
        img.src = work.images.full
      })
    })

    Promise.all(imagePromises).then(() => {
      setImagesLoaded(true)
    })
  }, [orientationFilter])

  const handlePrint = () => {
    if (!imagesLoaded) {
      alert('이미지 로딩 중입니다. 잠시 기다려주세요.')
      return
    }
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 print:py-0">
      {/* Watermark for non-authenticated print attempts */}
      <PrintWatermark />

      {/* Controls */}
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

        {/* Orientation Filter */}
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-1 flex">
          <button
            onClick={() => setOrientationFilter('all')}
            className={`px-3 py-2 rounded-full text-xs transition-all ${
              orientationFilter === 'all' ? 'bg-primary text-white' : 'text-primary hover:bg-gray-100'
            }`}
            title="모든 엽서"
          >
            전체
          </button>
          <button
            onClick={() => setOrientationFilter('landscape')}
            className={`px-3 py-2 rounded-full text-xs transition-all ${
              orientationFilter === 'landscape' ? 'bg-primary text-white' : 'text-primary hover:bg-gray-100'
            }`}
            title="가로형만 (7x5)"
          >
            가로
          </button>
          <button
            onClick={() => setOrientationFilter('portrait')}
            className={`px-3 py-2 rounded-full text-xs transition-all ${
              orientationFilter === 'portrait' ? 'bg-primary text-white' : 'text-primary hover:bg-gray-100'
            }`}
            title="세로형만 (5x7)"
          >
            세로
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
            title="인쇄소용: 앞면 전체 → 뒷면 전체"
          >
            앞+뒤
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
            className={`px-6 py-2 rounded-full text-sm transition-all shadow-lg ${
              imagesLoaded
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
          >
            {imagesLoaded
              ? 'Print for Shop'
              : `Loading... ${loadingProgress}/${totalImages}`}
          </button>
        </AuthGuard>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12 print:hidden">
          <h1 className="font-serif text-3xl mb-2">Postcards</h1>
          <p className="text-secondary">5&quot; x 7&quot; - Print Ready</p>
        </div>

        {/* Postcards Grid - Each artwork: Front → Back pair */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 print:grid-cols-1 print:gap-0">
          {/* Artist Info Card (Only for landscape) */}
          {(orientationFilter === 'all' || orientationFilter === 'landscape') && (
            <>
              {/* Artist Info - Front */}
              <div className="postcard-wrapper print:page-break-after">
                <div
                  className="postcard-front bg-white shadow-xl"
                  style={{
                    width: '7in',
                    height: '5in',
                    margin: '0 auto',
                  }}
                >
                  <div className="relative w-full h-full bg-gradient-to-br from-pastel-cream to-pastel-sage flex items-center justify-center">
                    <div className="text-center p-8">
                      <h2 className="font-serif text-4xl mb-4 text-primary">Utopia = Reality</h2>
                      <p className="text-xl text-primary/80 mb-6">유토피아 = 현실</p>
                      <div className="w-24 h-px bg-primary/30 mx-auto mb-6" />
                      <p className="font-serif text-2xl text-primary">{catalogData.artist.name}</p>
                      <p className="text-lg text-primary/70">{catalogData.artist.nameKr}</p>
                    </div>
                  </div>
                </div>
                <p className="text-center text-xs text-secondary mt-2 print:hidden">
                  Artist Info Card - Front
                </p>
              </div>

              {/* Artist Info - Back (only when printMode is 'both') */}
              {printMode === 'both' && (
                <div className="postcard-wrapper print:page-break-after">
                  <div
                    className="postcard-back bg-white shadow-xl"
                    style={{
                      width: '7in',
                      height: '5in',
                      margin: '0 auto',
                      padding: '0.5in',
                    }}
                  >
                    <div className="h-full flex flex-col justify-between relative">
                      <div>
                        <div className="text-center mb-4">
                          <h3 className="font-serif text-2xl mb-1">Utopia = Reality</h3>
                          <p className="text-sm text-secondary">유토피아 = 현실</p>
                        </div>

                        <div className="text-center mb-4">
                          <p className="font-serif text-lg">{catalogData.artist.name}</p>
                          <p className="text-sm text-secondary">{catalogData.artist.nameKr}</p>
                        </div>

                        <p className="text-xs text-center text-secondary/80 leading-relaxed mb-4">
                          {lang === 'en'
                            ? 'Contemporary artist exploring the threshold between imagination and reality'
                            : '상상과 현실 사이의 경계를 탐구하는 현대 미술 작가'}
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <div className="text-center">
                          <div className="bg-white p-2 rounded shadow-sm inline-block mb-2">
                            <QRCodeSVG
                              value="https://www.limhyejung.com/"
                              size={80}
                              level="M"
                              includeMargin={false}
                            />
                          </div>
                          <p className="text-xs text-primary">www.limhyejung.com</p>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-3">
                        <div className="flex justify-between items-end text-xs">
                          <div>
                            <p className="text-secondary mb-1">{catalogData.contact.gallery_email}</p>
                            <p className="text-secondary">{catalogData.contact.instagram}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-secondary/70">{catalogData.gallery.name}</p>
                            <p className="text-secondary/70">{catalogData.gallery.nameKr}</p>
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-1/2 right-6 w-px h-24 bg-gray-300 transform -translate-y-1/2" />
                    </div>
                  </div>
                  <p className="text-center text-xs text-secondary mt-2 print:hidden">
                    Artist Info Card - Back
                  </p>
                </div>
              )}
            </>
          )}

          {/* Each Artwork: Front → Back pair */}
          {artworks
            .filter((work) => {
              if (orientationFilter === 'all') return true
              const isPortrait = (work.imageHeight || 0) > (work.imageWidth || 0)
              if (orientationFilter === 'portrait') return isPortrait
              if (orientationFilter === 'landscape') return !isPortrait
              return true
            })
            .map((work) => {
              const isPortrait = (work.imageHeight || 0) > (work.imageWidth || 0)
              const postcardWidth = isPortrait ? '5in' : '7in'
              const postcardHeight = isPortrait ? '7in' : '5in'

              return (
                <React.Fragment key={work.id}>
                  {/* Front Side - Artwork Image */}
                  <div className="postcard-wrapper print:page-break-after">
                    <div
                      className="postcard-front bg-white shadow-xl"
                      style={{
                        width: postcardWidth,
                        height: postcardHeight,
                        margin: '0 auto',
                        padding: '0.25in',
                      }}
                    >
                      <div className="relative w-full h-full bg-white flex items-center justify-center">
                        <Image
                          src={work.images.full}
                          alt={work.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 7in"
                          quality={100}
                          priority={artworks.indexOf(work) < 4}
                          unoptimized
                        />
                      </div>
                    </div>
                    <p className="text-center text-xs text-secondary mt-2 print:hidden">
                      {work.title} - Front
                    </p>
                  </div>

                  {/* Back Side - Artwork Info (only when printMode is 'both') */}
                  {printMode === 'both' && (
                    <div className="postcard-wrapper print:page-break-after">
                      <div
                        className="postcard-back bg-white shadow-xl"
                        style={{
                          width: postcardWidth,
                          height: postcardHeight,
                          margin: '0 auto',
                          padding: '0.5in',
                        }}
                      >
                        <div className="h-full flex flex-col justify-between relative">
                          <div>
                            <h3 className="font-serif text-xl mb-1">{work.title}</h3>
                            <p className="text-xs text-secondary mb-4">
                              {work.year} · {work.medium} · {work.dimensions}
                            </p>

                            <div className="border-l-2 border-primary/30 pl-3 mb-4">
                              <p className="text-base italic text-primary/80 leading-relaxed">
                                {lang === 'en' ? work.question : work.questionKr}
                              </p>
                            </div>
                          </div>

                          <div className="border-t border-gray-200 pt-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-serif text-sm">{catalogData.artist.name}</p>
                                <p className="text-xs text-secondary">{catalogData.artist.nameKr}</p>
                              </div>
                              <div className="bg-white p-1 rounded">
                                <QRCodeSVG
                                  value="https://www.limhyejung.com/"
                                  size={40}
                                  level="M"
                                  includeMargin={false}
                                />
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-secondary">{catalogData.contact.website}</p>
                                <p className="text-xs text-secondary">{catalogData.contact.instagram}</p>
                              </div>
                            </div>
                          </div>

                          <div className="absolute top-1/2 right-6 w-px h-24 bg-gray-300 transform -translate-y-1/2" />
                        </div>
                      </div>
                      <p className="text-center text-xs text-secondary mt-2 print:hidden">
                        {work.title} - Back
                      </p>
                    </div>
                  )}
                </React.Fragment>
              )
            })}
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          /* Hide all non-postcard elements */
          header, footer, nav {
            display: none !important;
          }

          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .container {
            padding: 0 !important;
            margin: 0 !important;
            max-width: none !important;
          }

          .grid {
            display: block !important;
            gap: 0 !important;
          }

          .postcard-wrapper {
            page-break-after: always;
            page-break-inside: avoid;
            margin: 0 !important;
            padding: 0 !important;
            display: block !important;
          }

          .postcard-front,
          .postcard-back {
            box-shadow: none !important;
            border: none !important;
            margin: 0 auto !important;
            overflow: hidden !important;
          }

          .postcard-front {
            display: block !important;
          }

          .postcard-back {
            display: block !important;
          }

          .postcard-front > div {
            width: 100% !important;
            height: 100% !important;
            position: relative !important;
          }

          .postcard-front img,
          .postcard-front [style*="background"] img {
            object-fit: contain !important;
          }

          @page {
            margin: 0;
            ${orientationFilter === 'portrait' ? 'size: 5in 7in;' : orientationFilter === 'landscape' ? 'size: 7in 5in;' : ''}
          }
        }
      `}</style>
    </div>
  )
}
