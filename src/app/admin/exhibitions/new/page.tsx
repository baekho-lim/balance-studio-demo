'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Exhibition, ExhibitionOrganizer } from '@/types'

const generateId = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50)
}

export default function NewExhibitionPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState<Partial<Exhibition>>({
    id: '',
    title: '',
    titleKr: '',
    type: 'group',
    venue: '',
    venueKr: '',
    venueAddress: '',
    city: 'Ho Chi Minh City',
    country: 'Vietnam',
    countryCode: 'VN',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    status: 'upcoming',
    description: { en: '', ko: '', vi: '' },
    featured: false,
    externalUrl: '',
    links: {},
    organizers: [],
    artistRole: 'participant',
  })

  const handleSave = async () => {
    if (!formData.title || !formData.venue || !formData.startDate) {
      setError('Title, Venue, and Start Date are required')
      return
    }

    setSaving(true)
    setError('')

    // Auto-generate ID if empty
    const exhibitionData: Exhibition = {
      ...formData,
      id: formData.id || generateId(formData.title),
    } as Exhibition

    try {
      const response = await fetch('/api/exhibitions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exhibitionData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save')
      }

      router.push(`/admin/exhibitions/${exhibitionData.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: keyof Exhibition, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateDescription = (lang: 'en' | 'ko' | 'vi', value: string) => {
    setFormData(prev => {
      const currentDesc = typeof prev.description === 'object' ? prev.description : { en: '', ko: '' }
      return {
        ...prev,
        description: { ...currentDesc, [lang]: value }
      }
    })
  }

  const updateLinks = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      links: { ...prev.links, [field]: value || undefined }
    }))
  }

  const addOrganizer = () => {
    const newOrg: ExhibitionOrganizer = {
      name: '',
      role: 'partner'
    }
    setFormData(prev => ({
      ...prev,
      organizers: [...(prev.organizers || []), newOrg]
    }))
  }

  const updateOrganizer = (index: number, field: keyof ExhibitionOrganizer, value: string) => {
    setFormData(prev => {
      if (!prev.organizers) return prev
      const updated = [...prev.organizers]
      updated[index] = { ...updated[index], [field]: value || undefined }
      return { ...prev, organizers: updated }
    })
  }

  const removeOrganizer = (index: number) => {
    setFormData(prev => {
      if (!prev.organizers) return prev
      const updated = prev.organizers.filter((_, i) => i !== index)
      return { ...prev, organizers: updated }
    })
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/exhibitions"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-serif">New Exhibition</h1>
            <p className="text-secondary text-sm">새 전시 추가</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Create Exhibition'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
      )}

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-4">기본 정보</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-secondary mb-1">ID (자동 생성)</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => updateField('id', e.target.value)}
                placeholder="auto-generated-from-title"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
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
              <label className="block text-sm text-secondary mb-1">Title (English) *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Vietnam International Art Fair 2026"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-secondary mb-1">Title (Korean)</label>
              <input
                type="text"
                value={formData.titleKr}
                onChange={(e) => updateField('titleKr', e.target.value)}
                placeholder="베트남 국제 아트페어 2026"
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
              <label className="block text-sm text-secondary mb-1">Artist Role</label>
              <select
                value={formData.artistRole}
                onChange={(e) => updateField('artistRole', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              >
                <option value="solo">Solo (주인공)</option>
                <option value="featured">Featured (피처드)</option>
                <option value="participant">Participant (참여)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Venue & Dates */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-4">장소 & 일정</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-secondary mb-1">Venue (English) *</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => updateField('venue', e.target.value)}
                placeholder="Hotel Nikko Saigon"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Venue (Korean)</label>
              <input
                type="text"
                value={formData.venueKr}
                onChange={(e) => updateField('venueKr', e.target.value)}
                placeholder="호텔 니코 사이공"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-secondary mb-1">Venue Address</label>
              <input
                type="text"
                value={formData.venueAddress}
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
              <label className="block text-sm text-secondary mb-1">Start Date *</label>
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
                value={formData.endDate}
                onChange={(e) => updateField('endDate', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
              />
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
                value={typeof formData.description === 'object' ? formData.description.en : ''}
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
          </div>
        </div>

        {/* External Links */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-4">외부 링크 (SEO)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-secondary mb-1">Official Exhibition Page</label>
              <input
                type="url"
                value={formData.externalUrl}
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
                    <label className="block text-xs text-secondary mb-1">Name</label>
                    <input
                      type="text"
                      value={org.name}
                      onChange={(e) => updateOrganizer(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-secondary mb-1">Role</label>
                    <select
                      value={org.role}
                      onChange={(e) => updateOrganizer(index, 'role', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    >
                      <option value="host">Host</option>
                      <option value="co-host">Co-host</option>
                      <option value="sponsor">Sponsor</option>
                      <option value="partner">Partner</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/exhibitions"
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
            {saving ? 'Saving...' : 'Create Exhibition'}
          </button>
        </div>
      </div>
    </div>
  )
}
