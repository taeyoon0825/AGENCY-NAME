import test from 'node:test';
import assert from 'node:assert/strict';
import { validateBrand, validateCreator } from './formValidation.js';

const brand = {
  brandName: '검증용 가상 브랜드',
  managerName: '검증용 가상 담당자',
  contactMethod: 'email',
  contactValue: 'qa@example.invalid',
  message: '전송하지 않는 입력 검증',
  privacy: true,
};
const creator = {
  creatorName: '검증용 가상 활동명',
  platform: '인스타그램',
  category: '외식',
  channelUrl: 'https://example.invalid/channel',
  contactMethod: 'email',
  contactValue: 'qa@example.invalid',
  privacy: true,
};

test('전화번호는 숫자 개수까지 검증하고 구분기호만 있는 입력을 거부한다', () => {
  for (const contactValue of ['--------', '() () ()', '12-34', '010123456789012345']) {
    assert.ok(validateBrand({ ...brand, contactMethod: 'phone', contactValue }).contactValue);
  }
  assert.deepEqual(
    validateBrand({ ...brand, contactMethod: 'phone', contactValue: '010-0000-0000' }),
    {},
  );
});

test('선택한 연락 방법에 맞는 형식만 허용한다', () => {
  assert.ok(validateBrand({ ...brand, contactValue: '010-0000-0000' }).contactValue);
  assert.ok(validateBrand({ ...brand, contactMethod: 'phone' }).contactValue);
  assert.deepEqual(validateBrand(brand), {});
});

test('채널 주소에서 스크립트, 자격증명, 잘못된 URL을 거부한다', () => {
  for (const channelUrl of [
    'javascript:alert(1)',
    'not-a-url',
    'https://user:password@example.invalid',
  ]) {
    assert.ok(validateCreator({ ...creator, channelUrl }).channelUrl);
  }
  assert.deepEqual(validateCreator(creator), {});
});

test('공백뿐인 필수값과 개인정보 미확인을 거부하며 원래 입력을 보존한다', () => {
  const input = { ...brand, brandName: '   ', privacy: false };
  const before = { ...input };
  const errors = validateBrand(input);
  assert.ok(errors.brandName);
  assert.ok(errors.privacy);
  assert.deepEqual(input, before);
});
