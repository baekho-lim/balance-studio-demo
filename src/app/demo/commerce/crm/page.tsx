'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Users,
  MessageSquare,
  Mail,
  Smartphone,
  Check,
  ChevronRight,
  ChevronLeft,
  Clock,
  Send,
  AlertTriangle,
  Eye,
  Calendar,
  X
} from 'lucide-react'
import {
  getCustomers,
  getCustomersBySegment,
  getCustomerById,
  type Customer,
  type RFMScore
} from '@/lib/commerce'

// Types
type CRMCampaignStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'SENT'
type CRMChannel = 'kakao' | 'sms' | 'email'

interface CRMCampaign {
  id: string
  name: string
  target: {
    type: 'segment' | 'customers'
    segmentId?: RFMScore
    customerIds?: string[]
    count: number
  }
  channel: CRMChannel
  templateId: string
  templateContent: string
  schedule: 'now' | string
  status: CRMCampaignStatus
  createdAt: string
}

// Segment options
const SEGMENT_OPTIONS: { id: RFMScore; name: string; color: string; count: number }[] = [
  { id: 'VIP', name: 'VIP', color: '#8B5CF6', count: 0 },
  { id: 'Loyal', name: 'Loyal', color: '#3B82F6', count: 0 },
  { id: 'Regular', name: 'Regular', color: '#10B981', count: 0 },
  { id: 'AtRisk', name: '이탈 위험', color: '#F59E0B', count: 0 },
  { id: 'Dormant', name: '휴면', color: '#EF4444', count: 0 },
]

// Channel options
const CHANNEL_OPTIONS: { id: CRMChannel; name: string; icon: React.ReactNode; description: string }[] = [
  { id: 'kakao', name: '카카오톡', icon: <MessageSquare className="w-6 h-6" />, description: '카카오 알림톡/친구톡' },
  { id: 'sms', name: 'SMS', icon: <Smartphone className="w-6 h-6" />, description: '문자 메시지' },
  { id: 'email', name: '이메일', icon: <Mail className="w-6 h-6" />, description: '이메일 발송' },
]

// Template options
const TEMPLATE_OPTIONS = [
  {
    id: 'welcome',
    name: '환영 메시지',
    content: '{{name}}님, 글로우 뷰티에 오신 것을 환영합니다! 첫 구매 시 15% 할인 쿠폰을 드려요.',
    channels: ['kakao', 'sms', 'email'] as CRMChannel[],
  },
  {
    id: 'winback',
    name: '재방문 유도',
    content: '{{name}}님, 오랜만이에요! {{discount}}% 할인 쿠폰으로 다시 만나요. 쿠폰코드: WELCOME20',
    channels: ['kakao', 'sms', 'email'] as CRMChannel[],
  },
  {
    id: 'vip',
    name: 'VIP 감사',
    content: '{{name}}님, 소중한 VIP 고객님께만 드리는 특별 혜택! 전 상품 {{discount}}% 추가 할인',
    channels: ['kakao', 'email'] as CRMChannel[],
  },
  {
    id: 'newproduct',
    name: '신상품 안내',
    content: '{{name}}님, 새로운 안티에이징 세럼이 출시되었어요! 지금 확인해보세요.',
    channels: ['kakao', 'sms', 'email'] as CRMChannel[],
  },
  {
    id: 'birthday',
    name: '생일 축하',
    content: '{{name}}님, 생일 축하드려요! 생일 선물로 {{discount}}% 할인 쿠폰을 드려요.',
    channels: ['kakao', 'email'] as CRMChannel[],
  },
]

// Mock existing campaigns
const INITIAL_CAMPAIGNS: CRMCampaign[] = [
  {
    id: 'camp-001',
    name: 'VIP 고객 감사 캠페인',
    target: { type: 'segment', segmentId: 'VIP', count: 3 },
    channel: 'kakao',
    templateId: 'vip',
    templateContent: 'VIP 고객님께만 드리는 특별 혜택!',
    schedule: 'now',
    status: 'SENT',
    createdAt: '2024-12-28',
  },
  {
    id: 'camp-002',
    name: '휴면 고객 재활성화',
    target: { type: 'segment', segmentId: 'Dormant', count: 2 },
    channel: 'email',
    templateId: 'winback',
    templateContent: '오랜만이에요! 20% 할인 쿠폰으로 다시 만나요.',
    schedule: '2024-12-30T10:00',
    status: 'PENDING',
    createdAt: '2024-12-29',
  },
]

export default function CRMPage() {
  const searchParams = useSearchParams()
  const customerId = searchParams.get('customerId')

  // Get customers from SSOT
  const allCustomers = getCustomers()

  // Calculate segment counts
  const segmentOptions = useMemo(() => {
    return SEGMENT_OPTIONS.map(seg => ({
      ...seg,
      count: allCustomers.filter(c => c.rfm.score === seg.id).length
    }))
  }, [allCustomers])

  // Wizard state
  const [currentStep, setCurrentStep] = useState(1)
  const [isWizardOpen, setIsWizardOpen] = useState(false)

  // Draft state
  const [targetType, setTargetType] = useState<'segment' | 'customers'>('segment')
  const [selectedSegment, setSelectedSegment] = useState<RFMScore | null>(null)
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([])
  const [selectedChannel, setSelectedChannel] = useState<CRMChannel | null>(null)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const [schedule, setSchedule] = useState<'now' | 'scheduled'>('now')
  const [scheduleDate, setScheduleDate] = useState('')
  const [campaignName, setCampaignName] = useState('')

  // Campaigns list state
  const [campaigns, setCampaigns] = useState<CRMCampaign[]>(INITIAL_CAMPAIGNS)

  // Toast state
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Handle URL query parameter for customerId
  useEffect(() => {
    if (customerId) {
      const customer = getCustomerById(customerId)
      if (customer) {
        setTargetType('customers')
        setSelectedCustomerIds([customerId])
        setIsWizardOpen(true)
      }
    }
  }, [customerId])

  // Get target count
  const getTargetCount = () => {
    if (targetType === 'segment' && selectedSegment) {
      return getCustomersBySegment(selectedSegment).length
    }
    return selectedCustomerIds.length
  }

  // Get selected template
  const selectedTemplate = TEMPLATE_OPTIONS.find(t => t.id === selectedTemplateId)

  // Preview message with variable substitution
  const getPreviewMessage = () => {
    if (!selectedTemplate) return ''
    let message = selectedTemplate.content
    // Get first customer for preview
    const previewCustomer = targetType === 'segment' && selectedSegment
      ? getCustomersBySegment(selectedSegment)[0]
      : selectedCustomerIds.length > 0
        ? getCustomerById(selectedCustomerIds[0])
        : null

    if (previewCustomer) {
      message = message.replace('{{name}}', previewCustomer.name)
    } else {
      message = message.replace('{{name}}', '고객')
    }
    message = message.replace('{{discount}}', '20')
    return message
  }

  // Check if step is valid
  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return (targetType === 'segment' && selectedSegment) || (targetType === 'customers' && selectedCustomerIds.length > 0)
      case 2:
        return selectedChannel && selectedTemplateId
      case 3:
        return schedule === 'now' || (schedule === 'scheduled' && scheduleDate)
      case 4:
        return campaignName.trim().length > 0
      default:
        return false
    }
  }

  // Reset wizard
  const resetWizard = () => {
    setCurrentStep(1)
    setTargetType('segment')
    setSelectedSegment(null)
    setSelectedCustomerIds([])
    setSelectedChannel(null)
    setSelectedTemplateId(null)
    setSchedule('now')
    setScheduleDate('')
    setCampaignName('')
    setIsWizardOpen(false)
  }

  // Submit campaign
  const handleSubmitCampaign = () => {
    const newCampaign: CRMCampaign = {
      id: `camp-${Date.now()}`,
      name: campaignName,
      target: {
        type: targetType,
        segmentId: targetType === 'segment' ? selectedSegment! : undefined,
        customerIds: targetType === 'customers' ? selectedCustomerIds : undefined,
        count: getTargetCount(),
      },
      channel: selectedChannel!,
      templateId: selectedTemplateId!,
      templateContent: getPreviewMessage(),
      schedule: schedule === 'now' ? 'now' : scheduleDate,
      status: 'PENDING',
      createdAt: new Date().toISOString().split('T')[0],
    }

    setCampaigns(prev => [newCampaign, ...prev])
    setToastMessage(`"${campaignName}" 캠페인이 승인 대기 중입니다`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 4000)
    resetWizard()
  }

  // Get status badge
  const getStatusBadge = (status: CRMCampaignStatus) => {
    const styles: Record<CRMCampaignStatus, string> = {
      DRAFT: 'bg-gray-100 text-gray-700',
      PENDING: 'bg-amber-100 text-amber-700',
      APPROVED: 'bg-blue-100 text-blue-700',
      SENT: 'bg-green-100 text-green-700',
    }
    const labels: Record<CRMCampaignStatus, string> = {
      DRAFT: '작성 중',
      PENDING: '승인 대기',
      APPROVED: '승인됨',
      SENT: '발송 완료',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  // Get channel badge
  const getChannelBadge = (channel: CRMChannel) => {
    const labels: Record<CRMChannel, string> = {
      kakao: '카카오톡',
      sms: 'SMS',
      email: '이메일',
    }
    return (
      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
        {labels[channel]}
      </span>
    )
  }

  return (
    <div className="p-8">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-lg flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-600" />
            <div>
              <p className="font-medium text-amber-800">승인 대기</p>
              <p className="text-sm text-amber-600">{toastMessage}</p>
            </div>
            <button onClick={() => setShowToast(false)} className="text-amber-400 hover:text-amber-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Prototype Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          <strong>⚠️ Prototype:</strong> 이 페이지는 프로토타입입니다.
          실제 메시지 발송 기능은 구현되어 있지 않습니다.
        </p>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">CRM 캠페인 빌더</h1>
          <p className="text-gray-600">세그먼트 기반 마케팅 캠페인을 생성하고 관리하세요</p>
        </div>
        <button
          onClick={() => setIsWizardOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Send className="w-4 h-4" />
          새 캠페인 만들기
        </button>
      </div>

      {/* Wizard Modal */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={resetWizard} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Wizard Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">새 캠페인 만들기</h2>
                <button onClick={resetWizard} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step < currentStep ? 'bg-blue-600 text-white' :
                      step === currentStep ? 'bg-blue-600 text-white' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {step < currentStep ? <Check className="w-4 h-4" /> : step}
                    </div>
                    {step < 4 && (
                      <div className={`w-12 h-1 mx-1 ${
                        step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>타겟 선택</span>
                <span>채널 + 템플릿</span>
                <span>미리보기</span>
                <span>승인 요청</span>
              </div>
            </div>

            {/* Wizard Content */}
            <div className="p-6">
              {/* Step 1: Target Selection */}
              {currentStep === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">타겟 선택</h3>

                  {/* Target Type Toggle */}
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => {
                        setTargetType('segment')
                        setSelectedCustomerIds([])
                      }}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                        targetType === 'segment'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Users className="w-5 h-5 inline mr-2" />
                      세그먼트 선택
                    </button>
                    <button
                      onClick={() => {
                        setTargetType('customers')
                        setSelectedSegment(null)
                      }}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                        targetType === 'customers'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Users className="w-5 h-5 inline mr-2" />
                      개별 고객 선택
                    </button>
                  </div>

                  {/* Segment Selection */}
                  {targetType === 'segment' && (
                    <div className="grid grid-cols-2 gap-3">
                      {segmentOptions.map((seg) => (
                        <button
                          key={seg.id}
                          onClick={() => setSelectedSegment(seg.id)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            selectedSegment === seg.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${seg.color}20` }}
                            >
                              <Users className="w-5 h-5" style={{ color: seg.color }} />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{seg.name}</p>
                              <p className="text-sm text-gray-500">{seg.count}명</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Customer Selection */}
                  {targetType === 'customers' && (
                    <div className="border border-gray-200 rounded-lg max-h-[300px] overflow-y-auto">
                      {allCustomers.map((customer) => (
                        <label
                          key={customer.id}
                          className={`flex items-center gap-3 p-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 ${
                            selectedCustomerIds.includes(customer.id) ? 'bg-blue-50' : ''
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedCustomerIds.includes(customer.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCustomerIds(prev => [...prev, customer.id])
                              } else {
                                setSelectedCustomerIds(prev => prev.filter(id => id !== customer.id))
                              }
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{customer.name}</p>
                            <p className="text-xs text-gray-500">{customer.email}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            customer.rfm.score === 'VIP' ? 'bg-purple-100 text-purple-700' :
                            customer.rfm.score === 'Loyal' ? 'bg-blue-100 text-blue-700' :
                            customer.rfm.score === 'AtRisk' ? 'bg-amber-100 text-amber-700' :
                            customer.rfm.score === 'Dormant' ? 'bg-red-100 text-red-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {customer.rfm.score}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Target Summary */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      선택된 타겟: <strong className="text-gray-900">{getTargetCount()}명</strong>
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Channel + Template */}
              {currentStep === 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">채널 선택</h3>

                  {/* Channel Selection */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {CHANNEL_OPTIONS.map((ch) => (
                      <button
                        key={ch.id}
                        onClick={() => setSelectedChannel(ch.id)}
                        className={`p-4 rounded-lg border-2 text-center transition-all ${
                          selectedChannel === ch.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-center mb-2 text-gray-600">
                          {ch.icon}
                        </div>
                        <p className="font-semibold text-gray-900">{ch.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{ch.description}</p>
                      </button>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">템플릿 선택</h3>

                  {/* Template Selection */}
                  <div className="space-y-3">
                    {TEMPLATE_OPTIONS.filter(t => !selectedChannel || t.channels.includes(selectedChannel)).map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplateId(template.id)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          selectedTemplateId === template.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className="font-semibold text-gray-900">{template.name}</p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{template.content}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Preview */}
              {currentStep === 3 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">미리보기</h3>

                  {/* Message Preview */}
                  <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">메시지 미리보기</span>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-gray-900">{getPreviewMessage()}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      * {`{{name}}`}, {`{{discount}}`} 등의 변수는 실제 발송 시 고객 정보로 치환됩니다.
                    </p>
                  </div>

                  {/* Send Summary */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-blue-600">발송 대상</p>
                        <p className="text-lg font-bold text-blue-900">{getTargetCount()}명</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-600">발송 채널</p>
                        <p className="text-lg font-bold text-blue-900">
                          {CHANNEL_OPTIONS.find(c => c.id === selectedChannel)?.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Schedule Selection */}
                  <h4 className="font-medium text-gray-900 mb-3">발송 시점</h4>
                  <div className="space-y-3">
                    <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer ${
                      schedule === 'now' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="schedule"
                        checked={schedule === 'now'}
                        onChange={() => setSchedule('now')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <p className="font-medium text-gray-900">즉시 발송</p>
                        <p className="text-sm text-gray-500">승인 완료 즉시 발송됩니다</p>
                      </div>
                    </label>
                    <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer ${
                      schedule === 'scheduled' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="schedule"
                        checked={schedule === 'scheduled'}
                        onChange={() => setSchedule('scheduled')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">예약 발송</p>
                        <p className="text-sm text-gray-500">지정한 시간에 발송됩니다</p>
                      </div>
                      {schedule === 'scheduled' && (
                        <input
                          type="datetime-local"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      )}
                    </label>
                  </div>
                </div>
              )}

              {/* Step 4: Approval Request */}
              {currentStep === 4 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">승인 요청</h3>

                  {/* Campaign Name */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      캠페인 이름 *
                    </label>
                    <input
                      type="text"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      placeholder="예: VIP 고객 감사 캠페인"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Campaign Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h4 className="font-medium text-gray-900">캠페인 요약</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">타겟</p>
                        <p className="font-medium text-gray-900">
                          {targetType === 'segment' ? `${selectedSegment} 세그먼트` : '개별 선택'} ({getTargetCount()}명)
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">채널</p>
                        <p className="font-medium text-gray-900">
                          {CHANNEL_OPTIONS.find(c => c.id === selectedChannel)?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">템플릿</p>
                        <p className="font-medium text-gray-900">
                          {TEMPLATE_OPTIONS.find(t => t.id === selectedTemplateId)?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">발송 시점</p>
                        <p className="font-medium text-gray-900">
                          {schedule === 'now' ? '즉시 발송' : scheduleDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* HITL Notice */}
                  <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-amber-800">승인 필요</p>
                        <p className="text-sm text-amber-700 mt-1">
                          캠페인 발송을 위해 관리자 승인이 필요합니다.
                          승인 요청 후 상태가 "승인 대기"로 변경됩니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wizard Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-between">
              <button
                onClick={() => currentStep > 1 ? setCurrentStep(prev => prev - 1) : resetWizard()}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                {currentStep === 1 ? '취소' : '이전'}
              </button>
              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  disabled={!isStepValid(currentStep)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  다음
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitCampaign}
                  disabled={!isStepValid(4)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  승인 요청
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Campaign List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">캠페인 목록</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">캠페인명</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">채널</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">타겟</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">상태</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">생성일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    생성된 캠페인이 없습니다. "새 캠페인 만들기"를 클릭하여 시작하세요.
                  </td>
                </tr>
              ) : (
                campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{campaign.templateContent}</p>
                    </td>
                    <td className="px-6 py-4">
                      {getChannelBadge(campaign.channel)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {campaign.target.type === 'segment' ? campaign.target.segmentId : '개별 선택'}
                      </span>
                      <span className="text-xs text-gray-400 ml-1">({campaign.target.count}명)</span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(campaign.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {campaign.createdAt}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
