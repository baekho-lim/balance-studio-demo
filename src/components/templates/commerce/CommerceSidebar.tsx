'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Target,
  Megaphone,
  PenTool,
  Plug,
  Settings,
  LogOut,
  ChevronRight,
  Store
} from 'lucide-react'

interface NavItem {
  name: { en: string; ko: string }
  href: string
  icon: string
}

interface CommerceSidebarProps {
  navigation: NavItem[]
  storeName?: string
}

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  Megaphone: <Megaphone className="w-5 h-5" />,
  PenTool: <PenTool className="w-5 h-5" />,
  Plug: <Plug className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />
}

export default function CommerceSidebar({ navigation, storeName = 'My Store' }: CommerceSidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/demo/commerce/dashboard') {
      return pathname === href || pathname === '/demo/commerce'
    }
    return pathname.startsWith(href)
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-gray-900 text-gray-300 flex flex-col z-50">
      {/* Logo */}
      <div className="p-4 border-b border-gray-800">
        <Link href="/demo/commerce" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
            C
          </div>
          <div>
            <span className="text-white font-semibold text-sm">Commerce OS</span>
            <p className="text-xs text-gray-500">Growth Platform</p>
          </div>
        </Link>
      </div>

      {/* Store Selector */}
      <div className="p-3 border-b border-gray-800">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
          <Store className="w-4 h-4 text-gray-400" />
          <span className="flex-1 text-left text-sm truncate">{storeName}</span>
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className={active ? 'text-white' : 'text-gray-500'}>
                {iconMap[item.icon] || <LayoutDashboard className="w-5 h-5" />}
              </span>
              <span>{item.name.ko}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-800">
        <Link
          href="/demo"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5 text-gray-500" />
          <span>데모 허브로 돌아가기</span>
        </Link>
      </div>
    </aside>
  )
}
