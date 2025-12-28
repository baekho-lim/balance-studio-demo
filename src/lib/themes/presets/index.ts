/**
 * Theme Presets Index
 *
 * Export all available theme presets for easy access.
 */

export { minimalTheme } from './minimal'
export { boldTheme } from './bold'
export { elegantTheme } from './elegant'
export { wellnessTheme } from './wellness'

import { minimalTheme } from './minimal'
import { boldTheme } from './bold'
import { elegantTheme } from './elegant'
import { wellnessTheme } from './wellness'
import type { ThemeConfig, ThemePreset } from '../types'

// All available themes
export const themes: Record<ThemePreset, ThemeConfig> = {
  minimal: minimalTheme,
  bold: boldTheme,
  elegant: elegantTheme,
  wellness: wellnessTheme,
  custom: elegantTheme, // Default to elegant for custom
}

// Get theme by ID
export function getThemeById(id: string): ThemeConfig | undefined {
  return Object.values(themes).find(theme => theme.id === id)
}

// Get all theme metadata (for selection UI)
export function getThemeList() {
  return Object.values(themes).map(theme => ({
    id: theme.id,
    name: theme.name,
    description: theme.description,
    preview: theme.preview,
  }))
}
