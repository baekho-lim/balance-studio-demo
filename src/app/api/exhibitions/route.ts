import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Exhibition } from '@/types'

const dataFilePath = path.join(process.cwd(), 'src/data/exhibitions.json')

// GET: 전시 목록 조회
export async function GET() {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8')
    const exhibitions = JSON.parse(fileContent)
    return NextResponse.json(exhibitions)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read exhibitions' }, { status: 500 })
  }
}

// POST: 새 전시 추가
export async function POST(request: NextRequest) {
  try {
    const newExhibition: Exhibition = await request.json()

    // 기존 데이터 읽기
    const fileContent = await fs.readFile(dataFilePath, 'utf-8')
    const exhibitions: Exhibition[] = JSON.parse(fileContent)

    // ID 중복 체크
    if (exhibitions.find(e => e.id === newExhibition.id)) {
      return NextResponse.json({ error: 'Exhibition ID already exists' }, { status: 400 })
    }

    // 새 전시 추가 (맨 앞에)
    exhibitions.unshift(newExhibition)

    // 파일 저장
    await fs.writeFile(dataFilePath, JSON.stringify(exhibitions, null, 2) + '\n', 'utf-8')

    return NextResponse.json({ success: true, exhibition: newExhibition })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add exhibition' }, { status: 500 })
  }
}

// PUT: 전시 수정
export async function PUT(request: NextRequest) {
  try {
    const updatedExhibition: Exhibition = await request.json()

    // 기존 데이터 읽기
    const fileContent = await fs.readFile(dataFilePath, 'utf-8')
    const exhibitions: Exhibition[] = JSON.parse(fileContent)

    // 해당 전시 찾기
    const index = exhibitions.findIndex(e => e.id === updatedExhibition.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Exhibition not found' }, { status: 404 })
    }

    // 업데이트
    exhibitions[index] = updatedExhibition

    // 파일 저장
    await fs.writeFile(dataFilePath, JSON.stringify(exhibitions, null, 2) + '\n', 'utf-8')

    return NextResponse.json({ success: true, exhibition: updatedExhibition })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update exhibition' }, { status: 500 })
  }
}

// DELETE: 전시 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()

    // 기존 데이터 읽기
    const fileContent = await fs.readFile(dataFilePath, 'utf-8')
    const exhibitions: Exhibition[] = JSON.parse(fileContent)

    // 해당 전시 찾기
    const index = exhibitions.findIndex(e => e.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Exhibition not found' }, { status: 404 })
    }

    // 삭제
    exhibitions.splice(index, 1)

    // 파일 저장
    await fs.writeFile(dataFilePath, JSON.stringify(exhibitions, null, 2) + '\n', 'utf-8')

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete exhibition' }, { status: 500 })
  }
}
