export function initCustomCursor() {
  // Disable completely on touch devices and small viewports
  if (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches ||
    window.innerWidth < 1024
  ) {
    return;
  }

  // Remove existing cursor if any
  const existing = document.getElementById('custom-cursor-container');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.id = 'custom-cursor-container';
  container.innerHTML = `
    <div class="cursor-dot" id="cursor-dot"></div>
    <div class="cursor-ring" id="cursor-ring">
      <span class="cursor-badge" id="cursor-badge"></span>
    </div>
  `;
  document.body.appendChild(container);

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const badge = document.getElementById('cursor-badge');

  if (!dot || !ring || !badge) return;

  const dotEl: HTMLElement = dot;
  const ringEl: HTMLElement = ring;
  const badgeEl: HTMLElement = badge;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isHovering = false;
  let cursorText = '';

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dotEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    ringEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) ${isHovering ? 'scale(1.8)' : 'scale(1)'}`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  function attachHoverListeners() {
    // Project cards
    document.querySelectorAll('[data-cursor="view"], .project-card, .case-study-trigger').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        isHovering = true;
        cursorText = 'VIEW';
        badgeEl.textContent = cursorText;
        ringEl.classList.add('has-badge', 'view-badge');
      });
      el.addEventListener('mouseleave', () => {
        isHovering = false;
        cursorText = '';
        badgeEl.textContent = '';
        ringEl.classList.remove('has-badge', 'view-badge');
      });
    });

    // GitHub & External Links
    document.querySelectorAll('[data-cursor="open"], a[target="_blank"], .github-btn').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        isHovering = true;
        cursorText = 'OPEN';
        badgeEl.textContent = cursorText;
        ringEl.classList.add('has-badge', 'open-badge');
      });
      el.addEventListener('mouseleave', () => {
        isHovering = false;
        cursorText = '';
        badgeEl.textContent = '';
        ringEl.classList.remove('has-badge', 'open-badge');
      });
    });

    // Interactive buttons / pills
    document.querySelectorAll('button, .cta-btn, .skill-node, .nav-link').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        if (!ringEl.classList.contains('has-badge')) {
          ringEl.classList.add('hover-active');
        }
      });
      el.addEventListener('mouseleave', () => {
        ringEl.classList.remove('hover-active');
      });
    });
  }

  attachHoverListeners();

  // Re-attach listeners after dynamic DOM changes
  const observer = new MutationObserver(() => {
    attachHoverListeners();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dotEl.style.opacity = '0';
    ringEl.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dotEl.style.opacity = '1';
    ringEl.style.opacity = '1';
  });
}
