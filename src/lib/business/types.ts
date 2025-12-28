/**
 * Business Module Types
 *
 * Types for fitness/wellness businesses like Pilates studios,
 * yoga centers, gyms, and similar service-based businesses.
 */

// Multi-language text support
export interface MultilingualText {
  en: string
  ko?: string
  [key: string]: string | undefined
}

// ============================================
// Instructor / Staff
// ============================================

export interface Instructor {
  id: string
  slug: string
  name: MultilingualText
  title: MultilingualText          // e.g., "Senior Pilates Instructor"
  bio: MultilingualText
  shortBio?: MultilingualText      // For cards/listings

  // Professional info
  certifications: string[]         // e.g., ["Stott Pilates", "Yoga Alliance RYT-200"]
  specialties: string[]            // e.g., ["Reformer", "Prenatal", "Rehabilitation"]
  experienceYears: number

  // Media
  profileImage: string
  gallery?: string[]

  // Contact (optional, for direct booking)
  email?: string
  instagram?: string

  // Display settings
  featured: boolean
  displayOrder: number
  status: 'active' | 'inactive'

  // Timestamps
  createdAt: string
  updatedAt: string
}

// ============================================
// Class Types
// ============================================

export type ClassLevel = 'beginner' | 'intermediate' | 'advanced' | 'all-levels'
export type ClassType = 'pilates' | 'yoga' | 'fitness' | 'dance' | 'meditation' | 'other'

export interface ClassDefinition {
  id: string
  slug: string
  name: MultilingualText
  description: MultilingualText
  shortDescription?: MultilingualText

  // Classification
  type: ClassType
  level: ClassLevel
  category?: string               // e.g., "Mat", "Reformer", "Tower"

  // Details
  durationMinutes: number         // e.g., 50, 60, 75
  maxParticipants: number
  equipmentNeeded?: string[]      // e.g., ["Mat", "Resistance Band"]

  // Media
  image?: string
  gallery?: string[]

  // Display
  featured: boolean
  displayOrder: number
  status: 'active' | 'inactive'

  // Timestamps
  createdAt: string
  updatedAt: string
}

// ============================================
// Schedule
// ============================================

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export interface ScheduleSlot {
  id: string
  classId: string                  // Reference to ClassDefinition
  instructorId: string             // Reference to Instructor

  // Time
  dayOfWeek: DayOfWeek
  startTime: string                // "09:00" format (24h)
  endTime: string                  // "10:00" format (24h)

  // Location
  room?: string                    // e.g., "Studio A", "Reformer Room"

  // Capacity
  maxParticipants: number
  currentParticipants: number      // For display purposes

  // Status
  status: 'active' | 'cancelled' | 'full'

  // Recurring settings
  isRecurring: boolean
  validFrom?: string               // ISO date
  validUntil?: string              // ISO date

  // Special notes
  notes?: MultilingualText
}

// ============================================
// Bookings
// ============================================

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'no-show'

export interface Booking {
  id: string
  scheduleSlotId: string
  userId?: string                  // If user system exists

  // Guest info (if no user account)
  guestName: string
  guestEmail: string
  guestPhone?: string

  // Booking details
  bookingDate: string              // The actual date of the class
  status: BookingStatus
  notes?: string

  // Payment (optional)
  paymentStatus?: 'pending' | 'paid' | 'refunded'
  membershipUsed?: string          // Reference to membership ID

  // Timestamps
  createdAt: string
  updatedAt: string
}

// ============================================
// Memberships / Pricing
// ============================================

export type MembershipType = 'unlimited' | 'class-pack' | 'monthly' | 'drop-in'
export type BillingCycle = 'monthly' | 'quarterly' | 'annually' | 'one-time'

export interface MembershipPlan {
  id: string
  name: MultilingualText
  description: MultilingualText

  // Type & Details
  type: MembershipType
  classesIncluded?: number         // For class-pack type
  validDays?: number               // Validity period in days

  // Pricing
  price: number
  currency: string                 // "KRW", "USD", etc.
  billingCycle: BillingCycle

  // Restrictions
  classTypes?: ClassType[]         // Which class types are included
  maxBookingsPerDay?: number
  maxBookingsPerWeek?: number

  // Benefits
  benefits: MultilingualText[]     // e.g., ["Free mat rental", "10% shop discount"]

  // Display
  featured: boolean                // Highlight this plan
  popular: boolean                 // "Most Popular" badge
  displayOrder: number
  status: 'active' | 'inactive'

  // Timestamps
  createdAt: string
  updatedAt: string
}

// ============================================
// Business Settings
// ============================================

export interface BusinessHours {
  dayOfWeek: DayOfWeek
  isOpen: boolean
  openTime?: string                // "07:00"
  closeTime?: string               // "21:00"
}

export interface BusinessInfo {
  name: MultilingualText
  tagline?: MultilingualText
  description: MultilingualText

  // Contact
  phone: string
  email: string
  website?: string

  // Social
  instagram?: string
  facebook?: string
  youtube?: string
  kakao?: string                   // For Korean businesses

  // Location
  address: MultilingualText
  addressDetail?: MultilingualText
  city: string
  postalCode?: string
  country: string
  coordinates?: {
    lat: number
    lng: number
  }

  // Hours
  businessHours: BusinessHours[]

  // Policies
  cancellationPolicy?: MultilingualText
  bookingRules?: MultilingualText

  // SEO
  googlePlaceId?: string
  naverPlaceId?: string
}

// ============================================
// Helper Types
// ============================================

// For schedule display
export interface ScheduleViewItem extends ScheduleSlot {
  class: ClassDefinition
  instructor: Instructor
}

// For booking form
export interface BookingFormData {
  scheduleSlotId: string
  bookingDate: string
  guestName: string
  guestEmail: string
  guestPhone?: string
  notes?: string
}

// Level labels
export const LEVEL_LABELS: Record<ClassLevel, MultilingualText> = {
  'beginner': { en: 'Beginner', ko: '초급' },
  'intermediate': { en: 'Intermediate', ko: '중급' },
  'advanced': { en: 'Advanced', ko: '고급' },
  'all-levels': { en: 'All Levels', ko: '모든 레벨' },
}

// Day labels
export const DAY_LABELS: Record<DayOfWeek, MultilingualText> = {
  'monday': { en: 'Monday', ko: '월요일' },
  'tuesday': { en: 'Tuesday', ko: '화요일' },
  'wednesday': { en: 'Wednesday', ko: '수요일' },
  'thursday': { en: 'Thursday', ko: '목요일' },
  'friday': { en: 'Friday', ko: '금요일' },
  'saturday': { en: 'Saturday', ko: '토요일' },
  'sunday': { en: 'Sunday', ko: '일요일' },
}
