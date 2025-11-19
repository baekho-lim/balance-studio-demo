import Image from 'next/image'

interface ArtistProfileImageProps {
  /**
   * Size preset for the profile image
   * - small: 128px (w-32 h-32)
   * - medium: 192px (w-48 h-48)
   * - large: 192px on mobile, 256px on desktop (w-48 h-48 md:w-64 md:h-64)
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Additional CSS classes for the container
   */
  className?: string
}

/**
 * ArtistProfileImage - Standardized profile image component
 *
 * Ensures consistent cropping and positioning of the artist's profile photo
 * across all pages (main homepage, catalog, etc.)
 *
 * Standard positioning: object-top (based on main homepage)
 */
export default function ArtistProfileImage({
  size = 'medium',
  className = ''
}: ArtistProfileImageProps) {
  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-48 h-48 md:w-64 md:h-64'
  }

  const sizes = {
    small: '128px',
    medium: '192px',
    large: '(max-width: 768px) 192px, 256px'
  }

  return (
    <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-gray-100 ${className}`}>
      <Image
        src="/images/artist/hj lim black.png"
        alt="Lim Hyejung"
        fill
        priority
        className="object-cover object-top"
        sizes={sizes[size]}
      />
    </div>
  )
}
