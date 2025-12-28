/**
 * Business-specific types
 * Industry templates: Pilates/Health, Restaurant, E-commerce
 */

import type { MultilingualText } from './locale'
import type { ImageSet, PersonEntity, ServiceEntity } from './entity'

// ============================================
// PILATES / HEALTH STUDIO
// ============================================

// Class difficulty level
export type ClassLevel = 'beginner' | 'intermediate' | 'advanced' | 'all-levels'

// Class type
export type ClassType =
  | 'pilates-mat'
  | 'pilates-reformer'
  | 'yoga'
  | 'barre'
  | 'strength'
  | 'cardio'
  | 'stretching'
  | 'meditation'
  | 'personal-training'

// Instructor certification
export interface InstructorCertification {
  name: string
  issuingOrg: string
  issueDate?: string
  expiryDate?: string
  verified?: boolean
}

// Instructor (extends PersonEntity)
export interface Instructor extends PersonEntity {
  specialties: ClassType[]
  certifications: InstructorCertification[]
  experience: number          // years
  languages?: string[]
  availability?: {
    [day: string]: { start: string; end: string }[]
  }
  rating?: {
    value: number
    count: number
  }
  classes?: string[]          // Class IDs they teach
}

// Class (fitness class) - Omit 'level' from ServiceEntity to override with ClassLevel
export interface FitnessClass extends Omit<ServiceEntity, 'level'> {
  classType: ClassType
  classLevel: ClassLevel      // More specific than ServiceEntity.level
  instructor: string          // Instructor ID
  location: string            // Room/studio name
  equipment?: string[]        // Required equipment
  benefits?: MultilingualText
  targetAreas?: string[]      // Body areas targeted
  intensity: 1 | 2 | 3 | 4 | 5
  recurring?: {
    pattern: 'weekly' | 'biweekly' | 'monthly'
    dayOfWeek: string
    startTime: string
    endTime: string
  }
  singleSession?: {
    date: string
    startTime: string
    endTime: string
  }
  maxCapacity: number
  currentEnrollment?: number
  waitlistEnabled?: boolean
  cancellationPolicy?: string
}

// Class schedule view
export interface ClassSchedule {
  date: string
  classes: Array<{
    classId: string
    className: MultilingualText
    classType: ClassType
    level: ClassLevel
    startTime: string
    endTime: string
    instructor: {
      id: string
      name: string
      image?: string
    }
    location: string
    spotsRemaining: number
    status: 'available' | 'almost-full' | 'full' | 'cancelled'
  }>
}

// Membership plan
export interface MembershipPlan {
  id: string
  name: MultilingualText
  description?: MultilingualText
  type: 'unlimited' | 'limited' | 'package' | 'drop-in'
  duration: {
    value: number
    unit: 'day' | 'week' | 'month' | 'year'
  }
  price: {
    amount: number
    currency: string
    originalAmount?: number   // For showing discounts
  }
  features: MultilingualText[]
  classLimit?: number         // For limited plans
  classTypes?: ClassType[]    // Allowed class types
  popular?: boolean           // Highlight as popular
  order: number
}

// Booking/reservation
export interface Booking {
  id: string
  userId: string
  classId: string
  classDate: string
  status: 'confirmed' | 'waitlisted' | 'cancelled' | 'completed' | 'no-show'
  bookedAt: string
  cancelledAt?: string
  checkInAt?: string
}

// ============================================
// RESTAURANT
// ============================================

// Cuisine type
export type CuisineType =
  | 'korean'
  | 'japanese'
  | 'chinese'
  | 'italian'
  | 'french'
  | 'american'
  | 'mexican'
  | 'thai'
  | 'vietnamese'
  | 'indian'
  | 'fusion'
  | 'other'

// Dietary info
export type DietaryInfo =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'halal'
  | 'kosher'
  | 'dairy-free'
  | 'nut-free'

// Spiciness level
export type SpicinessLevel = 0 | 1 | 2 | 3 | 4 | 5

// Menu category
export interface MenuCategory {
  id: string
  name: MultilingualText
  description?: MultilingualText
  order: number
  image?: string
  available: boolean
  timeRestriction?: {
    startTime: string
    endTime: string
  }
}

// Menu item
export interface MenuItem {
  id: string
  name: MultilingualText
  description?: MultilingualText
  category: string            // Category ID
  price: {
    amount: number
    currency: string
  }
  images?: ImageSet
  dietary?: DietaryInfo[]
  spiciness?: SpicinessLevel
  calories?: number
  allergens?: string[]
  options?: Array<{
    name: MultilingualText
    choices: Array<{
      name: MultilingualText
      priceModifier?: number  // +/- amount
    }>
    required?: boolean
    multiSelect?: boolean
  }>
  popular?: boolean
  chefRecommended?: boolean
  available: boolean
  order: number
}

// Restaurant reservation
export interface RestaurantReservation {
  id: string
  name: string
  phone: string
  email?: string
  date: string
  time: string
  partySize: number
  status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no-show'
  specialRequests?: string
  tablePreference?: string
  occasion?: string
  createdAt: string
}

// ============================================
// E-COMMERCE
// ============================================

// Product variant
export interface ProductVariant {
  id: string
  name: string                // e.g., "Blue / Medium"
  sku: string
  price: {
    amount: number
    currency: string
    compareAtPrice?: number   // Original price for sale display
  }
  options: Record<string, string>  // e.g., { color: 'blue', size: 'M' }
  inventory: {
    quantity: number
    policy: 'deny' | 'continue' | 'preorder'
  }
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
    unit: 'cm' | 'in'
  }
  image?: string
  available: boolean
}

// Product option type
export interface ProductOption {
  name: string                // e.g., "Color", "Size"
  values: string[]            // e.g., ["Red", "Blue", "Green"]
}

// Full product for e-commerce
export interface EcommerceProduct {
  id: string
  slug: string
  name: MultilingualText
  description: MultilingualText
  shortDescription?: MultilingualText
  category: string
  categories?: string[]
  tags?: string[]
  brand?: string
  vendor?: string
  images: ImageSet & { gallery?: string[] }
  options: ProductOption[]
  variants: ProductVariant[]
  defaultVariant: string      // Variant ID
  reviews?: {
    average: number
    count: number
  }
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
  status: 'draft' | 'active' | 'archived'
  featured?: boolean
  createdAt: string
  updatedAt: string
}

// Shopping cart item
export interface CartItem {
  productId: string
  variantId: string
  quantity: number
  price: number
  name: string
  image?: string
}

// Order
export interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    phone?: string
  }
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  currency: string
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  shippingAddress: {
    street: string
    city: string
    state?: string
    postalCode: string
    country: string
  }
  billingAddress?: {
    street: string
    city: string
    state?: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  trackingNumber?: string
  notes?: string
  createdAt: string
  updatedAt: string
}
