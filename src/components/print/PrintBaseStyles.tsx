'use client'

/**
 * PrintBaseStyles - 모든 인쇄 페이지에서 공유하는 기본 CSS
 *
 * 기능:
 * - 숨겨야 할 요소 목록 중앙 관리
 * - 색상 정확도 설정
 * - 브라우저 UI 요소, 확장 프로그램 아이콘 등 숨김
 *
 * 사용법:
 * ```tsx
 * import PrintBaseStyles from '@/components/print/PrintBaseStyles'
 *
 * export default function PrintablePage() {
 *   return (
 *     <>
 *       <PrintBaseStyles />
 *       {/* 페이지 콘텐츠 * /}
 *     </>
 *   )
 * }
 * ```
 */

const printBaseCSS = `
@media print {
  /* 색상 정확도 - 배경색, 이미지 등이 정확히 출력되도록 */
  body {
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ========================================
   * 공통 숨김 요소
   * 인쇄 시 보이지 않아야 하는 모든 요소
   * ======================================== */

  /* Tailwind print:hidden 클래스 */
  .print\\:hidden,
  [class*="print:hidden"],

  /* AuthGuard 로그아웃 버튼 */
  button[title="Logout"],

  /* Next.js 개발 인디케이터 */
  [data-nextjs-dialog],
  [data-nextjs-dialog-overlay],
  nextjs-portal,
  #__next-build-indicator,
  #__next-prerender-indicator,
  [class*="nextjs-"],
  [id*="__next"] > div:first-child:empty,

  /* 고정 위치 UI 요소 (컨트롤 버튼 등) */
  .fixed.top-4.left-4,
  .fixed.top-4.right-4,
  .fixed.bottom-4.left-4,
  .fixed.bottom-4.right-4,

  /* 인쇄 워터마크 (인증된 사용자용) */
  .print-watermark,
  .print-watermark-footer,

  /* 브라우저 확장 프로그램, RSS 아이콘 등 */
  [style*="position: fixed"],
  [style*="position:fixed"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }

  /* main 외부 요소 모두 숨김 (Header, Footer 등) */
  body > *:not(main) {
    display: none !important;
  }

  /* ========================================
   * 기본 페이지 설정
   * ======================================== */

  /* 페이지 내부 여백 제거 */
  .postcard-wrapper,
  .catalog-page,
  .print-page {
    page-break-inside: avoid;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* 그림자 제거 */
  .shadow-lg,
  .shadow-xl,
  .shadow-2xl {
    box-shadow: none !important;
  }
}
`

export default function PrintBaseStyles() {
  return (
    <style dangerouslySetInnerHTML={{ __html: printBaseCSS }} />
  )
}
