'use client'

import { X, AlertCircle, CheckCircle, Clock } from 'lucide-react'

type ModalType = 'approval' | 'success' | 'warning'

interface CommerceModalProps {
  isOpen: boolean
  onClose: () => void
  type?: ModalType
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

const typeConfig: Record<ModalType, { icon: React.ReactNode; color: string; bgColor: string }> = {
  approval: {
    icon: <Clock className="w-6 h-6" />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100'
  },
  success: {
    icon: <CheckCircle className="w-6 h-6" />,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  warning: {
    icon: <AlertCircle className="w-6 h-6" />,
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  }
}

export default function CommerceModal({
  isOpen,
  onClose,
  type = 'approval',
  title,
  message,
  actionLabel,
  onAction
}: CommerceModalProps) {
  if (!isOpen) return null

  const config = typeConfig[type]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="p-6">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-full ${config.bgColor} ${config.color} flex items-center justify-center mx-auto mb-4`}>
            {config.icon}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
            {title}
          </h3>

          {/* Message */}
          <p className="text-gray-600 text-center text-sm mb-6">
            {message}
          </p>

          {/* HITL Badge */}
          {type === 'approval' && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
              <div className="flex items-center gap-2 text-amber-800 text-sm">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>
                  <strong>HITL (Human-in-the-Loop)</strong>: 이 작업은 프로덕션 환경에서 관리자 승인이 필요합니다.
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              닫기
            </button>
            {actionLabel && onAction && (
              <button
                onClick={() => {
                  onAction()
                  onClose()
                }}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {actionLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
