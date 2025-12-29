import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const INQUIRIES_FILE = path.join(process.cwd(), 'src/data/inquiries.json')

export interface Inquiry {
  id: string
  status: 'pending' | 'reviewing' | 'generating' | 'completed' | 'rejected'
  customer: {
    name: string
    email: string
    phone: string
    company: string
  }
  template: string
  businessInfo: {
    type: string
    location: string
    targetCustomer: string
  }
  planDocument: string
  additionalNotes: string
  budget: string
  timeline: string
  generatedSite?: {
    id: string
    url: string
    createdAt: string
  }
  createdAt: string
  updatedAt: string
}

function readInquiries(): Inquiry[] {
  try {
    const data = fs.readFileSync(INQUIRIES_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeInquiries(inquiries: Inquiry[]): void {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2))
}

function generateId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 6)
  return `inq-${timestamp}-${random}`
}

// GET: List all inquiries
export async function GET() {
  try {
    const inquiries = readInquiries()
    return NextResponse.json(inquiries)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}

// POST: Create new inquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.company) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, company' },
        { status: 400 }
      )
    }

    const inquiries = readInquiries()
    const now = new Date().toISOString()

    const newInquiry: Inquiry = {
      id: generateId(),
      status: 'pending',
      customer: {
        name: body.name,
        email: body.email,
        phone: body.phone || '',
        company: body.company,
      },
      template: body.template || 'custom',
      businessInfo: {
        type: body.businessType || '',
        location: body.location || '',
        targetCustomer: body.targetCustomer || '',
      },
      planDocument: body.planDocument || '',
      additionalNotes: body.additionalNotes || '',
      budget: body.budget || '',
      timeline: body.timeline || '',
      createdAt: now,
      updatedAt: now,
    }

    inquiries.unshift(newInquiry) // Add to beginning
    writeInquiries(inquiries)

    return NextResponse.json(newInquiry, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create inquiry' },
      { status: 500 }
    )
  }
}

// PUT: Update inquiry status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, generatedSite } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Missing inquiry ID' },
        { status: 400 }
      )
    }

    const inquiries = readInquiries()
    const index = inquiries.findIndex(inq => inq.id === id)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      )
    }

    // Update fields
    if (status) {
      inquiries[index].status = status
    }
    if (generatedSite) {
      inquiries[index].generatedSite = generatedSite
    }
    inquiries[index].updatedAt = new Date().toISOString()

    writeInquiries(inquiries)

    return NextResponse.json(inquiries[index])
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update inquiry' },
      { status: 500 }
    )
  }
}

// DELETE: Delete inquiry
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Missing inquiry ID' },
        { status: 400 }
      )
    }

    const inquiries = readInquiries()
    const filteredInquiries = inquiries.filter(inq => inq.id !== id)

    if (filteredInquiries.length === inquiries.length) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      )
    }

    writeInquiries(filteredInquiries)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete inquiry' },
      { status: 500 }
    )
  }
}
