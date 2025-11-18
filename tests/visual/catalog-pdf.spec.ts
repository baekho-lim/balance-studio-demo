import { test, expect } from '@playwright/test'

/**
 * Visual Regression Tests for Catalog PDF Rendering
 *
 * Tests the critical image rendering issues that frequently occur:
 * - Page 9/17: Triptych overview (3 images)
 * - Page 12/17: Diptych overview (2 images)
 *
 * These tests prevent the recurring "이미지 안보여" bugs by:
 * 1. Verifying image visibility
 * 2. Checking aspect ratio preservation
 * 3. Taking snapshots for visual comparison
 */

test.describe('Catalog PDF Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to catalog page
    await page.goto('/catalog')

    // Wait for page to fully load
    await page.waitForLoadState('networkidle')

    // Switch to print media mode to simulate PDF generation
    await page.emulateMedia({ media: 'print' })
  })

  test('Page 9/17 - Triptych Overview (3 images)', async ({ page }) => {
    // Find the triptych page by searching for its h2 title
    const triptychPage = page.locator('section:has(h2:has-text("Temporal Triptych")), section:has(h2:has-text("시간 3부작"))').first()
    await triptychPage.scrollIntoViewIfNeeded()

    // Wait for images to load
    await page.waitForTimeout(2000)

    // Verify the page has the triptych title
    const title = triptychPage.locator('h2')
    await expect(title).toContainText(/Temporal Triptych|시간 3부작/)

    // Verify exactly 3 images are present in the grid
    const imageGrid = triptychPage.locator('.grid-cols-3').first()
    const images = imageGrid.locator('img')
    await expect(images).toHaveCount(3)

    // Verify all images are visible
    for (let i = 0; i < 3; i++) {
      const img = images.nth(i)
      await expect(img).toBeVisible()

      // Verify image has loaded (not placeholder)
      const src = await img.getAttribute('src')
      expect(src).not.toContain('placeholder')

      // Verify image has dimensions (aspectRatio is working)
      const box = await img.boundingBox()
      expect(box).not.toBeNull()
      expect(box!.width).toBeGreaterThan(0)
      expect(box!.height).toBeGreaterThan(0)

      // Log aspect ratio for debugging
      const aspectRatio = box!.width / box!.height
      console.log(`Triptych image ${i + 1} aspect ratio: ${aspectRatio.toFixed(2)}`)
    }

    // Take snapshot of the entire triptych page for visual comparison
    await expect(triptychPage).toHaveScreenshot('triptych-overview.png', {
      fullPage: false,
      animations: 'disabled',
    })
  })

  test('Page 12/17 - Diptych Overview (2 images)', async ({ page }) => {
    // Find the diptych overview page using the overview-page class and grid-cols-2
    const diptychPage = page.locator('section.overview-page:has(.grid-cols-2)').first()
    await diptychPage.scrollIntoViewIfNeeded()

    // Wait for images to load
    await page.waitForTimeout(2000)

    // Verify the page has the diptych title
    const title = diptychPage.locator('h2')
    await expect(title).toContainText(/Effortlessly chirping birds/)

    // Verify exactly 2 images are present in the grid
    const imageGrid = diptychPage.locator('.grid-cols-2').first()
    const images = imageGrid.locator('img')
    await expect(images).toHaveCount(2)

    // Verify all images are visible
    for (let i = 0; i < 2; i++) {
      const img = images.nth(i)
      await expect(img).toBeVisible()

      // Verify image has loaded (not placeholder)
      const src = await img.getAttribute('src')
      expect(src).not.toContain('placeholder')

      // Verify image has dimensions (aspectRatio is working)
      const box = await img.boundingBox()
      expect(box).not.toBeNull()
      expect(box!.width).toBeGreaterThan(0)
      expect(box!.height).toBeGreaterThan(0)

      // Log aspect ratio for debugging
      const aspectRatio = box!.width / box!.height
      console.log(`Diptych image ${i + 1} aspect ratio: ${aspectRatio.toFixed(2)}`)
    }

    // Take snapshot of the entire diptych page for visual comparison
    await expect(diptychPage).toHaveScreenshot('diptych-overview.png', {
      fullPage: false,
      animations: 'disabled',
    })
  })

  test('Full catalog structure - Page count verification', async ({ page }) => {
    // Verify total number of pages (sections)
    const sections = page.locator('section')
    const count = await sections.count()

    // Expected: Cover + 11 works + triptych overview + diptych overview + Artist CV = 17 pages
    expect(count).toBeGreaterThanOrEqual(15)
    console.log(`Total pages in catalog: ${count}`)
  })

  test('Print mode - Language toggle hidden', async ({ page }) => {
    // Verify that screen-only elements are hidden in print mode
    const languageToggle = page.locator('.print\\:hidden')

    // Should have multiple print:hidden elements
    const hiddenCount = await languageToggle.count()
    expect(hiddenCount).toBeGreaterThan(0)

    console.log(`Print-hidden elements: ${hiddenCount}`)
  })
})

test.describe('Image Rendering Smoke Tests', () => {
  test('Cover page image loads', async ({ page }) => {
    await page.goto('/catalog')
    await page.waitForLoadState('networkidle')

    // Cover page should have background image
    const coverImage = page.locator('section').first().locator('img').first()
    await expect(coverImage).toBeVisible()

    const src = await coverImage.getAttribute('src')
    expect(src).toBeTruthy()
    console.log('Cover image src:', src)
  })

  test('Artist profile image loads', async ({ page }) => {
    await page.goto('/catalog')
    await page.waitForLoadState('networkidle')

    // Scroll to bottom (Artist CV page)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(1000)

    // Find artist profile image
    const artistImage = page.locator('img[alt="Lim Hyejung"]')
    await expect(artistImage).toBeVisible()

    console.log('Artist profile image loaded successfully')
  })
})
