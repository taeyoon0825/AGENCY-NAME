import { useEffect, useState } from 'react';

// Use viewport position rather than intersection ratios: short steps can stay
// intersecting during several scroll updates, while tall images never reach 50%.
export function useActiveItem(itemRefs) {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const items = itemRefs.current.filter(Boolean);
      if (!items.length) return;
      const center = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      // These lists have only 4–5 items. Measure at most once per animation frame.
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActiveIndex((current) => (current === closestIndex ? current : closestIndex));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('load', requestUpdate, true);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('load', requestUpdate, true);
    };
  }, [itemRefs]);
  return activeIndex;
}
