'use client'

import { useEffect, useState } from 'react'

/**
 * PrintWatermark - Displays a watermark overlay when printing without authentication
 *
 * This component adds a subtle watermark to printed pages for non-authenticated users.
 * It checks localStorage for authentication status and conditionally renders.
 *
 * Usage:
 * ```tsx
 * <PrintWatermark />
 * ```
 *
 * The watermark only appears:
 * - During print (@media print)
 * - When user is NOT authenticated (localStorage check)
 */
export default function PrintWatermark() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authStatus = localStorage.getItem('admin_authenticated')
    setIsAuthenticated(authStatus === 'true')
  }, [])

  // Don't render watermark for authenticated users
  if (isAuthenticated) {
    return null
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            .print-watermark {
              display: block !important;
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 120pt;
              font-weight: bold;
              color: rgba(200, 200, 200, 0.15);
              z-index: 9999;
              pointer-events: none;
              user-select: none;
              white-space: nowrap;
            }

            .print-watermark-footer {
              display: block !important;
              position: fixed;
              bottom: 0.5in;
              left: 0;
              right: 0;
              text-align: center;
              font-size: 10pt;
              color: rgba(150, 150, 150, 0.6);
              z-index: 9999;
              pointer-events: none;
              user-select: none;
            }
          }

          @media screen {
            .print-watermark,
            .print-watermark-footer {
              display: none !important;
            }
          }
        `
      }} />

      <div className="print-watermark">
        PREVIEW ONLY
      </div>

      <div className="print-watermark-footer">
        For official PDF download, please contact via Instagram: @limhyejung_artworks
      </div>
    </>
  )
}
