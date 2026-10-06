/**
 * Smooth scrolling utility adhering to native browser performance.
 * Heavy inertia scroll hijacking is disabled for a fast, responsive GitHub-like UX.
 */

export function initLenis(): null {
  return null;
}

export function getLenis(): null {
  return null;
}

export function scrollToTarget(target: string | HTMLElement, offset = -64): void {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
