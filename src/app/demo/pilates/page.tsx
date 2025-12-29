'use client'

import Link from 'next/link'
import { Calendar, Users, CreditCard, Sparkles, ArrowRight, Clock, MapPin, Phone } from 'lucide-react'
import { SectionHeader, LevelBadge, Button, CTAGroup, Card } from '@agency/ui'

// Import demo data
import classesData from '@/data/demo/pilates-classes.json'
import instructorsData from '@/data/demo/pilates-instructors.json'
import studioConfig from '@/data/demo/pilates-config.json'

export default function PilatesDemoPage() {
  const featuredClasses = classesData.filter(c => c.featured).slice(0, 3)
  const featuredInstructors = instructorsData.filter(i => i.featured).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              Pilates Studio Demo Template
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {studioConfig.tagline.en.split(',')[0]}.<br />
              {studioConfig.tagline.en.split(',')[1]?.trim() || 'Transform Your Body'}.
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              Experience the art of movement at {studioConfig.name.en}. Our expert instructors
              guide you through personalized Pilates sessions designed for your goals.
            </p>
            <CTAGroup align="left">
              <Button href="/demo/pilates/schedule" variant="secondary" size="lg">
                View Schedule
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                href="/demo/pilates/pricing"
                size="lg"
                className="bg-blue-500/30 backdrop-blur-sm hover:bg-blue-500/40"
              >
                See Pricing
              </Button>
            </CTAGroup>
          </div>

          {/* Quick Info - using config */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            {[
              { icon: MapPin, label: 'Location', value: `${studioConfig.address.addressLocality}, ${studioConfig.address.addressRegion}` },
              { icon: Clock, label: 'Hours', value: studioConfig.openingHoursDisplay.en.weekday.split(':')[1]?.trim() || 'Mon-Sat 7AM-9PM' },
              { icon: Phone, label: 'Contact', value: studioConfig.telephoneDisplay },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <item.icon className="w-6 h-6 text-blue-200" />
                <div>
                  <div className="text-sm text-blue-200">{item.label}</div>
                  <div className="font-semibold">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Navigation */}
      <section className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Demo Pages:</span>
            </div>
            <div className="flex gap-4">
              <Link
                href="/demo/pilates/schedule"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Schedule
              </Link>
              <Link
                href="/demo/pilates/instructors"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Users className="w-4 h-4" />
                Instructors
              </Link>
              <Link
                href="/demo/pilates/pricing"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Classes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Featured Classes"
            subtitle="From beginner-friendly mat classes to advanced reformer sessions, we have something for everyone."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredClasses.map(cls => (
              <Card
                key={cls.id}
                padding="none"
                hover
                className="overflow-hidden"
              >
                {/* Image Placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <span className="text-6xl opacity-30">🧘‍♀️</span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <LevelBadge level={cls.level as 'beginner' | 'intermediate' | 'advanced' | 'all-levels'} />
                    <span className="text-gray-400 text-sm">{cls.durationMinutes} min</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cls.name.en}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {cls.shortDescription?.en || cls.description.en}
                  </p>

                  <Link
                    href="/demo/pilates/schedule"
                    className="text-blue-600 font-medium text-sm hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    View Schedule
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button href="/demo/pilates/schedule" variant="outline">
              View Full Schedule
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Instructors Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Meet Our Instructors"
            subtitle="Our certified professionals bring years of experience and passion to every class."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredInstructors.map(instructor => (
              <Card key={instructor.id} hover className="text-center">
                {/* Avatar */}
                <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl text-blue-600 font-bold">
                    {instructor.name.en.charAt(0)}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900">{instructor.name.en}</h3>
                <p className="text-blue-600 text-sm font-medium mb-3">{instructor.title.en}</p>

                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {instructor.specialties.slice(0, 3).map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <p className="text-gray-500 text-sm">
                  {instructor.experienceYears}+ years experience
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/demo/pilates/instructors"
              className="text-blue-600 font-medium hover:underline inline-flex items-center gap-1"
            >
              Meet All Instructors
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Pilates Journey Today
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            New members get 50% off their first class pack.
            No commitment required.
          </p>
          <CTAGroup>
            <Button href="/demo/pilates/pricing" variant="primary" size="lg">
              View Pricing
            </Button>
            <Button href="/demo/pilates/schedule" variant="secondary" size="lg" className="bg-gray-700 hover:bg-gray-600">
              Book a Class
            </Button>
          </CTAGroup>
        </div>
      </section>

      {/* Back to Demo */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link
            href="/demo"
            className="text-gray-500 hover:text-gray-700 inline-flex items-center gap-2"
          >
            ← Back to Demo Hub
          </Link>
        </div>
      </section>
    </div>
  )
}
