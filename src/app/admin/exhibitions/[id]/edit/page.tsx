'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Save, Plus, Trash2, ExternalLink, ImageIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import exhibitionsData from '@/data/exhibitions.json'
import artworksData from '@/data/artworks.json'
import { Exhibition, ExhibitionOrganizer, Artwork } from '@/types'

const exhibitions = exhibitionsData as Exhibition[]
const artworks = artworksData as Artwork[]

export default function ExhibitionEditPage() {
  const params = useParams()
  const router = useRouter()
  const exhibitionId = params.id as string
  const originalExhibition = exhibitions.find((e) => e.id === exhibitionId)

  const [formData, setFormData] = useState<Exhibition | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (originalExhibition) {
      setFormData({ ...originalExhibition })
    }
  }, [originalExhibition])

  if (!originalExhibition || !formData) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-serif mb-4">Exhibition not found</h1>
        <Link href="/admin/exhibitions" className="text-primary hover:underline">
          Back to Exhibitions
        </Link>
      </div>
    )
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/exhibitions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save')
      }

      setSuccess('저장 완료! 페이지를 새로고침하면 변경사항이 반영됩니다.')
      setTimeout(() => {
        router.push(`/admin/exhibitions/${formData.id}`)
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: keyof Exhibition, value: unknown) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null)
  }

  const updateDescription = (lang: 'en' | 'ko' | 'vi', value: string) => {
    setFormData(prev => {
      if (!prev) return null
      const currentDesc = typeof prev.description === 'object' ? prev.description : { en: '', ko: '' }
      return {
        ...prev,
        description: { ...currentDesc, [lang]: value }
      }
    })
  }

  const updateLinks = (field: string, value: string) => {
    setFormData(prev => {
      if (!prev) return null
      return {
        ...prev,
        links: { ...prev.links, [field]: value || undefined }
      }
    })
  }

  const addOrganizer = () => {
    setFormData(prev => {
      if (!prev) return null
      const newOrg: ExhibitionOrganizer = {
        name: '',
        role: 'partner'
      }
      return {
        ...prev,
        organizers: [...(prev.organizers || []), newOrg]
      }
    })
  }

  const updateOrganizer = (index: number, field: keyof ExhibitionOrganizer, value: string) => {
    setFormData(prev => {
      if (!prev || !prev.organizers) return null
      const updated = [...prev.organizers]
      updated[index] = { ...updated[index], [field]: value || undefined }
      return { ...prev, organizers: updated }
    })
  }

  const removeOrganizer = (index: number) => {
    setFormData(prev => {
      if (!prev || !prev.organizers) return null
      const updated = prev.organizers.filter((_, i) => i !== index)
      return { ...prev, organizers: updated }
    })
  }

  const updateCoverImage = (artworkId: string) => {
    const artwork = artworks.find(a => a.id === artworkId)
    if (!artwork) return

    setFormData(prev => {
      if (!prev) return null
      return {
        ...prev,
        images: {
          ...prev.images,
          cover: artwork.images.thumbnail,
          coverArtworkId: artworkId
        }
      }
    })
  }

  // Find current cover artwork
  const currentCoverArtwork = formData?.images?.coverArtworkId
    ? artworks.find(a => a.id === formData.images?.coverArtworkId)
    : formData?.images?.cover
      ? artworks.find(a => a.images.thumbnail === formData.images?.cover || a.images.full === formData.images?.cover)
      : null

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/exhibitions/${formData.id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-serif">Edit Exhibition</h1>
            <p className="text-secondary text-sm">{formData.title}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-lg">{success}</div>
      )}

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-4">기본 정보</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-secondary mb-1">ID (수정 불가)</label>
              <input
                type="text"
                value={formData.id}
                disabled
                className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => updateField('type', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              >
                <option value="solo">Solo</option>
                <option value="group">Group</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-secondary mb-1">Title (English)</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-secondary mb-1">Title (Korean)</label>
              <input
                type="text"
                value={formData.titleKr || ''}
                onChange={(e) => updateField('titleKr', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => updateField('status', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              >
                <option value="upcoming">Upcoming</option>
                <option value="current">Current</option>
                <option value="past">Past</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Featured</label>
              <select
                value={formData.featured ? 'true' : 'false'}
                onChange={(e) => updateField('featured', e.target.value === 'true')}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Venue & Dates */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-4">장소 & 일정</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-secondary mb-1">Venue (English)</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => updateField('venue', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Venue (Korean)</label>
              <input
                type="text"
                value={formData.venueKr || ''}
                onChange={(e) => updateField('venueKr', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-secondary mb-1">Venue Address</label>
              <input
                type="text"
                value={formData.venueAddress || ''}
                onChange={(e) => updateField('venueAddress', e.target.value)}
                placeholder="235 Nguyễn Văn Cừ, Quận 1, Ho Chi Minh City"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => updateField('country', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => updateField('startDate', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">End Date</label>
              <input
                type="date"
                value={formData.endDate || ''}
                onChange={(e) => updateField('endDate', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Opening Hours</label>
              <input
                type="text"
                value={formData.openingHours || ''}
                onChange={(e) => updateField('openingHours', e.target.value)}
                placeholder="09:30-18:30"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Admission</label>
              <select
                value={formData.admission || ''}
                onChange={(e) => updateField('admission', e.target.value || undefined)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Not specified</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-2 flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            커버 이미지
          </h2>
          <p className="text-sm text-secondary mb-4">전시 페이지에 표시될 대표 작품 이미지를 선택하세요.</p>

          <div className="grid grid-cols-2 gap-6">
            {/* Current Image Preview */}
            <div>
              <label className="block text-sm text-secondary mb-2">현재 이미지</label>
              <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                {formData.images?.cover ? (
                  <Image
                    src={formData.images.cover}
                    alt="Cover image"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
              </div>
              {currentCoverArtwork && (
                <p className="text-sm text-secondary mt-2">
                  {currentCoverArtwork.title} ({currentCoverArtwork.year})
                </p>
              )}
            </div>

            {/* Image Selection */}
            <div>
              <label className="block text-sm text-secondary mb-2">작품 선택</label>
              <select
                value={formData.images?.coverArtworkId || ''}
                onChange={(e) => updateCoverImage(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 mb-3"
              >
                <option value="">-- 작품을 선택하세요 --</option>
                {artworks.map(artwork => (
                  <option key={artwork.id} value={artwork.id}>
                    {artwork.title} ({artwork.year}) - {artwork.chapter}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-400">
                선택한 작품의 이미지가 전시 카드와 상세 페이지에 표시됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-4">설명</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-secondary mb-1">English</label>
              <textarea
                value={typeof formData.description === 'object' ? formData.description.en : formData.description || ''}
                onChange={(e) => updateDescription('en', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Korean</label>
              <textarea
                value={typeof formData.description === 'object' ? formData.description.ko : ''}
                onChange={(e) => updateDescription('ko', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Vietnamese</label>
              <textarea
                value={typeof formData.description === 'object' ? formData.description.vi || '' : ''}
                onChange={(e) => updateDescription('vi', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        {/* External Links (SEO) */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-2">외부 링크 (SEO 신뢰도)</h2>
          <p className="text-sm text-secondary mb-4">외부 권위 있는 링크를 추가하면 검색 엔진 신뢰도가 높아집니다.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-secondary mb-1">
                <ExternalLink className="w-3 h-3 inline mr-1" />
                Official Exhibition Page
              </label>
              <input
                type="url"
                value={formData.externalUrl || ''}
                onChange={(e) => updateField('externalUrl', e.target.value)}
                placeholder="https://gallery.com/exhibition/..."
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Gallery Website</label>
              <input
                type="url"
                value={formData.links?.gallery || ''}
                onChange={(e) => updateLinks('gallery', e.target.value)}
                placeholder="https://gallery.com"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Official Link (for Schema)</label>
              <input
                type="url"
                value={formData.links?.official || ''}
                onChange={(e) => updateLinks('official', e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        {/* Organizers */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">주최/협력 기관</h2>
            <button
              onClick={addOrganizer}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          <div className="space-y-4">
            {formData.organizers?.map((org, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Organizer #{index + 1}</span>
                  <button
                    onClick={() => removeOrganizer(index)}
                    className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-secondary mb-1">Name (English)</label>
                    <input
                      type="text"
                      value={org.name}
                      onChange={(e) => updateOrganizer(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-secondary mb-1">Name (Korean)</label>
                    <input
                      type="text"
                      value={org.nameKr || ''}
                      onChange={(e) => updateOrganizer(index, 'nameKr', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-secondary mb-1">Role</label>
                    <select
                      value={org.role}
                      onChange={(e) => updateOrganizer(index, 'role', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="host">Host</option>
                      <option value="co-host">Co-host</option>
                      <option value="sponsor">Sponsor</option>
                      <option value="partner">Partner</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-secondary mb-1">Website</label>
                    <input
                      type="url"
                      value={org.url || ''}
                      onChange={(e) => updateOrganizer(index, 'url', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-secondary mb-1">Instagram URL</label>
                    <input
                      type="url"
                      value={org.instagram || ''}
                      onChange={(e) => updateOrganizer(index, 'instagram', e.target.value)}
                      placeholder="https://instagram.com/..."
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              </div>
            ))}
            {(!formData.organizers || formData.organizers.length === 0) && (
              <p className="text-sm text-gray-400 text-center py-4">
                No organizers added. Click "Add" to add one.
              </p>
            )}
          </div>
        </div>

        {/* Save Button (bottom) */}
        <div className="flex justify-end gap-4">
          <Link
            href={`/admin/exhibitions/${formData.id}`}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
