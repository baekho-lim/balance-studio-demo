'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Copy, Check, FileText, MessageSquare, ArrowRight, Download, Lightbulb } from 'lucide-react'
import { SectionHeader, Button, Card, Badge } from '@agency/ui'

const chatGPTPrompt = `당신은 웹사이트 기획 전문가입니다. 저는 사업용 홈페이지를 제작하려고 합니다.

아래 정보를 바탕으로 홈페이지 기획서를 마크다운 형식으로 작성해주세요.

---
## 내 사업 정보

- **사업명**: [여기에 입력]
- **업종**: [필라테스/레스토랑/학원/쇼핑몰/포트폴리오 등]
- **위치**: [도시, 지역]
- **타겟 고객**: [예: 20-40대 여성, 직장인 등]
- **핵심 서비스/제품**: [주요 서비스 3-5개]
- **차별화 포인트**: [경쟁사와 다른 점]
- **원하는 분위기**: [모던, 클래식, 따뜻한, 전문적 등]
- **참고 사이트**: [비슷하게 하고 싶은 사이트 URL]

---

## 출력 형식

아래 섹션을 포함한 마크다운 문서를 작성해주세요:

\`\`\`markdown
# [사업명] 홈페이지 기획서

## 1. 사업 개요
- 사업 소개 (2-3문장)
- 핵심 가치
- 타겟 고객 정의

## 2. 메인 페이지 구성
### 히어로 섹션
- 메인 타이틀
- 서브 타이틀
- CTA 버튼 텍스트

### 주요 섹션
- 섹션 1: [내용]
- 섹션 2: [내용]
- 섹션 3: [내용]

## 3. 서브 페이지 목록
- /about: 소개 페이지
- /services: 서비스 페이지
- /pricing: 가격 페이지
- /contact: 연락처 페이지
(필요한 페이지 추가)

## 4. 핵심 컨텐츠
### 서비스/제품 목록
1. [서비스명]: [설명]
2. [서비스명]: [설명]
3. [서비스명]: [설명]

### 팀원/강사 소개 (해당시)
- [이름]: [역할], [한줄 소개]

### 가격/멤버십 (해당시)
- [플랜명]: [가격], [혜택]

## 5. 연락처 정보
- 전화번호:
- 이메일:
- 주소:
- 영업시간:
- SNS:

## 6. SEO 키워드
- 주요 키워드: [5개]
- 지역 키워드: [3개]
- 롱테일 키워드: [3개]

## 7. 추가 요청사항
- [있다면 자유롭게 작성]
\`\`\`

---

제가 제공한 정보를 바탕으로 위 형식에 맞게 기획서를 작성해주세요.
실제 사업에 맞게 구체적이고 현실적인 내용으로 채워주세요.`

const exampleOutput = `# 밸런스 필라테스 홈페이지 기획서

## 1. 사업 개요
- **사업 소개**: 강남 역삼동에 위치한 프리미엄 필라테스 스튜디오. 1:1 맞춤 레슨과 소규모 그룹 수업을 통해 체형 교정과 코어 강화에 집중합니다.
- **핵심 가치**: 개인 맞춤형 케어, 전문 자격증 보유 강사진, 최신 리포머 장비
- **타겟 고객**: 25-45세 직장인 여성, 체형 교정이 필요한 분, 건강한 라이프스타일 추구자

## 2. 메인 페이지 구성
### 히어로 섹션
- 메인 타이틀: "당신의 밸런스를 찾아드립니다"
- 서브 타이틀: "강남 역삼동 프리미엄 필라테스 스튜디오"
- CTA 버튼: "무료 체험 신청하기"

### 주요 섹션
- 섹션 1: 프로그램 소개 (매트/리포머/1:1)
- 섹션 2: 강사 하이라이트 (대표 강사 3명)
- 섹션 3: 회원 후기 & 비포/애프터
- 섹션 4: 시설 갤러리
- 섹션 5: 위치 & 영업시간

## 3. 서브 페이지 목록
- /about: 스튜디오 소개, 철학, 시설
- /programs: 프로그램 상세 (매트/리포머/개인레슨)
- /instructors: 강사 프로필
- /schedule: 수업 시간표
- /pricing: 멤버십 요금표
- /contact: 위치, 연락처, 문의 폼

## 4. 핵심 컨텐츠
### 프로그램 목록
1. **매트 필라테스**: 기초부터 탄탄하게, 소도구 활용 (50분, 6명)
2. **리포머 필라테스**: 전문 장비로 정확한 자세 교정 (50분, 4명)
3. **1:1 프라이빗**: 개인 맞춤 집중 케어 (50분)
4. **듀엣 레슨**: 친구/커플과 함께 (50분, 2명)

### 강사 소개
- **김수진**: 대표 원장, 10년 경력, 재활 필라테스 전문
- **이지은**: 수석 강사, 발레 전공, 체형 교정 전문
- **박민영**: 리포머 전문, 산전/산후 필라테스

### 멤버십 요금
- **드롭인**: 35,000원/회
- **4회권**: 120,000원 (1개월)
- **무제한**: 250,000원/월

## 5. 연락처 정보
- 전화번호: 02-1234-5678
- 이메일: hello@balancepilates.kr
- 주소: 서울시 강남구 역삼동 123-45 2층
- 영업시간: 평일 07:00-22:00, 토 09:00-18:00
- SNS: @balance_pilates_gangnam

## 6. SEO 키워드
- 주요 키워드: 강남 필라테스, 역삼동 필라테스, 리포머 필라테스, 체형교정, 1:1 필라테스
- 지역 키워드: 역삼역 필라테스, 강남역 필라테스, 선릉역 필라테스
- 롱테일 키워드: 강남 직장인 필라테스, 역삼동 소규모 필라테스, 강남 개인레슨 필라테스

## 7. 추가 요청사항
- 온라인 예약 시스템 연동 희망
- 인스타그램 피드 연동
- 카카오톡 상담 버튼 필요`

export default function GuidePage() {
  const [copied, setCopied] = useState(false)

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(chatGPTPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-6 h-6" />
            <span className="text-green-100">홈페이지 기획 가이드</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            ChatGPT로 5분 만에<br />
            홈페이지 기획서 작성하기
          </h1>
          <p className="text-xl text-green-100 mb-6">
            아래 프롬프트를 복사해서 ChatGPT에 붙여넣고,<br />
            질문에 답변하면 완성된 기획서를 받을 수 있습니다.
          </p>
          <div className="flex gap-4">
            <Button onClick={copyPrompt} variant="secondary" size="lg">
              {copied ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  복사됨!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" />
                  프롬프트 복사하기
                </>
              )}
            </Button>
            <Button
              href="https://chat.openai.com"
              external
              size="lg"
              className="bg-white/20 hover:bg-white/30"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              ChatGPT 열기
            </Button>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            title="기획서 작성 3단계"
            subtitle="누구나 쉽게 따라할 수 있습니다"
          />

          <div className="space-y-8">
            {[
              {
                step: 1,
                title: '프롬프트 복사',
                desc: '위의 "프롬프트 복사하기" 버튼을 클릭하세요',
                icon: Copy,
              },
              {
                step: 2,
                title: 'ChatGPT에서 대화',
                desc: '복사한 프롬프트를 붙여넣고, 사업 정보를 입력하세요',
                icon: MessageSquare,
              },
              {
                step: 3,
                title: '기획서 다운로드',
                desc: '완성된 마크다운을 복사해서 문의 폼에 첨부하세요',
                icon: Download,
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prompt Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            title="ChatGPT 프롬프트"
            subtitle="아래 내용을 그대로 복사해서 사용하세요"
          />

          <Card className="relative">
            <button
              onClick={copyPrompt}
              className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  복사됨
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  복사
                </>
              )}
            </button>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-gray-50 p-6 rounded-xl overflow-x-auto">
              {chatGPTPrompt}
            </pre>
          </Card>
        </div>
      </section>

      {/* Example Output */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            title="예시 결과물"
            subtitle="이런 형태의 기획서가 생성됩니다"
          />

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <Badge variant="warning">필라테스 스튜디오 예시</Badge>
            </div>
            <div className="prose prose-sm max-w-none">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-gray-50 p-6 rounded-xl overflow-x-auto max-h-96 overflow-y-auto">
                {exampleOutput}
              </pre>
            </div>
          </Card>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            title="좋은 기획서 작성 팁"
            subtitle="더 정확한 결과를 위한 조언"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: '구체적인 정보 입력',
                desc: '사업명, 위치, 서비스를 최대한 구체적으로 작성하세요. 막연한 표현은 피하세요.',
              },
              {
                title: '경쟁사 분석',
                desc: '비슷한 업종의 웹사이트를 3-5개 조사하고, 참고할 점을 정리해두세요.',
              },
              {
                title: '타겟 고객 정의',
                desc: '나이, 성별, 직업, 관심사 등 구체적인 페르소나를 설정하세요.',
              },
              {
                title: '차별화 포인트',
                desc: '왜 고객이 경쟁사가 아닌 우리를 선택해야 하는지 명확히 하세요.',
              },
            ].map((tip, idx) => (
              <Card key={idx} border>
                <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-500 text-sm">{tip.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">기획서 작성이 완료되셨나요?</h2>
          <p className="text-green-100 text-lg mb-8">
            작성한 기획서와 함께 문의해주시면<br />
            빠르게 사이트 초안을 만들어 드립니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/inquiry" variant="secondary" size="lg">
              문의하기
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button href="/templates" size="lg" className="bg-white/20 hover:bg-white/30">
              템플릿 둘러보기
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
