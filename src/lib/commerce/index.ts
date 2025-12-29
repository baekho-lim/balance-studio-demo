/**
 * Commerce Growth OS - SSOT Module
 * Single Source of Truth for types and mock data
 */

// Export all types
export type {
  // Enums & Literals
  RFMScore,
  OrderStatus,
  ChannelType,
  AdPlatform,
  CampaignStatus,
  RecommendationType,
  RecommendationPriority,
  // Interfaces
  Brand,
  Channel,
  Product,
  ProductVariant,
  Customer,
  RFMData,
  Order,
  OrderItem,
  Review,
  AdCampaign,
  Creative,
  Recommendation,
  KPISummary,
  CommerceMockData,
} from './types'

// Export all mock data getters
export {
  getMockData,
  getBrands,
  getChannels,
  getProducts,
  getCustomers,
  getOrders,
  getReviews,
  getAdCampaigns,
  getCreatives,
  getRecommendations,
  getKPISummary,
  // Filtered getters
  getCustomersBySegment,
  getOrdersByStatus,
  getActiveAdCampaigns,
  getHighPriorityRecommendations,
  getProductById,
  getCustomerById,
  getOrderById,
} from './mock'
