'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Award, Instagram, Star, Calendar } from 'lucide-react'

// Import demo data
import instructorsData from '@/data/demo/pilates-instructors.json'

export default function PilatesInstructorsPage() {
  const featuredInstructors = instructorsData.filter(i => i.featured && i.status === 'active')
  const otherInstructors = instructorsData.filter(i => !i.featured && i.status === 'active')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/demo" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block">
            ← Back to Demo
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Our Instructors</h1>
          <p className="text-gray-500 mt-1">Meet our certified Pilates professionals</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Instructors */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Instructors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredInstructors.map(instructor => (
              <div
                key={instructor.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-1/3 relative aspect-square md:aspect-auto">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <span className="text-6xl text-blue-300">
                        {instructor.name.en.charAt(0)}
                      </span>
                    </div>
                    {instructor.featured && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{instructor.name.en}</h3>
                      <p className="text-blue-600 font-medium">{instructor.title.en}</p>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {instructor.bio.en}
                    </p>

                    {/* Experience */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Calendar className="w-4 h-4" />
                      {instructor.experienceYears}+ years experience
                    </div>

                    {/* Certifications */}
                    <div className="mb-4">
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                        <Award className="w-4 h-4" />
                        Certifications
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {instructor.certifications.slice(0, 3).map((cert, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {instructor.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/demo/pilates/schedule`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        View Schedule
                      </Link>
                      {instructor.instagram && (
                        <a
                          href={`https://instagram.com/${instructor.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-pink-500 transition-colors"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Other Instructors */}
        {otherInstructors.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">All Instructors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherInstructors.map(instructor => (
                <div
                  key={instructor.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-6xl text-gray-300">
                      {instructor.name.en.charAt(0)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900">{instructor.name.en}</h3>
                    <p className="text-blue-600 text-sm font-medium mb-3">{instructor.title.en}</p>

                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {instructor.shortBio?.en || instructor.bio.en.slice(0, 100) + '...'}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {instructor.specialties.slice(0, 3).map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/demo/pilates/schedule`}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      View Classes →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Pilates Journey?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Book a class with one of our certified instructors and experience the
            transformative power of Pilates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo/pilates/schedule"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              View Schedule
            </Link>
            <Link
              href="/demo/pilates/pricing"
              className="px-8 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-400 transition-colors"
            >
              See Pricing
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
