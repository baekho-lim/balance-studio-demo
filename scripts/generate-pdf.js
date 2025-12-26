#!/usr/bin/env node

/**
 * PDF Generation CLI Script
 *
 * Playwright를 사용하여 페이지를 PDF로 변환하는 CLI 도구입니다.
 *
 * 사용법:
 *   node scripts/generate-pdf.js --url /postcards/diptych --output diptych.pdf --size 12x4
 *   node scripts/generate-pdf.js --url /catalog --output catalog.pdf --size 8.75x8.75
 *   node scripts/generate-pdf.js --url /postcards/diptych --output diptych-both.pdf --size 12x4 --mode both
 *
 * Options:
 *   --url, -u      페이지 경로 (필수)
 *   --output, -o   출력 파일명 (기본: output.pdf)
 *   --size, -s     페이지 크기 WxH (기본: 8.5x11)
 *   --mode, -m     인쇄 모드 front|both (선택)
 *   --port, -p     개발 서버 포트 (기본: 3000)
 *   --help, -h     도움말
 */

const { chromium } = require('playwright')
const path = require('path')
const fs = require('fs')

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2)
  const options = {
    url: null,
    output: 'output.pdf',
    size: '8.5x11',
    mode: 'front',
    port: 3000
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    const next = args[i + 1]

    switch (arg) {
      case '--url':
      case '-u':
        options.url = next
        i++
        break
      case '--output':
      case '-o':
        options.output = next
        i++
        break
      case '--size':
      case '-s':
        options.size = next
        i++
        break
      case '--mode':
      case '-m':
        options.mode = next
        i++
        break
      case '--port':
      case '-p':
        options.port = parseInt(next, 10)
        i++
        break
      case '--help':
      case '-h':
        printHelp()
        process.exit(0)
    }
  }

  return options
}

function printHelp() {
  console.log(`
PDF Generation CLI Script

사용법:
  node scripts/generate-pdf.js --url <path> [options]

Options:
  --url, -u      페이지 경로 (필수, 예: /postcards/diptych)
  --output, -o   출력 파일명 (기본: output.pdf)
  --size, -s     페이지 크기 WxH 인치 (기본: 8.5x11)
  --mode, -m     인쇄 모드 front|both (기본: front)
  --port, -p     개발 서버 포트 (기본: 3000)
  --help, -h     도움말

예시:
  # Diptych 포스트카드 (앞면만)
  node scripts/generate-pdf.js -u /postcards/diptych -o diptych.pdf -s 12x4

  # Diptych 포스트카드 (앞+뒤)
  node scripts/generate-pdf.js -u /postcards/diptych -o diptych-both.pdf -s 12x4 -m both

  # 카탈로그
  node scripts/generate-pdf.js -u /catalog -o catalog.pdf -s 8.75x8.75
`)
}

async function generatePDF(options) {
  const { url, output, size, mode, port } = options

  if (!url) {
    console.error('Error: --url is required')
    printHelp()
    process.exit(1)
  }

  // Parse size
  const [widthStr, heightStr] = size.split('x')
  const width = `${widthStr}in`
  const height = `${heightStr}in`

  console.log(`\n🖨️  PDF Generation Started`)
  console.log(`   URL: ${url}`)
  console.log(`   Size: ${width} × ${height}`)
  console.log(`   Mode: ${mode}`)
  console.log(`   Output: ${output}\n`)

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  try {
    // 페이지 로드
    const fullUrl = `http://localhost:${port}${url}`
    console.log(`📄 Loading page: ${fullUrl}`)
    await page.goto(fullUrl, { waitUntil: 'networkidle' })

    // 인증 설정
    await page.evaluate(() => {
      localStorage.setItem('admin_authenticated', 'true')
      localStorage.setItem('admin_auth_timestamp', Date.now().toString())
    })

    // 페이지 새로고침
    await page.reload({ waitUntil: 'networkidle' })
    console.log('🔐 Authentication applied')

    // 이미지 로딩 대기
    await page.waitForTimeout(2000)
    console.log('🖼️  Images loaded')

    // printMode가 both면 버튼 클릭
    if (mode === 'both') {
      try {
        await page.click('button:has-text("앞+뒤")', { timeout: 3000 })
        await page.waitForTimeout(500)
        console.log('📃 Print mode set to: both sides')
      } catch {
        console.log('⚠️  Print mode button not found, using default')
      }
    }

    // PDF 생성
    const outputPath = path.resolve(process.cwd(), output)
    await page.pdf({
      path: outputPath,
      width,
      height,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    })

    const stats = fs.statSync(outputPath)
    const sizeKB = (stats.size / 1024).toFixed(1)

    console.log(`\n✅ PDF Generated Successfully!`)
    console.log(`   File: ${outputPath}`)
    console.log(`   Size: ${sizeKB} KB\n`)
  } catch (error) {
    console.error('\n❌ PDF Generation Failed:', error.message)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

// Run
const options = parseArgs()
generatePDF(options)
