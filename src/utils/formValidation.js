function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value) {
  const phone = value.trim();
  const digits = phone.replace(/\D/g, '');
  return /^\+?[0-9()\s-]+$/.test(phone) && digits.length >= 8 && digits.length <= 15;
}

function isValidChannelUrl(value) {
  try {
    const url = new URL(value.trim());
    return (
      ['https:', 'http:'].includes(url.protocol) &&
      !url.username &&
      !url.password &&
      url.hostname.includes('.')
    );
  } catch {
    return false;
  }
}

export function validateBrand(values) {
  const errors = {};
  if (!values.brandName.trim()) errors.brandName = '업체명 또는 브랜드명을 입력해 주세요.';
  if (!values.managerName.trim()) errors.managerName = '담당자명을 입력해 주세요.';
  if (!values.contactValue.trim()) {
    errors.contactValue = '선택한 연락 방법에 맞는 연락처를 입력해 주세요.';
  } else if (values.contactMethod === 'email' && !isValidEmail(values.contactValue)) {
    errors.contactValue = '이메일 형식을 확인해 주세요.';
  } else if (values.contactMethod === 'phone' && !isValidPhone(values.contactValue)) {
    errors.contactValue = '전화번호 형식을 확인해 주세요.';
  }
  if (!values.message.trim()) errors.message = '문의 내용을 입력해 주세요.';
  if (!values.privacy) errors.privacy = '개인정보 수집·이용 안내 확인이 필요합니다.';
  return errors;
}

export function validateCreator(values) {
  const errors = {};
  if (!values.creatorName.trim()) errors.creatorName = '이름 또는 활동명을 입력해 주세요.';
  if (!values.platform.trim()) errors.platform = '활동 플랫폼을 선택해 주세요.';
  if (!values.channelUrl.trim()) errors.channelUrl = '채널 주소를 입력해 주세요.';
  else if (!isValidChannelUrl(values.channelUrl))
    errors.channelUrl = 'http:// 또는 https://로 시작하는 올바른 채널 주소를 입력해 주세요.';
  if (!values.category.trim()) errors.category = '주요 콘텐츠 분야를 선택해 주세요.';
  if (!values.contactValue.trim()) {
    errors.contactValue = '선택한 연락 방법에 맞는 연락처를 입력해 주세요.';
  } else if (values.contactMethod === 'email' && !isValidEmail(values.contactValue)) {
    errors.contactValue = '이메일 형식을 확인해 주세요.';
  } else if (values.contactMethod === 'phone' && !isValidPhone(values.contactValue)) {
    errors.contactValue = '전화번호 형식을 확인해 주세요.';
  }
  if (!values.privacy) errors.privacy = '개인정보 수집·이용 안내 확인이 필요합니다.';
  return errors;
}
