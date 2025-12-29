import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface GenerateSiteRequest {
  inquiryId: string
  template: string
  businessInfo: {
    type: string
    location: string
    targetCustomer: string
  }
  planDocument: string
}

interface ParsedPlan {
  businessName: {
    en: string
    ko: string
  }
  tagline: {
    en: string
    ko: string
  }
  description: {
    en: string
    ko: string
  }
  telephone: string
  email: string
  address: string
  services: Array<{
    name: { en: string; ko: string }
    description: { en: string; ko: string }
  }>
  team: Array<{
    name: string
    role: { en: string; ko: string }
    bio: { en: string; ko: string }
  }>
  pricing: Array<{
    name: { en: string; ko: string }
    price: string
    features: string[]
  }>
}

function parsePlanDocument(planDocument: string, businessInfo: { type: string; location: string }): ParsedPlan {
  // Default structure if parsing fails
  const defaultPlan: ParsedPlan = {
    businessName: { en: 'My Business', ko: '내 사업' },
    tagline: { en: 'Welcome to our business', ko: '환영합니다' },
    description: { en: 'Your trusted local business.', ko: '신뢰할 수 있는 비즈니스입니다.' },
    telephone: '',
    email: '',
    address: businessInfo.location || '',
    services: [],
    team: [],
    pricing: [],
  }

  if (!planDocument) return defaultPlan

  const lines = planDocument.split('\n')
  let currentSection = ''
  const result = { ...defaultPlan }

  // Extract business name from title (first # heading)
  const titleMatch = planDocument.match(/^#\s+(.+?)(?:\s+홈페이지\s+기획서)?$/m)
  if (titleMatch) {
    const name = titleMatch[1].trim()
    result.businessName = { en: name, ko: name }
  }

  // Parse sections
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Section headers (##)
    if (line.startsWith('## ')) {
      currentSection = line.replace(/^##\s+\d*\.?\s*/, '').toLowerCase()
      continue
    }

    // Parse based on current section
    if (currentSection.includes('사업') || currentSection.includes('개요')) {
      // Business overview section
      if (line.includes('사업 소개') || line.includes('소개')) {
        const desc = line.replace(/.*?[:：]\s*/, '').trim()
        if (desc) {
          result.description = { en: desc, ko: desc }
        }
      }
      if (line.includes('핵심 가치') || line.includes('tagline') || line.includes('슬로건')) {
        const tagline = line.replace(/.*?[:：]\s*/, '').trim()
        if (tagline) {
          result.tagline = { en: tagline, ko: tagline }
        }
      }
    }

    if (currentSection.includes('연락처') || currentSection.includes('contact')) {
      if (line.includes('전화') || line.includes('phone')) {
        result.telephone = line.replace(/.*?[:：]\s*/, '').trim()
      }
      if (line.includes('이메일') || line.includes('email')) {
        result.email = line.replace(/.*?[:：]\s*/, '').trim()
      }
      if (line.includes('주소') || line.includes('address')) {
        result.address = line.replace(/.*?[:：]\s*/, '').trim()
      }
    }

    // Services/Products section
    if (currentSection.includes('서비스') || currentSection.includes('제품') || currentSection.includes('프로그램')) {
      const serviceMatch = line.match(/^\d+\.\s*\*\*(.+?)\*\*[:：]\s*(.+)$/)
      if (serviceMatch) {
        result.services.push({
          name: { en: serviceMatch[1], ko: serviceMatch[1] },
          description: { en: serviceMatch[2], ko: serviceMatch[2] },
        })
      }
    }

    // Team section
    if (currentSection.includes('팀원') || currentSection.includes('강사') || currentSection.includes('직원')) {
      const teamMatch = line.match(/[-•]\s*\*\*(.+?)\*\*[:：]\s*(.+)$/)
      if (teamMatch) {
        const parts = teamMatch[2].split(',').map(s => s.trim())
        result.team.push({
          name: teamMatch[1],
          role: { en: parts[0] || '', ko: parts[0] || '' },
          bio: { en: parts.slice(1).join(', ') || '', ko: parts.slice(1).join(', ') || '' },
        })
      }
    }

    // Pricing section
    if (currentSection.includes('가격') || currentSection.includes('멤버십') || currentSection.includes('요금')) {
      const pricingMatch = line.match(/[-•]\s*\*\*(.+?)\*\*[:：]\s*(.+)$/)
      if (pricingMatch) {
        const parts = pricingMatch[2].split(/[,/]/).map(s => s.trim())
        result.pricing.push({
          name: { en: pricingMatch[1], ko: pricingMatch[1] },
          price: parts[0] || '',
          features: parts.slice(1),
        })
      }
    }
  }

  return result
}

function generateSlug(businessName: string): string {
  return businessName
    .toLowerCase()
    .replace(/[^\w\s가-힣]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[가-힣]+/g, (match) => {
      // Simple romanization for Korean
      return match.split('').map(() => '').join('') || 'business'
    })
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || `site-${Date.now()}`
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateSiteRequest = await request.json()
    const { inquiryId, template, businessInfo, planDocument } = body

    if (!inquiryId) {
      return NextResponse.json(
        { error: 'Missing inquiry ID' },
        { status: 400 }
      )
    }

    // Parse the plan document
    const parsedPlan = parsePlanDocument(planDocument, businessInfo)

    // Generate a unique site slug
    const timestamp = Date.now().toString(36)
    const siteSlug = `${generateSlug(parsedPlan.businessName.ko) || 'client'}-${timestamp}`
    const siteId = `site-${timestamp}`

    // Create client data directory
    const clientDataDir = path.join(process.cwd(), 'src/data/clients', siteSlug)

    // Check if directory exists, create if not
    if (!fs.existsSync(clientDataDir)) {
      fs.mkdirSync(clientDataDir, { recursive: true })
    }

    // Generate config based on template and parsed plan
    const siteConfig = {
      id: siteId,
      slug: siteSlug,
      template,
      createdAt: new Date().toISOString(),
      inquiryId,
      name: parsedPlan.businessName,
      tagline: parsedPlan.tagline,
      description: parsedPlan.description,
      telephone: parsedPlan.telephone,
      telephoneDisplay: parsedPlan.telephone,
      email: parsedPlan.email,
      address: {
        display: {
          en: parsedPlan.address,
          ko: parsedPlan.address,
        }
      },
      navigation: [
        { name: { en: 'Home', ko: '홈' }, href: `/clients/${siteSlug}` },
        { name: { en: 'Services', ko: '서비스' }, href: `/clients/${siteSlug}/services` },
        { name: { en: 'Team', ko: '팀' }, href: `/clients/${siteSlug}/team` },
        { name: { en: 'Pricing', ko: '가격' }, href: `/clients/${siteSlug}/pricing` },
        { name: { en: 'Contact', ko: '문의' }, href: `/clients/${siteSlug}#contact` },
      ],
      colors: getTemplateColors(template),
    }

    // Write config file
    fs.writeFileSync(
      path.join(clientDataDir, 'config.json'),
      JSON.stringify(siteConfig, null, 2)
    )

    // Write services file
    const servicesData = parsedPlan.services.length > 0
      ? parsedPlan.services
      : getDefaultServices(template)
    fs.writeFileSync(
      path.join(clientDataDir, 'services.json'),
      JSON.stringify(servicesData, null, 2)
    )

    // Write team file
    const teamData = parsedPlan.team.length > 0
      ? parsedPlan.team
      : getDefaultTeam(template)
    fs.writeFileSync(
      path.join(clientDataDir, 'team.json'),
      JSON.stringify(teamData, null, 2)
    )

    // Write pricing file
    const pricingData = parsedPlan.pricing.length > 0
      ? parsedPlan.pricing
      : getDefaultPricing(template)
    fs.writeFileSync(
      path.join(clientDataDir, 'pricing.json'),
      JSON.stringify(pricingData, null, 2)
    )

    // Store the original plan document
    fs.writeFileSync(
      path.join(clientDataDir, 'plan.md'),
      planDocument || '# No plan document provided'
    )

    // Update the sites registry
    const sitesRegistryPath = path.join(process.cwd(), 'src/data/generated-sites.json')
    let sitesRegistry: Array<{ id: string; slug: string; inquiryId: string; createdAt: string; url: string }> = []
    try {
      sitesRegistry = JSON.parse(fs.readFileSync(sitesRegistryPath, 'utf-8'))
    } catch {
      // File doesn't exist, start fresh
    }

    const newSite = {
      id: siteId,
      slug: siteSlug,
      inquiryId,
      createdAt: new Date().toISOString(),
      url: `/clients/${siteSlug}`,
    }
    sitesRegistry.unshift(newSite)
    fs.writeFileSync(sitesRegistryPath, JSON.stringify(sitesRegistry, null, 2))

    return NextResponse.json({
      success: true,
      generatedSite: {
        id: siteId,
        url: `/clients/${siteSlug}`,
        createdAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Site generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate site: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}

function getTemplateColors(template: string): { primary: string; secondary: string; accent: string } {
  const colorSchemes: Record<string, { primary: string; secondary: string; accent: string }> = {
    pilates: { primary: '#3B82F6', secondary: '#8B5CF6', accent: '#EC4899' },
    restaurant: { primary: '#D97706', secondary: '#DC2626', accent: '#059669' },
    academy: { primary: '#2563EB', secondary: '#7C3AED', accent: '#10B981' },
    ecommerce: { primary: '#0891B2', secondary: '#6366F1', accent: '#F59E0B' },
    portfolio: { primary: '#1F2937', secondary: '#4B5563', accent: '#F472B6' },
  }
  return colorSchemes[template] || colorSchemes.pilates
}

function getDefaultServices(template: string): Array<{ name: { en: string; ko: string }; description: { en: string; ko: string } }> {
  const defaults: Record<string, Array<{ name: { en: string; ko: string }; description: { en: string; ko: string } }>> = {
    pilates: [
      { name: { en: 'Mat Pilates', ko: '매트 필라테스' }, description: { en: 'Core strengthening on the mat', ko: '매트 위에서 코어 강화' } },
      { name: { en: 'Reformer', ko: '리포머' }, description: { en: 'Equipment-based training', ko: '기구 기반 트레이닝' } },
      { name: { en: 'Private Session', ko: '개인 레슨' }, description: { en: '1:1 personalized training', ko: '1:1 맞춤 트레이닝' } },
    ],
    restaurant: [
      { name: { en: 'Dining', ko: '다이닝' }, description: { en: 'Fine dining experience', ko: '파인 다이닝 경험' } },
      { name: { en: 'Catering', ko: '케이터링' }, description: { en: 'Event catering service', ko: '행사 케이터링 서비스' } },
    ],
    academy: [
      { name: { en: 'Group Classes', ko: '그룹 수업' }, description: { en: 'Learn with peers', ko: '함께 배우는 수업' } },
      { name: { en: 'Private Tutoring', ko: '개인 과외' }, description: { en: '1:1 personalized learning', ko: '1:1 맞춤 학습' } },
    ],
  }
  return defaults[template] || defaults.pilates
}

function getDefaultTeam(template: string): Array<{ name: string; role: { en: string; ko: string }; bio: { en: string; ko: string } }> {
  return [
    { name: '홍길동', role: { en: 'Founder', ko: '대표' }, bio: { en: '10+ years of experience', ko: '10년 이상의 경력' } },
    { name: '김철수', role: { en: 'Manager', ko: '매니저' }, bio: { en: 'Customer service expert', ko: '고객 서비스 전문가' } },
  ]
}

function getDefaultPricing(template: string): Array<{ name: { en: string; ko: string }; price: string; features: string[] }> {
  const defaults: Record<string, Array<{ name: { en: string; ko: string }; price: string; features: string[] }>> = {
    pilates: [
      { name: { en: 'Single Class', ko: '1회권' }, price: '35,000원', features: ['1회 수업', '모든 클래스 가능'] },
      { name: { en: '10 Classes', ko: '10회권' }, price: '300,000원', features: ['10회 수업', '3개월 유효'] },
      { name: { en: 'Unlimited', ko: '무제한' }, price: '250,000원/월', features: ['무제한 수업', '우선 예약'] },
    ],
    restaurant: [
      { name: { en: 'Lunch Set', ko: '런치 세트' }, price: '25,000원~', features: ['런치 코스'] },
      { name: { en: 'Dinner Course', ko: '디너 코스' }, price: '55,000원~', features: ['디너 코스'] },
    ],
    academy: [
      { name: { en: 'Monthly', ko: '월 수강' }, price: '300,000원/월', features: ['주 4회 수업'] },
      { name: { en: '3 Months', ko: '3개월' }, price: '800,000원', features: ['10% 할인'] },
    ],
  }
  return defaults[template] || defaults.pilates
}
