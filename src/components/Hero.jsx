import { useEffect, useRef } from 'react';
import { heroFrames } from '../data/siteContent.js';
const clamp = (value) => Math.min(Math.max(value, 0), 1);

export default function Hero({ onContactClick, reducedMotion }) {
  const heroRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const hero = heroRef.current;
    if (!hero) return undefined;

    let frame = 0;
    let lastProgress = -1;
    const update = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const progress = clamp((0 - rect.top) / Math.max(rect.height, 1));
      if (progress === lastProgress) return;
      lastProgress = progress;
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
          <p className="eyebrow hero__eyebrow">
            <span>INFLUENCER MARKETING &amp; CONTENTS</span>
            <span className="hero__audience">외식 매장과 브랜드를 위한 인플루언서 마케팅</span>
          </p>
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
            <button
              className="button button--accent"
              type="button"
              onClick={() => onContactClick('brand')}
            >
              광고 상담하기
            </button>
            <button
              className="button button--outline"
              type="button"
              onClick={() => onContactClick('creator')}
            >
              크리에이터 협업 지원
            </button>
          </div>
        </div>

        <div className="hero__visual" aria-label="콘텐츠 캠페인 예시 그래픽">
          {heroFrames.map((frame, index) => (
            <figure
              key={frame.label}
              className={`content-frame ${frame.className}`}
              style={{ '--frame-index': index }}
            >
              <img
                src={frame.src}
                alt={frame.alt}
                width="900"
                height="1600"
                fetchPriority={index === 1 ? 'high' : 'auto'}
              />
              <figcaption>{frame.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <p className="scroll-cue">SCROLL TO EXPLORE</p>
    </section>
  );
}
