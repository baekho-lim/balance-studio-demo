/**
 * Project Templates Generator
 */

import { ProjectConfig, BUSINESS_TYPES } from './types.js'

export function generatePackageJson(config: ProjectConfig): string {
  const deps: Record<string, string> = {
    'next': '^14.0.0',
    'react': '^18.2.0',
    'react-dom': '^18.2.0',
    'lucide-react': '^0.300.0',
  }

  const devDeps: Record<string, string> = {
    '@types/node': '^20.0.0',
    '@types/react': '^18.2.0',
    '@types/react-dom': '^18.2.0',
    'autoprefixer': '^10.0.0',
    'postcss': '^8.0.0',
    'tailwindcss': '^3.4.0',
    'typescript': '^5.0.0',
  }

  // Add feature-specific dependencies
  if (config.database === 'postgresql') {
    deps['drizzle-orm'] = '^0.29.0'
    deps['postgres'] = '^3.4.0'
    devDeps['drizzle-kit'] = '^0.20.0'
  }

  if (config.auth) {
    deps['next-auth'] = '^5.0.0-beta.4'
    deps['@auth/drizzle-adapter'] = '^0.3.0'
  }

  if (config.features.includes('blog')) {
    deps['react-markdown'] = '^9.0.0'
    deps['gray-matter'] = '^4.0.3'
  }

  if (config.features.includes('newsletter')) {
    deps['resend'] = '^2.0.0'
  }

  return JSON.stringify({
    name: config.name,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
      ...(config.database === 'postgresql' ? {
        'db:push': 'drizzle-kit push:pg',
        'db:studio': 'drizzle-kit studio',
      } : {}),
    },
    dependencies: deps,
    devDependencies: devDeps,
  }, null, 2)
}

export function generateTailwindConfig(config: ProjectConfig): string {
  return `import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        'primary-dark': 'var(--color-primary-dark)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
      },
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
      },
    },
  },
  plugins: [],
}

export default config
`
}

export function generateEnvExample(config: ProjectConfig): string {
  const lines: string[] = [
    '# Site Configuration',
    `NEXT_PUBLIC_SITE_NAME="${config.displayName}"`,
    'NEXT_PUBLIC_SITE_URL="http://localhost:3000"',
    '',
  ]

  if (config.database === 'postgresql') {
    lines.push('# Database')
    lines.push('DATABASE_URL="postgresql://user:password@localhost:5432/dbname"')
    lines.push('')
  }

  if (config.auth) {
    lines.push('# Authentication')
    lines.push('AUTH_SECRET="your-secret-key-here"')
    lines.push('ADMIN_PASSWORD="your-admin-password"')
    lines.push('')
  }

  if (config.features.includes('newsletter')) {
    lines.push('# Email (Resend)')
    lines.push('RESEND_API_KEY="re_xxxxxxxxxxxx"')
    lines.push('')
  }

  return lines.join('\n')
}

export function generateLayoutTsx(config: ProjectConfig): string {
  const business = BUSINESS_TYPES[config.businessType]

  return `import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
})

export const metadata: Metadata = {
  title: '${config.displayName}',
  description: '${business.description}',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="${config.languages[0] || 'ko'}">
      <body className={\`\${inter.variable} \${poppins.variable} font-body antialiased\`}>
        {children}
      </body>
    </html>
  )
}
`
}

export function generateHomePage(config: ProjectConfig): string {
  const business = BUSINESS_TYPES[config.businessType]

  return `export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-6xl mb-4">${business.icon}</div>
          <h1 className="text-5xl font-heading font-bold mb-6">
            ${config.displayName}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            ${business.description}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-12">
            Welcome
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This is your new ${business.name} website, built with the Agency Platform.
            Start customizing by editing the files in the src directory.
          </p>
        </div>
      </section>
    </main>
  )
}
`
}

export function generateGlobalsCss(config: ProjectConfig): string {
  // Theme-specific CSS variables
  const themeVars: Record<string, Record<string, string>> = {
    minimal: {
      primary: '#18181b',
      primaryLight: '#3f3f46',
      primaryDark: '#09090b',
      secondary: '#f4f4f5',
      accent: '#3b82f6',
    },
    bold: {
      primary: '#dc2626',
      primaryLight: '#ef4444',
      primaryDark: '#b91c1c',
      secondary: '#fef2f2',
      accent: '#facc15',
    },
    elegant: {
      primary: '#1e3a5f',
      primaryLight: '#2d4a6f',
      primaryDark: '#0f2a4f',
      secondary: '#f8f9fa',
      accent: '#c9a962',
    },
    wellness: {
      primary: '#6366f1',
      primaryLight: '#818cf8',
      primaryDark: '#4f46e5',
      secondary: '#f8fafc',
      accent: '#ec4899',
    },
  }

  const vars = themeVars[config.theme]

  return `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: ${vars.primary};
  --color-primary-light: ${vars.primaryLight};
  --color-primary-dark: ${vars.primaryDark};
  --color-secondary: ${vars.secondary};
  --color-accent: ${vars.accent};

  --font-heading: 'Poppins', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
}

body {
  color: #1e293b;
  background-color: #ffffff;
}
`
}

export function generateConfigJson(config: ProjectConfig): string {
  const business = BUSINESS_TYPES[config.businessType]

  return JSON.stringify({
    site: {
      name: config.displayName,
      description: business.description,
      locale: config.languages[0] || 'ko',
      supportedLocales: config.languages,
    },
    theme: {
      preset: config.theme,
    },
    features: {
      blog: config.features.includes('blog'),
      booking: config.features.includes('booking'),
      ecommerce: config.features.includes('ecommerce'),
      multilingual: config.features.includes('multilingual'),
      analytics: config.features.includes('analytics'),
      newsletter: config.features.includes('newsletter'),
    },
    seo: {
      schemas: business.schemas,
    },
    navigation: {
      main: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        ...(config.features.includes('blog') ? [{ name: 'Blog', href: '/blog' }] : []),
        { name: 'Contact', href: '/contact' },
      ],
    },
  }, null, 2)
}

export function generateReadme(config: ProjectConfig): string {
  const business = BUSINESS_TYPES[config.businessType]

  return `# ${config.displayName}

${business.icon} ${business.name} website built with Agency Platform.

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view your site.

## Configuration

- **Theme**: ${config.theme}
- **Features**: ${config.features.join(', ') || 'None'}
- **Database**: ${config.database}
- **Languages**: ${config.languages.join(', ')}

## Project Structure

\`\`\`
src/
├── app/           # Next.js App Router pages
├── components/    # React components
├── data/          # JSON data files
├── lib/           # Utilities and helpers
└── types/         # TypeScript types
\`\`\`

## SEO

Pre-configured Schema.org types:
${business.schemas.map((s) => `- ${s}`).join('\n')}

## Deployment

Deploy to Vercel:

\`\`\`bash
npx vercel
\`\`\`

---

Built with [Agency Platform](https://github.com/agency-platform)
`
}
