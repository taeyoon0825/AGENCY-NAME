import { useEffect, useRef, useState } from 'react';
import { formOptions } from '../data/siteContent.js';
import { validateBrand, validateCreator } from '../utils/formValidation.js';

const initialBrandForm = {
  brandName: '',
  managerName: '',
  contactMethod: 'email',
  contactValue: '',
  services: [],
  budget: '미정',
  timeline: '미정',
  message: '',
  privacy: false,
};

const initialCreatorForm = {
  creatorName: '',
  platform: '',
  channelUrl: '',
  category: '',
  contactMethod: 'email',
  contactValue: '',
  message: '',
  privacy: false,
};

function FieldError({ children, id }) {
  if (!children) return null;
  return (
    <p id={id} className="field-error" role="alert">
      {children}
    </p>
  );
}

export default function ContactSection({ activeForm, setActiveForm, contactRef }) {
  const [brandForm, setBrandForm] = useState(initialBrandForm);
  const [creatorForm, setCreatorForm] = useState(initialCreatorForm);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const errorSummaryRef = useRef(null);
  const isBrand = activeForm === 'brand';

  const updateBrand = (name, value) => {
    setBrandForm((current) => ({ ...current, [name]: value }));
  };

  const updateCreator = (name, value) => {
    setCreatorForm((current) => ({ ...current, [name]: value }));
  };

  const toggleBrandService = (service) => {
    setBrandForm((current) => {
      const selected = current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service];
      return { ...current, services: selected };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setNotice('');
    const nextErrors = isBrand ? validateBrand(brandForm) : validateCreator(creatorForm);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      window.setTimeout(() => errorSummaryRef.current?.focus(), 0);
      return;
    }

    setNotice(
      '입력값 검증은 완료됐지만 현재 수신 API가 연결되지 않아 접수되지 않았습니다. 입력 내용은 저장되지 않습니다.',
    );
  };

  useEffect(() => {
    setErrors({});
    setNotice('');
  }, [activeForm]);

  const errorMessages = Object.values(errors);

  const handleTabKeyDown = (event) => {
    let next;
    if (event.key === 'Home') next = 'brand';
    else if (event.key === 'End') next = 'creator';
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      next = isBrand ? 'creator' : 'brand';
    } else return;

    event.preventDefault();
    setActiveForm(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <section id="contact" ref={contactRef} className="section contact dark-section">
      <div className="contact__grid">
        <div className="contact__heading" data-reveal>
          <p className="eyebrow">LET&apos;S TALK</p>
          <h2 className="section-title">
            어떤 브랜드를
            <br />
            알리고 싶으신가요?
          </h2>
          <p>
            현재 문의 수신 서버는 연결되어 있지 않습니다. 폼 구조와 필수값 검증은 구현되어 있으며,
            실제 공개 전 수신 API 또는 메일 처리 기능을 연결해야 합니다.
          </p>
        </div>

        <form className="contact-form" noValidate onSubmit={handleSubmit} data-reveal>
          <div
            className="form-tabs"
            role="tablist"
            aria-label="문의 유형"
            onKeyDown={handleTabKeyDown}
          >
            <button
              id="tab-brand"
              type="button"
              role="tab"
              aria-selected={isBrand}
              tabIndex={isBrand ? 0 : -1}
              aria-controls="panel-brand"
              className={isBrand ? 'is-active' : ''}
              onClick={() => setActiveForm('brand')}
            >
              광고 상담
            </button>
            <button
              id="tab-creator"
              type="button"
              role="tab"
              aria-selected={!isBrand}
              tabIndex={isBrand ? -1 : 0}
              aria-controls="panel-creator"
              className={!isBrand ? 'is-active' : ''}
              onClick={() => setActiveForm('creator')}
            >
              크리에이터 지원
            </button>
          </div>

          <div ref={errorSummaryRef} className="form-status" tabIndex="-1" aria-live="assertive">
            {errorMessages.length ? errorMessages.join(' ') : notice}
          </div>

          {isBrand ? (
            <div
              id="panel-brand"
              role="tabpanel"
              aria-labelledby="tab-brand"
              className="form-panel"
            >
              <label>
                <span>
                  업체명·브랜드명 <b>필수</b>
                </span>
                <input
                  value={brandForm.brandName}
                  onChange={(event) => updateBrand('brandName', event.target.value)}
                  aria-invalid={Boolean(errors.brandName)}
                  aria-describedby={errors.brandName ? 'brandName-error' : undefined}
                  autoComplete="organization"
                />
                <FieldError id="brandName-error">{errors.brandName}</FieldError>
              </label>

              <label>
                <span>
                  담당자명 <b>필수</b>
                </span>
                <input
                  value={brandForm.managerName}
                  onChange={(event) => updateBrand('managerName', event.target.value)}
                  aria-invalid={Boolean(errors.managerName)}
                  aria-describedby={errors.managerName ? 'managerName-error' : undefined}
                  autoComplete="name"
                />
                <FieldError id="managerName-error">{errors.managerName}</FieldError>
              </label>

              <ContactMethodFields
                values={brandForm}
                update={updateBrand}
                error={errors.contactValue}
                prefix="brand"
              />

              <fieldset>
                <legend>희망 서비스</legend>
                <div className="choice-grid">
                  {formOptions.services.map((service) => (
                    <label className="choice" key={service}>
                      <input
                        type="checkbox"
                        checked={brandForm.services.includes(service)}
                        onChange={() => toggleBrandService(service)}
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="form-row">
                <label>
                  <span>예산 범위</span>
                  <select
                    value={brandForm.budget}
                    onChange={(event) => updateBrand('budget', event.target.value)}
                  >
                    {formOptions.budgets.map((budget) => (
                      <option key={budget}>{budget}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>희망 일정</span>
                  <select
                    value={brandForm.timeline}
                    onChange={(event) => updateBrand('timeline', event.target.value)}
                  >
                    {formOptions.timelines.map((timeline) => (
                      <option key={timeline}>{timeline}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="wide-field">
                <span>
                  문의 내용 <b>필수</b>
                </span>
                <textarea
                  value={brandForm.message}
                  onChange={(event) => updateBrand('message', event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'brandMessage-error' : undefined}
                  rows="5"
                />
                <FieldError id="brandMessage-error">{errors.message}</FieldError>
              </label>

              <PrivacyCheck
                checked={brandForm.privacy}
                onChange={(checked) => updateBrand('privacy', checked)}
                error={errors.privacy}
                id="brandPrivacy"
              />
            </div>
          ) : (
            <div
              id="panel-creator"
              role="tabpanel"
              aria-labelledby="tab-creator"
              className="form-panel"
            >
              <label>
                <span>
                  이름·활동명 <b>필수</b>
                </span>
                <input
                  value={creatorForm.creatorName}
                  onChange={(event) => updateCreator('creatorName', event.target.value)}
                  aria-invalid={Boolean(errors.creatorName)}
                  aria-describedby={errors.creatorName ? 'creatorName-error' : undefined}
                  autoComplete="name"
                />
                <FieldError id="creatorName-error">{errors.creatorName}</FieldError>
              </label>

              <div className="form-row">
                <label>
                  <span>
                    활동 플랫폼 <b>필수</b>
                  </span>
                  <select
                    value={creatorForm.platform}
                    onChange={(event) => updateCreator('platform', event.target.value)}
                    aria-invalid={Boolean(errors.platform)}
                    aria-describedby={errors.platform ? 'platform-error' : undefined}
                  >
                    <option value="">선택해 주세요</option>
                    {formOptions.platforms.map((platform) => (
                      <option key={platform}>{platform}</option>
                    ))}
                  </select>
                  <FieldError id="platform-error">{errors.platform}</FieldError>
                </label>
                <label>
                  <span>
                    주요 콘텐츠 분야 <b>필수</b>
                  </span>
                  <select
                    value={creatorForm.category}
                    onChange={(event) => updateCreator('category', event.target.value)}
                    aria-invalid={Boolean(errors.category)}
                    aria-describedby={errors.category ? 'category-error' : undefined}
                  >
                    <option value="">선택해 주세요</option>
                    {formOptions.categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                  <FieldError id="category-error">{errors.category}</FieldError>
                </label>
              </div>

              <label className="wide-field">
                <span>
                  채널 주소 <b>필수</b>
                </span>
                <input
                  value={creatorForm.channelUrl}
                  onChange={(event) => updateCreator('channelUrl', event.target.value)}
                  aria-invalid={Boolean(errors.channelUrl)}
                  aria-describedby={errors.channelUrl ? 'channelUrl-error' : undefined}
                  inputMode="url"
                  autoCapitalize="none"
                  spellCheck={false}
                />
                <FieldError id="channelUrl-error">{errors.channelUrl}</FieldError>
              </label>

              <ContactMethodFields
                values={creatorForm}
                update={updateCreator}
                error={errors.contactValue}
                prefix="creator"
              />

              <label className="wide-field">
                <span>지원 내용</span>
                <textarea
                  value={creatorForm.message}
                  onChange={(event) => updateCreator('message', event.target.value)}
                  rows="5"
                />
              </label>

              <PrivacyCheck
                checked={creatorForm.privacy}
                onChange={(checked) => updateCreator('privacy', checked)}
                error={errors.privacy}
                id="creatorPrivacy"
              />
            </div>
          )}

          <button className="button button--accent form-submit" type="submit">
            입력 내용 확인
          </button>
          <p className="form-disclaimer">
            수신 기능 미연결 상태입니다. 입력값은 브라우저 밖으로 전송되지 않습니다.
          </p>
        </form>
      </div>
    </section>
  );
}

function ContactMethodFields({ values, update, error, prefix }) {
  return (
    <div className="contact-method">
      <fieldset>
        <legend>연락 방법</legend>
        <div className="segmented">
          <label>
            <input
              type="radio"
              name={`${prefix}-contactMethod`}
              checked={values.contactMethod === 'email'}
              onChange={() => update('contactMethod', 'email')}
            />
            <span>이메일</span>
          </label>
          <label>
            <input
              type="radio"
              name={`${prefix}-contactMethod`}
              checked={values.contactMethod === 'phone'}
              onChange={() => update('contactMethod', 'phone')}
            />
            <span>전화</span>
          </label>
        </div>
      </fieldset>
      <label>
        <span>
          연락처 <b>필수</b>
        </span>
        <input
          value={values.contactValue}
          onChange={(event) => update('contactValue', event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${prefix}Contact-error` : undefined}
          inputMode={values.contactMethod === 'email' ? 'email' : 'tel'}
          autoComplete={values.contactMethod === 'email' ? 'email' : 'tel'}
        />
        <FieldError id={`${prefix}Contact-error`}>{error}</FieldError>
      </label>
    </div>
  );
}

function PrivacyCheck({ checked, onChange, error, id }) {
  return (
    <div className="privacy-check">
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <span>
          개인정보 수집·이용 안내 초안을 확인했습니다. <b>필수</b>
        </span>
      </label>
      <p>
        실제 공개 전 운영 주체, 수집 목적, 수집 항목, 보유 기간, 문의 창구를 확정해야 합니다. 현재
        문구는 법적 확정 고지가 아닌 확인용 안내입니다.
      </p>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  );
}
