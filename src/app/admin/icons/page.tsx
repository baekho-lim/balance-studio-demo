'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Upload, Loader2, ExternalLink } from 'lucide-react'
import AuthGuard from '@/components/admin/AuthGuard'
import Header from '@/components/layout/Header'
import artworksData from '@/data/artworks.json'
import type { Artwork } from '@/types'

const artworks = artworksData as Artwork[]

// Logo image
const logoImage = {
  id: 'logo',
  title: 'Logo (HJ Lim Black)',
  path: '/images/artist/hj lim black.png'
}

// All available images
const allImages = [
  logoImage,
  ...artworks.map(artwork => ({
    id: artwork.id,
    title: artwork.title,
    path: artwork.images.full
  }))
]

export default function IconGeneratorPage() {
  const [faviconImage, setFaviconImage] = useState<string | null>(null)
  const [appIconImage, setAppIconImage] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState('')
  const [deployUrl, setDeployUrl] = useState<string | null>(null)

  const generateIcons = async () => {
    if (!faviconImage || !appIconImage) {
      alert('Please select both Favicon and App Icon images')
      return
    }

    setGenerating(true)
    setProgress('Loading images...')
    setDeployUrl(null)

    try {
      const files: { name: string; content: string }[] = []

      // Helper function to generate icon from image and return base64
      const generateIconFromImage = async (
        imageSrc: string,
        sizes: { size: number; name: string }[]
      ) => {
        const img = new window.Image()
        img.crossOrigin = 'anonymous'

        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
          img.src = imageSrc
        })

        for (const { size, name } of sizes) {
          setProgress(`Generating ${name}...`)

          const canvas = document.createElement('canvas')
          canvas.width = size
          canvas.height = size
          const ctx = canvas.getContext('2d')

          if (!ctx) continue

          // Calculate crop to center square
          const minDim = Math.min(img.width, img.height)
          const sx = (img.width - minDim) / 2
          const sy = (img.height - minDim) / 2

          // Fill background
          ctx.fillStyle = '#FFF9F0' // pastel-cream
          ctx.fillRect(0, 0, size, size)

          // Draw image (centered, cropped to square)
          ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size)

          // Convert to base64 (remove data:image/png;base64, prefix)
          const base64 = canvas.toDataURL('image/png').split(',')[1]

          files.push({ name, content: base64 })
        }
      }

      // Generate favicons (small sizes)
      const faviconSizes = [
        { size: 16, name: 'favicon-16x16.png' },
        { size: 32, name: 'favicon-32x32.png' }
      ]
      await generateIconFromImage(faviconImage, faviconSizes)

      // Generate app icons (large sizes)
      const appIconSizes = [
        { size: 180, name: 'apple-touch-icon.png' },
        { size: 192, name: 'icon-192.png' },
        { size: 512, name: 'icon-512.png' }
      ]
      await generateIconFromImage(appIconImage, appIconSizes)

      // Add manifest.json
      setProgress('Creating manifest.json...')
      const manifest = {
        name: 'Lim Hyejung',
        short_name: 'LHJ',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        theme_color: '#8B9D7E',
        background_color: '#FFF9F0',
        display: 'standalone',
        start_url: '/'
      }
      const manifestContent = btoa(JSON.stringify(manifest, null, 2))
      files.push({ name: 'manifest.json', content: manifestContent })

      // Deploy to GitHub
      setProgress('Committing to GitHub...')
      const response = await fetch('/api/deploy-icons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ files }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.details || error.error || 'Failed to deploy icons')
      }

      const result = await response.json()
      setDeployUrl(result.deployUrl)

      setProgress('✅ Deployed! Vercel will auto-deploy in 1-2 minutes')
      setTimeout(() => {
        setGenerating(false)
      }, 3000)
    } catch (error) {
      console.error('Error generating icons:', error)
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setGenerating(false)
      setProgress('')
    }
  }

  return (
    <AuthGuard>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 pt-32">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-serif mb-2">Icons & Favicon Generator</h1>
            <p className="text-secondary">
              파비콘 및 모바일 앱 아이콘 생성
            </p>
          </div>

          {/* Selected Images Preview */}
          {(faviconImage || appIconImage) && (
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h3 className="text-lg font-medium mb-4">Selected Images</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Favicon Preview */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Favicon (16x16, 32x32)</h4>
                  {faviconImage ? (
                    <div className="relative w-32 h-32 bg-gray-100 rounded">
                      <Image
                        src={faviconImage}
                        alt="Favicon"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gray-100 rounded flex items-center justify-center text-xs text-secondary">
                      Not selected
                    </div>
                  )}
                </div>

                {/* App Icon Preview */}
                <div>
                  <h4 className="text-sm font-medium mb-2">App Icon (180x180, 192x192, 512x512)</h4>
                  {appIconImage ? (
                    <div className="relative w-32 h-32 bg-gray-100 rounded">
                      <Image
                        src={appIconImage}
                        alt="App Icon"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gray-100 rounded flex items-center justify-center text-xs text-secondary">
                      Not selected
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={generateIcons}
                disabled={generating || !faviconImage || !appIconImage}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    {progress}
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    Deploy Icons to GitHub
                  </>
                )}
              </button>

              {/* Deploy Result */}
              {deployUrl && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-green-800 mb-2">
                    ✅ Icons deployed successfully!
                  </p>
                  <a
                    href={deployUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    View commits on GitHub
                    <ExternalLink size={14} />
                  </a>
                  <p className="text-xs text-secondary mt-2">
                    Vercel will automatically deploy your changes in 1-2 minutes.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Image Selection Grid */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-lg font-medium mb-2">Select Favicon Image (16x16, 32x32)</h3>
            <p className="text-sm text-secondary mb-4">
              작은 사이즈용 이미지 선택 (브라우저 탭에 표시)
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {allImages.map((image) => (
                <div
                  key={`favicon-${image.id}`}
                  onClick={() => setFaviconImage(image.path)}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    faviconImage === image.path
                      ? 'border-primary shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={image.path}
                      alt={image.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-xs text-secondary truncate">
                      {image.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Select App Icon Image (180x180, 192x192, 512x512)</h3>
            <p className="text-sm text-secondary mb-4">
              큰 사이즈용 이미지 선택 (모바일 홈 화면에 표시)
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {allImages.map((image) => (
                <div
                  key={`appicon-${image.id}`}
                  onClick={() => setAppIconImage(image.path)}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    appIconImage === image.path
                      ? 'border-green-500 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={image.path}
                      alt={image.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-xs text-secondary truncate">
                      {image.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">📝 How to Use</h3>
            <ol className="space-y-2 text-sm text-secondary">
              <li>1. Select Favicon image (first grid) - 작은 사이즈용</li>
              <li>2. Select App Icon image (second grid) - 큰 사이즈용</li>
              <li>3. Click &quot;Deploy Icons to GitHub&quot; button</li>
              <li>4. Wait for GitHub commit and Vercel auto-deployment (1-2 minutes)</li>
              <li>5. Icons will be automatically live on your site</li>
            </ol>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-xs text-secondary mb-2">
                💡 Tip: 같은 이미지를 양쪽에 선택하면 모든 사이즈에 동일한 이미지가 사용됩니다.
              </p>
              <p className="text-xs text-secondary">
                🚀 Auto-deployment: Icons are automatically committed to GitHub and deployed via Vercel
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
