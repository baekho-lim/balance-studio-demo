import { NextRequest, NextResponse } from 'next/server'

/**
 * PDF Generation API
 *
 * Playwright를 사용하여 페이지를 PDF로 변환합니다.
 * 브라우저 프린트 대신 서버에서 깨끗한 PDF를 생성합니다.
 *
 * POST /api/generate-pdf
 * Body: {
 *   url: string,           // 페이지 경로 (예: '/postcards/diptych')
 *   width: string,         // PDF 너비 (예: '12in')
 *   height: string,        // PDF 높이 (예: '4in')
 *   printMode?: string     // 'front' | 'both' (선택)
 * }
 *
 * Response: PDF blob
 */

interface PDFGenerationRequest {
  url: string
  width: string
  height: string
  printMode?: 'front' | 'both'
}

export async function POST(request: NextRequest) {
  try {
    const body: PDFGenerationRequest = await request.json()
    const { url, width, height, printMode } = body

    if (!url || !width || !height) {
      return NextResponse.json(
        { error: 'Missing required fields: url, width, height' },
        { status: 400 }
      )
    }

    // Playwright는 서버 환경에서만 사용 가능
    // Dynamic import to avoid bundling issues
    const { chromium } = await import('playwright')

    const browser = await chromium.launch({
      headless: true
    })

    const context = await browser.newContext()
    const page = await context.newPage()

    // 전체 URL 생성
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    let fullUrl = `${baseUrl}${url}`

    // printMode 쿼리 파라미터 추가 (필요시)
    if (printMode) {
      fullUrl += `?printMode=${printMode}`
    }

    // 페이지 로드
    await page.goto(fullUrl, { waitUntil: 'networkidle' })

    // localStorage에 인증 설정 (워터마크 제거용)
    await page.evaluate(() => {
      localStorage.setItem('admin_authenticated', 'true')
      localStorage.setItem('admin_auth_timestamp', Date.now().toString())
    })

    // 페이지 새로고침하여 인증 적용
    await page.reload({ waitUntil: 'networkidle' })

    // 이미지 로딩 대기
    await page.waitForTimeout(2000)

    // printMode가 있으면 해당 버튼 클릭
    if (printMode === 'both') {
      try {
        await page.click('button:has-text("앞+뒤")', { timeout: 3000 })
        await page.waitForTimeout(500)
      } catch {
        // 버튼이 없으면 무시
      }
    }

    // PDF 생성
    const pdf = await page.pdf({
      width,
      height,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    })

    await browser.close()

    // PDF 반환 (Buffer를 Uint8Array로 변환)
    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="print-${Date.now()}.pdf"`
      }
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: String(error) },
      { status: 500 }
    )
  }
}
