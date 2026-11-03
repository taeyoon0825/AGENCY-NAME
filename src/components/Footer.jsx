import { useEffect, useMemo, useState } from 'react';
import { siteConfig } from '../data/siteContent.js';
import { scrollToSection } from '../utils/navigation.js';

export default function Footer() {
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
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="privacy-note"
          >
            개인정보 안내
          </button>
          <small>
            © {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.
          </small>
        </div>
      </div>
      <div id="privacy-note" className={`privacy-note ${open ? 'is-open' : ''}`}>
        <p>
          운영 전 확정이 필요한 개인정보 안내 초안입니다. 실제 공개 전 운영 주체, 수집 목적, 수집
          항목, 보유 기간, 파기 방법, 문의 창구를 확정한 뒤 법률 검토를 거쳐 게시해 주세요.
        </p>
      </div>
    </footer>
  );
}

export function BackToTop({ hidden }) {
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
      tabIndex={visible && !hidden ? 0 : -1}
      aria-hidden={!visible || hidden}
      onClick={() => scrollToSection('hero')}
      aria-label="맨 위로 이동"
    >
      ↑
    </button>
  );
}
