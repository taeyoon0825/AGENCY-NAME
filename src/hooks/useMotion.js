import { useEffect, useState } from 'react';

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
}

export function useReveal(reducedMotion) {
  useEffect(() => {
    if (reducedMotion || !('IntersectionObserver' in window)) return undefined;
    let observer;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0, rootMargin: '0px 0px -32px 0px' },
      );
      document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
      // Enable hidden entry states only after observation succeeds.
      document.documentElement.classList.add('motion-ready');
    } catch {
      observer?.disconnect();
      document.documentElement.classList.remove('motion-ready');
    }
    return () => {
      observer?.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, [reducedMotion]);
}
