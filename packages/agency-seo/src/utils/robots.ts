/**
 * Robots.txt generator
 */

export interface RobotsUserAgent {
  userAgent: string
  allow?: string[]
  disallow?: string[]
  crawlDelay?: number
}

export interface RobotsConfig {
  userAgents: RobotsUserAgent[]
  sitemaps?: string[]
  host?: string
}

/**
 * Default robots.txt configuration for agency sites
 * Allows all crawlers including AI bots
 */
export const defaultRobotsConfig: RobotsConfig = {
  userAgents: [
    {
      userAgent: '*',
      allow: ['/'],
      disallow: [
        '/admin/*',
        '/api/*',
        '/_next/*',
        '/private/*'
      ]
    },
    // Explicitly allow AI crawlers
    {
      userAgent: 'GPTBot',
      allow: ['/']
    },
    {
      userAgent: 'ChatGPT-User',
      allow: ['/']
    },
    {
      userAgent: 'Google-Extended',
      allow: ['/']
    },
    {
      userAgent: 'Anthropic-ai',
      allow: ['/']
    },
    {
      userAgent: 'Claude-Web',
      allow: ['/']
    },
    {
      userAgent: 'CCBot',
      allow: ['/']
    },
    {
      userAgent: 'PerplexityBot',
      allow: ['/']
    }
  ],
  sitemaps: ['/sitemap.xml']
}

/**
 * Generate robots.txt content from config
 */
export function generateRobotsTxt(config: RobotsConfig): string {
  const lines: string[] = []

  // Process each user agent
  for (const agent of config.userAgents) {
    lines.push(`User-agent: ${agent.userAgent}`)

    if (agent.allow) {
      for (const path of agent.allow) {
        lines.push(`Allow: ${path}`)
      }
    }

    if (agent.disallow) {
      for (const path of agent.disallow) {
        lines.push(`Disallow: ${path}`)
      }
    }

    if (agent.crawlDelay) {
      lines.push(`Crawl-delay: ${agent.crawlDelay}`)
    }

    lines.push('') // Empty line between agents
  }

  // Add sitemaps
  if (config.sitemaps) {
    for (const sitemap of config.sitemaps) {
      // If sitemap is relative, note it will need the full URL later
      lines.push(`Sitemap: ${sitemap}`)
    }
    lines.push('')
  }

  // Add host if specified
  if (config.host) {
    lines.push(`Host: ${config.host}`)
  }

  return lines.join('\n')
}

/**
 * Generate robots.txt with full URLs for sitemaps
 */
export function generateRobotsTxtWithHost(
  config: RobotsConfig,
  siteUrl: string
): string {
  const configWithFullUrls: RobotsConfig = {
    ...config,
    sitemaps: config.sitemaps?.map(sitemap =>
      sitemap.startsWith('http') ? sitemap : `${siteUrl}${sitemap}`
    )
  }

  return generateRobotsTxt(configWithFullUrls)
}

/**
 * Merge robots configs (later configs override earlier)
 */
export function mergeRobotsConfigs(...configs: Partial<RobotsConfig>[]): RobotsConfig {
  const result: RobotsConfig = {
    userAgents: [],
    sitemaps: []
  }

  for (const config of configs) {
    if (config.userAgents) {
      // Merge by user agent name
      for (const agent of config.userAgents) {
        const existingIndex = result.userAgents.findIndex(
          a => a.userAgent === agent.userAgent
        )
        if (existingIndex >= 0) {
          result.userAgents[existingIndex] = {
            ...result.userAgents[existingIndex],
            ...agent,
            allow: [...(result.userAgents[existingIndex].allow || []), ...(agent.allow || [])],
            disallow: [...(result.userAgents[existingIndex].disallow || []), ...(agent.disallow || [])]
          }
        } else {
          result.userAgents.push(agent)
        }
      }
    }

    if (config.sitemaps) {
      result.sitemaps = Array.from(new Set([...(result.sitemaps || []), ...config.sitemaps]))
    }

    if (config.host) {
      result.host = config.host
    }
  }

  return result
}
