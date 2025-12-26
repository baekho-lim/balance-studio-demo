import { LocaleCode, MultilingualText } from '@/types';

export * from './locales';

// 기본 언어
export const DEFAULT_LOCALE: LocaleCode = 'en';
export const FALLBACK_LOCALE: LocaleCode = 'ko';

// 언어 코드 → 접미사 매핑 (레거시 데이터 호환)
const LOCALE_SUFFIX_MAP: Partial<Record<LocaleCode, string>> = {
  ko: 'Kr',
  vi: 'Vi',
  ja: 'Ja',
  ms: 'Ms',
  id: 'Id',
  'zh-CN': 'ZhCn',
  'zh-TW': 'ZhTw',
};

// 폴백 체인 (우선순위 기반)
export const FALLBACK_CHAIN: LocaleCode[] = ['en', 'ko', 'vi'];

/**
 * 다국어 텍스트에서 특정 언어 텍스트 추출
 * @param text - MultilingualText 객체 또는 단순 문자열
 * @param locale - 원하는 언어 코드
 * @param fallbackChain - 폴백 언어 코드 배열 (기본: ['en', 'ko', 'vi'])
 */
export function getLocalizedText(
  text: MultilingualText | string | undefined,
  locale: LocaleCode = 'en',
  fallbackChain: LocaleCode[] = FALLBACK_CHAIN
): string {
  if (!text) return '';
  if (typeof text === 'string') return text;

  // 요청한 언어가 있으면 반환
  if (text[locale]) return text[locale] as string;

  // 폴백 체인 순회
  for (const fallback of fallbackChain) {
    if (text[fallback]) return text[fallback] as string;
  }

  // 어떤 값이든 첫 번째로 있는 것 반환
  const firstValue = Object.values(text).find(v => typeof v === 'string' && v.length > 0);
  return (firstValue as string) || '';
}

/**
 * 레거시 접미사 패턴에서 다국어 텍스트 추출
 * 예: { title: 'Hello', titleKr: '안녕' } → locale='ko' → '안녕'
 * @param obj - 접미사 패턴을 가진 객체
 * @param baseField - 기본 필드명 (예: 'title', 'question')
 * @param locale - 원하는 언어 코드
 */
export function getLocalizedField<T extends Record<string, unknown>>(
  obj: T | undefined,
  baseField: string,
  locale: LocaleCode = 'en'
): string {
  if (!obj) return '';

  // 영어는 기본 필드
  if (locale === 'en') {
    return (obj[baseField] as string) || '';
  }

  // 해당 언어의 접미사 필드 확인
  const suffix = LOCALE_SUFFIX_MAP[locale];
  if (suffix) {
    const localizedField = `${baseField}${suffix}`;
    if (obj[localizedField]) {
      return obj[localizedField] as string;
    }
  }

  // 폴백: 기본 필드 (영어)
  return (obj[baseField] as string) || '';
}

/**
 * 다국어 텍스트 또는 레거시 패턴 자동 감지하여 추출
 * @param data - MultilingualText 객체, 접미사 패턴 객체, 또는 문자열
 * @param locale - 원하는 언어 코드
 * @param baseField - 레거시 패턴인 경우 기본 필드명
 */
export function getText(
  data: MultilingualText | Record<string, unknown> | string | undefined,
  locale: LocaleCode = 'en',
  baseField?: string
): string {
  if (!data) return '';
  if (typeof data === 'string') return data;

  // MultilingualText 형태인지 확인 (en 필드 존재)
  if ('en' in data && typeof data.en === 'string') {
    return getLocalizedText(data as MultilingualText, locale);
  }

  // 레거시 패턴 (baseField 제공된 경우)
  if (baseField) {
    return getLocalizedField(data as Record<string, unknown>, baseField, locale);
  }

  return '';
}

/**
 * 날짜 포맷팅 (다국어 지원)
 */
export function formatDate(
  dateString: string,
  locale: LocaleCode = 'en',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
): string {
  try {
    const date = new Date(dateString);
    // 언어 코드를 Intl 호환 형식으로 변환
    const intlLocale = locale.replace('-', '-');
    return new Intl.DateTimeFormat(intlLocale, options).format(date);
  } catch {
    return dateString;
  }
}

/**
 * 전시 기간 포맷팅
 */
export function formatExhibitionDates(
  startDate: string,
  endDate?: string,
  locale: LocaleCode = 'en'
): string {
  const start = formatDate(startDate, locale, { year: 'numeric', month: 'short', day: 'numeric' });

  if (!endDate) {
    return locale === 'ko' ? `${start} ~` : `${start} –`;
  }

  const end = formatDate(endDate, locale, { year: 'numeric', month: 'short', day: 'numeric' });
  return `${start} – ${end}`;
}

/**
 * 전시 상태 라벨
 */
export function getExhibitionStatusLabel(
  status: 'upcoming' | 'current' | 'past',
  locale: LocaleCode = 'en'
): string {
  const labels: Record<string, Record<LocaleCode, string>> = {
    upcoming: {
      en: 'Upcoming', ko: '예정', vi: 'Sắp tới', ja: '開催予定',
      'zh-CN': '即将举行', 'zh-TW': '即將舉行',
      de: 'Bevorstehend', fr: 'À venir', es: 'Próximo', it: 'In arrivo', pt: 'Em breve',
      ar: 'قادم', ru: 'Предстоящая', id: 'Segera', ms: 'Akan datang', th: 'เร็วๆ นี้'
    },
    current: {
      en: 'Now Open', ko: '전시 중', vi: 'Đang diễn ra', ja: '開催中',
      'zh-CN': '正在展出', 'zh-TW': '正在展出',
      de: 'Jetzt geöffnet', fr: 'En cours', es: 'Ahora abierto', it: 'Ora aperto', pt: 'Aberto agora',
      ar: 'مفتوح الآن', ru: 'Сейчас открыто', id: 'Sedang berlangsung', ms: 'Kini dibuka', th: 'กำลังจัดแสดง'
    },
    past: {
      en: 'Past', ko: '종료', vi: 'Đã kết thúc', ja: '終了',
      'zh-CN': '已结束', 'zh-TW': '已結束',
      de: 'Vergangen', fr: 'Passée', es: 'Pasado', it: 'Passato', pt: 'Passado',
      ar: 'سابق', ru: 'Прошедшая', id: 'Selesai', ms: 'Lalu', th: 'ที่ผ่านมา'
    }
  };

  return labels[status]?.[locale] || labels[status]?.en || status;
}

/**
 * 뉴스 유형 라벨
 */
export function getNewsTypeLabel(
  type: 'press-release' | 'interview' | 'review' | 'feature',
  locale: LocaleCode = 'en'
): string {
  const labels: Record<string, Record<LocaleCode, string>> = {
    'press-release': {
      en: 'Press Release', ko: '보도자료', vi: 'Thông cáo báo chí', ja: 'プレスリリース',
      'zh-CN': '新闻稿', 'zh-TW': '新聞稿',
      de: 'Pressemitteilung', fr: 'Communiqué', es: 'Comunicado', it: 'Comunicato stampa', pt: 'Comunicado',
      ar: 'بيان صحفي', ru: 'Пресс-релиз', id: 'Siaran pers', ms: 'Siaran akhbar', th: 'ข่าวประชาสัมพันธ์'
    },
    interview: {
      en: 'Interview', ko: '인터뷰', vi: 'Phỏng vấn', ja: 'インタビュー',
      'zh-CN': '访谈', 'zh-TW': '訪談',
      de: 'Interview', fr: 'Entretien', es: 'Entrevista', it: 'Intervista', pt: 'Entrevista',
      ar: 'مقابلة', ru: 'Интервью', id: 'Wawancara', ms: 'Temubual', th: 'สัมภาษณ์'
    },
    review: {
      en: 'Review', ko: '리뷰', vi: 'Đánh giá', ja: 'レビュー',
      'zh-CN': '评论', 'zh-TW': '評論',
      de: 'Rezension', fr: 'Critique', es: 'Reseña', it: 'Recensione', pt: 'Resenha',
      ar: 'مراجعة', ru: 'Обзор', id: 'Ulasan', ms: 'Ulasan', th: 'บทวิจารณ์'
    },
    feature: {
      en: 'Feature', ko: '특집', vi: 'Chuyên đề', ja: '特集',
      'zh-CN': '专题', 'zh-TW': '專題',
      de: 'Beitrag', fr: 'Article', es: 'Artículo', it: 'Articolo', pt: 'Artigo',
      ar: 'مقال', ru: 'Статья', id: 'Artikel', ms: 'Artikel', th: 'บทความ'
    }
  };

  return labels[type]?.[locale] || labels[type]?.en || type;
}

/**
 * 파트너십 유형 라벨
 */
export function getPartnershipTypeLabel(
  type: string,
  locale: LocaleCode = 'en'
): { label: string; description: string } {
  const labels: Record<string, Record<LocaleCode, { label: string; description: string }>> = {
    'gallery-exhibition': {
      en: { label: 'Gallery Exhibition', description: 'Propose an exhibition at your gallery' },
      ko: { label: '갤러리 전시', description: '갤러리 전시 제안' },
      vi: { label: 'Triển lãm Gallery', description: 'Đề xuất triển lãm tại gallery của bạn' },
      ja: { label: 'ギャラリー展示', description: 'ギャラリーでの展覧会を提案' },
      'zh-CN': { label: '画廊展览', description: '在您的画廊举办展览' },
      'zh-TW': { label: '畫廊展覽', description: '在您的畫廊舉辦展覽' },
      de: { label: 'Galerieausstellung', description: 'Ausstellung in Ihrer Galerie vorschlagen' },
      fr: { label: 'Exposition Galerie', description: 'Proposer une exposition dans votre galerie' },
      es: { label: 'Exposición en Galería', description: 'Proponer una exposición en su galería' },
      it: { label: 'Mostra in Galleria', description: 'Proporre una mostra nella vostra galleria' },
      pt: { label: 'Exposição em Galeria', description: 'Propor uma exposição em sua galeria' },
      ar: { label: 'معرض في الجاليري', description: 'اقتراح معرض في صالتك' },
      ru: { label: 'Выставка в галерее', description: 'Предложить выставку в вашей галерее' },
      id: { label: 'Pameran Galeri', description: 'Ajukan pameran di galeri Anda' },
      ms: { label: 'Pameran Galeri', description: 'Cadangkan pameran di galeri anda' },
      th: { label: 'นิทรรศการแกลเลอรี่', description: 'เสนอจัดนิทรรศการที่แกลเลอรี่ของคุณ' }
    },
    'art-fair': {
      en: { label: 'Art Fair', description: 'Art fair participation opportunities' },
      ko: { label: '아트페어', description: '아트페어 참여 기회' },
      vi: { label: 'Hội chợ Nghệ thuật', description: 'Cơ hội tham gia hội chợ nghệ thuật' },
      ja: { label: 'アートフェア', description: 'アートフェア参加の機会' },
      'zh-CN': { label: '艺术博览会', description: '艺术博览会参与机会' },
      'zh-TW': { label: '藝術博覽會', description: '藝術博覽會參與機會' },
      de: { label: 'Kunstmesse', description: 'Teilnahmemöglichkeiten an Kunstmessen' },
      fr: { label: 'Foire d\'Art', description: 'Opportunités de participation aux foires d\'art' },
      es: { label: 'Feria de Arte', description: 'Oportunidades de participación en ferias de arte' },
      it: { label: 'Fiera d\'Arte', description: 'Opportunità di partecipazione alle fiere d\'arte' },
      pt: { label: 'Feira de Arte', description: 'Oportunidades de participação em feiras de arte' },
      ar: { label: 'معرض فني', description: 'فرص المشاركة في المعارض الفنية' },
      ru: { label: 'Арт-ярмарка', description: 'Возможности участия в арт-ярмарках' },
      id: { label: 'Pameran Seni', description: 'Kesempatan berpartisipasi dalam pameran seni' },
      ms: { label: 'Pameran Seni', description: 'Peluang penyertaan pameran seni' },
      th: { label: 'งานแสดงศิลปะ', description: 'โอกาสเข้าร่วมงานแสดงศิลปะ' }
    },
    'commission': {
      en: { label: 'Commission', description: 'Request a commissioned artwork' },
      ko: { label: '커미션', description: '작품 의뢰' },
      vi: { label: 'Đặt hàng', description: 'Yêu cầu tác phẩm theo đơn đặt hàng' },
      ja: { label: 'コミッション', description: '作品の委託制作依頼' },
      'zh-CN': { label: '委托创作', description: '委托定制艺术作品' },
      'zh-TW': { label: '委託創作', description: '委託定制藝術作品' },
      de: { label: 'Auftragsarbeit', description: 'Ein Auftragswerk anfragen' },
      fr: { label: 'Commande', description: 'Demander une œuvre sur commande' },
      es: { label: 'Encargo', description: 'Solicitar una obra por encargo' },
      it: { label: 'Commissione', description: 'Richiedere un\'opera su commissione' },
      pt: { label: 'Encomenda', description: 'Solicitar uma obra encomendada' },
      ar: { label: 'عمل مخصص', description: 'طلب عمل فني مخصص' },
      ru: { label: 'Заказ', description: 'Заказать произведение искусства' },
      id: { label: 'Pesanan', description: 'Minta karya seni yang dibuat khusus' },
      ms: { label: 'Tempahan', description: 'Mohon karya seni tempahan' },
      th: { label: 'งานสั่งทำ', description: 'ขอสั่งทำผลงานศิลปะ' }
    },
    'collaboration': {
      en: { label: 'Collaboration', description: 'Creative collaboration projects' },
      ko: { label: '협업', description: '창작 협업 프로젝트' },
      vi: { label: 'Hợp tác', description: 'Các dự án hợp tác sáng tạo' },
      ja: { label: 'コラボレーション', description: 'クリエイティブなコラボレーションプロジェクト' },
      'zh-CN': { label: '合作', description: '创意合作项目' },
      'zh-TW': { label: '合作', description: '創意合作項目' },
      de: { label: 'Zusammenarbeit', description: 'Kreative Kooperationsprojekte' },
      fr: { label: 'Collaboration', description: 'Projets de collaboration créative' },
      es: { label: 'Colaboración', description: 'Proyectos de colaboración creativa' },
      it: { label: 'Collaborazione', description: 'Progetti di collaborazione creativa' },
      pt: { label: 'Colaboração', description: 'Projetos de colaboração criativa' },
      ar: { label: 'تعاون', description: 'مشاريع تعاون إبداعي' },
      ru: { label: 'Сотрудничество', description: 'Творческие проекты сотрудничества' },
      id: { label: 'Kolaborasi', description: 'Proyek kolaborasi kreatif' },
      ms: { label: 'Kerjasama', description: 'Projek kerjasama kreatif' },
      th: { label: 'ความร่วมมือ', description: 'โครงการความร่วมมือเชิงสร้างสรรค์' }
    },
    'acquisition': {
      en: { label: 'Acquisition', description: 'Acquire artworks for your collection' },
      ko: { label: '작품 구매', description: '컬렉션을 위한 작품 구매' },
      vi: { label: 'Mua tác phẩm', description: 'Mua tác phẩm cho bộ sưu tập của bạn' },
      ja: { label: '作品購入', description: 'コレクションのための作品購入' },
      'zh-CN': { label: '收藏', description: '为您的收藏购买艺术品' },
      'zh-TW': { label: '收藏', description: '為您的收藏購買藝術品' },
      de: { label: 'Erwerb', description: 'Kunstwerke für Ihre Sammlung erwerben' },
      fr: { label: 'Acquisition', description: 'Acquérir des œuvres pour votre collection' },
      es: { label: 'Adquisición', description: 'Adquirir obras para su colección' },
      it: { label: 'Acquisizione', description: 'Acquisire opere per la tua collezione' },
      pt: { label: 'Aquisição', description: 'Adquirir obras para sua coleção' },
      ar: { label: 'اقتناء', description: 'اقتناء أعمال فنية لمجموعتك' },
      ru: { label: 'Приобретение', description: 'Приобрести произведения для вашей коллекции' },
      id: { label: 'Akuisisi', description: 'Dapatkan karya seni untuk koleksi Anda' },
      ms: { label: 'Pemerolehan', description: 'Dapatkan karya seni untuk koleksi anda' },
      th: { label: 'การซื้อ', description: 'ซื้อผลงานศิลปะสำหรับคอลเลกชันของคุณ' }
    },
    'media-inquiry': {
      en: { label: 'Media Inquiry', description: 'Press and interview requests' },
      ko: { label: '미디어 문의', description: '언론 및 인터뷰 요청' },
      vi: { label: 'Yêu cầu Báo chí', description: 'Yêu cầu phỏng vấn và báo chí' },
      ja: { label: 'メディア問い合わせ', description: 'プレスおよびインタビューのリクエスト' },
      'zh-CN': { label: '媒体咨询', description: '新闻和采访请求' },
      'zh-TW': { label: '媒體諮詢', description: '新聞和採訪請求' },
      de: { label: 'Medienanfrage', description: 'Presse- und Interviewanfragen' },
      fr: { label: 'Demande Média', description: 'Demandes de presse et d\'interview' },
      es: { label: 'Consulta de Medios', description: 'Solicitudes de prensa y entrevistas' },
      it: { label: 'Richiesta Media', description: 'Richieste stampa e interviste' },
      pt: { label: 'Consulta de Mídia', description: 'Solicitações de imprensa e entrevistas' },
      ar: { label: 'استفسار إعلامي', description: 'طلبات الصحافة والمقابلات' },
      ru: { label: 'Запрос СМИ', description: 'Запросы прессы и интервью' },
      id: { label: 'Pertanyaan Media', description: 'Permintaan pers dan wawancara' },
      ms: { label: 'Pertanyaan Media', description: 'Permintaan akhbar dan temubual' },
      th: { label: 'สอบถามสื่อ', description: 'คำขอสื่อมวลชนและสัมภาษณ์' }
    }
  };

  return labels[type]?.[locale] || labels[type]?.en || { label: type, description: '' };
}
