/**
 * Slug generation utilities
 */

/**
 * Convert text to URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace Korean characters with romanization (basic)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace non-alphanumeric with hyphens
    .replace(/[^a-z0-9]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Collapse multiple hyphens
    .replace(/-+/g, '-')
}

/**
 * Generate unique slug by appending number if needed
 */
export function generateUniqueSlug(
  baseSlug: string,
  existingSlugs: string[]
): string {
  const slug = slugify(baseSlug)

  if (!existingSlugs.includes(slug)) {
    return slug
  }

  let counter = 1
  let uniqueSlug = `${slug}-${counter}`

  while (existingSlugs.includes(uniqueSlug)) {
    counter++
    uniqueSlug = `${slug}-${counter}`
  }

  return uniqueSlug
}

/**
 * Validate slug format
 */
export function isValidSlug(slug: string): boolean {
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugPattern.test(slug)
}

/**
 * Extract ID from slug if it contains one
 * e.g., "my-article-123" -> "123"
 */
export function extractIdFromSlug(slug: string): string | null {
  const match = slug.match(/-(\d+)$/)
  return match ? match[1] : null
}

/**
 * Create slug from title and date
 * e.g., "My Article" + "2024-01-15" -> "my-article-2024-01-15"
 */
export function createDatedSlug(title: string, date: string | Date): string {
  const dateStr = typeof date === 'string'
    ? date.split('T')[0]
    : date.toISOString().split('T')[0]

  return `${slugify(title)}-${dateStr}`
}
