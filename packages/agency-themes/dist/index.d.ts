import { ThemeConfig, ThemePresetId } from '@agency/core';

declare const THEMES_VERSION = "0.1.0";
declare const defaultTheme: ThemeConfig;
declare const themePresets: Record<ThemePresetId, Partial<ThemeConfig>>;
/**
 * Create a theme by extending the default theme
 */
declare function createTheme(overrides: Partial<ThemeConfig>): ThemeConfig;
/**
 * Get a theme preset by ID
 */
declare function getThemePreset(presetId: ThemePresetId): ThemeConfig;

export { THEMES_VERSION, createTheme, defaultTheme, getThemePreset, themePresets };
