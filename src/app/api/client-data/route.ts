import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const file = searchParams.get('file') || 'config'

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing slug parameter' },
        { status: 400 }
      )
    }

    // Sanitize slug to prevent directory traversal
    const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '')
    const sanitizedFile = file.replace(/[^a-zA-Z0-9-_]/g, '')

    const clientDataDir = path.join(process.cwd(), 'src/data/clients', sanitizedSlug)
    const filePath = path.join(clientDataDir, `${sanitizedFile}.json`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    return NextResponse.json(data)
  } catch (error) {
    console.error('Client data fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch client data' },
      { status: 500 }
    )
  }
}
