import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  campaignIdeas,
  formOptions,
  heroFrames,
  navItems,
  principles,
  processSteps,
  services,
  siteConfig,
} from './data/siteContent';

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

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

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
}

function useReveal(reducedMotion) {
  useEffect(() => {
    if (reducedMotion) return undefined;

    document.documentElement.classList.add('motion-ready');
    const elements = Array.from(document.querySelectorAll('[data-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, [reducedMotion]);
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Header({ onContactClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusable?.[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [menuOpen]);

  const handleNav = (id) => {
    setMenuOpen(false);
    window.setTimeout(() => scrollToSection(id), 0);
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-menu-open' : ''}`}>
      <a className="skip-link" href="#main">
        본문 바로가기
      </a>
      <div className="site-header__inner">
        <button className="wordmark" type="button" onClick={() => scrollToSection('hero')} aria-label="첫 화면으로 이동">
          {siteConfig.companyName}
        </button>

        <nav className="desktop-nav" aria-label="주요 메뉴">
          {navItems.map((item) => (
            <button key={item.id} type="button" onClick={() => handleNav(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>

        <button className="header-cta" type="button" onClick={() => onContactClick('brand')}>
          광고 상담하기
        </button>

        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" ref={panelRef} className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__panel">
          <nav aria-label="모바일 주요 메뉴">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => handleNav(item.id)}>
                {item.label}
              </button>
            ))}
          </nav>
          <button
            className="button button--accent mobile-menu__cta"
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onContactClick('brand');
            }}
          >
            광고 상담하기
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onContactClick, reducedMotion }) {
  const heroRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const hero = heroRef.current;
    if (!hero) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const progress = clamp((0 - rect.top) / Math.max(rect.height, 1));
      hero.style.setProperty('--hero-progress', progress.toFixed(4));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [reducedMotion]);

  return (
    <section id="hero" ref={heroRef} className="hero dark-section">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">INFLUENCER MARKETING &amp; CONTENTS</p>
          <h1 className="hero__title" aria-label="사람을 통해, 브랜드의 다음 장면을 만듭니다.">
            <span style={{ '--delay': '0ms' }}>사람을 통해,</span>
            <span style={{ '--delay': '100ms' }}>브랜드의 다음</span>
            <span style={{ '--delay': '200ms' }}>장면을 만듭니다.</span>
          </h1>
          <p className="hero__description">
            브랜드에 맞는 크리에이터를 찾고,
            <br />
            콘텐츠 기획부터 캠페인 운영까지 함께합니다.
          </p>
          <div className="hero__actions">
            <button className="button button--accent" type="button" onClick={() => onContactClick('brand')}>
              광고 상담하기
            </button>
            <button className="button button--outline" type="button" onClick={() => onContactClick('creator')}>
              크리에이터 협업 지원
            </button>
          </div>
        </div>

        <div className="hero__visual" aria-label="콘텐츠 캠페인 예시 그래픽">
          {heroFrames.map((frame, index) => (
            <figure key={frame.label} className={`content-frame ${frame.className}`} style={{ '--frame-index': index }}>
              <img src={frame.src} alt={frame.alt} fetchPriority={index === 1 ? 'high' : 'auto'} />
              <figcaption>{frame.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <p className="scroll-cue">SCROLL TO EXPLORE</p>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about light-section">
      <div className="section-grid">
        <div className="section-label" data-reveal>
          <p className="eyebrow">WHO WE ARE</p>
        </div>
        <div className="section-main">
          <h2 className="section-title stagger-title" data-reveal aria-label="브랜드와 잘 맞는 사람, 사람을 움직이는 콘텐츠.">
            <span>브랜드와 잘 맞는 사람,</span>
            <span>사람을 움직이는 콘텐츠.</span>
          </h2>
          <div className="about__body" data-reveal>
            <p>우리는 브랜드의 고객층과 크리에이터의 콘텐츠를 함께 살펴봅니다.</p>
            <p>협업의 방향을 정하고, 제작과 게시 일정까지 이어지는 과정을 운영합니다.</p>
          </div>
          <div className="principles" data-reveal>
            {principles.map((item) => (
              <article className="principle" key={item.key}>
                <strong>{item.key}</strong>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const index = Number(visible.target.getAttribute('data-index'));
          setActiveIndex(index);
        }
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: '-22% 0px -35% 0px' },
    );

    itemRefs.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="section services light-section">
      <div className="services__grid">
        <aside className="services__sticky" data-reveal>
          <p className="eyebrow">WHAT WE DO</p>
          <h2 className="section-title">
            협업의 시작부터
            <br />
            콘텐츠가 공개되는 순간까지.
          </h2>
          <div className="service-progress" aria-label="서비스 진행 표시">
            {services.map((service, index) => (
              <span key={service.number} className={activeIndex === index ? 'is-active' : ''}>
                {service.number}
              </span>
            ))}
          </div>
        </aside>

        <div className="service-list">
          {services.map((service, index) => (
            <article
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className="service-item"
              key={service.number}
              data-index={index}
              data-reveal
            >
              <div className="service-item__media">
                <img src={service.image} alt={service.alt} loading={index === 0 ? 'eager' : 'lazy'} />
              </div>
              <div className="service-item__copy">
                <span className="service-item__number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CampaignGallery({ reducedMotion }) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!section || !sticky || !track) return undefined;

    let raf = 0;
    let maxTranslate = 0;
    let enabled = false;

    const recalc = () => {
      enabled = window.matchMedia('(min-width: 1200px)').matches;
      if (!enabled) {
        section.style.removeProperty('--gallery-height');
        track.style.removeProperty('transform');
        return;
      }
      maxTranslate = Math.max(track.scrollWidth - sticky.clientWidth + 88, 0);
      section.style.setProperty('--gallery-height', `${Math.ceil(window.innerHeight + maxTranslate + 180)}px`);
    };

    const update = () => {
      raf = 0;
      if (!enabled) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = clamp((0 - rect.top) / travel);
      track.style.transform = `translate3d(${-maxTranslate * progress}px, 0, 0)`;
    };

    const requestUpdate = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    const resizeObserver = new ResizeObserver(() => {
      recalc();
      requestUpdate();
    });

    resizeObserver.observe(track);
    resizeObserver.observe(sticky);
    recalc();
    update();

    const handleResize = () => {
      recalc();
      requestUpdate();
    };
    const handleLoad = () => {
      recalc();
      requestUpdate();
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleLoad);

    return () => {
      window.cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleLoad);
      track.style.removeProperty('transform');
    };
  }, [reducedMotion]);

  return (
    <section id="campaigns" ref={sectionRef} className="campaign dark-section">
      <div ref={stickyRef} className="campaign__sticky">
        <div className="campaign__intro" data-reveal>
          <p className="eyebrow">CAMPAIGN IDEAS</p>
          <h2 className="section-title">
            이런 장면으로
            <br />
            브랜드를 알립니다.
          </h2>
          <p className="campaign__note">아래 콘텐츠는 서비스 이해를 돕기 위한 캠페인 제안 예시입니다.</p>
        </div>
        <div ref={trackRef} className="campaign__track" data-reveal>
          {campaignIdeas.map((campaign) => (
            <article className="campaign-panel" key={campaign.eyebrow}>
              <img src={campaign.image} alt={campaign.alt} loading="lazy" />
              <div>
                <p className="eyebrow">{campaign.eyebrow}</p>
                <h3>{campaign.title}</h3>
                <p>{campaign.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveStep(Number(visible.target.getAttribute('data-step')));
      },
      { threshold: 0.45, rootMargin: '-25% 0px -35% 0px' },
    );
    refs.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="section process light-section">
      <div className="process__grid">
        <div className="process__heading" data-reveal>
          <p className="eyebrow">HOW WE WORK</p>
          <h2 className="section-title">
            처음이라도,
            <br />
            과정은 명확하게.
          </h2>
        </div>
        <div className="process__list">
          {processSteps.map((step, index) => (
            <article
              ref={(node) => {
                refs.current[index] = node;
              }}
              className={`process-step ${activeStep === index ? 'is-active' : ''}`}
              key={step.number}
              data-step={index}
              data-reveal
            >
              <span>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CreatorSection({ onContactClick }) {
  return (
    <section className="creator-band">
      <div className="creator-band__inner">
        <div className="creator-band__copy" data-reveal>
          <p className="eyebrow">FOR CREATORS</p>
          <h2 className="section-title">
            당신의 콘텐츠와
            <br />
            어울리는 브랜드를 만나요.
          </h2>
          <p>
            자신만의 시선으로 콘텐츠를 만드는 크리에이터를 기다립니다. 활동 채널과 관심 분야를 알려주시면 협업 검토 시
            참고하겠습니다.
          </p>
          <button className="button button--dark" type="button" onClick={() => onContactClick('creator')}>
            크리에이터 협업 지원
          </button>
        </div>
        <div className="creator-visual" aria-hidden="true" data-reveal>
          <div className="mini-frame mini-frame--large">
            <span>CONTENT PLAN</span>
            <strong>Brand fit</strong>
            <small>channel / tone / schedule</small>
          </div>
          <div className="mini-frame mini-frame--small">
            <span>COLLAB</span>
            <strong>Creator note</strong>
            <small>category / platform</small>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldError({ children, id }) {
  if (!children) return null;
  return (
    <p id={id} className="field-error" role="alert">
      {children}
    </p>
  );
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value) {
  return /^[0-9+\-\s()]{8,20}$/.test(value.trim());
}

function validateBrand(values) {
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

function validateCreator(values) {
  const errors = {};
  if (!values.creatorName.trim()) errors.creatorName = '이름 또는 활동명을 입력해 주세요.';
  if (!values.platform.trim()) errors.platform = '활동 플랫폼을 선택해 주세요.';
  if (!values.channelUrl.trim()) errors.channelUrl = '채널 주소를 입력해 주세요.';
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

function ContactSection({ activeForm, setActiveForm, contactRef }) {
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

    setNotice('입력값 검증은 완료됐지만 현재 수신 API가 연결되지 않아 접수되지 않았습니다. 입력 내용은 저장되지 않습니다.');
  };

  useEffect(() => {
    setErrors({});
    setNotice('');
  }, [activeForm]);

  const errorMessages = Object.values(errors);

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
            현재 문의 수신 서버는 연결되어 있지 않습니다. 폼 구조와 필수값 검증은 구현되어 있으며, 실제 공개 전 수신
            API 또는 메일 처리 기능을 연결해야 합니다.
          </p>
        </div>

        <form className="contact-form" noValidate onSubmit={handleSubmit} data-reveal>
          <div className="form-tabs" role="tablist" aria-label="문의 유형">
            <button
              id="tab-brand"
              type="button"
              role="tab"
              aria-selected={isBrand}
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
            <div id="panel-brand" role="tabpanel" aria-labelledby="tab-brand" className="form-panel">
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
                  <select value={brandForm.budget} onChange={(event) => updateBrand('budget', event.target.value)}>
                    {formOptions.budgets.map((budget) => (
                      <option key={budget}>{budget}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>희망 일정</span>
                  <select value={brandForm.timeline} onChange={(event) => updateBrand('timeline', event.target.value)}>
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
            <div id="panel-creator" role="tabpanel" aria-labelledby="tab-creator" className="form-panel">
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
                  >
                    <option value="">선택해 주세요</option>
                    {formOptions.platforms.map((platform) => (
                      <option key={platform}>{platform}</option>
                    ))}
                  </select>
                  <FieldError>{errors.platform}</FieldError>
                </label>
                <label>
                  <span>
                    주요 콘텐츠 분야 <b>필수</b>
                  </span>
                  <select
                    value={creatorForm.category}
                    onChange={(event) => updateCreator('category', event.target.value)}
                    aria-invalid={Boolean(errors.category)}
                  >
                    <option value="">선택해 주세요</option>
                    {formOptions.categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                  <FieldError>{errors.category}</FieldError>
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
          <p className="form-disclaimer">수신 기능 미연결 상태입니다. 입력값은 브라우저 밖으로 전송되지 않습니다.</p>
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
        <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
        <span>
          개인정보 수집·이용 안내 초안을 확인했습니다. <b>필수</b>
        </span>
      </label>
      <p>
        실제 공개 전 운영 주체, 수집 목적, 수집 항목, 보유 기간, 문의 창구를 확정해야 합니다. 현재 문구는 법적 확정
        고지가 아닌 확인용 안내입니다.
      </p>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  );
}

function Footer() {
  const [open, setOpen] = useState(false);
  const optionalContactRows = useMemo(
    () =>
      [
        ['대표자', siteConfig.contact.representative],
        ['사업자번호', siteConfig.contact.businessNumber],
        ['주소', siteConfig.contact.address],
        ['이메일', siteConfig.contact.email],
        ['전화', siteConfig.contact.phone],
      ].filter(([, value]) => value),
    [],
  );

  return (
    <footer className="site-footer dark-section">
      <div className="site-footer__inner">
        <div>
          <strong>{siteConfig.companyName}</strong>
          <p>{siteConfig.shortDescription}</p>
          {optionalContactRows.length > 0 && (
            <dl className="footer-contact">
              {optionalContactRows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="footer-actions">
          <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="privacy-note">
            개인정보 안내
          </button>
          <small>© {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.</small>
        </div>
      </div>
      <div id="privacy-note" className={`privacy-note ${open ? 'is-open' : ''}`}>
        <p>
          운영 전 확정이 필요한 개인정보 안내 초안입니다. 실제 공개 전 운영 주체, 수집 목적, 수집 항목, 보유 기간,
          파기 방법, 문의 창구를 확정한 뒤 법률 검토를 거쳐 게시해 주세요.
        </p>
      </div>
    </footer>
  );
}

function BackToTop({ hidden }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <button
      className={`back-to-top ${visible && !hidden ? 'is-visible' : ''}`}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="맨 위로 이동"
    >
      ↑
    </button>
  );
}

export default function App() {
  const [activeForm, setActiveForm] = useState('brand');
  const [contactVisible, setContactVisible] = useState(false);
  const contactRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useReveal(reducedMotion);

  useEffect(() => {
    const contact = contactRef.current;
    if (!contact) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  const handleContactClick = useCallback((type) => {
    setActiveForm(type);
    window.setTimeout(() => scrollToSection('contact'), 0);
  }, []);

  return (
    <>
      <Header onContactClick={handleContactClick} />
      <main id="main">
        <Hero onContactClick={handleContactClick} reducedMotion={reducedMotion} />
        <About />
        <Services />
        <CampaignGallery reducedMotion={reducedMotion} />
        <Process />
        <CreatorSection onContactClick={handleContactClick} />
        <ContactSection activeForm={activeForm} setActiveForm={setActiveForm} contactRef={contactRef} />
      </main>
      <Footer />
      <BackToTop hidden={contactVisible} />
    </>
  );
}
