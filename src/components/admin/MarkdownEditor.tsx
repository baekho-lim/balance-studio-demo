'use client'

import { useState, useCallback } from 'react'
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image,
  Code,
  Quote,
  Eye,
  Edit,
  Maximize2,
  Minimize2,
  LucideIcon
} from 'lucide-react'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
}

interface ToolbarButton {
  icon: LucideIcon
  action: () => void
  title: string
}

interface ToolbarDivider {
  type: 'divider'
}

type ToolbarItem = ToolbarButton | ToolbarDivider

// Simple Markdown to HTML converter
function markdownToHtml(md: string): string {
  let html = md
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
    // Bold & Italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-4" />')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto"><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-red-600 px-1 rounded">$1</code>')
    // Blockquotes
    .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600">$1</blockquote>')
    // Unordered lists
    .replace(/^\* (.*$)/gm, '<li class="ml-4">$1</li>')
    .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 list-decimal">$1</li>')
    // Paragraphs (simple)
    .replace(/\n\n/g, '</p><p class="my-4">')
    // Line breaks
    .replace(/\n/g, '<br />')

  // Wrap lists
  html = html.replace(/(<li.*<\/li>)/g, '<ul class="list-disc ml-4 my-2">$1</ul>')

  return `<div class="prose max-w-none"><p class="my-4">${html}</p></div>`
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = '마크다운으로 글을 작성하세요...',
  minHeight = '400px'
}: MarkdownEditorProps) {
  const [mode, setMode] = useState<'edit' | 'preview' | 'split'>('split')
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Insert text at cursor position
  const insertText = useCallback((before: string, after: string = '', placeholder: string = '') => {
    const textarea = document.querySelector('textarea[data-markdown-editor]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + (selectedText || placeholder) + after + value.substring(end)

    onChange(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + (selectedText || placeholder).length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }, [value, onChange])

  const toolbarButtons: ToolbarItem[] = [
    { icon: Bold, action: () => insertText('**', '**', '굵은 텍스트'), title: '굵게 (Ctrl+B)' },
    { icon: Italic, action: () => insertText('*', '*', '기울임 텍스트'), title: '기울임 (Ctrl+I)' },
    { type: 'divider' },
    { icon: Heading1, action: () => insertText('\n# ', '\n', '제목'), title: '제목 1' },
    { icon: Heading2, action: () => insertText('\n## ', '\n', '제목'), title: '제목 2' },
    { icon: Heading3, action: () => insertText('\n### ', '\n', '제목'), title: '제목 3' },
    { type: 'divider' },
    { icon: List, action: () => insertText('\n- ', '\n', '목록 항목'), title: '글머리 기호' },
    { icon: ListOrdered, action: () => insertText('\n1. ', '\n', '목록 항목'), title: '번호 매기기' },
    { type: 'divider' },
    { icon: LinkIcon, action: () => insertText('[', '](url)', '링크 텍스트'), title: '링크' },
    { icon: Image, action: () => insertText('![', '](이미지 URL)', '대체 텍스트'), title: '이미지' },
    { icon: Code, action: () => insertText('```\n', '\n```', '코드'), title: '코드 블록' },
    { icon: Quote, action: () => insertText('\n> ', '\n', '인용문'), title: '인용' },
  ]

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault()
          insertText('**', '**', '굵은 텍스트')
          break
        case 'i':
          e.preventDefault()
          insertText('*', '*', '기울임 텍스트')
          break
        case 'k':
          e.preventDefault()
          insertText('[', '](url)', '링크 텍스트')
          break
      }
    }
  }

  const containerClass = isFullscreen
    ? 'fixed inset-0 z-50 bg-white flex flex-col'
    : 'border border-gray-300 rounded-lg overflow-hidden flex flex-col'

  return (
    <div className={containerClass}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-2 py-1 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-1">
          {toolbarButtons.map((btn, idx) => {
            if ('type' in btn) {
              return <div key={idx} className="w-px h-6 bg-gray-300 mx-1" />
            }
            const toolbarBtn = btn as ToolbarButton
            const Icon = toolbarBtn.icon
            return (
              <button
                key={idx}
                onClick={toolbarBtn.action}
                title={toolbarBtn.title}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
              >
                <Icon className="w-4 h-4 text-gray-600" />
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setMode('edit')}
            className={`p-2 rounded transition-colors ${mode === 'edit' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
            title="편집만"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMode('split')}
            className={`p-2 rounded transition-colors ${mode === 'split' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
            title="분할 보기"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMode('preview')}
            className={`p-2 rounded transition-colors ${mode === 'preview' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
            title="미리보기만"
          >
            <Eye className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title={isFullscreen ? '전체 화면 종료' : '전체 화면'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Editor / Preview Area */}
      <div
        className="flex-1 flex"
        style={{ minHeight: isFullscreen ? 'calc(100vh - 50px)' : minHeight }}
      >
        {/* Editor */}
        {(mode === 'edit' || mode === 'split') && (
          <div className={`flex-1 ${mode === 'split' ? 'border-r border-gray-200' : ''}`}>
            <textarea
              data-markdown-editor
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full h-full p-4 resize-none focus:outline-none font-mono text-sm"
              style={{ minHeight: isFullscreen ? 'calc(100vh - 50px)' : minHeight }}
            />
          </div>
        )}

        {/* Preview */}
        {(mode === 'preview' || mode === 'split') && (
          <div
            className={`flex-1 p-4 overflow-auto bg-gray-50 ${mode === 'split' ? '' : ''}`}
            style={{ minHeight: isFullscreen ? 'calc(100vh - 50px)' : minHeight }}
          >
            {value ? (
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(value) }}
              />
            ) : (
              <p className="text-gray-400 italic">미리보기가 여기에 표시됩니다...</p>
            )}
          </div>
        )}
      </div>

      {/* Word count */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
        {value.length} 자 | {value.split(/\s+/).filter(Boolean).length} 단어 |
        약 {Math.max(1, Math.ceil(value.split(/\s+/).filter(Boolean).length / 200))}분 읽기
      </div>
    </div>
  )
}
