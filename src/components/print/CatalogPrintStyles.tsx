/**
 * CatalogPrintStyles - Professional Print CSS for Exhibition Catalogs
 *
 * @description Optimized for 8.5" x 8.5" square format with professional typography
 * @author Lim Hyejung Portfolio Project
 * @version 1.0.0
 *
 * Features:
 * - Square catalog format (8.5" x 8.5") with bleed
 * - Professional typography scale (10pt body, proper heading hierarchy)
 * - Tailwind CSS override for print
 * - Next.js Image optimization support
 * - Multi-page layout support (cover, overview, detail pages)
 * - Page break control
 * - Print color accuracy (CMYK-ready)
 *
 * Usage:
 * ```tsx
 * import CatalogPrintStyles from '@/components/print/CatalogPrintStyles'
 *
 * function MyPage() {
 *   return (
 *     <>
 *       <CatalogPrintStyles />
 *       <YourContent />
 *     </>
 *   )
 * }
 * ```
 */

export default function CatalogPrintStyles() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        @media print {
          /* Page Setup - Square format with bleed */
          @page {
            size: 8.75in 8.75in;  /* Trim (8.5") + Bleed (0.125" each side) */
            margin: 0;
            marks: crop cross;    /* Crop marks and registration marks */
          }

          /* Remove browser default headers and footers */
          @page {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }

          /* Hide all non-content elements */
          header, footer, nav {
            display: none !important;
          }

          /* Body Setup - Bleed zone */
          body {
            margin: 0.125in;       /* 3mm bleed on all sides */
            font-size: 10pt;       /* Professional catalog standard */
            line-height: 1.4;      /* Optimal for justified text */
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            color-adjust: exact;
          }

          /* Safe Zone - Content area */
          section {
            position: relative !important;      /* For absolute positioning of page numbers */
            height: 8.5in !important;           /* Fixed page height */
            max-height: 8.5in !important;       /* Prevent overflow */
            padding: 0.5in !important;          /* Slightly more padding for safer margins */
            padding-bottom: 1in !important;     /* Extra bottom padding for page numbers */
            page-break-inside: avoid !important; /* Never break section across pages */
            page-break-after: always !important; /* Always start new page after section */
            break-inside: avoid !important;
            break-after: page !important;
            overflow: hidden !important;         /* Clip content that doesn't fit */
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important; /* Start from top to prevent clipping */
            box-sizing: border-box !important;
          }

          /* Typography - Professional catalog scale */
          /* Base heading tags (fallback) */
          h1 {
            font-size: 36pt !important;
            line-height: 1.2 !important;
            margin-bottom: 0.3em !important;
          }

          h2 {
            font-size: 24pt !important;
            line-height: 1.25 !important;
            margin-bottom: 0.4em !important;
          }

          h3 {
            font-size: 18pt !important;
            line-height: 1.3 !important;
            margin-bottom: 0.3em !important;
          }

          h4 {
            font-size: 14pt !important;
            line-height: 1.35 !important;
            margin-bottom: 0.25em !important;
          }

          /* Override Tailwind classes for print */
          .text-6xl {
            font-size: 36pt !important;    /* Cover title */
          }

          .text-5xl {
            font-size: 36pt !important;    /* Cover title */
          }

          .text-4xl {
            font-size: 28pt !important;
          }

          .text-3xl {
            font-size: 24pt !important;    /* Section titles */
          }

          .text-2xl {
            font-size: 18pt !important;    /* Artwork titles */
          }

          .text-xl {
            font-size: 14pt !important;    /* Overview titles, subtitles */
          }

          .text-lg {
            font-size: 11pt !important;
          }

          .text-base {
            font-size: 10pt !important;    /* Body text */
          }

          .text-sm {
            font-size: 9pt !important;     /* Metadata, captions */
          }

          .text-xs {
            font-size: 8pt !important;     /* Fine print */
          }

          /* Max-width overrides for print - Professional text measure */
          .max-w-3xl,
          .max-w-2xl,
          .max-w-xl {
            max-width: 550px !important;   /* ~6.5in optimal reading width */
          }

          /* Portrait layout - Exact 60/40 split with 0.8cm gap */
          .grid-cols-\\[60\\%_40\\%\\] {
            grid-template-columns: 3fr 2fr !important;  /* Exact 60:40 ratio */
          }

          .grid-cols-\\[60\\%_40\\%\\].gap-8 {
            gap: 0.8cm !important;
          }

          /* Overview pages - Professional gap spacing */
          .overview-page .grid-cols-2.gap-2 {
            gap: 0.6cm !important;   /* Diptych gap */
          }

          .overview-page .grid-cols-3.gap-2 {
            gap: 0.4cm !important;   /* Triptych gap */
          }

          /* Page numbers - Solid color for print reproduction */
          .text-secondary\\/50 {
            opacity: 1 !important;
            color: #666666 !important;  /* Solid medium gray */
          }

          /* Force image visibility in print */
          img {
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            object-fit: contain !important;
          }

          /* Next.js Image wrapper fixes */
          span[style*="box-sizing: border-box"],
          span[style*="display: inline-block"] {
            display: block !important;
            position: relative !important;
          }

          /* Ensure aspect-ratio containers work in print */
          div[style*="aspectRatio"],
          div[style*="aspect-ratio"] {
            position: relative !important;
            width: 100% !important;
          }

          /* Force relative positioning for image containers */
          .relative {
            position: relative !important;
          }

          /* Page Breaks */
          .page-break-after {
            page-break-after: always;
            break-after: page;
          }

          h2, h3, h4 {
            page-break-after: avoid;
            break-after: avoid;
          }

          img {
            page-break-inside: avoid;
            break-inside: avoid;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }

          /* Layout Optimizations for Square Format */

          /* Portrait Layout - 58/42 split for better balance */
          .md\\:grid-cols-\\[60\\%_40\\%\\] {
            grid-template-columns: 58% 42% !important;
            gap: 0.5cm !important;  /* Reduced from 0.8cm for tighter layout */
          }

          /* Landscape Layout - 2 column text */
          .md\\:grid-cols-2 {
            gap: 0.7cm !important;  /* Reduced from 1cm */
          }

          /* Diptych Layout */
          .grid-cols-2 {
            gap: 0.4cm !important;  /* Reduced from 0.6cm */
          }

          /* Triptych Layout - Images */
          .grid-cols-3 {
            gap: 0.25cm !important;  /* Compact for image grid */
          }

          /* Landscape Layout - 2 Column Text */
          .landscape-text-columns {
            column-count: 2 !important;
            column-gap: 1cm !important;
            text-align: justify !important;
          }

          /* Overview Pages - Maximize image space */
          .overview-page {
            padding: 0.3in !important;
            padding-bottom: 0.6in !important;
          }

          /* Cover Page - Full bleed image */
          .cover-page {
            padding: 0 !important;
            margin: 0 !important;
          }

          /* Text Spacing */
          p {
            orphans: 3;
            widows: 3;
            margin-bottom: 0.45em;  /* Balanced paragraph spacing */
          }

          /* Reduce spacing for all elements */
          * {
            margin-top: 0;
          }

          .max-w-3xl > * + * {
            margin-top: 0.5em !important;  /* Consistent vertical rhythm */
          }

          /* Triptych Sequential Layout Spacing */
          .space-y-4 > * + * {
            margin-top: 0.4cm !important;  /* Optimal spacing for triptych text blocks */
          }

          /* Hide screen-only elements */
          .print\\:hidden {
            display: none !important;
          }

          /* Ensure full color reproduction */
          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            color-adjust: exact;
          }
        }

        /* Screen Preview Mode - Simulates print layout */
        @media screen and (min-width: 1024px) {
          .print-preview {
            max-width: 8.5in;
            margin: 2rem auto;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }
        }
      `
    }} />
  )
}
