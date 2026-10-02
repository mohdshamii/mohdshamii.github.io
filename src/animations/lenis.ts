import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function initLenis(): Lenis | null {
  // Check if reduced motion is requested
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  // Check if user is on mobile/tablet or touch device
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch && window.innerWidth < 768) {
    // Rely on native smooth momentum scroll on mobile
    return null;
  }

  try {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenisInstance?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return lenisInstance;
  } catch (err) {
    console.warn('Lenis smooth scrolling initialization skipped:', err);
    return null;
  }
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function scrollToTarget(target: string | HTMLElement, offset = -80) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
