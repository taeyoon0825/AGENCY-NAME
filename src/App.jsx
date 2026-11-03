import { useCallback, useEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import CampaignGallery from './components/CampaignGallery.jsx';
import Process from './components/Process.jsx';
import CreatorSection from './components/CreatorSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer, { BackToTop } from './components/Footer.jsx';
import { publicSite } from './config/publicSite.js';
import { usePrefersReducedMotion, useReveal } from './hooks/useMotion.js';
import { scrollToSection } from './utils/navigation.js';

export default function App() {
  const [activeForm, setActiveForm] = useState('brand');
  const [contactVisible, setContactVisible] = useState(false);
  const contactRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  useReveal(reducedMotion);

  useEffect(() => {
    const contact = contactRef.current;
    if (!contact || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  const handleContactClick = useCallback((type) => {
    setActiveForm(type);
    window.requestAnimationFrame(() => scrollToSection('contact'));
  }, []);

  return (
    <>
      <Header onContactClick={handleContactClick} />
      <main id="main" tabIndex={-1}>
        {publicSite.review && (
          <aside className="review-notice" aria-label="검토용 사이트 안내">
            검토용 사이트 · 임시 상호와 예시 이미지가 포함되어 있습니다. 문의는 접수되지 않습니다.
          </aside>
        )}
        <Hero onContactClick={handleContactClick} reducedMotion={reducedMotion} />
        <About />
        <Services />
        <CampaignGallery reducedMotion={reducedMotion} />
        <Process />
        <CreatorSection onContactClick={handleContactClick} />
        <ContactSection
          activeForm={activeForm}
          setActiveForm={setActiveForm}
          contactRef={contactRef}
        />
      </main>
      <Footer />
      <BackToTop hidden={contactVisible} />
    </>
  );
}
