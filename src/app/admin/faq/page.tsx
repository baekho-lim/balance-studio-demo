'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Trash2, Save, GripVertical, ExternalLink } from 'lucide-react'

interface FAQItem {
  id: string
  question: {
    ko: string
    en: string
    vi?: string
  }
  answer: {
    ko: string
    en: string
    vi?: string
  }
  order: number
  exhibitionLink?: string
}

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchFaqs()
  }, [])

  const fetchFaqs = async () => {
    try {
      const response = await fetch('/api/faq')
      if (response.ok) {
        const data = await response.json()
        setFaqs(data.sort((a: FAQItem, b: FAQItem) => a.order - b.order))
      }
    } catch (err) {
      setError('Failed to load FAQs')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/faq', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faqs),
      })

      if (!response.ok) {
        throw new Error('Failed to save')
      }

      setSuccess('FAQ saved successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Failed to save FAQs')
    } finally {
      setSaving(false)
    }
  }

  const addNewFaq = () => {
    const newId = `faq-${Date.now()}`
    const newFaq: FAQItem = {
      id: newId,
      question: { ko: '', en: '', vi: '' },
      answer: { ko: '', en: '', vi: '' },
      order: faqs.length + 1,
    }
    setFaqs([...faqs, newFaq])
    setEditingId(newId)
  }

  const removeFaq = (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return
    setFaqs(faqs.filter(faq => faq.id !== id))
  }

  const updateFaq = (id: string, field: string, value: string) => {
    setFaqs(faqs.map(faq => {
      if (faq.id !== id) return faq

      if (field.includes('.')) {
        const [parent, child] = field.split('.')
        return {
          ...faq,
          [parent]: {
            ...(faq[parent as keyof FAQItem] as Record<string, string>),
            [child]: value
          }
        }
      }

      return { ...faq, [field]: value }
    }))
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    const newFaqs = [...faqs]
    const temp = newFaqs[index].order
    newFaqs[index].order = newFaqs[index - 1].order
    newFaqs[index - 1].order = temp
    ;[newFaqs[index], newFaqs[index - 1]] = [newFaqs[index - 1], newFaqs[index]]
    setFaqs(newFaqs)
  }

  const moveDown = (index: number) => {
    if (index === faqs.length - 1) return
    const newFaqs = [...faqs]
    const temp = newFaqs[index].order
    newFaqs[index].order = newFaqs[index + 1].order
    newFaqs[index + 1].order = temp
    ;[newFaqs[index], newFaqs[index + 1]] = [newFaqs[index + 1], newFaqs[index]]
    setFaqs(newFaqs)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif">FAQ Management</h1>
          <p className="text-secondary mt-1">자주 묻는 질문을 관리합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/faq"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Page
          </a>
          <button
            onClick={addNewFaq}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add FAQ
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-lg">{success}</div>
      )}

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === faqs.length - 1}
                  className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                  title="Move down"
                >
                  ↓
                </button>
              </div>
              <GripVertical className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-secondary">#{faq.order}</span>
              <span className="flex-1 font-medium truncate">
                {faq.question.ko || faq.question.en || 'New FAQ'}
              </span>
              <button
                onClick={() => setEditingId(editingId === faq.id ? null : faq.id)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
              >
                {editingId === faq.id ? 'Close' : 'Edit'}
              </button>
              <button
                onClick={() => removeFaq(faq.id)}
                className="p-1.5 text-red-500 hover:bg-red-100 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Edit Form */}
            {editingId === faq.id && (
              <div className="p-6 space-y-6">
                {/* ID */}
                <div>
                  <label className="block text-sm text-secondary mb-1">ID (URL-friendly)</label>
                  <input
                    type="text"
                    value={faq.id}
                    onChange={(e) => updateFaq(faq.id, 'id', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Questions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-secondary mb-1">Question (Korean)</label>
                    <input
                      type="text"
                      value={faq.question.ko}
                      onChange={(e) => updateFaq(faq.id, 'question.ko', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-1">Question (English)</label>
                    <input
                      type="text"
                      value={faq.question.en}
                      onChange={(e) => updateFaq(faq.id, 'question.en', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-1">Question (Vietnamese)</label>
                    <input
                      type="text"
                      value={faq.question.vi || ''}
                      onChange={(e) => updateFaq(faq.id, 'question.vi', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                {/* Answers */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-secondary mb-1">Answer (Korean)</label>
                    <textarea
                      value={faq.answer.ko}
                      onChange={(e) => updateFaq(faq.id, 'answer.ko', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-1">Answer (English)</label>
                    <textarea
                      value={faq.answer.en}
                      onChange={(e) => updateFaq(faq.id, 'answer.en', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-1">Answer (Vietnamese)</label>
                    <textarea
                      value={faq.answer.vi || ''}
                      onChange={(e) => updateFaq(faq.id, 'answer.vi', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                {/* Exhibition Link */}
                <div>
                  <label className="block text-sm text-secondary mb-1">Exhibition Link (optional)</label>
                  <input
                    type="url"
                    value={faq.exhibitionLink || ''}
                    onChange={(e) => updateFaq(faq.id, 'exhibitionLink', e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        {faqs.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-secondary mb-4">No FAQs yet.</p>
            <button
              onClick={addNewFaq}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add First FAQ
            </button>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mt-8 p-6 bg-pastel-cream/30 rounded-lg">
        <h3 className="font-semibold mb-2">FAQ 관리 안내</h3>
        <ul className="text-sm text-secondary space-y-1">
          <li>• 순서 변경: ↑↓ 버튼으로 FAQ 순서를 조정합니다.</li>
          <li>• 다국어 지원: 한국어, 영어, 베트남어로 작성 가능합니다.</li>
          <li>• Exhibition Link: 관련 전시 페이지 링크를 추가할 수 있습니다.</li>
          <li>• 변경 후 반드시 "Save All" 버튼을 클릭해야 저장됩니다.</li>
        </ul>
      </div>
    </div>
  )
}
