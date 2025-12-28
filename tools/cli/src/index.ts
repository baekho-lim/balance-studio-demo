#!/usr/bin/env node

/**
 * create-agency-site CLI
 *
 * Scaffolds a new website for various business types
 * using the Agency Platform framework.
 */

import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import { getProjectConfig, printConfig, confirmCreate } from './prompts.js'
import { generateProject } from './generator.js'

const program = new Command()

// ASCII Art Banner
function printBanner(): void {
  console.log(chalk.cyan(`
   ___                           ___ _       _    __
  / _ \\                         / _ \\ |     | |  / _|
 / /_\\ \\ __ _  ___ _ __   ___ / /_| |  __ _| |_| |_ ___  _ __ _ __ ___
 |  _  |/ _\` |/ _ \\ '_ \\ / __/ / _\` | / _\` | __|  _/ _ \\| '__| '_ \` _ \\
 | | | | (_| |  __/ | | | (__/ / (_| || (_| | |_| || (_) | |  | | | | | |
 \\_| |_/\\__, |\\___|_| |_|\\___/  \\__,_| \\__,_|\\__|_| \\___/|_|  |_| |_| |_|
         __/ |                      _/ |
        |___/                      |__/
`))
  console.log(chalk.gray('  Create professional websites for any business type\n'))
}

program
  .name('create-agency-site')
  .description('Create a new Agency Platform website')
  .version('1.0.0')
  .argument('[project-name]', 'Project name (optional, will prompt if not provided)')
  .option('-t, --type <type>', 'Business type (pilates, restaurant, ecommerce, artist, government, education)')
  .option('--theme <theme>', 'Theme preset (minimal, bold, elegant, wellness)')
  .option('-y, --yes', 'Skip confirmation prompts')
  .action(async (projectName, options) => {
    printBanner()

    try {
      // Get configuration interactively
      const config = await getProjectConfig()

      // Override with CLI options if provided
      if (projectName) {
        config.name = projectName
      }

      // Print configuration summary
      printConfig(config)

      // Confirm creation
      if (!options.yes) {
        const confirmed = await confirmCreate()
        if (!confirmed) {
          console.log(chalk.yellow('\n  Cancelled.\n'))
          process.exit(0)
        }
      }

      // Generate project
      const spinner = ora('Creating project...').start()

      const result = await generateProject(config, process.cwd())

      if (result.success) {
        spinner.succeed(chalk.green('Project created successfully!'))

        console.log(chalk.cyan('\n  Next steps:\n'))
        console.log(chalk.white(`    cd ${config.name}`))
        console.log(chalk.white('    npm install'))
        console.log(chalk.white('    npm run dev\n'))

        console.log(chalk.gray('  Happy coding! 🚀\n'))
      } else {
        spinner.fail(chalk.red('Failed to create project'))
        console.log(chalk.red(`\n  Error: ${result.error}\n`))
        process.exit(1)
      }
    } catch (error) {
      console.error(chalk.red('\n  Error:'), error)
      process.exit(1)
    }
  })

// Parse arguments
program.parse()
