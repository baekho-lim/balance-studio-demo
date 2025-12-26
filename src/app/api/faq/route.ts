import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

interface FAQItem {
  id: string
  question: {
    ko: string
    en: string
    vi?: string
  }
  answer: {
    ko: string
    en: string
    vi?: string
  }
  order: number
  exhibitionLink?: string
}

const dataFilePath = path.join(process.cwd(), 'src/data/faq.json')

// GET: FAQ 목록 조회
export async function GET() {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8')
    const faqs = JSON.parse(fileContent)
    return NextResponse.json(faqs)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read FAQs' }, { status: 500 })
  }
}

// PUT: FAQ 전체 업데이트
export async function PUT(request: NextRequest) {
  try {
    const faqs: FAQItem[] = await request.json()

    // Validate
    if (!Array.isArray(faqs)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })
    }

    // Clean up empty vi fields
    const cleanedFaqs = faqs.map(faq => ({
      ...faq,
      question: {
        ko: faq.question.ko,
        en: faq.question.en,
        ...(faq.question.vi ? { vi: faq.question.vi } : {})
      },
      answer: {
        ko: faq.answer.ko,
        en: faq.answer.en,
        ...(faq.answer.vi ? { vi: faq.answer.vi } : {})
      },
      ...(faq.exhibitionLink ? { exhibitionLink: faq.exhibitionLink } : {})
    }))

    // 파일 저장
    await fs.writeFile(dataFilePath, JSON.stringify(cleanedFaqs, null, 2) + '\n', 'utf-8')

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save FAQs' }, { status: 500 })
  }
}
