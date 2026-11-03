import { useLayoutEffect, useRef } from 'react';
import { campaignIdeas } from '../data/siteContent.js';
const clamp = (value) => Math.min(Math.max(value, 0), 1);

export default function CampaignGallery({ reducedMotion }) {
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
    const desktop = window.matchMedia('(min-width: 1200px) and (min-height: 800px)');

    const recalc = () => {
      enabled = desktop.matches;
      section.classList.toggle('is-horizontal', enabled);
      if (!enabled) {
        section.style.removeProperty('--gallery-height');
        track.style.removeProperty('transform');
        return;
      }
      maxTranslate = Math.max(track.scrollWidth - sticky.clientWidth, 0);
      section.style.setProperty(
        '--gallery-height',
        `${Math.ceil(window.innerHeight + maxTranslate)}px`,
      );
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
      if (enabled && !raf) raf = window.requestAnimationFrame(update);
    };

    const resizeObserver =
      'ResizeObserver' in window
        ? new ResizeObserver(() => {
            recalc();
            requestUpdate();
          })
        : null;

    resizeObserver?.observe(track);
    resizeObserver?.observe(sticky);
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
    track.addEventListener('load', handleLoad, true);
    desktop.addEventListener('change', handleResize);

    return () => {
      window.cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleLoad);
      track.removeEventListener('load', handleLoad, true);
      desktop.removeEventListener('change', handleResize);
      track.style.removeProperty('transform');
      section.style.removeProperty('--gallery-height');
      section.classList.remove('is-horizontal');
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
          <p className="campaign__note">
            아래 콘텐츠는 서비스 이해를 돕기 위한 캠페인 제안 예시입니다.
          </p>
        </div>
        <div ref={trackRef} className="campaign__track">
          {campaignIdeas.map((campaign) => (
            <article className="campaign-panel" key={campaign.eyebrow}>
              <img
                src={campaign.image}
                alt={campaign.alt}
                width="1200"
                height="825"
                loading="lazy"
              />
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
