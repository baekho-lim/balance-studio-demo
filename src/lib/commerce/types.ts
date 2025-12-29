/**
 * Commerce Growth OS - Type Definitions
 * Single Source of Truth (SSOT) for all commerce-related types
 */

// =============================================================================
// Enums & Literals
// =============================================================================

export type RFMScore = 'VIP' | 'Loyal' | 'Regular' | 'AtRisk' | 'Dormant'

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type ChannelType =
  | 'ecommerce'
  | 'marketplace'
  | 'social'
  | 'offline'

export type AdPlatform =
  | 'meta'
  | 'google'
  | 'tiktok'
  | 'naver'
  | 'kakao'

export type CampaignStatus =
  | 'active'
  | 'paused'
  | 'ended'
  | 'draft'

export type RecommendationType =
  | 'upsell'
  | 'cross-sell'
  | 'reactivation'
  | 'retention'
  | 'acquisition'

export type RecommendationPriority = 'high' | 'medium' | 'low'

// =============================================================================
// 1. Brand
// =============================================================================

export interface Brand {
  id: string
  name: string
  nameKr: string
  domain: string
  logo?: string
  industry: string
  currency: 'KRW' | 'USD' | 'EUR'
  timezone: string
  createdAt: string
}

// =============================================================================
// 2. Channel
// =============================================================================

export interface Channel {
  id: string
  name: string
  type: ChannelType
  platform: string        // 'shopify', 'cafe24', 'coupang', etc.
  isConnected: boolean
  lastSync: string | null
  totalOrders: number
  totalRevenue: number
  status: 'active' | 'inactive' | 'pending'
}

// =============================================================================
// 3. Product
// =============================================================================

export interface ProductVariant {
  id: string
  sku: string
  name: string
  price: number
  compareAtPrice?: number
  inventory: number
}

export interface Product {
  id: string
  name: string
  nameKr: string
  category: string
  categoryKr: string
  price: number
  compareAtPrice?: number
  cost: number                // 원가
  margin: number              // 마진율 (%)
  inventory: number
  variants?: ProductVariant[]
  images: string[]
  totalSales: number
  totalRevenue: number
  averageRating: number
  reviewCount: number
  isActive: boolean
  createdAt: string
}

// =============================================================================
// 4. Customer (with RFM)
// =============================================================================

export interface RFMData {
  recency: number           // 최근 구매일로부터 일수
  frequency: number         // 총 구매 횟수
  monetary: number          // 총 구매액
  score: RFMScore           // RFM 세그먼트
  lastCalculated: string    // 마지막 계산 일시
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  rfm: RFMData
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  ltv: number               // Lifetime Value
  firstOrderDate: string
  lastOrderDate: string
  preferredChannel: string
  tags: string[]
  isSubscribed: boolean     // 마케팅 수신 동의
  createdAt: string
}

// =============================================================================
// 5. Order
// =============================================================================

export interface OrderItem {
  productId: string
  productName: string
  variantId?: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  customerEmail: string
  channelId: string
  channelName: string
  items: OrderItem[]
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  status: OrderStatus
  paymentMethod: string
  shippingAddress: string
  isRepeatCustomer: boolean
  createdAt: string
  updatedAt: string
}

// =============================================================================
// 6. Review
// =============================================================================

export interface Review {
  id: string
  productId: string
  productName: string
  customerId: string
  customerName: string
  orderId: string
  rating: number            // 1-5
  title: string
  content: string
  images?: string[]
  isVerified: boolean       // 실구매 인증
  helpfulCount: number
  reply?: {
    content: string
    repliedAt: string
  }
  createdAt: string
}

// =============================================================================
// 7. AdCampaign
// =============================================================================

export interface AdCampaign {
  id: string
  name: string
  platform: AdPlatform
  status: CampaignStatus
  objective: string         // 'awareness', 'traffic', 'conversion', etc.
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  roas: number              // Return on Ad Spend
  cpa: number               // Cost per Acquisition
  ctr: number               // Click-through Rate (%)
  cvr: number               // Conversion Rate (%)
  startDate: string
  endDate?: string
  creatives: string[]       // Creative IDs
}

// =============================================================================
// 8. Creative
// =============================================================================

export interface Creative {
  id: string
  campaignId: string
  name: string
  type: 'image' | 'video' | 'carousel' | 'text'
  format: string            // '1080x1080', '1920x1080', etc.
  headline: string
  description: string
  callToAction: string
  mediaUrl: string
  thumbnailUrl?: string
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  isActive: boolean
  createdAt: string
}

// =============================================================================
// 9. Recommendation
// =============================================================================

export interface Recommendation {
  id: string
  type: RecommendationType
  priority: RecommendationPriority
  title: string
  titleKr: string
  description: string
  descriptionKr: string
  targetSegment?: RFMScore
  targetCustomerCount?: number
  estimatedRevenue?: number
  estimatedROI?: number
  actionLabel: string
  actionLabelKr: string
  actionUrl: string
  isNew: boolean
  createdAt: string
}

// =============================================================================
// 10. KPISummary
// =============================================================================

export interface KPISummary {
  // 필수 5개 필드
  totalRevenue: number
  grossMargin: number          // 총 마진 (%)
  AOV: number                  // Average Order Value
  repeatRevenuePct: number     // 재구매 매출 비율 (%)
  blendedROAS: number          // 통합 ROAS

  // 추가 메트릭
  totalOrders: number
  totalCustomers: number
  newCustomers: number
  returningCustomers: number
  totalAdSpend: number
  totalConversions: number

  // 기간 비교
  period: {
    start: string
    end: string
    label: string              // 'This Month', '이번 달'
  }
  comparison: {
    revenueChange: number      // % 변화
    ordersChange: number
    aovChange: number
    roasChange: number
  }
}

// =============================================================================
// Aggregate Export Type
// =============================================================================

export interface CommerceMockData {
  brands: Brand[]
  channels: Channel[]
  products: Product[]
  customers: Customer[]
  orders: Order[]
  reviews: Review[]
  adCampaigns: AdCampaign[]
  creatives: Creative[]
  recommendations: Recommendation[]
  kpiSummary: KPISummary
}
