/**
 * Interactive CLI Prompts
 */

import Enquirer from 'enquirer'
import {
  BusinessType,
  ThemePreset,
  Feature,
  ProjectConfig,
  BUSINESS_TYPES,
  THEME_PRESETS,
  FEATURES,
  LANGUAGES,
} from './types.js'

// Use Enquirer with type assertions due to incomplete type definitions
const enquirer = new Enquirer()

interface PromptResult {
  value: string | string[] | boolean
}

async function promptInput(options: {
  message: string
  initial?: string
  validate?: (value: string) => boolean | string
}): Promise<string> {
  const result = await enquirer.prompt({
    type: 'input',
    name: 'value',
    message: options.message,
    initial: options.initial,
    validate: options.validate,
  } as Parameters<typeof enquirer.prompt>[0]) as PromptResult
  return result.value as string
}

async function promptSelect(options: {
  message: string
  choices: Array<{ name: string; message: string; hint?: string }>
  initial?: number
}): Promise<string> {
  const result = await enquirer.prompt({
    type: 'select',
    name: 'value',
    message: options.message,
    choices: options.choices,
    initial: options.initial,
  } as Parameters<typeof enquirer.prompt>[0]) as PromptResult
  return result.value as string
}

async function promptMultiSelect(options: {
  message: string
  choices: Array<{ name: string; message: string; hint?: string }>
  initial?: string[]
}): Promise<string[]> {
  const result = await enquirer.prompt({
    type: 'multiselect',
    name: 'value',
    message: options.message,
    choices: options.choices,
    initial: options.initial,
  } as Parameters<typeof enquirer.prompt>[0]) as PromptResult
  return result.value as string[]
}

async function promptConfirm(options: {
  message: string
  initial?: boolean
}): Promise<boolean> {
  const result = await enquirer.prompt({
    type: 'confirm',
    name: 'value',
    message: options.message,
    initial: options.initial,
  } as Parameters<typeof enquirer.prompt>[0]) as PromptResult
  return result.value as boolean
}

export async function getProjectConfig(): Promise<ProjectConfig> {
  console.log('\n')

  // 1. Project name
  const name = await promptInput({
    message: 'Project name (folder name):',
    initial: 'my-agency-site',
    validate: (value: string) => {
      if (!value) return 'Project name is required'
      if (!/^[a-z0-9-]+$/.test(value)) {
        return 'Only lowercase letters, numbers, and hyphens allowed'
      }
      return true
    },
  })

  // 2. Display name
  const displayName = await promptInput({
    message: 'Display name (shown on website):',
    initial: 'My Business',
  })

  // 3. Business type
  const businessTypeChoices = Object.entries(BUSINESS_TYPES).map(([key, info]) => ({
    name: key,
    message: `${info.icon} ${info.name}`,
    hint: info.description,
  }))

  const businessType = await promptSelect({
    message: 'What type of business is this for?',
    choices: businessTypeChoices,
  }) as BusinessType

  // 4. Theme
  const selectedBusiness = BUSINESS_TYPES[businessType]
  const themeChoices = Object.entries(THEME_PRESETS).map(([key, info]) => ({
    name: key,
    message: info.name,
    hint: info.description + (key === selectedBusiness.defaultTheme ? ' (Recommended)' : ''),
  }))

  const theme = await promptSelect({
    message: 'Choose a theme:',
    choices: themeChoices,
    initial: Object.keys(THEME_PRESETS).indexOf(selectedBusiness.defaultTheme),
  }) as ThemePreset

  // 5. Features
  const featureChoices = Object.entries(FEATURES).map(([key, info]) => ({
    name: key,
    message: info.name,
    hint: info.description,
  }))

  const features = await promptMultiSelect({
    message: 'Select features to include:',
    choices: featureChoices,
    initial: selectedBusiness.recommendedFeatures,
  }) as Feature[]

  // 6. Database
  const database = await promptSelect({
    message: 'Database type:',
    choices: [
      { name: 'json', message: 'JSON files', hint: 'Simple, no setup required' },
      { name: 'postgresql', message: 'PostgreSQL', hint: 'Production-ready, scalable' },
    ],
  }) as 'json' | 'postgresql'

  // 7. Authentication
  const auth = await promptConfirm({
    message: 'Include admin authentication?',
    initial: true,
  })

  // 8. Languages (if multilingual selected)
  let languages = ['ko', 'en']
  if (features.includes('multilingual')) {
    const langChoices = LANGUAGES.map((lang) => ({
      name: lang.code,
      message: `${lang.name} (${lang.code})`,
    }))

    languages = await promptMultiSelect({
      message: 'Select languages to support:',
      choices: langChoices,
      initial: ['ko', 'en'],
    })
  }

  return {
    name,
    displayName,
    businessType,
    theme,
    features,
    database,
    auth,
    languages,
  }
}

export function printConfig(config: ProjectConfig): void {
  const business = BUSINESS_TYPES[config.businessType]

  console.log('\n📋 Project Configuration:\n')
  console.log(`  Name:          ${config.name}`)
  console.log(`  Display Name:  ${config.displayName}`)
  console.log(`  Business:      ${business.icon} ${business.name}`)
  console.log(`  Theme:         ${THEME_PRESETS[config.theme].name}`)
  console.log(`  Features:      ${config.features.map((f) => FEATURES[f].name).join(', ') || 'None'}`)
  console.log(`  Database:      ${config.database === 'json' ? 'JSON files' : 'PostgreSQL'}`)
  console.log(`  Auth:          ${config.auth ? 'Yes' : 'No'}`)
  console.log(`  Languages:     ${config.languages.join(', ')}`)
  console.log(`  Schemas:       ${business.schemas.join(', ')}`)
  console.log('\n')
}

export async function confirmCreate(): Promise<boolean> {
  return promptConfirm({
    message: 'Create project with these settings?',
    initial: true,
  })
}
