import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { NewsArticle } from '@/types'

const dataFilePath = path.join(process.cwd(), 'src/data/news.json')

// GET: 뉴스 목록 조회
export async function GET() {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8')
    const news = JSON.parse(fileContent)
    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read news' }, { status: 500 })
  }
}

// POST: 새 뉴스 추가
export async function POST(request: NextRequest) {
  try {
    const newArticle: NewsArticle = await request.json()

    // 기존 데이터 읽기
    const fileContent = await fs.readFile(dataFilePath, 'utf-8')
    const news: NewsArticle[] = JSON.parse(fileContent)

    // Slug 중복 체크
    if (news.find(n => n.slug === newArticle.slug)) {
      return NextResponse.json({ error: 'News slug already exists' }, { status: 400 })
    }

    // 새 뉴스 추가 (맨 앞에)
    news.unshift(newArticle)

    // 파일 저장
    await fs.writeFile(dataFilePath, JSON.stringify(news, null, 2) + '\n', 'utf-8')

    return NextResponse.json({ success: true, article: newArticle })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add news' }, { status: 500 })
  }
}

// PUT: 뉴스 수정
export async function PUT(request: NextRequest) {
  try {
    const updatedArticle: NewsArticle = await request.json()

    // 기존 데이터 읽기
    const fileContent = await fs.readFile(dataFilePath, 'utf-8')
    const news: NewsArticle[] = JSON.parse(fileContent)

    // 해당 뉴스 찾기
    const index = news.findIndex(n => n.slug === updatedArticle.slug)
    if (index === -1) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 })
    }

    // 업데이트
    news[index] = updatedArticle

    // 파일 저장
    await fs.writeFile(dataFilePath, JSON.stringify(news, null, 2) + '\n', 'utf-8')

    return NextResponse.json({ success: true, article: updatedArticle })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 })
  }
}

// DELETE: 뉴스 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { slug } = await request.json()

    // 기존 데이터 읽기
    const fileContent = await fs.readFile(dataFilePath, 'utf-8')
    const news: NewsArticle[] = JSON.parse(fileContent)

    // 해당 뉴스 찾기
    const index = news.findIndex(n => n.slug === slug)
    if (index === -1) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 })
    }

    // 삭제
    news.splice(index, 1)

    // 파일 저장
    await fs.writeFile(dataFilePath, JSON.stringify(news, null, 2) + '\n', 'utf-8')

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 })
  }
}
