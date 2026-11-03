import { useEffect, useRef, useState } from 'react';
import { navItems, siteConfig } from '../data/siteContent.js';
import { scrollToSection } from '../utils/navigation.js';

export default function Header({ onContactClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      menuButtonRef.current?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  const handleNav = (id) => {
    setMenuOpen(false);
    window.requestAnimationFrame(() => scrollToSection(id));
  };
  const handleContact = () => {
    setMenuOpen(false);
    onContactClick('brand');
  };

  const handleDialogKeyDown = (event) => {
    if (event.key !== 'Tab') return;
    const buttons = dialogRef.current.querySelectorAll('button');
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="skip-link" href="#main">
        본문 바로가기
      </a>
      <div className="site-header__inner">
        <button
          className="wordmark"
          type="button"
          onClick={() => scrollToSection('hero')}
          aria-label="첫 화면으로 이동"
        >
          {siteConfig.companyName}
        </button>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          {navItems.map((item) => (
            <button key={item.id} type="button" onClick={() => handleNav(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>
        <button className="header-cta" type="button" onClick={handleContact}>
          광고 상담하기
        </button>
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="메뉴 열기"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
        </button>
      </div>
      <dialog
        ref={dialogRef}
        id="mobile-menu"
        className="mobile-menu"
        aria-label="모바일 메뉴"
        onKeyDown={handleDialogKeyDown}
        onCancel={(event) => {
          event.preventDefault();
          setMenuOpen(false);
        }}
      >
        <div className="mobile-menu__panel">
          <div className="mobile-menu__header">
            <strong className="wordmark">{siteConfig.companyName}</strong>
            <button
              className="mobile-menu__close"
              type="button"
              aria-label="메뉴 닫기"
              onClick={() => setMenuOpen(false)}
            >
              닫기 ×
            </button>
          </div>
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
            onClick={handleContact}
          >
            광고 상담하기
          </button>
        </div>
      </dialog>
    </header>
  );
}
