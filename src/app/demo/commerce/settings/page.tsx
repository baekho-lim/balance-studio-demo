'use client'

import { useState } from 'react'
import { Save, Eye, EyeOff, Copy, Users, Bell, Key, Store, Check } from 'lucide-react'
import { CommerceModal } from '@/components/templates/commerce'
import mockData from '@/data/demo/commerce-mock-data.json'

export default function SettingsPage() {
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'store' | 'notifications' | 'api' | 'team'>('store')

  const { storeSettings, teamMembers } = mockData

  const [formData, setFormData] = useState({
    name: storeSettings.name,
    domain: storeSettings.domain,
    email: storeSettings.email,
    phone: storeSettings.phone,
    address: storeSettings.address,
    currency: storeSettings.currency,
    timezone: storeSettings.timezone,
  })

  const [notifications, setNotifications] = useState({
    orderEmail: true,
    orderPush: true,
    lowStock: true,
    marketing: false,
    weeklyReport: true,
  })

  const mockApiKey = 'cgos_live_sk_1234567890abcdefghijklmnop'

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(mockApiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      admin: 'bg-purple-100 text-purple-700',
      marketing: 'bg-blue-100 text-blue-700',
      cs: 'bg-green-100 text-green-700',
    }
    const labels: Record<string, string> = {
      admin: '관리자',
      marketing: '마케팅',
      cs: '고객지원',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[role] || 'bg-gray-100 text-gray-700'}`}>
        {labels[role] || role}
      </span>
    )
  }

  const tabs = [
    { id: 'store', label: '스토어 정보', icon: <Store className="w-4 h-4" /> },
    { id: 'notifications', label: '알림 설정', icon: <Bell className="w-4 h-4" /> },
    { id: 'api', label: 'API 키', icon: <Key className="w-4 h-4" /> },
    { id: 'team', label: '팀 관리', icon: <Users className="w-4 h-4" /> },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">설정</h1>
          <p className="text-gray-600">스토어 설정 및 계정을 관리하세요</p>
        </div>
        <button
          onClick={() => setShowSaveModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          변경사항 저장
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Store Info Tab */}
      {activeTab === 'store' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">스토어 정보</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                스토어 이름
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                도메인
              </label>
              <input
                type="text"
                value={formData.domain}
                onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                전화번호
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                주소
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                통화
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="KRW">KRW (원)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                타임존
              </label>
              <select
                value={formData.timezone}
                onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Asia/Seoul">Asia/Seoul (KST)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">알림 설정</h2>
          <div className="space-y-4">
            {[
              { key: 'orderEmail', label: '주문 알림 (이메일)', description: '새 주문이 들어오면 이메일로 알림을 받습니다' },
              { key: 'orderPush', label: '주문 알림 (푸시)', description: '새 주문이 들어오면 푸시 알림을 받습니다' },
              { key: 'lowStock', label: '재고 부족 알림', description: '재고가 설정한 수량 이하로 떨어지면 알림을 받습니다' },
              { key: 'marketing', label: '마케팅 알림', description: '프로모션 및 마케팅 정보를 받습니다' },
              { key: 'weeklyReport', label: '주간 리포트', description: '매주 월요일 주간 성과 리포트를 받습니다' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof notifications] }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications[item.key as keyof typeof notifications]
                      ? 'bg-blue-600'
                      : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications[item.key as keyof typeof notifications]
                        ? 'translate-x-6'
                        : ''
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* API Tab */}
      {activeTab === 'api' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">API 키</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-amber-800">
              <strong>주의:</strong> API 키는 민감한 정보입니다. 절대 공개 저장소에 커밋하거나 클라이언트 코드에 노출하지 마세요.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Live API Key
              </label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={mockApiKey}
                    readOnly
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={handleCopyApiKey}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  {copied ? '복사됨' : '복사'}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                API 키 재발급
              </button>
              <p className="mt-2 text-xs text-gray-500">
                키를 재발급하면 기존 키는 즉시 무효화됩니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">팀 멤버</h2>
            <button
              onClick={() => setShowSaveModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              멤버 초대
            </button>
          </div>

          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                    {member.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getRoleBadge(member.role)}
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save Modal */}
      <CommerceModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        type="approval"
        title="변경사항 저장"
        message="설정 변경사항을 저장합니다. 일부 변경사항은 즉시 적용되며, 결제 관련 설정은 추가 검증이 필요할 수 있습니다."
      />
    </div>
  )
}
