'use client'

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'

/**
 * PDFDownloadButton - Playwright를 사용한 PDF 다운로드 버튼
 *
 * 브라우저 프린트 대신 서버에서 깨끗한 PDF를 생성합니다.
 * 브라우저 확장 프로그램, UI 요소 등의 영향을 받지 않습니다.
 *
 * 사용법:
 * ```tsx
 * <PDFDownloadButton
 *   pageUrl="/postcards/diptych"
 *   filename="diptych-postcard.pdf"
 *   width="12in"
 *   height="4in"
 * >
 *   Download PDF
 * </PDFDownloadButton>
 * ```
 */

interface PDFDownloadButtonProps {
  /** 페이지 경로 (예: '/postcards/diptych') */
  pageUrl: string
  /** 다운로드 파일명 */
  filename: string
  /** PDF 너비 (예: '12in', '8.5in') */
  width: string
  /** PDF 높이 (예: '4in', '8.5in') */
  height: string
  /** 인쇄 모드 (선택) */
  printMode?: 'front' | 'both'
  /** 버튼 내용 */
  children: React.ReactNode
  /** 추가 클래스 */
  className?: string
  /** 비활성화 */
  disabled?: boolean
}

export default function PDFDownloadButton({
  pageUrl,
  filename,
  width,
  height,
  printMode,
  children,
  className = '',
  disabled = false
}: PDFDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    if (disabled || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: pageUrl,
          width,
          height,
          printMode
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'PDF 생성에 실패했습니다')
      }

      // PDF blob 다운로드
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('PDF download error:', err)
      setError(err instanceof Error ? err.message : 'PDF 다운로드 실패')
    } finally {
      setIsLoading(false)
    }
  }

  const defaultClassName = `
    inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm
    transition-all shadow-lg
    ${disabled || isLoading
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-primary text-white hover:bg-primary/90'
    }
  `

  return (
    <div className="relative">
      <button
        onClick={handleDownload}
        disabled={disabled || isLoading}
        className={className || defaultClassName}
        title={isLoading ? 'PDF 생성 중...' : 'PDF 다운로드'}
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            생성 중...
          </>
        ) : (
          <>
            <Download size={16} />
            {children}
          </>
        )}
      </button>
      {error && (
        <p className="absolute top-full left-0 mt-1 text-xs text-red-500 whitespace-nowrap">
          {error}
        </p>
      )}
    </div>
  )
}
