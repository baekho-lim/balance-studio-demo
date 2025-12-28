/**
 * Theme Utilities
 *
 * Functions to convert theme config to CSS variables
 * and apply them to the document.
 */

import type { ThemeConfig } from './types'

/**
 * Convert theme config to CSS custom properties
 */
export function themeToCSSVariables(theme: ThemeConfig): Record<string, string> {
  const vars: Record<string, string> = {}

  // Colors
  vars['--color-primary'] = theme.colors.primary
  vars['--color-primary-light'] = theme.colors.primaryLight
  vars['--color-primary-dark'] = theme.colors.primaryDark
  vars['--color-secondary'] = theme.colors.secondary
  vars['--color-secondary-light'] = theme.colors.secondaryLight
  vars['--color-secondary-dark'] = theme.colors.secondaryDark
  vars['--color-accent'] = theme.colors.accent
  vars['--color-accent-light'] = theme.colors.accentLight
  vars['--color-accent-dark'] = theme.colors.accentDark
  vars['--color-background'] = theme.colors.background
  vars['--color-background-alt'] = theme.colors.backgroundAlt
  vars['--color-surface'] = theme.colors.surface
  vars['--color-text'] = theme.colors.text
  vars['--color-text-muted'] = theme.colors.textMuted
  vars['--color-text-inverted'] = theme.colors.textInverted
  vars['--color-success'] = theme.colors.success
  vars['--color-warning'] = theme.colors.warning
  vars['--color-error'] = theme.colors.error
  vars['--color-info'] = theme.colors.info
  vars['--color-border'] = theme.colors.border
  vars['--color-border-light'] = theme.colors.borderLight

  // Fonts
  vars['--font-heading'] = theme.fonts.heading
  vars['--font-body'] = theme.fonts.body
  if (theme.fonts.mono) {
    vars['--font-mono'] = theme.fonts.mono
  }

  // Font sizes
  vars['--text-xs'] = theme.fonts.sizes.xs
  vars['--text-sm'] = theme.fonts.sizes.sm
  vars['--text-base'] = theme.fonts.sizes.base
  vars['--text-lg'] = theme.fonts.sizes.lg
  vars['--text-xl'] = theme.fonts.sizes.xl
  vars['--text-2xl'] = theme.fonts.sizes['2xl']
  vars['--text-3xl'] = theme.fonts.sizes['3xl']
  vars['--text-4xl'] = theme.fonts.sizes['4xl']
  vars['--text-5xl'] = theme.fonts.sizes['5xl']

  // Font weights
  vars['--font-normal'] = String(theme.fonts.weights.normal)
  vars['--font-medium'] = String(theme.fonts.weights.medium)
  vars['--font-semibold'] = String(theme.fonts.weights.semibold)
  vars['--font-bold'] = String(theme.fonts.weights.bold)

  // Line heights
  vars['--leading-tight'] = theme.fonts.lineHeights.tight
  vars['--leading-normal'] = theme.fonts.lineHeights.normal
  vars['--leading-relaxed'] = theme.fonts.lineHeights.relaxed

  // Spacing
  vars['--spacing-xs'] = theme.spacing.xs
  vars['--spacing-sm'] = theme.spacing.sm
  vars['--spacing-md'] = theme.spacing.md
  vars['--spacing-lg'] = theme.spacing.lg
  vars['--spacing-xl'] = theme.spacing.xl
  vars['--spacing-2xl'] = theme.spacing['2xl']
  vars['--spacing-3xl'] = theme.spacing['3xl']

  // Layout
  vars['--header-height'] = theme.layout.headerHeight
  vars['--max-width'] = theme.layout.maxWidth
  vars['--container-padding'] = theme.layout.containerPadding
  if (theme.layout.sidebarWidth) {
    vars['--sidebar-width'] = theme.layout.sidebarWidth
  }

  // Components - Button
  vars['--button-radius'] = theme.components.button.borderRadius
  vars['--button-padding'] = theme.components.button.padding
  vars['--button-transition'] = theme.components.button.transition

  // Components - Card
  vars['--card-radius'] = theme.components.card.borderRadius
  vars['--card-shadow'] = theme.components.card.shadow
  vars['--card-padding'] = theme.components.card.padding

  // Components - Input
  vars['--input-radius'] = theme.components.input.borderRadius
  vars['--input-border-width'] = theme.components.input.borderWidth
  vars['--input-padding'] = theme.components.input.padding

  // Components - Badge
  vars['--badge-radius'] = theme.components.badge.borderRadius
  vars['--badge-padding'] = theme.components.badge.padding
  vars['--badge-font-size'] = theme.components.badge.fontSize

  // Effects - Shadows
  vars['--shadow-sm'] = theme.effects.shadows.sm
  vars['--shadow-md'] = theme.effects.shadows.md
  vars['--shadow-lg'] = theme.effects.shadows.lg
  vars['--shadow-xl'] = theme.effects.shadows.xl

  // Effects - Radius
  vars['--radius-sm'] = theme.effects.radius.sm
  vars['--radius-md'] = theme.effects.radius.md
  vars['--radius-lg'] = theme.effects.radius.lg
  vars['--radius-full'] = theme.effects.radius.full

  // Effects - Transitions
  vars['--transition-fast'] = theme.effects.transitions.fast
  vars['--transition-normal'] = theme.effects.transitions.normal
  vars['--transition-slow'] = theme.effects.transitions.slow

  return vars
}

/**
 * Generate CSS string from theme config
 */
export function generateThemeCSS(theme: ThemeConfig): string {
  const vars = themeToCSSVariables(theme)

  let css = ':root {\n'
  for (const [key, value] of Object.entries(vars)) {
    css += `  ${key}: ${value};\n`
  }
  css += '}\n'

  // Add custom CSS if present
  if (theme.customCSS) {
    css += '\n' + theme.customCSS
  }

  // Add animations if defined
  if (theme.effects.animations) {
    css += '\n@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n'
    css += '\n@keyframes slideUp {\n  from { opacity: 0; transform: translateY(10px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n'
    css += '\n@keyframes scaleIn {\n  from { opacity: 0; transform: scale(0.95); }\n  to { opacity: 1; transform: scale(1); }\n}\n'
  }

  return css
}

/**
 * Apply theme to document (client-side only)
 */
export function applyTheme(theme: ThemeConfig): void {
  if (typeof document === 'undefined') return

  const vars = themeToCSSVariables(theme)

  for (const [key, value] of Object.entries(vars)) {
    document.documentElement.style.setProperty(key, value)
  }
}

/**
 * Get current theme from CSS variables (for debugging)
 */
export function getCurrentThemeVars(): Record<string, string> {
  if (typeof document === 'undefined') return {}

  const style = getComputedStyle(document.documentElement)
  const vars: Record<string, string> = {}

  // Get all --color-* variables
  const colorKeys = [
    'primary', 'primary-light', 'primary-dark',
    'secondary', 'secondary-light', 'secondary-dark',
    'accent', 'accent-light', 'accent-dark',
    'background', 'background-alt', 'surface',
    'text', 'text-muted', 'text-inverted',
  ]

  for (const key of colorKeys) {
    vars[`--color-${key}`] = style.getPropertyValue(`--color-${key}`).trim()
  }

  return vars
}
