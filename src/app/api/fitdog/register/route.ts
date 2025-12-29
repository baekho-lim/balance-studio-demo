import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface Registration {
  id: string
  contact: string
  dogName?: string
  dogSize?: string
  createdAt: string
}

const registrationsPath = path.join(process.cwd(), 'src/data/demo/fitdog-registrations.json')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { contact, dogName, dogSize } = body

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact is required' },
        { status: 400 }
      )
    }

    // Read existing registrations
    let registrations: Registration[] = []
    try {
      const data = fs.readFileSync(registrationsPath, 'utf-8')
      registrations = JSON.parse(data)
    } catch {
      // File doesn't exist or is empty
      registrations = []
    }

    // Create new registration
    const newRegistration: Registration = {
      id: `reg-${Date.now()}`,
      contact,
      dogName: dogName || undefined,
      dogSize: dogSize || undefined,
      createdAt: new Date().toISOString(),
    }

    registrations.push(newRegistration)

    // Save updated registrations
    fs.writeFileSync(registrationsPath, JSON.stringify(registrations, null, 2))

    return NextResponse.json({
      success: true,
      registration: newRegistration,
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to register' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const data = fs.readFileSync(registrationsPath, 'utf-8')
    const registrations = JSON.parse(data)
    return NextResponse.json(registrations)
  } catch {
    return NextResponse.json([])
  }
}
