'use client'

/**
 * PostcardPrintStyles - 포스트카드 인쇄용 CSS
 *
 * 지원 사이즈:
 * - portrait: 4×6인치 (세로)
 * - landscape: 7×5인치 (가로)
 * - diptych: 12×4인치 (이면화)
 *
 * 사용법:
 * ```tsx
 * import PostcardPrintStyles from '@/components/print/PostcardPrintStyles'
 *
 * export default function PostcardPage() {
 *   return (
 *     <>
 *       <PostcardPrintStyles size="diptych" />
 *       {/* 페이지 콘텐츠 * /}
 *     </>
 *   )
 * }
 * ```
 */

export type PostcardSize = 'portrait' | 'landscape' | 'diptych' | 'custom'

interface PostcardPrintStylesProps {
  size: PostcardSize
  /** 커스텀 사이즈 사용 시 */
  customWidth?: string
  customHeight?: string
  /** 앞뒤 양면 인쇄 모드 */
  bothSides?: boolean
}

const sizeMap: Record<Exclude<PostcardSize, 'custom'>, { width: string; height: string }> = {
  portrait: { width: '4in', height: '6in' },
  landscape: { width: '7in', height: '5in' },
  diptych: { width: '12in', height: '4in' }
}

function generateCSS(
  width: string,
  height: string,
  size: PostcardSize,
  bothSides: boolean
): string {
  return `
@media print {
  /* 페이지 사이즈 설정 */
  @page {
    size: ${width} ${height};
    margin: 0;
  }

  /* 인쇄 컨테이너 */
  .print-container {
    width: ${width} !important;
    height: ${height} !important;
    margin: 0 !important;
    padding: 0 !important;
    display: flex !important;
  }

  /* 이미지 래퍼 (diptych용 - 절반 크기) */
  .print-image-wrapper {
    width: ${size === 'diptych' ? '6in' : width} !important;
    height: ${height} !important;
    padding: 0 !important;
    box-sizing: border-box !important;
    flex-shrink: 0;
  }

  .print-image-wrapper > div {
    width: 100% !important;
    height: 100% !important;
  }

  .print-image-wrapper img {
    object-fit: cover !important;
  }

  /* 뒷면 (정보 카드) */
  .print-back {
    width: ${width} !important;
    height: ${height} !important;
    margin: 0 !important;
    padding: 0.3in !important;
    box-sizing: border-box !important;
  }

  /* 페이지 브레이크 제어 */
  .postcard-wrapper {
    page-break-inside: avoid;
    margin: 0 !important;
    padding: 0 !important;
  }

  ${bothSides ? `
  /* 양면 인쇄: 앞면 후 페이지 브레이크 */
  .postcard-wrapper:first-of-type {
    page-break-after: always;
  }

  /* 마지막 페이지는 브레이크 없음 */
  .postcard-wrapper:last-of-type {
    page-break-after: avoid;
  }
  ` : ''}
}
`
}

export default function PostcardPrintStyles({
  size,
  customWidth,
  customHeight,
  bothSides = false
}: PostcardPrintStylesProps) {
  const { width, height } = size === 'custom'
    ? { width: customWidth || '4in', height: customHeight || '6in' }
    : sizeMap[size]

  const css = generateCSS(width, height, size, bothSides)

  return (
    <style dangerouslySetInnerHTML={{ __html: css }} />
  )
}
