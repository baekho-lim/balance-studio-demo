'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ImageIcon, Folder, Copy, Check, Search, Grid, List } from 'lucide-react'

interface ImageFile {
  path: string
  name: string
  folder: string
}

// Static list of images in public/images
// In a real app, this would come from an API that reads the filesystem
const getStaticImages = (): ImageFile[] => {
  const images: ImageFile[] = [
    // Works folder
    { path: '/images/works/1. I am only passing though the woods..jpg', name: '1. I am only passing though the woods..jpg', folder: 'works' },
    { path: '/images/works/9. Those silkworms..jpg', name: '9. Those silkworms..jpg', folder: 'works' },
    { path: '/images/works/10. THose mantises..jpg', name: '10. THose mantises..jpg', folder: 'works' },
    { path: '/images/works/17. Take one tiny step..jpg', name: '17. Take one tiny step..jpg', folder: 'works' },
    { path: '/images/works/18. Go there..jpg', name: '18. Go there..jpg', folder: 'works' },
    { path: '/images/works/19.they live like nothing....jpeg', name: '19.they live like nothing....jpeg', folder: 'works' },
    { path: '/images/works/20.The attraction of emotion.jpeg', name: '20.The attraction of emotion.jpeg', folder: 'works' },
    { path: '/images/works/21.Just that we grow.jpeg', name: '21.Just that we grow.jpeg', folder: 'works' },
    { path: '/images/works/2024/breathing.jpg', name: 'breathing.jpg', folder: 'works/2024' },
    { path: '/images/works/2024/spend-sometime.jpg', name: 'spend-sometime.jpg', folder: 'works/2024' },
    // Artist folder
    { path: '/images/artist/hj lim black.png', name: 'hj lim black.png', folder: 'artist' },
  ]
  return images
}

export default function MediaLibraryPage() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [selectedFolder, setSelectedFolder] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedPath, setCopiedPath] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null)

  useEffect(() => {
    setImages(getStaticImages())
  }, [])

  // Get unique folders
  const folders = ['all', ...Array.from(new Set(images.map(img => img.folder))).sort()]

  // Filter images
  const filteredImages = images.filter(img => {
    const matchesFolder = selectedFolder === 'all' || img.folder === selectedFolder
    const matchesSearch = img.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFolder && matchesSearch
  })

  // Copy path to clipboard
  const copyPath = async (path: string) => {
    await navigator.clipboard.writeText(path)
    setCopiedPath(path)
    setTimeout(() => setCopiedPath(null), 2000)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif mb-2">Media Library</h1>
          <p className="text-secondary">
            Manage images in /public/images ({filteredImages.length} files)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Folder Filter */}
        <div className="flex gap-2 flex-wrap">
          {folders.map(folder => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedFolder === folder
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-secondary'
              }`}
            >
              <Folder className="w-4 h-4" />
              <span className="capitalize">{folder}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredImages.map((img) => (
            <div
              key={img.path}
              className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <div className="aspect-square relative bg-gray-100">
                <Image
                  src={img.path}
                  alt={img.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />
              </div>
              <div className="p-2">
                <p className="text-sm truncate" title={img.name}>
                  {img.name}
                </p>
                <p className="text-xs text-secondary">{img.folder}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  copyPath(img.path)
                }}
                className="absolute top-2 right-2 p-2 bg-white/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                title="Copy path"
              >
                {copiedPath === img.path ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-secondary">Preview</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-secondary">Name</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-secondary">Folder</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-secondary">Path</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredImages.map((img) => (
                <tr key={img.path} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="w-12 h-12 relative bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={img.path}
                        alt={img.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{img.name}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{img.folder}</td>
                  <td className="px-4 py-3 text-sm font-mono text-secondary">{img.path}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => copyPath(img.path)}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      {copiedPath === img.path ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-secondary">No images found</p>
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-gray-100">
              <Image
                src={selectedImage.path}
                alt={selectedImage.name}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
            <div className="p-4 border-t border-gray-200">
              <h3 className="font-medium mb-2">{selectedImage.name}</h3>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 bg-gray-100 rounded text-sm font-mono">
                  {selectedImage.path}
                </code>
                <button
                  onClick={() => copyPath(selectedImage.path)}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  {copiedPath === selectedImage.path ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Path
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Phase 10b Notice */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Coming Soon: Cloudinary Upload</h3>
        <p className="text-sm text-blue-700">
          Phase 10b will add drag-and-drop upload functionality using Cloudinary.
          Currently showing static images from /public/images.
        </p>
      </div>
    </div>
  )
}
