/**
 * Theme System
 *
 * Full theme system with presets, CSS variable generation,
 * and React context for theme management.
 */

// Types
export type {
  ThemeConfig,
  ThemeColors,
  ThemeFonts,
  ThemeSpacing,
  ThemeLayout,
  ThemeComponents,
  ThemeEffects,
  ThemePreset,
  ThemeState,
} from './types'

// Presets
export {
  minimalTheme,
  boldTheme,
  elegantTheme,
  themes,
  getThemeById,
  getThemeList,
} from './presets'

// Utils
export {
  themeToCSSVariables,
  generateThemeCSS,
  applyTheme,
  getCurrentThemeVars,
} from './utils'

// Provider
export { ThemeProvider, useTheme } from './ThemeProvider'
