'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { PartnershipType, LocaleCode } from '@/types';
import { COUNTRIES, LOCALES, getPartnershipTypeLabel } from '@/lib/i18n';

const partnershipTypes: PartnershipType[] = [
  'gallery-exhibition',
  'art-fair',
  'commission',
  'collaboration',
  'acquisition',
  'media-inquiry',
];

const partnershipIcons: Record<PartnershipType, string> = {
  'gallery-exhibition': '🖼️',
  'art-fair': '🎪',
  'commission': '🎨',
  'collaboration': '🤝',
  'acquisition': '💎',
  'media-inquiry': '📰',
};

export default function PartnershipPage() {
  const [selectedType, setSelectedType] = useState<PartnershipType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    country: '',
    message: '',
    preferredLanguage: 'en' as LocaleCode,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) return;

    setIsSubmitting(true);

    // Construct mailto link
    const subject = encodeURIComponent(
      `[Partnership Inquiry] ${getPartnershipTypeLabel(selectedType, 'en').label} - ${formData.organization || formData.name}`
    );
    const body = encodeURIComponent(
      `Partnership Type: ${getPartnershipTypeLabel(selectedType, 'en').label}
Name: ${formData.name}
Organization: ${formData.organization || 'N/A'}
Email: ${formData.email}
Country: ${formData.country}
Preferred Language: ${LOCALES.find(l => l.code === formData.preferredLanguage)?.nativeName || formData.preferredLanguage}

Message:
${formData.message}`
    );

    // Open mailto
    window.location.href = `mailto:contact@limhyejung.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-6">✉️</div>
          <h1 className="text-3xl font-serif text-stone-900 mb-4">
            Thank You!
          </h1>
          <p className="text-stone-600 mb-8">
            Your email client should have opened with your inquiry.
            If not, please email us directly at{' '}
            <a href="mailto:contact@limhyejung.com" className="text-sage-700 hover:text-sage-800 underline">
              contact@limhyejung.com
            </a>
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setSelectedType(null);
              setFormData({
                name: '',
                organization: '',
                email: '',
                country: '',
                message: '',
                preferredLanguage: 'en',
              });
            }}
            className="px-6 py-3 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif text-stone-900 mb-4">
            Work With Lim Hyejung
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Interested in exhibitions, collaborations, or acquiring artworks?
            We welcome inquiries from galleries, curators, collectors, and media worldwide.
          </p>
          <p className="text-base text-stone-500 mt-2">
            전시, 협업, 작품 문의 환영합니다
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Partnership Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-stone-900 mb-6 text-center">
            How Would You Like to Work Together?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {partnershipTypes.map(type => {
              const { label, description } = getPartnershipTypeLabel(type, 'en');
              const isSelected = selectedType === type;

              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`p-6 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? 'border-sage-600 bg-sage-50 shadow-md'
                      : 'border-stone-200 bg-white hover:border-sage-300 hover:shadow-sm'
                  }`}
                >
                  <div className="text-3xl mb-3">{partnershipIcons[type]}</div>
                  <h3 className={`font-medium mb-1 ${isSelected ? 'text-sage-800' : 'text-stone-900'}`}>
                    {label}
                  </h3>
                  <p className="text-sm text-stone-500">{description}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Contact Form */}
        {selectedType && (
          <section className="bg-white border border-stone-200 rounded-lg p-8">
            <h2 className="text-xl font-serif text-stone-900 mb-6">
              Tell Us About Your Inquiry
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 outline-none transition-colors"
                    placeholder="John Smith"
                  />
                </div>

                {/* Organization */}
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-stone-700 mb-2">
                    Organization / Gallery
                  </label>
                  <input
                    type="text"
                    id="organization"
                    value={formData.organization}
                    onChange={e => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 outline-none transition-colors"
                    placeholder="Gallery Name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-stone-700 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="country"
                    required
                    value={formData.country}
                    onChange={e => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 outline-none transition-colors"
                  >
                    <option value="">Select your country</option>
                    {COUNTRIES.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Language */}
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-stone-700 mb-2">
                  Preferred Communication Language
                </label>
                <select
                  id="language"
                  value={formData.preferredLanguage}
                  onChange={e => setFormData(prev => ({ ...prev, preferredLanguage: e.target.value as LocaleCode }))}
                  className="w-full md:w-1/2 px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 outline-none transition-colors"
                >
                  {LOCALES.map(locale => (
                    <option key={locale.code} value={locale.code}>
                      {locale.nativeName} ({locale.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 outline-none transition-colors resize-none"
                  placeholder="Please describe your inquiry, proposed dates, venue details, or any other relevant information..."
                />
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedType(null)}
                  className="text-stone-500 hover:text-stone-700"
                >
                  ← Change inquiry type
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Opening Email...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Contact Info */}
        <section className="mt-12 text-center">
          <h2 className="text-lg font-medium text-stone-900 mb-4">
            Prefer Direct Contact?
          </h2>
          <p className="text-stone-600">
            Email us at{' '}
            <a
              href="mailto:contact@limhyejung.com"
              className="text-sage-700 hover:text-sage-800 underline"
            >
              contact@limhyejung.com
            </a>
          </p>
          <p className="text-stone-500 text-sm mt-2">
            Instagram:{' '}
            <a
              href="https://instagram.com/limhyejung_artworks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage-700 hover:text-sage-800"
            >
              @limhyejung_artworks
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
