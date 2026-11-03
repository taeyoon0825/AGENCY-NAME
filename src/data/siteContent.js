export const siteConfig = {
  companyName: 'AGENCY NAME',
  shortDescription:
    '외식 매장과 소비자 브랜드를 위한 인플루언서 섭외, 숏폼 콘텐츠 기획, 방문형 캠페인 운영을 함께합니다.',
  contact: {
    email: '',
    phone: '',
    address: '',
    businessNumber: '',
    representative: '',
  },
};

export const navItems = [
  { id: 'about', label: '회사 소개' },
  { id: 'services', label: '서비스' },
  { id: 'campaigns', label: '캠페인' },
  { id: 'process', label: '진행 절차' },
];

export const heroFrames = [
  {
    label: 'INSTAGRAM',
    src: '/assets/hero-dining.svg',
    alt: '외식 매장 방문 콘텐츠를 표현한 세로형 그래픽',
    className: 'frame--side frame--left',
  },
  {
    label: 'REELS',
    src: '/assets/hero-reels.svg',
    alt: '짧은 영상 콘텐츠 제작 장면을 표현한 세로형 그래픽',
    className: 'frame--main',
  },
  {
    label: 'BRAND CONTENT',
    src: '/assets/hero-product.svg',
    alt: '제품 사용 장면 콘텐츠를 표현한 세로형 그래픽',
    className: 'frame--side frame--right',
  },
];

export const principles = [
  {
    key: 'FIT',
    title: '브랜드와 콘텐츠의 적합성',
    body: '고객층, 활동 지역, 콘텐츠 분위기를 함께 검토합니다.',
  },
  {
    key: 'CONTENT',
    title: '채널에 자연스러운 콘텐츠',
    body: '플랫폼의 문법에 맞는 촬영 방향과 메시지를 정리합니다.',
  },
  {
    key: 'OPERATION',
    title: '일정과 게시 과정의 관리',
    body: '협의, 방문, 게시 확인까지 필요한 진행을 놓치지 않습니다.',
  },
];

export const services = [
  {
    number: '01',
    title: '인플루언서 매칭',
    description:
      '브랜드와 고객층, 콘텐츠 분야, 활동 지역과 협업 조건을 검토해 크리에이터를 제안합니다.',
    points: ['협업 조건 정리', '후보 제안', '일정 조율'],
    image: '/assets/service-match.svg',
    alt: '브랜드와 크리에이터를 연결하는 콘텐츠 보드 그래픽',
  },
  {
    number: '02',
    title: '릴스·숏폼 콘텐츠',
    description:
      '브랜드의 특징을 짧고 명확하게 전달할 수 있도록 콘텐츠 방향과 촬영 구성을 기획합니다.',
    points: ['콘텐츠 콘셉트', '촬영 구성', '제작 협의'],
    image: '/assets/service-shortform.svg',
    alt: '숏폼 촬영 구성을 나타내는 세로 영상 그래픽',
  },
  {
    number: '03',
    title: '매장 방문 캠페인',
    description:
      '방문 일정과 매장 경험의 핵심을 정리해 현장에서 콘텐츠 제작이 원활하게 이어지도록 운영합니다.',
    points: ['방문 일정', '촬영 포인트', '현장 안내'],
    image: '/assets/service-visit.svg',
    alt: '매장 방문 콘텐츠 동선을 표현한 그래픽',
  },
  {
    number: '04',
    title: '캠페인 운영',
    description: '게시 일정과 콘텐츠 공개 여부를 확인하고, 확인 가능한 반응 지표를 정리합니다.',
    points: ['일정 관리', '게시 확인', '결과 정리'],
    image: '/assets/service-operation.svg',
    alt: '캠페인 일정과 게시 확인을 표현한 운영 그래픽',
  },
];

export const campaignIdeas = [
  {
    eyebrow: 'LOCAL DINING',
    title: '방문하고 싶어지는 매장 콘텐츠',
    description:
      '메뉴가 놓이는 순간, 공간의 분위기, 방문 동선을 자연스럽게 보여주는 콘텐츠 제안입니다.',
    image: '/assets/campaign-local.svg',
    alt: '레스토랑 테이블과 촬영 장면을 표현한 캠페인 그래픽',
  },
  {
    eyebrow: 'PRODUCT STORY',
    title: '사용 장면으로 전하는 제품의 매력',
    description: '제품의 질감과 사용 맥락을 함께 보여줘 브랜드가 기억될 수 있는 장면을 설계합니다.',
    image: '/assets/campaign-product.svg',
    alt: '제품 사용 장면을 표현한 캠페인 그래픽',
  },
  {
    eyebrow: 'SHORT-FORM',
    title: '짧은 시간 안에 남는 브랜드 인상',
    description: '도입, 전환, 마무리 메시지를 압축해 릴스와 숏폼에 맞는 흐름으로 정리합니다.',
    image: '/assets/campaign-shortform.svg',
    alt: '짧은 영상 편집 장면을 표현한 캠페인 그래픽',
  },
];

export const processSteps = [
  {
    number: '01',
    title: '상담 접수',
    description: '홍보하려는 브랜드와 필요한 내용을 확인합니다.',
  },
  {
    number: '02',
    title: '목표·예산 정리',
    description: '캠페인 목적과 일정, 협업 범위를 함께 정합니다.',
  },
  {
    number: '03',
    title: '크리에이터 제안',
    description: '브랜드와 콘텐츠 방향에 맞는 후보와 협업안을 제안합니다.',
  },
  {
    number: '04',
    title: '콘텐츠 기획·협업',
    description: '제작 방향과 방문·게시 일정을 조율합니다.',
  },
  {
    number: '05',
    title: '게시 확인·결과 정리',
    description: '공개된 콘텐츠와 확인 가능한 반응 지표를 정리합니다.',
  },
];

export const formOptions = {
  services: ['인플루언서 매칭', '릴스·숏폼 콘텐츠', '매장 방문 캠페인', '캠페인 운영'],
  budgets: ['미정', '100만원 이하', '100만~300만원', '300만~500만원', '500만원 이상'],
  timelines: ['미정', '2주 이내', '1개월 이내', '1~3개월', '상시 협의'],
  platforms: ['인스타그램', '유튜브', '틱톡', '블로그', '기타'],
  categories: ['외식', '뷰티', '패션', '라이프스타일', '제품 리뷰', '여행·공간', '기타'],
};
