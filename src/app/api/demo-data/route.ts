import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const template = searchParams.get('template')
    const file = searchParams.get('file')

    if (!template || !file) {
      return NextResponse.json(
        { error: 'Missing template or file parameter' },
        { status: 400 }
      )
    }

    // Sanitize inputs to prevent directory traversal
    const sanitizedTemplate = template.replace(/[^a-zA-Z0-9-_]/g, '')
    const sanitizedFile = file.replace(/[^a-zA-Z0-9-_]/g, '')

    const filePath = path.join(
      process.cwd(),
      'src/data/demo',
      `${sanitizedTemplate}-${sanitizedFile}.json`
    )

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    return NextResponse.json(data)
  } catch (error) {
    console.error('Demo data fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch demo data' },
      { status: 500 }
    )
  }
}
