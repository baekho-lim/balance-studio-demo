import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const SITES_REGISTRY_PATH = path.join(process.cwd(), 'src/data/generated-sites.json')

interface GeneratedSite {
  id: string
  slug: string
  inquiryId: string
  createdAt: string
  url: string
}

function readSitesRegistry(): GeneratedSite[] {
  try {
    const data = fs.readFileSync(SITES_REGISTRY_PATH, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeSitesRegistry(sites: GeneratedSite[]): void {
  fs.writeFileSync(SITES_REGISTRY_PATH, JSON.stringify(sites, null, 2))
}

// GET: List all generated sites
export async function GET() {
  try {
    const sites = readSitesRegistry()
    return NextResponse.json(sites)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sites' },
      { status: 500 }
    )
  }
}

// DELETE: Delete a generated site
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing slug parameter' },
        { status: 400 }
      )
    }

    // Sanitize slug
    const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '')

    // Remove from registry
    const sites = readSitesRegistry()
    const filteredSites = sites.filter(s => s.slug !== sanitizedSlug)

    if (filteredSites.length === sites.length) {
      return NextResponse.json(
        { error: 'Site not found' },
        { status: 404 }
      )
    }

    writeSitesRegistry(filteredSites)

    // Delete the client data directory
    const clientDataDir = path.join(process.cwd(), 'src/data/clients', sanitizedSlug)
    if (fs.existsSync(clientDataDir)) {
      fs.rmSync(clientDataDir, { recursive: true, force: true })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete site error:', error)
    return NextResponse.json(
      { error: 'Failed to delete site' },
      { status: 500 }
    )
  }
}
