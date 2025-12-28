'use client'

import Link from 'next/link'
import { Check, Star, Sparkles, Users, Clock, Award } from 'lucide-react'

// Import demo data
import membershipsData from '@/data/demo/pilates-memberships.json'

// Format Korean Won
function formatKRW(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function PilatesPricingPage() {
  const activePlans = membershipsData
    .filter(p => p.status === 'active')
    .sort((a, b) => a.displayOrder - b.displayOrder)

  const groupPlans = activePlans.filter(p =>
    p.type === 'class-pack' || p.type === 'unlimited' || (p.type === 'drop-in' && p.price < 50000)
  )
  const privatePlans = activePlans.filter(p =>
    p.type === 'drop-in' && p.price >= 50000 || (p.type === 'class-pack' && p.price >= 500000)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Link href="/demo" className="text-sm text-blue-100 hover:text-white mb-2 inline-block">
            ← Back to Demo
          </Link>
          <h1 className="text-4xl font-bold mb-4">Membership & Pricing</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Choose the plan that fits your lifestyle. All memberships include mat rental
            and access to our beautiful studio facilities.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Group Classes */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Group Classes</h2>
            <p className="text-gray-500">Join our energizing group sessions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {groupPlans.map(plan => {
              const isPopular = plan.popular
              const isFeatured = plan.featured

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl overflow-hidden transition-all hover:shadow-xl ${
                    isPopular
                      ? 'ring-2 ring-blue-500 shadow-lg scale-105 z-10'
                      : 'shadow-sm hover:scale-102'
                  }`}
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-2 text-sm font-medium">
                      <Sparkles className="w-4 h-4 inline mr-1" />
                      Most Popular
                    </div>
                  )}

                  <div className={`p-8 ${isPopular ? 'pt-14' : ''}`}>
                    {/* Plan Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name.en}</h3>
                    <p className="text-gray-500 text-sm mb-6">{plan.description.en}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">
                        {formatKRW(plan.price)}
                      </span>
                      {plan.billingCycle !== 'one-time' && (
                        <span className="text-gray-500 text-sm">/{plan.billingCycle}</span>
                      )}
                      {plan.classesIncluded && (
                        <div className="text-sm text-gray-500 mt-1">
                          ({formatKRW(Math.round(plan.price / plan.classesIncluded))} per class)
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-6 text-sm">
                      {plan.classesIncluded && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4 text-blue-500" />
                          {plan.classesIncluded} classes included
                        </div>
                      )}
                      {plan.validDays && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4 text-blue-500" />
                          Valid for {plan.validDays} days
                        </div>
                      )}
                      {plan.type === 'unlimited' && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Sparkles className="w-4 h-4 text-blue-500" />
                          Unlimited classes
                        </div>
                      )}
                    </div>

                    {/* Benefits */}
                    <ul className="space-y-3 mb-8">
                      {plan.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">{benefit.en}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-3 rounded-xl font-medium transition-colors ${
                        isPopular
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {plan.type === 'drop-in' ? 'Book a Class' : 'Get Started'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Private Sessions */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Private Sessions</h2>
            <p className="text-gray-500">One-on-one attention for personalized results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {privatePlans.map(plan => (
              <div
                key={plan.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{plan.name.en}</h3>
                    <p className="text-gray-400 text-sm">{plan.description.en}</p>
                  </div>
                  <Award className="w-8 h-8 text-yellow-400" />
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {formatKRW(plan.price)}
                  </span>
                  {plan.classesIncluded && (
                    <div className="text-sm text-gray-400 mt-1">
                      ({formatKRW(Math.round(plan.price / plan.classesIncluded))} per session)
                    </div>
                  )}
                </div>

                {/* Benefits */}
                <ul className="space-y-3 mb-8">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{benefit.en}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                  Book Consultation
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'Can I freeze my membership?',
                a: 'Yes, all packages can be paused for up to 2 weeks. Contact us at least 24 hours in advance.',
              },
              {
                q: 'What is your cancellation policy?',
                a: 'Please cancel at least 12 hours before your class. Late cancellations may result in the loss of a class credit.',
              },
              {
                q: 'Do I need to bring my own mat?',
                a: 'No, mat rental is included with all memberships. We provide clean mats and props for every class.',
              },
              {
                q: 'Can I share my class pack?',
                a: 'Class packs are non-transferable and can only be used by the registered member.',
              },
            ].map((faq, idx) => (
              <div key={idx}>
                <h4 className="font-medium text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-500 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mt-12 text-center">
          <p className="text-gray-500 mb-4">
            Have questions about which plan is right for you?
          </p>
          <Link
            href="/demo/pilates/schedule"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
          >
            Contact us for a free consultation →
          </Link>
        </section>
      </main>
    </div>
  )
}
