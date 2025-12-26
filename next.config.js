/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Optimized image settings
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    // Restrict remote patterns for security
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'instagram.com',
      },
      {
        protocol: 'https',
        hostname: '*.instagram.com',
      },
      {
        protocol: 'https',
        hostname: 'cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
      },
    ],
  },
}

module.exports = nextConfig
