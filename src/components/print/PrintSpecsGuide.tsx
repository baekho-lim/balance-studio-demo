'use client'

import { useState } from 'react'
import { Info, X } from 'lucide-react'

interface PrintSpecsGuideProps {
  type: 'postcard' | 'catalog' | 'diptych'
}

export default function PrintSpecsGuide({ type }: PrintSpecsGuideProps) {
  const [isOpen, setIsOpen] = useState(false)

  const specs = {
    postcard: {
      title: 'Postcard Print Specifications',
      titleKr: '포스트카드 인쇄 사양',
      sizes: [
        { label: '4×6 inch', pixels: '1800×1200px @ 300dpi' },
        { label: '5×7 inch', pixels: '2100×1500px @ 300dpi' },
        { label: '7×5 inch', pixels: '1500×2100px @ 300dpi' },
      ],
    },
    diptych: {
      title: 'Diptych Print Specifications',
      titleKr: 'Diptych 인쇄 사양',
      sizes: [
        { label: '4×12 inch (combined)', pixels: '3600×1200px @ 300dpi' },
        { label: '4×6 inch (each panel)', pixels: '1800×1200px @ 300dpi' },
      ],
    },
    catalog: {
      title: 'Catalog Print Specifications',
      titleKr: '카탈로그 인쇄 사양',
      sizes: [
        { label: '8.5×8.5 inch (trim)', pixels: '2550×2550px @ 300dpi' },
        { label: '8.75×8.75 inch (with bleed)', pixels: '2625×2625px @ 300dpi' },
      ],
    },
  }

  const currentSpecs = specs[type]

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
        title="Print specifications"
      >
        <Info size={14} />
        <span>Print Specs</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-serif text-lg">{currentSpecs.title}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <p className="text-sm text-gray-600">{currentSpecs.titleKr}</p>

              {/* Size specifications */}
              <div>
                <h4 className="font-medium text-sm mb-2">Dimensions / 크기</h4>
                <div className="space-y-2">
                  {currentSpecs.sizes.map((size, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm bg-gray-50 p-2 rounded"
                    >
                      <span>{size.label}</span>
                      <span className="text-gray-500 font-mono text-xs">
                        {size.pixels}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color profile */}
              <div>
                <h4 className="font-medium text-sm mb-2">
                  Color Profile / 색상 프로파일
                </h4>
                <div className="bg-amber-50 border border-amber-200 rounded p-3 text-sm">
                  <p className="font-medium text-amber-800">sRGB</p>
                  <p className="text-amber-700 text-xs mt-1">
                    Print shops will convert to CMYK.
                    <br />
                    인쇄소에서 CMYK로 변환합니다.
                  </p>
                </div>
              </div>

              {/* File format */}
              <div>
                <h4 className="font-medium text-sm mb-2">
                  File Format / 파일 형식
                </h4>
                <p className="text-sm text-gray-600">
                  JPEG (Original quality / 원본 품질)
                </p>
              </div>

              {/* Bleed info for catalog */}
              {type === 'catalog' && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Bleed / 도련</h4>
                  <p className="text-sm text-gray-600">
                    0.125 inch (3mm) on all sides
                    <br />
                    사방 3mm
                  </p>
                </div>
              )}

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <h4 className="font-medium text-sm text-blue-800 mb-1">
                  Tips / 팁
                </h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>
                    • Use Chrome browser for best PDF results
                    <br />
                    <span className="text-blue-600">
                      Chrome 브라우저 권장
                    </span>
                  </li>
                  <li>
                    • Enable background graphics when printing
                    <br />
                    <span className="text-blue-600">
                      인쇄 시 배경 그래픽 활성화
                    </span>
                  </li>
                  <li>
                    • Set margins to none
                    <br />
                    <span className="text-blue-600">여백 없음으로 설정</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                Close / 닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
