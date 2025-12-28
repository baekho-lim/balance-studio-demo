/**
 * Project Generator
 */

import fs from 'fs-extra'
import path from 'path'
import { ProjectConfig } from './types.js'
import {
  generatePackageJson,
  generateTailwindConfig,
  generateEnvExample,
  generateLayoutTsx,
  generateHomePage,
  generateGlobalsCss,
  generateConfigJson,
  generateReadme,
} from './templates.js'

interface GeneratorResult {
  success: boolean
  projectPath: string
  error?: string
}

export async function generateProject(
  config: ProjectConfig,
  targetDir: string
): Promise<GeneratorResult> {
  const projectPath = path.join(targetDir, config.name)

  try {
    // Check if directory exists
    if (await fs.pathExists(projectPath)) {
      return {
        success: false,
        projectPath,
        error: `Directory ${config.name} already exists`,
      }
    }

    // Create project structure
    await fs.ensureDir(projectPath)
    await fs.ensureDir(path.join(projectPath, 'src', 'app'))
    await fs.ensureDir(path.join(projectPath, 'src', 'components'))
    await fs.ensureDir(path.join(projectPath, 'src', 'data'))
    await fs.ensureDir(path.join(projectPath, 'src', 'lib'))
    await fs.ensureDir(path.join(projectPath, 'src', 'types'))
    await fs.ensureDir(path.join(projectPath, 'public', 'images'))

    // Generate and write files
    const files: Array<{ path: string; content: string }> = [
      // Root files
      { path: 'package.json', content: generatePackageJson(config) },
      { path: 'tailwind.config.ts', content: generateTailwindConfig(config) },
      { path: '.env.example', content: generateEnvExample(config) },
      { path: '.env.local', content: generateEnvExample(config) },
      { path: 'README.md', content: generateReadme(config) },

      // Next.js config
      { path: 'next.config.js', content: generateNextConfig() },
      { path: 'tsconfig.json', content: generateTsConfig() },
      { path: 'postcss.config.js', content: generatePostCssConfig() },

      // App files
      { path: 'src/app/layout.tsx', content: generateLayoutTsx(config) },
      { path: 'src/app/page.tsx', content: generateHomePage(config) },
      { path: 'src/app/globals.css', content: generateGlobalsCss(config) },

      // Config
      { path: 'src/data/config.json', content: generateConfigJson(config) },

      // Types
      { path: 'src/types/index.ts', content: generateTypesIndex() },

      // Git
      { path: '.gitignore', content: generateGitignore() },
    ]

    // Add feature-specific files
    if (config.features.includes('blog')) {
      files.push(
        { path: 'src/app/blog/page.tsx', content: generateBlogListPage() },
        { path: 'src/data/blog.json', content: '[]' }
      )
    }

    if (config.auth) {
      files.push(
        { path: 'src/app/admin/page.tsx', content: generateAdminPage() },
        { path: 'src/app/api/auth/[...nextauth]/route.ts', content: generateAuthRoute() }
      )
    }

    // Write all files
    for (const file of files) {
      const filePath = path.join(projectPath, file.path)
      await fs.ensureDir(path.dirname(filePath))
      await fs.writeFile(filePath, file.content, 'utf-8')
    }

    return { success: true, projectPath }
  } catch (error) {
    return {
      success: false,
      projectPath,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

function generateNextConfig(): string {
  return `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
`
}

function generateTsConfig(): string {
  return JSON.stringify({
    compilerOptions: {
      target: 'es5',
      lib: ['dom', 'dom.iterable', 'esnext'],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: 'esnext',
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: 'preserve',
      incremental: true,
      plugins: [{ name: 'next' }],
      paths: {
        '@/*': ['./src/*'],
      },
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules'],
  }, null, 2)
}

function generatePostCssConfig(): string {
  return `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`
}

function generateTypesIndex(): string {
  return `// Common types for the project

export interface MultilingualText {
  ko?: string
  en?: string
  [key: string]: string | undefined
}

export interface ImageAsset {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
}
`
}

function generateGitignore(): string {
  return `# Dependencies
node_modules
.pnpm-store

# Next.js
.next
out

# Environment
.env
.env.local
.env.*.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.idea
.vscode
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
`
}

function generateBlogListPage(): string {
  return `import Link from 'next/link'

export default function BlogPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-8">
          Blog
        </h1>
        <p className="text-gray-600">
          No posts yet. Start writing by adding posts to src/data/blog.json
        </p>
      </div>
    </main>
  )
}
`
}

function generateAdminPage(): string {
  return `export default function AdminPage() {
  return (
    <main className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Welcome to the admin dashboard. Configure authentication in your .env.local file.
          </p>
        </div>
      </div>
    </main>
  )
}
`
}

function generateAuthRoute(): string {
  return `import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Admin',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials?.password === process.env.ADMIN_PASSWORD) {
          return { id: '1', name: 'Admin' }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
})

export { handler as GET, handler as POST }
`
}
