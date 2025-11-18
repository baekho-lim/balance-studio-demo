# 📄 Catalog Print Styles

Professional Print CSS module for generating high-quality PDF catalogs directly from web pages using browser's native `window.print()` functionality.

## 🎯 Overview

This module provides battle-tested Print CSS optimized for:
- Exhibition catalogs
- Art portfolios
- Photo books
- Professional documentation

**Key Features:**
- ✅ **8.5" x 8.5" square format** with bleed zones
- ✅ **Professional typography** (10pt body, proper heading hierarchy)
- ✅ **Tailwind CSS overrides** for print-specific sizing
- ✅ **Next.js Image optimization** support
- ✅ **Multi-page layouts** with page break control
- ✅ **Print color accuracy** (CMYK-ready)
- ✅ **Completely free** - no external services required

## 📦 Installation

1. Copy the `CatalogPrintStyles.tsx` file to your project:
```bash
cp src/components/print/CatalogPrintStyles.tsx YOUR_PROJECT/components/print/
```

2. Import and use in your page:
```tsx
import CatalogPrintStyles from '@/components/print/CatalogPrintStyles'

export default function MyPage() {
  return (
    <>
      <CatalogPrintStyles />
      <YourContent />
    </>
  )
}
```

3. Add a print button:
```tsx
<button onClick={() => window.print()}>
  Print / PDF
</button>
```

## 🚀 Usage

### Basic Example
```tsx
import CatalogPrintStyles from '@/components/print/CatalogPrintStyles'

export default function CatalogPage() {
  return (
    <div>
      <CatalogPrintStyles />

      {/* Cover Page */}
      <section className="h-screen cover-page">
        <h1>My Catalog</h1>
      </section>

      {/* Content Pages */}
      <section className="page-break-after">
        <h2>Page 1</h2>
        <p>Content here...</p>
      </section>
    </div>
  )
}
```

### With Next.js Images
```tsx
<section>
  <Image
    src="/image.jpg"
    alt="Artwork"
    fill
    priority  // Important for print!
    className="object-contain"
  />
</section>
```

### Page Layouts

#### Portrait Layout (60/40)
```tsx
<div className="grid md:grid-cols-[60%_40%] gap-8">
  <div>{/* Image */}</div>
  <div>{/* Text */}</div>
</div>
```

#### Landscape Layout (2-column text)
```tsx
<div className="landscape-text-columns">
  <p>Your text will automatically flow into 2 columns</p>
</div>
```

#### Overview Page (Diptych/Triptych)
```tsx
<section className="overview-page">
  <div className="grid grid-cols-2 gap-2">
    {/* Two images side-by-side */}
  </div>
</section>
```

## 📐 Specifications

### Page Format
- **Size**: 8.5" x 8.5" (square)
- **Bleed**: 0.125" (3mm) on all sides
- **Safe Zone**: 0.5" margins
- **Page Break**: Automatic per `<section>`

### Typography Scale
| Element | Size | Usage |
|---------|------|-------|
| `h1` | 36pt | Cover titles |
| `h2` | 24pt | Section titles |
| `h3` | 18pt | Artwork titles |
| `h4` | 14pt | Subtitles |
| Body | 10pt | Main text |
| `.text-sm` | 9pt | Metadata |
| `.text-xs` | 8pt | Fine print |

### Special Classes

#### Page Control
- `.page-break-after` - Force new page after element
- `.cover-page` - Full bleed cover (no padding)
- `.overview-page` - Multi-image overview layout

#### Layout
- `.landscape-text-columns` - 2-column justified text
- `.grid-cols-[60%_40%]` - Portrait 60/40 layout

#### Screen-only
- `.print:hidden` - Hide in PDF (buttons, nav, etc.)

## 🎨 Customization

### Change Page Size
Edit line 42 in `CatalogPrintStyles.tsx`:
```css
@page {
  size: 11in 8.5in;  /* Letter landscape */
}
```

### Adjust Typography
Edit lines 149-212 to change font sizes:
```css
h1 {
  font-size: 48pt !important;  /* Larger titles */
}
```

### Modify Layouts
Edit lines 295-333 for grid layouts:
```css
.md\\:grid-cols-\\[60\\%_40\\%\\] {
  grid-template-columns: 70% 30% !important;  /* Different ratio */
}
```

## 🔧 Troubleshooting

### Images Not Showing
**Problem**: Blank boxes instead of images in PDF

**Solution**: Add `priority` prop to all `<Image>` components
```tsx
<Image priority />
```

### Text Too Large/Small
**Problem**: Typography doesn't match screen

**Solution**: This is normal! Print CSS uses `pt` units (physical) vs `px` (screen). Check actual PDF output, not browser preview.

### Page Breaks in Wrong Places
**Problem**: Content split across pages

**Solution**: Ensure each logical page is wrapped in `<section>`:
```tsx
<section className="page-break-after">
  {/* All content for one page */}
</section>
```

### Colors Look Faded
**Problem**: Colors don't print accurately

**Solution**: Already handled! The module includes:
```css
-webkit-print-color-adjust: exact;
print-color-adjust: exact;
```

## 🌐 Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| **Chrome** | ✅ Excellent | Recommended |
| **Safari** | ✅ Good | Some minor spacing differences |
| **Firefox** | ⚠️ Fair | May need margin adjustments |
| **Edge** | ✅ Good | Based on Chromium |

**Recommendation**: Always use Chrome for final PDF generation.

## 📊 Real-World Performance

**From "Utopia = Reality" Exhibition Catalog:**
- **Pages**: 17
- **Images**: 11 high-res artworks
- **Generation Time**: < 5 seconds
- **File Size**: ~15MB (high quality)
- **Cost**: $0 (completely free)

## 🆚 Comparison with Alternatives

| Solution | Cost | Quality | Flexibility | Setup |
|----------|------|---------|-------------|-------|
| **This Module** | Free | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 5 min |
| Puppeteer | Pro plan | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 2-4 hrs |
| @react-pdf/renderer | Free | ⭐⭐⭐⭐ | ⭐⭐⭐ | 1-2 days |
| InDesign | $$$$ | ⭐⭐⭐⭐⭐ | ⭐⭐ | Manual |

## 🤝 Contributing

Found a bug? Have an improvement?

1. **Issues**: Report at [your-repo/issues]
2. **PRs**: Welcome! Please include before/after PDFs
3. **Questions**: Open a discussion

## 📝 License

MIT License - Free to use in any project, commercial or personal.

## 🙏 Credits

Developed for **Lim Hyejung's "Utopia = Reality" Exhibition**
- Artist: Lim Hyejung (임혜정)
- Gallery: Ahlfah! Collective, Seoul
- Developer: [Your Name]

## 📚 Learn More

- [MDN: @page](https://developer.mozilla.org/en-US/docs/Web/CSS/@page)
- [CSS Paged Media](https://www.w3.org/TR/css-page-3/)
- [Print CSS Best Practices](https://www.smashingmagazine.com/2015/01/designing-for-print-with-css/)

---

**Made with ❤️ for artists and designers who want professional PDFs without subscription fees.**
