'use client'

import Link from 'next/link'
import { useState } from 'react'

// Sample data objects - demonstrating the structure of business types
// (Using plain objects instead of strict type imports for demo flexibility)

export default function BusinessDemoPage() {
  const [activeTab, setActiveTab] = useState<'pilates' | 'restaurant' | 'ecommerce'>('pilates')

  // Sample Pilates Data
  const sampleInstructor = {
    id: 'instructor-001',
    type: 'Person',
    slug: 'jenny-kim',
    name: { en: 'Jenny Kim', ko: '김제니' },
    description: { en: 'Certified Pilates instructor with 10+ years experience', ko: '10년 이상 경력의 공인 필라테스 강사' },
    images: { thumbnail: '/instructors/jenny.jpg', full: '/instructors/jenny-full.jpg' },
    seo: {},
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-26T00:00:00Z',
    givenName: { en: 'Jenny', ko: '제니' },
    familyName: { en: 'Kim', ko: '김' },
    jobTitle: { en: 'Head Instructor', ko: '수석 강사' },
    specialties: ['pilates-reformer', 'pilates-mat', 'yoga'],
    certifications: [
      { name: 'STOTT PILATES', issuingOrg: 'Merrithew', issueDate: '2015-03-15', verified: true },
      { name: 'RYT-200', issuingOrg: 'Yoga Alliance', issueDate: '2018-06-20', verified: true },
    ],
    experience: 10,
    languages: ['en', 'ko'],
    rating: { value: 4.9, count: 128 },
  }

  const sampleClass = {
    id: 'class-001',
    type: 'Service',
    slug: 'morning-reformer',
    name: { en: 'Morning Reformer Flow', ko: '모닝 리포머 플로우' },
    description: { en: 'Start your day with an energizing reformer session', ko: '활력 넘치는 리포머 세션으로 하루를 시작하세요' },
    images: { thumbnail: '/classes/reformer.jpg', full: '/classes/reformer-full.jpg' },
    seo: {},
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-26T00:00:00Z',
    serviceType: 'fitness-class',
    duration: 55,
    classType: 'pilates-reformer',
    classLevel: 'intermediate',
    instructor: 'instructor-001',
    location: 'Studio A',
    equipment: ['Reformer', 'Box', 'Straps'],
    benefits: { en: 'Core strength, flexibility, posture improvement', ko: '코어 강화, 유연성, 자세 교정' },
    targetAreas: ['core', 'legs', 'back'],
    intensity: 3,
    recurring: {
      pattern: 'weekly',
      dayOfWeek: 'Monday',
      startTime: '07:00',
      endTime: '07:55',
    },
    maxCapacity: 8,
    currentEnrollment: 6,
    waitlistEnabled: true,
  }

  const sampleMembership = {
    id: 'plan-001',
    name: { en: 'Unlimited Monthly', ko: '무제한 월정액' },
    description: { en: 'Unlimited access to all classes', ko: '모든 수업 무제한 이용' },
    type: 'unlimited',
    duration: { value: 1, unit: 'month' },
    price: { amount: 250000, currency: 'KRW', originalAmount: 300000 },
    features: [
      { en: 'Unlimited group classes', ko: '무제한 그룹 수업' },
      { en: 'Access to all studios', ko: '전 지점 이용 가능' },
      { en: 'Free towel service', ko: '무료 타월 서비스' },
    ],
    popular: true,
    order: 1,
  }

  // Sample Restaurant Data
  const sampleMenuItem = {
    id: 'menu-001',
    name: { en: 'Truffle Risotto', ko: '트러플 리조또' },
    description: { en: 'Creamy arborio rice with black truffle and parmesan', ko: '블랙 트러플과 파마산 치즈를 곁들인 크리미 아르보리오 리조또' },
    category: 'main-course',
    price: { amount: 38000, currency: 'KRW' },
    images: {
      thumbnail: '/menu/risotto.jpg',
      full: '/menu/risotto-full.jpg',
    },
    dietary: ['vegetarian', 'gluten-free'],
    calories: 650,
    allergens: ['dairy', 'gluten'],
    options: [
      {
        name: { en: 'Add-ons', ko: '추가 옵션' },
        choices: [
          { name: { en: 'Extra truffle', ko: '트러플 추가' }, priceModifier: 15000 },
          { name: { en: 'Grilled chicken', ko: '그릴드 치킨' }, priceModifier: 8000 },
        ],
        required: false,
        multiSelect: true,
      },
    ],
    chefRecommended: true,
    available: true,
    order: 1,
  }

  const sampleReservation = {
    id: 'res-001',
    name: 'John Smith',
    phone: '+82-10-1234-5678',
    email: 'john@example.com',
    date: '2024-12-28',
    time: '19:00',
    partySize: 4,
    status: 'confirmed',
    specialRequests: 'Window seat preferred, celebrating anniversary',
    occasion: 'Anniversary',
    createdAt: '2024-12-26T10:30:00Z',
  }

  // Sample E-commerce Data
  const sampleProduct = {
    id: 'product-001',
    slug: 'organic-cotton-yoga-mat',
    name: { en: 'Organic Cotton Yoga Mat', ko: '오가닉 코튼 요가 매트' },
    description: { en: 'Eco-friendly yoga mat made from 100% organic cotton', ko: '100% 유기농 면으로 제작된 친환경 요가 매트' },
    shortDescription: { en: 'Premium organic yoga mat', ko: '프리미엄 유기농 요가 매트' },
    category: 'yoga-accessories',
    categories: ['yoga', 'accessories', 'eco-friendly'],
    tags: ['organic', 'cotton', 'eco', 'yoga'],
    brand: 'ZenLife',
    images: {
      thumbnail: '/products/mat-thumb.jpg',
      full: '/products/mat-main.jpg',
      gallery: ['/products/mat-1.jpg', '/products/mat-2.jpg', '/products/mat-3.jpg'],
    },
    options: [
      { name: 'Color', values: ['Natural', 'Sage', 'Lavender'] },
      { name: 'Size', values: ['Standard', 'Long'] },
    ],
    variants: [
      {
        id: 'var-001',
        name: 'Natural / Standard',
        sku: 'YM-NC-STD',
        price: { amount: 89000, currency: 'KRW', compareAtPrice: 120000 },
        options: { Color: 'Natural', Size: 'Standard' },
        inventory: { quantity: 25, policy: 'deny' },
        available: true,
      },
      {
        id: 'var-002',
        name: 'Sage / Standard',
        sku: 'YM-SG-STD',
        price: { amount: 89000, currency: 'KRW' },
        options: { Color: 'Sage', Size: 'Standard' },
        inventory: { quantity: 12, policy: 'deny' },
        available: true,
      },
    ],
    defaultVariant: 'var-001',
    reviews: { average: 4.8, count: 156 },
    seo: {
      title: 'Organic Cotton Yoga Mat | ZenLife',
      description: 'Premium eco-friendly yoga mat made from organic cotton',
      keywords: ['yoga mat', 'organic', 'eco-friendly'],
    },
    status: 'active',
    featured: true,
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2024-12-26T00:00:00Z',
  }

  const tabs = [
    { id: 'pilates', label: 'Pilates/Health', emoji: '🧘' },
    { id: 'restaurant', label: 'Restaurant', emoji: '🍽️' },
    { id: 'ecommerce', label: 'E-commerce', emoji: '🛒' },
  ] as const

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/demo" className="text-blue-600 hover:underline mb-4 inline-block">
          ← 데모 목록으로
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          업종별 타입 데모
        </h1>
        <p className="text-gray-600 mb-8">
          @agency/core의 업종별 타입 정의를 확인하세요.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              <span className="text-xl">{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pilates Tab */}
        {activeTab === 'pilates' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">👩‍🏫</span> Instructor 타입
              </h2>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto max-h-80">
                {JSON.stringify(sampleInstructor, null, 2)}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">🏋️</span> FitnessClass 타입
              </h2>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto max-h-80">
                {JSON.stringify(sampleClass, null, 2)}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">💳</span> MembershipPlan 타입
              </h2>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto max-h-80">
                {JSON.stringify(sampleMembership, null, 2)}
              </pre>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-800 mb-2">사용 가능한 타입들</h3>
              <ul className="text-sm text-green-700 grid grid-cols-2 md:grid-cols-3 gap-2">
                <li>• ClassLevel</li>
                <li>• ClassType</li>
                <li>• Instructor</li>
                <li>• InstructorCertification</li>
                <li>• FitnessClass</li>
                <li>• ClassSchedule</li>
                <li>• MembershipPlan</li>
                <li>• Booking</li>
              </ul>
            </div>
          </div>
        )}

        {/* Restaurant Tab */}
        {activeTab === 'restaurant' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">🍝</span> MenuItem 타입
              </h2>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto max-h-80">
                {JSON.stringify(sampleMenuItem, null, 2)}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">📅</span> RestaurantReservation 타입
              </h2>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto max-h-80">
                {JSON.stringify(sampleReservation, null, 2)}
              </pre>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-medium text-orange-800 mb-2">사용 가능한 타입들</h3>
              <ul className="text-sm text-orange-700 grid grid-cols-2 md:grid-cols-3 gap-2">
                <li>• CuisineType</li>
                <li>• DietaryInfo</li>
                <li>• SpicinessLevel</li>
                <li>• MenuCategory</li>
                <li>• MenuItem</li>
                <li>• RestaurantReservation</li>
              </ul>
            </div>
          </div>
        )}

        {/* E-commerce Tab */}
        {activeTab === 'ecommerce' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">📦</span> EcommerceProduct 타입
              </h2>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto max-h-96">
                {JSON.stringify(sampleProduct, null, 2)}
              </pre>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-800 mb-2">사용 가능한 타입들</h3>
              <ul className="text-sm text-purple-700 grid grid-cols-2 md:grid-cols-3 gap-2">
                <li>• ProductVariant</li>
                <li>• ProductOption</li>
                <li>• EcommerceProduct</li>
                <li>• CartItem</li>
                <li>• Order</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
